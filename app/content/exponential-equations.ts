import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";
import { question as q } from "./curriculum-questions";

export const exponentialEquationSteps: GuidedLessonStep[] = [
  ...section(
    "Reading powers and multiplying",
    "A power tells us how many times a base is multiplied by itself. To multiply powers with the same base, add the exponents: \\(a^m a^n=a^{m+n}\\).",
    [
      {
        expression: "\\(3^2=3\\times3=9\\)",
        detail: "The base is \\(3\\) and the exponent is \\(2\\).",
        steps: ["Multiply two factors of \\(3\\): \\(3\\times3=9\\).", "The exponent counts the factors, not the answer’s digits."],
      },
      {
        expression: "\\(2^2\\times2^3=2^5=32\\)",
        detail: "Both powers have base \\(2\\).",
        steps: ["Add the exponents: \\(2+3=5\\).", "The result is \\(2^5=32\\).", "Keep the base unchanged."],
      },
    ],
    [
      q("What is \\(3^2\\)?", ["\\(9\\)", "\\(6\\)", "\\(8\\)", "\\(5\\)"], "\\(9\\)", "\\(3^2=3\\times3=9\\)."),
      q("What is \\(2^3\\)?", ["\\(8\\)", "\\(6\\)", "\\(9\\)", "\\(5\\)"], "\\(8\\)", "\\(2^3=2\\times2\\times2=8\\)."),
      q("Simplify \\(2^2\\times2^3\\).", ["\\(2^5\\)", "\\(2^6\\)", "\\(4^5\\)", "\\(2^1\\)"], "\\(2^5\\)", "Add exponents \\(2+3=5\\)."),
      q("Simplify \\(5^1\\times5^2\\).", ["\\(5^3\\)", "\\(5^2\\)", "\\(10^3\\)", "\\(5^1\\)"], "\\(5^3\\)", "The bases match, so add \\(1+2=3\\)."),
      q("What is \\(4^3\\)?", ["\\(64\\)", "\\(12\\)", "\\(16\\)", "\\(81\\)"], "\\(64\\)", "\\(4^3=4\\times4\\times4=64\\)."),
    ],
  ),
  ...section(
    "Division, powers of powers and negative exponents",
    "For the same non-zero base, divide by subtracting exponents. To raise a power to another power, multiply exponents. A negative exponent gives a reciprocal.",
    [
      {
        expression: "\\(5^4\\div5^2=5^{4-2}=5^2=25\\)",
        detail: "The bases match, so subtract the denominator exponent.",
        steps: ["Subtract \\(4-2=2\\).", "Calculate \\(5^2=25\\)."],
      },
      {
        expression: "\\((3^2)^2=3^4=81,\\qquad 5^{-3}=\\frac{1}{125}\\)",
        detail: "Use multiplication for a power of a power; use a reciprocal for a negative exponent.",
        steps: ["\\((3^2)^2=3^{2\\cdot2}=3^4=81\\).", "\\(5^{-3}=\\frac{1}{5^3}=\\frac{1}{125}\\).", "For non-zero \\(a\\), \\(a^0=1\\)."],
      },
    ],
    [
      q("Simplify \\(5^4\\div5^2\\).", ["\\(5^2\\)", "\\(5^6\\)", "\\(5^8\\)", "\\(1\\)"], "\\(5^2\\)", "Subtract the exponents: \\(4-2=2\\)."),
      q("Simplify \\((3^2)^2\\).", ["\\(3^4\\)", "\\(3^2\\)", "\\(3^0\\)", "\\(6^2\\)"], "\\(3^4\\)", "Multiply the exponents: \\(2\\cdot2=4\\)."),
      q("What is \\(5^{-3}\\)?", ["\\(\\frac{1}{125}\\)", "\\(-125\\)", "\\(125\\)", "\\(\\frac{1}{15}\\)"], "\\(\\frac{1}{125}\\)", "A negative exponent gives the reciprocal: \\(\\frac{1}{5^3}=\\frac{1}{125}\\)."),
      q("What is \\(7^0\\)?", ["\\(1\\)", "\\(0\\)", "\\(7\\)", "\\(-1\\)"], "\\(1\\)", "A non-zero base to power zero equals \\(1\\)."),
      q("Simplify \\(2^2\\times3^2\\).", ["\\(6^2\\)", "\\(5^4\\)", "\\(6^4\\)", "\\(5^2\\)"], "\\(6^2\\)", "With equal exponents, \\(2^2 3^2=(2\\cdot3)^2=6^2\\)."),
    ],
  ),
  ...section(
    "Equal bases and exponents",
    "If \\(b^x=b^y\\), where \\(b>0\\) and \\(b\\ne1\\), the exponents are equal: \\(x=y\\). Rewrite both sides with the same base first.",
    [
      {
        expression: "\\(2^x=4\\quad\\Rightarrow\\quad x=2\\)",
        detail: "Write \\(4\\) as a power of \\(2\\).",
        steps: ["Since \\(4=2^2\\), write \\(2^x=2^2\\).", "The bases match, so \\(x=2\\).", "Check: \\(2^2=4\\)."],
      },
      {
        expression: "\\(3^{x-1}=27\\quad\\Rightarrow\\quad x=4\\)",
        detail: "The matching exponents form a linear equation.",
        steps: ["Rewrite \\(27=3^3\\), giving \\(3^{x-1}=3^3\\).", "Equate exponents: \\(x-1=3\\).", "Solve: \\(x=4\\)."],
      },
    ],
    [
      q("Solve \\(12^x=12^2\\).", ["\\(x=2\\)", "\\(x=12\\)", "\\(x=24\\)", "\\(x=1\\)"], "\\(x=2\\)", "The bases are equal and valid, so the exponents match."),
      q("Solve \\(2^x=8\\).", ["\\(x=3\\)", "\\(x=2\\)", "\\(x=4\\)", "\\(x=8\\)"], "\\(x=3\\)", "\\(8=2^3\\), so \\(x=3\\)."),
      q("Solve \\(3^{x-1}=27\\).", ["\\(x=4\\)", "\\(x=3\\)", "\\(x=2\\)", "\\(x=1\\)"], "\\(x=4\\)", "\\(27=3^3\\), so \\(x-1=3\\)."),
      q("If \\(5^{2x}=5^6\\), what equation follows?", ["\\(2x=6\\)", "\\(2x=5\\)", "\\(x=6\\)", "\\(5x=6\\)"], "\\(2x=6\\)", "With equal valid bases, equate the exponents."),
      q("Why does the equal-exponent rule exclude base \\(1\\)?", ["Every power of \\(1\\) equals \\(1\\)", "\\(1\\) is negative", "\\(1\\) has no powers", "\\(1^0=0\\)"], "Every power of \\(1\\) equals \\(1\\)", "\\(1^x=1^y\\) does not imply \\(x=y\\)."),
    ],
  ),
  ...section(
    "Rewrite both sides with one base",
    "When bases look different, express them as powers of a common base. Apply the power-of-a-power rule, then equate exponents.",
    [
      {
        expression: "\\(4^{2x}=64\\quad\\Rightarrow\\quad x=\\frac{3}{2}\\)",
        detail: "Both \\(4\\) and \\(64\\) are powers of \\(2\\).",
        steps: ["Rewrite \\(4=2^2\\) and \\(64=2^6\\).", "Then \\((2^2)^{2x}=2^6\\), so \\(2^{4x}=2^6\\).", "Equate: \\(4x=6\\), giving \\(x=\\frac{3}{2}\\)."],
      },
      {
        expression: "\\(125^{x-1}=25^{x+3}\\quad\\Rightarrow\\quad x=9\\)",
        detail: "Both sides can be rewritten in base \\(5\\).",
        steps: ["Use \\(125=5^3\\) and \\(25=5^2\\).", "\\(5^{3(x-1)}=5^{2(x+3)}\\).", "Equate: \\(3x-3=2x+6\\).", "Solve \\(x=9\\); substituting gives matching exponents."],
      },
    ],
    [
      q("Write \\(64\\) as a power of \\(2\\).", ["\\(2^6\\)", "\\(2^4\\)", "\\(2^8\\)", "\\(2^3\\)"], "\\(2^6\\)", "\\(2^6=64\\)."),
      q("Rewrite \\(4^{2x}\\) using base \\(2\\).", ["\\(2^{4x}\\)", "\\(2^{2x}\\)", "\\(2^{x+2}\\)", "\\(2^{8x}\\)"], "\\(2^{4x}\\)", "\\(4^{2x}=(2^2)^{2x}=2^{4x}\\)."),
      q("Solve \\(4^{2x}=64\\).", ["\\(x=\\frac32\\)", "\\(x=3\\)", "\\(x=2\\)", "\\(x=6\\)"], "\\(x=\\frac32\\)", "\\(2^{4x}=2^6\\), so \\(4x=6\\)."),
      q("Rewrite \\(125^{x-1}\\) using base \\(5\\).", ["\\(5^{3(x-1)}\\)", "\\(5^{x-1}\\)", "\\(5^{2(x-1)}\\)", "\\(5^{3x-1}\\)"], "\\(5^{3(x-1)}\\)", "\\(125=5^3\\), so multiply the exponents."),
      q("Solve \\(3^{x+1}=3^4\\).", ["\\(x=3\\)", "\\(x=4\\)", "\\(x=5\\)", "\\(x=1\\)"], "\\(x=3\\)", "Equate exponents: \\(x+1=4\\)."),
    ],
  ),
  ...section(
    "Combining powers and substitution",
    "Use exponent laws before equating exponents. When an equation contains both \\(a^{2x}\\) and \\(a^x\\), substitution can turn it into a quadratic.",
    [
      {
        expression: "\\(3^{4x}=27^{x+3}\\quad\\Rightarrow\\quad x=9\\)",
        detail: "Rewrite the right side in base \\(3\\).",
        steps: ["\\(27^{x+3}=3^{3(x+3)}\\).", "Equate \\(4x=3x+9\\).", "Solve \\(x=9\\)."],
      },
      {
        expression: "\\(2^{2x}-5(2^x)+4=0\\)",
        detail: "Let \\(y=2^x\\), so \\(2^{2x}=y^2\\).",
        steps: ["The equation becomes \\(y^2-5y+4=0\\).", "Factor: \\((y-1)(y-4)=0\\), so \\(y=1\\) or \\(y=4\\).", "Return to \\(2^x=1\\) or \\(2^x=4\\): \\(x=0\\) or \\(x=2\\).", "Check both values in the original equation."],
      },
    ],
    [
      q("Rewrite \\(27^{x+3}\\) with base \\(3\\).", ["\\(3^{3(x+3)}\\)", "\\(3^{x+3}\\)", "\\(3^{3x+3}\\)", "\\(3^{2(x+3)}\\)"], "\\(3^{3(x+3)}\\)", "\\(27=3^3\\)."),
      q("Solve \\(3^{4x}=27^{x+3}\\).", ["\\(x=9\\)", "\\(x=3\\)", "\\(x=1\\)", "\\(x=-9\\)"], "\\(x=9\\)", "\\(4x=3(x+3)\\), so \\(x=9\\)."),
      q("If \\(y=2^x\\), what is \\(2^{2x}\\)?", ["\\(y^2\\)", "\\(2y\\)", "\\(y+2\\)", "\\(2^y\\)"], "\\(y^2\\)", "\\(2^{2x}=(2^x)^2=y^2\\)."),
      q("Factor \\(y^2-5y+4\\).", ["\\((y-1)(y-4)\\)", "\\((y+1)(y+4)\\)", "\\((y-2)^2\\)", "\\((y+1)(y-4)\\)"], "\\((y-1)(y-4)\\)", "Expanding gives \\(y^2-5y+4\\)."),
      q("If \\(2^x=4\\), what is \\(x\\)?", ["\\(2\\)", "\\(4\\)", "\\(1\\)", "\\(0\\)"], "\\(2\\)", "\\(4=2^2\\)."),
    ],
  ),
  ...finalCheck([
    q("Solve \\(125^{x-1}=25^{x+3}\\).", ["\\(x=9\\)", "\\(x=3\\)", "\\(x=-9\\)", "\\(x=1\\)"], "\\(x=9\\)", "Rewrite both sides in base \\(5\\), then solve \\(3x-3=2x+6\\)."),
    q("Solve \\(2^x=8^3\\).", ["\\(x=9\\)", "\\(x=3\\)", "\\(x=6\\)", "\\(x=24\\)"], "\\(x=9\\)", "\\(8^3=(2^3)^3=2^9\\)."),
    q("For \\(2^{2x}-5(2^x)+4=0\\), which values of \\(x\\) solve the equation?", ["\\(0\\) and \\(2\\)", "\\(1\\) and \\(4\\)", "\\(1\\) and \\(2\\)", "\\(0\\) only"], "\\(0\\) and \\(2\\)", "The substitution \\(y=2^x\\) gives \\(y=1\\) or \\(4\\), so \\(x=0\\) or \\(2\\)."),
  ]),
];
