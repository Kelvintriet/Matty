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

function finalCheck(questions: Question[]): GuidedLessonStep[] {
  return questions.map((question, index) => ({
    title: `Final check: question ${index + 1} of ${questions.length}`,
    part: "Final check",
    blocks: [{ type: "quiz", ...question }],
  }));
}

export const nthTermSteps: GuidedLessonStep[] = [
  ...section(
    "Terms and positions",
    "A sequence is an ordered list. Each number is a term; n is its position. The notation uₙ means the term at position n.",
    [
      {
        expression: "5, 8, 11, 14, …",
        detail: "The first position is n = 1, not n = 0.",
        steps: ["At n = 1, the first term is 5, so u₁ = 5.", "At n = 2, the second term is 8, so u₂ = 8.", "At n = 4, the fourth term is 14, so u₄ = 14."],
      },
      {
        expression: "3, 6, 9, 12, …",
        detail: "The dots show that the list continues.",
        steps: ["The terms increase by 3 each time.", "The third term is 9: u₃ = 9.", "The next term after 12 is 15, so u₅ = 15."],
      },
    ],
    [
      { question: "In 4, 7, 10, 13, … what is u₃?", options: ["10", "7", "13", "3"], answer: "10", explanation: "u₃ is the third term, which is 10." },
      { question: "In 2, 5, 8, 11, … which position has the term 11?", options: ["n = 4", "n = 3", "n = 11", "n = 5"], answer: "n = 4", explanation: "Counting from the first term, 11 is in position 4." },
      { question: "What does u₁ mean?", options: ["The first term", "The number added each time", "Every term", "The position of the last term"], answer: "The first term", explanation: "The subscript 1 identifies the first position." },
      { question: "What is the next term in 10, 8, 6, 4, …?", options: ["2", "0", "6", "−2"], answer: "2", explanation: "The terms decrease by 2, so 4 − 2 = 2." },
      { question: "What does the ellipsis (…) at the end of a sequence mean?", options: ["The sequence continues", "The terms add to zero", "The sequence has exactly three terms", "The next term must be zero"], answer: "The sequence continues", explanation: "The dots indicate that more terms follow." },
    ],
  ),
  ...section(
    "Using an nth-term rule",
    "An nth-term rule gives the term at a chosen position. Substitute the position for n and calculate using the order of operations.",
    [
      {
        expression: "uₙ = 2n + 3: find u₄",
        detail: "Replace n with 4.",
        steps: ["Write u₄ = 2(4) + 3.", "Multiply first: 2 × 4 = 8.", "Add 3: u₄ = 11."],
      },
      {
        expression: "uₙ = n² − 1: find u₃",
        detail: "Square the position before subtracting.",
        steps: ["Replace n with 3: u₃ = 3² − 1.", "Calculate 3² = 9.", "Subtract 1: u₃ = 8."],
      },
    ],
    [
      { question: "If uₙ = 3n, what is u₄?", options: ["12", "7", "9", "3"], answer: "12", explanation: "Substitute n = 4: u₄ = 3 × 4 = 12." },
      { question: "If uₙ = 2n + 1, what is u₁?", options: ["3", "1", "2", "4"], answer: "3", explanation: "At n = 1, 2(1) + 1 = 3." },
      { question: "If uₙ = n², what is u₅?", options: ["25", "10", "5", "15"], answer: "25", explanation: "Substitute n = 5: 5² = 25." },
      { question: "If uₙ = 10 − n, what is u₃?", options: ["7", "13", "3", "30"], answer: "7", explanation: "Substitute 3 for n: 10 − 3 = 7." },
      { question: "Which first three terms come from uₙ = n + 4?", options: ["5, 6, 7", "4, 5, 6", "4, 8, 12", "1, 2, 3"], answer: "5, 6, 7", explanation: "For n = 1, 2 and 3, add 4 to get 5, 6 and 7." },
    ],
  ),
  ...section(
    "Finding a linear rule",
    "For a sequence with a constant difference, use that difference as the coefficient of n. Then adjust the rule so it matches the first term.",
    [
      {
        expression: "5, 8, 11, 14, … → uₙ = 3n + 2",
        detail: "Compare the sequence with the multiples of 3.",
        steps: ["The difference is 3, so start with 3n: 3, 6, 9, 12, ….", "Compare with 5, 8, 11, 14: each term is 2 more.", "Add 2 to the rule: uₙ = 3n + 2.", "Check n = 1: 3(1) + 2 = 5."],
      },
      {
        expression: "4, 7, 10, 13, … → uₙ = 3n + 1",
        detail: "The first term does not have to be the common difference.",
        steps: ["The difference is 3, so start with 3n: 3, 6, 9, 12, ….", "Each original term is 1 more than the matching multiple.", "The rule is 3n + 1. Check n = 3: 3(3) + 1 = 10."],
      },
    ],
    [
      { question: "What is the common difference of 7, 11, 15, 19, …?", options: ["4", "3", "7", "11"], answer: "4", explanation: "Each term is 4 more than the previous one." },
      { question: "Which rule generates 4, 8, 12, 16, …?", options: ["4n", "n + 4", "4n + 4", "n²"], answer: "4n", explanation: "Multiplying positions 1, 2, 3 and 4 by 4 gives the terms." },
      { question: "Which rule generates 5, 8, 11, 14, …?", options: ["3n + 2", "3n + 5", "5n + 3", "n + 3"], answer: "3n + 2", explanation: "The common difference is 3; 3n gives 3, 6, 9, so add 2." },
      { question: "A sequence increases by 5 each term. What is the coefficient of n in its linear rule?", options: ["5", "1", "The first term", "0"], answer: "5", explanation: "The coefficient of n is the common difference, 5." },
      { question: "Which rule generates 2, 6, 10, 14, …?", options: ["4n − 2", "4n + 2", "2n + 2", "4n"], answer: "4n − 2", explanation: "The difference is 4. The sequence is 2 less than 4n at every position." },
    ],
  ),
  ...section(
    "Decreasing and multiplying patterns",
    "A constant decrease gives a negative coefficient of n. Some sequences multiply instead of adding, so check the relationship between terms before choosing a rule.",
    [
      {
        expression: "12, 9, 6, 3, … → uₙ = 15 − 3n",
        detail: "The difference is −3.",
        steps: ["The sequence decreases by 3, so begin with −3n: −3, −6, −9, ….", "Add 15 to each of these terms to obtain 12, 9, 6, ….", "The rule is 15 − 3n. Check n = 2: 15 − 6 = 9."],
      },
      {
        expression: "2, 4, 8, 16, … → uₙ = 2ⁿ",
        detail: "Here each term is multiplied by 2, rather than increased by a fixed amount.",
        steps: ["Compare consecutive terms: 4 ÷ 2 = 2 and 8 ÷ 4 = 2.", "Try powers of 2: 2¹ = 2, 2² = 4, 2³ = 8.", "The matching rule is uₙ = 2ⁿ, with n starting at 1."],
      },
    ],
    [
      { question: "What is the common difference of 12, 9, 6, 3, …?", options: ["−3", "3", "−6", "12"], answer: "−3", explanation: "Each term is found by subtracting 3." },
      { question: "Which rule generates 8, 6, 4, 2, …?", options: ["10 − 2n", "8 − 2n", "2n + 6", "10 + 2n"], answer: "10 − 2n", explanation: "The difference is −2; at n = 1, 10 − 2 = 8." },
      { question: "What happens between consecutive terms in 3, 6, 12, 24, …?", options: ["Multiply by 2", "Add 3", "Add 6", "Multiply by 3"], answer: "Multiply by 2", explanation: "Each term is twice the previous term." },
      { question: "Which rule generates 2, 4, 8, 16, … when n starts at 1?", options: ["2ⁿ", "2n", "n + 2", "2n + 2"], answer: "2ⁿ", explanation: "2¹ = 2, 2² = 4, 2³ = 8 and 2⁴ = 16." },
      { question: "Which sequence has a constant difference?", options: ["9, 6, 3, 0", "2, 4, 8, 16", "1, 4, 9, 16", "3, 6, 12, 24"], answer: "9, 6, 3, 0", explanation: "Each term decreases by 3; the differences in the other choices change." },
    ],
  ),
  ...finalCheck([
    { question: "Which rule produces 13, 9, 5, 1, …?", options: ["17 − 4n", "13 − 4n", "4n + 9", "17 + 4n"], answer: "17 − 4n", explanation: "The difference is −4, and 17 − 4(1) = 13. Check n = 2 to get 9." },
    { question: "If uₙ = 3n − 2, which position has value 19?", options: ["n = 7", "n = 6", "n = 5", "n = 8"], answer: "n = 7", explanation: "Solve 3n − 2 = 19: 3n = 21, so n = 7." },
    { question: "Which rule generates 3, 6, 12, 24, … when n starts at 1?", options: ["3 × 2⁽ⁿ⁻¹⁾", "3 × 2ⁿ", "3n", "2n + 1"], answer: "3 × 2⁽ⁿ⁻¹⁾", explanation: "At n = 1 the rule gives 3 × 2⁰ = 3, and every next term doubles." },
  ]),
];

export const quadraticSequenceSteps: GuidedLessonStep[] = [
  ...section(
    "Spotting a quadratic sequence",
    "In a quadratic sequence the first differences change, but the second differences are constant. Find each difference by subtracting a term from the next term.",
    [
      {
        expression: "1, 4, 9, 16, 25, …",
        detail: "Compare consecutive first differences to find the second differences.",
        steps: ["First differences: 4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7, and 25 − 16 = 9.", "Second differences: 5 − 3 = 2, 7 − 5 = 2, and 9 − 7 = 2.", "The second difference is constant at 2, so this fits a quadratic pattern."],
      },
      {
        expression: "2, 6, 12, 20, 30, …",
        detail: "The first differences do not need to be odd.",
        steps: ["First differences: 4, 6, 8, 10.", "Second differences: 2, 2, 2.", "The constant second difference is 2, so this fits a quadratic pattern."],
      },
    ],
    [
      { question: "What are the first differences of 2, 5, 10, 17?", options: ["3, 5, 7", "2, 2, 2", "3, 4, 5", "5, 10, 17"], answer: "3, 5, 7", explanation: "Subtract consecutive terms: 5 − 2 = 3, 10 − 5 = 5, and 17 − 10 = 7." },
      { question: "What are the second differences if the first differences are 3, 5, 7, 9?", options: ["2, 2, 2", "3, 5, 7", "1, 2, 3", "4, 6, 8"], answer: "2, 2, 2", explanation: "5 − 3 = 2, 7 − 5 = 2, and 9 − 7 = 2." },
      { question: "What is constant in a quadratic sequence?", options: ["The second difference", "The first difference", "Every term", "The ratio between terms"], answer: "The second difference", explanation: "A quadratic sequence has a constant non-zero second difference." },
      { question: "What is the second difference of 3, 7, 13, 21, 31?", options: ["2", "4", "6", "8"], answer: "2", explanation: "The first differences are 4, 6, 8, 10; their differences are 2, 2, 2." },
      { question: "Which sequence has a constant non-zero second difference?", options: ["1, 4, 9, 16, 25", "2, 4, 6, 8, 10", "1, 2, 4, 8, 16", "3, 3, 3, 3, 3"], answer: "1, 4, 9, 16, 25", explanation: "Its first differences are 3, 5, 7, 9 and its second differences are all 2." },
    ],
  ),
  ...section(
    "The square-number pattern",
    "The basic quadratic sequence n² is 1, 4, 9, 16, … when n starts at 1. A sequence can follow n² with a fixed amount added or subtracted.",
    [
      {
        expression: "2, 5, 10, 17, … → uₙ = n² + 1",
        detail: "Compare each term with the square at the same position.",
        steps: ["Write n² for n = 1, 2, 3, 4: 1, 4, 9, 16.", "Compare with 2, 5, 10, 17: every term is 1 more.", "The rule is n² + 1. Check n = 3: 3² + 1 = 10."],
      },
      {
        expression: "0, 3, 8, 15, … → uₙ = n² − 1",
        detail: "Each term is 1 less than its matching square.",
        steps: ["Write n²: 1, 4, 9, 16.", "Subtract 1 from each square to get 0, 3, 8, 15.", "The nth-term rule is n² − 1."],
      },
    ],
    [
      { question: "What are the first four terms of uₙ = n²?", options: ["1, 4, 9, 16", "1, 2, 3, 4", "2, 4, 6, 8", "0, 1, 4, 9"], answer: "1, 4, 9, 16", explanation: "Square positions 1, 2, 3 and 4." },
      { question: "What is u₄ if uₙ = n² + 2?", options: ["18", "10", "16", "20"], answer: "18", explanation: "Substitute n = 4: 4² + 2 = 18." },
      { question: "Which rule generates 3, 6, 11, 18, …?", options: ["n² + 2", "n² + 3", "2n + 1", "2n² + 1"], answer: "n² + 2", explanation: "The square numbers 1, 4, 9, 16 each need 2 added." },
      { question: "Which rule generates 0, 3, 8, 15, …?", options: ["n² − 1", "n² + 1", "2n − 2", "(n − 1)²"], answer: "n² − 1", explanation: "Each term is one less than 1, 4, 9 and 16." },
      { question: "If uₙ = n² − 3, what is u₃?", options: ["6", "0", "12", "3"], answer: "6", explanation: "Substitute 3: 3² − 3 = 9 − 3 = 6." },
    ],
  ),
  ...section(
    "Finding the coefficient of n²",
    "For a quadratic rule uₙ = an² + bn + c, the constant second difference is 2a. Divide that difference by 2 to find a.",
    [
      {
        expression: "5, 11, 21, 35, 53, … → a = 2",
        detail: "Find differences before dividing by 2.",
        steps: ["First differences: 6, 10, 14, 18.", "Second differences: 4, 4, 4.", "2a = 4, so a = 4 ÷ 2 = 2.", "The rule begins with 2n²; there may be more terms to find."],
      },
      {
        expression: "3, 12, 27, 48, 75, … → uₙ = 3n²",
        detail: "Here the n² term accounts for the whole sequence.",
        steps: ["First differences are 9, 15, 21, 27; second differences are 6, 6, 6.", "a = 6 ÷ 2 = 3, so compare with 3n².", "At n = 1, 2, 3, 4, 5, 3n² gives 3, 12, 27, 48, 75.", "The terms match, so uₙ = 3n²."],
      },
    ],
    [
      { question: "If the second difference is 6, what is a in an² + bn + c?", options: ["3", "6", "12", "2"], answer: "3", explanation: "The second difference is 2a, so a = 6 ÷ 2 = 3." },
      { question: "If the second difference is 4, which quadratic term starts the rule?", options: ["2n²", "4n²", "n²", "2n"], answer: "2n²", explanation: "Divide 4 by 2 to get a = 2, giving the term 2n²." },
      { question: "What is the second difference of 2n²?", options: ["4", "2", "8", "1"], answer: "4", explanation: "For an² the second difference is 2a; here a = 2." },
      { question: "What is 2n² when n = 3?", options: ["18", "36", "12", "6"], answer: "18", explanation: "Square 3 first, then multiply: 2 × 9 = 18." },
      { question: "A quadratic sequence has second difference −4. What is a?", options: ["−2", "2", "−4", "−8"], answer: "−2", explanation: "a is half the second difference: −4 ÷ 2 = −2." },
    ],
  ),
  ...section(
    "Finding the complete rule",
    "After finding a, subtract the values of an² from the original sequence. Find the linear rule for what remains, then combine the two parts.",
    [
      {
        expression: "4, 13, 26, 43, 64, … → uₙ = 2n² + 3n − 1",
        detail: "The second difference is 4, so start with 2n².",
        steps: ["First differences are 9, 13, 17, 21; second differences are 4, 4, 4. So a = 4 ÷ 2 = 2.", "For n = 1, 2, 3, 4, 2n² gives 2, 8, 18, 32.", "Subtract these from the original terms: 4 − 2 = 2, 13 − 8 = 5, 26 − 18 = 8, 43 − 32 = 11.", "The remainder 2, 5, 8, 11 follows 3n − 1.", "Combine the parts: uₙ = 2n² + 3n − 1. Check n = 2: 8 + 6 − 1 = 13."],
      },
      {
        expression: "2, 9, 20, 35, 54, … → uₙ = 2n² + n − 1",
        detail: "The remainder can begin at zero.",
        steps: ["First differences are 7, 11, 15, 19; the second difference is 4, so a = 2.", "2n² gives 2, 8, 18, 32, 50.", "Subtract: the remainders are 0, 1, 2, 3, 4, which follow n − 1.", "Combine the rules: uₙ = 2n² + n − 1. At n = 3 this gives 18 + 3 − 1 = 20."],
      },
    ],
    [
      { question: "A sequence has second difference 4. Which values of 2n² correspond to n = 1, 2, 3?", options: ["2, 8, 18", "2, 4, 6", "4, 8, 12", "1, 4, 9"], answer: "2, 8, 18", explanation: "Calculate 2 × 1² = 2, 2 × 2² = 8, and 2 × 3² = 18." },
      { question: "Subtract 2, 8, 18 from 4, 13, 26 term by term. What remains?", options: ["2, 5, 8", "2, 13, 18", "6, 21, 44", "2, 4, 8"], answer: "2, 5, 8", explanation: "4 − 2 = 2, 13 − 8 = 5, and 26 − 18 = 8." },
      { question: "Which linear rule produces the remainders 2, 5, 8, 11, …?", options: ["3n − 1", "3n + 1", "2n", "n + 1"], answer: "3n − 1", explanation: "The differences are 3; 3n gives 3, 6, 9, 12, so subtract 1." },
      { question: "The quadratic part is 2n² and the remainder is n − 1. What is the full rule?", options: ["2n² + n − 1", "2n² − n + 1", "2n² + n + 1", "2n² − 1"], answer: "2n² + n − 1", explanation: "Add the quadratic part and the remainder: 2n² + (n − 1)." },
      { question: "Does uₙ = 2n² + n − 1 give 9 when n = 2?", options: ["Yes", "No, it gives 5", "No, it gives 10", "No, it gives 12"], answer: "Yes", explanation: "2(2²) + 2 − 1 = 8 + 2 − 1 = 9." },
    ],
  ),
  ...finalCheck([
    { question: "What is the nth term of 5, 11, 21, 35, 53, …?", options: ["2n² + 3", "2n² + 1", "n² + 4", "2n² + 3n"], answer: "2n² + 3", explanation: "The second difference is 4, so start with 2n². Subtract 2, 8, 18, 32, 50 to leave 3 each time." },
    { question: "What is the nth term of 4, 1, 0, 1, 4, …?", options: ["n² − 6n + 9", "n² − 4n + 4", "n² + 3", "2n² − 3"], answer: "n² − 6n + 9", explanation: "The second difference is 2. Subtract n² to get 3, −3, −9, −15, −21, whose rule is −6n + 9." },
    { question: "A quadratic sequence has second difference 6. After subtracting 3n², the remainder is 1, 3, 5, 7, …. What is the full rule?", options: ["3n² + 2n − 1", "3n² + 2n + 1", "6n² + 2n − 1", "3n² + n"], answer: "3n² + 2n − 1", explanation: "The remainder follows 2n − 1. Add it to 3n² to obtain 3n² + 2n − 1." },
  ]),
];
