import { getAuth } from "@/lib/auth";

function handler(request: Request) {
  try {
    return getAuth().handler(request);
  } catch {
    return Response.json({ message: "Authentication is not configured yet." }, { status: 503 });
  }
}

export const GET = handler;
export const POST = handler;
