import type { GuidedLessonStep, LessonBlock } from "./course";

type Example = { expression: string; detail: string; steps: string[] };
type Question = { question: string; options: string[]; answer: string; explanation: string };

function section(title: string, text: string, examples: Example[], questions: Question[]): GuidedLessonStep[] {
  return [
    {
      title,
      part: title,
      blocks: [
        { type: "text", text },
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

export const absoluteErrorSteps: GuidedLessonStep[] = [
  ...section(
    "Understanding error",
    "An estimate or measurement may differ from an accepted value. The error tells us how far apart the two values are.",
    [
      {
        expression: "Estimate: 48 cm; accepted value: 50 cm",
        detail: "The estimate is 2 cm below the accepted value.",
        steps: ["Compare the estimate, 48 cm, with the accepted value, 50 cm.", "Find the difference: 50 − 48 = 2.", "The estimate is 2 cm away from the accepted value."],
      },
      {
        expression: "Estimate: 53 g; accepted value: 50 g",
        detail: "An estimate can also be above the accepted value.",
        steps: ["Compare 53 g with 50 g.", "Find the difference: 53 − 50 = 3.", "The estimate is 3 g away from the accepted value."],
      },
    ],
    [
      { question: "An estimate is 9 cm and the accepted value is 10 cm. How far apart are they?", options: ["1 cm", "9 cm", "10 cm", "19 cm"], answer: "1 cm", explanation: "Subtract: 10 − 9 = 1 cm." },
      { question: "An estimate is 14 g and the accepted value is 11 g. How far apart are they?", options: ["3 g", "−3 g", "11 g", "25 g"], answer: "3 g", explanation: "The estimate is 3 g above the accepted value: 14 − 11 = 3." },
      { question: "An estimate is 20 and the accepted value is 20. How far apart are they?", options: ["0", "1", "20", "40"], answer: "0", explanation: "The values match, so their difference is 0." },
      { question: "Which estimate is closer to an accepted value of 100?", options: ["98", "95", "92", "90"], answer: "98", explanation: "98 is only 2 away from 100; the other estimates are farther away." },
      { question: "An estimate is 7 and the accepted value is 10. Is the estimate above or below the accepted value?", options: ["Below", "Above", "Equal", "Impossible to tell"], answer: "Below", explanation: "7 is less than 10, so the estimate is below the accepted value." },
    ],
  ),
  ...section(
    "Absolute error",
    "Absolute error is the non-negative distance between an estimate and an accepted value: |estimate − accepted value|. It has the same units as the values.",
    [
      {
        expression: "Estimate 48 cm; accepted 50 cm → absolute error 2 cm",
        detail: "The vertical bars mean take the absolute value, or distance from zero.",
        steps: ["Subtract the accepted value from the estimate: 48 − 50 = −2 cm.", "Take the absolute value: |−2| = 2.", "The absolute error is 2 cm."],
      },
      {
        expression: "Estimate 12.4 kg; accepted 12 kg → absolute error 0.4 kg",
        detail: "The result stays positive when the estimate is above the accepted value, too.",
        steps: ["Subtract: 12.4 − 12 = 0.4 kg.", "Take the absolute value: |0.4| = 0.4.", "The absolute error is 0.4 kg."],
      },
    ],
    [
      { question: "An estimate is 18 and the accepted value is 20. What is the absolute error?", options: ["2", "−2", "18", "38"], answer: "2", explanation: "|18 − 20| = |−2| = 2." },
      { question: "An estimate is 105 m and the accepted value is 100 m. What is the absolute error?", options: ["5 m", "−5 m", "5%", "105 m"], answer: "5 m", explanation: "|105 − 100| = 5 m. Absolute error has the same units as the measurements." },
      { question: "Can an absolute error be negative?", options: ["No", "Yes", "Only if the estimate is lower", "Only for decimals"], answer: "No", explanation: "Absolute error is a distance, so it is zero or positive." },
      { question: "What is the absolute error when the estimate and accepted value are both 7?", options: ["0", "1", "7", "14"], answer: "0", explanation: "|7 − 7| = 0." },
      { question: "An estimate is 3.2 kg and the accepted value is 3.5 kg. What is the absolute error?", options: ["0.3 kg", "−0.3 kg", "0.3%", "6.7 kg"], answer: "0.3 kg", explanation: "|3.2 − 3.5| = |−0.3| = 0.3 kg." },
    ],
  ),
  ...section(
    "Percentage error",
    "Percentage error compares the absolute error with the size of the accepted value: absolute error ÷ |accepted value| × 100%. The accepted value must not be zero.",
    [
      {
        expression: "Estimate 48; accepted 50 → percentage error 4%",
        detail: "First find the absolute error, then compare it with the accepted value.",
        steps: ["Find the absolute error: |48 − 50| = 2.", "Divide by the accepted value: 2 ÷ 50 = 0.04.", "Convert to a percentage: 0.04 × 100% = 4%."],
      },
      {
        expression: "Estimate 11 g; accepted 10 g → percentage error 10%",
        detail: "The denominator is the accepted value, even when the estimate is larger.",
        steps: ["Find the absolute error: |11 − 10| = 1 g.", "Divide by the accepted value: 1 ÷ 10 = 0.1.", "Multiply by 100%: 0.1 × 100% = 10%."],
      },
    ],
    [
      { question: "An estimate is 18 and the accepted value is 20. What is the percentage error?", options: ["10%", "2%", "20%", "90%"], answer: "10%", explanation: "Absolute error is 2; 2 ÷ 20 × 100% = 10%." },
      { question: "An estimate is 105 and the accepted value is 100. What is the percentage error?", options: ["5%", "10%", "95%", "105%"], answer: "5%", explanation: "Absolute error is 5; 5 ÷ 100 × 100% = 5%." },
      { question: "Which value do you divide by to calculate percentage error?", options: ["The absolute value of the accepted value", "The estimate", "The absolute error", "100"], answer: "The absolute value of the accepted value", explanation: "Percentage error compares the absolute error with the size of the accepted value." },
      { question: "The absolute error is 3 and the accepted value is 60. What is the percentage error?", options: ["5%", "3%", "20%", "60%"], answer: "5%", explanation: "3 ÷ 60 = 0.05, and 0.05 × 100% = 5%." },
      { question: "Can the usual percentage error formula be used when the accepted value is 0?", options: ["No, division by zero is undefined", "Yes, the error is always 0%", "Yes, divide by the estimate instead", "Yes, the error is always 100%"], answer: "No, division by zero is undefined", explanation: "The formula divides by the size of the accepted value, and division by zero is undefined." },
    ],
  ),
  ...section(
    "Understanding bounds",
    "A rounded measurement represents a range of possible values. The lower bound is included; the upper bound is excluded when using the usual round-half-up rule.",
    [
      {
        expression: "8 cm to the nearest 1 cm: 7.5 ≤ length < 8.5 cm",
        detail: "Half of the rounding unit, 1 cm, is 0.5 cm.",
        steps: ["Find half the rounding unit: 1 ÷ 2 = 0.5 cm.", "Lower bound: 8 − 0.5 = 7.5 cm.", "Upper bound: 8 + 0.5 = 8.5 cm.", "7.5 rounds to 8, but 8.5 rounds to 9, so write 7.5 ≤ length < 8.5."],
      },
      {
        expression: "7.5 cm to the nearest 0.1 cm: 7.45 ≤ length < 7.55 cm",
        detail: "The rounding unit is 0.1 cm, not 1 cm.",
        steps: ["Half the rounding unit is 0.1 ÷ 2 = 0.05 cm.", "Lower bound: 7.5 − 0.05 = 7.45 cm.", "Upper bound: 7.5 + 0.05 = 7.55 cm.", "Write 7.45 ≤ length < 7.55 cm."],
      },
    ],
    [
      { question: "A length is 5 cm to the nearest cm. What is its lower bound?", options: ["4.5 cm", "4 cm", "5 cm", "5.5 cm"], answer: "4.5 cm", explanation: "Half of 1 cm is 0.5 cm, so 5 − 0.5 = 4.5 cm." },
      { question: "A length is 5 cm to the nearest cm. What is its upper bound?", options: ["5.5 cm", "5 cm", "6 cm", "4.5 cm"], answer: "5.5 cm", explanation: "Add half the rounding unit: 5 + 0.5 = 5.5 cm." },
      { question: "A measurement is 2.3 kg to the nearest 0.1 kg. What is half the rounding unit?", options: ["0.05 kg", "0.1 kg", "0.5 kg", "0.01 kg"], answer: "0.05 kg", explanation: "The rounding unit is 0.1 kg, and half of it is 0.05 kg." },
      { question: "A length is 8 cm to the nearest cm. Is 8.5 cm included in its range?", options: ["No", "Yes", "Only when it is exact", "Only if the length is negative"], answer: "No", explanation: "8.5 cm rounds to 9 cm under the usual round-half-up rule, so the upper bound is excluded." },
      { question: "A measurement is 30 g to the nearest 10 g. What is its lower bound?", options: ["25 g", "29.5 g", "20 g", "35 g"], answer: "25 g", explanation: "Half of 10 g is 5 g; 30 − 5 = 25 g." },
    ],
  ),
  ...section(
    "Error from rounding",
    "When a measurement is rounded, half the rounding unit gives its maximum possible absolute error. The exact value is usually unknown, but the bounds show the possible range.",
    [
      {
        expression: "12 m to the nearest metre → maximum error 0.5 m",
        detail: "Every value in the rounding interval is at most half a metre from 12 m.",
        steps: ["The rounding unit is 1 m.", "Half the unit is 1 ÷ 2 = 0.5 m.", "The possible values lie in 11.5 ≤ length < 12.5 m; the largest possible absolute error is 0.5 m."],
      },
      {
        expression: "3.6 kg to the nearest 0.1 kg → maximum error 0.05 kg",
        detail: "Use the actual rounding unit before finding its half.",
        steps: ["The rounding unit is 0.1 kg.", "Calculate half: 0.1 ÷ 2 = 0.05 kg.", "The possible values lie in 3.55 ≤ mass < 3.65 kg, so the maximum absolute error is 0.05 kg."],
      },
    ],
    [
      { question: "A value is rounded to the nearest whole number. What is its maximum absolute rounding error?", options: ["0.5", "1", "0.1", "5"], answer: "0.5", explanation: "The rounding unit is 1, so half the unit is 0.5." },
      { question: "A value is rounded to the nearest 0.01. What is its maximum absolute rounding error?", options: ["0.005", "0.01", "0.05", "0.5"], answer: "0.005", explanation: "Half of the rounding unit is 0.01 ÷ 2 = 0.005." },
      { question: "A length is 40 cm to the nearest 10 cm. What is its maximum absolute rounding error?", options: ["5 cm", "10 cm", "0.5 cm", "20 cm"], answer: "5 cm", explanation: "Half of the 10 cm rounding unit is 5 cm." },
      { question: "A mass is 4.2 kg to the nearest 0.1 kg. Which interval describes its possible values?", options: ["4.15 ≤ mass < 4.25 kg", "4.1 ≤ mass < 4.3 kg", "4.2 ≤ mass < 4.3 kg", "4.15 ≤ mass ≤ 4.25 kg"], answer: "4.15 ≤ mass < 4.25 kg", explanation: "Half of 0.1 kg is 0.05 kg. Subtract and add 0.05, excluding the upper bound." },
      { question: "A measurement is 6 m to the nearest metre. Can its exact value be known from the rounded measurement alone?", options: ["No", "Yes, it must be exactly 6 m", "Yes, it must be exactly 5.5 m", "Yes, it must be exactly 6.5 m"], answer: "No", explanation: "Any value from 5.5 m inclusive to 6.5 m exclusive rounds to 6 m; the exact value is unknown." },
    ],
  ),
];
