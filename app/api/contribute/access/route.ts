import { contributorIdentity } from "@/lib/contributor-access";

export async function GET(request: Request) {
  try {
    const user = await contributorIdentity(request);
    return Response.json({ allowed: Boolean(user) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ allowed: false }, { status: 503 });
  }
}
