import type { GuidedLessonStep, LessonBlock } from "./course";

function quiz(
  question: string,
  options: string[],
  answer: string,
  explanation: string,
): LessonBlock {
  return {
    type: "quiz",
    question,
    options,
    answer,
    explanation,
  };
}

function stage(
  title: string,
  idea: string,
  rule: string,
  expression: string,
  detail: string,
  steps: string[],
  secondExpression: string,
  secondDetail: string,
  secondSteps: string[],
  questions: LessonBlock[],
): GuidedLessonStep[] {
  return [
    {
      title: `${title}: the idea`,
      blocks: [
        { type: "text", text: idea },
        { type: "example", label: "Example 1", expression, detail, steps },
      ],
    },
    {
      title: `${title}: remember the rule`,
      blocks: [
        { type: "text", text: rule },
        {
          type: "example",
          label: "Example 2",
          expression: secondExpression,
          detail: secondDetail,
          steps: secondSteps,
        },
      ],
    },
    ...questions.map((question, index) => ({
      title: `${title}: practice ${index + 1} of ${questions.length}`,
      blocks: [question],
    })),
  ];
}

export const scientificNotationSteps: GuidedLessonStep[] = [
  ...stage(
    "Writing large numbers",
    "Scientific notation writes a number as \\(a \\times  10^{n}\\). For a large number, move the decimal point left until one non-zero digit remains in front.",
    "Count how many places the decimal point moved. For a large number, that count is a positive exponent. The coefficient must be at least \\(1\\) and less than \\(10\\).",
    "\\(45{,}000 = 4.5 \\times  10^{4}\\)",
    "Convert \\(45{,}000\\) so its coefficient is at least \\(1\\) and less than \\(10\\).",
    ["Write the number with a decimal point: \\(45{,}000.0\\).", "Move the decimal point left until it sits after the first digit: \\(4.5000\\).", "The decimal moved \\(4\\) places, so use the power \\(10^{4}\\).", "Write the result: \\(4.5 \\times  10^{4}\\)."],
    "\\(820{,}000 = 8.2 \\times  10^{5}\\)",
    "The coefficient is \\(8.2\\), and the decimal moves \\(5\\) places.",
    ["Place the decimal after the first digit: \\(8.20000\\).", "It moved \\(5\\) places left from \\(820{,}000\\).", "A large number uses a positive power.", "Write \\(8.2 \\times  10^{5}\\)."],
    [
      quiz("Write \\(3{,}000\\) in scientific notation.", ["\\(3 \\times  10^{2}\\)", "\\(3 \\times  10^{3}\\)", "\\(30 \\times  10^{2}\\)", "\\(3 \\times  10^{-3}\\)"], "\\(3 \\times  10^{3}\\)", "The decimal point moves \\(3\\) places left."),
      quiz("Write \\(82{,}000\\) in scientific notation.", ["\\(8.2 \\times  10^{3}\\)", "\\(8.2 \\times  10^{4}\\)", "\\(82 \\times  10^{3}\\)", "\\(8.2 \\times  10^{5}\\)"], "\\(8.2 \\times  10^{4}\\)", "Move the decimal \\(4\\) places left to get \\(8.2\\)."),
      quiz(
        "In scientific notation, what range must the number before × \\(10\\) be in?",
        ["At least \\(1\\), but less than \\(10\\)", "At least \\(0\\), but less than \\(1\\)", "At least \\(10\\), but less than \\(100\\)", "Any positive number"],
        "At least \\(1\\), but less than \\(10\\)",
        "The first number can be \\(1\\), but it must be smaller than \\(10\\).",
      ),
      quiz("In \\(6.4 \\times  10^{5}\\), is the number larger or smaller than \\(6.4\\)?", ["Larger", "Smaller", "The same", "Cannot tell"], "Larger", "A positive power of \\(10\\) makes the number larger."),
      quiz("Write \\(910{,}000\\) in scientific notation.", ["\\(9.1 \\times  10^{4}\\)", "\\(9.1 \\times  10^{5}\\)", "\\(91 \\times  10^{4}\\)", "\\(9.1 \\times  10^{6}\\)"], "\\(9.1 \\times  10^{5}\\)", "The decimal point moves \\(5\\) places left."),
    ],
  ),
  ...stage(
    "Writing small numbers",
    "For a small decimal, move the decimal point right until the coefficient is at least \\(1\\) and less than \\(10\\).",
    "Count the places moved. For a number between \\(0\\) and \\(1\\), use a negative power of \\(10\\). Check that the notation has the same value as the original decimal.",
    "\\(0.0042 = 4.2 \\times  10^{-3}\\)",
    "Convert \\(0.0042\\) so its coefficient is at least \\(1\\) and less than \\(10\\).",
    ["Start with \\(0.0042\\).", "Move the decimal right until it follows the first non-zero digit: \\(4.2\\).", "The decimal moved \\(3\\) places right, so use the power \\(10^{-3}\\).", "Write \\(4.2 \\times  10^{-3}\\)."],
    "\\(0.00081 = 8.1 \\times  10^{-4}\\)",
    "The decimal moves \\(4\\) places right, so the exponent is \\(-4\\).",
    ["Start with \\(0.00081\\).", "Move the decimal right to make \\(8.1\\).", "Count \\(4\\) places moved; a small decimal uses a negative power.", "Write \\(8.1 \\times  10^{-4}\\)."],
    [
      quiz("Write \\(0.006\\) in scientific notation.", ["\\(6 \\times  10^{-2}\\)", "\\(6 \\times  10^{-3}\\)", "\\(6 \\times  10^{3}\\)", "\\(0.6 \\times  10^{-2}\\)"], "\\(6 \\times  10^{-3}\\)", "The decimal point moves \\(3\\) places right."),
      quiz("Write \\(0.00081\\) in scientific notation.", ["\\(8.1 \\times  10^{-3}\\)", "\\(8.1 \\times  10^{-4}\\)", "\\(8.1 \\times  10^{4}\\)", "\\(81 \\times  10^{-4}\\)"], "\\(8.1 \\times  10^{-4}\\)", "Move the decimal point \\(4\\) places right."),
      quiz("In \\(2.5 \\times  10^{-3}\\), is the number larger or smaller than \\(2.5\\)?", ["Larger", "Smaller", "The same", "Cannot tell"], "Smaller", "A negative power of \\(10\\) makes the number smaller."),
      quiz("What sign should the power have for \\(0.0007\\)?", ["Positive", "Negative", "Zero", "No power"], "Negative", "A number between \\(0\\) and \\(1\\) uses a negative power."),
      quiz("Write \\(0.035\\) in scientific notation.", ["\\(3.5 \\times  10^{-1}\\)", "\\(3.5 \\times  10^{-2}\\)", "\\(3.5 \\times  10^{2}\\)", "\\(35 \\times  10^{-2}\\)"], "\\(3.5 \\times  10^{-2}\\)", "The decimal point moves \\(2\\) places right."),
    ],
  ),
  ...stage(
    "Multiplying in scientific notation",
    "To multiply two numbers in scientific notation, multiply the numbers in front and multiply the powers of \\(10\\).",
    "Multiply the coefficients. Then add the exponents: \\(10\\)ᵐ × \\(10^{n} = 10\\)ᵐ⁺ⁿ. If the coefficient is outside \\(1\\) to \\(10\\), rewrite the answer in scientific notation.",
    "(\\(2 \\times  10^{3})(3 \\times  10^{2}) = 6 \\times  10^{5}\\)",
    "Multiply the first numbers, then combine the powers of \\(10\\).",
    ["Multiply the coefficients: \\(2 \\times  3 = 6\\).", "Add the exponents: \\(3 + 2 = 5\\).", "Combine them: \\(6 \\times  10^{5}\\)."],
    "(\\(4 \\times  10^{2})(3 \\times  10^{3}) = 1.2 \\times  10^{6}\\)",
    "The coefficient \\(12\\) is rewritten as \\(1.2 \\times  10\\), so the final power is \\(10^{6}\\).",
    ["Multiply the coefficients: \\(4 \\times  3 = 12\\).", "Add the exponents: \\(2 + 3 = 5\\), giving \\(12 \\times  10^{5}\\).", "Rewrite \\(12\\) as \\(1.2 \\times  10\\).", "Combine \\(10 \\times  10^{5}\\) to get \\(10^{6}\\). The answer is \\(1.2 \\times  10^{6}\\)."],
    [
      quiz("What is (\\(2 \\times  10^{2})(3 \\times  10^{3})\\)?", ["\\(6 \\times  10^{5}\\)", "\\(5 \\times  10^{5}\\)", "\\(6 \\times  10^{6}\\)", "\\(6 \\times  10^{-1}\\)"], "\\(6 \\times  10^{5}\\)", "Multiply \\(2 \\times  3\\) and add the powers \\(2 + 3\\)."),
      quiz("When multiplying \\(10^{4} \\times  10^{2}\\), what happens to the exponents?", ["Add them", "Subtract them", "Multiply them", "Keep only the larger"], "Add them", "The product rule adds exponents: \\(4 + 2 = 6\\)."),
      quiz("What is (\\(4 \\times  10^{1})(2 \\times  10^{2})\\)?", ["\\(8 \\times  10^{3}\\)", "\\(6 \\times  10^{3}\\)", "\\(8 \\times  10^{2}\\)", "\\(8 \\times  10^{-1}\\)"], "\\(8 \\times  10^{3}\\)", "Multiply \\(4 \\times  2 = 8\\), then add \\(1 + 2 = 3\\)."),
      quiz("What is (\\(3 \\times  10^{2})(3 \\times  10^{1})\\)?", ["\\(9 \\times  10^{3}\\)", "\\(6 \\times  10^{3}\\)", "\\(9 \\times  10^{2}\\)", "\\(9 \\times  10^{-1}\\)"], "\\(9 \\times  10^{3}\\)", "Multiply the coefficients to get \\(9\\) and add the powers to get \\(3\\)."),
      quiz("What is (\\(5 \\times  10^{2})(2 \\times  10^{1})\\)?", ["\\(1 \\times  10^{4}\\)", "\\(1 \\times  10^{3}\\)", "\\(7 \\times  10^{3}\\)", "\\(10 \\times  10^{3}\\)"], "\\(1 \\times  10^{4}\\)", "The product is \\(10 \\times  10^{3}\\), which rewrites as \\(1 \\times  10^{4}\\)."),
    ],
  ),
  ...stage(
    "Dividing in scientific notation",
    "To divide two numbers in scientific notation, divide the numbers in front and divide the powers of \\(10\\).",
    "Divide the coefficients. Then subtract the denominator exponent from the numerator exponent: \\(10\\)ᵐ ÷ \\(10^{n} = 10\\)ᵐ⁻ⁿ. Rewrite the coefficient if it is outside \\(1\\) to \\(10\\).",
    "(\\(8 \\times  10^{6})\\) ÷ (\\(2 \\times  10^{2}) = 4 \\times  10^{4}\\)",
    "Divide the first numbers, then subtract the exponents.",
    ["Divide the coefficients: \\(8 \\div  2 = 4\\).", "Subtract the exponents: \\(6 - 2 = 4\\).", "Combine them: \\(4 \\times  10^{4}\\)."],
    "(\\(3 \\times  10^{7})\\) ÷ (\\(6 \\times  10^{2}) = 5 \\times  10^{4}\\)",
    "The coefficient becomes \\(0.5\\), which we rewrite as \\(5 \\times  10^{-1}\\).",
    ["Divide the coefficients: \\(3 \\div  6 = 0.5\\).", "Subtract the exponents: \\(7 - 2 = 5\\), giving \\(0.5 \\times  10^{5}\\).", "Rewrite \\(0.5\\) as \\(5 \\times  10^{-1}\\).", "Combine \\(10^{-1} \\times  10^{5}\\) to get \\(10^{4}\\). The answer is \\(5 \\times  10^{4}\\)."],
    [
      quiz("What is (\\(8 \\times  10^{5})\\) ÷ (\\(2 \\times  10^{2})\\)?", ["\\(4 \\times  10^{3}\\)", "\\(6 \\times  10^{3}\\)", "\\(4 \\times  10^{7}\\)", "\\(4 \\times  10^{-3}\\)"], "\\(4 \\times  10^{3}\\)", "Divide \\(8 \\div  2\\) and subtract \\(5 - 2\\)."),
      quiz("When dividing \\(10^{6} \\div  10^{2}\\), what happens to the exponents?", ["Add them", "Subtract them", "Multiply them", "Keep only the larger"], "Subtract them", "The quotient rule subtracts: \\(6 - 2 = 4\\)."),
      quiz("What is (\\(9 \\times  10^{4})\\) ÷ (\\(3 \\times  10^{2})\\)?", ["\\(3 \\times  10^{2}\\)", "\\(6 \\times  10^{2}\\)", "\\(3 \\times  10^{6}\\)", "\\(3 \\times  10^{-2}\\)"], "\\(3 \\times  10^{2}\\)", "Divide \\(9 \\div  3\\) and subtract \\(4 - 2\\)."),
      quiz("What is (\\(6 \\times  10^{7})\\) ÷ (\\(2 \\times  10^{5})\\)?", ["\\(3 \\times  10^{2}\\)", "\\(4 \\times  10^{2}\\)", "\\(3 \\times  10^{12}\\)", "\\(3 \\times  10^{-2}\\)"], "\\(3 \\times  10^{2}\\)", "Divide \\(6 \\div  2\\) and subtract \\(7 - 5\\)."),
      quiz("What is (\\(4 \\times  10^{5})\\) ÷ (\\(2 \\times  10^{2})\\)?", ["\\(2 \\times  10^{3}\\)", "\\(2 \\times  10^{7}\\)", "\\(2 \\times  10^{2}\\)", "\\(2 \\times  10^{-3}\\)"], "\\(2 \\times  10^{3}\\)", "Divide \\(4 \\div  2\\) and subtract \\(5 - 2\\)."),
    ],
  ),
];
