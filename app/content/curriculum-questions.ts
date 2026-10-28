export function question(
  question: string,
  options: string[],
  answer: string,
  explanation: string,
) {
  return { question, options, answer, explanation };
}
