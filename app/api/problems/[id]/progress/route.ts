import { and, eq, isNotNull } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { problemProgress, problems } from "@/lib/db/schema";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuth().api.getSession({ headers: request.headers });
    if (!session) return Response.json({ message: "Log in to save progress." }, { status: 401 });
    const { id } = await context.params;
    const db = getDatabase();
    const [row] = await db.select({ solved: problemProgress.solved, explanation: problems.explanation, notes: problemProgress.notes, whiteboard: problemProgress.whiteboard })
      .from(problemProgress).innerJoin(problems, eq(problemProgress.problemId, problems.id))
      .where(and(eq(problemProgress.userId, session.user.id), eq(problemProgress.problemId, id), isNotNull(problems.publishedAt))).limit(1);
    return Response.json({ started: Boolean(row), solved: row?.solved ?? false, explanation: row?.solved ? row.explanation : undefined, notes: row?.notes ?? "", whiteboard: row?.whiteboard ?? null });
  } catch {
    return Response.json({ message: "Unable to load progress." }, { status: 503 });
  }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuth().api.getSession({ headers: request.headers });
    if (!session) return Response.json({ message: "Log in to save progress." }, { status: 401 });
    const { id } = await context.params;
    const db = getDatabase();
    const [problem] = await db.select({ id: problems.id }).from(problems)
      .where(and(eq(problems.id, id), isNotNull(problems.publishedAt))).limit(1);
    if (!problem) return Response.json({ message: "Problem not found." }, { status: 404 });
    await db.insert(problemProgress).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      problemId: id,
      solved: false,
      updatedAt: new Date(),
    }).onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "Unable to save progress." }, { status: 503 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuth().api.getSession({ headers: request.headers });
    if (!session) return Response.json({ message: "Log in to save your work." }, { status: 401 });
    const body = await request.json();
    const encoded = JSON.stringify(body.whiteboard);
    if (typeof body.notes !== "string" || body.notes.length > 200000 || !body.whiteboard || !encoded || encoded.length > 1000000) {
      return Response.json({ message: "Workspace is too large." }, { status: 400 });
    }
    const { id } = await context.params;
    const db = getDatabase();
    const [problem] = await db.select({ id: problems.id }).from(problems)
      .where(and(eq(problems.id, id), isNotNull(problems.publishedAt))).limit(1);
    if (!problem) return Response.json({ message: "Problem not found." }, { status: 404 });
    const values = { notes: body.notes, whiteboard: body.whiteboard, updatedAt: new Date() };
    await db.insert(problemProgress).values({
      id: crypto.randomUUID(), userId: session.user.id, problemId: id, solved: false, ...values,
    }).onDuplicateKeyUpdate({ set: values });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "Unable to save your work." }, { status: 503 });
  }
}
