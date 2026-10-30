import { loadEnvConfig } from "@next/env";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { problemCodes, problems } from "../lib/db/schema";
import { isDuplicateKey, problemCodeAt, problemCodeCount, randomCodeOffset } from "../lib/problem-codes";

loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  const pool = mysql.createPool({ uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });
  const db = drizzle({ client: pool });

  try {
    const allProblems = await db.select({ id: problems.id }).from(problems);
    const existing = await db.select({ problemId: problemCodes.problemId, code: problemCodes.code }).from(problemCodes);
    const assigned = new Set(existing.map((item) => item.problemId));
    const occupied = new Set(existing.map((item) => item.code));
    let created = 0;

    for (const problem of allProblems) {
      if (assigned.has(problem.id)) continue;
      let success = false;
      const start = randomCodeOffset();
      for (let attempt = 0; attempt < problemCodeCount; attempt += 1) {
        const code = problemCodeAt((start + attempt) % problemCodeCount);
        if (occupied.has(code)) continue;
        try {
          await db.insert(problemCodes).values({ problemId: problem.id, code });
          occupied.add(code);
          created += 1;
          success = true;
          break;
        } catch (error) {
          if (!isDuplicateKey(error)) throw error;
          occupied.add(code);
          const [alreadyAssigned] = await db.select({ code: problemCodes.code }).from(problemCodes)
            .where(eq(problemCodes.problemId, problem.id)).limit(1);
          if (alreadyAssigned) {
            success = true;
            break;
          }
        }
      }
      if (!success) throw new Error("Could not assign a unique code; the three-letter space may be exhausted.");
    }
    console.log(`Assigned codes to ${created} existing problems.`);
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Code backfill failed.");
  process.exitCode = 1;
});
