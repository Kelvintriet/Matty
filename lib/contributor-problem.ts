import "server-only";

import { topics } from "@/app/content/course";

type TopicSelection = { unitId: string; subtopicId: string };

export function parseContributorProblem(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const { title, selections, level, statement, explanation, answers } = data;
  if (!Array.isArray(selections) || selections.length < 1 || selections.length > 100 ||
    typeof title !== "string" || !title.trim() || title.length > 255 ||
    !Number.isInteger(level) || (level as number) < 1 || (level as number) > 8 ||
    typeof statement !== "string" || !statement.trim() || statement.length > 50000 ||
    typeof explanation !== "string" || !explanation.trim() || explanation.length > 50000 ||
    !Array.isArray(answers) || answers.length < 1 || answers.length > 10 ||
    answers.some((answer: unknown) => typeof answer !== "string" || !answer.trim() || answer.length > 100)) return null;

  const resolved = selections.map((selection: unknown) => {
    if (!selection || typeof selection !== "object" || !("unitId" in selection) || !("subtopicId" in selection)) return null;
    const unit = topics.find((item) => item.id === selection.unitId);
    const subtopic = unit?.lessons.find((lesson) => lesson.id === selection.subtopicId);
    return unit && subtopic ? { unit, subtopic } : null;
  });
  if (resolved.some((item) => !item) || new Set(resolved.map((item) => `${item?.unit.id}:${item?.subtopic.id}`)).size !== resolved.length) return null;
  const first = resolved[0]!;
  const encodedAnswers = JSON.stringify((answers as string[]).map((answer) => answer.trim()));
  const imageIds = [...new Set([...`${statement}\n${explanation}`.matchAll(/\/api\/contribute\/images\/([a-f0-9-]{36})/gi)].map((match) => match[1]))];
  if (encodedAnswers.length > 255 || imageIds.length > 10) return null;

  return {
    title: title.trim(),
    topic: `${first.unit.title} / ${first.subtopic.title}`,
    selections: resolved.map((item): TopicSelection => ({ unitId: item!.unit.id, subtopicId: item!.subtopic.id })),
    level: level as number,
    statement,
    explanation,
    encodedAnswers,
    imageIds,
  };
}
