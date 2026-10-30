import { and, eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { contributorImages, problemImages, problems } from "@/lib/db/schema";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getDatabase();
    const [image] = await db.select().from(contributorImages).where(eq(contributorImages.id, id)).limit(1);
    if (!image) return new Response(null, { status: 404 });
    const [published] = await db.select({ id: problemImages.imageId }).from(problemImages)
      .innerJoin(problems, eq(problemImages.problemId, problems.id))
      .where(and(eq(problemImages.imageId, id), isNotNull(problems.publishedAt))).limit(1);
    if (!published) {
      const session = await getAuth().api.getSession({ headers: request.headers });
      if (!session || session.user.id !== image.ownerId) return new Response(null, { status: 404 });
    }
    return new Response(new Uint8Array(Buffer.from(image.content, "base64")), {
      headers: { "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", "Cache-Control": "private, no-store" },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
