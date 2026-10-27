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
    "Scientific notation writes a number as a × 10ⁿ. For a large number, move the decimal point left until one non-zero digit remains in front.",
    "Count how many places the decimal point moved. For a large number, that count is a positive exponent. The coefficient must be at least 1 and less than 10.",
    "45,000 = 4.5 × 10⁴",
    "Convert 45,000 so its coefficient is at least 1 and less than 10.",
    ["Write the number with a decimal point: 45,000.0.", "Move the decimal point left until it sits after the first digit: 4.5000.", "The decimal moved 4 places, so use the power 10⁴.", "Write the result: 4.5 × 10⁴."],
    "820,000 = 8.2 × 10⁵",
    "The coefficient is 8.2, and the decimal moves 5 places.",
    ["Place the decimal after the first digit: 8.20000.", "It moved 5 places left from 820,000.", "A large number uses a positive power.", "Write 8.2 × 10⁵."],
    [
      quiz("Write 3,000 in scientific notation.", ["3 × 10²", "3 × 10³", "30 × 10²", "3 × 10⁻³"], "3 × 10³", "The decimal point moves 3 places left."),
      quiz("Write 82,000 in scientific notation.", ["8.2 × 10³", "8.2 × 10⁴", "82 × 10³", "8.2 × 10⁵"], "8.2 × 10⁴", "Move the decimal 4 places left to get 8.2."),
      quiz(
        "In scientific notation, what range must the number before × 10 be in?",
        ["At least 1, but less than 10", "At least 0, but less than 1", "At least 10, but less than 100", "Any positive number"],
        "At least 1, but less than 10",
        "The first number can be 1, but it must be smaller than 10.",
      ),
      quiz("In 6.4 × 10⁵, is the number larger or smaller than 6.4?", ["Larger", "Smaller", "The same", "Cannot tell"], "Larger", "A positive power of 10 makes the number larger."),
      quiz("Write 910,000 in scientific notation.", ["9.1 × 10⁴", "9.1 × 10⁵", "91 × 10⁴", "9.1 × 10⁶"], "9.1 × 10⁵", "The decimal point moves 5 places left."),
    ],
  ),
  ...stage(
    "Writing small numbers",
    "For a small decimal, move the decimal point right until the coefficient is at least 1 and less than 10.",
    "Count the places moved. For a number between 0 and 1, use a negative power of 10. Check that the notation has the same value as the original decimal.",
    "0.0042 = 4.2 × 10⁻³",
    "Convert 0.0042 so its coefficient is at least 1 and less than 10.",
    ["Start with 0.0042.", "Move the decimal right until it follows the first non-zero digit: 4.2.", "The decimal moved 3 places right, so use the power 10⁻³.", "Write 4.2 × 10⁻³."],
    "0.00081 = 8.1 × 10⁻⁴",
    "The decimal moves 4 places right, so the exponent is −4.",
    ["Start with 0.00081.", "Move the decimal right to make 8.1.", "Count 4 places moved; a small decimal uses a negative power.", "Write 8.1 × 10⁻⁴."],
    [
      quiz("Write 0.006 in scientific notation.", ["6 × 10⁻²", "6 × 10⁻³", "6 × 10³", "0.6 × 10⁻²"], "6 × 10⁻³", "The decimal point moves 3 places right."),
      quiz("Write 0.00081 in scientific notation.", ["8.1 × 10⁻³", "8.1 × 10⁻⁴", "8.1 × 10⁴", "81 × 10⁻⁴"], "8.1 × 10⁻⁴", "Move the decimal point 4 places right."),
      quiz("In 2.5 × 10⁻³, is the number larger or smaller than 2.5?", ["Larger", "Smaller", "The same", "Cannot tell"], "Smaller", "A negative power of 10 makes the number smaller."),
      quiz("What sign should the power have for 0.0007?", ["Positive", "Negative", "Zero", "No power"], "Negative", "A number between 0 and 1 uses a negative power."),
      quiz("Write 0.035 in scientific notation.", ["3.5 × 10⁻¹", "3.5 × 10⁻²", "3.5 × 10²", "35 × 10⁻²"], "3.5 × 10⁻²", "The decimal point moves 2 places right."),
    ],
  ),
  ...stage(
    "Multiplying in scientific notation",
    "To multiply two numbers in scientific notation, multiply the numbers in front and multiply the powers of 10.",
    "Multiply the coefficients. Then add the exponents: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ. If the coefficient is outside 1 to 10, rewrite the answer in scientific notation.",
    "(2 × 10³)(3 × 10²) = 6 × 10⁵",
    "Multiply the first numbers, then combine the powers of 10.",
    ["Multiply the coefficients: 2 × 3 = 6.", "Add the exponents: 3 + 2 = 5.", "Combine them: 6 × 10⁵."],
    "(4 × 10²)(3 × 10³) = 1.2 × 10⁶",
    "The coefficient 12 is rewritten as 1.2 × 10, so the final power is 10⁶.",
    ["Multiply the coefficients: 4 × 3 = 12.", "Add the exponents: 2 + 3 = 5, giving 12 × 10⁵.", "Rewrite 12 as 1.2 × 10.", "Combine 10 × 10⁵ to get 10⁶. The answer is 1.2 × 10⁶."],
    [
      quiz("What is (2 × 10²)(3 × 10³)?", ["6 × 10⁵", "5 × 10⁵", "6 × 10⁶", "6 × 10⁻¹"], "6 × 10⁵", "Multiply 2 × 3 and add the powers 2 + 3."),
      quiz("When multiplying 10⁴ × 10², what happens to the exponents?", ["Add them", "Subtract them", "Multiply them", "Keep only the larger"], "Add them", "The product rule adds exponents: 4 + 2 = 6."),
      quiz("What is (4 × 10¹)(2 × 10²)?", ["8 × 10³", "6 × 10³", "8 × 10²", "8 × 10⁻¹"], "8 × 10³", "Multiply 4 × 2 = 8, then add 1 + 2 = 3."),
      quiz("What is (3 × 10²)(3 × 10¹)?", ["9 × 10³", "6 × 10³", "9 × 10²", "9 × 10⁻¹"], "9 × 10³", "Multiply the coefficients to get 9 and add the powers to get 3."),
      quiz("What is (5 × 10²)(2 × 10¹)?", ["1 × 10⁴", "1 × 10³", "7 × 10³", "10 × 10³"], "1 × 10⁴", "The product is 10 × 10³, which rewrites as 1 × 10⁴."),
    ],
  ),
  ...stage(
    "Dividing in scientific notation",
    "To divide two numbers in scientific notation, divide the numbers in front and divide the powers of 10.",
    "Divide the coefficients. Then subtract the denominator exponent from the numerator exponent: 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ. Rewrite the coefficient if it is outside 1 to 10.",
    "(8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴",
    "Divide the first numbers, then subtract the exponents.",
    ["Divide the coefficients: 8 ÷ 2 = 4.", "Subtract the exponents: 6 − 2 = 4.", "Combine them: 4 × 10⁴."],
    "(3 × 10⁷) ÷ (6 × 10²) = 5 × 10⁴",
    "The coefficient becomes 0.5, which we rewrite as 5 × 10⁻¹.",
    ["Divide the coefficients: 3 ÷ 6 = 0.5.", "Subtract the exponents: 7 − 2 = 5, giving 0.5 × 10⁵.", "Rewrite 0.5 as 5 × 10⁻¹.", "Combine 10⁻¹ × 10⁵ to get 10⁴. The answer is 5 × 10⁴."],
    [
      quiz("What is (8 × 10⁵) ÷ (2 × 10²)?", ["4 × 10³", "6 × 10³", "4 × 10⁷", "4 × 10⁻³"], "4 × 10³", "Divide 8 ÷ 2 and subtract 5 − 2."),
      quiz("When dividing 10⁶ ÷ 10², what happens to the exponents?", ["Add them", "Subtract them", "Multiply them", "Keep only the larger"], "Subtract them", "The quotient rule subtracts: 6 − 2 = 4."),
      quiz("What is (9 × 10⁴) ÷ (3 × 10²)?", ["3 × 10²", "6 × 10²", "3 × 10⁶", "3 × 10⁻²"], "3 × 10²", "Divide 9 ÷ 3 and subtract 4 − 2."),
      quiz("What is (6 × 10⁷) ÷ (2 × 10⁵)?", ["3 × 10²", "4 × 10²", "3 × 10¹²", "3 × 10⁻²"], "3 × 10²", "Divide 6 ÷ 2 and subtract 7 − 5."),
      quiz("What is (4 × 10⁵) ÷ (2 × 10²)?", ["2 × 10³", "2 × 10⁷", "2 × 10²", "2 × 10⁻³"], "2 × 10³", "Divide 4 ÷ 2 and subtract 5 − 2."),
    ],
  ),
];
