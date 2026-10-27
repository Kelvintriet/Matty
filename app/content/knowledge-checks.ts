import type { GuidedLessonStep } from "./course";

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function finalCheck(questions: Question[]): GuidedLessonStep[] {
  return questions.map((question, index) => ({
    title: `Final check: question ${index + 1} of ${questions.length}`,
    part: "Final check",
    blocks: [{ type: "quiz", ...question }],
  }));
}

export const scientificNotationCheck = finalCheck([
  {
    question: "Which is the correct scientific notation for 0.000072?",
    options: ["7.2 × 10⁻⁵", "7.2 × 10⁻⁴", "72 × 10⁻⁶", "7.2 × 10⁵"],
    answer: "7.2 × 10⁻⁵",
    explanation: "Move the decimal five places right to make 7.2. Because the original number is less than 1, the exponent is −5.",
  },
  {
    question: "Which is (6 × 10³)(2 × 10²) in scientific notation?",
    options: ["1.2 × 10⁶", "12 × 10⁵", "1.2 × 10⁵", "8 × 10⁵"],
    answer: "1.2 × 10⁶",
    explanation: "6 × 2 = 12 and 10³ × 10² = 10⁵. Rewrite 12 × 10⁵ as 1.2 × 10⁶.",
  },
  {
    question: "Which is (4 × 10⁵) ÷ (8 × 10²) in scientific notation?",
    options: ["5 × 10²", "0.5 × 10³", "5 × 10³", "2 × 10³"],
    answer: "5 × 10²",
    explanation: "4 ÷ 8 = 0.5 and 5 − 2 = 3. Rewrite 0.5 × 10³ as 5 × 10².",
  },
]);

export const significantFiguresCheck = finalCheck([
  {
    question: "How many significant figures are in 0.03040?",
    options: ["4", "3", "5", "6"],
    answer: "4",
    explanation: "Ignore the leading zeros. Count 3, the zero between 3 and 4, 4, and the final decimal zero.",
  },
  {
    question: "Which answer shows 0.00996 rounded to exactly 2 significant figures?",
    options: ["0.010", "0.01", "0.0099", "0.0100"],
    answer: "0.010",
    explanation: "The first two significant digits are 9 and 9; the 6 rounds up. The final zero in 0.010 shows the second significant figure.",
  },
  {
    question: "Which scientific notation shows 4,500 to exactly 3 significant figures?",
    options: ["4.50 × 10³", "4.5 × 10³", "4.500 × 10³", "45.0 × 10²"],
    answer: "4.50 × 10³",
    explanation: "The coefficient 4.50 has three significant digits and is at least 1 but less than 10, as scientific notation requires.",
  },
]);

export const absoluteErrorCheck = finalCheck([
  {
    question: "An estimate is 75 g and the accepted value is 80 g. What is the percentage error?",
    options: ["6.25%", "5%", "6.67%", "93.75%"],
    answer: "6.25%",
    explanation: "The absolute error is 5 g. Divide by the accepted value: 5 ÷ 80 × 100% = 6.25%.",
  },
  {
    question: "A length is 2.4 m to the nearest 0.1 m. Which value could be the exact length?",
    options: ["2.35 m", "2.45 m", "2.34 m", "2.50 m"],
    answer: "2.35 m",
    explanation: "The interval is 2.35 ≤ length < 2.45 m. The lower bound is included and the upper bound is excluded.",
  },
  {
    question: "A value is recorded as 120 to the nearest 10. What is the maximum absolute rounding error?",
    options: ["5", "0.5", "10", "60"],
    answer: "5",
    explanation: "The rounding unit is 10, so half the unit gives a maximum absolute rounding error of 5.",
  },
]);

export const numberSetsCheck = finalCheck([
  {
    question: "Which is the smallest set in ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ that contains −8?",
    options: ["ℤ", "ℕ", "ℚ", "ℝ"],
    answer: "ℤ",
    explanation: "−8 is a negative whole number, so it is an integer. It is also rational and real, but it is not natural.",
  },
  {
    question: "Which number is irrational?",
    options: ["√18", "√25", "0.121212…", "−7/2"],
    answer: "√18",
    explanation: "√18 = 3√2 is irrational. √25 = 5, the repeating decimal, and −7/2 are rational.",
  },
  {
    question: "Which fraction equals 0.181818…?",
    options: ["2/11", "18/100", "1/18", "18/90"],
    answer: "2/11",
    explanation: "Let x = 0.181818…. Then 100x − x = 18, so x = 18/99 = 2/11.",
  },
]);
