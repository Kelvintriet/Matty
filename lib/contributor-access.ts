import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { getAuth } from "./auth";
import { getDatabase } from "./db";
import { contributorAttempts } from "./db/schema";

export async function contributorIdentity(request: Request) {
  const session = await getAuth().api.getSession({ headers: request.headers });
  const allowedIds = (process.env.CONTRIBUTOR_ADMIN_USER_IDS ?? "")
    .split(",").map((id) => id.trim()).filter(Boolean);
  if (!session || !allowedIds.includes(session.user.id)) return null;
  return session.user;
}

export async function authorizeContributor(request: Request) {
  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.BETTER_AUTH_URL;
  if (!origin || !configuredOrigin || origin !== new URL(configuredOrigin).origin) return null;

  const user = await contributorIdentity(request);
  if (!user) return null;
  const expected = process.env.CONTRIBUTOR_SECRET;
  const supplied = request.headers.get("x-contributor-secret") ?? "";
  if (!expected || expected.length < 32 || supplied.length > 1024) return null;

  const expectedHash = createHash("sha256").update(expected).digest();
  const suppliedHash = createHash("sha256").update(supplied).digest();
  const valid = timingSafeEqual(expectedHash, suppliedHash);
  const db = getDatabase();
  const allowed = await db.transaction(async (tx) => {
    await tx.insert(contributorAttempts).values({ userId: user.id, failures: 0 })
      .onDuplicateKeyUpdate({ set: { userId: user.id } });
    const [attempt] = await tx.select().from(contributorAttempts)
      .where(eq(contributorAttempts.userId, user.id)).for("update");
    const now = Date.now();
    if (attempt.blockedUntil && attempt.blockedUntil.getTime() > now) return false;
    if (valid) {
      await tx.update(contributorAttempts).set({ failures: 0, blockedUntil: null })
        .where(eq(contributorAttempts.userId, user.id));
      return true;
    }
    const failures = attempt.blockedUntil ? 1 : attempt.failures + 1;
    await tx.update(contributorAttempts).set({
      failures,
      blockedUntil: failures >= 5 ? new Date(now + 15 * 60 * 1000) : null,
    }).where(eq(contributorAttempts.userId, user.id));
    return false;
  });
  return allowed ? user : null;
}
