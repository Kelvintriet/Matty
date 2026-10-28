import type { GuidedLessonStep, LessonBlock } from "./course";

type Blank = {
  heading: string;
  lines: string[];
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function practice(part: string, questions: Blank[]): GuidedLessonStep[] {
  return questions.map((item, index) => ({
    title: `${part}: fill the blank ${index + 1} of ${questions.length}`,
    part,
    blocks: [{
      type: "quiz",
      proof: { heading: item.heading, lines: item.lines },
      question: item.question,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation,
    }],
  }));
}

function lesson(part: string, blocks: LessonBlock[]): GuidedLessonStep {
  return { title: part, part, blocks };
}

const statement = "Prove \\(1+3+\\cdots+(2n-1)=n^2\\), for integers \\(n\\ge1\\).";

export const inductionSteps: GuidedLessonStep[] = [
  lesson("The idea", [
    { type: "text", text: "Induction proves a statement for every integer from a starting point. We will use one example and build the proof a little at a time." },
    {
      type: "example",
      label: "Our statement",
      expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)",
      detail: "For each positive integer \\(n\\), the first \\(n\\) odd numbers add to \\(n^2\\).",
      steps: [
        "When \\(n=1\\): \\(1=1^2\\).",
        "When \\(n=2\\): \\(1+3=2^2\\).",
        "Checking a few cases is useful, but induction shows why the statement holds for every integer \\(n\\ge1\\).",
      ],
    },
    {
      type: "example",
      label: "The three parts",
      expression: "\\(n=1\\quad\\longrightarrow\\quad n=k\\quad\\longrightarrow\\quad n=k+1\\)",
      detail: "First check the start. Then assume one case is true and prove the next case.",
    },
  ]),
  ...practice("The idea", [
    { heading: statement, lines: ["First check the starting case: \\(n=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(1\\)", "\\(0\\)", "\\(k+1\\)", "\\(3\\)"], answer: "\\(1\\)", explanation: "This statement starts at \\(n=1\\), so that is the first case to check." },
  ]),
  lesson("1. Check n = 1", [
    { type: "text", text: "Put \\(n=1\\) into the statement. Check that the left and right sides are equal." },
    {
      type: "example",
      label: "Write this",
      expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)",
      detail: "At \\(n=1\\), there is only one term on the left.",
      steps: [
        "\\(n=1\\): left side \\(=1\\).",
        "Right side \\(=1^2=1\\).",
        "Both sides are \\(1\\), so the statement is true for \\(n=1\\).",
      ],
    },
  ]),
  ...practice("1. Check n = 1", [
    { heading: statement, lines: ["\\(n=1\\): left side \\(=1\\).", "Right side \\(=1^2=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(1\\)", "\\(2\\)", "\\(0\\)", "\\(3\\)"], answer: "\\(1\\)", explanation: "\\(1^2=1\\). The left side is also \\(1\\)." },
  ]),
  lesson("2. Assume n = k", [
    { type: "text", text: "Let \\(k\\) be any integer with \\(k\\ge1\\). For this step, assume the statement is true when \\(n=k\\)." },
    {
      type: "example",
      label: "Write this",
      expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)",
      detail: "Replace \\(n\\) with \\(k\\) everywhere.",
      steps: [
        "Assume the statement is true for \\(n=k\\).",
        "\\(1+3+\\cdots+(2k-1)=k^2\\).",
        "Keep this line: we will use it in the next step.",
      ],
    },
  ]),
  ...practice("2. Assume n = k", [
    { heading: statement, lines: ["Assume the statement is true for \\(n=k\\):", "\\(1+3+\\cdots+(2k-1)=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k-1\\)", "\\(n^2\\)"], answer: "\\(k^2\\)", explanation: "Replace \\(n\\) with \\(k\\) in the right side \\(n^2\\)." },
  ]),
  lesson("3. Find the next term", [
    { type: "text", text: "Now prove the statement for \\(n=k+1\\). First find the new term that comes after the sum for \\(n=k\\)." },
    {
      type: "example",
      label: "Write this",
      expression: "\\(u_n=2n-1\\)",
      detail: "Replace \\(n\\) with \\(k+1\\) to find the next term.",
      steps: [
        "\\(u_{k+1}=2(k+1)-1\\).",
        "Expand: \\(u_{k+1}=2k+2-1=2k+1\\).",
        "The new sum is \\(S_{k+1}=S_k+(2k+1)\\).",
      ],
    },
  ]),
  ...practice("3. Find the next term", [
    { heading: statement, lines: ["For \\(n=k\\), the sum ends at \\(2k-1\\).", "The next term is \\(2(k+1)-1=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(2k+1\\)", "\\(2k-1\\)", "\\(2k+2\\)", "\\(k+1\\)"], answer: "\\(2k+1\\)", explanation: "\\(2(k+1)-1=2k+2-1=2k+1\\)." },
  ]),
  lesson("4. Go from the left side to the right side", [
    { type: "text", text: "Start with the left side for \\(k+1\\). Use your assumption, add the new term, then factor until it matches the right side you need." },
    {
      type: "example",
      label: "Write this",
      expression: "\\(S_{k+1}=S_k+(2k+1)\\)",
      detail: "From our assumption, \\(S_k=k^2\\).",
      steps: [
        "Left side: \\(S_{k+1}=S_k+(2k+1)\\).",
        "Use the assumption: \\(=k^2+2k+1\\).",
        "Factor: \\(=(k+1)^2\\).",
        "The right side we need is \\((k+1)^2\\), so they match.",
      ],
    },
  ]),
  ...practice("4. Left side to right side", [
    { heading: statement, lines: ["Assume \\(S_k=k^2\\). The next term is \\(2k+1\\).", "\\(S_{k+1}=S_k+(2k+1)=\\boxed{?}+(2k+1)\\)."], question: "Use the assumption to fill the blank.", options: ["\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k-1\\)", "\\(k\\)"], answer: "\\(k^2\\)", explanation: "The assumption says \\(S_k=k^2\\), so replace \\(S_k\\) with \\(k^2\\)." },
    { heading: statement, lines: ["Left side \\(=k^2+2k+1\\).", "Factor: \\(k^2+2k+1=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\((k+1)^2\\)", "\\((k-1)^2\\)", "\\(k^2+1\\)", "\\(2(k+1)\\)"], answer: "\\((k+1)^2\\)", explanation: "\\((k+1)^2=k^2+2k+1\\)." },
    { heading: statement, lines: ["We reached \\(S_{k+1}=(k+1)^2\\).", "The right side of the original formula at \\(n=k+1\\) is \\(\\boxed{?}\\)."], question: "What should it match?", options: ["\\((k+1)^2\\)", "\\(k^2\\)", "\\(2k+1\\)", "\\(1\\)"], answer: "\\((k+1)^2\\)", explanation: "Replace \\(n\\) with \\(k+1\\) in \\(n^2\\)." },
  ]),
  lesson("5. Write the conclusion", [
    { type: "text", text: "You have checked the first case and shown that any true case leads to the next one. Finish by saying what the proof covers." },
    {
      type: "example",
      label: "Write this",
      expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)",
      detail: "Finish the proof in one short paragraph.",
      steps: [
        "The statement is true for \\(n=1\\).",
        "If it is true for \\(n=k\\), we have shown it is true for \\(n=k+1\\).",
        "Therefore, by induction, it is true for every integer \\(n\\ge1\\).",
      ],
    },
  ]),
  ...practice("5. Write the conclusion", [
    { heading: statement, lines: ["The case \\(n=1\\) is true, and the case \\(n=k\\) leads to \\(n=k+1\\).", "Therefore the statement is true for \\(\\boxed{?}\\)."], question: "Complete the conclusion.", options: ["Every integer \\(n\\ge1\\)", "Only \\(n=1\\)", "Only \\(n=k\\)", "Every real number"], answer: "Every integer \\(n\\ge1\\)", explanation: "The proof starts at \\(1\\) and reaches each following integer." },
  ]),
  lesson("Another example: factor the left side", [
    { type: "text", text: "The same steps work for a longer sum. Here is the \\(n=k+1\\) part, starting from the left side." },
    {
      type: "example",
      label: "Try the same method",
      expression: "\\(5+11+\\cdots+(6n-1)=n(3n+2)\\)",
      detail: "Assume \\(S_k=k(3k+2)\\). The next term is \\(6(k+1)-1=6k+5\\).",
      steps: [
        "Left side: \\(S_{k+1}=S_k+(6k+5)\\).",
        "Use the assumption: \\(=k(3k+2)+6k+5\\).",
        "Rewrite: \\(=k(3k+5)+(3k+5)\\).",
        "Factor: \\(=(k+1)(3k+5)\\).",
        "This is \\((k+1)(3(k+1)+2)\\), the original right side with \\(n=k+1\\).",
      ],
    },
  ]),
  ...practice("Another example", [
    { heading: "Prove \\(5+11+\\cdots+(6n-1)=n(3n+2)\\).", lines: ["Assume \\(S_k=k(3k+2)\\).", "The next term is \\(6(k+1)-1=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(6k+5\\)", "\\(6k-1\\)", "\\(6k+6\\)", "\\(3k+5\\)"], answer: "\\(6k+5\\)", explanation: "\\(6(k+1)-1=6k+6-1=6k+5\\)." },
    { heading: "Prove \\(5+11+\\cdots+(6n-1)=n(3n+2)\\).", lines: ["Left side \\(=k(3k+5)+(3k+5)\\).", "Factor: \\(=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\((k+1)(3k+5)\\)", "\\((k-1)(3k+5)\\)", "\\(k(3k+5)\\)", "\\((k+1)(3k+2)\\)"], answer: "\\((k+1)(3k+5)\\)", explanation: "Both terms contain \\(3k+5\\), so factor it out." },
  ]),
  ...practice("Final check", [
    { heading: statement, lines: ["\\(n=1\\): both sides equal \\(1\\).", "Assume \\(1+3+\\cdots+(2k-1)=\\boxed{?}\\)."], question: "Fill the assumption.", options: ["\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k+1\\)", "\\(1\\)"], answer: "\\(k^2\\)", explanation: "The original right side is \\(n^2\\); at \\(n=k\\) it is \\(k^2\\)." },
    { heading: statement, lines: ["Use \\(S_k=k^2\\) and add the next term:", "\\(S_{k+1}=k^2+\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(2k+1\\)", "\\(2k-1\\)", "\\(k+1\\)", "\\(2k\\)"], answer: "\\(2k+1\\)", explanation: "The next term is \\(2(k+1)-1=2k+1\\)." },
    { heading: statement, lines: ["The left side for \\(k+1\\) is \\(k^2+2k+1\\).", "Factor it to get \\(\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\((k+1)^2\\)", "\\((k-1)^2\\)", "\\(k^2+1\\)", "\\(2(k+1)\\)"], answer: "\\((k+1)^2\\)", explanation: "This is the original right side \\(n^2\\) at \\(n=k+1\\)." },
  ]),
];
