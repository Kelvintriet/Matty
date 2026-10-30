import { authorizeContributor } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages } from "@/lib/db/schema";
import { imageUploadPrefix, maxImageBytes } from "@/lib/image-upload";

export async function POST(request: Request) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const { size, type } = await request.json();
    if (!Number.isInteger(size) || size < 1 || size > maxImageBytes) {
      return Response.json({ message: "Choose an image up to 15 MB." }, { status: 400 });
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
      return Response.json({ message: "Choose a PNG, JPEG, or WebP image." }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await getDatabase().insert(contributorImages).values({ id, ownerId: user.id, content: `${imageUploadPrefix}${size}`, createdAt: new Date() });
    return Response.json({ id });
  } catch {
    return Response.json({ message: "Unable to start the upload." }, { status: 503 });
  }
}
