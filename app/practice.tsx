"use client";

import { useEffect, useState, type ComponentType } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock3, ListChecks, Trophy } from "lucide-react";

type Problem = {
  id: string;
  title: string;
  unit: string;
  rating: number;
  question: string;
  answer: number;
  explanation: string[];
};

// Sample problems can later be replaced by contributor-created content.
const problems: Problem[] = [
  {
    id: "P001",
    title: "A closer measurement",
    unit: "Numbers and Accuracy",
    rating: 1000,
    question: "A length is measured as \\(48\\) cm, but its actual length is \\(50\\) cm. Find the percentage error. Enter the percentage as a number.",
    answer: 4,
    explanation: ["The absolute error is \\(50-48=2\\) cm.", "Percentage error is \\(\\frac{2}{50}\\times100=4\\%\\)."],
  },
  {
    id: "P002",
    title: "The growing pattern",
    unit: "Sequences and Series",
    rating: 1200,
    question: "The sequence \\(7, 11, 15, 19, \\ldots\\) is arithmetic. Find the \\(25\\)th term.",
    answer: 103,
    explanation: ["The first term is \\(7\\) and the common difference is \\(4\\).", "\\(u_{25}=7+(25-1)(4)=103\\)."],
  },
  {
    id: "P003",
    title: "A small deposit",
    unit: "Financial Mathematics",
    rating: 1300,
    question: "An investment of \\(1000\\) earns \\(10\\%\\) compound interest annually for \\(2\\) years. Find its final value.",
    answer: 1210,
    explanation: ["The annual multiplier is \\(1.10\\).", "\\(FV=1000(1.10)^2=1210\\)."],
  },
  {
    id: "P004",
    title: "A quadratic pattern",
    unit: "Sequences and Series",
    rating: 1500,
    question: "A sequence has the rule \\(u_n=2n^2-3n+1\\). Find \\(u_8\\).",
    answer: 105,
    explanation: ["Substitute \\(n=8\\): \\(u_8=2(8)^2-3(8)+1\\).", "\\(u_8=128-24+1=105\\)."],
  },
  {
    id: "P005",
    title: "Working backwards",
    unit: "Financial Mathematics",
    rating: 1600,
    question: "An investment grows to \\(1452\\) after \\(2\\) years at \\(10\\%\\) compound interest annually. Find its starting value.",
    answer: 1200,
    explanation: ["Use \\(1452=PV(1.10)^2\\).", "\\(PV=\\frac{1452}{1.21}=1200\\)."],
  },
  {
    id: "P006",
    title: "A geometric total",
    unit: "Sequences and Series",
    rating: 1800,
    question: "Find the sum of the first \\(6\\) terms of \\(3, 6, 12, 24, \\ldots\\).",
    answer: 189,
    explanation: ["The first term is \\(3\\), with common ratio \\(2\\).", "\\(S_6=3\\left(\\frac{2^6-1}{2-1}\\right)=189\\)."],
  },
];

type PracticeState = {
  rating: number;
  started: string[];
  solved: string[];
};

const initialState: PracticeState = { rating: 1200, started: [], solved: [] };
const storageKey = "matty-practice-prototype-v1";

function rankFor(rating: number) {
  if (rating < 1000) return { title: "Novice", level: "1–2", color: "gray" };
  if (rating < 1200) return { title: "Apprentice", level: "3–4", color: "green" };
  if (rating < 1400) return { title: "Specialist", level: "4–5", color: "cyan" };
  if (rating < 1600) return { title: "Expert", level: "5–6", color: "blue" };
  if (rating < 1900) return { title: "Candidate Master", level: "6–7", color: "purple" };
  return { title: "Master / Grandmaster", level: "7–8", color: "orange" };
}

export default function Practice({ MathText }: { MathText: ComponentType<{ text: string }> }) {
  const [progress, setProgress] = useState<PracticeState>(initialState);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [work, setWork] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; change: number } | null>(null);
  const problem = problems.find((item) => item.id === selected);
  const rank = rankFor(progress.rating);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved && Number.isFinite(saved.rating) && Array.isArray(saved.started) && Array.isArray(saved.solved)) {
        setProgress({ rating: saved.rating, started: saved.started, solved: saved.solved });
      }
    } catch {
      // Start fresh if saved prototype data is unavailable or invalid.
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Practice remains usable for the current session if storage is unavailable.
    }
  }, [loaded, progress]);

  function openProblem(id: string) {
    setSelected(id);
    setAnswer("");
    setWork("");
    setFeedback(null);
    setProgress((current) => ({ ...current, started: [...new Set([...current.started, id])] }));
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problem || !answer.trim()) return;
    const numericAnswer = Number(answer.trim());
    if (!Number.isFinite(numericAnswer)) return;
    const correct = Math.abs(numericAnswer - problem.answer) < 0.000001;
    const alreadySolved = progress.solved.includes(problem.id);
    const expected = 1 / (1 + 10 ** ((problem.rating - progress.rating) / 400));
    const change = alreadySolved ? 0 : correct ? Math.min(50, Math.max(1, Math.round(50 * (1 - expected)))) : -Math.max(1, Math.round(20 * expected));
    setProgress((current) => ({
      ...current,
      rating: Math.max(100, current.rating + change),
      solved: correct && !alreadySolved ? [...current.solved, problem.id] : current.solved,
    }));
    setFeedback({ correct, change: Math.max(100, progress.rating + change) - progress.rating });
  }

  return (
    <div className="practice-page">
      <div className="practice-heading">
        <div><span className="practice-eyebrow">PROBLEM SET · PROTOTYPE</span><h1>Practice</h1><p>Choose a problem and work at your own pace.</p></div>
        <div className={`practice-rating rank-${rank.color}`}><Trophy size={20} /><div><strong>{progress.rating}</strong><span>{rank.title} · MYP {rank.level}</span></div></div>
      </div>

      {problem ? (
        <div className="problem-detail">
          <button className="problem-back" onClick={() => { setSelected(null); setWork(""); setFeedback(null); }}><ArrowLeft size={17} /> All problems</button>
          <div className="problem-detail-grid">
            <section className="problem-card">
              <div className="problem-meta"><span>{problem.id}</span><span>{problem.unit}</span><span>{problem.rating} rating</span></div>
              <h2>{problem.title}</h2>
              <p className="problem-question"><MathText text={problem.question} /></p>
              <form onSubmit={submitAnswer} className="answer-form">
                <label htmlFor="practice-answer">Your answer</label>
                <div className="answer-row"><input id="practice-answer" inputMode="decimal" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback(null); }} placeholder="Enter a number" autoComplete="off" /><button type="submit" disabled={!answer.trim() || !Number.isFinite(Number(answer.trim()))}>Submit answer</button></div>
              </form>
              {feedback && <div className={`practice-feedback ${feedback.correct ? "is-correct" : "is-wrong"}`} role="status"><strong>{feedback.correct ? "Correct answer!" : "Wrong answer"}</strong><span>{feedback.change > 0 ? "+" : ""}{feedback.change} rating</span></div>}
              {progress.solved.includes(problem.id) && <div className="problem-explanation"><h3><CheckCircle2 size={18} /> Explanation</h3>{problem.explanation.map((line) => <p key={line}><MathText text={line} /></p>)}</div>}
            </section>
            <section className="workspace-card"><div className="workspace-card-heading"><div><h2>Workspace</h2><p>Write your working here.</p></div><span>NOT SAVED</span></div><label className="sr-only" htmlFor="practice-work">Your working</label><textarea id="practice-work" value={work} onChange={(event) => setWork(event.target.value)} placeholder="Start writing your working..." /><p className="workspace-note">Your working is not submitted or saved in this prototype.</p></section>
          </div>
        </div>
      ) : (
        <section className="problem-list-card">
          <div className="problem-list-heading"><div><span className="list-icon"><ListChecks size={21} /></span><div><h2>Problem set</h2><p>{progress.solved.length} of {problems.length} solved</p></div></div><span className="sample-label">SAMPLE PROBLEMS</span></div>
          <div className="problem-list-columns"><span>PROBLEM</span><span>RATING</span><span>STATUS</span></div>
          {problems.map((item) => {
            const solved = progress.solved.includes(item.id);
            const started = progress.started.includes(item.id);
            return <button className="problem-row" key={item.id} onClick={() => openProblem(item.id)}><span className="problem-name"><span className={`problem-status-icon ${solved ? "solved" : started ? "started" : "new"}`}>{solved ? <CheckCircle2 size={20} /> : started ? <Clock3 size={20} /> : <Circle size={20} />}</span><span><strong>{item.title}</strong><small>{item.id} · {item.unit}</small></span></span><span className="problem-difficulty">{item.rating}</span><span className={`problem-status ${solved ? "solved" : started ? "started" : "new"}`}>{solved ? "Solved" : started ? "In progress" : "Not started"}</span><ArrowRight className="problem-arrow" size={18} /></button>;
          })}
        </section>
      )}
      <p className="practice-footnote">Prototype ratings and progress are saved only in this browser. MYP levels are indicative.</p>
    </div>
  );
}
