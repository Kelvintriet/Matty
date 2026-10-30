import "server-only";

import { getAuth } from "./auth";

export async function contributorIdentity(request: Request) {
  const session = await getAuth().api.getSession({ headers: request.headers });
  const allowedIds = (process.env.CONTRIBUTOR_ADMIN_USER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!session || !allowedIds.includes(session.user.id)) return null;
  return session.user;
}

export async function authorizeContributor(request: Request) {
  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.BETTER_AUTH_URL;
  if (!origin || !configuredOrigin || origin !== new URL(configuredOrigin).origin) return null;

  return contributorIdentity(request);
}
