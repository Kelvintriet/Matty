import { and, eq, inArray } from "drizzle-orm";
import { authorizeContributor } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages, problemImages, problemTopics, problems } from "@/lib/db/schema";
import { topics } from "@/app/content/course";

export async function POST(request: Request) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const body = await request.json();
    const { title, selections, level, rating, statement, explanation, answers } = body;
    if (!Array.isArray(selections) || selections.length < 1 || selections.length > 100) {
      return Response.json({ message: "Choose at least one subtopic." }, { status: 400 });
    }
    const selectedTopics = selections.map((selection: unknown) => {
      if (!selection || typeof selection !== "object" || !("unitId" in selection) || !("subtopicId" in selection)) return null;
      const unit = topics.find((item) => item.id === selection.unitId);
      const subtopic = unit?.lessons.find((lesson) => lesson.id === selection.subtopicId);
      return unit && subtopic ? { unit, subtopic } : null;
    });
    if (selectedTopics.some((item) => !item) || new Set(selectedTopics.map((item) => `${item?.unit.id}:${item?.subtopic.id}`)).size !== selectedTopics.length) {
      return Response.json({ message: "Check the selected subtopics." }, { status: 400 });
    }
    const first = selectedTopics[0]!;
    if (typeof title !== "string" || !title.trim() || title.length > 255 ||
      !Number.isInteger(level) || level < 1 || level > 8 ||
      !Number.isInteger(rating) || rating < 100 || rating > 10000 ||
      typeof statement !== "string" || !statement.trim() || statement.length > 50000 ||
      typeof explanation !== "string" || !explanation.trim() || explanation.length > 50000 ||
      !Array.isArray(answers) || answers.length < 1 || answers.length > 10 ||
      answers.some((answer: unknown) => typeof answer !== "string" || !answer.trim() || answer.length > 100)) {
      return Response.json({ message: "Check the problem fields." }, { status: 400 });
    }
    const encodedAnswers = JSON.stringify(answers.map((answer: string) => answer.trim()));
    if (encodedAnswers.length > 255) return Response.json({ message: "Answers are too long together." }, { status: 400 });
    const imageIds = [...new Set([...`${statement}\n${explanation}`.matchAll(/\/api\/contribute\/images\/([a-f0-9-]{36})/gi)].map((match) => match[1]))];
    if (imageIds.length > 10) return Response.json({ message: "Use at most 10 images." }, { status: 400 });
    const db = getDatabase();
    if (imageIds.length) {
      const images = await db.select({ id: contributorImages.id }).from(contributorImages)
        .where(and(eq(contributorImages.ownerId, user.id), inArray(contributorImages.id, imageIds)));
      if (images.length !== imageIds.length) return Response.json({ message: "One or more images are unavailable." }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const now = new Date();
    await db.transaction(async (tx) => {
      await tx.insert(problems).values({ id, title: title.trim(), topic: `${first.unit.title} / ${first.subtopic.title}`, level, rating, statement, explanation, answer: encodedAnswers, authorId: user.id, createdAt: now, publishedAt: now });
      await tx.insert(problemTopics).values(selectedTopics.map((item) => ({
        problemId: id,
        unitId: item!.unit.id,
        subtopicId: item!.subtopic.id,
      })));
      if (imageIds.length) await tx.insert(problemImages).values(imageIds.map((imageId) => ({ problemId: id, imageId })));
    });
    return Response.json({ id }, { status: 201 });
  } catch {
    return Response.json({ message: "Unable to publish the problem." }, { status: 503 });
  }
}
