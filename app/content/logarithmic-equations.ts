import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";
import { question as q } from "./curriculum-questions";

export const logarithmicEquationSteps: GuidedLessonStep[] = [
  ...section(
    "What a logarithm means",
    "A logarithm asks for an exponent: \\(\\log_b x=y\\) means \\(b^y=x\\). For real logarithms, \\(b>0\\), \\(b\\ne1\\), and \\(x>0\\).",
    [
      {
        expression: "\\(\\log_2 32=5\\quad\\Longleftrightarrow\\quad 2^5=32\\)",
        detail: "Ask: what power of \\(2\\) gives \\(32\\)?",
        steps: ["The base is \\(2\\) and the argument is \\(32\\).", "Since \\(2^5=32\\), the exponent is \\(5\\).", "Therefore \\(\\log_2 32=5\\)."],
      },
      {
        expression: "\\(\\log_7\\left(\\frac{1}{49}\\right)=-2\\)",
        detail: "A logarithm can have a negative value, but its argument must be positive.",
        steps: ["\\(7^{-2}=\\frac{1}{7^2}=\\frac{1}{49}\\).", "So the exponent needed is \\(-2\\), giving \\(\\log_7(\\frac{1}{49})=-2\\)."],
      },
    ],
    [
      q("What does \\(\\log_2 8\\) ask?", ["The power of \\(2\\) that gives \\(8\\)", "The product \\(2\\times8\\)", "The difference \\(8-2\\)", "The power of \\(8\\) that gives \\(2\\)"], "The power of \\(2\\) that gives \\(8\\)", "The base is \\(2\\), and the logarithm asks for its exponent."),
      q("Evaluate \\(\\log_2 8\\).", ["\\(3\\)", "\\(4\\)", "\\(2\\)", "\\(8\\)"], "\\(3\\)", "\\(2^3=8\\)."),
      q("Evaluate \\(\\log_5 125\\).", ["\\(3\\)", "\\(5\\)", "\\(2\\)", "\\(25\\)"], "\\(3\\)", "\\(5^3=125\\)."),
      q("Which exponential equation matches \\(\\log_5 125=3\\)?", ["\\(5^3=125\\)", "\\(3^5=125\\)", "\\(125^3=5\\)", "\\(5^{125}=3\\)"], "\\(5^3=125\\)", "The base \\(5\\) raised to exponent \\(3\\) gives \\(125\\)."),
      q("What must the argument of a real logarithm be?", ["Positive", "Negative", "Zero", "An integer greater than \\(1\\)"], "Positive", "A real logarithm requires a positive argument."),
    ],
  ),
  ...section(
    "Evaluate and convert logarithms",
    "Use known powers to move between exponential and logarithmic forms. Common logarithms use base \\(10\\); \\(\\ln\\) uses base \\(e\\).",
    [
      {
        expression: "\\(5^3=125\\quad\\Longleftrightarrow\\quad\\log_5 125=3\\)",
        detail: "The base stays the same; the exponent becomes the logarithm’s value.",
        steps: ["Start with \\(5^3=125\\).", "Keep base \\(5\\), use \\(125\\) as the argument, and write the exponent \\(3\\) as the result."],
      },
      {
        expression: "\\(\\log_4 64=3,\\qquad \\ln(e^3)=3\\)",
        detail: "A logarithm reverses an exponent with the same base.",
        steps: ["Since \\(4^3=64\\), \\(\\log_4 64=3\\).", "Since \\(\\ln\\) has base \\(e\\), \\(\\ln(e^3)=3\\).", "Also, for a valid base, \\(\\log_b 1=0\\) because \\(b^0=1\\)."],
      },
    ],
    [
      q("Write \\(10^2=100\\) in logarithmic form.", ["\\(\\log_{10}100=2\\)", "\\(\\log_2 100=10\\)", "\\(\\log_{100}10=2\\)", "\\(\\log_{10}2=100\\)"], "\\(\\log_{10}100=2\\)", "The base is \\(10\\), the argument is \\(100\\), and the exponent is \\(2\\)."),
      q("Evaluate \\(\\log_3 243\\).", ["\\(5\\)", "\\(3\\)", "\\(4\\)", "\\(6\\)"], "\\(5\\)", "\\(3^5=243\\)."),
      q("Evaluate \\(\\log_6(\\frac{1}{216})\\).", ["\\(-3\\)", "\\(3\\)", "\\(-2\\)", "\\(0\\)"], "\\(-3\\)", "\\(6^{-3}=\\frac{1}{216}\\)."),
      q("Evaluate \\(\\log_7 1\\).", ["\\(0\\)", "\\(1\\)", "\\(7\\)", "\\(-1\\)"], "\\(0\\)", "\\(7^0=1\\)."),
      q("What base does \\(\\ln x\\) use?", ["\\(e\\)", "\\(10\\)", "\\(2\\)", "\\(x\\)"], "\\(e\\)", "The natural logarithm has base \\(e\\)."),
    ],
  ),
  ...section(
    "Product and quotient laws",
    "For positive arguments and a valid base: \\(\\log_b M+\\log_b N=\\log_b(MN)\\), and \\(\\log_b M-\\log_b N=\\log_b(\\frac{M}{N})\\).",
    [
      {
        expression: "\\(\\log 2+\\log 3=\\log 6\\)",
        detail: "Both logarithms are common logarithms with the same base.",
        steps: ["Use the product law to combine the sum.", "Multiply the arguments: \\(2\\times3=6\\).", "Write \\(\\log 6\\)."],
      },
      {
        expression: "\\(\\log_2 8-\\log_2 2=\\log_2 4=2\\)",
        detail: "Subtracting logs with the same base divides their arguments.",
        steps: ["Combine using the quotient law: \\(\\log_2(\\frac{8}{2})\\).", "Simplify \\(\\frac{8}{2}=4\\).", "Since \\(2^2=4\\), the result is \\(2\\)."],
      },
    ],
    [
      q("Combine \\(\\log_2 3+\\log_2 4\\).", ["\\(\\log_2 12\\)", "\\(\\log_2 7\\)", "\\(\\log_2(\\frac{3}{4})\\)", "\\(\\log_4 12\\)"], "\\(\\log_2 12\\)", "Add logs of the same base by multiplying the arguments."),
      q("Combine \\(\\log_5 20-\\log_5 4\\).", ["\\(\\log_5 5\\)", "\\(\\log_5 16\\)", "\\(\\log_5 80\\)", "\\(\\log_4 5\\)"], "\\(\\log_5 5\\)", "Divide the arguments: \\(\\frac{20}{4}=5\\)."),
      q("What is \\(\\log_2 8-\\log_2 2\\)?", ["\\(2\\)", "\\(1\\)", "\\(3\\)", "\\(4\\)"], "\\(2\\)", "Combine to \\(\\log_2 4=2\\)."),
      q("Can \\(\\log_b(M+N)\\) generally be replaced by \\(\\log_b M+\\log_b N\\)?", ["No", "Yes, always", "Only when \\(M=N\\)", "Only for base \\(10\\)"], "No", "The product law applies to \\(MN\\), not a sum inside a logarithm."),
      q("For the product and quotient laws, what must the log bases be?", ["The same valid base", "Any two negative bases", "One base must be \\(1\\)", "Different bases"], "The same valid base", "The laws combine logarithms with the same valid base and positive arguments."),
    ],
  ),
  ...section(
    "Powers and change of base",
    "For a positive argument, \\(\\log_b(M^p)=p\\log_b M\\). Change of base lets a calculator evaluate a logarithm: \\(\\log_b x=\\frac{\\log x}{\\log b}\\).",
    [
      {
        expression: "\\(2\\ln x-\\ln y=\\ln\\left(\\frac{x^2}{y}\\right)\\)",
        detail: "Assume \\(x>0\\) and \\(y>0\\).",
        steps: ["Use the power law: \\(2\\ln x=\\ln(x^2)\\).", "Use the quotient law: \\(\\ln(x^2)-\\ln y=\\ln(\\frac{x^2}{y})\\)."],
      },
      {
        expression: "\\(\\log_2 5=\\frac{\\log 5}{\\log 2}\\approx2.322\\)",
        detail: "Use the same calculator-log base in numerator and denominator.",
        steps: ["Enter \\(\\log 5\\) and divide by \\(\\log 2\\).", "The result is approximately \\(2.322\\).", "Check: \\(2^{2.322}\\) is approximately \\(5\\)."],
      },
    ],
    [
      q("Rewrite \\(2\\log_b x\\) using one logarithm, for \\(x>0\\).", ["\\(\\log_b(x^2)\\)", "\\(\\log_b(2x)\\)", "\\(\\log_b(x+2)\\)", "\\(\\log_{2b}x\\)"], "\\(\\log_b(x^2)\\)", "Move the coefficient into the exponent."),
      q("Expand \\(\\log_3(x^4)\\) for \\(x>0\\).", ["\\(4\\log_3 x\\)", "\\(\\log_3 x+4\\)", "\\(\\log_3(4x)\\)", "\\(\\log_{12}x\\)"], "\\(4\\log_3 x\\)", "Use the power law."),
      q("Which change-of-base expression equals \\(\\log_2 5\\)?", ["\\(\\frac{\\log 5}{\\log 2}\\)", "\\(\\frac{\\log 2}{\\log 5}\\)", "\\(\\log 5-\\log 2\\)", "\\(2\\log 5\\)"], "\\(\\frac{\\log 5}{\\log 2}\\)", "Put the argument’s logarithm over the base’s logarithm."),
      q("For \\(x,y>0\\), combine \\(\\ln x-\\ln y\\).", ["\\(\\ln(\\frac{x}{y})\\)", "\\(\\ln(x-y)\\)", "\\(\\ln(xy)\\)", "\\(\\ln(\\frac{y}{x})\\)"], "\\(\\ln(\\frac{x}{y})\\)", "Subtraction gives the quotient of arguments."),
      q("What is \\(\\ln(e^3)\\)?", ["\\(3\\)", "\\(e^3\\)", "\\(1\\)", "\\(0\\)"], "\\(3\\)", "Natural log and the exponential with base \\(e\\) reverse one another."),
    ],
  ),
  ...section(
    "Solve logarithmic equations and check domains",
    "Convert to exponential form or use equal logs with the same base. Before accepting a solution, check every logarithm’s argument is positive.",
    [
      {
        expression: "\\(\\log_3(2x-1)=2\\quad\\Rightarrow\\quad x=5\\)",
        detail: "Turn the logarithm into an exponential equation.",
        steps: ["Rewrite as \\(2x-1=3^2=9\\).", "Solve \\(2x=10\\), giving \\(x=5\\).", "Check the argument: \\(2(5)-1=9>0\\), so the solution is valid."],
      },
      {
        expression: "\\(\\log_2(x+1)+\\log_2(x-1)=3\\)",
        detail: "Check both original log arguments after solving.",
        steps: ["The arguments require \\(x+1>0\\) and \\(x-1>0\\), so \\(x>1\\).", "Combine: \\(\\log_2((x+1)(x-1))=3\\).", "Convert: \\(x^2-1=2^3=8\\), so \\(x^2=9\\).", "The algebra gives \\(x=3\\) or \\(x=-3\\); only \\(x=3\\) satisfies \\(x>1\\)."],
      },
    ],
    [
      q("Convert \\(\\log_3(2x-1)=2\\) to exponential form.", ["\\(2x-1=9\\)", "\\(2x-1=6\\)", "\\(2x-1=3\\)", "\\(2x-1=2\\)"], "\\(2x-1=9\\)", "The logarithm says \\(3^2=2x-1\\)."),
      q("Solve \\(\\log_3(2x-1)=2\\).", ["\\(x=5\\)", "\\(x=4\\)", "\\(x=2\\)", "\\(x=10\\)"], "\\(x=5\\)", "\\(2x-1=9\\), so \\(x=5\\), and the argument is positive."),
      q("What condition does \\(\\log_2(x-1)\\) require?", ["\\(x>1\\)", "\\(x<1\\)", "\\(x\\ge1\\)", "\\(x>0\\) only"], "\\(x>1\\)", "The argument must be strictly positive: \\(x-1>0\\)."),
      q("In \\(\\log_2(x+1)+\\log_2(x-1)=3\\), which algebraic root is valid?", ["\\(x=3\\)", "\\(x=-3\\)", "Both \\(3\\) and \\(-3\\)", "Neither"], "\\(x=3\\)", "The original arguments require \\(x>1\\), so \\(-3\\) is invalid."),
      q("If \\(\\log_4(2x)=\\log_4 10\\), what is \\(x\\)?", ["\\(5\\)", "\\(10\\)", "\\(20\\)", "\\(2\\)"], "\\(5\\)", "Equal logarithms with the same valid base have equal arguments: \\(2x=10\\)."),
    ],
  ),
  ...section(
    "Logarithmic equations with substitution",
    "If an equation contains a squared logarithm, let \\(y=\\log x\\), solve the quadratic in \\(y\\), then return to \\(x\\).",
    [
      {
        expression: "\\((\\log x)^2+2\\log x-3=0\\)",
        detail: "Let \\(y=\\log x\\), with \\(x>0\\).",
        steps: ["Substitute to get \\(y^2+2y-3=0\\).", "Factor \\((y+3)(y-1)=0\\), so \\(y=-3\\) or \\(y=1\\).", "Return to \\(\\log x=-3\\) or \\(\\log x=1\\).", "With base \\(10\\), \\(x=10^{-3}=\\frac{1}{1000}\\) or \\(x=10\\). Both are positive."],
      },
      {
        expression: "\\(\\log(x^2)=2\\quad\\Rightarrow\\quad x=\\pm10\\)",
        detail: "The argument is \\(x^2\\), so both non-zero roots can be valid.",
        steps: ["Convert to exponential form: \\(x^2=10^2=100\\).", "Solve \\(x=10\\) or \\(x=-10\\).", "Both give the positive argument \\(x^2=100\\), so both are valid."],
      },
    ],
    [
      q("If \\(y=\\log x\\), what does \\((\\log x)^2\\) become?", ["\\(y^2\\)", "\\(2y\\)", "\\(\\log(y^2)\\)", "\\(y+2\\)"], "\\(y^2\\)", "Replace each occurrence of \\(\\log x\\) by \\(y\\)."),
      q("Factor \\(y^2+2y-3\\).", ["\\((y+3)(y-1)\\)", "\\((y-3)(y+1)\\)", "\\((y+3)(y+1)\\)", "\\((y-1)^2\\)"], "\\((y+3)(y-1)\\)", "Expanding gives \\(y^2+2y-3\\)."),
      q("If \\(\\log x=-3\\), what is \\(x\\)?", ["\\(10^{-3}\\)", "\\(-3\\)", "\\(10^3\\)", "\\(-10^3\\)"], "\\(10^{-3}\\)", "A common logarithm has base \\(10\\), so \\(x=10^{-3}\\)."),
      q("Solve \\(\\log(x^2)=2\\).", ["\\(x=10\\) or \\(x=-10\\)", "\\(x=10\\) only", "\\(x=100\\) only", "\\(x=2\\) or \\(x=-2\\)"], "\\(x=10\\) or \\(x=-10\\)", "\\(x^2=100\\), and both roots make the log argument positive."),
      q("Why can \\(x=-10\\) satisfy \\(\\log(x^2)=2\\)?", ["Its argument \\(x^2\\) is positive", "A log argument may always be negative", "Its square is negative", "A common log has base \\(-10\\)"], "Its argument \\(x^2\\) is positive", "The argument is \\(x^2=100>0\\), even when \\(x\\) is negative."),
    ],
  ),
  ...finalCheck([
    q("Solve \\(\\log_3(2x-1)=2\\).", ["\\(x=5\\)", "\\(x=4\\)", "\\(x=9\\)", "\\(x=2\\)"], "\\(x=5\\)", "\\(2x-1=9\\), so \\(x=5\\), which has a positive argument."),
    q("What is the valid solution of \\(\\log_2(x+1)+\\log_2(x-1)=3\\)?", ["\\(x=3\\)", "\\(x=-3\\)", "Both \\(x=3\\) and \\(x=-3\\)", "No solution"], "\\(x=3\\)", "The algebra gives \\(x=\\pm3\\), but the original logarithms require \\(x>1\\)."),
    q("Solve \\((\\log x)^2+2\\log x-3=0\\).", ["\\(x=10^{-3}\\) or \\(x=10\\)", "\\(x=-3\\) or \\(x=1\\)", "\\(x=-10\\) or \\(x=10\\)", "\\(x=10^3\\) only"], "\\(x=10^{-3}\\) or \\(x=10\\)", "Let \\(y=\\log x\\): \\(y=-3\\) or \\(1\\), then convert back to \\(x\\)."),
  ]),
];
