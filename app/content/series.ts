import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";

const arithmeticIntro = section(
  "From sequence to series",
  "An arithmetic sequence lists terms with a constant difference. An arithmetic series adds those terms. \\(S_{n}\\) is the sum of the first n terms.",
  [
    {
      expression: "4, 7, 10, 13 → \\(S_{4}\\) = 4 + 7 + 10 + 13 = 34",
      detail: "The sequence lists the values; the series adds them.",
      steps: ["Start with 4 and add 3 to get 7, 10 and 13.", "Add the first four terms: 4 + 7 + 10 + 13.", "The sum is 34, so \\(S_{4}\\) = 34."],
    },
    {
      expression: "−2, 1, 4, 7 → \\(S_{3}\\) = −2 + 1 + 4 = 3",
      detail: "\\(S_{3}\\) uses only the first three terms.",
      steps: ["Identify the first three terms: −2, 1 and 4.", "Add them: −2 + 1 + 4 = 3.", "The fourth term is not included in \\(S_{3}\\)."],
    },
  ],
  [
    { question: "What does \\(S_{3}\\) mean?", options: ["The sum of the first 3 terms", "The third term only", "The common difference", "The first term"], answer: "The sum of the first 3 terms", explanation: "\\(S_{3}\\) adds the terms in positions 1, 2 and 3." },
    { question: "For 2, 5, 8, 11, … what is \\(S_{3}\\)?", options: ["15", "8", "26", "13"], answer: "15", explanation: "\\(S_{3}\\) = 2 + 5 + 8 = 15." },
    { question: "Which is a series?", options: ["2 + 5 + 8 + 11", "2, 5, 8, 11", "d = 3", "\\(u_{1}\\) = 2"], answer: "2 + 5 + 8 + 11", explanation: "A series adds the terms of a sequence." },
    { question: "For 1, 4, 7, 10, … what is \\(S_{4}\\)?", options: ["22", "10", "18", "25"], answer: "22", explanation: "Add the first four terms: 1 + 4 + 7 + 10 = 22." },
    { question: "For −2, 1, 4, 7, … what is \\(u_{3}\\)?", options: ["4", "3", "7", "−2"], answer: "4", explanation: "\\(u_{3}\\) is the third term, 4. \\(S_{3}\\) is their sum, 3." },
  ],
);

arithmeticIntro[0].blocks.splice(1, 0, {
  type: "sequence-diagram",
  terms: ["4", "7", "10", "13"],
  operation: "+ 3",
});

export const arithmeticSeriesSteps: GuidedLessonStep[] = [
  ...arithmeticIntro,
  ...section(
    "Pairing terms to find a sum",
    "In an arithmetic series, pairing terms from opposite ends gives the same total. The sum is the number of terms times the average of the first and last terms: \\(S_{n}\\) = \\(\\dfrac{n(u_{1} + u_{n})}{2}\\).",
    [
      { expression: "4 + 7 + 10 + 13 = 34", detail: "The first and last terms pair to the same total as the middle terms.", steps: ["Pair the first and last: 4 + 13 = 17.", "Pair the middle terms: 7 + 10 = 17.", "There are two pairs, so the total is 17 + 17 = 34.", "Using the formula: \\(S_{4}\\) = \\(\\dfrac{4(4 + 13)}{2}\\) = 34."] },
      { expression: "1 + 2 + 3 + 4 + 5 = 15", detail: "The formula works for an odd number of terms too.", steps: ["There are 5 terms, from 1 to 5.", "The average of the first and last is \\(\\dfrac{(1 + 5)}{2}\\) = 3.", "Multiply by 5 terms: \\(S_{5}\\) = 5 × 3 = 15."] },
    ],
    [
      { question: "What is the sum of 2 + 4 + 6 + 8?", options: ["20", "18", "16", "24"], answer: "20", explanation: "Pair 2 + 8 = 10 and 4 + 6 = 10, giving 20." },
      { question: "For 3 + 6 + 9 + 12, what is the sum of the first and last terms?", options: ["15", "12", "9", "18"], answer: "15", explanation: "3 + 12 = 15, matching the middle pair 6 + 9." },
      { question: "What is \\(S_{4}\\) if \\(u_{1}\\) = 3 and \\(u_{4}\\) = 12?", options: ["30", "15", "60", "24"], answer: "30", explanation: "\\(S_{4}\\) = \\(\\dfrac{4(3 + 12)}{2}\\) = 30." },
      { question: "What does n represent in \\(S_{n}\\) = \\(\\dfrac{n(u_{1} + u_{n})}{2}\\)?", options: ["The number of terms", "The common ratio", "The first term", "The sum"], answer: "The number of terms", explanation: "n counts how many terms are being added." },
      { question: "What is the average of the first and last terms, 5 and 15?", options: ["10", "20", "5", "15"], answer: "10", explanation: "(5 + 15) ÷ 2 = 10." },
    ],
  ),
  ...section(
    "Using the first term and difference",
    "When the last term is unknown, use \\(S_{n}\\) = n[2u₁ + (n − 1)d]/2. This combines the nth-term rule with the sum formula.",
    [
      { expression: "4, 7, 10, 13, … → \\(S_{6}\\) = 69", detail: "Here \\(u_{1}\\) = 4, d = 3 and n = 6.", steps: ["Substitute: \\(S_{6}\\) = 6[2(4) + (6 − 1)3]/2.", "Inside the brackets: 8 + 15 = 23.", "Calculate \\(S_{6}\\) = 3 × 23 = 69.", "Check: 4 + 7 + 10 + 13 + 16 + 19 = 69."] },
      { expression: "−19, −13, −7, … → \\(S_{63}\\) = 10,521", detail: "A negative first term is fine; the common difference is 6.", steps: ["Find the last term: \\(u_{63}\\) = −19 + 62(6) = 353.", "Use \\(S_{n}\\) = \\(\\dfrac{n(u_{1} + u_{n})}{2}\\).", "\\(S_{63}\\) = \\(\\dfrac{63(-19 + 353)}{2}\\) = 63 × 167 = 10,521."] },
    ],
    [
      { question: "For 4, 7, 10, … what is d?", options: ["3", "4", "7", "−3"], answer: "3", explanation: "7 − 4 = 3." },
      { question: "If \\(u_{1}\\) = 4 and d = 3, what is \\(u_{6}\\)?", options: ["19", "22", "16", "18"], answer: "19", explanation: "\\(u_{6}\\) = 4 + 5(3) = 19." },
      { question: "If \\(u_{1}\\) = 4 and d = 3, what is \\(S_{6}\\)?", options: ["69", "57", "72", "23"], answer: "69", explanation: "\\(S_{6}\\) = \\(\\dfrac{6(4 + 19)}{2}\\) = 69." },
      { question: "What is \\(S_{3}\\) for \\(u_{1}\\) = 10 and d = −2?", options: ["24", "18", "30", "6"], answer: "24", explanation: "The first three terms are 10, 8 and 6; their sum is 24." },
      { question: "For \\(u_{1}\\) = 2, d = 5 and n = 4, which substitution is correct?", options: ["4[2(2) + 3(5)]/2", "4[2 + 4(5)]/2", "4[2(5) + 3(2)]/2", "2[2(2) + 4(5)]/2"], answer: "4[2(2) + 3(5)]/2", explanation: "Substitute n = 4, \\(u_{1}\\) = 2 and d = 5 into n[2u₁ + (n − 1)d]/2." },
    ],
  ),
  ...section(
    "Arithmetic series in context",
    "When a quantity increases by the same amount each period, it forms an arithmetic sequence. Add the terms when the question asks for a total across periods.",
    [
      { expression: "20 rows: 20, 21, 22, … seats → 590 seats", detail: "Each row has one more seat than the previous row.", steps: ["\\(u_{1}\\) = 20, d = 1 and n = 20.", "The last row has \\(u_{20}\\) = 20 + 19(1) = 39 seats.", "Total seats: \\(S_{20}\\) = \\(\\dfrac{20(20 + 39)}{2}\\) = 590."] },
      { expression: "Yearly sales: $10,000, $17,500, … → $1,625,000 over 20 years", detail: "Sales rise by $7,500 each year.", steps: ["\\(u_{1}\\) = 10,000, d = 7,500 and n = 20.", "The twentieth year is \\(u_{20}\\) = 10,000 + 19(7,500) = 152,500.", "Sum all years: \\(S_{20}\\) = \\(\\dfrac{20(10,000 + 152,500)}{2}\\) = 1,625,000."] },
    ],
    [
      { question: "A theatre has 20 rows, starting at 20 seats and adding 1 per row. How many seats are in row 20?", options: ["39", "40", "20", "38"], answer: "39", explanation: "There are 19 increases: 20 + 19 = 39." },
      { question: "For the same theatre, what is the total number of seats?", options: ["590", "400", "780", "600"], answer: "590", explanation: "\\(S_{20}\\) = \\(\\dfrac{20(20 + 39)}{2}\\) = 590." },
      { question: "A student saves $5 in week 1 and $2 more each week. How much is saved in week 3?", options: ["$9", "$7", "$11", "$21"], answer: "$9", explanation: "The amounts are $5, $7 and $9." },
      { question: "In that savings example, what is saved over the first 3 weeks?", options: ["$21", "$9", "$15", "$27"], answer: "$21", explanation: "$5 + $7 + $9 = $21." },
      { question: "A total across 20 years of increasing annual sales requires which quantity?", options: ["\\(S_{20}\\)", "\\(u_{20}\\) only", "d only", "\\(u_{1}\\) only"], answer: "\\(S_{20}\\)", explanation: "\\(S_{20}\\) adds the sales for all 20 years." },
    ],
  ),
  ...finalCheck([
    { question: "What is \\(S_{63}\\) for −19, −13, −7, …?", options: ["10,521", "10,584", "21,042", "353"], answer: "10,521", explanation: "d = 6 and \\(u_{63}\\) = 353, so \\(S_{63}\\) = \\(\\dfrac{63(-19 + 353)}{2}\\) = 10,521." },
    { question: "An arithmetic series has \\(u_{1}\\) = 5, d = 11 and 150 terms. What is its last term?", options: ["1644", "1655", "1649", "150"], answer: "1644", explanation: "\\(u_{150}\\) = 5 + 149(11) = 1644." },
    { question: "Five rows have 12, 14, 16, 18 and 20 seats. What is the total?", options: ["80", "70", "90", "32"], answer: "80", explanation: "\\(S_{5}\\) = \\(\\dfrac{5(12 + 20)}{2}\\) = 80." },
  ]),
];

const geometricIntro = section(
  "Adding geometric terms",
  "A geometric sequence multiplies by a fixed ratio r each time. A geometric series adds its terms; \\(S_{n}\\) is the sum of the first n terms.",
  [
    { expression: "4, 2, 1, \\(\\dfrac{1}{2}\\), … → \\(S_{4}\\) = 7.5", detail: "Each term is half the one before it.", steps: ["Start with \\(u_{1}\\) = 4 and multiply by r = \\(\\dfrac{1}{2}\\).", "The first four terms are 4, 2, 1 and \\(\\dfrac{1}{2}\\).", "Add them: \\(S_{4}\\) = 4 + 2 + 1 + 0.5 = 7.5."] },
    { expression: "2, 4, 8, 16, … → \\(S_{3}\\) = 14", detail: "Only the first three terms are included.", steps: ["Start at 2 and multiply by 2 to get 4 and 8.", "Add the first three terms: 2 + 4 + 8 = 14.", "The fourth term, 16, is not part of \\(S_{3}\\)."] },
  ],
  [
    { question: "What is the ratio of 4, 2, 1, \\(\\dfrac{1}{2}\\), …?", options: ["\\(\\dfrac{1}{2}\\)", "2", "−2", "\\(\\dfrac{1}{4}\\)"], answer: "\\(\\dfrac{1}{2}\\)", explanation: "Each term is half the previous one." },
    { question: "What is \\(S_{3}\\) for 4, 2, 1, …?", options: ["7", "1", "6", "7.5"], answer: "7", explanation: "Add the first three terms: 4 + 2 + 1 = 7." },
    { question: "What is \\(S_{3}\\) for 2, 4, 8, 16, …?", options: ["14", "8", "30", "12"], answer: "14", explanation: "2 + 4 + 8 = 14." },
    { question: "Which sequence is geometric?", options: ["3, 6, 12, 24", "3, 6, 9, 12", "1, 4, 9, 16", "2, 5, 9, 14"], answer: "3, 6, 12, 24", explanation: "Each term is multiplied by 2." },
    { question: "What does \\(S_{4}\\) include?", options: ["The first four terms added", "Only the fourth term", "Only four times the first term", "The common ratio"], answer: "The first four terms added", explanation: "\\(S_{4}\\) is the sum of the terms in positions 1 through 4." },
  ],
);

geometricIntro[0].blocks.splice(1, 0, {
  type: "sequence-diagram",
  terms: ["4", "2", "1", "\\(\\dfrac{1}{2}\\)"],
  operation: "× \\(\\dfrac{1}{2}\\)",
});

export const geometricSeriesSteps: GuidedLessonStep[] = [
  ...geometricIntro,
  ...section(
    "Finite geometric sums",
    "For n terms with first term \\(u_{1}\\) and ratio r ≠ 1, use \\(S_{n}\\) = \\(\\dfrac{u_{1}(1 - r^{n})}{(1 - r)}\\). When r = 1, all n terms equal \\(u_{1}\\), so \\(S_{n}\\) = nu₁.",
    [
      { expression: "1 + 0.7 + 0.49 + 0.343 + 0.2401 = 2.7731", detail: "The first term is 1, the ratio is 0.7 and there are 5 terms.", steps: ["Substitute \\(u_{1}\\) = 1, r = 0.7 and n = 5.", "\\(S_{5}\\) = \\(\\dfrac{1(1 - 0.7^{5})}{(1 - 0.7)}\\).", "0.7⁵ = 0.16807, so \\(S_{5}\\) = 0.83193 ÷ 0.3 = 2.7731."] },
      { expression: "2 + 4 + 8 + 16 = 30", detail: "The same formula works when r is greater than 1.", steps: ["Identify \\(u_{1}\\) = 2, r = 2 and n = 4.", "\\(S_{4}\\) = \\(\\dfrac{2(1 - 2^{4})}{(1 - 2)}\\).", "Calculate \\(\\dfrac{2(-15)}{(-1)}\\) = 30."] },
    ],
    [
      { question: "For 1, 0.7, 0.49, … what is r?", options: ["0.7", "0.3", "1.7", "−0.3"], answer: "0.7", explanation: "Each term is multiplied by 0.7." },
      { question: "What is the sum of the first 5 terms of 1, 0.7, 0.49, 0.343, …?", options: ["2.7731", "2.533", "1.7731", "3.5"], answer: "2.7731", explanation: "The fifth term is 0.2401; adding all five terms gives 2.7731." },
      { question: "What is \\(S_{4}\\) for 2, 4, 8, 16, …?", options: ["30", "16", "14", "32"], answer: "30", explanation: "Add 2 + 4 + 8 + 16 = 30." },
      { question: "If \\(u_{1}\\) = 3 and r = 1, what is \\(S_{4}\\)?", options: ["12", "3", "4", "0"], answer: "12", explanation: "All four terms are 3, so \\(S_{4}\\) = 4 × 3 = 12." },
      { question: "For \\(u_{1}\\) = 2, r = 3 and n = 3, which expression gives \\(S_{3}\\)?", options: ["\\(\\dfrac{2(1 - 3^{3})}{(1 - 3)}\\)", "\\(\\dfrac{2(1 - 3^{2})}{(1 - 3)}\\)", "2 + 3(3 − 1)", "\\(\\dfrac{3(1 - 2^{3})}{(1 - 2)}\\)"], answer: "\\(\\dfrac{2(1 - 3^{3})}{(1 - 3)}\\)", explanation: "Substitute \\(u_{1}\\) = 2, r = 3 and n = 3 into the finite sum formula." },
    ],
  ),
  ...section(
    "Convergence and divergence",
    "An infinite series converges when its partial sums approach a finite limit. A non-zero geometric series converges when |r| < 1; otherwise it diverges.",
    [
      { expression: "2 + 1 + \\(\\dfrac{1}{2}\\) + \\(\\dfrac{1}{4}\\) + … → 4", detail: "The partial sums get closer and closer to 4.", steps: ["The ratio is \\(\\dfrac{1}{2}\\), so |r| < 1.", "Partial sums are 2, 3, 3.5, 3.75, ….", "These sums approach 4, so the series converges to 4."] },
      { expression: "1 + 2 + 4 + 8 + … diverges", detail: "Its partial sums keep increasing rather than approaching a finite limit.", steps: ["The ratio is 2, so |r| = 2, which is greater than 1.", "Partial sums are 1, 3, 7, 15, ….", "They do not approach a finite number, so the series diverges."] },
    ],
    [
      { question: "What happens to the partial sums of a convergent series?", options: ["They approach a finite limit", "They must become negative", "They always increase without limit", "They stop after two terms"], answer: "They approach a finite limit", explanation: "Convergence means the partial sums approach a finite value." },
      { question: "Which ratio gives a convergent non-zero infinite geometric series?", options: ["\\(\\dfrac{-1}{2}\\)", "−2", "1", "2"], answer: "\\(\\dfrac{-1}{2}\\)", explanation: "|\\(\\dfrac{-1}{2}\\)| = \\(\\dfrac{1}{2}\\) < 1." },
      { question: "Does 1 − 1 + 1 − 1 + … converge?", options: ["No", "Yes, to 0", "Yes, to 1", "Yes, to 2"], answer: "No", explanation: "Its partial sums alternate between 1 and 0, so they do not approach one limit." },
      { question: "Is the non-zero infinite geometric series with r = −2 convergent?", options: ["No", "Yes", "Only if its first term is positive", "Only if n is even"], answer: "No", explanation: "|−2| = 2, which is not less than 1." },
      { question: "The partial sums are 2, 3, 3.5, 3.75, …. What value do they approach?", options: ["4", "3", "2", "8"], answer: "4", explanation: "Each partial sum gets closer to 4." },
    ],
  ),
  ...section(
    "The infinite geometric sum",
    "When |r| < 1, use S∞ = \\(\\dfrac{u_{1}}{(1 - r)}\\). Check convergence first; the formula does not give an infinite sum for a divergent series.",
    [
      { expression: "2 + 1 + \\(\\dfrac{1}{2}\\) + … = 4", detail: "The first term is 2 and r = \\(\\dfrac{1}{2}\\).", steps: ["Check |\\(\\dfrac{1}{2}\\)| < 1, so the series converges.", "Substitute: S∞ = 2/(1 − \\(\\dfrac{1}{2}\\)).", "Calculate 2 ÷ \\(\\dfrac{1}{2}\\) = 4."] },
      { expression: "6 − 3 + 1.5 − … = 4", detail: "A negative ratio can converge when its absolute value is less than 1.", steps: ["The ratio is r = \\(\\dfrac{-1}{2}\\) and |r| = \\(\\dfrac{1}{2}\\) < 1.", "S∞ = 6/(1 − (\\(\\dfrac{-1}{2}\\))) = 6/(\\(\\dfrac{3}{2}\\)).", "Divide: 6 ÷ 1.5 = 4."] },
    ],
    [
      { question: "What is the sum of 1 + \\(\\dfrac{1}{2}\\) + \\(\\dfrac{1}{4}\\) + …?", options: ["2", "1", "4", "It diverges"], answer: "2", explanation: "r = \\(\\dfrac{1}{2}\\), so S∞ = 1/(1 − \\(\\dfrac{1}{2}\\)) = 2." },
      { question: "What is the sum of 2 + 1 + \\(\\dfrac{1}{2}\\) + …?", options: ["4", "2", "3", "It diverges"], answer: "4", explanation: "S∞ = 2/(1 − \\(\\dfrac{1}{2}\\)) = 4." },
      { question: "What must be checked before using S∞ = \\(\\dfrac{u_{1}}{(1 - r)}\\)?", options: ["|r| < 1", "r > 1", "n = 1", "\\(u_{1}\\) = 0"], answer: "|r| < 1", explanation: "The formula applies when the infinite geometric series converges, with |r| < 1." },
      { question: "What is S∞ when \\(u_{1}\\) = 6 and r = \\(\\dfrac{-1}{2}\\)?", options: ["4", "12", "3", "It diverges"], answer: "4", explanation: "S∞ = 6/(1 + \\(\\dfrac{1}{2}\\)) = 4." },
      { question: "Does a non-zero geometric series with r = 1 have a finite infinite sum?", options: ["No", "Yes, always 1", "Yes, always 0", "Only when n = 1"], answer: "No", explanation: "Its non-zero terms repeat forever, so its partial sums do not approach a finite limit." },
    ],
  ),
  ...finalCheck([
    { question: "What is the sum of the first 10 terms of 4 + 2 + 1 + \\(\\dfrac{1}{2}\\) + …?", options: ["7.9921875", "8", "7.984375", "4"], answer: "7.9921875", explanation: "\\(S_{10}\\) = 4(1 − (\\(\\dfrac{1}{2}\\))¹⁰)/(1 − \\(\\dfrac{1}{2}\\)) = 7.9921875." },
    { question: "Which infinite geometric series converges?", options: ["3 − 1.5 + 0.75 − …", "3 − 6 + 12 − …", "3 + 3 + 3 + …", "3 + 6 + 12 + …"], answer: "3 − 1.5 + 0.75 − …", explanation: "Its ratio is \\(\\dfrac{-1}{2}\\), whose absolute value is less than 1." },
    { question: "A non-zero geometric series has r = −1. What happens to its infinite sum?", options: ["It diverges", "It always equals zero", "It always equals the first term", "It converges because r < 1"], answer: "It diverges", explanation: "The partial sums alternate; the correct convergence condition is |r| < 1, which r = −1 does not satisfy." },
  ]),
];
