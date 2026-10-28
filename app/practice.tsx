"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Search, Trophy } from "lucide-react";
import PracticeWorkspace from "./practice-workspace";
import ProblemContent from "./problem-content";
import ProblemEditor from "./problem-editor";

type Problem = {
  id: string;
  title: string;
  unit: string;
  rating: number;
  level: number;
  author: string;
  published: string | null;
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
    level: 2,
    author: "Sample",
    published: null,
    question: String.raw`A length is measured as $48$ cm, but its actual length is $50$ cm.

![Measured and actual lengths](/problems/measurement.svg)

Find the **percentage error**. Enter the percentage as a number.`,
    answer: 4,
    explanation: ["The absolute error is \\(50-48=2\\) cm.", "Percentage error is \\(\\frac{2}{50}\\times100=4\\%\\)."],
  },
  {
    id: "P002",
    title: "The growing pattern",
    unit: "Sequences and Series",
    rating: 1200,
    level: 3,
    author: "Sample",
    published: null,
    question: "The sequence \\(7, 11, 15, 19, \\ldots\\) is arithmetic. Find the \\(25\\)th term.",
    answer: 103,
    explanation: ["The first term is \\(7\\) and the common difference is \\(4\\).", "\\(u_{25}=7+(25-1)(4)=103\\)."],
  },
  {
    id: "P003",
    title: "A small deposit",
    unit: "Financial Mathematics",
    rating: 1300,
    level: 4,
    author: "Sample",
    published: null,
    question: "An investment of \\(1000\\) earns \\(10\\%\\) compound interest annually for \\(2\\) years. Find its final value.",
    answer: 1210,
    explanation: ["The annual multiplier is \\(1.10\\).", "\\(FV=1000(1.10)^2=1210\\)."],
  },
  {
    id: "P004",
    title: "A quadratic pattern",
    unit: "Sequences and Series",
    rating: 1500,
    level: 5,
    author: "Sample",
    published: null,
    question: "A sequence has the rule \\(u_n=2n^2-3n+1\\). Find \\(u_8\\).",
    answer: 105,
    explanation: ["Substitute \\(n=8\\): \\(u_8=2(8)^2-3(8)+1\\).", "\\(u_8=128-24+1=105\\)."],
  },
  {
    id: "P005",
    title: "Working backwards",
    unit: "Financial Mathematics",
    rating: 1600,
    level: 6,
    author: "Sample",
    published: null,
    question: "An investment grows to \\(1452\\) after \\(2\\) years at \\(10\\%\\) compound interest annually. Find its starting value.",
    answer: 1200,
    explanation: ["Use \\(1452=PV(1.10)^2\\).", "\\(PV=\\frac{1452}{1.21}=1200\\)."],
  },
  {
    id: "P006",
    title: "A geometric total",
    unit: "Sequences and Series",
    rating: 1800,
    level: 7,
    author: "Sample",
    published: null,
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

export default function Practice({ navigate }: {
  navigate: (path: string) => void;
}) {
  const [progress, setProgress] = useState<PracticeState>(initialState);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [tab, setTab] = useState<"Problems" | "Contests" | "Test">("Problems");
  const [selected, setSelected] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const problem = problems.find((item) => item.id === selected);
  const rank = rankFor(progress.rating);
  const query = search.trim().toLowerCase();
  const visibleProblems = problems.filter((item) => {
    const status = progress.solved.includes(item.id)
      ? "solved"
      : progress.started.includes(item.id) ? "started" : "new";
    const matchesSearch = [item.id, item.title, item.unit, item.author, item.published ?? "", String(item.level), String(item.rating)]
      .some((value) => value.toLowerCase().includes(query));

    return matchesSearch
      && (statusFilter === "all" || status === statusFilter)
      && (levelFilter === "all" || String(item.level) === levelFilter)
      && (topicFilter === "all" || item.unit === topicFilter);
  });
  const testMatches = query && "test practice test myp 5 criterion a".includes(query);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved && Number.isFinite(saved.rating) && Array.isArray(saved.started) && Array.isArray(saved.solved)) {
        setProgress({
          rating: saved.ratingSourceVersion === 1 ? saved.rating : 1200,
          started: saved.started,
          solved: saved.solved,
        });
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
      localStorage.setItem(storageKey, JSON.stringify({ ...progress, ratingSourceVersion: 1 }));
    } catch {
      // Practice remains usable for the current session if storage is unavailable.
    }
  }, [loaded, progress]);

  useEffect(() => {
    function syncRoute() {
      const segments = window.location.pathname.split("/").filter(Boolean);
      const section = segments[1];
      setEditing(section === "editor");
      setTab(section === "contests" ? "Contests" : section === "test" ? "Test" : "Problems");
      setSelected(section === "problems" && segments[2] ? segments[2] : null);
      setAnswer("");
      setFeedback(null);
    }

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("matty-route", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("matty-route", syncRoute);
    };
  }, []);

  function openProblem(id: string) {
    navigate(`/practice/problems/${id}`);
    setSelected(id);
    setAnswer("");
    setFeedback(null);
    setProgress((current) => ({ ...current, started: [...new Set([...current.started, id])] }));
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problem || !answer.trim()) return;
    const numericAnswer = Number(answer.trim());
    if (!Number.isFinite(numericAnswer)) return;
    const correct = Math.abs(numericAnswer - problem.answer) < 0.000001;
    setProgress((current) => ({
      ...current,
      solved: correct && !current.solved.includes(problem.id)
        ? [...current.solved, problem.id]
        : current.solved,
    }));
    setFeedback({ correct });
  }

  return (
    <div className="practice-page">
      <div className="practice-heading">
        <h1>Practice</h1>
        <div className={`practice-rating rank-${rank.color}`} aria-label={`Rating ${progress.rating}`}>
          <Trophy size={19} />
          <strong>{progress.rating}</strong>
        </div>
      </div>

      <nav className="practice-tabs" aria-label="Practice sections">
        {(["Problems", "Contests", "Test"] as const).map((item) => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            aria-current={tab === item ? "page" : undefined}
            onClick={() => {
              navigate(`/practice/${item.toLowerCase()}`);
              setTab(item);
              setSelected(null);
                        setFeedback(null);
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="practice-search-bar">
        <label className="practice-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search all practice</span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              if (event.target.value.trim() && selected) {
                navigate("/practice/problems");
                setSelected(null);
              }
            }}
            placeholder="Search practice"
          />
        </label>
        {(tab === "Problems" || query) && !problem && (
          <div className="practice-filters">
            <label><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="new">Not started</option><option value="started">In progress</option><option value="solved">Solved</option></select></label>
            <label><span className="sr-only">Filter by level</span><select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}><option value="all">All levels</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((level) => <option value={level} key={level}>Level {level}</option>)}</select></label>
            <label><span className="sr-only">Filter by topic</span><select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)}><option value="all">All topics</option>{[...new Set(problems.map((item) => item.unit))].map((unit) => <option value={unit} key={unit}>{unit}</option>)}</select></label>
          </div>
        )}
      </div>

      {editing ? <ProblemEditor onBack={() => navigate("/practice/problems")} /> : query && !problem ? (
        <section className="search-results" aria-live="polite">
          <h2>Search results</h2>
          {visibleProblems.map((item) => (
            <button key={item.id} className="search-result" onClick={() => { setTab("Problems"); openProblem(item.id); }}>
              <span><strong>{item.title}</strong><small>{item.id} · {item.unit}</small></span>
              <span>Level {item.level} · {item.rating}</span>
            </button>
          ))}
          {testMatches && (
            <button className="search-result" onClick={() => { setSearch(""); navigate("/practice/test"); setTab("Test"); }}>
              <span><strong>Practice test</strong><small>MYP 5 · Criterion A</small></span>
              <span>Test</span>
            </button>
          )}
          {visibleProblems.length === 0 && !testMatches && <p>No results found.</p>}
        </section>
      ) : tab === "Contests" ? (
        <section className="practice-empty">
          <h2>Contests</h2>
          <div className="contest-columns"><span>CONTEST</span><span>START</span><span>STATUS</span></div>
          <p>No contests yet.</p>
        </section>
      ) : tab === "Test" ? (
        <section className="test-preview">
          <div className="test-preview-heading">
            <div>
              <span className="test-label">MYP 5 · CRITERION A</span>
              <h2>Practice test</h2>
            </div>
            <span className="test-preview-badge">COMING SOON</span>
          </div>
          <div className="test-facts">
            <div><strong>60</strong><span>minutes</span></div>
            <div><strong>20</strong><span>questions</span></div>
            <div><strong>1–8</strong><span>levels</span></div>
          </div>
          <h3>Question mix</h3>
          <div className="test-distribution">
            <span>Levels 1–2<strong>4 questions</strong></span>
            <span>Levels 3–4<strong>7 questions</strong></span>
            <span>Levels 5–6<strong>6 questions</strong></span>
            <span>Levels 7–8<strong>3 questions</strong></span>
          </div>
          <button className="test-start" disabled>Start test</button>
        </section>
      ) : problem ? (
        <div className="problem-detail">
          <button className="problem-back" onClick={() => { navigate("/practice/problems"); setSelected(null); setFeedback(null); }}><ArrowLeft size={17} /> All problems</button>
          <div className="problem-detail-grid">
            <section className="problem-card">
              <div className="problem-meta"><span>{problem.id}</span><span>{problem.unit}</span><span>Level {problem.level}</span><span>{problem.rating} rating</span></div>
              <h2>{problem.title}</h2>
              <div className="problem-question"><ProblemContent markdown={problem.question} /></div>
              <form onSubmit={submitAnswer} className="answer-form">
                <label htmlFor="practice-answer">Your answer</label>
                <div className="answer-row"><input id="practice-answer" inputMode="decimal" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback(null); }} placeholder="Enter a number" autoComplete="off" /><button type="submit" disabled={!answer.trim() || !Number.isFinite(Number(answer.trim()))}>Submit answer</button></div>
              </form>
              {feedback && <div className={`practice-feedback ${feedback.correct ? "is-correct" : "is-wrong"}`} role="status"><strong>{feedback.correct ? "Correct answer!" : "Wrong answer"}</strong></div>}
              {progress.solved.includes(problem.id) && <div className="problem-explanation"><h3><CheckCircle2 size={18} /> Explanation</h3>{problem.explanation.map((line) => <ProblemContent key={line} markdown={line} />)}</div>}
            </section>
            <PracticeWorkspace key={problem.id} problemId={problem.id} />
          </div>
        </div>
      ) : selected ? (
        <section className="practice-empty"><p>Problem not found.</p><button className="problem-back" onClick={() => navigate("/practice/problems")}>All problems</button></section>
      ) : (
        <div className="problem-list-wrap">
          <div className="problem-list-actions"><button onClick={() => navigate("/practice/editor")}>Try problem editor</button></div>
        <section className="problem-list-card" aria-label="Problems">
          <div className="problem-table-scroll">
            <table className="problem-table">
              <thead>
                <tr>
                  <th scope="col">Status</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Level</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Author</th>
                  <th scope="col">Published</th>
                </tr>
              </thead>
              <tbody>
                {visibleProblems.map((item) => {
                  const solved = progress.solved.includes(item.id);
                  const started = progress.started.includes(item.id);
                  const status = solved ? "solved" : started ? "started" : "new";

                  return (
                    <tr key={item.id}>
                      <td><span className={`problem-status ${status}`}>{solved ? "Solved" : started ? "In progress" : "Not started"}</span></td>
                      <td><button className="problem-link" onClick={() => openProblem(item.id)}><span>{item.id}</span>{item.title}</button></td>
                      <td>{item.unit}</td>
                      <td><span className={`level-badge level-${item.level}`}>{item.level}</span></td>
                      <td className="problem-difficulty">{item.rating}</td>
                      <td>{item.author}</td>
                      <td>{item.published ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {visibleProblems.length === 0 && <p className="practice-no-results">No problems found.</p>}
          </div>
        </section>
        </div>
      )}
    </div>
  );
}
