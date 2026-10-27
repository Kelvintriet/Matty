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

export const numberSetsSteps: GuidedLessonStep[] = [
  ...section(
    "Natural numbers and integers",
    "Natural numbers are counting numbers: \\(1\\), \\(2\\), \\(3\\), and so on. Integers include negative whole numbers, zero, and positive whole numbers. Some definitions include \\(0\\) as natural; in this lesson we use ℕ = {\\(1\\), \\(2\\), \\(3\\), …}.",
    [
      {
        expression: "\\(5\\) ∈ ℕ and \\(5\\) ∈ ℤ",
        detail: "A number can belong to more than one set.",
        steps: ["\\(5\\) is a positive counting number, so it is natural.", "\\(5\\) is also a whole number, so it is an integer.", "The symbol ∈ means ‘belongs to’."],
      },
      {
        expression: "\\(-3\\) ∈ ℤ but \\(-3\\) ∉ ℕ",
        detail: "Negative whole numbers are integers, but not natural numbers.",
        steps: ["\\(-3\\) is a whole number below zero, so it is an integer.", "It is not in the counting list \\(1\\), \\(2\\), \\(3\\), …, so it is not natural.", "The symbol ∉ means ‘does not belong to’."],
      },
    ],
    [
      { question: "Which number is natural using ℕ = {\\(1\\), \\(2\\), \\(3\\), …}?", options: ["\\(4\\)", "\\(-4\\)", "\\(\\dfrac{1}{2}\\)", "\\(0\\)"], answer: "\\(4\\)", explanation: "\\(4\\) is a positive counting number. In this lesson, \\(0\\) is not included in ℕ." },
      { question: "Which number is an integer?", options: ["\\(-7\\)", "\\(2.5\\)", "\\(\\dfrac{1}{3}\\)", "\\(\\sqrt{2}\\)"], answer: "\\(-7\\)", explanation: "\\(-7\\) is a negative whole number, so it belongs to ℤ." },
      { question: "Is \\(0\\) an integer?", options: ["Yes", "No", "Only when it is natural", "Only when written as \\(0.0\\)"], answer: "Yes", explanation: "The integers include zero as well as positive and negative whole numbers." },
      { question: "Which statement is true?", options: ["\\(-2\\) ∈ ℤ", "\\(-2\\) ∈ ℕ", "\\(\\dfrac{1}{2}\\) ∈ ℤ", "\\(2.5\\) ∈ ℤ"], answer: "\\(-2\\) ∈ ℤ", explanation: "\\(-2\\) is a negative whole number, so it is an integer." },
      { question: "Using this lesson’s definition of ℕ, is \\(0 a\\) natural number?", options: ["No", "Yes", "Only when negative", "Only when written as a fraction"], answer: "No", explanation: "Here ℕ starts at \\(1\\). Other sources may include \\(0\\), so always check the convention." },
    ],
  ),
  ...section(
    "Rational numbers",
    "A rational number can be written as a fraction \\(\\dfrac{a}{b}\\), where a and b are integers and b is not zero. Its decimal form terminates or eventually repeats.",
    [
      {
        expression: "\\(-4 = \\dfrac{-4}{1}\\), so \\(-4\\) ∈ ℚ",
        detail: "Every integer is rational because it can be written over \\(1\\).",
        steps: ["Start with the integer \\(-4\\).", "Write it as a fraction: \\(\\dfrac{-4}{1} = -4\\).", "Both \\(-4\\) and \\(1\\) are integers and the denominator is not zero, so \\(-4\\) is rational."],
      },
      {
        expression: "\\(0.75 = \\dfrac{75}{100} = \\dfrac{3}{4}\\)",
        detail: "A terminating decimal can be written as a fraction.",
        steps: ["\\(0.75\\) has two decimal places, so write it as \\(\\dfrac{75}{100}\\).", "Divide the numerator and denominator by \\(25\\): \\(\\dfrac{75}{100} = \\dfrac{3}{4}\\).", "\\(3\\) and \\(4\\) are integers and \\(4\\) is not zero, so \\(0.75\\) is rational."],
      },
    ],
    [
      { question: "Which number is rational?", options: ["\\(\\dfrac{3}{5}\\)", "\\(\\sqrt{2}\\)", "π", "\\(\\sqrt{3}\\)"], answer: "\\(\\dfrac{3}{5}\\)", explanation: "\\(\\dfrac{3}{5}\\) is a fraction of integers with a non-zero denominator." },
      { question: "Why is \\(-6\\) rational?", options: ["\\(-6 = \\dfrac{-6}{1}\\)", "It is positive", "It is not an integer", "It has no fraction form"], answer: "\\(-6 = \\dfrac{-6}{1}\\)", explanation: "\\(\\dfrac{-6}{1}\\) is a fraction of integers with a non-zero denominator." },
      { question: "Is \\(0.25\\) rational?", options: ["Yes, because \\(0.25 = \\dfrac{1}{4}\\)", "No, because it is a decimal", "No, because it is less than \\(1\\)", "Only if it repeats"], answer: "Yes, because \\(0.25 = \\dfrac{1}{4}\\)", explanation: "\\(0.25\\) terminates and equals \\(\\dfrac{1}{4}\\), a fraction of integers." },
      { question: "In a fraction \\(\\dfrac{a}{b}\\) representing a rational number, what must be true about b?", options: ["b is an integer and not zero", "b must be zero", "b must be positive and greater than \\(1\\)", "b must be irrational"], answer: "b is an integer and not zero", explanation: "The denominator must be an integer, and division by zero is undefined." },
      { question: "Is \\(0.333\\)… rational?", options: ["Yes, it equals \\(\\dfrac{1}{3}\\)", "No, all endless decimals are irrational", "No, it does not repeat", "Only if rounded"], answer: "Yes, it equals \\(\\dfrac{1}{3}\\)", explanation: "The decimal repeats and equals the fraction \\(\\dfrac{1}{3}\\)." },
    ],
  ),
  ...section(
    "Irrational and real numbers",
    "Irrational numbers cannot be written as a fraction of two integers. Their decimals go on forever without repeating a fixed pattern. Real numbers include both rational and irrational numbers.",
    [
      {
        expression: "\\(\\sqrt{2}\\) ≈ \\(1.41421356\\)… is irrational",
        detail: "Its decimal neither terminates nor repeats a fixed pattern.",
        steps: ["\\(\\sqrt{2}\\) means the positive number whose square is \\(2\\).", "It cannot be written as a fraction of two integers.", "It is irrational, and it is also a real number."],
      },
      {
        expression: "\\(\\sqrt{9} = 3\\) is rational",
        detail: "A square root is not automatically irrational.",
        steps: ["Find the positive number whose square is \\(9\\): \\(\\sqrt{9} = 3\\).", "Write \\(3\\) as \\(\\dfrac{3}{1}\\).", "It is an integer, rational, and real; it is not irrational."],
      },
    ],
    [
      { question: "Which number is irrational?", options: ["\\(\\sqrt{2}\\)", "\\(\\sqrt{9}\\)", "\\(0.5\\)", "\\(-3\\)"], answer: "\\(\\sqrt{2}\\)", explanation: "\\(\\sqrt{2}\\) cannot be expressed as a ratio of integers. The other choices are rational." },
      { question: "Is π a real number?", options: ["Yes", "No", "Only when rounded", "Only if written as a fraction"], answer: "Yes", explanation: "π is irrational, and irrational numbers are real numbers." },
      { question: "What is true about an irrational number’s decimal expansion?", options: ["It never ends and never repeats a fixed pattern", "It always terminates", "It always repeats", "It has no decimal form"], answer: "It never ends and never repeats a fixed pattern", explanation: "A terminating or eventually repeating decimal is rational, not irrational." },
      { question: "Is \\(\\sqrt{16}\\) rational or irrational?", options: ["Rational", "Irrational", "Neither real nor rational", "Cannot be determined"], answer: "Rational", explanation: "\\(\\sqrt{16} = 4 = \\dfrac{4}{1}\\), so it is rational." },
      { question: "Which statement about real numbers is true?", options: ["They include rational and irrational numbers", "They include only integers", "They include only irrational numbers", "They exclude fractions"], answer: "They include rational and irrational numbers", explanation: "Both rational and irrational numbers belong to the real number set ℝ." },
    ],
  ),
  ...section(
    "Set notation and relationships",
    "Use ∈ for ‘is an element of’ and ∉ for ‘is not an element of’. A subset contains only elements of another set: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.",
    [
      {
        expression: "\\(-5\\) ∈ ℤ and \\(-5\\) ∈ ℚ",
        detail: "Every integer is also rational, but not every rational number is an integer.",
        steps: ["\\(-5\\) is a negative whole number, so \\(-5\\) ∈ ℤ.", "Write \\(-5\\) as \\(\\dfrac{-5}{1}\\); therefore \\(-5\\) ∈ ℚ too.", "The relationship ℤ ⊂ ℚ says every integer belongs to the rational numbers."],
      },
      {
        expression: "\\(\\dfrac{1}{2}\\) ∈ ℚ but \\(\\dfrac{1}{2}\\) ∉ ℤ",
        detail: "Membership in a larger set does not always mean membership in a smaller set.",
        steps: ["\\(\\dfrac{1}{2}\\) is a fraction of integers with a non-zero denominator, so it is rational.", "\\(\\dfrac{1}{2}\\) is not a whole number, so it is not an integer.", "Write \\(\\dfrac{1}{2}\\) ∈ ℚ and \\(\\dfrac{1}{2}\\) ∉ ℤ."],
      },
    ],
    [
      { question: "What does \\(3\\) ∈ ℕ mean?", options: ["\\(3\\) belongs to the natural numbers", "\\(3\\) is not natural", "The natural numbers belong to \\(3\\)", "\\(3\\) is irrational"], answer: "\\(3\\) belongs to the natural numbers", explanation: "The symbol ∈ means ‘is an element of’ or ‘belongs to’." },
      { question: "Which statement is true?", options: ["\\(\\sqrt{2}\\) ∉ ℚ", "\\(\\sqrt{2}\\) ∈ ℚ", "\\(\\dfrac{1}{2}\\) ∈ ℤ", "\\(-3\\) ∈ ℕ"], answer: "\\(\\sqrt{2}\\) ∉ ℚ", explanation: "\\(\\sqrt{2}\\) is irrational, so it does not belong to the rational numbers." },
      { question: "Which set contains every integer?", options: ["ℚ", "ℕ", "Irrational numbers", "Only positive numbers"], answer: "ℚ", explanation: "Every integer n can be written as \\(\\dfrac{n}{1}\\), so ℤ is a subset of ℚ." },
      { question: "Which statement is true about \\(\\dfrac{2}{3}\\)?", options: ["\\(\\dfrac{2}{3}\\) ∈ ℚ and \\(\\dfrac{2}{3}\\) ∉ ℤ", "\\(\\dfrac{2}{3}\\) ∈ ℤ", "\\(\\dfrac{2}{3}\\) ∉ ℝ", "\\(\\dfrac{2}{3}\\) is irrational"], answer: "\\(\\dfrac{2}{3}\\) ∈ ℚ and \\(\\dfrac{2}{3}\\) ∉ ℤ", explanation: "\\(\\dfrac{2}{3}\\) is a fraction of integers, but it is not a whole number." },
      { question: "Which set contains every rational and irrational number?", options: ["ℝ", "ℤ", "ℕ", "ℚ"], answer: "ℝ", explanation: "The real numbers include all rational and irrational numbers." },
    ],
  ),
  ...section(
    "Recurring decimals: one repeating digit",
    "A recurring decimal repeats one or more digits forever. To convert one to a fraction, call it x, multiply to align the repeating parts, and subtract.",
    [
      {
        expression: "\\(0.333\\)… = \\(\\dfrac{1}{3}\\)",
        detail: "One digit repeats, so multiply by \\(10\\).",
        steps: ["Let \\(x = 0.333\\)….", "Multiply both sides by \\(10\\): \\(10x = 3.333\\)….", "Subtract x from \\(10x\\): \\(10x - x = 3.333\\)… − \\(0.333\\)… = \\(3\\).", "So \\(9x = 3\\). Divide by \\(9\\) and simplify: \\(x = \\dfrac{3}{9} = \\dfrac{1}{3}\\)."],
      },
      {
        expression: "\\(0.777\\)… = \\(\\dfrac{7}{9}\\)",
        detail: "The repeating decimal parts cancel when the equations are subtracted.",
        steps: ["Let \\(x = 0.777\\)….", "Multiply by \\(10\\): \\(10x = 7.777\\)….", "Subtract x: \\(9x = 7.777\\)… − \\(0.777\\)… = \\(7\\).", "Divide by \\(9\\): \\(x = \\dfrac{7}{9}\\)."],
      },
    ],
    [
      { question: "Let \\(x = 0.444\\)…. What is \\(10x\\)?", options: ["\\(4.444\\)…", "\\(0.444\\)…", "\\(44.444\\)…", "\\(4\\)"], answer: "\\(4.444\\)…", explanation: "Multiplying by \\(10\\) moves the decimal point one place to the right." },
      { question: "If \\(x = 0.222\\)… and \\(10x = 2.222\\)…, what is \\(10x - x\\)?", options: ["\\(2\\)", "\\(0.2\\)", "\\(2.222\\)…", "\\(9\\)"], answer: "\\(2\\)", explanation: "The repeating decimal parts cancel: \\(2.222\\)… − \\(0.222\\)… = \\(2\\)." },
      { question: "What is \\(0.222\\)… as a fraction?", options: ["\\(\\dfrac{2}{9}\\)", "\\(\\dfrac{2}{10}\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\dfrac{2}{3}\\)"], answer: "\\(\\dfrac{2}{9}\\)", explanation: "Let \\(x = 0.222\\)…. Subtracting x from \\(10x\\) gives \\(9x = 2\\), so \\(x = \\dfrac{2}{9}\\)." },
      { question: "What is \\(0.555\\)… as a fraction?", options: ["\\(\\dfrac{5}{9}\\)", "\\(\\dfrac{5}{10}\\)", "\\(\\dfrac{1}{5}\\)", "\\(\\dfrac{5}{6}\\)"], answer: "\\(\\dfrac{5}{9}\\)", explanation: "Let \\(x = 0.555\\)…. Then \\(10x - x = 5\\), so \\(9x = 5\\) and \\(x = \\dfrac{5}{9}\\)." },
      { question: "Why do we subtract the two equations?", options: ["To cancel the repeating decimal parts", "To make x equal zero", "To remove the denominator", "To round the decimal"], answer: "To cancel the repeating decimal parts", explanation: "After the repeating parts are aligned, subtracting removes them and leaves an equation we can solve." },
    ],
  ),
  ...section(
    "Recurring decimals: repeating blocks",
    "When two digits repeat, multiply by \\(100\\) to move one whole repeating block before the decimal point. If digits come before the repeating part, first align the repeating tails.",
    [
      {
        expression: "\\(0.272727\\)… = \\(\\dfrac{3}{11}\\)",
        detail: "The block \\(27\\) has two digits, so use \\(100x\\).",
        steps: ["Let \\(x = 0.272727\\)….", "Multiply by \\(100\\): \\(100x = 27.272727\\)….", "Subtract x: \\(99x = 27\\).", "Divide and simplify: \\(x = \\dfrac{27}{99} = \\dfrac{3}{11}\\)."],
      },
      {
        expression: "\\(0.1666\\)… = \\(\\dfrac{1}{6}\\)",
        detail: "The \\(1\\) does not repeat; the \\(6\\) does. Align the repeating tails before subtracting.",
        steps: ["Let \\(x = 0.1666\\)….", "Multiply by \\(10\\): \\(10x = 1.666\\)…. Multiply by \\(100\\): \\(100x = 16.666\\)….", "Subtract \\(10x\\) from \\(100x\\): \\(90x = 16.666\\)… − \\(1.666\\)… = \\(15\\).", "Divide and simplify: \\(x = \\dfrac{15}{90} = \\dfrac{1}{6}\\)."],
      },
    ],
    [
      { question: "Let \\(x = 0.454545\\)…. Which multiplication moves one complete repeating block before the decimal point?", options: ["\\(100x\\)", "\\(10x\\)", "\\(2x\\)", "\\(1000x\\)"], answer: "\\(100x\\)", explanation: "The repeating block \\(45\\) has two digits, so multiply by \\(100\\)." },
      { question: "If \\(x = 0.121212\\)…, what is \\(100x - x\\)?", options: ["\\(12\\)", "\\(1.2\\)", "\\(99\\)", "\\(0\\)"], answer: "\\(12\\)", explanation: "\\(100x = 12.121212\\)…, so the repeating parts cancel and leave \\(12\\)." },
      { question: "What is \\(0.121212\\)… as a fraction in simplest form?", options: ["\\(\\dfrac{4}{33}\\)", "\\(\\dfrac{12}{100}\\)", "\\(\\dfrac{1}{12}\\)", "\\(\\dfrac{12}{10}\\)"], answer: "\\(\\dfrac{4}{33}\\)", explanation: "\\(99x = 12\\), so \\(x = \\dfrac{12}{99} = \\dfrac{4}{33}\\)." },
      { question: "Let \\(x = 0.1666\\)…. Which equations have matching repeating tails?", options: ["\\(100x = 16.666\\)… and \\(10x = 1.666\\)…", "\\(10x = 1.666\\)… and \\(x = 0.1666\\)…", "\\(100x = 16.666\\)… and \\(x = 0.1666\\)…", "\\(10x = 1.6\\) and \\(x = 0.16\\)"], answer: "\\(100x = 16.666\\)… and \\(10x = 1.666\\)…", explanation: "Both have .666… after the decimal point, so subtracting them cancels the recurring tail." },
      { question: "If \\(90x = 15\\), what is x in simplest form?", options: ["\\(\\dfrac{1}{6}\\)", "\\(6\\)", "\\(\\dfrac{3}{5}\\)", "\\(\\dfrac{15}{9}\\)"], answer: "\\(\\dfrac{1}{6}\\)", explanation: "Divide by \\(90\\): \\(x = \\dfrac{15}{90}\\). Simplify by dividing top and bottom by \\(15\\)." },
    ],
  ),
];
