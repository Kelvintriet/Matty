import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";
import { question as q } from "./curriculum-questions";

export const financialMathematicsSteps: GuidedLessonStep[] = [
  ...section(
    "Money, rates and simple interest",
    "Use \\(PV\\) for the starting amount, \\(FV\\) for the ending amount, \\(r\\) for the annual percentage rate, \\(N\\) for years, and \\(k\\) for compounding periods per year. Simple interest uses the starting value each year.",
    [
      {
        expression: "\\(PV=1000,\\quad r=5,\\quad N=2\\)",
        detail: "Find simple interest at \\(5\\%\\) over two years.",
        steps: [
          "Convert \\(5\\%\\) to \\(0.05\\).",
          "Each year’s interest is \\(1000(0.05)=50\\).",
          "Two years’ interest is \\(2(50)=100\\), so the final value is \\(1000+100=1100\\).",
        ],
      },
      {
        expression: "\\(I=PV\\frac{r}{100}N,\\quad FV=PV+I\\)",
        detail: "Use the annual percentage rate \\(r\\) and time in years \\(N\\).",
        steps: [
          "For \\(PV=500\\), \\(r=4\\) and \\(N=3\\), calculate \\(I=500\\left(\\frac{4}{100}\\right)(3)=60\\).",
          "Add the interest to the principal: \\(FV=500+60=560\\).",
        ],
      },
    ],
    [
      q("What is \\(5\\%\\) as a decimal?", ["\\(0.05\\)", "\\(0.5\\)", "\\(5\\)", "\\(0.005\\)"], "\\(0.05\\)", "Divide the percentage by \\(100\\)."),
      q("What does \\(PV\\) represent?", ["The starting principal", "The final interest only", "The annual rate", "The number of years"], "The starting principal", "Principal is the starting amount invested or borrowed."),
      q("What is one year’s simple interest on \\(1000\\) at \\(5\\%\\)?", ["\\(50\\)", "\\(5\\)", "\\(100\\)", "\\(1050\\)"], "\\(50\\)", "\\(1000(0.05)=50\\)."),
      q("At simple interest, what does each year’s interest use?", ["The original principal", "Only the previous year’s interest", "A new rate each year", "The final balance"], "The original principal", "Simple interest is calculated on the original principal."),
      q("If \\(PV=500\\) and simple interest is \\(60\\), what is \\(FV\\)?", ["\\(560\\)", "\\(440\\)", "\\(60\\)", "\\(500\\)"], "\\(560\\)", "Add principal and interest: \\(500+60=560\\)."),
    ],
  ),
  ...section(
    "Annual compound interest",
    "Compound interest earns interest on the current balance, including earlier interest. For annual compounding, \\(FV=PV(1+\\frac{r}{100})^N\\), where \\(r\\) is the annual rate as a percentage and \\(N\\) is years.",
    [
      {
        expression: "\\(FV=1000(1.05)^2=1102.50\\)",
        detail: "Compare the balance after each year at \\(5\\%\\) compounded annually.",
        steps: [
          "The annual multiplier is \\(1+0.05=1.05\\).",
          "After year one: \\(1000(1.05)=1050\\).",
          "After year two: \\(1050(1.05)=1102.50\\).",
          "The compound interest earned is \\(1102.50-1000=102.50\\).",
        ],
      },
      {
        expression: "\\(FV=50000(1.05)^8\\approx73872.77\\)",
        detail: "Find the value and interest for \\(50000\\) at \\(5\\%\\) for eight years.",
        steps: [
          "Use \\(PV=50000\\), \\(r=5\\), and \\(N=8\\).",
          "Substitute into \\(FV=PV(1+\\frac{r}{100})^N\\).",
          "The final value is approximately \\(73872.77\\); interest is approximately \\(73872.77-50000=23872.77\\).",
        ],
      },
    ],
    [
      q("What is the annual multiplier for \\(5\\%\\) growth?", ["\\(1.05\\)", "\\(0.05\\)", "\\(1.5\\)", "\\(0.95\\)"], "\\(1.05\\)", "Add the decimal rate to \\(1\\)."),
      q("What is \\(1000\\) after one year at \\(5\\%\\) compounded annually?", ["\\(1050\\)", "\\(1005\\)", "\\(1100\\)", "\\(950\\)"], "\\(1050\\)", "\\(1000(1.05)=1050\\)."),
      q("What is \\(1000\\) after two years at \\(5\\%\\) compounded annually?", ["\\(1102.50\\)", "\\(1100\\)", "\\(1050\\)", "\\(1025\\)"], "\\(1102.50\\)", "\\(1000(1.05)^2=1102.50\\)."),
      q("What is the compound interest if \\(PV=1000\\) and \\(FV=1102.50\\)?", ["\\(102.50\\)", "\\(1102.50\\)", "\\(100\\)", "\\(1050\\)"], "\\(102.50\\)", "Interest is \\(FV-PV=102.50\\)."),
      q("Which expression represents \\(7500\\) at \\(3\\%\\) compounded annually for two years?", ["\\(7500(1.03)^2\\)", "\\(7500(0.03)^2\\)", "\\(7500(1.3)^2\\)", "\\(7500+2(0.03)\\)"], "\\(7500(1.03)^2\\)", "Use the annual multiplier \\(1.03\\) twice."),
    ],
  ),
  ...section(
    "Compounding more than once per year",
    "For an annual percentage rate \\(r\\), compounded \\(k\\) times per year for \\(N\\) years, use \\(FV=PV\\left(1+\\frac{r}{100k}\\right)^{kN}\\).",
    [
      {
        expression: "\\(PV=10000,\\quad r=2,\\quad k=4,\\quad N=5\\)",
        detail: "A \\(2\\%\\) annual rate is compounded quarterly for five years.",
        steps: [
          "Quarterly means \\(k=4\\), so the rate per period is \\(\\frac{2}{100(4)}=0.005\\).",
          "There are \\(kN=4(5)=20\\) compounding periods.",
          "\\(FV=10000(1.005)^{20}\\approx11048.96\\).",
          "Interest is approximately \\(11048.96-10000=1048.96\\).",
        ],
      },
      {
        expression: "\\(PV=5000,\\quad r=2.5,\\quad k=1,\\quad N=5\\)",
        detail: "An investment earns \\(2.5\\%\\) compounded annually for five years.",
        steps: [
          "Annual compounding has \\(k=1\\).",
          "\\(FV=5000(1.025)^5\\approx5657.04\\).",
          "Keep extra calculator digits during intermediate calculations and round the final monetary value to cents.",
        ],
      },
    ],
    [
      q("How many compounding periods are in one year when compounded quarterly?", ["\\(4\\)", "\\(3\\)", "\\(12\\)", "\\(1\\)"], "\\(4\\)", "Quarterly means four periods per year."),
      q("How many quarters are in \\(5\\) years?", ["\\(20\\)", "\\(5\\)", "\\(4\\)", "\\(60\\)"], "\\(20\\)", "There are \\(4(5)=20\\) quarters."),
      q("What is the quarterly decimal rate for \\(2\\%\\) per year?", ["\\(0.005\\)", "\\(0.02\\)", "\\(0.08\\)", "\\(0.5\\)"], "\\(0.005\\)", "Divide \\(0.02\\) by \\(4\\)."),
      q("Which formula uses \\(10000\\) at \\(2\\%\\) compounded quarterly for five years?", ["\\(10000(1.005)^{20}\\)", "\\(10000(1.02)^5\\)", "\\(10000(1.02)^{20}\\)", "\\(10000(1.005)^5\\)"], "\\(10000(1.005)^{20}\\)", "Use rate \\(0.005\\) for each of \\(20\\) quarters."),
      q("How many compounding periods are in two years when compounded monthly?", ["\\(24\\)", "\\(12\\)", "\\(2\\)", "\\(6\\)"], "\\(24\\)", "There are \\(12(2)=24\\) months."),
    ],
  ),
  ...section(
    "Using the financial calculator",
    "A financial or TVM solver uses fields for the rate, present value, future value, payments and the number of periods. Its sign convention distinguishes money paid out from money received.",
    [
      {
        expression: "\\(PV=-5000,\\quad I\\%=2.5,\\quad PMT=0\\)",
        detail: "Set up a five-year investment at \\(2.5\\%\\), compounded annually.",
        steps: [
          "Choose the compound-interest or TVM menu.",
          "Enter \\(PV=-5000\\), \\(I\\%=2.5\\), and \\(PMT=0\\): there are no regular deposits.",
          "Set the time to \\(5\\) years and annual compounding. On the calculator shown in the course, use \\(P/Y=1\\) and \\(C/Y=1\\).",
          "Solve for \\(FV\\), approximately \\(5657.04\\). A positive result is money received.",
        ],
      },
      {
        expression: "\\(C/Y=4,\\quad P/Y=1,\\quad N=5\\)",
        detail: "For quarterly compounding, the course calculator uses \\(C/Y=4\\) and time in years.",
        steps: [
          "Enter the annual rate as a percentage, such as \\(2\\), not \\(0.02\\), in an \\(I\\%\\) field.",
          "For a single deposit set \\(PMT=0\\); use \\(C/Y=4\\) for quarterly compounding.",
          "For these single-deposit examples, \\(P/Y=1\\), so \\(N\\) equals years. With other payment frequencies, enter the number of payment periods.",
        ],
      },
    ],
    [
      q("In a single-deposit TVM setup, what is \\(PMT\\)?", ["\\(0\\)", "The interest rate", "The future value", "The number of years"], "\\(0\\)", "There are no recurring payments in a single-deposit example."),
      q("What does \\(PV\\) represent?", ["Present value", "Payment frequency", "Interest earned only", "Future value"], "Present value", "PV is the amount at the start."),
      q("What value goes in an \\(I\\%\\) field for a \\(2\\%\\) annual rate?", ["\\(2\\)", "\\(0.02\\)", "\\(200\\)", "\\(1.02\\)"], "\\(2\\)", "The percentage field expects the percentage number \\(2\\)."),
      q("What is \\(C/Y\\) for quarterly compounding?", ["\\(4\\)", "\\(1\\)", "\\(12\\)", "\\(2\\)"], "\\(4\\)", "There are four compounding periods per year."),
      q("Why may a deposit be entered as a negative present value?", ["It represents money paid out", "It means the rate is negative", "It makes the investment lose value", "It is an error in every solver"], "It represents money paid out", "Cash-flow signs distinguish the initial payment from money received later."),
    ],
  ),
  ...section(
    "Depreciation, payments and loans",
    "A fixed percentage decrease uses a multiplier below \\(1\\). Repeated payments are an annuity; loans can be tracked by adding interest and subtracting payments.",
    [
      {
        expression: "\\(1000(1-0.10)^2=810\\)",
        detail: "A value depreciates by \\(10\\%\\) per year for two years.",
        steps: [
          "The yearly multiplier is \\(1-0.10=0.90\\).",
          "After one year the value is \\(1000(0.90)=900\\).",
          "After two years it is \\(900(0.90)=810\\).",
        ],
      },
      {
        expression: "\\(100(1.05)+100=205\\)",
        detail: "Two deposits of \\(100\\) are made at the end of each year; the annual rate is \\(5\\%\\).",
        steps: [
          "The first end-of-year deposit earns interest for the second year: \\(100(1.05)=105\\).",
          "The second deposit is made at the end of year two, so it has not earned interest yet.",
          "The value at that moment is \\(105+100=205\\). The timing of payments matters.",
        ],
      },
      {
        expression: "\\(1000(1.05)-200=850\\)",
        detail: "A loan starts at \\(1000\\), earns \\(5\\%\\) interest for a year, then a payment of \\(200\\) is made.",
        steps: [
          "Add one year’s interest: \\(1000(1.05)=1050\\).",
          "Subtract the payment: \\(1050-200=850\\).",
          "The remaining balance is \\(850\\). A TVM solver can handle more payment periods.",
        ],
      },
    ],
    [
      q("What is the multiplier for a \\(10\\%\\) decrease?", ["\\(0.9\\)", "\\(1.1\\)", "\\(0.1\\)", "\\(0.99\\)"], "\\(0.9\\)", "\\(1-0.10=0.90\\)."),
      q("What is \\(1000\\) after two \\(10\\%\\) yearly decreases?", ["\\(810\\)", "\\(800\\)", "\\(900\\)", "\\(1210\\)"], "\\(810\\)", "\\(1000(0.9)^2=810\\)."),
      q("What is an annuity?", ["A series of regular payments", "A single interest rate", "Only a loan’s initial value", "A fixed percentage decrease"], "A series of regular payments", "An annuity involves payments made at regular intervals."),
      q("Two end-of-year deposits of \\(100\\) earn \\(5\\%\\) annually. What is their value immediately after the second deposit?", ["\\(205\\)", "\\(210\\)", "\\(200\\)", "\\(215\\)"], "\\(205\\)", "The first deposit earns one year of interest; the second is just paid: \\(105+100=205\\)."),
      q("A loan is \\(1000\\), grows by \\(5\\%\\), and then receives a \\(200\\) payment. What remains?", ["\\(850\\)", "\\(800\\)", "\\(1050\\)", "\\(1055\\)"], "\\(850\\)", "\\(1000(1.05)-200=850\\)."),
    ],
  ),
  ...section(
    "Finding the rate or starting value",
    "The same relationship can be used to find an unknown. Use positive amounts in the formula; in the solver, money paid out and received have opposite signs.",
    [
      {
        expression: "\\(1210=1000\\left(1+\\frac{r}{100}\\right)^2\\)",
        detail: "Find the annual rate when \\(1000\\) grows to \\(1210\\) in two years, compounded annually.",
        steps: [
          "Divide by \\(1000\\): \\(1.21=\\left(1+\\frac{r}{100}\\right)^2\\).",
          "Take the positive square root: \\(1.1=1+\\frac{r}{100}\\).",
          "Subtract \\(1\\) and multiply by \\(100\\): \\(r=10\\), meaning an annual rate of \\(10\\%\\).",
          "In the TVM solver enter \\(N=2\\), \\(PV=-1000\\), \\(FV=1210\\), \\(PMT=0\\), \\(P/Y=C/Y=1\\), then solve for \\(I\\%\\).",
        ],
      },
      {
        expression: "\\(PV=\\frac{1210}{(1.10)^2}=1000\\)",
        detail: "Find the initial deposit if the final amount is \\(1210\\) after two years at \\(10\\%\\) annually.",
        steps: [
          "Start with \\(FV=PV(1.10)^2\\).",
          "Divide by \\(1.10^2=1.21\\), so \\(PV=\\frac{1210}{1.21}=1000\\).",
          "In the TVM solver enter \\(FV=1210\\), \\(I\\%=10\\), \\(N=2\\), \\(PMT=0\\), \\(P/Y=C/Y=1\\), and solve for \\(PV\\).",
          "The solver displays \\(PV=-1000\\): the deposit is a cash outflow of \\(1000\\).",
        ],
      },
    ],
    [
      q("An investment grows from \\(1000\\) to \\(1210\\) in two years, compounded annually. What is the annual rate?", ["\\(10\\%\\)", "\\(21\\%\\)", "\\(5\\%\\)", "\\(12.1\\%\\)"], "\\(10\\%\\)", "\\(\\frac{1210}{1000}=1.21=1.1^2\\), so the rate is \\(10\\%\\)."),
      q("What \\(PV\\) grows to \\(1210\\) in two years at \\(10\\%\\) compounded annually?", ["\\(1000\\)", "\\(1100\\)", "\\(121\\)", "\\(1464.10\\)"], "\\(1000\\)", "\\(PV=\\frac{1210}{(1.10)^2}=1000\\)."),
      q("What value should a TVM solver display for the initial deposit when \\(FV=1210\\) is positive?", ["\\(-1000\\)", "\\(1000\\)", "\\(-1210\\)", "\\(1210\\)"], "\\(-1000\\)", "The initial deposit is a cash outflow, so the solver uses the opposite sign from the future value."),
      q("For a single deposit over \\(5\\) years with \\(P/Y=1\\), what solver value is \\(N\\)?", ["\\(5\\)", "\\(20\\)", "\\(4\\)", "\\(1\\)"], "\\(5\\)", "The solver’s \\(N\\) counts payment periods: \\(5\\) years times \\(1\\) per year."),
      q("A single deposit compounds quarterly for \\(5\\) years. What are \\(P/Y\\) and \\(C/Y\\) in this setup?", ["\\(P/Y=1,\\ C/Y=4\\)", "\\(P/Y=4,\\ C/Y=1\\)", "\\(P/Y=1,\\ C/Y=1\\)", "\\(P/Y=4,\\ C/Y=4\\)"], "\\(P/Y=1,\\ C/Y=4\\)", "Use one payment period per year for this no-payment setup and four compounding periods per year."),
    ],
  ),
  ...finalCheck([
    q("What is \\(7500\\) after two years at \\(3\\%\\) compounded annually?", ["\\(7956.75\\)", "\\(7950\\)", "\\(7725\\)", "\\(8437.50\\)"], "\\(7956.75\\)", "\\(7500(1.03)^2=7956.75\\)."),
    q("Which setup models \\(10000\\) at \\(2\\%\\) compounded quarterly for \\(5\\) years?", ["\\(10000(1.005)^{20}\\)", "\\(10000(1.02)^5\\)", "\\(10000(1.02)^{20}\\)", "\\(10000(1.005)^5\\)"], "\\(10000(1.005)^{20}\\)", "There are \\(20\\) quarters and the rate per quarter is \\(0.005\\)."),
    q("A value of \\(2000\\) depreciates by \\(20\\%\\) per year. What is it after two years?", ["\\(1280\\)", "\\(1200\\)", "\\(1600\\)", "\\(2880\\)"], "\\(1280\\)", "\\(2000(0.8)^2=1280\\)."),
  ]),
];

financialMathematicsSteps.find((step) => step.title === "Using the financial calculator")?.blocks.splice(1, 0, {
  type: "calculator-guide",
});
