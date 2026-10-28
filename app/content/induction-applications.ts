import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";

type ProofQuestion = {
  heading: string;
  lines: string[];
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function proofPractice(title: string, questions: ProofQuestion[]): GuidedLessonStep[] {
  return questions.map((item, index) => ({
    title: `${title}: fill the blank ${index + 1} of ${questions.length}`,
    part: title,
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

const oddSum = "Prove \\(1+3+\\cdots+(2n-1)=n^2\\) for \\(n\\ge 1\\).";

export const inductionSteps: GuidedLessonStep[] = [
  {
    title: "How to write an induction proof",
    part: "The proof template",
    blocks: [
      { type: "text", text: "Induction proves a statement for every integer from a starting value. Label each part so a reader can follow your proof." },
      {
        type: "example",
        label: "Proof template",
        expression: "\\(P(n)\\): the statement to prove",
        detail: "Replace the placeholders with the actual statement and calculations.",
        steps: [
          "Base case: Check the statement at its first required value, usually \\(n=1\\). Show both sides agree.",
          "Inductive hypothesis: Let \\(k\\) be an arbitrary integer at or above the starting value. Assume \\(P(k)\\) is true and write the exact equation.",
          "Inductive step: State what \\(P(k+1)\\) must say. Start from its left side, use the hypothesis, and show it equals the required right side.",
          "Conclusion: Since the base case holds and \\(P(k)\\) implies \\(P(k+1)\\), the statement holds for every integer in the stated range by induction.",
        ],
      },
      {
        type: "example",
        label: "Worked proof",
        expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)",
        detail: "This proves the sum of the first positive odd numbers.",
        steps: [
          "Base case \\(n=1\\): the left side is \\(1\\) and the right side is \\(1^2=1\\), so both sides agree.",
          "Hypothesis: for an arbitrary integer \\(k\\ge1\\), assume \\(1+3+\\cdots+(2k-1)=k^2\\).",
          "Required at \\(k+1\\): \\(1+3+\\cdots+(2k-1)+(2(k+1)-1)=(k+1)^2\\).",
          "Use the hypothesis on the left: \\(k^2+2(k+1)-1=k^2+2k+1=(k+1)^2\\).",
          "The base case holds and the implication is proved, so the identity holds for all integers \\(n\\ge1\\).",
        ],
      },
    ],
  },
  ...proofPractice("The proof template", [
    { heading: oddSum, lines: ["Base case: prove the statement for \\(n=\\boxed{?}\\).", "Then assume the statement for an arbitrary \\(k\\ge1\\)."], question: "Fill the base-case blank.", options: ["\\(1\\)", "\\(0\\)", "\\(k+1\\)", "\\(2\\)"], answer: "\\(1\\)", explanation: "The statement begins at \\(n=1\\), so check that value first." },
    { heading: oddSum, lines: ["Inductive hypothesis: assume the statement is true for \\(n=k\\).", "Inductive step: prove it for \\(n=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(k+1\\)", "\\(k-1\\)", "\\(1\\)", "\\(2k\\)"], answer: "\\(k+1\\)", explanation: "The inductive step links a true case at \\(k\\) to the next case at \\(k+1\\)." },
    { heading: oddSum, lines: ["The base case holds, and the statement for \\(k\\) implies the statement for \\(k+1\\).", "Therefore it holds for \\(\\boxed{?}\\)."], question: "Complete the conclusion.", options: ["All integers \\(n\\ge1\\)", "Only \\(n=1\\)", "Only \\(n=k\\)", "All real numbers"], answer: "All integers \\(n\\ge1\\)", explanation: "The base case and inductive implication cover every integer from the stated starting value." },
  ]),
  {
    title: "Write the base case",
    part: "Base case",
    blocks: [
      { type: "text", text: "Substitute the first value into the statement. Show the left and right sides separately, then state that they agree." },
      { type: "example", label: "Worked base case", expression: "\\(5+11+\\cdots+(6n-1)=n(3n+2)\\)", detail: "Check the first required case, \\(n=1\\).", steps: ["Left side: the first term is \\(6(1)-1=5\\).", "Right side: \\(1(3(1)+2)=5\\).", "Both sides equal \\(5\\), so the base case holds."] },
      { type: "example", label: "Another base case", expression: "\\(2+4+\\cdots+2n=n^2+n\\)", detail: "Check \\(n=1\\).", steps: ["Left side: the first term is \\(2\\).", "Right side: \\(1^2+1=2\\).", "Both sides agree, so the statement holds at \\(n=1\\)."] },
    ],
  },
  ...proofPractice("Base case", [
    { heading: oddSum, lines: ["Base case \\(n=1\\):", "Left side \\(=1\\); right side \\(=1^2=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(1\\)", "\\(2\\)", "\\(0\\)", "\\(k\\)"], answer: "\\(1\\)", explanation: "\\(1^2=1\\), matching the left side." },
    { heading: "Prove \\(5+11+\\cdots+(6n-1)=n(3n+2)\\) for \\(n\\ge1\\).", lines: ["Base case \\(n=1\\):", "Left side \\(=6(1)-1=\\boxed{?}\\); right side \\(=1(3(1)+2)=5\\)."], question: "Fill the blank.", options: ["\\(5\\)", "\\(6\\)", "\\(11\\)", "\\(1\\)"], answer: "\\(5\\)", explanation: "The first term is \\(6(1)-1=5\\), matching the right side." },
    { heading: "Prove \\(2+4+\\cdots+2n=n^2+n\\) for \\(n\\ge1\\).", lines: ["Base case \\(n=1\\): left side \\(=2\\).", "Right side \\(=1^2+1=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(2\\)", "\\(1\\)", "\\(0\\)", "\\(4\\)"], answer: "\\(2\\)", explanation: "\\(1^2+1=2\\), so both sides agree." },
  ]),
  {
    title: "Write the inductive hypothesis",
    part: "Hypothesis",
    blocks: [
      { type: "text", text: "Choose an arbitrary integer \\(k\\) in the required range. Assume the original statement holds at \\(n=k\\); do not assume the case you are trying to prove." },
      { type: "example", label: "Worked hypothesis", expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)", detail: "Replace every \\(n\\) in the statement by \\(k\\).", steps: ["Let \\(k\\ge1\\) be an arbitrary integer.", "Assume \\(1+3+\\cdots+(2k-1)=k^2\\).", "This is the inductive hypothesis, not the conclusion."] },
      { type: "example", label: "Another hypothesis", expression: "\\(5+11+\\cdots+(6n-1)=n(3n+2)\\)", detail: "State the exact equation at \\(n=k\\).", steps: ["Let \\(k\\ge1\\) be an arbitrary integer.", "Assume \\(5+11+\\cdots+(6k-1)=k(3k+2)\\).", "Use this equality in the inductive step."] },
    ],
  },
  ...proofPractice("Hypothesis", [
    { heading: oddSum, lines: ["Let \\(k\\ge1\\) be an arbitrary integer.", "Assume \\(1+3+\\cdots+(2k-1)=\\boxed{?}\\)."], question: "Fill the hypothesis blank.", options: ["\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k-1\\)", "\\(n^2\\)"], answer: "\\(k^2\\)", explanation: "Replace \\(n\\) by \\(k\\) in the original right side \\(n^2\\)." },
    { heading: "Prove \\(5+11+\\cdots+(6n-1)=n(3n+2)\\).", lines: ["For arbitrary \\(k\\ge1\\), assume:", "\\(5+11+\\cdots+(6k-1)=\\boxed{?}\\)."], question: "Complete the hypothesis.", options: ["\\(k(3k+2)\\)", "\\((k+1)(3k+5)\\)", "\\(6k-1\\)", "\\(n(3n+2)\\)"], answer: "\\(k(3k+2)\\)", explanation: "Substitute \\(n=k\\) in the stated formula." },
    { heading: "Prove \\(2+4+\\cdots+2n=n^2+n\\).", lines: ["For arbitrary \\(k\\ge1\\), assume:", "\\(2+4+\\cdots+2k=\\boxed{?}\\)."], question: "Fill the blank.", options: ["\\(k^2+k\\)", "\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k\\)"], answer: "\\(k^2+k\\)", explanation: "Replace \\(n\\) by \\(k\\) on the right side." },
  ]),
  {
    title: "Write the inductive step",
    part: "Inductive step",
    blocks: [
      { type: "text", text: "State the target for \\(k+1\\), add the next term to the sum at \\(k\\), and use the hypothesis. For sums, \\(S_{k+1}=S_k+u_{k+1}\\)." },
      { type: "example", label: "Worked inductive step", expression: "\\(1+3+\\cdots+(2n-1)=n^2\\)", detail: "Assume \\(S_k=k^2\\); prove \\(S_{k+1}=(k+1)^2\\).", steps: ["The next term is \\(u_{k+1}=2(k+1)-1=2k+1\\).", "Start with \\(S_{k+1}=S_k+u_{k+1}\\).", "Use the hypothesis: \\(S_{k+1}=k^2+(2k+1)\\).", "Factor: \\(k^2+2k+1=(k+1)^2\\), which is the required right side."] },
      { type: "example", label: "Another inductive step", expression: "\\(5+11+\\cdots+(6n-1)=n(3n+2)\\)", detail: "Assume \\(S_k=k(3k+2)\\).", steps: ["The next term is \\(u_{k+1}=6(k+1)-1=6k+5\\).", "Add it to the hypothesis: \\(S_{k+1}=k(3k+2)+6k+5\\).", "Expand: \\(3k^2+8k+5\\).", "Factor: \\((k+1)(3k+5)=(k+1)(3(k+1)+2)\\), the required right side."] },
    ],
  },
  ...proofPractice("Inductive step", [
    { heading: oddSum, lines: ["Hypothesis: \\(S_k=k^2\\).", "Next term: \\(u_{k+1}=2(k+1)-1=\\boxed{?}\\)."], question: "Fill the next-term blank.", options: ["\\(2k+1\\)", "\\(2k-1\\)", "\\(k+1\\)", "\\(2k+2\\)"], answer: "\\(2k+1\\)", explanation: "Expand \\(2(k+1)-1=2k+2-1=2k+1\\)." },
    { heading: oddSum, lines: ["Hypothesis: \\(S_k=k^2\\); next term: \\(u_{k+1}=2k+1\\).", "\\(S_{k+1}=\\boxed{?}+2k+1\\)."], question: "Use the hypothesis to fill the blank.", options: ["\\(k^2\\)", "\\((k+1)^2\\)", "\\(2k-1\\)", "\\(k\\)"], answer: "\\(k^2\\)", explanation: "The hypothesis lets us replace \\(S_k\\) with \\(k^2\\)." },
    { heading: oddSum, lines: ["After applying the hypothesis:", "\\(S_{k+1}=k^2+2k+1=\\boxed{?}\\)."], question: "Complete the factorisation.", options: ["\\((k+1)^2\\)", "\\(k^2+1\\)", "\\((k-1)^2\\)", "\\(2(k+1)\\)"], answer: "\\((k+1)^2\\)", explanation: "Expanding \\((k+1)^2\\) gives \\(k^2+2k+1\\)." },
    { heading: "Prove \\(5+11+\\cdots+(6n-1)=n(3n+2)\\).", lines: ["Hypothesis: \\(S_k=k(3k+2)\\).", "\\(S_{k+1}=k(3k+2)+\\boxed{?}\\)."], question: "Fill in the next term.", options: ["\\(6(k+1)-1\\)", "\\(6k-1\\)", "\\(6k+11\\)", "\\(k+1\\)"], answer: "\\(6(k+1)-1\\)", explanation: "Replace n by \\(k+1\\) in the term rule \\(u_n=6n-1\\)." },
  ]),
  ...proofPractice("Final check", [
    { heading: oddSum, lines: ["Base: the statement holds at \\(n=1\\). Assume \\(S_k=k^2\\).", "\\(S_{k+1}=S_k+\\boxed{?}\\)."], question: "Fill in the next term.", options: ["\\(2k+1\\)", "\\(2k-1\\)", "\\(k^2\\)", "\\(2k+2\\)"], answer: "\\(2k+1\\)", explanation: "The next odd term is \\(2(k+1)-1=2k+1\\)." },
    { heading: "Prove \\(2+4+\\cdots+2n=n^2+n\\).", lines: ["Assume \\(S_k=k^2+k\\).", "\\(S_{k+1}=k^2+k+2(k+1)=\\boxed{?}\\)."], question: "Fill the required result.", options: ["\\((k+1)^2+(k+1)\\)", "\\((k+1)^2\\)", "\\(k^2+k\\)", "\\(2k+2\\)"], answer: "\\((k+1)^2+(k+1)\\)", explanation: "Both sides expand to \\(k^2+3k+2\\), so this is the original formula with \\(n=k+1\\)." },
    { heading: oddSum, lines: ["The base case holds at \\(n=1\\). For arbitrary \\(k\\ge1\\), \\(P(k)\\) implies \\(P(k+1)\\).", "By induction, \\(P(n)\\) holds for \\(\\boxed{?}\\)."], question: "Complete the proof conclusion.", options: ["All integers \\(n\\ge1\\)", "Only \\(n=1\\)", "Only \\(n=k+1\\)", "All real numbers"], answer: "All integers \\(n\\ge1\\)", explanation: "The base case and implication establish every integer case from \\(1\\) onward." },
  ]),
];

export const sequenceApplicationsSteps: GuidedLessonStep[] = [
  ...section(
    "Choose the model",
    "List the first few terms. A constant change suggests an arithmetic sequence; a constant multiplier suggests a geometric sequence. Decide whether the question asks for one term or a total.",
    [
      { expression: "\\(15,13,11,9,\\ldots\\)", detail: "Each tower row has two fewer blocks than the previous row.", steps: ["Compare consecutive rows: \\(13-15=-2\\) and \\(11-13=-2\\).", "The difference is constant, so use an arithmetic model with \\(u_1=15\\) and \\(d=-2\\).", "Use \\(u_n\\) for one row or \\(S_n\\) for the total across rows."] },
      { expression: "\\(100,150,225,337.5,\\ldots\\)", detail: "Each generation is \\(1.5\\) times the previous one.", steps: ["Calculate \\(150\\div100=1.5\\) and \\(225\\div150=1.5\\).", "The ratio is constant, so use a geometric model with \\(u_1=100\\) and \\(r=1.5\\).", "These values are predictions from the model; an actual insect count must be a whole number."] },
    ],
    [
      { question: "A quantity increases by \\(5\\) each period. Which model fits?", options: ["Arithmetic", "Geometric", "Neither", "Always quadratic"], answer: "Arithmetic", explanation: "A constant difference gives an arithmetic sequence." },
      { question: "A quantity is multiplied by \\(1.5\\) each generation. Which model fits?", options: ["Geometric", "Arithmetic", "Neither", "Always constant"], answer: "Geometric", explanation: "A constant ratio gives a geometric sequence." },
      { question: "A question asks for the blocks in row \\(8\\). Which quantity is needed?", options: ["\\(u_8\\)", "\\(S_8\\)", "\\(u_1+u_8\\)", "\\(S_1\\)"], answer: "\\(u_8\\)", explanation: "A single row is one term, \\(u_8\\)." },
      { question: "A question asks for the blocks across the first \\(8\\) rows. Which quantity is needed?", options: ["\\(S_8\\)", "\\(u_8\\)", "\\(d\\)", "\\(r\\)"], answer: "\\(S_8\\)", explanation: "A total across the first eight rows is the sum \\(S_8\\)." },
      { question: "The terms are \\(12,9,6,3,\\ldots\\). What is the common difference?", options: ["\\(-3\\)", "\\(3\\)", "\\(\\frac{1}{3}\\)", "\\(-9\\)"], answer: "\\(-3\\)", explanation: "Each term is \\(3\\) less than the previous term." },
    ],
  ),
  ...section(
    "Tower rows and totals",
    "A tower has \\(15\\) blocks in its bottom row and each next row has \\(2\\) fewer. Find a particular row with the nth-term formula; find the total with the series formula.",
    [
      { expression: "\\(u_1=15,\\quad d=-2,\\quad n=8\\)", detail: "Find the eighth, or top, row.", steps: ["Use \\(u_n=u_1+(n-1)d\\).", "Substitute \\(u_8=15+(8-1)(-2)\\).", "Calculate \\(u_8=15-14=1\\) block."] },
      { expression: "\\(S_8=\\dfrac{8}{2}(15+1)=64\\)", detail: "Count the blocks in all eight rows.", steps: ["The first row has \\(15\\) blocks and the eighth has \\(1\\).", "Use \\(S_n=\\dfrac{n}{2}(u_1+u_n)\\).", "Substitute: \\(S_8=4(16)=64\\) blocks."] },
    ],
    [
      { question: "What is the common difference between tower rows?", options: ["\\(-2\\)", "\\(2\\)", "\\(15\\)", "\\(-1\\)"], answer: "\\(-2\\)", explanation: "Each new row has two fewer blocks." },
      { question: "How many blocks are in the fourth row?", options: ["\\(9\\)", "\\(7\\)", "\\(11\\)", "\\(13\\)"], answer: "\\(9\\)", explanation: "\\(u_4=15+3(-2)=9\\)." },
      { question: "How many blocks are in the eighth row?", options: ["\\(1\\)", "\\(3\\)", "\\(0\\)", "\\(2\\)"], answer: "\\(1\\)", explanation: "\\(u_8=15+7(-2)=1\\)." },
      { question: "How many blocks are in all \\(8\\) rows?", options: ["\\(64\\)", "\\(60\\)", "\\(120\\)", "\\(16\\)"], answer: "\\(64\\)", explanation: "\\(S_8=8(15+1)/2=64\\)." },
      { question: "How many changes occur from row \\(1\\) to row \\(8\\)?", options: ["\\(7\\)", "\\(8\\)", "\\(6\\)", "\\(15\\)"], answer: "\\(7\\)", explanation: "There are \\(8-1=7\\) gaps between the first and eighth rows." },
    ],
  ),
  ...section(
    "Growth across generations",
    "For a constant growth factor, use a geometric sequence. The first listed generation is \\(n=1\\), so the exponent is \\(n-1\\).",
    [
      { expression: "\\(u_n=100(1.5)^{n-1}\\)", detail: "A model starts with \\(100\\) insects and multiplies by \\(1.5\\) each generation.", steps: ["The initial value is \\(u_1=100\\) and the ratio is \\(r=1.5\\).", "The fifth generation is \\(u_5=100(1.5)^4=506.25\\).", "This is a model prediction; an actual count must be whole."] },
      { expression: "\\(S_5=100+150+225+337.5+506.25=1318.75\\)", detail: "The total adds the model’s first five generation values.", steps: ["List the first five predicted terms: \\(100,150,225,337.5,506.25\\).", "Add them to get \\(1318.75\\).", "Alternatively use the finite geometric sum formula with \\(n=5\\)."] },
      { expression: "\\(u_7=10(1.4)^6\\approx75.3\\)", detail: "A model starts with \\(10\\) new infections on day one and increases by \\(40\\%\\) per day.", steps: ["A \\(40\\%\\) increase means the multiplier is \\(1+0.40=1.4\\).", "Day seven is six multiplications after day one: \\(u_7=10(1.4)^6=75.29536\\).", "The model predicts about \\(75.3\\) new infections; an actual count must be whole."] },
    ],
    [
      { question: "What is the second predicted generation if \\(u_1=100\\) and \\(r=1.5\\)?", options: ["\\(150\\)", "\\(105\\)", "\\(250\\)", "\\(50\\)"], answer: "\\(150\\)", explanation: "\\(u_2=100(1.5)=150\\)." },
      { question: "What is the third predicted generation?", options: ["\\(225\\)", "\\(200\\)", "\\(300\\)", "\\(337.5\\)"], answer: "\\(225\\)", explanation: "\\(u_3=100(1.5)^2=225\\)." },
      { question: "Which expression gives the fifth generation?", options: ["\\(100(1.5)^4\\)", "\\(100(1.5)^5\\)", "\\(100+4(1.5)\\)", "\\(100(1.5)^3\\)"], answer: "\\(100(1.5)^4\\)", explanation: "The fifth term is four multiplications after the first." },
      { question: "What is the model’s sum of the first \\(3\\) generations?", options: ["\\(475\\)", "\\(225\\)", "\\(375\\)", "\\(575\\)"], answer: "\\(475\\)", explanation: "\\(100+150+225=475\\)." },
      { question: "A quantity grows by \\(40\\%\\) each day. What is its daily multiplier?", options: ["\\(1.4\\)", "\\(0.4\\)", "\\(40\\)", "\\(1.04\\)"], answer: "\\(1.4\\)", explanation: "Keep \\(100\\%\\) of the previous amount and add \\(40\\%\\): \\(1+0.4=1.4\\)." },
    ],
  ),
  ...section(
    "Savings and targets",
    "A person deposits $\\(100\\) in the first month and $\\(10\\) more each month, with no interest. The deposits form an arithmetic sequence; the savings balance is their cumulative sum.",
    [
      { expression: "\\(100+110+120+130=460\\)", detail: "Find the amount saved after four months.", steps: ["The first deposit is \\(u_1=100\\) dollars and \\(d=10\\) dollars.", "The first four deposits are \\(100,110,120,130\\).", "Their total is \\(S_4=460\\) dollars."] },
      { expression: "\\(S_8=1080,\\qquad S_9=1260\\)", detail: "Find the first month the savings reach $\\(1200\\).", steps: ["Use \\(S_n=\\dfrac{n}{2}[2(100)+(n-1)10]\\).", "At \\(n=8\\), \\(S_8=4(270)=1080\\), below the goal.", "At \\(n=9\\), \\(S_9=\\dfrac{9}{2}(280)=1260\\), reaching the goal.", "So the first month at or above \\(1200\\) dollars is month \\(9\\)."] },
    ],
    [
      { question: "What is the second deposit?", options: ["$\\(110\\)", "$\\(100\\)", "$\\(120\\)", "$\\(10\\)"], answer: "$\\(110\\)", explanation: "Increase the first deposit by $\\(10\\)." },
      { question: "What is the fourth deposit?", options: ["$\\(130\\)", "$\\(140\\)", "$\\(120\\)", "$\\(460\\)"], answer: "$\\(130\\)", explanation: "\\(u_4=100+3(10)=130\\) dollars." },
      { question: "How much is saved over the first four months?", options: ["$\\(460\\)", "$\\(130\\)", "$\\(400\\)", "$\\(500\\)"], answer: "$\\(460\\)", explanation: "\\(100+110+120+130=460\\) dollars." },
      { question: "The balance is \\(1080\\) dollars after month \\(8\\). Has it reached \\(1200\\) dollars?", options: ["No", "Yes", "Only if the deposit was \\(1200\\) dollars", "Cannot compare"], answer: "No", explanation: "\\(1080<1200\\)." },
      { question: "The balance is \\(1260\\) dollars after month \\(9\\) and \\(1080\\) after month \\(8\\). When is \\(1200\\) first reached?", options: ["Month \\(9\\)", "Month \\(8\\)", "Month \\(10\\)", "Month \\(4\\)"], answer: "Month \\(9\\)", explanation: "Month \\(8\\) is below the target; month \\(9\\) is above it." },
    ],
  ),
  ...finalCheck([
    { question: "A tower starts at \\(15\\) blocks, with \\(2\\) fewer in each row. How many blocks are in the top row if there are \\(8\\) rows?", options: ["\\(1\\)", "\\(3\\)", "\\(0\\)", "\\(64\\)"], answer: "\\(1\\)", explanation: "\\(u_8=15+7(-2)=1\\)." },
    { question: "Starting at \\(100\\), a model multiplies by \\(1.5\\) each generation. What is its fifth term?", options: ["\\(506.25\\)", "\\(337.5\\)", "\\(759.375\\)", "\\(150\\)"], answer: "\\(506.25\\)", explanation: "\\(u_5=100(1.5)^4=506.25\\)." },
    { question: "Deposits start at \\(100\\) dollars and increase by \\(10\\) each month. With no interest, when is \\(1200\\) dollars first reached?", options: ["Month \\(9\\)", "Month \\(8\\)", "Month \\(10\\)", "Month \\(12\\)"], answer: "Month \\(9\\)", explanation: "The cumulative totals are \\(S_8=1080\\) and \\(S_9=1260\\)." },
  ]),
];
