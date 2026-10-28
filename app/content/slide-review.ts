import { section } from "./sequences";
import type { GuidedLessonStep } from "./course";

export const scientificSlideSteps: GuidedLessonStep[] = section(
  "From scientific notation to ordinary numbers",
  "To convert back, use the power of \\(10\\) to decide how far to move the decimal point. Positive powers move it right; negative powers move it left.",
  [
    {
      expression: "\\(1.37 \\times  10^{8} = 137{,}000{,}000\\)",
      detail: "The exponent tells us how many places to move the decimal point.",
      steps: ["Start with \\(1.37\\).", "The exponent is \\(8\\), so move the decimal point \\(8\\) places to the right.", "Add zeros as needed: \\(137{,}000{,}000\\)."],
    },
    {
      expression: "\\(1.23 \\times  10^{-5} = 0.0000123\\)",
      detail: "A negative exponent moves the decimal to the left.",
      steps: ["Start with \\(1.23\\).", "Move the decimal point \\(5\\) places left, adding zeros as needed.", "The result is \\(0.0000123\\)."],
    },
  ],
  [
    { question: "Write \\(3.47 \\times  10^{5}\\) as an ordinary number.", options: ["\\(347{,}000\\)", "\\(34{,}700\\)", "\\(3{,}470{,}000\\)", "\\(0.0000347\\)"], answer: "\\(347{,}000\\)", explanation: "Move the decimal \\(5\\) places right." },
    { question: "Write \\(8.82 \\times  10^{-4}\\) as an ordinary number.", options: ["\\(0.000882\\)", "\\(0.00882\\)", "\\(0.0000882\\)", "\\(8820\\)"], answer: "\\(0.000882\\)", explanation: "Move the decimal \\(4\\) places left." },
    { question: "Write \\(6.806 \\times  10^{-6}\\) as an ordinary number.", options: ["\\(0.000006806\\)", "\\(0.00006806\\)", "\\(0.0000006806\\)", "\\(6{,}806{,}000\\)"], answer: "\\(0.000006806\\)", explanation: "Move the decimal \\(6\\) places left." },
    { question: "Which scientific notation represents \\(902{,}000{,}000\\)?", options: ["\\(9.02 \\times  10^{8}\\)", "\\(9.02 \\times  10^{7}\\)", "\\(90.2 \\times  10^{7}\\)", "\\(9.02 \\times  10^{-8}\\)"], answer: "\\(9.02 \\times  10^{8}\\)", explanation: "Move the decimal \\(8\\) places left to obtain \\(9.02\\)." },
    { question: "Write \\(4 \\times  10^{-5}\\) as an ordinary number.", options: ["\\(0.00004\\)", "\\(0.0004\\)", "\\(0.000004\\)", "\\(40{,}000\\)"], answer: "\\(0.00004\\)", explanation: "Move the decimal in \\(4\\) five places left." },
  ],
);

export const significantSlideSteps: GuidedLessonStep[] = [
  ...section(
    "Adding and subtracting measurements",
    "For measurements, round an addition or subtraction result to the fewest decimal places in the values. Calculate first, then round.",
    [
      { expression: "\\(12.11 + 0.3 = 12.4\\)", detail: "\\(0.3\\) has only one decimal place.", steps: ["Calculate: \\(12.11 + 0.3 = 12.41\\).", "\\(12.11\\) has \\(2\\) decimal places and \\(0.3\\) has \\(1\\).", "Round \\(12.41\\) to \\(1\\) decimal place: \\(12.4\\)."] },
      { expression: "\\(8.42 - 1.2 = 7.2\\)", detail: "Use decimal places, not the fewest significant figures.", steps: ["Calculate: \\(8.42 - 1.2 = 7.22\\).", "The least precise decimal place is \\(1\\) decimal place, from \\(1.2\\).", "Round \\(7.22\\) to \\(1\\) decimal place: \\(7.2\\)."] },
    ],
    [
      { question: "Calculate \\(2.34 + 1.2\\) using the decimal-place rule.", options: ["\\(3.5\\)", "\\(3.54\\)", "\\(3.6\\)", "\\(4\\)"], answer: "\\(3.5\\)", explanation: "\\(2.34 + 1.2 = 3.54\\); round to \\(1\\) decimal place." },
      { question: "Calculate \\(5.67 - 2.1\\) using the decimal-place rule.", options: ["\\(3.6\\)", "\\(3.57\\)", "\\(3.5\\)", "\\(4\\)"], answer: "\\(3.6\\)", explanation: "\\(5.67 - 2.1 = 3.57\\); round to \\(1\\) decimal place." },
      { question: "What determines the rounding place for adding measured values?", options: ["The fewest decimal places", "The fewest significant figures", "The largest value", "The most decimal places"], answer: "The fewest decimal places", explanation: "For addition and subtraction, use the least number of decimal places in the measurements." },
      { question: "Calculate \\(4.23 + 0.56\\) using the decimal-place rule.", options: ["\\(4.79\\)", "\\(4.8\\)", "\\(4.7\\)", "\\(5\\)"], answer: "\\(4.79\\)", explanation: "Both values have \\(2\\) decimal places, so keep \\(4.79\\) to \\(2\\) decimal places." },
      { question: "Calculate \\(10.5 - 2.36\\) using the decimal-place rule.", options: ["\\(8.1\\)", "\\(8.14\\)", "\\(8.2\\)", "\\(8\\)"], answer: "\\(8.1\\)", explanation: "\\(10.5 - 2.36 = 8.14\\), which rounds to \\(8.1\\) at \\(1\\) decimal place." },
    ],
  ),
  ...section(
    "Multiplying and dividing measurements",
    "For measured values, round a product or quotient to the fewest significant figures in the values. Scientific notation makes the precision clear.",
    [
      { expression: "\\(78 \\times  110 = 8.6 \\times  10^{3}\\)", detail: "For this example, treat \\(110\\) as having \\(2\\) significant figures.", steps: ["Calculate: \\(78 \\times  110 = 8580\\).", "\\(78\\) has \\(2\\) significant figures; here \\(110\\) is also given to \\(2\\) significant figures.", "Round \\(8580\\) to \\(2\\) significant figures and write \\(8.6 \\times  10^{3}\\)." , "For a whole number like \\(110\\), use notation such as \\(1.1 \\times  10^{2}\\) when you need to show the intended precision clearly."] },
      { expression: "\\(1440 \\div  12 = 1.2 \\times  10^{2}\\)", detail: "Express the result with \\(2\\) significant figures.", steps: ["Calculate: \\(1440 \\div  12 = 120\\).", "\\(12\\) has \\(2\\) significant figures; here \\(1440\\) is given to \\(3\\) significant figures.", "Write the result to \\(2\\) significant figures as \\(1.2 \\times  10^{2}\\)." ] },
    ],
    [
      { question: "Calculate \\(2.4 \\times  3.12\\) to the appropriate significant figures.", options: ["\\(7.5\\)", "\\(7.49\\)", "\\(7.488\\)", "\\(8\\)"], answer: "\\(7.5\\)", explanation: "\\(2.4\\) has \\(2\\) significant figures. \\(2.4 \\times  3.12 = 7.488\\), which rounds to \\(7.5\\)." },
      { question: "Calculate \\(8.40 \\div  2.0\\) to the appropriate significant figures.", options: ["\\(4.2\\)", "\\(4.20\\)", "\\(4\\)", "\\(4.200\\)"], answer: "\\(4.2\\)", explanation: "\\(2.0\\) has \\(2\\) significant figures, so write the quotient with \\(2\\) significant figures." },
      { question: "What determines the precision for a product of measurements?", options: ["The fewest significant figures", "The fewest decimal places", "The greatest value", "The most significant figures"], answer: "The fewest significant figures", explanation: "For multiplication and division, use the fewest significant figures among the measured values." },
      { question: "Calculate \\(1.2 \\times  2.3\\) to the appropriate significant figures.", options: ["\\(2.8\\)", "\\(2.76\\)", "\\(2.7\\)", "\\(3\\)"], answer: "\\(2.8\\)", explanation: "\\(1.2 \\times  2.3 = 2.76\\); round to \\(2\\) significant figures." },
      { question: "Calculate \\(6.00 \\div  3.0\\) to the appropriate significant figures.", options: ["\\(2.0\\)", "\\(2\\)", "\\(2.00\\)", "\\(0.20\\)"], answer: "\\(2.0\\)", explanation: "The least precise input has \\(2\\) significant figures, so show the result as \\(2.0\\)." },
    ],
  ),
];

export const numberSetsSlideSteps: GuidedLessonStep[] = section(
  "More recurring decimal examples",
  "Repeating blocks can have several digits, and recurring decimals can be greater than \\(1\\). Align matching recurring parts, then subtract.",
  [
    { expression: "\\(0.427427\\)… = \\(\\dfrac{427}{999}\\)", detail: "The repeating block \\(427\\) has three digits.", steps: ["Let \\(x = 0.427427\\)….", "Multiply by \\(1000\\): \\(1000x = 427.427427\\)….", "Subtract x: \\(999x = 427\\).", "Divide: \\(x = \\dfrac{427}{999}\\)."] },
    { expression: "\\(1.777\\)… = \\(\\dfrac{16}{9}\\)", detail: "The whole-number part does not change the subtraction method.", steps: ["Let \\(x = 1.777\\)….", "Multiply by \\(10\\): \\(10x = 17.777\\)….", "Subtract x: \\(9x = 16\\).", "Divide: \\(x = \\dfrac{16}{9}\\)."] },
  ],
  [
    { question: "Let \\(x = 0.427427\\)…. What is \\(1000x - x\\)?", options: ["\\(427\\)", "\\(42.7\\)", "\\(999\\)", "\\(0\\)"], answer: "\\(427\\)", explanation: "\\(1000x = 427.427427\\)…, so subtracting x cancels the recurring part." },
    { question: "What is \\(0.121212\\)… as a fraction?", options: ["\\(\\dfrac{4}{33}\\)", "\\(\\dfrac{12}{100}\\)", "\\(\\dfrac{1}{12}\\)", "\\(\\dfrac{12}{90}\\)"], answer: "\\(\\dfrac{4}{33}\\)", explanation: "\\(99x = 12\\), so \\(x = \\dfrac{12}{99} = \\dfrac{4}{33}\\)." },
    { question: "Let \\(x = 1.777\\)…. What is \\(10x - x\\)?", options: ["\\(16\\)", "\\(17\\)", "\\(9\\)", "\\(1.7\\)"], answer: "\\(16\\)", explanation: "\\(10x = 17.777\\)… and \\(x = 1.777\\)…; subtract to get \\(16\\)." },
    { question: "What is \\(1.777\\)… as a fraction?", options: ["\\(\\dfrac{16}{9}\\)", "\\(\\dfrac{7}{9}\\)", "\\(\\dfrac{17}{10}\\)", "\\(\\dfrac{16}{10}\\)"], answer: "\\(\\dfrac{16}{9}\\)", explanation: "\\(10x - x = 16\\), so \\(9x = 16\\) and \\(x = \\dfrac{16}{9}\\)." },
    { question: "How many places do you move the decimal to shift one block of \\(427\\) in \\(0.427427\\)…?", options: ["\\(3\\)", "\\(1\\)", "\\(2\\)", "\\(4\\)"], answer: "\\(3\\)", explanation: "The block \\(427\\) contains three digits, so multiply by \\(1000\\)." },
  ],
);

export const errorSlideSteps: GuidedLessonStep[] = [
  ...section(
    "Accuracy and precision",
    "Accuracy describes how close a measurement is to an accepted value. Precision describes how close repeated measurements are to one another; precise measurements can still be inaccurate.",
    [
      { expression: "Accepted: \\(10\\) cm; measurements: \\(9.9\\), \\(10.0\\), \\(10.1\\) cm", detail: "These measurements are close to the accepted value and close to each other.", steps: ["Compare the measurements with \\(10\\) cm: each is within \\(0.1\\) cm.", "They are accurate because they are close to the accepted value.", "They are also close to one another, so the repeated measurements are precise."] },
      { expression: "Accepted: \\(10\\) cm; measurements: \\(8.0\\), \\(8.0\\), \\(8.1\\) cm", detail: "A tight group need not be accurate.", steps: ["The measurements are close to one another, so they are precise.", "They are about \\(2\\) cm away from the accepted value of \\(10\\) cm.", "They are precise but not accurate." ] },
    ],
    [
      { question: "What does accuracy describe?", options: ["Closeness to the accepted value", "Closeness of repeated measurements to one another", "The number of measurements", "The size of a measurement"], answer: "Closeness to the accepted value", explanation: "Accuracy compares a measurement with the accepted value." },
      { question: "What does precision describe for repeated measurements?", options: ["How close the measurements are to one another", "How close one measurement is to the accepted value", "How many units were used", "Whether the measurement is positive"], answer: "How close the measurements are to one another", explanation: "A precise group of repeated measurements is tightly clustered." },
      { question: "Accepted value \\(20\\); measurements \\(18.0\\), \\(18.0\\), \\(18.1\\). Which description fits?", options: ["Precise but not accurate", "Accurate and precise", "Accurate but not precise", "Neither measurable nor real"], answer: "Precise but not accurate", explanation: "The measurements are close together but not close to \\(20\\)." },
      { question: "Accepted value \\(10\\); measurements \\(9.9\\), \\(10.0\\), \\(10.1\\). Which description fits?", options: ["Accurate and precise", "Precise but not accurate", "Neither accurate nor precise", "Only accurate when identical"], answer: "Accurate and precise", explanation: "The measurements are close together and close to the accepted value." },
      { question: "Can repeated measurements be precise but inaccurate?", options: ["Yes", "No", "Only if the accepted value is zero", "Only if they are negative"], answer: "Yes", explanation: "They can cluster tightly while being far from the accepted value." },
    ],
  ),
  ...section(
    "Bounds for a calculated area",
    "When positive lengths have bounds, multiply the lower bounds for the area’s lower bound and the upper bounds for its upper bound. Keep enough precision to avoid changing the interval.",
    [
      { expression: "\\(6.4 m \\times  4.3 m\\), each to the nearest \\(0.1 m\\)", detail: "Find the bounds of each dimension before calculating the area.", steps: ["Find the length bounds: \\(6.35\\) ≤ length < \\(6.45 m\\).", "Find the width bounds: \\(4.25\\) ≤ width < \\(4.35 m\\).", "Multiply the lower bounds: \\(6.35 \\times  4.25 = 26.9875\\) \\(m^{2}\\).", "Multiply the upper bounds: \\(6.45 \\times  4.35 = 28.0575\\) \\(m^{2}\\).", "Write the exact interval: \\(26.9875\\) ≤ area < \\(28.0575\\) \\(m^{2}\\)."] },
      { expression: "\\(2 m \\times  3 m\\), each to the nearest metre", detail: "Both lengths are positive, so the smallest area uses both lower bounds.", steps: ["The bounds are \\(1.5\\) ≤ length < \\(2.5 m\\) and \\(2.5\\) ≤ width < \\(3.5 m\\).", "Lower area bound: \\(1.5 \\times  2.5 = 3.75\\) \\(m^{2}\\).", "Upper area bound: \\(2.5 \\times  3.5 = 8.75\\) \\(m^{2}\\).", "Therefore \\(3.75\\) ≤ area < \\(8.75\\) \\(m^{2}\\)."] },
    ],
    [
      { question: "A mass is \\(70\\) kg to the nearest \\(10\\) kg. What is its lower bound?", options: ["\\(65\\) kg", "\\(69.5\\) kg", "\\(60\\) kg", "\\(75\\) kg"], answer: "\\(65\\) kg", explanation: "Half the rounding unit is \\(5\\) kg, so the lower bound is \\(70 - 5 = 65\\) kg." },
      { question: "A length is \\(12.5\\) cm to the nearest \\(0.1\\) cm. What is its upper bound?", options: ["\\(12.55\\) cm", "\\(12.6\\) cm", "\\(12.45\\) cm", "\\(13\\) cm"], answer: "\\(12.55\\) cm", explanation: "Add half of \\(0.1\\) cm: \\(12.5 + 0.05 = 12.55\\) cm." },
      { question: "For positive lengths, which bounds give the lower bound for area?", options: ["Both lower bounds", "Both upper bounds", "One lower and one upper", "The rounded measurements"], answer: "Both lower bounds", explanation: "With positive lengths, multiplying the smallest possible length and width gives the smallest area." },
      { question: "A floor has length bounds \\(6.35\\) to \\(6.45 m\\) and width bounds \\(4.25\\) to \\(4.35 m\\). What is its lower area bound?", options: ["\\(26.9875\\) \\(m^{2}\\)", "\\(28.0575\\) \\(m^{2}\\)", "\\(27.52\\) \\(m^{2}\\)", "\\(27.6225\\) \\(m^{2}\\)"], answer: "\\(26.9875\\) \\(m^{2}\\)", explanation: "Multiply the lower bounds: \\(6.35 \\times  4.25 = 26.9875\\) \\(m^{2}\\)." },
      { question: "For those same floor dimensions, what is the upper area bound?", options: ["\\(28.0575\\) \\(m^{2}\\)", "\\(26.9875\\) \\(m^{2}\\)", "\\(27.52\\) \\(m^{2}\\)", "\\(28.05\\) \\(m^{2}\\)"], answer: "\\(28.0575\\) \\(m^{2}\\)", explanation: "Multiply the upper bounds: \\(6.45 \\times  4.35 = 28.0575\\) \\(m^{2}\\). The upper bound is excluded." },
    ],
  ),
];

export const nthTermSlideSteps: GuidedLessonStep[] = section(
  "Alternating and fractional patterns",
  "Sequences can have alternating signs or fractions. Look at the signs and at the numerator and denominator separately, then test your rule at several positions.",
  [
    { expression: "\\(2\\), \\(-4\\), \\(8\\), \\(-16\\), … → \\(u_{n} = 2(-2)\\)⁽ⁿ⁻¹⁾", detail: "This sequence multiplies by \\(-2\\) each time.", steps: ["The first term is \\(2\\).", "Each term is multiplied by \\(-2\\): \\(2\\), \\(-4\\), \\(8\\), \\(-16\\).", "After \\(n - 1\\) multiplications, \\(u_{n} = 2(-2)\\)⁽ⁿ⁻¹⁾.", "Check \\(n = 3\\): \\(2(-2)^{2}\\) = \\(8\\)."] },
    { expression: "\\(\\dfrac{1}{2}\\), \\(\\dfrac{2}{3}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{4}{5}\\), … → \\(u_{n} = \\dfrac{n}{(n + 1)}\\)", detail: "Look for a position rule for the numerator and denominator.", steps: ["The numerators are \\(1\\), \\(2\\), \\(3\\), \\(4\\), so the numerator is n.", "The denominators are \\(2\\), \\(3\\), \\(4\\), \\(5\\), each one more than n.", "The rule is \\(\\dfrac{n}{(n + 1)}\\). Check \\(n = 3\\): \\(\\dfrac{3}{(3 + 1)} = \\dfrac{3}{4}\\)."] },
  ],
  [
    { question: "What is the next term of \\(2\\), \\(-4\\), \\(8\\), \\(-16\\), …?", options: ["\\(32\\)", "\\(-32\\)", "\\(-18\\)", "\\(16\\)"], answer: "\\(32\\)", explanation: "Multiply \\(-16\\) by \\(-2\\) to get \\(32\\)." },
    { question: "Which rule generates \\(2\\), \\(-4\\), \\(8\\), \\(-16\\), … when n starts at \\(1\\)?", options: ["\\(2(-2)\\)⁽ⁿ⁻¹⁾", "\\(2(-2)\\)ⁿ", "\\(2n - 4\\)", "\\(2 \\times  2^{n-1}\\)"], answer: "\\(2(-2)\\)⁽ⁿ⁻¹⁾", explanation: "The first term is \\(2\\) and the ratio is \\(-2\\), so use \\(2(-2)\\)⁽ⁿ⁻¹⁾." },
    { question: "What is the fourth term of \\(u_{n} = \\dfrac{n}{(n + 1)}\\)?", options: ["\\(\\dfrac{4}{5}\\)", "\\(\\dfrac{3}{4}\\)", "\\(\\dfrac{5}{4}\\)", "\\(\\dfrac{4}{4}\\)"], answer: "\\(\\dfrac{4}{5}\\)", explanation: "Substitute \\(n = 4\\): \\(\\dfrac{4}{(4 + 1)} = \\dfrac{4}{5}\\)." },
    { question: "Which sign does (\\(-1)\\)ⁿ have when \\(n = 3\\)?", options: ["Negative", "Positive", "Zero", "It depends on the next term"], answer: "Negative", explanation: "(\\(-1)^{3}\\) = \\(-1\\), so its sign is negative." },
    { question: "Which rule generates \\(\\dfrac{1}{2}\\), \\(\\dfrac{2}{3}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{4}{5}\\), …?", options: ["\\(\\dfrac{n}{(n + 1)}\\)", "\\(\\dfrac{(n + 1)}{n}\\)", "\\(\\dfrac{n}{2}\\)", "\\(\\dfrac{1}{(n + 1)}\\)"], answer: "\\(\\dfrac{n}{(n + 1)}\\)", explanation: "At position n the numerator is n and the denominator is \\(n + 1\\)." },
  ],
);
