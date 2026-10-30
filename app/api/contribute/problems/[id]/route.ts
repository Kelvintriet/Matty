import { imageUploadPrefix } from "@/lib/image-upload";
import { and, eq, inArray } from "drizzle-orm";
import { topics } from "@/app/content/course";
import { authorizeContributor, contributorIdentity } from "@/lib/contributor-access";
import { parseContributorProblem } from "@/lib/contributor-problem";
import { getDatabase } from "@/lib/db";
import { resolveProblemId } from "@/lib/db/resolve-problem";
import { contributorImages, problemCodes, problemImages, problemTopics, problems } from "@/lib/db/schema";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!await contributorIdentity(request)) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id: reference } = await context.params;
    const id = await resolveProblemId(reference);
    if (!id) return Response.json({ message: "Problem not found." }, { status: 404 });
    const db = getDatabase();
    const [problem] = await db.select().from(problems).where(eq(problems.id, id)).limit(1);
    if (!problem) return Response.json({ message: "Problem not found." }, { status: 404 });
    const selections = await db.select({ unitId: problemTopics.unitId, subtopicId: problemTopics.subtopicId })
      .from(problemTopics).where(eq(problemTopics.problemId, id));
    if (!selections.length) {
      for (const unit of topics) {
        const lesson = unit.lessons.find((item) => problem.topic === `${unit.title} / ${item.title}`);
        if (lesson) selections.push({ unitId: unit.id, subtopicId: lesson.id });
      }
    }
    let answers = [problem.answer];
    try {
      const parsed = JSON.parse(problem.answer);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) answers = parsed;
    } catch {
      // Older problems store a single answer as plain text.
    }
    const [mapping] = await db.select({ code: problemCodes.code }).from(problemCodes).where(eq(problemCodes.problemId, id)).limit(1);
    return Response.json({ title: problem.title, level: problem.level, statement: problem.statement, explanation: problem.explanation, answers, selections, code: mapping?.code ?? id }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ message: "Unable to load the problem." }, { status: 503 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const contributor = await authorizeContributor(request);
    if (!contributor) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id: reference } = await context.params;
    const id = await resolveProblemId(reference);
    if (!id) return Response.json({ message: "Problem not found." }, { status: 404 });
    const input = parseContributorProblem(await request.json());
    if (!input) return Response.json({ message: "Check the problem fields and selected subtopics." }, { status: 400 });
    const db = getDatabase();
    const [existing] = await db.select({ id: problems.id }).from(problems).where(eq(problems.id, id)).limit(1);
    if (!existing) return Response.json({ message: "Problem not found." }, { status: 404 });
    if (input.imageIds.length) {
      const uploaded = await db.select({ id: contributorImages.id, content: contributorImages.content }).from(contributorImages)
        .where(and(eq(contributorImages.ownerId, contributor.id), inArray(contributorImages.id, input.imageIds)));
      const linked = await db.select({ id: problemImages.imageId }).from(problemImages)
        .where(and(eq(problemImages.problemId, id), inArray(problemImages.imageId, input.imageIds)));
      const available = new Set([...uploaded.filter((image) => !image.content.startsWith(imageUploadPrefix)), ...linked].map((item) => item.id));
      if (input.imageIds.some((imageId) => !available.has(imageId))) return Response.json({ message: "One or more images are unavailable." }, { status: 400 });
    }
    await db.transaction(async (tx) => {
      await tx.update(problems).set({ title: input.title, topic: input.topic, level: input.level, statement: input.statement, explanation: input.explanation, answer: input.encodedAnswers }).where(eq(problems.id, id));
      await tx.delete(problemTopics).where(eq(problemTopics.problemId, id));
      await tx.insert(problemTopics).values(input.selections.map((selection) => ({ problemId: id, ...selection })));
      await tx.delete(problemImages).where(eq(problemImages.problemId, id));
      if (input.imageIds.length) await tx.insert(problemImages).values(input.imageIds.map((imageId) => ({ problemId: id, imageId })));
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "Unable to update the problem." }, { status: 503 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!await authorizeContributor(request)) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id: reference } = await context.params;
    const id = await resolveProblemId(reference);
    if (!id) return Response.json({ message: "Problem not found." }, { status: 404 });
    const db = getDatabase();
    const [existing] = await db.select({ id: problems.id }).from(problems).where(eq(problems.id, id)).limit(1);
    if (!existing) return Response.json({ message: "Problem not found." }, { status: 404 });
    await db.delete(problems).where(eq(problems.id, id));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "Unable to delete the problem." }, { status: 503 });
  }
}
