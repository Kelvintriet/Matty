import type { GuidedLessonStep } from "./course";

export const unitZeroRevisionSteps: GuidedLessonStep[] = [
  {
    title: "Scientific notation",
    part: "Scientific notation",
    blocks: [
      {
        type: "text",
        text: "Write numbers as a × 10ⁿ, where 1 ≤ a < 10. Add powers when multiplying and subtract them when dividing.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "45,000 = 4.5 × 10⁴; 0.003 = 3 × 10⁻³",
        detail: "Large numbers use positive powers; numbers between 0 and 1 use negative powers.",
        steps: [
          "Multiply: (2 × 10³)(3 × 10²) = 6 × 10⁵.",
          "Divide: (8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴.",
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
        expression: "0.00450 has 3 significant figures",
        detail: "Count 4, 5 and the final 0. To round, check the digit after the last one you keep.",
        steps: ["0.00456 rounded to 2 significant figures is 0.0046.", "Decimal places count from the decimal point; significant figures start at the first non-zero digit."],
      },
    ],
  },
  {
    title: "Absolute error, percentage error and bounds",
    part: "Error and bounds",
    blocks: [
      {
        type: "text",
        text: "Absolute error = |estimate − accepted value|. Percentage error = absolute error ÷ |accepted value| × 100%, when the accepted value is not zero.",
      },
      {
        type: "example",
        label: "Quick examples",
        expression: "Estimate 48, accepted 50: error = 2, percentage error = 4%",
        detail: "For bounds, add and subtract half the rounding unit.",
        steps: ["7.5 cm to the nearest 0.1 cm has bounds 7.45 ≤ length < 7.55 cm.", "The lower bound is included; the upper bound is excluded under the usual round-half-up rule."],
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
        expression: "−3 ∈ ℤ; 1/2 ∈ ℚ; √2 ∉ ℚ",
        detail: "∈ means ‘belongs to’ and ∉ means ‘does not belong to’. This course uses ℕ = {1, 2, 3, …}.",
        steps: ["Recurring decimals are rational: let x = 0.333…, so 10x − x = 3 and x = 1/3.", "√9 = 3 is rational, even though √2 is irrational."],
      },
    ],
  },
];

const testQuestions = [
  { question: "A distance is 0.004568 km. What is its value to 3 significant figures in scientific notation?", options: ["4.57 × 10⁻³ km", "4.56 × 10⁻³ km", "4.57 × 10⁻⁴ km", "45.7 × 10⁻⁴ km"], answer: "4.57 × 10⁻³ km", explanation: "0.004568 = 4.568 × 10⁻³; rounding 4.568 to 3 significant figures gives 4.57." },
  { question: "An estimate is 4.8 × 10² and the accepted value is 5.0 × 10². What is the percentage error?", options: ["4%", "2%", "20%", "4.17%"], answer: "4%", explanation: "The values are 480 and 500. Their absolute difference is 20, and 20 ÷ 500 × 100% = 4%." },
  { question: "A length is recorded as 2.50 m to the nearest 0.01 m. Which interval contains its possible exact values?", options: ["2.495 ≤ length < 2.505 m", "2.45 ≤ length < 2.55 m", "2.495 ≤ length ≤ 2.505 m", "2.50 ≤ length < 2.51 m"], answer: "2.495 ≤ length < 2.505 m", explanation: "Half of 0.01 m is 0.005 m. Subtract and add it to 2.50 m, excluding the upper bound." },
  { question: "Which number is irrational and lies between 2 and 3?", options: ["√7", "√9", "2.333…", "5/2"], answer: "√7", explanation: "Since 4 < 7 < 9, 2 < √7 < 3; √7 is irrational. The other choices are rational." },
  { question: "Which expression equals 0.000909 and shows 3 significant figures in scientific notation?", options: ["9.09 × 10⁻⁴", "9.09 × 10⁻³", "9.090 × 10⁻⁴", "90.9 × 10⁻⁵"], answer: "9.09 × 10⁻⁴", explanation: "Move the decimal four places right to get 9.09. Its significant figures are 9, 0 and 9." },
  { question: "A measurement is 3.6 kg to the nearest 0.1 kg. What is its maximum absolute rounding error in scientific notation?", options: ["5 × 10⁻² kg", "5 × 10⁻¹ kg", "1 × 10⁻¹ kg", "5 × 10⁻³ kg"], answer: "5 × 10⁻² kg", explanation: "Half of 0.1 kg is 0.05 kg, which is 5 × 10⁻² kg." },
  { question: "Which is the smallest set in ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ that contains 0.666…?", options: ["ℚ", "ℕ", "ℤ", "ℝ"], answer: "ℚ", explanation: "0.666… = 2/3, so it is rational. It is not an integer or a natural number." },
  { question: "What is (8 × 10⁻³) ÷ (2 × 10²), written in scientific notation?", options: ["4 × 10⁻⁵", "4 × 10⁻¹", "4 × 10⁵", "6 × 10⁻⁵"], answer: "4 × 10⁻⁵", explanation: "Divide the coefficients: 8 ÷ 2 = 4. Subtract exponents: −3 − 2 = −5." },
  { question: "The accepted value is 0.020 and an estimate is 0.019. What is the percentage error?", options: ["5%", "0.1%", "1%", "10%"], answer: "5%", explanation: "The absolute error is 0.001. Divide by 0.020 and multiply by 100% to get 5%." },
  { question: "Which statement is true about 0.04040?", options: ["It has 4 significant figures and is rational", "It has 3 significant figures and is rational", "It has 4 significant figures and is irrational", "It has 5 significant figures and is rational"], answer: "It has 4 significant figures and is rational", explanation: "Count 4, 0, 4 and the final decimal zero. The decimal terminates, so it is rational." },
];

export const unitZeroTestSteps: GuidedLessonStep[] = testQuestions.map((question, index) => ({
  title: `Unit 0 test: question ${index + 1} of ${testQuestions.length}`,
  part: "Unit 0 test",
  blocks: [{ type: "quiz", ...question }],
}));
