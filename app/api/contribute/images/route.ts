import sharp from "sharp";
import { authorizeContributor } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages } from "@/lib/db/schema";
import { removeContributorImage, uploadContributorImage } from "@/lib/filebase";

export async function POST(request: Request) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const length = Number(request.headers.get("content-length"));
    if (Number.isFinite(length) && length > 3 * 1024 * 1024) return Response.json({ message: "Image is too large." }, { status: 413 });
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File) || file.size === 0 || file.size > 2 * 1024 * 1024) {
      return Response.json({ message: "Choose an image under 2 MB." }, { status: 400 });
    }
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { limitInputPixels: 16000000, failOn: "error" });
    const metadata = await image.metadata();
    if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
      return Response.json({ message: "Choose a PNG, JPEG, or WebP image." }, { status: 400 });
    }
    const data = await image.rotate().webp({ quality: 85 }).toBuffer();
    const id = crypto.randomUUID();
    const content = await uploadContributorImage(id, data);
    try {
      await getDatabase().insert(contributorImages).values({ id, ownerId: user.id, content, createdAt: new Date() });
    } catch (error) {
      await removeContributorImage(content).catch(() => {});
      throw error;
    }
    return Response.json({ path: `/api/contribute/images/${id}` });
  } catch {
    return Response.json({ message: "Unable to upload the image. Check the file and storage configuration." }, { status: 503 });
  }
}
