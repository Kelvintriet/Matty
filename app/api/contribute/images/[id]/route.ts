import { and, eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { contributorIdentity } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages, problemImages, problems } from "@/lib/db/schema";
import { readContributorImage, removeImageParts } from "@/lib/filebase";
import { imagePartBytes, imageUploadPrefix, pendingImageSize } from "@/lib/image-upload";
import { authorizeContributor } from "@/lib/contributor-access";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getDatabase();
    const [image] = await db.select().from(contributorImages).where(eq(contributorImages.id, id)).limit(1);
    if (!image || image.content.startsWith(imageUploadPrefix)) return new Response(null, { status: 404 });
    const [published] = await db.select({ id: problemImages.imageId }).from(problemImages)
      .innerJoin(problems, eq(problemImages.problemId, problems.id))
      .where(and(eq(problemImages.imageId, id), isNotNull(problems.publishedAt))).limit(1);
    if (!published) {
      const session = await getAuth().api.getSession({ headers: request.headers });
      if ((!session || session.user.id !== image.ownerId) && !await contributorIdentity(request)) return new Response(null, { status: 404 });
    }
    return new Response(new Uint8Array(await readContributorImage(image.content)), {
      headers: { "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", "Cache-Control": "private, no-store" },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id } = await context.params;
    const db = getDatabase();
    const [image] = await db.select({ content: contributorImages.content }).from(contributorImages)
      .where(and(eq(contributorImages.id, id), eq(contributorImages.ownerId, user.id))).limit(1);
    const size = image && pendingImageSize(image.content);
    if (!size) return Response.json({ message: "Upload not found." }, { status: 404 });
    await removeImageParts(id, Math.ceil(size / imagePartBytes)).catch(() => {});
    await db.delete(contributorImages).where(and(eq(contributorImages.id, id), eq(contributorImages.ownerId, user.id), eq(contributorImages.content, image.content)));
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Image request failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "Unable to cancel the upload." }, { status: 503 });
  }
}
