import type { GuidedLessonStep } from "./course";

export const unitZeroRevisionSteps: GuidedLessonStep[] = [
  {
    title: "Scientific notation",
    part: "Scientific notation",
    blocks: [
      {
        type: "text",
        text: "Write numbers as \\(a \\times  10^{n}\\), where \\(1 \\le  a < 10\\). Add powers when multiplying and subtract them when dividing.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "\\(45{,}000 = 4.5 \\times  10^{4}\\); \\(0.003 = 3 \\times  10^{-3}\\)",
        detail: "Large numbers use positive powers; numbers between \\(0\\) and \\(1\\) use negative powers.",
        steps: [
          "Convert back: \\(1.23 \\times  10^{-5} = 0.0000123\\); move the decimal \\(5\\) places left.",
          "Multiply: \\((2 \\times  10^{3})(3 \\times  10^{2}) = 6 \\times  10^{5}\\).",
          "Divide: \\((8 \\times  10^{6}) \\div (2 \\times  10^{2}) = 4 \\times  10^{4}\\).",
        ],
      },
    ],
  },
  {
    title: "Significant figures",
    part: "Significant figures",
    blocks: [
      {
        type: "text",
        text: "Start counting at the first non-zero digit. Leading zeros do not count; zeros between non-zero digits and final zeros in decimals do.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "\\(0.00450\\) has \\(3\\) significant figures",
        detail: "Count \\(4\\), \\(5\\) and the final \\(0\\). To round, check the digit after the last one you keep.",
        steps: [
          "\\(0.00456\\) rounded to \\(2\\) significant figures is \\(0.0046\\).",
          "For addition and subtraction, use the fewest decimal places: \\(2.34 + 1.2 = 3.5\\).",
          "For multiplication and division, use the fewest significant figures: \\(2.4 \\times  3.12 = 7.5\\).",
        ],
      },
    ],
  },
  {
    title: "Absolute error, percentage error and bounds",
    part: "Error and bounds",
    blocks: [
      {
        type: "text",
        text: "Absolute error = |estimate − accepted value|. Percentage error = absolute error ÷ |accepted value| × \\(100\\%\\), when the accepted value is not zero.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "Estimate \\(48\\), accepted \\(50\\): error = \\(2\\), percentage error = \\(4\\%\\)",
        detail: "For bounds, add and subtract half the rounding unit.",
        steps: [
          "\\(7.5\\) cm to the nearest \\(0.1\\) cm has bounds \\(7.45\\) ≤ length < \\(7.55\\) cm.",
          "For positive dimensions, multiply the lower bounds and upper bounds to find area bounds.",
          "Accuracy means closeness to the accepted value; precision means repeated measurements are close to each other.",
        ],
      },
    ],
  },
  {
    title: "Number sets",
    part: "Number sets",
    blocks: [
      {
        type: "text",
        text: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ: natural numbers, integers, rational numbers and real numbers. Irrational numbers are real but cannot be written as a fraction of integers.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "\\(-3\\) ∈ ℤ; \\(\\dfrac{1}{2}\\) ∈ ℚ; \\(\\sqrt{2}\\) ∉ ℚ",
        detail: "∈ means ‘belongs to’ and ∉ means ‘does not belong to’. This course uses ℕ = {\\(1\\), \\(2\\), \\(3\\), …}.",
        steps: [
          "Recurring decimals are rational: \\(x = 0.121212\\)… gives \\(99x = 12\\), so \\(x = \\dfrac{4}{33}\\).",
          "\\(\\sqrt{9} = 3\\) is rational, even though \\(\\sqrt{2}\\) is irrational.",
        ],
      },
    ],
  },
];

const testQuestions = [
  { question: "A distance is \\(0.004568\\) km. What is its value to \\(3\\) significant figures in scientific notation?", options: ["\\(4.57 \\times  10^{-3}\\) km", "\\(4.56 \\times  10^{-3}\\) km", "\\(4.57 \\times  10^{-4}\\) km", "\\(45.7 \\times  10^{-4}\\) km"], answer: "\\(4.57 \\times  10^{-3}\\) km", explanation: "\\(0.004568 = 4.568 \\times  10^{-3}\\); rounding \\(4.568\\) to \\(3\\) significant figures gives \\(4.57\\)." },
  { question: "An estimate is \\(4.8 \\times  10^{2}\\) and the accepted value is \\(5.0 \\times  10^{2}\\). What is the percentage error?", options: ["\\(4\\%\\)", "\\(2\\%\\)", "\\(20\\%\\)", "\\(4.17\\%\\)"], answer: "\\(4\\%\\)", explanation: "The values are \\(480\\) and \\(500\\). Their absolute difference is \\(20\\), and \\(20 \\div  500 \\times  100\\% = 4\\%\\)." },
  { question: "A length is recorded as \\(2.50 m\\) to the nearest \\(0.01 m\\). Which interval contains its possible exact values?", options: ["\\(2.495\\) ≤ length < \\(2.505 m\\)", "\\(2.45\\) ≤ length < \\(2.55 m\\)", "\\(2.495\\) ≤ length ≤ \\(2.505 m\\)", "\\(2.50\\) ≤ length < \\(2.51 m\\)"], answer: "\\(2.495\\) ≤ length < \\(2.505 m\\)", explanation: "Half of \\(0.01 m\\) is \\(0.005 m\\). Subtract and add it to \\(2.50 m\\), excluding the upper bound." },
  { question: "Which number is irrational and lies between \\(2\\) and \\(3\\)?", options: ["\\(\\sqrt{7}\\)", "\\(\\sqrt{9}\\)", "\\(2.333\\)…", "\\(\\dfrac{5}{2}\\)"], answer: "\\(\\sqrt{7}\\)", explanation: "Since \\(4 < 7 < 9\\), \\(2 < \\sqrt{7} < 3\\); \\(\\sqrt{7}\\) is irrational. The other choices are rational." },
  {
    question: "Measured values are \\(2.4 m\\) and \\(3.12 m\\). What is their product to the appropriate precision?",
    options: ["\\(7.5\\) \\(m^{2}\\)", "\\(7.49\\) \\(m^{2}\\)", "\\(7.488\\) \\(m^{2}\\)", "\\(7.4\\) \\(m^{2}\\)"],
    answer: "\\(7.5\\) \\(m^{2}\\)",
    explanation: "\\(2.4 \\times  3.12 = 7.488\\). The least precise factor has \\(2\\) significant figures, so round to \\(7.5\\) \\(m^{2}\\).",
  },
  {
    question: "A rectangular floor measures \\(2 m\\) by \\(3 m\\), each to the nearest metre. What is its lower area bound?",
    options: ["\\(3.75\\) \\(m^{2}\\)", "\\(6\\) \\(m^{2}\\)", "\\(8.75\\) \\(m^{2}\\)", "\\(5\\) \\(m^{2}\\)"],
    answer: "\\(3.75\\) \\(m^{2}\\)",
    explanation: "The lower length bounds are \\(1.5 m\\) and \\(2.5 m\\); multiply them to get \\(3.75\\) \\(m^{2}\\).",
  },
  { question: "Which is the smallest set in ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ that contains \\(0.666\\)…?", options: ["ℚ", "ℕ", "ℤ", "ℝ"], answer: "ℚ", explanation: "\\(0.666\\)… = \\(\\dfrac{2}{3}\\), so it is rational. It is not an integer or a natural number." },
  { question: "What is \\((8 \\times  10^{-3}) \\div (2 \\times  10^{2})\\), written in scientific notation?", options: ["\\(4 \\times  10^{-5}\\)", "\\(4 \\times  10^{-1}\\)", "\\(4 \\times  10^{5}\\)", "\\(6 \\times  10^{-5}\\)"], answer: "\\(4 \\times  10^{-5}\\)", explanation: "Divide the coefficients: \\(8 \\div  2 = 4\\). Subtract exponents: \\(-3 - 2 = -5\\)." },
  { question: "The accepted value is \\(0.020\\) and an estimate is \\(0.019\\). What is the percentage error?", options: ["\\(5\\%\\)", "\\(0.1\\%\\)", "\\(1\\%\\)", "\\(10\\%\\)"], answer: "\\(5\\%\\)", explanation: "The absolute error is \\(0.001\\). Divide by \\(0.020\\) and multiply by \\(100\\%\\) to get \\(5\\%\\)." },
  { question: "Which statement is true about \\(0.04040\\)?", options: ["It has \\(4\\) significant figures and is rational", "It has \\(3\\) significant figures and is rational", "It has \\(4\\) significant figures and is irrational", "It has \\(5\\) significant figures and is rational"], answer: "It has \\(4\\) significant figures and is rational", explanation: "Count \\(4\\), \\(0\\), \\(4\\) and the final decimal zero. The decimal terminates, so it is rational." },
];

export const unitZeroTestSteps: GuidedLessonStep[] = testQuestions.map((question, index) => ({
  title: `Unit 0 test: question ${index + 1} of ${testQuestions.length}`,
  part: "Unit 0 test",
  blocks: [{ type: "quiz", ...question }],
}));
