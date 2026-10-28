import type { GuidedLessonStep } from "./course";
import { section } from "./sequences";

export const quadraticSubstitutionSteps: GuidedLessonStep[] = section(
  "Second method: substitution",
  "Instead of using second differences, start with \\(u_n=an^2+bn+c\\). Substitute three known positions and their terms to make three equations, then solve for \\(a\\), \\(b\\) and \\(c\\).",
  [
    {
      expression: "\\(4,13,26,43,\\ldots\\quad\\Rightarrow\\quad u_n=2n^2+3n-1\\)",
      detail: "Use the first three terms to determine the three unknown coefficients.",
      steps: [
        "At \\(n=1\\), \\(u_1=4\\), so \\(a+b+c=4\\).",
        "At \\(n=2\\), \\(u_2=13\\), so \\(4a+2b+c=13\\). At \\(n=3\\), \\(u_3=26\\), so \\(9a+3b+c=26\\).",
        "Subtract the first equation from the second: \\(3a+b=9\\). Subtract the second from the third: \\(5a+b=13\\).",
        "Subtract these equations: \\(2a=4\\), so \\(a=2\\). Then \\(3(2)+b=9\\), so \\(b=3\\).",
        "Use \\(a+b+c=4\\): \\(2+3+c=4\\), so \\(c=-1\\). Thus \\(u_n=2n^2+3n-1\\). Check \\(u_4=43\\).",
      ],
    },
    {
      expression: "\\(2,5,10,17,\\ldots\\quad\\Rightarrow\\quad u_n=n^2+1\\)",
      detail: "The same method also works when the linear coefficient is zero.",
      steps: [
        "Substitute \\(n=1,2,3\\): \\(a+b+c=2\\), \\(4a+2b+c=5\\), \\(9a+3b+c=10\\).",
        "Subtract consecutive equations: \\(3a+b=3\\) and \\(5a+b=5\\).",
        "Subtract: \\(2a=2\\), so \\(a=1\\). Then \\(b=0\\) and \\(c=1\\).",
        "The rule is \\(u_n=n^2+1\\); check \\(u_4=17\\).",
      ],
    },
  ],
  [
    { question: "For \\(u_n=an^2+bn+c\\) and \\(u_1=4\\), which equation is correct?", options: ["\\(a+b+c=4\\)", "\\(4a+2b+c=4\\)", "\\(a+b=4\\)", "\\(a+b+c=1\\)"], answer: "\\(a+b+c=4\\)", explanation: "Substitute \\(n=1\\) and set the expression equal to \\(4\\)." },
    { question: "If \\(u_2=13\\), which equation follows from \\(u_n=an^2+bn+c\\)?", options: ["\\(4a+2b+c=13\\)", "\\(2a+2b+c=13\\)", "\\(a+b+c=13\\)", "\\(9a+3b+c=13\\)"], answer: "\\(4a+2b+c=13\\)", explanation: "Substitute \\(n=2\\): \\(a(2^2)+b(2)+c=13\\)." },
    { question: "Subtract \\(a+b+c=4\\) from \\(4a+2b+c=13\\). What remains?", options: ["\\(3a+b=9\\)", "\\(5a+3b=17\\)", "\\(3a+b=17\\)", "\\(4a+b=9\\)"], answer: "\\(3a+b=9\\)", explanation: "The \\(c\\) terms cancel; subtract the remaining coefficients and constants." },
    { question: "Given \\(3a+b=9\\) and \\(5a+b=13\\), what is \\(a\\)?", options: ["\\(2\\)", "\\(4\\)", "\\(3\\)", "\\(-2\\)"], answer: "\\(2\\)", explanation: "Subtract the equations to get \\(2a=4\\), so \\(a=2\\)." },
    { question: "If \\(a=2\\), \\(b=3\\), and \\(a+b+c=4\\), what is \\(c\\)?", options: ["\\(-1\\)", "\\(1\\)", "\\(4\\)", "\\(5\\)"], answer: "\\(-1\\)", explanation: "\\(2+3+c=4\\), so \\(c=-1\\)." },
  ],
);

export const sumRelationshipSteps: GuidedLessonStep[] = section(
  "Connecting terms and partial sums",
  "If \\(S_k\\) is the sum of the first \\(k\\) terms, add the next term to get \\(S_{k+1}\\). Conversely, subtract consecutive partial sums to recover the next term.",
  [
    {
      expression: "\\(S_{k+1}=S_k+u_{k+1}\\)",
      detail: "The next partial sum includes everything already in \\(S_k\\), plus one new term.",
      steps: ["For \\(2,5,8,11,\\ldots\\), \\(S_3=2+5+8=15\\).", "The next term is \\(u_4=11\\).", "Therefore \\(S_4=S_3+u_4=15+11=26\\)."],
    },
    {
      expression: "\\(u_{k+1}=S_{k+1}-S_k\\)",
      detail: "Subtract consecutive sums to leave exactly the newly added term.",
      steps: ["In the same sequence, \\(S_4=26\\) and \\(S_3=15\\).", "Subtract \\(u_4=S_4-S_3=26-15=11\\).", "Equivalently, for \\(n\\ge2\\), \\(u_n=S_n-S_{n-1}\\). The first term is \\(u_1=S_1\\)."],
    },
  ],
  [
    { question: "If \\(S_3=15\\) and \\(u_4=11\\), what is \\(S_4\\)?", options: ["\\(26\\)", "\\(4\\)", "\\(15\\)", "\\(11\\)"], answer: "\\(26\\)", explanation: "\\(S_4=S_3+u_4=15+11=26\\)." },
    { question: "If \\(S_4=26\\) and \\(S_3=15\\), what is \\(u_4\\)?", options: ["\\(11\\)", "\\(41\\)", "\\(15\\)", "\\(26\\)"], answer: "\\(11\\)", explanation: "\\(u_4=S_4-S_3=26-15=11\\)." },
    { question: "Which expression gives the term after \\(S_k\\)?", options: ["\\(S_{k+1}-S_k\\)", "\\(u_{k+1}-u_k\\)", "\\(S_k-S_{k+1}\\)", "\\(S_{k+1}+S_k\\)"], answer: "\\(S_{k+1}-S_k\\)", explanation: "The difference of successive partial sums is the newly added term \\(u_{k+1}\\)." },
    { question: "For \\(n\\ge2\\), which formula finds \\(u_n\\) from partial sums?", options: ["\\(S_n-S_{n-1}\\)", "\\(S_{n+1}-S_n\\)", "\\(u_n-u_{n-1}\\)", "\\(S_n+S_{n-1}\\)"], answer: "\\(S_n-S_{n-1}\\)", explanation: "Subtract the sum through term \\(n-1\\) from the sum through term \\(n\\)." },
    { question: "If \\(S_1=7\\), what is \\(u_1\\)?", options: ["\\(7\\)", "\\(0\\)", "\\(14\\)", "Cannot be determined"], answer: "\\(7\\)", explanation: "The sum of the first term is the first term itself." },
  ],
);
