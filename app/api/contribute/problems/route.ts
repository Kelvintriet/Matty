import { imageUploadPrefix } from "@/lib/image-upload";
import { eq, inArray } from "drizzle-orm";
import { authorizeContributor, contributorIdentity } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages, problemCodes, problemImages, problemTopics, problems, user } from "@/lib/db/schema";
import { parseContributorProblem } from "@/lib/contributor-problem";
import { isDuplicateKey, problemCodeAt, problemCodeCount, randomCodeOffset } from "@/lib/problem-codes";

export async function GET(request: Request) {
  try {
    if (!await contributorIdentity(request)) return Response.json({ message: "Access denied." }, { status: 403 });
    const rows = await getDatabase().select({
      id: problems.id,
      code: problemCodes.code,
      title: problems.title,
      author: user.name,
      level: problems.level,
    }).from(problems).innerJoin(user, eq(problems.authorId, user.id))
      .leftJoin(problemCodes, eq(problemCodes.problemId, problems.id));
    return Response.json(rows, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ message: "Unable to load problems." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const input = parseContributorProblem(await request.json());
    if (!input) return Response.json({ message: "Check the problem fields and selected subtopics." }, { status: 400 });
    const { title, topic, selections, level, statement, explanation, encodedAnswers, imageIds } = input;
    const db = getDatabase();
    if (imageIds.length) {
      const images = await db.select({ id: contributorImages.id, content: contributorImages.content }).from(contributorImages)
        .where(inArray(contributorImages.id, imageIds));
      if (images.length !== imageIds.length || images.some((image) => image.content.startsWith(imageUploadPrefix))) return Response.json({ message: "One or more images are unavailable." }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const now = new Date();
    const occupied = new Set((await db.select({ code: problemCodes.code }).from(problemCodes)).map((row) => row.code));
    const start = randomCodeOffset();
    for (let attempt = 0; attempt < problemCodeCount; attempt += 1) {
      const code = problemCodeAt((start + attempt) % problemCodeCount);
      if (occupied.has(code)) continue;
      try {
        await db.transaction(async (tx) => {
          // Keep the existing database column for compatibility with older records.
          await tx.insert(problems).values({ id, title, topic, level, rating: 1200, statement, explanation, answer: encodedAnswers, authorId: user.id, createdAt: now, publishedAt: now });
          await tx.insert(problemCodes).values({ problemId: id, code });
          await tx.insert(problemTopics).values(selections.map((item) => ({ problemId: id, ...item })));
          if (imageIds.length) await tx.insert(problemImages).values(imageIds.map((imageId) => ({ problemId: id, imageId })));
        });
        return Response.json({ id: code }, { status: 201 });
      } catch (error) {
        if (!isDuplicateKey(error)) throw error;
      }
    }
    return Response.json({ message: "Unable to assign a unique problem code." }, { status: 503 });
  } catch {
    return Response.json({ message: "Unable to publish the problem." }, { status: 503 });
  }
}
