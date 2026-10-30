import { and, eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { resolveProblemId } from "@/lib/db/resolve-problem";
import { problemProgress, problems } from "@/lib/db/schema";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuth().api.getSession({ headers: request.headers });
    if (!session) return Response.json({ message: "Please log in to submit an answer." }, { status: 401 });

    const { id: reference } = await context.params;
    const id = await resolveProblemId(reference);
    if (!id) return Response.json({ message: "Problem not found." }, { status: 404 });
    const body = await request.json();
    if (typeof body.answer !== "string" || !body.answer.trim() || body.answer.length > 255) {
      return Response.json({ message: "Enter an answer." }, { status: 400 });
    }

    const db = getDatabase();
    const [problem] = await db.select({ answer: problems.answer, explanation: problems.explanation })
      .from(problems).where(and(eq(problems.id, id), isNotNull(problems.publishedAt))).limit(1);
    if (!problem) return Response.json({ message: "Problem not found." }, { status: 404 });

    const submitted = body.answer.trim();
    let answers: string[] = [problem.answer];
    try {
      const parsed = JSON.parse(problem.answer);
      if (Array.isArray(parsed) && parsed.every((entry) => typeof entry === "string")) answers = parsed;
    } catch {
      // Existing problems store a single answer as plain text.
    }
    const actualNumber = Number(submitted);
    const correct = answers.some((answer) => {
      const expected = answer.trim();
      const expectedNumber = Number(expected);
      return expected !== "" && Number.isFinite(actualNumber) && Number.isFinite(expectedNumber)
        ? Math.abs(actualNumber - expectedNumber) < 0.000001
        : submitted === expected;
    });

    await db.insert(problemProgress).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      problemId: id,
      solved: correct,
      updatedAt: new Date(),
    }).onDuplicateKeyUpdate({
      set: correct ? { solved: true, updatedAt: new Date() } : { updatedAt: new Date() },
    });
    return Response.json(correct ? { correct: true, explanation: problem.explanation, answers } : { correct: false });
  } catch {
    return Response.json({ message: "Unable to submit your answer." }, { status: 503 });
  }
}
