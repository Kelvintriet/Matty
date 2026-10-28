import type { GuidedLessonStep } from "./course";
import { finalCheck, section } from "./sequences";
import { question as q } from "./curriculum-questions";

export const financialMathematicsSteps: GuidedLessonStep[] = [
  ...section(
    "Money, rates and simple interest",
    "Principal or present value is the starting amount. Interest is money earned or paid. With simple interest, each period’s interest is calculated from the original principal.",
    [
      {
        expression: "\\(P=1000,\\quad r=5\\%,\\quad t=2\\)",
        detail: "Find simple interest over two years.",
        steps: [
          "Convert \\(5\\%\\) to \\(0.05\\).",
          "Each year’s interest is \\(1000(0.05)=50\\).",
          "Two years’ interest is \\(2(50)=100\\), so the final value is \\(1000+100=1100\\).",
        ],
      },
      {
        expression: "\\(I=Prt,\\quad FV=P+I\\)",
        detail: "Use a decimal annual rate and time in years.",
        steps: [
          "For \\(P=500\\), \\(r=0.04\\), and \\(t=3\\), calculate \\(I=500(0.04)(3)=60\\).",
          "Add the interest to the principal: \\(FV=500+60=560\\).",
        ],
      },
    ],
    [
      q("What is \\(5\\%\\) as a decimal?", ["\\(0.05\\)", "\\(0.5\\)", "\\(5\\)", "\\(0.005\\)"], "\\(0.05\\)", "Divide the percentage by \\(100\\)."),
      q("What does \\(P\\) represent?", ["The starting principal", "The final interest only", "The annual rate", "The number of years"], "The starting principal", "Principal is the starting amount invested or borrowed."),
      q("What is one year’s simple interest on \\(1000\\) at \\(5\\%\\)?", ["\\(50\\)", "\\(5\\)", "\\(100\\)", "\\(1050\\)"], "\\(50\\)", "\\(1000(0.05)=50\\)."),
      q("At simple interest, what does each year’s interest use?", ["The original principal", "Only the previous year’s interest", "A new rate each year", "The final balance"], "The original principal", "Simple interest is calculated on the original principal."),
      q("If \\(P=500\\) and simple interest is \\(60\\), what is \\(FV\\)?", ["\\(560\\)", "\\(440\\)", "\\(60\\)", "\\(500\\)"], "\\(560\\)", "Add principal and interest: \\(500+60=560\\)."),
    ],
  ),
  ...section(
    "Annual compound interest",
    "Compound interest earns interest on the current balance, including earlier interest. For annual compounding, \\(FV=PV(1+r)^n\\), where \\(r\\) is a decimal annual rate and \\(n\\) is the number of years.",
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
          "Use \\(PV=50000\\), \\(r=0.05\\), and \\(n=8\\).",
          "Substitute into \\(FV=PV(1+r)^n\\).",
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
    "For a nominal annual rate \\(r\\), compounded \\(m\\) times per year for \\(t\\) years, use \\(FV=PV\\left(1+\\frac{r}{m}\\right)^{mt}\\), with \\(r\\) as a decimal.",
    [
      {
        expression: "\\(PV=10000,\\quad r=0.02,\\quad m=4,\\quad t=5\\)",
        detail: "A \\(2\\%\\) annual rate is compounded quarterly for five years.",
        steps: [
          "Quarterly means \\(m=4\\), so the period rate is \\(0.\\frac{02}{4}=0.005\\).",
          "There are \\(mt=4(5)=20\\) compounding periods.",
          "\\(FV=10000(1.005)^{20}\\approx11048.96\\).",
          "Interest is approximately \\(11048.96-10000=1048.96\\).",
        ],
      },
      {
        expression: "\\(PV=5000,\\quad r=0.025,\\quad m=1,\\quad t=5\\)",
        detail: "An investment earns \\(2.5\\%\\) compounded annually for five years.",
        steps: [
          "Annual compounding has \\(m=1\\).",
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
        expression: "\\(C/Y=4,\\quad P/Y=1,\\quad t=5\\)",
        detail: "For quarterly compounding, the course calculator uses \\(C/Y=4\\) and time in years.",
        steps: [
          "Enter the annual rate as a percentage, such as \\(2\\), not \\(0.02\\), in an \\(I\\%\\) field.",
          "For a single deposit set \\(PMT=0\\); use \\(C/Y=4\\) for quarterly compounding.",
          "Calculator conventions vary: confirm whether its time field counts years or payment periods before entering \\(N\\).",
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
  ...finalCheck([
    q("What is \\(7500\\) after two years at \\(3\\%\\) compounded annually?", ["\\(7956.75\\)", "\\(7950\\)", "\\(7725\\)", "\\(8437.50\\)"], "\\(7956.75\\)", "\\(7500(1.03)^2=7956.75\\)."),
    q("Which setup models \\(10000\\) at \\(2\\%\\) compounded quarterly for \\(5\\) years?", ["\\(10000(1.005)^{20}\\)", "\\(10000(1.02)^5\\)", "\\(10000(1.02)^{20}\\)", "\\(10000(1.005)^5\\)"], "\\(10000(1.005)^{20}\\)", "There are \\(20\\) quarters and the rate per quarter is \\(0.005\\)."),
    q("A value of \\(2000\\) depreciates by \\(20\\%\\) per year. What is it after two years?", ["\\(1280\\)", "\\(1200\\)", "\\(1600\\)", "\\(2880\\)"], "\\(1280\\)", "\\(2000(0.8)^2=1280\\)."),
  ]),
];
