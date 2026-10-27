import { scientificNotationSteps } from "./scientific-notation";
import { significantFiguresSteps } from "./significant-figures";
import { absoluteErrorSteps } from "./absolute-error";
import { numberSetsSteps } from "./number-sets";
import { nthTermSteps, quadraticSequenceSteps } from "./sequences";
import { arithmeticSequenceSteps, geometricSequenceSteps } from "./arithmetic-geometric";
import { recursiveSequenceSteps, sigmaNotationSteps } from "./recursive-sigma";
import { arithmeticSeriesSteps, geometricSeriesSteps } from "./series";
import {
  errorSlideSteps,
  nthTermSlideSteps,
  numberSetsSlideSteps,
  scientificSlideSteps,
  significantSlideSteps,
} from "./slide-review";
import { unitZeroRevisionSteps, unitZeroTestSteps } from "./unit-zero-revision";
import {
  absoluteErrorCheck,
  numberSetsCheck,
  scientificNotationCheck,
  significantFiguresCheck,
} from "./knowledge-checks";

// Write mathematical expressions in LaTeX using \\( ... \\) delimiters.
export type LessonBlock =
  | { type: "text"; text: string; width?: "full" | "half" }
  | { type: "example"; label: string; expression: string; detail: string; steps?: string[]; width?: "full" | "half" }
  | { type: "sequence-diagram"; terms: string[]; operation: string; width?: "full" | "half" }
  | { type: "sigma-diagram"; width?: "full" | "half" }
  | { type: "number-set-diagram"; width?: "full" | "half" }
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
        guidedSteps: [...scientificNotationSteps, ...scientificSlideSteps, ...scientificNotationCheck],
      },
      {
        id: "significant-figures",
        title: "0.2 Significant Figures",
        blocks: [],
        guidedSteps: [...significantFiguresSteps, ...significantSlideSteps, ...significantFiguresCheck],
      },
      {
        id: "absolute-percentage-error",
        title: "0.3 Absolute and Percentage Error",
        blocks: [],
        guidedSteps: [...absoluteErrorSteps, ...errorSlideSteps, ...absoluteErrorCheck],
      },
      {
        id: "number-sets",
        title: "0.4 Number Sets",
        blocks: [],
        guidedSteps: [...numberSetsSteps, ...numberSetsSlideSteps, ...numberSetsCheck],
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
        blocks: [],
        guidedSteps: [...nthTermSteps.filter((step) => step.part !== "Final check"), ...nthTermSlideSteps, ...nthTermSteps.filter((step) => step.part === "Final check")],
      },
      {
        id: "quadratic-sequence",
        title: "1.2 Quadratic Sequence",
        blocks: [],
        guidedSteps: quadraticSequenceSteps,
      },
      {
        id: "arithmetic-sequence",
        title: "1.3 Arithmetic Sequence",
        blocks: [],
        guidedSteps: arithmeticSequenceSteps,
      },
      {
        id: "geometric-sequence",
        title: "1.4 Geometric Sequence",
        blocks: [],
        guidedSteps: geometricSequenceSteps,
      },
      {
        id: "recursive-sequence",
        title: "1.5 Recursive Sequence",
        blocks: [],
        guidedSteps: recursiveSequenceSteps,
      },
      {
        id: "sigma-notation",
        title: "1.6 Sigma Notation",
        blocks: [],
        guidedSteps: sigmaNotationSteps,
      },
      {
        id: "arithmetic-series",
        title: "1.7 Arithmetic Series",
        blocks: [],
        guidedSteps: arithmeticSeriesSteps,
      },
      {
        id: "geometric-series",
        title: "1.8 Geometric Series",
        blocks: [],
        guidedSteps: geometricSeriesSteps,
      },
      {
        id: "induction",
        title: "1.9 Principle of Mathematical Induction",
        blocks: [
          { type: "text", text: "Mathematical induction proves a statement for all integers from a starting value. First check the base case. Then assume the statement is true for \\(n = k\\), and use that assumption to prove it for \\(n = k + 1\\)." },
          { type: "example", label: "Base case", expression: "\\(1 + 2\\) + … + \\(n = \\dfrac{n(n + 1)}{2}\\)", detail: "At \\(n = 1\\), the left side is \\(1\\) and the right side is \\(\\dfrac{1(2)}{2} = 1\\)." },
          { type: "example", label: "Inductive step", expression: "\\(\\dfrac{k(k + 1)}{2}\\) + (\\(k + 1)\\)", detail: "Using the hypothesis and adding the next term gives (\\(k + 1)\\dfrac{(k + 2)}{2}\\), the rule for \\(n = k + 1\\)." },
          { type: "quiz", question: "In the inductive hypothesis, what do you assume?", options: ["The statement is true for \\(n = k\\)", "The statement is false for \\(n = 1\\)", "k is always \\(1\\)", "The proof is already complete"], answer: "The statement is true for \\(n = k\\)", explanation: "Assume the rule holds for k, then use it to prove the next case." },
        ],
      },
      {
        id: "sequence-applications",
        title: "1.10 Applications of Sequences and Series",
        blocks: [
          { type: "text", text: "A fixed amount added each time suggests an arithmetic sequence. A fixed multiplier suggests a geometric sequence. Use a term for a value at one step, or a sum for an accumulated total." },
          { type: "example", label: "Savings", expression: "$\\(10\\), $\\(15\\), $\\(20\\), …", detail: "If the amount saved each month rises by $\\(5\\), the third month’s deposit is $\\(20\\) and the first three deposits total $\\(45\\)." },
          { type: "quiz", question: "A plant is \\(10\\) cm tall and grows \\(2\\) cm each week. How tall is it after \\(3\\) weeks?", options: ["\\(12\\) cm", "\\(14\\) cm", "\\(16\\) cm", "\\(20\\) cm"], answer: "\\(16\\) cm", explanation: "Starting at \\(10\\) cm, add \\(2\\) cm three times: \\(10 + 3 \\times  2 = 16\\)." },
        ],
      },
      {
        id: "financial-mathematics",
        title: "1.11 Financial Mathematics",
        blocks: [
          { type: "text", text: "Simple interest is calculated on the original principal P: \\(A = P(1\\) + rt), where r is the annual rate as a decimal and t is years. Compound interest also earns interest on earlier interest." },
          { type: "example", label: "Compound interest", expression: "$\\(100 \\times  1.05\\)² = $\\(110.25\\)", detail: "$\\(100\\) invested at \\(5\\%\\) per year, compounded annually, grows to $\\(110.25\\) in \\(2\\) years." },
          { type: "example", label: "Simple interest", expression: "$\\(100\\) × (\\(1 + 0.05 \\times  2)\\) = $\\(110\\)", detail: "At \\(5\\%\\) simple interest for \\(2\\) years, the interest is $\\(5\\) each year." },
          { type: "text", text: "For m compounding periods per year, \\(A = P(1 + \\dfrac{r}{m})\\)ᵐᵗ. For depreciation, replace the plus with a minus. An annuity involves regular payments; loans combine borrowing, interest and repayments." },
          { type: "example", label: "Depreciation", expression: "$\\(1{,}000 \\times  0.9\\) = $\\(900\\)", detail: "A \\(10\\%\\) decrease leaves \\(90\\%\\) of the value after one year." },
          { type: "example", label: "Regular payments", expression: "$\\(100 \\times  1.1\\) + $\\(100\\) = $\\(210\\)", detail: "With deposits at the end of each year, a $\\(100\\) first deposit earns \\(10\\%\\) for one year before a second $\\(100\\) deposit. This is an annuity example." },
          { type: "example", label: "Loan balance", expression: "$\\(500 \\times  1.1\\) − $\\(100\\) = $\\(450\\)", detail: "A $\\(500\\) loan grows by \\(10\\%\\) for one period, then a $\\(100\\) payment reduces the balance." },
          { type: "text", text: "A GDC TVM solver uses values such as present value (PV), future value (FV), payment (PMT), interest rate and number of periods. Use the correct payment and compounding frequencies; money paid out and received have opposite signs." },
          { type: "quiz", question: "What is $\\(200\\) after one year at \\(10\\%\\) interest?", options: ["$\\(210\\)", "$\\(220\\)", "$\\(240\\)", "$\\(300\\)"], answer: "$\\(220\\)", explanation: "\\(10\\%\\) of $\\(200\\) is $\\(20\\), so the balance is $\\(220\\)." },
        ],
      },
      {
        id: "exponents",
        title: "1.12 Exponents and Exponential Equations",
        blocks: [
          { type: "text", text: "When multiplying powers with the same base, add exponents: aᵐ\\(a^{n} = a\\)ᵐ⁺ⁿ. When dividing, subtract exponents. Also, (aᵐ)ⁿ = aᵐⁿ and \\(a^{0} = 1\\) for a ≠ \\(0\\)." },
          { type: "example", label: "Exponent laws", expression: "\\(2^{3} \\times  2^{2} = 2^{5} = 32\\)", detail: "Add the exponents: \\(3 + 2 = 5\\)." },
          { type: "text", text: "To solve an exponential equation, rewrite both sides using the same positive base other than \\(1\\), then equate their exponents." },
          { type: "example", label: "Solve", expression: "\\(2\\)ˣ = \\(8 = 2^{3}\\)", detail: "The bases match, so \\(x = 3\\)." },
          { type: "quiz", question: "Solve \\(3\\)ˣ = \\(9\\).", options: ["\\(x = 1\\)", "\\(x = 2\\)", "\\(x = 3\\)", "\\(x = 9\\)"], answer: "\\(x = 2\\)", explanation: "\\(9 = 3^{2}\\), so \\(x = 2\\)." },
        ],
      },
      {
        id: "logarithms",
        title: "1.13 Logarithms and Logarithmic Equations",
        blocks: [
          { type: "text", text: "A logarithm answers: ‘What power gives this number?’ logᵦ(x) = y means bʸ = x, where \\(b > 0\\), b ≠ \\(1\\) and \\(x > 0\\)." },
          { type: "example", label: "Convert", expression: "log₂(\\(8) = 3\\)", detail: "This is equivalent to \\(2^{3} = 8\\)." },
          { type: "text", text: "For positive x and y: logᵦ(xy) = logᵦ(x) + logᵦ(y), logᵦ(\\(\\dfrac{x}{y})\\) = logᵦ(x) − logᵦ(y), and logᵦ(xᵖ) = p logᵦ(x). Change of base: logᵦ(x) = log(x)/log(b)." },
          { type: "example", label: "Solve and check", expression: "log₂(x) = \\(4 \\to  x = 16\\)", detail: "\\(2^{4} = 16\\), and the logarithm’s argument is positive." },
          { type: "quiz", question: "What is log₁₀(\\(100)\\)?", options: ["\\(1\\)", "\\(2\\)", "\\(10\\)", "\\(100\\)"], answer: "\\(2\\)", explanation: "\\(10^{2} = 100\\), so log₁₀(\\(100) = 2\\)." },
        ],
      },
    ],
  },
];
