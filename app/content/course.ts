import { scientificNotationSteps } from "./scientific-notation";
import { significantFiguresSteps } from "./significant-figures";
import { absoluteErrorSteps } from "./absolute-error";
import { numberSetsSteps } from "./number-sets";
import { nthTermSteps, quadraticSequenceSteps } from "./sequences";
import { arithmeticSequenceSteps, geometricSequenceSteps } from "./arithmetic-geometric";
import { recursiveSequenceSteps, sigmaNotationSteps } from "./recursive-sigma";
import { arithmeticSeriesSteps, geometricSeriesSteps } from "./series";
import { financialMathematicsSteps } from "./financial-mathematics";
import { exponentialEquationSteps } from "./exponential-equations";
import { logarithmicEquationSteps } from "./logarithmic-equations";
import { inductionSteps } from "./induction";
import { sequenceApplicationsSteps } from "./induction-applications";
import { quadraticSubstitutionSteps, sumRelationshipSteps } from "./sequence-extensions";
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
  | { type: "calculator-guide"; width?: "full" | "half" }
  | { type: "quiz"; question: string; options: string[]; answer: string; explanation: string; proof?: { heading: string; lines: string[] }; width?: "full" | "half" };

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
        guidedSteps: [...quadraticSequenceSteps.filter((step) => step.part !== "Final check"), ...quadraticSubstitutionSteps, ...quadraticSequenceSteps.filter((step) => step.part === "Final check")],
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
        guidedSteps: [...sigmaNotationSteps.filter((step) => step.part !== "Final check"), ...sumRelationshipSteps, ...sigmaNotationSteps.filter((step) => step.part === "Final check")],
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
        blocks: [],
        guidedSteps: inductionSteps,
      },
      {
        id: "sequence-applications",
        title: "1.10 Applications of Sequences and Series",
        blocks: [],
        guidedSteps: sequenceApplicationsSteps,
      },
      {
        id: "financial-mathematics",
        title: "1.11 Financial Mathematics",
        blocks: [],
        guidedSteps: financialMathematicsSteps,
      },
      {
        id: "exponents",
        title: "1.12 Exponents and Exponential Equations",
        blocks: [],
        guidedSteps: exponentialEquationSteps,
      },
      {
        id: "logarithms",
        title: "1.13 Logarithms and Logarithmic Equations",
        blocks: [],
        guidedSteps: logarithmicEquationSteps,
      },
    ],
  },
];
