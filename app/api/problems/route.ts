import { eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { problemProgress, problems, user } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const db = getDatabase();
    const session = await getAuth().api.getSession({ headers: request.headers });
    const rows = await db.select({
      id: problems.id,
      title: problems.title,
      unit: problems.topic,
      level: problems.level,
      rating: problems.rating,
      question: problems.statement,
      published: problems.publishedAt,
      author: user.name,
    }).from(problems).innerJoin(user, eq(problems.authorId, user.id)).where(isNotNull(problems.publishedAt));
    const progress = session
      ? await db.select({ problemId: problemProgress.problemId, solved: problemProgress.solved })
        .from(problemProgress).where(eq(problemProgress.userId, session.user.id))
      : [];
    const statuses = new Map(progress.map((item) => [item.problemId, item.solved ? "solved" : "started"]));
    return Response.json(rows.map((row) => ({ ...row, status: statuses.get(row.id) ?? "new" })));
  } catch {
    return Response.json({ message: "Unable to load problems." }, { status: 503 });
  }
}
