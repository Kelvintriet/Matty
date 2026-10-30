"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, LockKeyhole, Plus, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ProblemContent from "../problem-content";

export default function ContributePage() {
  const { data: session, isPending } = authClient.useSession();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(4);
  const [rating, setRating] = useState(1200);
  const [statement, setStatement] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [publishedId, setPublishedId] = useState("");
  const editor = useRef<HTMLTextAreaElement>(null);

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
        if (!cancelled) setAllowed(result.allowed === true);
      })
      .catch(() => { if (!cancelled) setMessage("Unable to check access."); })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [session, isPending]);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const start = editor.current?.selectionStart ?? statement.length;
    const end = editor.current?.selectionEnd ?? statement.length;
    const form = new FormData();
    form.append("image", file);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/contribute/images", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\\]/g, " ");
      setStatement((current) => `${current.slice(0, start)}\n\n![${alt}](${result.path})\n\n${current.slice(end)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setBusy(false);
    }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      const response = await fetch("/api/contribute/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, topic, level, rating, statement, explanation, answers }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setPublishedId(result.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to publish.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="contribute-page">
      <header className="contribute-header"><Link href="/practice/problems"><ArrowLeft size={17} /> Practice</Link><span>CONTRIBUTE</span></header>
      {isPending || checking ? <p>Loading...</p> : !session ? (
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Log in to contribute</h1><Link className="contribute-primary" href="/login?next=%2Fcontribute">Log in</Link></section>
      ) : !allowed ? (
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Access restricted</h1><p>Your account ID</p><code>{session.user.id}</code>{message && <p role="alert">{message}</p>}</section>
      ) : publishedId ? (
        <section className="contribute-access"><h1>Problem published</h1><Link className="contribute-primary" href={`/practice/problems/${publishedId}`}>View problem</Link><button onClick={() => { setPublishedId(""); setTitle(""); setStatement(""); setExplanation(""); setAnswers([""]); }}>Create another</button></section>
      ) : (
        <form onSubmit={publish} className="contribute-form">
          <div className="contribute-title"><div><h1>Create a problem</h1><p>Markdown and LaTeX supported.</p></div><button className="contribute-primary" disabled={busy} type="submit">{busy ? "Working..." : "Publish problem"}</button></div>
          {message && <p className="contribute-message" role="alert">{message}</p>}
          <div className="contribute-grid">
            <div className="contribute-main">
              <section className="contribute-card"><h2>Problem details</h2><div className="contribute-fields"><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={255} /></label><label>Topic<input value={topic} onChange={(event) => setTopic(event.target.value)} required maxLength={255} /></label><label>Level<select value={level} onChange={(event) => setLevel(Number(event.target.value))}>{[1,2,3,4,5,6,7,8].map((number) => <option key={number}>{number}</option>)}</select></label><label>Rating<input type="number" min="100" max="10000" value={rating} onChange={(event) => setRating(Number(event.target.value))} required /></label></div></section>
              <section className="contribute-card"><div className="contribute-card-heading"><h2>Question</h2><label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage} disabled={busy} /></label></div><textarea ref={editor} value={statement} onChange={(event) => setStatement(event.target.value)} required placeholder="Write the question in Markdown..." /><p className="contribute-hint">Inline math: $...$ · Display math: $$...$$</p></section>
              <section className="contribute-card"><h2>Accepted answers</h2>{answers.map((answer, index) => <div className="contribute-answer" key={index}><input value={answer} onChange={(event) => setAnswers((current) => current.map((value, i) => i === index ? event.target.value : value))} required maxLength={100} placeholder={`Answer ${index + 1}`} />{answers.length > 1 && <button type="button" aria-label={`Remove answer ${index + 1}`} onClick={() => setAnswers((current) => current.filter((_, i) => i !== index))}><Trash2 size={17} /></button>}</div>)}{answers.length < 10 && <button className="contribute-add" type="button" onClick={() => setAnswers((current) => [...current, ""])}><Plus size={16} /> Add answer</button>}</section>
              <section className="contribute-card"><h2>Explanation</h2><textarea value={explanation} onChange={(event) => setExplanation(event.target.value)} required placeholder="Write a brief explanation..." /></section>
            </div>
            <aside className="contribute-side"><section className="contribute-card contribute-preview"><h2>Preview</h2><h3>{title || "Untitled problem"}</h3><ProblemContent markdown={statement} />{explanation && <><h3>Explanation</h3><ProblemContent markdown={explanation} /></>}</section></aside>
          </div>
        </form>
      )}
    </main>
  );
}
