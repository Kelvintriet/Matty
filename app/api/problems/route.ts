import { eq, inArray, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { problemCodes, problemProgress, problemTopics, problems, user } from "@/lib/db/schema";
import { topics } from "@/app/content/course";

export async function GET(request: Request) {
  try {
    const db = getDatabase();
    const session = await getAuth().api.getSession({ headers: request.headers });
    const rows = await db.select({
      id: problems.id,
      title: problems.title,
      unit: problems.topic,
      level: problems.level,
      question: problems.statement,
      published: problems.publishedAt,
      author: user.name,
    }).from(problems).innerJoin(user, eq(problems.authorId, user.id)).where(isNotNull(problems.publishedAt));
    const codes = rows.length
      ? await db.select().from(problemCodes).where(inArray(problemCodes.problemId, rows.map((row) => row.id)))
      : [];
    const codesByProblem = new Map(codes.map((entry) => [entry.problemId, entry.code]));
    const progress = session
      ? await db.select({ problemId: problemProgress.problemId, solved: problemProgress.solved })
        .from(problemProgress).where(eq(problemProgress.userId, session.user.id))
      : [];
    const tags = rows.length
      ? await db.select().from(problemTopics).where(inArray(problemTopics.problemId, rows.map((row) => row.id)))
      : [];
    const labels = new Map<string, string[]>();
    for (const tag of tags) {
      const unit = topics.find((item) => item.id === tag.unitId);
      const subtopic = unit?.lessons.find((item) => item.id === tag.subtopicId);
      if (unit && subtopic) labels.set(tag.problemId, [...(labels.get(tag.problemId) ?? []), `${unit.title} / ${subtopic.title}`]);
    }
    const statuses = new Map(progress.map((item) => [item.problemId, item.solved ? "solved" : "started"]));
    return Response.json(rows.map((row) => ({ ...row, code: codesByProblem.get(row.id) ?? null, topicLabels: labels.get(row.id) ?? [row.unit], status: statuses.get(row.id) ?? "new" })));
  } catch {
    return Response.json({ message: "Unable to load problems." }, { status: 503 });
  }
}
