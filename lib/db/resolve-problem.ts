import "server-only";

import { eq } from "drizzle-orm";
import { getDatabase } from "./index";
import { problemCodes } from "./schema";

export async function resolveProblemId(reference: string) {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reference)) {
    return reference;
  }
  if (!/^[A-Z]{3}$/.test(reference)) return null;

  const [mapping] = await getDatabase().select({ problemId: problemCodes.problemId })
    .from(problemCodes).where(eq(problemCodes.code, reference)).limit(1);
  return mapping?.problemId ?? null;
}
