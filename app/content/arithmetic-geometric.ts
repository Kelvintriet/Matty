import { finalCheck, section } from "./sequences";
import type { GuidedLessonStep } from "./course";

export const arithmeticSequenceSteps: GuidedLessonStep[] = [
  ...section(
    "Recognising arithmetic sequences",
    "An arithmetic sequence adds the same number each time. This fixed change is the common difference, d. It can be positive, negative, or zero.",
    [
      {
        expression: "\\(1\\), \\(4\\), \\(7\\), \\(10\\), … → \\(d = 3\\)",
        detail: "Subtract each term from the next one.",
        steps: ["\\(4 - 1 = 3\\).", "\\(7 - 4 = 3\\) and \\(10 - 7 = 3\\).", "The difference is always \\(3\\), so the sequence is arithmetic."],
      },
      {
        expression: "\\(8\\), \\(3\\), \\(-2\\), \\(-7\\), … → \\(d = -5\\)",
        detail: "A decreasing arithmetic sequence has a negative common difference.",
        steps: ["Subtract consecutive terms: \\(3 - 8 = -5\\).", "Check: \\(-2 - 3 = -5\\) and \\(-7\\) − (\\(-2) = -5\\).", "The common difference is \\(-5\\)."],
      },
    ],
    [
      { question: "What is the common difference of \\(3\\), \\(12\\), \\(21\\), \\(30\\), …?", options: ["\\(9\\)", "\\(3\\)", "\\(12\\)", "\\(-9\\)"], answer: "\\(9\\)", explanation: "\\(12 - 3 = 9\\) and \\(21 - 12 = 9\\)." },
      { question: "What is the common difference of \\(25\\), \\(23\\), \\(21\\), \\(19\\), …?", options: ["\\(-2\\)", "\\(2\\)", "\\(-4\\)", "\\(23\\)"], answer: "\\(-2\\)", explanation: "Each term decreases by \\(2\\); \\(23 - 25 = -2\\)." },
      { question: "Which sequence is arithmetic?", options: ["\\(-6\\), \\(1\\), \\(8\\), \\(15\\)", "\\(2\\), \\(4\\), \\(8\\), \\(16\\)", "\\(1\\), \\(4\\), \\(9\\), \\(16\\)", "\\(3\\), \\(9\\), \\(27\\), \\(81\\)"], answer: "\\(-6\\), \\(1\\), \\(8\\), \\(15\\)", explanation: "Each term increases by \\(7\\). The other sequences do not have a constant difference." },
      { question: "Is \\(2\\), \\(5\\), \\(9\\), \\(14\\), \\(20\\), … arithmetic?", options: ["No", "Yes, \\(d = 3\\)", "Yes, \\(d = 4\\)", "Yes, \\(d = 5\\)"], answer: "No", explanation: "The differences are \\(3\\), \\(4\\), \\(5\\) and \\(6\\), so they are not constant." },
      { question: "What is the next term of \\(5\\), \\(8\\), \\(11\\), \\(14\\), …?", options: ["\\(17\\)", "\\(16\\)", "\\(18\\)", "\\(22\\)"], answer: "\\(17\\)", explanation: "The common difference is \\(3\\), so \\(14 + 3 = 17\\)." },
    ],
  ),
  ...section(
    "The arithmetic nth-term formula",
    "If \\(u_{1}\\) is the first term and d is the common difference, then \\(u_{n} = u_{1}\\) + (\\(n - 1)d\\). There are \\(n - 1\\) jumps from the first term to the nth term.",
    [
      {
        expression: "\\(4\\), \\(7\\), \\(10\\), \\(13\\), … → \\(u_{n} = 4\\) + (\\(n - 1)3\\)",
        detail: "Start at \\(4\\) and add \\(3\\) for every jump.",
        steps: ["The first term is \\(u_{1} = 4\\) and the common difference is \\(d = 3\\).", "Substitute into \\(u_{n} = u_{1}\\) + (\\(n - 1)d\\): \\(u_{n} = 4\\) + (\\(n - 1)3\\).", "Check \\(n = 1\\): \\(4 + 0 \\times  3 = 4\\).", "Check \\(n = 4\\): \\(4 + 3 \\times  3 = 13\\)."],
      },
      {
        expression: "\\(12\\), \\(9\\), \\(6\\), \\(3\\), … → \\(u_{n} = 12\\) + (\\(n - 1)(-3)\\)",
        detail: "Keep the negative sign when substituting d.",
        steps: ["\\(u_{1} = 12\\) and \\(d = 9 - 12 = -3\\).", "Substitute: \\(u_{n} = 12\\) + (\\(n - 1)(-3)\\).", "At \\(n = 3\\): \\(u_{3} = 12 + 2(-3) = 6\\)."],
      },
    ],
    [
      { question: "How many jumps are there from the first term to the fifth term?", options: ["\\(4\\)", "\\(5\\)", "\\(3\\)", "\\(6\\)"], answer: "\\(4\\)", explanation: "The jumps are \\(1\\to 2\\), \\(2\\to 3\\), \\(3\\to 4\\) and \\(4\\to 5\\)." },
      { question: "For \\(u_{1} = 6\\) and \\(d = 4\\), which is the nth-term formula?", options: ["\\(6\\) + (\\(n - 1)4\\)", "\\(6 + 4n - 1\\)", "\\(4\\) + (\\(n - 1)6\\)", "\\(6 \\times  4^{n-1}\\)"], answer: "\\(6\\) + (\\(n - 1)4\\)", explanation: "Substitute \\(u_{1} = 6\\) and \\(d = 4\\) into \\(u_{1}\\) + (\\(n - 1)d\\)." },
      { question: "In \\(u_{n} = u_{1}\\) + (\\(n - 1)d\\), what does d represent?", options: ["The common difference", "The position", "The first term", "The common ratio"], answer: "The common difference", explanation: "d is the fixed amount added from one term to the next." },
      { question: "If \\(u_{1} = 10\\) and \\(d = -2\\), what is \\(u_{3}\\)?", options: ["\\(6\\)", "\\(4\\)", "\\(8\\)", "\\(14\\)"], answer: "\\(6\\)", explanation: "\\(u_{3} = 10\\) + (\\(3 - 1)(-2) = 6\\)." },
      { question: "Which sequence has \\(u_{1} = 4\\) and \\(d = 3\\)?", options: ["\\(4\\), \\(7\\), \\(10\\), \\(13\\)", "\\(3\\), \\(7\\), \\(11\\), \\(15\\)", "\\(4\\), \\(12\\), \\(36\\), \\(108\\)", "\\(4\\), \\(3\\), \\(2\\), \\(1\\)"], answer: "\\(4\\), \\(7\\), \\(10\\), \\(13\\)", explanation: "It starts at \\(4\\) and adds \\(3\\) each time." },
    ],
  ),
  ...section(
    "Finding a term",
    "To find a particular term, identify \\(u_{1}\\), d and n, then substitute them into \\(u_{n} = u_{1}\\) + (\\(n - 1)d\\).",
    [
      {
        expression: "Find \\(u_{25}\\) for \\(4\\), \\(7\\), \\(10\\), \\(13\\), …",
        detail: "The first term is \\(4\\) and the common difference is \\(3\\).",
        steps: ["Write \\(u_{25} = 4\\) + (\\(25 - 1)3\\).", "Calculate the \\(24\\) jumps: \\(24 \\times  3 = 72\\).", "Add the first term: \\(4 + 72 = 76\\).", "Therefore \\(u_{25} = 76\\)."],
      },
      {
        expression: "Find \\(u_{32}\\) when \\(u_{1} = 79\\) and \\(d = -4\\)",
        detail: "This example uses a negative difference.",
        steps: ["Substitute: \\(u_{32} = 79\\) + (\\(32 - 1)(-4)\\).", "Calculate \\(31\\) × (\\(-4) = -124\\).", "Add: \\(79 - 124 = -45\\), so \\(u_{32} = -45\\)."],
      },
    ],
    [
      { question: "Find \\(u_{5}\\) when \\(u_{1} = 4\\) and \\(d = 3\\).", options: ["\\(16\\)", "\\(19\\)", "\\(15\\)", "\\(12\\)"], answer: "\\(16\\)", explanation: "\\(u_{5} = 4 + 4(3) = 16\\)." },
      { question: "Find \\(u_{10}\\) when \\(u_{1} = 2\\) and \\(d = 5\\).", options: ["\\(47\\)", "\\(52\\)", "\\(45\\)", "\\(50\\)"], answer: "\\(47\\)", explanation: "There are \\(9\\) jumps: \\(u_{10} = 2 + 9(5) = 47\\)." },
      { question: "Find \\(u_{4}\\) when \\(u_{1} = 20\\) and \\(d = -3\\).", options: ["\\(11\\)", "\\(8\\)", "\\(17\\)", "\\(29\\)"], answer: "\\(11\\)", explanation: "\\(u_{4} = 20 + 3(-3) = 11\\)." },
      { question: "What is the sixth term of \\(1\\), \\(4\\), \\(7\\), \\(10\\), …?", options: ["\\(16\\)", "\\(19\\)", "\\(13\\)", "\\(15\\)"], answer: "\\(16\\)", explanation: "\\(u_{6} = 1 + 5(3) = 16\\)." },
      { question: "What is \\(u_{1}\\) when \\(u_{1} = 7\\) and \\(d = 4\\)?", options: ["\\(7\\)", "\\(11\\)", "\\(4\\)", "\\(3\\)"], answer: "\\(7\\)", explanation: "The first term is given as \\(7\\); there are no jumps when \\(n = 1\\)." },
    ],
  ),
  ...section(
    "Finding missing terms and values",
    "Use the common difference to fill gaps. If a term, its position and d are known, substitute them into the formula to find the first term or another value.",
    [
      {
        expression: "\\(5\\), __, \\(11\\), __, \\(17 \\to  5\\), \\(8\\), \\(11\\), \\(14\\), \\(17\\)",
        detail: "From \\(5\\) to \\(11\\) there are two equal jumps.",
        steps: ["Find the total increase: \\(11 - 5 = 6\\).", "Divide by the two jumps: \\(d = 6 \\div  2 = 3\\).", "Add \\(3\\) each time to fill the gaps: \\(8\\) and \\(14\\)."],
      },
      {
        expression: "\\(u_{4} = 17\\) and \\(d = 4 \\to  u_{1} = 5\\)",
        detail: "The fourth term is three jumps after the first.",
        steps: ["Substitute into \\(u_{4} = u_{1} + 3d\\): \\(17 = u_{1} + 3(4)\\).", "Simplify: \\(17 = u_{1} + 12\\).", "Subtract \\(12\\): \\(u_{1} = 5\\)."],
      },
    ],
    [
      { question: "Fill the gap: \\(2\\), __, \\(8\\), \\(11\\), …", options: ["\\(5\\)", "\\(4\\)", "\\(6\\)", "\\(3\\)"], answer: "\\(5\\)", explanation: "The terms increase by \\(3\\), so the missing term is \\(2 + 3 = 5\\)." },
      { question: "If \\(u_{1} = 3\\) and \\(u_{3} = 11\\), what is d?", options: ["\\(4\\)", "\\(8\\)", "\\(3\\)", "\\(5\\)"], answer: "\\(4\\)", explanation: "There are two jumps from \\(u_{1}\\) to \\(u_{3}\\), so d = (\\(11 - 3) \\div  2 = 4\\)." },
      { question: "If \\(u_{4} = 14\\) and \\(d = 2\\), what is \\(u_{1}\\)?", options: ["\\(8\\)", "\\(6\\)", "\\(12\\)", "\\(10\\)"], answer: "\\(8\\)", explanation: "Work back three jumps: \\(14 - 3(2) = 8\\)." },
      { question: "Fill the gap: \\(10\\), __, \\(4\\), \\(1\\), …", options: ["\\(7\\)", "\\(8\\)", "\\(6\\)", "\\(13\\)"], answer: "\\(7\\)", explanation: "The common difference is \\(-3\\), so \\(10 - 3 = 7\\)." },
      { question: "If \\(u_{1} = 2\\) and \\(d = 3\\), at which position is the term \\(14\\)?", options: ["\\(n = 5\\)", "\\(n = 4\\)", "\\(n = 6\\)", "\\(n = 14\\)"], answer: "\\(n = 5\\)", explanation: "\\(2\\) + (\\(n - 1)3 = 14\\) gives \\(n - 1 = 4\\), so \\(n = 5\\)." },
    ],
  ),
  ...finalCheck([
    { question: "An arithmetic sequence has \\(u_{1} = 79\\) and \\(d = -4\\). What is \\(u_{32}\\)?", options: ["\\(-45\\)", "\\(-49\\)", "\\(-41\\)", "\\(45\\)"], answer: "\\(-45\\)", explanation: "\\(u_{32} = 79 + 31(-4) = -45\\)." },
    { question: "The third term is \\(7\\) and the sixth term is \\(19\\). What is the common difference?", options: ["\\(4\\)", "\\(6\\)", "\\(3\\)", "\\(12\\)"], answer: "\\(4\\)", explanation: "There are \\(3\\) jumps from term \\(3\\) to term \\(6\\). Divide the increase \\(19 - 7 = 12\\) by \\(3\\)." },
    { question: "Which formula generates \\(25\\), \\(23\\), \\(21\\), \\(19\\), …?", options: ["\\(25 - 2(n - 1)\\)", "\\(25 - 2n\\)", "\\(23 + 2n\\)", "\\(25\\) × (\\(-2)\\)⁽ⁿ⁻¹⁾"], answer: "\\(25 - 2(n - 1)\\)", explanation: "The first term is \\(25\\) and \\(d = -2\\), so \\(u_{n} = 25\\) + (\\(n - 1)(-2)\\)." },
  ]),
];

export const geometricSequenceSteps: GuidedLessonStep[] = [
  ...section(
    "Recognising geometric sequences",
    "A geometric sequence multiplies by the same number each time. This fixed multiplier is the common ratio, r. Divide a term by the previous term to find it when the previous term is non-zero.",
    [
      {
        expression: "\\(3\\), \\(9\\), \\(27\\), \\(81\\), … → \\(r = 3\\)",
        detail: "Divide each term by the one before it.",
        steps: ["\\(9 \\div  3 = 3\\).", "\\(27 \\div  9 = 3\\) and \\(81 \\div  27 = 3\\).", "The ratio is constant, so the sequence is geometric with \\(r = 3\\)."],
      },
      {
        expression: "\\(324\\), \\(108\\), \\(36\\), \\(12\\), … → \\(r = \\dfrac{1}{3}\\)",
        detail: "Multiplying by a fraction can make a sequence decrease.",
        steps: ["\\(108 \\div  324 = \\dfrac{1}{3}\\).", "Check: \\(36 \\div  108 = \\dfrac{1}{3}\\) and \\(12 \\div  36 = \\dfrac{1}{3}\\).", "Each term is one-third of the preceding term."],
      },
    ],
    [
      { question: "What is the common ratio of \\(2\\), \\(6\\), \\(18\\), \\(54\\), …?", options: ["\\(3\\)", "\\(4\\)", "\\(6\\)", "\\(2\\)"], answer: "\\(3\\)", explanation: "\\(6 \\div  2 = 3\\) and \\(18 \\div  6 = 3\\)." },
      { question: "What is the common ratio of \\(64\\), \\(32\\), \\(16\\), \\(8\\), …?", options: ["\\(\\dfrac{1}{2}\\)", "\\(2\\)", "\\(-32\\)", "\\(\\dfrac{1}{4}\\)"], answer: "\\(\\dfrac{1}{2}\\)", explanation: "Each term is half the previous term: \\(32 \\div  64 = \\dfrac{1}{2}\\)." },
      { question: "Which sequence is geometric?", options: ["\\(1\\), \\(3\\), \\(9\\), \\(27\\)", "\\(1\\), \\(4\\), \\(7\\), \\(10\\)", "\\(2\\), \\(5\\), \\(9\\), \\(14\\)", "\\(1\\), \\(4\\), \\(9\\), \\(16\\)"], answer: "\\(1\\), \\(3\\), \\(9\\), \\(27\\)", explanation: "Each term is multiplied by \\(3\\)." },
      { question: "Is \\(2\\), \\(5\\), \\(8\\), \\(11\\), … geometric?", options: ["No", "Yes, \\(r = 3\\)", "Yes, \\(r = 2\\)", "Yes, \\(r = 5\\)"], answer: "No", explanation: "It adds \\(3\\) each time, but its ratios are not constant." },
      { question: "What is the next term of \\(0.0625\\), \\(0.25\\), \\(1\\), \\(4\\), …?", options: ["\\(16\\)", "\\(8\\)", "\\(4.25\\)", "\\(12\\)"], answer: "\\(16\\)", explanation: "Each term is multiplied by \\(4\\), so \\(4 \\times  4 = 16\\)." },
    ],
  ),
  ...section(
    "Ratios and signs",
    "A negative common ratio changes the sign at each step. A positive ratio between \\(0\\) and \\(1\\) makes positive terms get closer to zero.",
    [
      {
        expression: "\\(3\\), \\(-6\\), \\(12\\), \\(-24\\), … → \\(r = -2\\)",
        detail: "A negative ratio makes the terms alternate in sign.",
        steps: ["Divide: \\(-6 \\div  3 = -2\\).", "Check the next pair: \\(12\\) ÷ (\\(-6) = -2\\).", "Multiply \\(-24\\) by \\(-2\\) to get the next term, \\(48\\)."],
      },
      {
        expression: "\\(-252\\), \\(126\\), \\(-63\\), \\(31.5\\), … → \\(r = \\dfrac{-1}{2}\\)",
        detail: "The signs alternate while the magnitudes halve.",
        steps: ["\\(126\\) ÷ (\\(-252) = \\dfrac{-1}{2}\\).", "Check: \\(-63 \\div  126 = \\dfrac{-1}{2}\\).", "Multiply \\(31.5\\) by \\(\\dfrac{-1}{2}\\) to get \\(-15.75\\)."],
      },
    ],
    [
      { question: "What is the common ratio of \\(2\\), \\(-4\\), \\(8\\), \\(-16\\), …?", options: ["\\(-2\\)", "\\(2\\)", "\\(-4\\)", "\\(\\dfrac{1}{2}\\)"], answer: "\\(-2\\)", explanation: "\\(-4 \\div  2 = -2\\) and \\(8\\) ÷ (\\(-4) = -2\\)." },
      { question: "What is the next term of \\(3\\), \\(-6\\), \\(12\\), \\(-24\\), …?", options: ["\\(48\\)", "\\(-48\\)", "\\(-36\\)", "\\(24\\)"], answer: "\\(48\\)", explanation: "Multiply the last term by \\(-2\\): (\\(-24)(-2) = 48\\)." },
      { question: "What happens to the signs when each term is multiplied by \\(-3\\)?", options: ["They alternate", "They are always positive", "They are always negative", "They never change"], answer: "They alternate", explanation: "Multiplying a non-zero number by a negative number changes its sign." },
      { question: "What is the common ratio of \\(-12\\), \\(6\\), \\(-3\\), \\(1.5\\), …?", options: ["\\(\\dfrac{-1}{2}\\)", "\\(\\dfrac{1}{2}\\)", "\\(-2\\)", "\\(2\\)"], answer: "\\(\\dfrac{-1}{2}\\)", explanation: "\\(6\\) ÷ (\\(-12) = \\dfrac{-1}{2}\\), and the same ratio holds for the next terms." },
      { question: "What is the next term of \\(8\\), \\(4\\), \\(2\\), \\(1\\), …?", options: ["\\(\\dfrac{1}{2}\\)", "\\(0\\)", "\\(-1\\)", "\\(2\\)"], answer: "\\(\\dfrac{1}{2}\\)", explanation: "The common ratio is \\(\\dfrac{1}{2}\\), so \\(1 \\times  \\dfrac{1}{2} = \\dfrac{1}{2}\\)." },
    ],
  ),
  ...section(
    "The geometric nth-term formula",
    "If \\(u_{1}\\) is the first term and r is the common ratio, then \\(u_{n} = u\\)₁\\(r^{n-1}\\). There are \\(n - 1\\) multiplications from the first term to the nth term.",
    [
      {
        expression: "\\(7\\), \\(21\\), \\(63\\), … → \\(u_{n} = 7 \\times  3^{n-1}\\)",
        detail: "This sequence starts at \\(7\\) and multiplies by \\(3\\).",
        steps: ["Identify \\(u_{1} = 7\\) and \\(r = 21 \\div  7 = 3\\).", "Substitute into \\(u_{n} = u\\)₁\\(r^{n-1}\\): \\(u_{n} = 7 \\times  3^{n-1}\\).", "Check \\(n = 1\\): \\(7 \\times  3^{0} = 7\\).", "Check \\(n = 3\\): \\(7 \\times  3^{2} = 63\\)."],
      },
      {
        expression: "\\(4\\), \\(-8\\), \\(16\\), \\(-32\\), … → \\(u_{n} = 4\\) × (\\(-2)\\)⁽ⁿ⁻¹⁾",
        detail: "Keep the negative ratio inside parentheses.",
        steps: ["\\(u_{1} = 4\\) and \\(r = -8 \\div  4 = -2\\).", "Substitute: \\(u_{n} = 4\\) × (\\(-2)\\)⁽ⁿ⁻¹⁾.", "Check \\(n = 3\\): \\(4\\) × (\\(-2)^{2}\\) = \\(4 \\times  4 = 16\\)."],
      },
    ],
    [
      { question: "How many times do you multiply by r to get from \\(u_{1}\\) to \\(u_{4}\\)?", options: ["\\(3\\)", "\\(4\\)", "\\(1\\)", "\\(5\\)"], answer: "\\(3\\)", explanation: "The three steps are \\(u_{1}\\to u_{2}\\), \\(u_{2}\\to u_{3}\\) and \\(u_{3}\\to u_{4}\\)." },
      { question: "Which formula has \\(u_{1} = 5\\) and \\(r = 2\\)?", options: ["\\(5 \\times  2^{n-1}\\)", "\\(5 + 2(n - 1)\\)", "\\(2 \\times  5^{n-1}\\)", "\\(5 \\times  2^{n}\\)"], answer: "\\(5 \\times  2^{n-1}\\)", explanation: "Substitute \\(u_{1} = 5\\) and \\(r = 2\\) into \\(u_{n} = u\\)₁\\(r^{n-1}\\)." },
      { question: "If \\(u_{n} = 3 \\times  2^{n-1}\\), what is \\(u_{3}\\)?", options: ["\\(12\\)", "\\(6\\)", "\\(24\\)", "\\(9\\)"], answer: "\\(12\\)", explanation: "\\(u_{3} = 3 \\times  2^{2} = 12\\)." },
      { question: "If \\(u_{n} = 4\\) × (\\(-2)\\)⁽ⁿ⁻¹⁾, what is \\(u_{2}\\)?", options: ["\\(-8\\)", "\\(8\\)", "\\(-4\\)", "\\(16\\)"], answer: "\\(-8\\)", explanation: "\\(u_{2} = 4\\) × (\\(-2)\\)¹ = \\(-8\\)." },
      { question: "In the formula \\(u_{n} = u\\)₁\\(r^{n-1}\\), what is the exponent when \\(n = 1\\)?", options: ["\\(0\\)", "\\(1\\)", "\\(-1\\)", "r"], answer: "\\(0\\)", explanation: "\\(n - 1 = 1 - 1 = 0\\), so a non-zero r gives the first term unchanged." },
    ],
  ),
  ...section(
    "Finding terms and missing values",
    "Use the formula to find a distant term. To fill a gap, use the same ratio at each step; if two terms are separated by several positions, count the multiplications between them.",
    [
      {
        expression: "Find \\(u_{9}\\) for \\(7\\), \\(21\\), \\(63\\), …",
        detail: "The first term is \\(7\\) and the common ratio is \\(3\\).",
        steps: ["Substitute \\(n = 9\\): \\(u_{9} = 7 \\times  3^{8}\\).", "Calculate \\(3^{8} = 6561\\).", "Multiply: \\(u_{9} = 7 \\times  6561 = 45{,}927\\)."],
      },
      {
        expression: "\\(u_{4} = 125\\), \\(u_{10} = \\dfrac{125}{64}\\); find \\(u_{14}\\)",
        detail: "Assume all terms are positive.",
        steps: ["From term \\(4\\) to term \\(10\\) there are \\(6\\) multiplications, so \\(r^{6}\\) = (\\(\\dfrac{125}{64}) \\div  125 = \\dfrac{1}{64}\\).", "All terms are positive, so \\(r=\\frac{1}{2}\\) because \\(\\left(\\frac{1}{2}\\right)^6=\\frac{1}{64}\\).", "From term \\(10\\) to term \\(14\\) there are \\(4\\) multiplications: \\(u_{14}=\\frac{125}{64}\\left(\\frac{1}{2}\\right)^4\\).", "Calculate \\(u_{14} = \\dfrac{125}{1024}\\)."],
      },
    ],
    [
      { question: "Find \\(u_{4}\\) when \\(u_{1} = 2\\) and \\(r = 3\\).", options: ["\\(54\\)", "\\(18\\)", "\\(162\\)", "\\(11\\)"], answer: "\\(54\\)", explanation: "\\(u_{4} = 2 \\times  3^{3} = 54\\)." },
      { question: "Fill the gap: \\(5\\), __, \\(45\\), \\(135\\), …", options: ["\\(15\\)", "\\(10\\)", "\\(20\\)", "\\(30\\)"], answer: "\\(15\\)", explanation: "The ratio is \\(3\\), so \\(5 \\times  3 = 15\\)." },
      { question: "If \\(u_{3} = 20\\) and \\(r = 2\\), what is \\(u_{4}\\)?", options: ["\\(40\\)", "\\(22\\)", "\\(10\\)", "\\(80\\)"], answer: "\\(40\\)", explanation: "Multiply the third term by the ratio: \\(20 \\times  2 = 40\\)." },
      { question: "If \\(u_{1} = 32\\) and \\(r = \\dfrac{1}{2}\\), what is \\(u_{4}\\)?", options: ["\\(4\\)", "\\(8\\)", "\\(2\\)", "\\(16\\)"], answer: "\\(4\\)", explanation: "\\(32\\) × (\\(\\dfrac{1}{2})^{3}\\) = \\(4\\)." },
      { question: "A geometric sequence has \\(u_{1} = 3\\) and \\(r = -2\\). What is \\(u_{4}\\)?", options: ["\\(-24\\)", "\\(24\\)", "\\(-12\\)", "\\(12\\)"], answer: "\\(-24\\)", explanation: "\\(u_{4} = 3\\) × (\\(-2)^{3}\\) = \\(3\\) × (\\(-8) = -24\\)." },
    ],
  ),
  ...finalCheck([
    { question: "A geometric sequence starts \\(7\\), \\(21\\), \\(63\\), …. What is \\(u_{9}\\)?", options: ["\\(45{,}927\\)", "\\(15{,}309\\)", "\\(137{,}781\\)", "\\(459\\)"], answer: "\\(45{,}927\\)", explanation: "The ratio is \\(3\\), so \\(u_{9} = 7 \\times  3^{8} = 45{,}927\\)." },
    { question: "Which rule generates \\(-2\\), \\(6\\), \\(-18\\), \\(54\\), …?", options: ["\\(-2\\) × (\\(-3)\\)⁽ⁿ⁻¹⁾", "\\(-2 \\times  3^{n-1}\\)", "\\(-2\\) + (\\(n - 1)(-3)\\)", "\\(6\\) × (\\(-3)\\)⁽ⁿ⁻¹⁾"], answer: "\\(-2\\) × (\\(-3)\\)⁽ⁿ⁻¹⁾", explanation: "The first term is \\(-2\\) and each term is multiplied by \\(-3\\)." },
    { question: "A positive geometric sequence has \\(u_{1} = 4\\) and \\(u_{3} = 36\\). What is r?", options: ["\\(3\\)", "\\(9\\)", "\\(2\\)", "\\(-3\\)"], answer: "\\(3\\)", explanation: "Two multiplications give \\(4r^{2}\\) = \\(36\\), so \\(r^{2} = 9\\). The positive-terms condition gives \\(r = 3\\)." },
  ]),
];
