import { and, eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { problemProgress, problems } from "@/lib/db/schema";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuth().api.getSession({ headers: request.headers });
    if (!session) return Response.json({ message: "Please log in to submit an answer." }, { status: 401 });

    const { id } = await context.params;
    const body = await request.json();
    if (typeof body.answer !== "string" || !body.answer.trim() || body.answer.length > 255) {
      return Response.json({ message: "Enter an answer." }, { status: 400 });
    }

    const db = getDatabase();
    const [problem] = await db.select({ answer: problems.answer, explanation: problems.explanation })
      .from(problems).where(and(eq(problems.id, id), isNotNull(problems.publishedAt))).limit(1);
    if (!problem) return Response.json({ message: "Problem not found." }, { status: 404 });

    const submitted = body.answer.trim();
    const expected = problem.answer.trim();
    const actualNumber = Number(submitted);
    const expectedNumber = Number(expected);
    const correct = expected !== "" && Number.isFinite(actualNumber) && Number.isFinite(expectedNumber)
      ? Math.abs(actualNumber - expectedNumber) < 0.000001
      : submitted === expected;

    await db.insert(problemProgress).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      problemId: id,
      solved: correct,
      updatedAt: new Date(),
    }).onDuplicateKeyUpdate({
      set: correct ? { solved: true, updatedAt: new Date() } : { updatedAt: new Date() },
    });
    return Response.json(correct ? { correct: true, explanation: problem.explanation } : { correct: false });
  } catch {
    return Response.json({ message: "Unable to submit your answer." }, { status: 503 });
  }
}
