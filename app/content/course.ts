import { scientificNotationSteps } from "./scientific-notation";
import { significantFiguresSteps } from "./significant-figures";
import { absoluteErrorSteps } from "./absolute-error";
import { numberSetsSteps } from "./number-sets";
import { unitZeroRevisionSteps, unitZeroTestSteps } from "./unit-zero-revision";
import {
  absoluteErrorCheck,
  numberSetsCheck,
  scientificNotationCheck,
  significantFiguresCheck,
} from "./knowledge-checks";

export type LessonBlock =
  | { type: "text"; text: string; width?: "full" | "half" }
  | { type: "example"; label: string; expression: string; detail: string; steps?: string[]; width?: "full" | "half" }
  | { type: "quiz"; question: string; options: string[]; answer: string; explanation: string; width?: "full" | "half" };

export type Lesson = {
  id: string;
  title: string;
  blocks: LessonBlock[];
  guidedSteps?: GuidedLessonStep[];
};

export type GuidedLessonStep = {
  title: string;
  part?: string;
  blocks: LessonBlock[];
};

export type Topic = {
  id: string;
  title: string;
  lessons: Lesson[];
};

// Blocks appear in order. Two consecutive half-width blocks share a row on wider screens.
export const topics: Topic[] = [
  {
    id: "numbers-and-accuracy",
    title: "Unit 0 — Numbers and Accuracy",
    lessons: [
      {
        id: "scientific-notation",
        title: "0.1 Scientific Notation",
        blocks: [],
        guidedSteps: [...scientificNotationSteps, ...scientificNotationCheck],
      },
      {
        id: "significant-figures",
        title: "0.2 Significant Figures",
        blocks: [],
        guidedSteps: [...significantFiguresSteps, ...significantFiguresCheck],
      },
      {
        id: "absolute-percentage-error",
        title: "0.3 Absolute and Percentage Error",
        blocks: [],
        guidedSteps: [...absoluteErrorSteps, ...absoluteErrorCheck],
      },
      {
        id: "number-sets",
        title: "0.4 Number Sets",
        blocks: [],
        guidedSteps: [...numberSetsSteps, ...numberSetsCheck],
      },
      {
        id: "unit-zero-revision",
        title: "0.5 Unit 0 Revision",
        blocks: [],
        guidedSteps: [...unitZeroRevisionSteps, ...unitZeroTestSteps],
      },
    ],
  },
  {
    id: "sequences-series-finance",
    title: "Unit 1 — Sequences, Series, and Financial Mathematics",
    lessons: [
      {
        id: "nth-term",
        title: "1.1 Finding the nth Term of a Sequence",
        blocks: [
          { type: "text", text: "A sequence is an ordered list of numbers. The nth term, uₙ, gives the value at position n. Look for a pattern, then check your rule against several terms." },
          { type: "example", label: "Find a rule", expression: "5, 7, 9, 11, …", detail: "The terms increase by 2. A rule is uₙ = 2n + 3: when n = 1, u₁ = 5." },
          { type: "quiz", question: "What is the nth term of 3, 6, 9, 12, …?", options: ["n + 3", "3n", "3n + 1", "n²"], answer: "3n", explanation: "Each term is 3 times its position." },
        ],
      },
      {
        id: "quadratic-sequence",
        title: "1.2 Quadratic Sequence",
        blocks: [
          { type: "text", text: "A quadratic sequence has a constant second difference. Its nth term has the form uₙ = an² + bn + c, and the constant second difference is 2a." },
          { type: "example", label: "Find the differences", expression: "2, 5, 10, 17, …", detail: "First differences: 3, 5, 7. Second differences: 2, 2. The rule is uₙ = n² + 1." },
          { type: "text", text: "Once you know a, substitute term positions and values into an² + bn + c to find b and c. Check the rule using other terms." },
          { type: "quiz", question: "What is the second difference of 1, 4, 9, 16, …?", options: ["1", "2", "3", "4"], answer: "2", explanation: "The first differences are 3, 5, 7, so the second difference is 2." },
        ],
      },
      {
        id: "arithmetic-sequence",
        title: "1.3 Arithmetic Sequence",
        blocks: [
          { type: "text", text: "An arithmetic sequence adds the same common difference d each time. If the first term is a, then uₙ = a + (n − 1)d." },
          { type: "example", label: "Example", expression: "4, 7, 10, 13, …", detail: "a = 4 and d = 3, so uₙ = 4 + 3(n − 1)." },
          { type: "quiz", question: "What is the 5th term of 4, 7, 10, 13, …?", options: ["15", "16", "17", "19"], answer: "16", explanation: "Add 3 to 13, or use u₅ = 4 + 4 × 3." },
        ],
      },
      {
        id: "geometric-sequence",
        title: "1.4 Geometric Sequence",
        blocks: [
          { type: "text", text: "A geometric sequence multiplies by the same common ratio r each time. If the first term is a, then uₙ = ar⁽ⁿ⁻¹⁾." },
          { type: "example", label: "Example", expression: "3, 6, 12, 24, …", detail: "a = 3 and r = 2, so uₙ = 3 × 2⁽ⁿ⁻¹⁾." },
          { type: "quiz", question: "What is the common ratio of 5, 15, 45, …?", options: ["2", "3", "5", "10"], answer: "3", explanation: "Each term is multiplied by 3." },
        ],
      },
      {
        id: "recursive-sequence",
        title: "1.5 Recursive Sequence",
        blocks: [
          { type: "text", text: "A recursive rule defines a term using earlier terms. You need a starting value as well as the rule for finding the next term." },
          { type: "example", label: "Example", expression: "u₁ = 2; uₙ₊₁ = uₙ + 3", detail: "Start at 2 and add 3: 2, 5, 8, 11, …" },
          { type: "quiz", question: "If u₁ = 4 and uₙ₊₁ = 2uₙ, what is u₃?", options: ["6", "8", "12", "16"], answer: "16", explanation: "u₂ = 8 and u₃ = 16." },
        ],
      },
      {
        id: "sigma-notation",
        title: "1.6 Sigma Notation",
        blocks: [
          { type: "text", text: "The symbol Σ means ‘add’. The index starts at the lower value, ends at the upper value, and is substituted into the expression for each term." },
          { type: "example", label: "Expand and add", expression: "Σ (n = 1 to 4) n = 1 + 2 + 3 + 4 = 10", detail: "Substitute n = 1, 2, 3 and 4." },
          { type: "quiz", question: "What is Σ (n = 1 to 3) 2n?", options: ["6", "9", "12", "18"], answer: "12", explanation: "2(1) + 2(2) + 2(3) = 2 + 4 + 6 = 12." },
        ],
      },
      {
        id: "arithmetic-series",
        title: "1.7 Arithmetic Series",
        blocks: [
          { type: "text", text: "An arithmetic series is the sum of terms in an arithmetic sequence. For n terms, first term a and last term uₙ: Sₙ = n(a + uₙ)/2." },
          { type: "example", label: "Example", expression: "2 + 5 + 8 + 11 = 26", detail: "S₄ = 4(2 + 11)/2 = 26." },
          { type: "quiz", question: "What is the sum 3 + 5 + 7 + 9?", options: ["20", "22", "24", "26"], answer: "24", explanation: "S₄ = 4(3 + 9)/2 = 24." },
        ],
      },
      {
        id: "geometric-series",
        title: "1.8 Geometric Series",
        blocks: [
          { type: "text", text: "A geometric series adds terms of a geometric sequence. For first term a, ratio r ≠ 1 and n terms, Sₙ = a(1 − rⁿ)/(1 − r). If r = 1, Sₙ = na." },
          { type: "example", label: "Finite sum", expression: "2 + 4 + 8 = 14", detail: "a = 2, r = 2 and n = 3." },
          { type: "text", text: "An infinite geometric series converges only when |r| < 1. Its sum is S∞ = a/(1 − r). Otherwise, it diverges." },
          { type: "example", label: "Infinite sum", expression: "1 + 1/2 + 1/4 + … = 2", detail: "a = 1 and r = 1/2, so S∞ = 1/(1 − 1/2)." },
          { type: "quiz", question: "Which ratio gives a convergent infinite geometric series?", options: ["2", "1", "−1", "1/2"], answer: "1/2", explanation: "An infinite geometric series converges when |r| < 1." },
        ],
      },
      {
        id: "induction",
        title: "1.9 Principle of Mathematical Induction",
        blocks: [
          { type: "text", text: "Mathematical induction proves a statement for all integers from a starting value. First check the base case. Then assume the statement is true for n = k, and use that assumption to prove it for n = k + 1." },
          { type: "example", label: "Base case", expression: "1 + 2 + … + n = n(n + 1)/2", detail: "At n = 1, the left side is 1 and the right side is 1(2)/2 = 1." },
          { type: "example", label: "Inductive step", expression: "k(k + 1)/2 + (k + 1)", detail: "Using the hypothesis and adding the next term gives (k + 1)(k + 2)/2, the rule for n = k + 1." },
          { type: "quiz", question: "In the inductive hypothesis, what do you assume?", options: ["The statement is true for n = k", "The statement is false for n = 1", "k is always 1", "The proof is already complete"], answer: "The statement is true for n = k", explanation: "Assume the rule holds for k, then use it to prove the next case." },
        ],
      },
      {
        id: "sequence-applications",
        title: "1.10 Applications of Sequences and Series",
        blocks: [
          { type: "text", text: "A fixed amount added each time suggests an arithmetic sequence. A fixed multiplier suggests a geometric sequence. Use a term for a value at one step, or a sum for an accumulated total." },
          { type: "example", label: "Savings", expression: "$10, $15, $20, …", detail: "If the amount saved each month rises by $5, the third month’s deposit is $20 and the first three deposits total $45." },
          { type: "quiz", question: "A plant is 10 cm tall and grows 2 cm each week. How tall is it after 3 weeks?", options: ["12 cm", "14 cm", "16 cm", "20 cm"], answer: "16 cm", explanation: "Starting at 10 cm, add 2 cm three times: 10 + 3 × 2 = 16." },
        ],
      },
      {
        id: "financial-mathematics",
        title: "1.11 Financial Mathematics",
        blocks: [
          { type: "text", text: "Simple interest is calculated on the original principal P: A = P(1 + rt), where r is the annual rate as a decimal and t is years. Compound interest also earns interest on earlier interest." },
          { type: "example", label: "Compound interest", expression: "$100 × 1.05² = $110.25", detail: "$100 invested at 5% per year, compounded annually, grows to $110.25 in 2 years." },
          { type: "example", label: "Simple interest", expression: "$100 × (1 + 0.05 × 2) = $110", detail: "At 5% simple interest for 2 years, the interest is $5 each year." },
          { type: "text", text: "For m compounding periods per year, A = P(1 + r/m)ᵐᵗ. For depreciation, replace the plus with a minus. An annuity involves regular payments; loans combine borrowing, interest and repayments." },
          { type: "example", label: "Depreciation", expression: "$1,000 × 0.9 = $900", detail: "A 10% decrease leaves 90% of the value after one year." },
          { type: "example", label: "Regular payments", expression: "$100 × 1.1 + $100 = $210", detail: "With deposits at the end of each year, a $100 first deposit earns 10% for one year before a second $100 deposit. This is an annuity example." },
          { type: "example", label: "Loan balance", expression: "$500 × 1.1 − $100 = $450", detail: "A $500 loan grows by 10% for one period, then a $100 payment reduces the balance." },
          { type: "text", text: "A GDC TVM solver uses values such as present value (PV), future value (FV), payment (PMT), interest rate and number of periods. Use the correct payment and compounding frequencies; money paid out and received have opposite signs." },
          { type: "quiz", question: "What is $200 after one year at 10% interest?", options: ["$210", "$220", "$240", "$300"], answer: "$220", explanation: "10% of $200 is $20, so the balance is $220." },
        ],
      },
      {
        id: "exponents",
        title: "1.12 Exponents and Exponential Equations",
        blocks: [
          { type: "text", text: "When multiplying powers with the same base, add exponents: aᵐaⁿ = aᵐ⁺ⁿ. When dividing, subtract exponents. Also, (aᵐ)ⁿ = aᵐⁿ and a⁰ = 1 for a ≠ 0." },
          { type: "example", label: "Exponent laws", expression: "2³ × 2² = 2⁵ = 32", detail: "Add the exponents: 3 + 2 = 5." },
          { type: "text", text: "To solve an exponential equation, rewrite both sides using the same positive base other than 1, then equate their exponents." },
          { type: "example", label: "Solve", expression: "2ˣ = 8 = 2³", detail: "The bases match, so x = 3." },
          { type: "quiz", question: "Solve 3ˣ = 9.", options: ["x = 1", "x = 2", "x = 3", "x = 9"], answer: "x = 2", explanation: "9 = 3², so x = 2." },
        ],
      },
      {
        id: "logarithms",
        title: "1.13 Logarithms and Logarithmic Equations",
        blocks: [
          { type: "text", text: "A logarithm answers: ‘What power gives this number?’ logᵦ(x) = y means bʸ = x, where b > 0, b ≠ 1 and x > 0." },
          { type: "example", label: "Convert", expression: "log₂(8) = 3", detail: "This is equivalent to 2³ = 8." },
          { type: "text", text: "For positive x and y: logᵦ(xy) = logᵦ(x) + logᵦ(y), logᵦ(x/y) = logᵦ(x) − logᵦ(y), and logᵦ(xᵖ) = p logᵦ(x). Change of base: logᵦ(x) = log(x)/log(b)." },
          { type: "example", label: "Solve and check", expression: "log₂(x) = 4 → x = 16", detail: "2⁴ = 16, and the logarithm’s argument is positive." },
          { type: "quiz", question: "What is log₁₀(100)?", options: ["1", "2", "10", "100"], answer: "2", explanation: "10² = 100, so log₁₀(100) = 2." },
        ],
      },
    ],
  },
];
