import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";

const recursiveIntroduction = section(
  "Starting with a previous term",
  "A recursive rule tells us how to find a term from an earlier term. We also need a starting value so we know where the sequence begins.",
  [
    {
      expression: "\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) + 2, for n ≥ 2",
      detail: "This sequence starts at 2 and adds 2 each time.",
      steps: ["Start with \\(u_{1}\\) = 2.", "Use the previous term: \\(u_{2}\\) = \\(u_{1}\\) + 2 = 2 + 2 = 4.", "Then \\(u_{3}\\) = \\(u_{2}\\) + 2 = 4 + 2 = 6.", "Continue: \\(u_{4}\\) = 6 + 2 = 8."],
    },
    {
      expression: "\\(u_{1}\\) = 5; \\(u_{n}\\) = \\(u_{n-1}\\) + 3, for n ≥ 2",
      detail: "The subscript n − 1 means the term immediately before \\(u_{n}\\).",
      steps: ["Start at 5.", "\\(u_{2}\\) = 5 + 3 = 8.", "\\(u_{3}\\) = 8 + 3 = 11, and \\(u_{4}\\) = 11 + 3 = 14."],
    },
  ],
  [
    { question: "In \\(u_{n}\\) = \\(u_{n-1}\\) + 2, what does \\(u_{n-1}\\) represent?", options: ["The previous term", "The first term", "The next term", "The common ratio"], answer: "The previous term", explanation: "Position n − 1 comes immediately before position n." },
    { question: "If \\(u_{1}\\) = 2 and \\(u_{n}\\) = \\(u_{n-1}\\) + 2, what is \\(u_{2}\\)?", options: ["4", "2", "6", "1"], answer: "4", explanation: "Use \\(u_{1}\\): \\(u_{2}\\) = 2 + 2 = 4." },
    { question: "If \\(u_{1}\\) = 2 and \\(u_{n}\\) = \\(u_{n-1}\\) + 2, what is \\(u_{4}\\)?", options: ["8", "6", "10", "4"], answer: "8", explanation: "The terms are 2, 4, 6, 8." },
    { question: "Why must this recursive rule include a starting term?", options: ["It gives us a value to begin with", "It tells us the last term", "It replaces the rule", "It makes every sequence geometric"], answer: "It gives us a value to begin with", explanation: "Without a starting value, the same rule can generate different sequences." },
    { question: "If \\(u_{1}\\) = 5 and \\(u_{n}\\) = \\(u_{n-1}\\) + 3, what is \\(u_{3}\\)?", options: ["11", "8", "14", "9"], answer: "11", explanation: "First \\(u_{2}\\) = 8, then \\(u_{3}\\) = 8 + 3 = 11." },
  ],
);

recursiveIntroduction[0].blocks.splice(1, 0, {
  type: "sequence-diagram",
  terms: ["2", "4", "6", "8"],
  operation: "+ 2",
});

export const recursiveSequenceSteps: GuidedLessonStep[] = [
  ...recursiveIntroduction,
  ...section(
    "Arithmetic recursive rules",
    "For an arithmetic sequence, add the common difference to the previous term: \\(u_{n}\\) = \\(u_{n-1}\\) + d, for n ≥ 2.",
    [
      { expression: "−2, −9, −16, −23, … → \\(u_{5}\\) = −30", detail: "This sequence subtracts 7 at each step.", steps: ["Find the difference: −9 − (−2) = −7.", "Write \\(u_{1}\\) = −2 and \\(u_{n}\\) = \\(u_{n-1}\\) − 7, for n ≥ 2.", "Use \\(u_{4}\\) = −23: \\(u_{5}\\) = −23 − 7 = −30."] },
      { expression: "10, 7, 4, 1, … → \\(u_{1}\\) = 10; \\(u_{n}\\) = \\(u_{n-1}\\) − 3", detail: "A recursive rule needs both the starting value and the repeated change.", steps: ["The first term is 10.", "Each term is 3 less than the previous one, so d = −3.", "Write \\(u_{1}\\) = 10 and \\(u_{n}\\) = \\(u_{n-1}\\) − 3, for n ≥ 2."] },
    ],
    [
      { question: "What is d for −2, −9, −16, −23, …?", options: ["−7", "7", "−9", "−2"], answer: "−7", explanation: "Each term is 7 less than the one before it." },
      { question: "For \\(u_{1}\\) = −2 and \\(u_{n}\\) = \\(u_{n-1}\\) − 7, what is \\(u_{5}\\)?", options: ["−30", "−23", "−28", "−35"], answer: "−30", explanation: "The first four terms are −2, −9, −16, −23, so \\(u_{5}\\) = −23 − 7." },
      { question: "Which rule generates 2, 4, 6, 8, …?", options: ["\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", "\\(u_{1}\\) = 2; \\(u_{n}\\) = 2uₙ₋₁", "\\(u_{1}\\) = 4; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", "\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) − 2"], answer: "\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", explanation: "Start at 2 and add 2 each time." },
      { question: "If \\(u_{1}\\) = 10 and \\(u_{n}\\) = \\(u_{n-1}\\) − 3, what is \\(u_{3}\\)?", options: ["4", "7", "1", "13"], answer: "4", explanation: "\\(u_{2}\\) = 10 − 3 = 7, then \\(u_{3}\\) = 7 − 3 = 4." },
      { question: "An arithmetic sequence begins 8, 13, 18, …. Which recursive change is correct?", options: ["Add 5", "Multiply by 5", "Add 8", "Subtract 5"], answer: "Add 5", explanation: "The common difference is 13 − 8 = 5." },
    ],
  ),
  ...section(
    "Geometric recursive rules",
    "For a geometric sequence, multiply the previous term by the common ratio: \\(u_{n}\\) = ruₙ₋₁, for n ≥ 2.",
    [
      { expression: "4, 12, 36, 108, … → \\(u_{5}\\) = 324", detail: "Every term is 3 times the previous term.", steps: ["Find r: 12 ÷ 4 = 3.", "Write \\(u_{1}\\) = 4 and \\(u_{n}\\) = 3uₙ₋₁, for n ≥ 2.", "Use \\(u_{4}\\) = 108: \\(u_{5}\\) = 3 × 108 = 324."] },
      { expression: "3, 6, 12, 24, … → \\(u_{1}\\) = 3; \\(u_{n}\\) = 2uₙ₋₁", detail: "This sequence starts at 3 and doubles.", steps: ["The first term is 3.", "6 ÷ 3 = 2, and 12 ÷ 6 = 2, so r = 2.", "Write \\(u_{1}\\) = 3 and \\(u_{n}\\) = 2uₙ₋₁, for n ≥ 2."] },
    ],
    [
      { question: "For 4, 12, 36, 108, … what is the common ratio?", options: ["3", "4", "8", "12"], answer: "3", explanation: "12 ÷ 4 = 3 and 36 ÷ 12 = 3." },
      { question: "If \\(u_{1}\\) = 4 and \\(u_{n}\\) = 3uₙ₋₁, what is \\(u_{3}\\)?", options: ["36", "12", "27", "108"], answer: "36", explanation: "\\(u_{2}\\) = 12 and \\(u_{3}\\) = 3 × 12 = 36." },
      { question: "Which recursive rule generates 3, 6, 12, 24, …?", options: ["\\(u_{1}\\) = 3; \\(u_{n}\\) = 2uₙ₋₁", "\\(u_{1}\\) = 3; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", "\\(u_{1}\\) = 6; \\(u_{n}\\) = 2uₙ₋₁", "\\(u_{1}\\) = 3; \\(u_{n}\\) = 3uₙ₋₁"], answer: "\\(u_{1}\\) = 3; \\(u_{n}\\) = 2uₙ₋₁", explanation: "Start at 3 and multiply by 2 each time." },
      { question: "If \\(u_{1}\\) = 8 and \\(u_{n}\\) = \\(\\dfrac{1}{2}\\)\\(u_{n-1}\\), what is \\(u_{3}\\)?", options: ["2", "4", "1", "16"], answer: "2", explanation: "\\(u_{2}\\) = 4 and \\(u_{3}\\) = 2." },
      { question: "If \\(u_{1}\\) = 2 and \\(u_{n}\\) = −2uₙ₋₁, what is \\(u_{3}\\)?", options: ["8", "−8", "4", "−4"], answer: "8", explanation: "\\(u_{2}\\) = −4 and \\(u_{3}\\) = −2 × (−4) = 8." },
    ],
  ),
  ...section(
    "Recursive and explicit rules",
    "A recursive rule uses an earlier term. An explicit rule gives a term directly from its position n. Both can describe the same sequence.",
    [
      { expression: "2, 4, 6, 8, …", detail: "Compare two ways to describe this arithmetic sequence.", steps: ["Recursive: start with \\(u_{1}\\) = 2, then use \\(u_{n}\\) = \\(u_{n-1}\\) + 2.", "Explicit: \\(u_{n}\\) = 2n.", "At n = 4 the explicit rule gives \\(u_{4}\\) = 2(4) = 8, matching the recursive sequence."] },
      { expression: "3, 6, 12, 24, …", detail: "Both rules generate the same geometric sequence.", steps: ["Recursive: \\(u_{1}\\) = 3 and \\(u_{n}\\) = 2uₙ₋₁.", "Explicit: \\(u_{n}\\) = 3 × \\(2^{n-1}\\).", "At n = 3 the explicit rule gives 3 × \\(2^{2}\\) = 12."] },
    ],
    [
      { question: "Which is a recursive rule?", options: ["\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", "\\(u_{n}\\) = 2n", "\\(u_{n}\\) = \\(n^{2}\\)", "\\(u_{n}\\) = 3n + 1"], answer: "\\(u_{1}\\) = 2; \\(u_{n}\\) = \\(u_{n-1}\\) + 2", explanation: "It uses \\(u_{n-1}\\), the previous term." },
      { question: "Which explicit rule matches 2, 4, 6, 8, …?", options: ["\\(u_{n}\\) = 2n", "\\(u_{n}\\) = n + 2", "\\(u_{n}\\) = \\(2^{n}\\)", "\\(u_{n}\\) = 2n + 2"], answer: "\\(u_{n}\\) = 2n", explanation: "At positions 1, 2, 3 and 4, 2n gives 2, 4, 6 and 8." },
      { question: "What does an explicit rule let you use to find \\(u_{10}\\) directly?", options: ["The position n = 10", "Only \\(u_{9}\\)", "Only the previous term", "The sum of all terms"], answer: "The position n = 10", explanation: "An explicit rule gives the term directly from its position." },
      { question: "If \\(u_{1}\\) = 3 and \\(u_{n}\\) = 2uₙ₋₁, which explicit rule matches?", options: ["3 × \\(2^{n-1}\\)", "3 + 2(n − 1)", "3 × \\(2^{n}\\)", "2n + 1"], answer: "3 × \\(2^{n-1}\\)", explanation: "The initial value is 3 and there are n − 1 doublings." },
      { question: "If \\(u_{1}\\) = 7 and \\(u_{n}\\) = \\(u_{n-1}\\) + 4, what is \\(u_{3}\\)?", options: ["15", "11", "19", "12"], answer: "15", explanation: "Start at 7 and add 4 twice: 7, 11, 15." },
    ],
  ),
  ...finalCheck([
    { question: "\\(u_{1}\\) = 20 and \\(u_{n}\\) = \\(u_{n-1}\\) − 6. What is \\(u_{4}\\)?", options: ["2", "−4", "8", "14"], answer: "2", explanation: "The terms are 20, 14, 8 and 2." },
    { question: "Which recursive rule generates 5, −10, 20, −40, …?", options: ["\\(u_{1}\\) = 5; \\(u_{n}\\) = −2uₙ₋₁", "\\(u_{1}\\) = 5; \\(u_{n}\\) = \\(u_{n-1}\\) − 15", "\\(u_{1}\\) = −10; \\(u_{n}\\) = −2uₙ₋₁", "\\(u_{1}\\) = 5; \\(u_{n}\\) = 2uₙ₋₁"], answer: "\\(u_{1}\\) = 5; \\(u_{n}\\) = −2uₙ₋₁", explanation: "The first term is 5 and each following term is multiplied by −2." },
    { question: "A rule is \\(u_{n}\\) = \\(u_{n-1}\\) + 5, but the starting term is missing. Can you determine \\(u_{2}\\) uniquely?", options: ["No", "Yes, it is 5", "Yes, it is 10", "Yes, it is 2"], answer: "No", explanation: "Different starting terms give different values of \\(u_{2}\\), even with the same recursive rule." },
  ]),
];

recursiveSequenceSteps.find((step) => step.title === "Geometric recursive rules")?.blocks.splice(1, 0, {
  type: "sequence-diagram",
  terms: ["4", "12", "36", "108"],
  operation: "× 3",
});

const sigmaIntroduction = section(
  "Reading sigma notation",
  "The capital Greek letter Σ means ‘add’. The lower limit gives the starting index, the upper limit gives the ending index, and the expression on the right gives each term.",
  [
    { expression: "\\(\\displaystyle \\sum_{n=1}^{3} n\\) = 1 + 2 + 3 = 6", detail: "Read the lower limit, upper limit, and term before expanding.", steps: ["Start at n = 1 and finish at n = 3.", "Substitute n = 1, 2 and 3 into the expression n.", "Add the resulting terms: 1 + 2 + 3 = 6."] },
    { expression: "\\(\\displaystyle \\sum_{n=1}^{3} 2n\\) = 2 + 4 + 6 = 12", detail: "Substitute each index into the whole expression 2n.", steps: ["At n = 1, 2n = 2(1) = 2.", "At n = 2 and 3, the terms are 4 and 6.", "Add the terms: 2 + 4 + 6 = 12."] },
  ],
  [
    { question: "What does Σ mean in summation notation?", options: ["Add the terms", "Multiply the terms", "Find a difference", "Find a ratio"], answer: "Add the terms", explanation: "Σ tells us to add the terms specified by the expression and limits." },
    { question: "In \\(\\displaystyle \\sum_{n=1}^{4} n\\), what is the first index?", options: ["1", "4", "0", "n + 1"], answer: "1", explanation: "The lower limit says to start at n = 1." },
    { question: "In \\(\\displaystyle \\sum_{n=1}^{4} n\\), what is the last index?", options: ["4", "1", "3", "5"], answer: "4", explanation: "The upper limit says to finish at n = 4, including 4." },
    { question: "What is \\(\\displaystyle \\sum_{n=1}^{3} n\\)?", options: ["6", "3", "9", "5"], answer: "6", explanation: "Substitute 1, 2 and 3, then add: 1 + 2 + 3 = 6." },
    { question: "In \\(\\displaystyle \\sum_{n=1}^{3} 2n\\), what is the term when n = 2?", options: ["4", "2", "3", "6"], answer: "4", explanation: "Substitute n = 2 into 2n: 2(2) = 4." },
  ],
);

sigmaIntroduction[0].blocks.splice(1, 0, {
  type: "sigma-diagram",
  lower: "n = 1",
  upper: "3",
  expression: "2n",
});

export const sigmaNotationSteps: GuidedLessonStep[] = [
  ...sigmaIntroduction,
  ...section(
    "Expanding and calculating sums",
    "Substitute every integer index from the lower limit through the upper limit, inclusive. Write the terms first, then add them.",
    [
      { expression: "\\(\\displaystyle \\sum_{n=1}^{5} 3n\\) = 3 + 6 + 9 + 12 + 15 = 45", detail: "You can also group the calculation as 3(1 + 2 + 3 + 4 + 5).", steps: ["Use indices 1, 2, 3, 4 and 5.", "Substitute into 3n: 3, 6, 9, 12, 15.", "Add the terms to get 45; equivalently calculate 3(1 + 2 + 3 + 4 + 5) = 45."] },
      { expression: "\\(\\displaystyle \\sum_{n=1}^{4} (2n + 1)\\) = 3 + 5 + 7 + 9 = 24", detail: "Use parentheses so the full expression is substituted.", steps: ["For n = 1, 2n + 1 = 2(1) + 1 = 3.", "For n = 2, 3 and 4, the terms are 5, 7 and 9.", "Add 3 + 5 + 7 + 9 = 24."] },
    ],
    [
      { question: "Expand \\(\\displaystyle \\sum_{n=1}^{3} 3n\\).", options: ["3 + 6 + 9", "1 + 2 + 3", "3 + 3 + 3", "3 + 6"], answer: "3 + 6 + 9", explanation: "Substitute n = 1, 2 and 3 into 3n." },
      { question: "What is \\(\\displaystyle \\sum_{n=1}^{3} 3n\\)?", options: ["18", "9", "12", "27"], answer: "18", explanation: "3 + 6 + 9 = 18." },
      { question: "What is \\(\\displaystyle \\sum_{n=1}^{2} (n + 2)\\)?", options: ["7", "5", "6", "8"], answer: "7", explanation: "The terms are 1 + 2 = 3 and 2 + 2 = 4; their sum is 7." },
      { question: "How many terms are in \\(\\displaystyle \\sum_{n=1}^{5} 3n\\)?", options: ["5", "4", "3", "6"], answer: "5", explanation: "The indices are 1, 2, 3, 4 and 5, so there are five terms." },
      { question: "What is \\(\\displaystyle \\sum_{n=1}^{4} 1\\)?", options: ["4", "1", "10", "0"], answer: "4", explanation: "The term is 1 at each of four indices, giving 1 + 1 + 1 + 1 = 4." },
    ],
  ),
  ...section(
    "Starting at a different index",
    "The lower limit does not have to be 1. Start at the stated index and include every integer up to the upper limit.",
    [
      { expression: "\\(\\displaystyle \\sum_{n=2}^{4} n^{2}\\) = 4 + 9 + 16 = 29", detail: "The indices are 2, 3 and 4.", steps: ["At n = 2, \\(n^{2}\\) = 4.", "At n = 3 and 4, the terms are 9 and 16.", "Add 4 + 9 + 16 = 29."] },
      { expression: "\\(\\displaystyle \\sum_{k=0}^{3} (k + 1)\\) = 1 + 2 + 3 + 4 = 10", detail: "The index can use a letter other than n and can start at 0.", steps: ["The values of k are 0, 1, 2 and 3.", "Substitute into k + 1 to get 1, 2, 3 and 4.", "Add the terms: 1 + 2 + 3 + 4 = 10."] },
    ],
    [
      { question: "Which indices are used in \\(\\displaystyle \\sum_{n=2}^{4} n\\)?", options: ["2, 3, 4", "1, 2, 3, 4", "2, 3", "1, 2, 3"], answer: "2, 3, 4", explanation: "Start at 2 and include the upper limit 4." },
      { question: "What is \\(\\displaystyle \\sum_{n=2}^{4} n\\)?", options: ["9", "10", "6", "7"], answer: "9", explanation: "The sum is 2 + 3 + 4 = 9." },
      { question: "What is \\(\\displaystyle \\sum_{k=0}^{2} (k + 1)\\)?", options: ["6", "3", "5", "9"], answer: "6", explanation: "Substitute 0, 1 and 2: 1 + 2 + 3 = 6." },
      { question: "How many terms are in \\(\\displaystyle \\sum_{n=3}^{6} n\\)?", options: ["4", "3", "6", "7"], answer: "4", explanation: "The indices are 3, 4, 5 and 6." },
      { question: "What is the first term of \\(\\displaystyle \\sum_{n=2}^{4} n^{2}\\)?", options: ["4", "2", "1", "16"], answer: "4", explanation: "Start at n = 2: \\(n^{2}\\) = \\(2^{2}\\) = 4." },
    ],
  ),
  ...section(
    "Writing a sum in sigma notation",
    "To write a sum using Σ, find a rule for each term and choose limits that reproduce the first and last terms. Check by expanding it.",
    [
      { expression: "3 + 6 + 9 + 12 + 15 = \\(\\displaystyle \\sum_{n=1}^{5} 3n\\)", detail: "Each term is a multiple of 3.", steps: ["The terms are 3 times 1, 2, 3, 4 and 5.", "Use 3n for the term and let n run from 1 to 5.", "Check: n = 1 gives 3, and n = 5 gives 15."],
      },
      { expression: "10 + 17 + 26 + 37 = \\(\\displaystyle \\sum_{n=3}^{6} (n^{2} + 1)\\)", detail: "The expression \\(n^{2}\\) + 1 describes these four terms.", steps: ["Recognize 10 = \\(3^{2}\\) + 1 and 17 = \\(4^{2}\\) + 1.", "Also 26 = \\(5^{2}\\) + 1 and 37 = \\(6^{2}\\) + 1.", "Use \\(n^{2}\\) + 1 for n from 3 to 6. The sum is 90."],
      },
    ],
    [
      { question: "Which sigma expression represents 2 + 4 + 6?", options: ["\\(\\displaystyle \\sum_{n=1}^{3} 2n\\)", "\\(\\displaystyle \\sum_{n=1}^{3} n\\)", "\\(\\displaystyle \\sum_{n=1}^{2} 2n\\)", "\\(\\displaystyle \\sum_{n=1}^{3} (n + 2)\\)"], answer: "\\(\\displaystyle \\sum_{n=1}^{3} 2n\\)", explanation: "Substituting 1, 2 and 3 into 2n gives 2, 4 and 6." },
      { question: "Which sigma expression represents 1 + 4 + 9?", options: ["\\(\\displaystyle \\sum_{n=1}^{3} n^{2}\\)", "\\(\\displaystyle \\sum_{n=1}^{3} 2n\\)", "\\(\\displaystyle \\sum_{n=1}^{3} n\\)", "\\(\\displaystyle \\sum_{n=2}^{3} n^{2}\\)"], answer: "\\(\\displaystyle \\sum_{n=1}^{3} n^{2}\\)", explanation: "\\(1^{2}\\) = 1, \\(2^{2}\\) = 4 and \\(3^{2}\\) = 9." },
      { question: "What is the first term of \\(\\displaystyle \\sum_{n=3}^{6} (n^{2} + 1)\\)?", options: ["10", "3", "9", "37"], answer: "10", explanation: "The first index is 3, so \\(3^{2}\\) + 1 = 10." },
      { question: "What is the last term of \\(\\displaystyle \\sum_{n=3}^{6} (n^{2} + 1)\\)?", options: ["37", "26", "36", "49"], answer: "37", explanation: "The final index is 6, so \\(6^{2}\\) + 1 = 37." },
      { question: "What is 10 + 17 + 26 + 37?", options: ["90", "80", "86", "100"], answer: "90", explanation: "10 + 17 = 27 and 26 + 37 = 63; 27 + 63 = 90." },
    ],
  ),
  ...finalCheck([
    { question: "What is \\(\\displaystyle \\sum_{n=2}^{4} (2n - 1)\\)?", options: ["15", "12", "9", "16"], answer: "15", explanation: "The terms are 3, 5 and 7; 3 + 5 + 7 = 15." },
    { question: "Which sigma expression represents 10 + 17 + 26 + 37?", options: ["\\(\\displaystyle \\sum_{n=3}^{6} (n^{2} + 1)\\)", "\\(\\displaystyle \\sum_{n=1}^{4} (n^{2} + 1)\\)", "\\(\\displaystyle \\sum_{n=3}^{6} (n^{2} - 1)\\)", "\\(\\displaystyle \\sum_{n=3}^{5} (n^{2} + 1)\\)"], answer: "\\(\\displaystyle \\sum_{n=3}^{6} (n^{2} + 1)\\)", explanation: "At n = 3, 4, 5 and 6, \\(n^{2}\\) + 1 gives 10, 17, 26 and 37." },
    { question: "How many terms are added in \\(\\displaystyle \\sum_{k=4}^{9} k\\)?", options: ["6", "5", "9", "4"], answer: "6", explanation: "The indices 4, 5, 6, 7, 8 and 9 give six terms." },
  ]),
];
