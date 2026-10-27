import type { GuidedLessonStep, LessonBlock } from "./course";

type Example = {
  expression: string;
  detail: string;
  steps: string[];
};

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function section(
  title: string,
  introduction: string,
  examples: Example[],
  questions: Question[],
): GuidedLessonStep[] {
  return [
    {
      title,
      part: title,
      blocks: [
        { type: "text", text: introduction },
        ...examples.map((example, index): LessonBlock => ({
          type: "example",
          label: `Example ${index + 1}`,
          ...example,
        })),
      ],
    },
    ...questions.map((question, index): GuidedLessonStep => ({
      title: `${title}: practice ${index + 1} of ${questions.length}`,
      part: title,
      blocks: [{ type: "quiz", ...question }],
    })),
  ];
}

export const significantFiguresSteps: GuidedLessonStep[] = [
  ...section(
    "Counting significant figures",
    "Significant figures describe the precision of a number. Start counting at the first non-zero digit, then apply the zero rules in the next parts.",
    [
      {
        expression: "347 has 3 significant figures",
        detail: "Every non-zero digit counts.",
        steps: ["Start at the first non-zero digit: 3.", "Count 3, 4 and 7: there are 3 significant figures."],
      },
      {
        expression: "2.71 has 3 significant figures",
        detail: "The decimal point is not a digit and does not count.",
        steps: ["Start at 2, the first non-zero digit.", "Count 2, 7 and 1. The decimal point is skipped.", "There are 3 significant figures."],
      },
    ],
    [
      { question: "How many significant figures are in 582?", options: ["1", "2", "3", "4"], answer: "3", explanation: "All three non-zero digits, 5, 8 and 2, count." },
      { question: "How many significant figures are in 6.42?", options: ["1", "2", "3", "4"], answer: "3", explanation: "Count the digits 6, 4 and 2; the decimal point is not a digit." },
      { question: "Where do you begin counting significant figures?", options: ["At the first non-zero digit", "At the decimal point", "At the final digit", "Always at the first zero"], answer: "At the first non-zero digit", explanation: "Find the first non-zero digit, then count from there using the zero rules." },
      { question: "How many significant figures are in 91?", options: ["1", "2", "3", "4"], answer: "2", explanation: "Both 9 and 1 are non-zero, so both count." },
      { question: "Does the decimal point itself count as a significant figure?", options: ["Yes", "No", "Only after a zero", "Only in numbers below 1"], answer: "No", explanation: "Significant figures are digits; a decimal point is not a digit." },
    ],
  ),
  ...section(
    "Zeros before the first digit",
    "Leading zeros come before the first non-zero digit. They show place value, but they are not significant figures.",
    [
      {
        expression: "0.0045 has 2 significant figures",
        detail: "The zeros before 4 do not count.",
        steps: ["Find the first non-zero digit: 4.", "Ignore the zeros before 4; they locate the decimal point.", "Count 4 and 5: the number has 2 significant figures."],
      },
      {
        expression: "0.0702 has 3 significant figures",
        detail: "Leading zeros do not count, but the zero between 7 and 2 does.",
        steps: ["Ignore the zeros before the first non-zero digit, 7.", "Count 7, 0 and 2. The zero between non-zero digits counts.", "There are 3 significant figures."],
      },
    ],
    [
      { question: "How many significant figures are in 0.0034?", options: ["2", "3", "4", "5"], answer: "2", explanation: "The leading zeros do not count; 3 and 4 do." },
      { question: "How many significant figures are in 0.08?", options: ["1", "2", "3", "0"], answer: "1", explanation: "Only the 8 counts; both zeros come before it." },
      { question: "In 0.0056, which digits are significant?", options: ["5 and 6", "0, 5 and 6", "All the digits", "Only 6"], answer: "5 and 6", explanation: "The zeros before 5 are leading zeros, so they do not count." },
      { question: "How many significant figures are in 0.0421?", options: ["2", "3", "4", "5"], answer: "3", explanation: "Start at 4 and count 4, 2 and 1." },
      { question: "How many significant figures are in 0.00603?", options: ["2", "3", "4", "5"], answer: "3", explanation: "The leading zeros do not count. Count 6, the zero between the digits, and 3." },
    ],
  ),
  ...section(
    "Zeros between digits",
    "A zero between non-zero digits is significant. It counts even if the number has a decimal point.",
    [
      {
        expression: "503 has 3 significant figures",
        detail: "The zero is between 5 and 3, so it counts.",
        steps: ["Start at 5.", "Count 5, 0 and 3. The middle zero is between non-zero digits.", "There are 3 significant figures."],
      },
      {
        expression: "0.04005 has 4 significant figures",
        detail: "Ignore leading zeros, then count both zeros between 4 and 5.",
        steps: ["Start at the first non-zero digit, 4; the zeros before it do not count.", "Count 4, 0, 0 and 5.", "Both zeros between 4 and 5 count, so there are 4 significant figures."],
      },
    ],
    [
      { question: "How many significant figures are in 409?", options: ["2", "3", "4", "1"], answer: "3", explanation: "The zero between 4 and 9 counts, so count all three digits." },
      { question: "Does the zero in 1.02 count?", options: ["Yes", "No", "Only when rounding", "Only without a decimal point"], answer: "Yes", explanation: "The zero sits between non-zero digits, so it is significant." },
      { question: "How many significant figures are in 2007?", options: ["2", "3", "4", "5"], answer: "4", explanation: "Both zeros are between 2 and 7, so all four digits count." },
      { question: "How many significant figures are in 0.0304?", options: ["2", "3", "4", "5"], answer: "3", explanation: "Start at 3. Count 3, 0 and 4; the earlier zeros do not count." },
      { question: "Which number has 3 significant figures?", options: ["0.009", "0.0090", "0.0909", "9.0"], answer: "0.0909", explanation: "Starting at 9, count 9, 0 and 9. The first zeros are leading zeros." },
    ],
  ),
  ...section(
    "Zeros at the end",
    "Zeros at the end of a decimal number count after the first non-zero digit. For whole numbers without a decimal point, ending zeros can be ambiguous; scientific notation makes the intended precision clear.",
    [
      {
        expression: "4.500 has 4 significant figures",
        detail: "Both zeros after 5 show the recorded precision.",
        steps: ["Start at the first non-zero digit, 4.", "Count 4 and 5.", "Count both zeros at the end of the decimal: 4, 5, 0, 0 means 4 significant figures."],
      },
      {
        expression: "1.20 × \\(10^{3}\\) has 3 significant figures",
        detail: "Scientific notation shows that the final zero is significant.",
        steps: ["Count the digits in the coefficient 1.20: 1, 2 and 0.", "The ending zero after the decimal point counts.", "The power of 10 changes the scale, not the number of significant figures.", "The number has 3 significant figures. Writing 1200 alone may not make that precision clear."],
      },
    ],
    [
      { question: "How many significant figures are in 2.30?", options: ["1", "2", "3", "4"], answer: "3", explanation: "The final decimal zero counts, so count 2, 3 and 0." },
      { question: "How many significant figures are in 0.0500?", options: ["1", "2", "3", "4"], answer: "3", explanation: "Ignore leading zeros. Count 5 and the two zeros at the end." },
      { question: "How many significant figures are in 6.00 × \\(10^{2}\\)?", options: ["1", "2", "3", "5"], answer: "3", explanation: "The coefficient 6.00 has three significant figures. The exponent does not add any." },
      { question: "Which notation clearly shows 2 significant figures for 5000?", options: ["5.0 × \\(10^{3}\\)", "5 × \\(10^{3}\\)", "5.00 × \\(10^{3}\\)", "0.5 × \\(10^{4}\\)"], answer: "5.0 × \\(10^{3}\\)", explanation: "The coefficient 5.0 explicitly includes two significant digits." },
      { question: "How many significant figures are in 10.0?", options: ["1", "2", "3", "4"], answer: "3", explanation: "The zeros after 1 are significant in the written decimal 10.0." },
    ],
  ),
  ...section(
    "Rounding to significant figures",
    "To round to a given number of significant figures, start at the first non-zero digit. Keep the required digits, then use the next digit to decide whether to round up.",
    [
      {
        expression: "47.386 → 47.4 (3 significant figures)",
        detail: "The fourth significant digit is 8, so round the third digit up.",
        steps: ["Start at 4. The first three significant digits are 4, 7 and 3.", "Look at the next digit, 8. Since 8 is at least 5, increase the 3 to 4.", "Write the result: 47.4."],
      },
      {
        expression: "0.004632 → 0.0046 (2 significant figures)",
        detail: "Leading zeros do not count when finding the rounding digit.",
        steps: ["Ignore the leading zeros and start at 4.", "Keep 4 and 6: these are the first two significant digits.", "The next digit is 3, which is less than 5, so the 6 stays the same.", "Write 0.0046."],
      },
      {
        expression: "9.96 → 1.0 × \\(10^{1}\\) (2 significant figures)",
        detail: "Rounding up can carry into the next place; keep the required precision.",
        steps: ["Keep the first two significant digits: 9 and 9.", "The next digit is 6, so round up. The carry gives 10.", "Write 1.0 × \\(10^{1}\\) to show exactly 2 significant figures; 10.0 would have 3."],
      },
    ],
    [
      { question: "Round 6.347 to 2 significant figures.", options: ["6.3", "6.4", "6.35", "6"], answer: "6.3", explanation: "Keep 6 and 3. The next digit is 4, so the 3 stays the same." },
      { question: "Round 0.00786 to 2 significant figures.", options: ["0.0079", "0.0078", "0.008", "0.00786"], answer: "0.0079", explanation: "Keep 7 and 8. The next digit, 6, rounds 8 up to 9." },
      { question: "Round 452 to 2 significant figures.", options: ["450", "460", "452", "45"], answer: "450", explanation: "Keep 4 and 5; the next digit is 2, so use a zero to keep the place value: 450." },
      { question: "Round 3.146 to 3 significant figures.", options: ["3.14", "3.15", "3.1", "3.146"], answer: "3.15", explanation: "Keep 3, 1 and 4. The next digit is 6, so round 4 up to 5." },
      { question: "Which answer shows 9.96 rounded to exactly 2 significant figures?", options: ["1.0 × \\(10^{1}\\)", "9.9", "10.0", "9.96"], answer: "1.0 × \\(10^{1}\\)", explanation: "Rounding gives 10; writing 1.0 × \\(10^{1}\\) makes the two significant figures clear." },
    ],
  ),
  ...section(
    "Decimal places and significant figures",
    "Decimal places count digits after the decimal point. Significant figures start at the first non-zero digit. The same number can round differently depending on which is requested.",
    [
      {
        expression: "0.04786 → 0.05 (2 decimal places)",
        detail: "Decimal places start immediately after the decimal point, even when a digit is zero.",
        steps: ["Count two decimal places: 0 is the first and 4 is the second.", "Look at the next digit, 7. Round the 4 up to 5.", "Write 0.05, which has two digits after the decimal point."],
      },
      {
        expression: "0.04786 → 0.048 (2 significant figures)",
        detail: "Significant figures start at the first non-zero digit, not at the decimal point.",
        steps: ["Skip the leading zeros and start at 4.", "Keep 4 and 7. The next digit is 8, so round 7 up to 8.", "Write 0.048. The significant digits are 4 and 8."],
      },
    ],
    [
      { question: "Round 3.146 to 2 decimal places.", options: ["3.15", "3.14", "3.1", "3.146"], answer: "3.15", explanation: "Keep two digits after the decimal point: 1 and 4. The next digit 6 rounds 4 up." },
      { question: "Round 0.04786 to 2 decimal places.", options: ["0.05", "0.048", "0.04", "0.047"], answer: "0.05", explanation: "The second decimal place is 4; the next digit is 7, so round up to 0.05." },
      { question: "Round 0.04786 to 2 significant figures.", options: ["0.048", "0.05", "0.047", "0.0479"], answer: "0.048", explanation: "Start at 4, keep 4 and 7, and use the next digit 8 to round up." },
      { question: "How many decimal places does 5.020 have?", options: ["1", "2", "3", "4"], answer: "3", explanation: "There are three digits after the decimal point: 0, 2 and 0." },
      { question: "Where do you start counting decimal places?", options: ["Immediately after the decimal point", "At the first non-zero digit", "At the last digit", "Before the decimal point"], answer: "Immediately after the decimal point", explanation: "Every digit after the decimal point counts as a decimal place, including zeros." },
    ],
  ),
];
