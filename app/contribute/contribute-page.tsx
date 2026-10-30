"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, LockKeyhole, Plus, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ProblemContent from "../problem-content";
import { topics } from "../content/course";

export default function ContributePage() {
  const { data: session, isPending } = authClient.useSession();
  const [allowedUserId, setAllowedUserId] = useState<string | null>(null);
  const allowed = Boolean(session && allowedUserId === session.user.id);
  const [checking, setChecking] = useState(true);
  const [title, setTitle] = useState("");
  const [selections, setSelections] = useState<{ unitId: string; subtopicId: string }[]>([]);
  const [level, setLevel] = useState(4);
  const [statement, setStatement] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [publishedId, setPublishedId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [problems, setProblems] = useState<{ id: string; code: string | null; title: string; author: string; level: number }[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const questionEditor = useRef<HTMLTextAreaElement>(null);
  const explanationEditor = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      // A missing session needs no access request.
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setChecking(false);
      return;
    }
    let cancelled = false;
    fetch("/api/contribute/access", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const result = await response.json();
        if (!cancelled) setAllowedUserId(result.allowed === true ? session.user.id : null);
      })
      .catch(() => { if (!cancelled) setMessage("Unable to check access."); })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [session, isPending]);

  useEffect(() => {
    if (!allowed || showEditor || publishedId) return;
    let cancelled = false;
    fetch("/api/contribute/problems", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const items = await response.json();
        if (!cancelled) setProblems(items);
      })
      .catch(() => { if (!cancelled) setMessage("Unable to load problems."); })
      .finally(() => { if (!cancelled) setListLoading(false); });
    return () => { cancelled = true; };
  }, [allowed, showEditor, publishedId]);

  function resetForm() {
    setTitle("");
    setStatement("");
    setExplanation("");
    setAnswers([""]);
    setSelections([]);
    setLevel(4);
    setEditingId(null);
    setPublishedId("");
    setMessage("");
  }

  async function editProblem(id: string) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/contribute/problems/${encodeURIComponent(id)}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setTitle(result.title);
      setLevel(result.level);
      setStatement(result.statement);
      setExplanation(result.explanation);
      setAnswers(result.answers);
      setSelections(result.selections);
      setEditingId(result.code);
      setShowEditor(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load the problem.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteProblem(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This also deletes its saved practice progress.`)) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/contribute/problems/${encodeURIComponent(id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setProblems((current) => current.filter((item) => item.id !== id && item.code !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete the problem.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>, field: "question" | "explanation") {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const editor = field === "question" ? questionEditor.current : explanationEditor.current;
    const currentText = field === "question" ? statement : explanation;
    const start = editor?.selectionStart ?? currentText.length;
    const end = editor?.selectionEnd ?? currentText.length;
    const form = new FormData();
    form.append("image", file);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/contribute/images", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\\]/g, " ");
      const insert = (current: string) => `${current.slice(0, start)}\n\n![${alt}](${result.path})\n\n${current.slice(end)}`;
      if (field === "question") setStatement(insert);
      else setExplanation(insert);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setBusy(false);
    }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!selections.length) {
      setMessage("Choose at least one subtopic.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(editingId ? `/api/contribute/problems/${encodeURIComponent(editingId)}` : "/api/contribute/problems", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, selections, level, statement, explanation, answers }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setPublishedId(editingId ?? result.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to publish.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="contribute-page">
      <header className="contribute-header"><Link href="/practice/problems"><ArrowLeft size={17} /> Practice</Link><Link href="/docs">Developer docs</Link></header>
      {isPending || checking ? <p>Loading...</p> : !session ? (
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Log in to contribute</h1><Link className="contribute-primary" href="/login?next=%2Fcontribute">Log in</Link></section>
      ) : !allowed ? (
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Access restricted</h1><p>Your account ID</p><code>{session.user.id}</code>{message && <p role="alert">{message}</p>}</section>
      ) : publishedId ? (
        <section className="contribute-access">
          <h1>{editingId ? "Problem updated" : "Problem published"}</h1>
          <Link className="contribute-primary" href={`/practice/problems/${publishedId}`}>View problem</Link>
          <button onClick={() => { resetForm(); setListLoading(true); setShowEditor(false); }}>Back to problems</button>
        </section>
      ) : !showEditor ? (
        <section>
          <div className="contribute-title"><h1>Problems</h1><button className="contribute-primary" onClick={() => { resetForm(); setShowEditor(true); }}>Create problem</button></div>
          {message && <p className="contribute-message" role="alert">{message}</p>}
          <div className="contribute-manage-table-wrap">
            <table className="contribute-manage-table">
              <thead><tr><th scope="col">#</th><th scope="col">Problem</th><th scope="col">Level</th><th scope="col">Author</th><th scope="col">Actions</th></tr></thead>
              <tbody>{problems.map((item) => (
                <tr key={item.id}>
                  <td>{item.code ?? "—"}</td><td>{item.title}</td><td>{item.level}</td><td>{item.author}</td>
                  <td><div className="contribute-actions"><button disabled={busy} onClick={() => editProblem(item.code ?? item.id)}>Edit</button><button className="contribute-delete" disabled={busy} onClick={() => deleteProblem(item.code ?? item.id, item.title)}>Delete</button></div></td>
                </tr>
              ))}</tbody>
            </table>
            {!listLoading && !problems.length && !message && <p className="practice-no-results">No problems yet.</p>}
            {listLoading && <p className="practice-no-results">Loading...</p>}
          </div>
        </section>
      ) : (
        <form onSubmit={publish} className="contribute-form">
          <div className="contribute-title"><div><button type="button" className="contribute-back-list" onClick={() => { resetForm(); setListLoading(true); setShowEditor(false); }}><ArrowLeft size={15} /> Problems</button><h1>{editingId ? "Edit problem" : "Create a problem"}</h1><p>Markdown and LaTeX supported.</p></div><button className="contribute-primary" disabled={busy} type="submit">{busy ? "Working..." : editingId ? "Save changes" : "Publish problem"}</button></div>
          {message && <p className="contribute-message" role="alert">{message}</p>}
          <div className="contribute-grid">
            <div className="contribute-main">
              <section className="contribute-card">
                <h2>Problem details</h2>
                <div className="contribute-fields">
                  <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={255} /></label>
                  <label>Level<select value={level} onChange={(event) => setLevel(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option key={number}>{number}</option>)}</select></label>
                </div>
              </section>
              <section className="contribute-card">
                <div className="contribute-card-heading"><h2>Topics</h2><span className="contribute-selected-count">{selections.length} selected</span></div>
                <div className="contribute-topic-list">
                  {topics.map((unit) => (
                    <details key={unit.id}>
                      <summary>{unit.title}</summary>
                      <div className="contribute-topic-options">
                        {unit.lessons.map((lesson) => {
                          const checked = selections.some((item) => item.unitId === unit.id && item.subtopicId === lesson.id);
                          return (
                            <label key={lesson.id}>
                              <input type="checkbox" checked={checked} onChange={(event) => {
                                const selected = event.currentTarget.checked;
                                setSelections((current) => selected
                                  ? [...current, { unitId: unit.id, subtopicId: lesson.id }]
                                  : current.filter((item) => item.unitId !== unit.id || item.subtopicId !== lesson.id));
                              }} />
                              <span>{lesson.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
              <section className="contribute-card"><div className="contribute-card-heading"><h2>Question</h2><label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadImage(event, "question")} disabled={busy} /></label></div><textarea ref={questionEditor} value={statement} onChange={(event) => setStatement(event.target.value)} required placeholder="Write the question in Markdown..." /><p className="contribute-hint">Inline math: $...$ · Display math: $$...$$</p></section>
              <section className="contribute-card"><h2>Accepted answers</h2>{answers.map((answer, index) => <div className="contribute-answer" key={index}><input value={answer} onChange={(event) => setAnswers((current) => current.map((value, i) => i === index ? event.target.value : value))} required maxLength={100} placeholder={`Answer ${index + 1}`} />{answers.length > 1 && <button type="button" aria-label={`Remove answer ${index + 1}`} onClick={() => setAnswers((current) => current.filter((_, i) => i !== index))}><Trash2 size={17} /></button>}</div>)}{answers.length < 10 && <button className="contribute-add" type="button" onClick={() => setAnswers((current) => [...current, ""])}><Plus size={16} /> Add answer</button>}</section>
              <section className="contribute-card">
                <div className="contribute-card-heading"><h2>Explanation</h2><label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadImage(event, "explanation")} disabled={busy} /></label></div>
                <textarea ref={explanationEditor} value={explanation} onChange={(event) => setExplanation(event.target.value)} required placeholder="Write the explanation in Markdown..." />
                <p className="contribute-hint">Inline math: $...$ · Display math: $$...$$</p>
              </section>
            </div>
            <aside className="contribute-side"><section className="contribute-card contribute-preview"><h2>Preview</h2><h3>{title || "Untitled problem"}</h3><ProblemContent markdown={statement} />{explanation && <><h3>Explanation</h3><ProblemContent markdown={explanation} /></>}</section></aside>
          </div>
        </form>
      )}
    </main>
  );
}
