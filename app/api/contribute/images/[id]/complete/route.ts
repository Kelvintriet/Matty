import sharp from "sharp";
import { and, eq } from "drizzle-orm";
import { authorizeContributor } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages } from "@/lib/db/schema";
import { readImagePart, removeContributorImage, removeImageParts, uploadContributorImage } from "@/lib/filebase";
import { imagePartBytes, pendingImageSize } from "@/lib/image-upload";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id } = await context.params;
    const db = getDatabase();
    const [image] = await db.select({ content: contributorImages.content }).from(contributorImages)
      .where(and(eq(contributorImages.id, id), eq(contributorImages.ownerId, user.id))).limit(1);
    const size = image && pendingImageSize(image.content);
    if (!size) return Response.json({ message: "Upload not found." }, { status: 404 });
    const count = Math.ceil(size / imagePartBytes);
    const parts: Buffer[] = [];
    for (let part = 0; part < count; part += 1) {
      parts.push(await readImagePart(id, part, Math.min(imagePartBytes, size - part * imagePartBytes)));
    }
    const input = Buffer.concat(parts);
    const imageData = sharp(input, { limitInputPixels: 64000000, failOn: "error" });
    const metadata = await imageData.metadata();
    if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
      return Response.json({ message: "Choose a valid PNG, JPEG, or WebP image." }, { status: 400 });
    }
    let data = await imageData.rotate().resize({ width: 4096, height: 4096, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    if (data.length > 3.5 * 1024 * 1024) {
      data = await sharp(input, { limitInputPixels: 64000000, failOn: "error" }).rotate()
        .resize({ width: 2500, height: 2500, fit: "inside", withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
    }
    if (data.length > 4 * 1024 * 1024) return Response.json({ message: "The image could not be optimized. Please try another file." }, { status: 400 });
    const content = await uploadContributorImage(id, data);
    try {
      const [result] = await db.update(contributorImages).set({ content })
        .where(and(eq(contributorImages.id, id), eq(contributorImages.ownerId, user.id), eq(contributorImages.content, image.content)));
      if (result.affectedRows !== 1) {
        await removeContributorImage(content).catch(() => {});
        return Response.json({ message: "Upload no longer available." }, { status: 409 });
      }
    } catch (error) {
      await removeContributorImage(content).catch(() => {});
      throw error;
    }
    await removeImageParts(id, count).catch(() => {});
    return Response.json({ path: `/api/contribute/images/${id}` });
  } catch (error) {
    console.error("Image finalization failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "Unable to finish the upload. Check the file and storage configuration." }, { status: 503 });
  }
}
