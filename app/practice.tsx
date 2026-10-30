"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import PracticeWorkspace from "./practice-workspace";
import ProblemContent from "./problem-content";

type Problem = {
  id: string;
  title: string;
  unit: string;
  rating: number;
  level: number;
  author: string;
  published: string | null;
  question: string;
  status: "new" | "started" | "solved";
};

export default function Practice({ navigate }: { navigate: (path: string) => void }) {
  const { data: session, isPending } = authClient.useSession();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState("");
  const [acceptedAnswers, setAcceptedAnswers] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const problem = problems.find((item) => item.id === selected);

  const loadProblems = useCallback(async () => {
    try {
      const response = await fetch("/api/problems", { cache: "no-store" });
      if (!response.ok) throw new Error();
      setProblems(await response.json());
      setError("");
    } catch {
      setError("Unable to load problems. Please try again.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Refresh when the signed-in user changes.
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    if (!isPending) void loadProblems();
  }, [loadProblems, isPending, session?.user.id]);

  useEffect(() => {
    function syncRoute() {
      const segments = window.location.pathname.split("/").filter(Boolean);
      setSelected(segments[1] === "problems" && segments[2] ? segments[2] : null);
      setAnswer("");
      setFeedback(null);
      setExplanation("");
      setAcceptedAnswers([]);
      setCopyMessage("");
    }
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("matty-route", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("matty-route", syncRoute);
    };
  }, []);

  useEffect(() => {
    if (!selected || !session) return;
    let cancelled = false;
    async function loadProgress() {
      try {
        const path = `/api/problems/${encodeURIComponent(selected!)}/progress`;
        const response = await fetch(path);
        if (!response.ok) throw new Error();
        const progress = await response.json();
        if (cancelled) return;
        if (progress.solved) {
          setExplanation(progress.explanation ?? "");
          try {
            const parsed = JSON.parse(progress.answer);
            setAcceptedAnswers(Array.isArray(parsed) ? parsed : [progress.answer]);
          } catch {
            setAcceptedAnswers(progress.answer ? [progress.answer] : []);
          }
        }
        if (!progress.started) {
          const started = await fetch(path, { method: "POST" });
          if (!started.ok) throw new Error();
          if (!cancelled) setProblems((current) => current.map((item) => item.id === selected && item.status === "new" ? { ...item, status: "started" } : item));
        }
      } catch {
        if (!cancelled) setError("Unable to load or save progress.");
      }
    }
    void loadProgress();
    return () => { cancelled = true; };
  }, [selected, session]);

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problem || !answer.trim()) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/problems/${encodeURIComponent(problem.id)}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setFeedback(result.correct);
      if (result.correct) {
        setExplanation(result.explanation);
        setAcceptedAnswers(result.answers);
        setProblems((current) => current.map((item) => item.id === problem.id ? { ...item, status: "solved" } : item));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to submit your answer.");
    } finally {
      setBusy(false);
    }
  }

  function explanationPrompt() {
    if (!problem) return "";
    const absoluteImages = (text: string) => text.replace(
      /\]\((\/api\/contribute\/images\/[a-f0-9-]{36})\)/gi,
      (_match, path: string) => `](${window.location.origin}${path})`,
    );
    return `Help me understand this maths problem. Explain the reasoning step by step, using the answer and explanation below. Do not assume I know the method.\n\nQuestion:\n${absoluteImages(problem.question)}\n\nAccepted answers: ${acceptedAnswers.join(", ")}\n\nExplanation:\n${absoluteImages(explanation)}`;
  }

  const query = search.trim().toLowerCase();
  const visibleProblems = problems.filter((item) => {
    const matches = [item.id, item.title, item.unit, item.author, String(item.level), String(item.rating)]
      .some((value) => value.toLowerCase().includes(query));
    return matches && (statusFilter === "all" || item.status === statusFilter)
      && (levelFilter === "all" || String(item.level) === levelFilter)
      && (topicFilter === "all" || item.unit === topicFilter);
  });

  return (
    <div className="practice-page">
      <div className="practice-heading"><h1>Practice</h1></div>
      {error && <p className="auth-error" role="alert">{error}</p>}
      {selected && problem ? (
        <div className="problem-detail">
          <button className="problem-back" onClick={() => navigate("/practice/problems")}><ArrowLeft size={17} /> All problems</button>
          <div className="problem-detail-grid">
            <section className="problem-card">
              <div className="problem-meta"><span>{problem.id}</span><span>{problem.unit}</span><span>Level {problem.level}</span><span>{problem.rating} rating</span></div>
              <h2>{problem.title}</h2>
              <div className="problem-question"><ProblemContent markdown={problem.question} /></div>
              <form onSubmit={submitAnswer} className="answer-form">
                <label htmlFor="practice-answer">Your answer</label>
                <div className="answer-row"><input id="practice-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback(null); }} placeholder="Enter your answer" autoComplete="off" /><button type="submit" disabled={!answer.trim() || busy}>Submit answer</button></div>
              </form>
              {!session && !isPending && <p className="practice-signin">Log in to submit and save progress.</p>}
              {feedback !== null && <div className={`practice-feedback ${feedback ? "is-correct" : "is-wrong"}`} role="status"><strong>{feedback ? "Correct answer!" : "Wrong answer"}</strong></div>}
              {explanation && <div className="problem-explanation"><h3><CheckCircle2 size={18} /> Explanation</h3><ProblemContent markdown={explanation} />
                <div className="ai-explain-actions">
                  <button type="button" onClick={() => {
                    const url = `https://chatgpt.com/?q=${encodeURIComponent(explanationPrompt())}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}>Explain with ChatGPT</button>
                  <button type="button" onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(explanationPrompt());
                      setCopyMessage("Copied");
                    } catch {
                      setCopyMessage("Could not copy prompt.");
                    }
                  }}>Copy prompt</button>
                  <span role="status">{copyMessage}</span>
                </div>
              </div>}
            </section>
            <PracticeWorkspace key={`${problem.id}:${session?.user.id ?? "guest"}`} problemId={problem.id} userId={session?.user.id} />
          </div>
        </div>
      ) : selected && loaded ? (
        <section className="practice-empty"><p>Problem not found.</p><button className="problem-back" onClick={() => navigate("/practice/problems")}>All problems</button></section>
      ) : (
        <>
          <div className="practice-search-bar">
            <label className="practice-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search problems</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search problems" /></label>
            <div className="practice-filters">
              <label><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="new">Not started</option><option value="started">In progress</option><option value="solved">Solved</option></select></label>
              <label><span className="sr-only">Filter by level</span><select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}><option value="all">All levels</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((level) => <option value={level} key={level}>Level {level}</option>)}</select></label>
              <label><span className="sr-only">Filter by topic</span><select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)}><option value="all">All topics</option>{[...new Set(problems.map((item) => item.unit))].map((unit) => <option value={unit} key={unit}>{unit}</option>)}</select></label>
            </div>
          </div>
          <section className="problem-list-card" aria-label="Problems"><div className="problem-table-scroll"><table className="problem-table">
            <thead><tr><th>Status</th><th>Problem</th><th>Topic</th><th>Level</th><th>Rating</th><th>Author</th><th>Published</th></tr></thead>
            <tbody>{visibleProblems.map((item) => <tr key={item.id}>
              <td><span className={`problem-status ${item.status}`}>{item.status === "solved" ? "Solved" : item.status === "started" ? "In progress" : "Not started"}</span></td>
              <td><button className="problem-link" onClick={() => navigate(`/practice/problems/${item.id}`)}><span>{item.id}</span>{item.title}</button></td>
              <td>{item.unit}</td><td><span className={`level-badge level-${item.level}`}>{item.level}</span></td><td className="problem-difficulty">{item.rating}</td><td>{item.author}</td><td>{item.published ? new Date(item.published).toLocaleDateString() : "—"}</td>
            </tr>)}</tbody>
          </table></div>{loaded && !error && visibleProblems.length === 0 && <p className="practice-no-results">{problems.length ? "No problems found." : "No problems yet."}</p>}{!loaded && <p className="practice-no-results">Loading...</p>}</section>
        </>
      )}
    </div>
  );
}
