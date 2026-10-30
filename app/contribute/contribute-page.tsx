"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cloud, ImagePlus, LockKeyhole, Plus, Trash2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { imagePartBytes, maxImageBytes } from "@/lib/image-upload";
import ProblemContent from "../problem-content";
import { topics } from "../content/course";

type UploadedImage = { id: string; createdAt: string };

type Draft = {
  id: string;
  title: string;
  selections: { unitId: string; subtopicId: string }[];
  level: number;
  statement: string;
  explanation: string;
  answers: string[];
};

function draftKey(userId: string, id: string) {
  return `matty:contribute:draft:${userId}:${id}`;
}

export default function ContributePage({ problemId }: { problemId?: string }) {
  const router = useRouter();
  const isDraft = Boolean(problemId?.startsWith("draft-"));
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
  const [uploadProgress, setUploadProgress] = useState<{ field: "question" | "explanation"; percent: number } | null>(null);
  const [publishedId, setPublishedId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [libraryImages, setLibraryImages] = useState<UploadedImage[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [libraryError, setLibraryError] = useState("");
  const [imageTarget, setImageTarget] = useState<"question" | "explanation">("question");
  const showEditor = Boolean(problemId);
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

  useEffect(() => {
    if (!allowed || !session || !problemId) return;

    let cancelled = false;
    if (isDraft) {
      try {
        const saved = localStorage.getItem(draftKey(session.user.id, problemId));
        if (saved) {
          const draft = JSON.parse(saved) as Draft;
          // Restore the browser draft when the editor opens.
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setTitle(draft.title);
          setSelections(draft.selections);
          setLevel(draft.level);
          setStatement(draft.statement);
          setExplanation(draft.explanation);
          setAnswers(draft.answers);
        }
        setEditorLoaded(true);
      } catch {
        setMessage("Unable to load this draft.");
      }
    } else {
      fetch(`/api/contribute/problems/${encodeURIComponent(problemId)}`, { cache: "no-store" })
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok) throw new Error(result.message);
          if (cancelled) return;
          setTitle(result.title);
          setLevel(result.level);
          setStatement(result.statement);
          setExplanation(result.explanation);
          setAnswers(result.answers);
          setSelections(result.selections);
          setEditingId(result.code);
          setEditorLoaded(true);
        })
        .catch((error) => {
          if (!cancelled) setMessage(error instanceof Error ? error.message : "Unable to load the problem.");
        });
    }
    return () => { cancelled = true; };
  }, [allowed, session, problemId, isDraft]);

  useEffect(() => {
    if (!allowed || !session || !problemId || !isDraft || !editorLoaded || publishedId) return;
    const draft: Draft = { id: problemId, title, selections, level, statement, explanation, answers };
    try {
      localStorage.setItem(draftKey(session.user.id, problemId), JSON.stringify(draft));
    } catch {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setMessage("Unable to save the draft in this browser.");
    }
  }, [allowed, session, problemId, isDraft, editorLoaded, publishedId, title, selections, level, statement, explanation, answers]);

  useEffect(() => {
    if (!allowed || !session || showEditor) return;
    const prefix = `matty:contribute:draft:${session.user.id}:`;
    const saved: Draft[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(prefix)) continue;
      try {
        const draft = JSON.parse(localStorage.getItem(key) ?? "null") as Draft | null;
        if (draft?.id) saved.push(draft);
      } catch {
        // Ignore malformed browser data.
      }
    }
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setDrafts(saved);
  }, [allowed, session, showEditor]);

  useEffect(() => {
    if (!allowed || !showEditor || !editorLoaded) return;
    let cancelled = false;

    fetch("/api/contribute/images", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load uploads.");
        const images = await response.json() as UploadedImage[];
        if (!cancelled) setLibraryImages(images);
      })
      .catch(() => {
        if (!cancelled) setLibraryError("Unable to load uploads.");
      })
      .finally(() => {
        if (!cancelled) setLibraryLoading(false);
      });

    return () => { cancelled = true; };
  }, [allowed, showEditor, editorLoaded]);

  function insertLibraryImage(id: string) {
    const editor = imageTarget === "question" ? questionEditor.current : explanationEditor.current;
    const setter = imageTarget === "question" ? setStatement : setExplanation;
    const start = editor?.selectionStart;
    const end = editor?.selectionEnd;
    const markdown = `\n\n![Image](/api/contribute/images/${id})\n\n`;

    setter((current) => {
      const from = start ?? current.length;
      const to = end ?? current.length;
      return `${current.slice(0, from)}${markdown}${current.slice(to)}`;
    });
    requestAnimationFrame(() => {
      if (!editor) return;
      const position = (start ?? editor.value.length) + markdown.length;
      editor.focus();
      editor.setSelectionRange(position, position);
    });
  }

  function deleteDraft(id: string) {
    if (!session || !window.confirm("Delete this draft?")) return;
    localStorage.removeItem(draftKey(session.user.id, id));
    setDrafts((current) => current.filter((draft) => draft.id !== id));
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
    if (file.size > maxImageBytes) {
      setMessage("Images must be 15 MB or smaller.");
      return;
    }

    setBusy(true);
    setMessage("");
    setUploadProgress({ field, percent: 0 });
    let uploadId: string | null = null;

    try {
      const startResponse = await fetch("/api/contribute/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size: file.size, type: file.type }),
      });
      const started = await startResponse.json();
      if (!startResponse.ok) throw new Error(started.message);
      uploadId = started.id;

      const count = Math.ceil(file.size / imagePartBytes);
      for (let part = 0; part < count; part += 1) {
        const chunk = file.slice(part * imagePartBytes, (part + 1) * imagePartBytes);
        await new Promise<void>((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open("PUT", `/api/contribute/images/${uploadId}/parts/${part}`);
          request.setRequestHeader("Content-Type", "application/octet-stream");
          request.upload.onprogress = (progress) => {
            if (!progress.lengthComputable) return;
            const uploaded = part * imagePartBytes + progress.loaded;
            setUploadProgress({ field, percent: Math.min(95, Math.round(uploaded / file.size * 95)) });
          };
          request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
              resolve();
              return;
            }
            try {
              reject(new Error(JSON.parse(request.responseText).message || "Unable to upload image."));
            } catch {
              reject(new Error("Unable to upload image."));
            }
          };
          request.onerror = () => reject(new Error("Unable to upload image. Check your connection."));
          request.send(chunk);
        });
      }

      const response = await fetch(`/api/contribute/images/${uploadId}/complete`, { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const uploadedId = uploadId;
      uploadId = null;
      if (uploadedId) {
        setLibraryImages((current) => [{ id: uploadedId, createdAt: new Date().toISOString() }, ...current]);
      }

      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\\]/g, " ");
      const insert = (current: string) => `${current.slice(0, start)}\n\n![${alt}](${result.path})\n\n${current.slice(end)}`;
      if (field === "question") setStatement(insert);
      else setExplanation(insert);
    } catch (error) {
      if (uploadId) {
        await fetch(`/api/contribute/images/${uploadId}`, { method: "DELETE" }).catch(() => {});
      }
      setMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploadProgress(null);
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
      if (isDraft && problemId && session) {
        localStorage.removeItem(draftKey(session.user.id, problemId));
      }
      const publishedCode = editingId ?? result.id;
      setPublishedId(publishedCode);
      if (isDraft) router.replace(`/contribute/problem/${encodeURIComponent(publishedCode)}`);
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
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Log in to contribute</h1><Link className="contribute-primary" href={`/login?next=${encodeURIComponent(problemId ? `/contribute/problem/${problemId}` : "/contribute")}`}>Log in</Link></section>
      ) : !allowed ? (
        <section className="contribute-access"><LockKeyhole size={28} /><h1>Access restricted</h1><p>Your account ID</p><code>{session.user.id}</code>{message && <p role="alert">{message}</p>}</section>
      ) : publishedId ? (
        <section className="contribute-access">
          <h1>{editingId ? "Problem updated" : "Problem published"}</h1>
          <Link className="contribute-primary" href={`/practice/problems/${publishedId}`}>View problem</Link>
          <Link href="/contribute">Back to problems</Link>
        </section>
      ) : !showEditor ? (
        <section>
          <div className="contribute-title"><h1>Problems</h1><button className="contribute-primary" onClick={() => router.push(`/contribute/problem/draft-${crypto.randomUUID()}`)}>Create problem</button></div>
          {message && <p className="contribute-message" role="alert">{message}</p>}
          <div className="contribute-manage-table-wrap">
            <table className="contribute-manage-table">
              <thead><tr><th scope="col">#</th><th scope="col">Problem</th><th scope="col">Level</th><th scope="col">Author</th><th scope="col">Actions</th></tr></thead>
              <tbody>{drafts.map((draft) => (
                <tr key={draft.id}>
                  <td>Draft</td><td>{draft.title || "Untitled problem"}</td><td>{draft.level}</td><td>{session.user.name}</td>
                  <td><div className="contribute-actions"><Link href={`/contribute/problem/${draft.id}`}>Edit</Link><button className="contribute-delete" onClick={() => deleteDraft(draft.id)}>Delete</button></div></td>
                </tr>
              ))}{problems.map((item) => (
                <tr key={item.id}>
                  <td>{item.code ?? "—"}</td><td>{item.title}</td><td>{item.level}</td><td>{item.author}</td>
                  <td><div className="contribute-actions"><Link href={`/contribute/problem/${encodeURIComponent(item.code ?? item.id)}`}>Edit</Link><button className="contribute-delete" disabled={busy} onClick={() => deleteProblem(item.code ?? item.id, item.title)}>Delete</button></div></td>
                </tr>
              ))}</tbody>
            </table>
            {!listLoading && !problems.length && !drafts.length && !message && <p className="practice-no-results">No problems yet.</p>}
            {listLoading && <p className="practice-no-results">Loading...</p>}
          </div>
        </section>
      ) : !editorLoaded ? (
        <section>{message ? <p className="contribute-message" role="alert">{message}</p> : <p>Loading...</p>}<Link href="/contribute">Back to problems</Link></section>
      ) : (
        <form onSubmit={publish} className="contribute-form">
          <div className="contribute-editor-layout">
            <aside className="contribute-library" aria-label="Editor sidebar">
              <div className="contribute-library-rail">
                <button type="button" className={libraryOpen ? "contribute-library-toggle active" : "contribute-library-toggle"} onClick={() => setLibraryOpen((open) => !open)} aria-label="Uploads" aria-expanded={libraryOpen} title="Uploads">
                  <Cloud size={20} />
                </button>
              </div>
              {libraryOpen && (
                <div className="contribute-library-panel">
                  <div className="contribute-library-heading">
                    <h2>Uploads</h2>
                    <button type="button" onClick={() => setLibraryOpen(false)} aria-label="Close uploads"><X size={17} /></button>
                  </div>
                  <p className="contribute-library-label">Insert into</p>
                  <div className="contribute-library-target" role="group" aria-label="Image destination">
                    <button type="button" className={imageTarget === "question" ? "active" : ""} aria-pressed={imageTarget === "question"} onClick={() => setImageTarget("question")}>Question</button>
                    <button type="button" className={imageTarget === "explanation" ? "active" : ""} aria-pressed={imageTarget === "explanation"} onClick={() => setImageTarget("explanation")}>Explanation</button>
                  </div>
                  {libraryLoading ? <p className="contribute-library-empty">Loading...</p> : libraryError ? <p className="contribute-library-empty" role="alert">{libraryError}</p> : libraryImages.length === 0 ? <p className="contribute-library-empty">No uploads yet.</p> : (
                    <div className="contribute-library-images">
                      {libraryImages.map((image) => (
                        <button type="button" key={image.id} onClick={() => insertLibraryImage(image.id)} aria-label={`Insert image uploaded ${new Date(image.createdAt).toLocaleDateString()} into ${imageTarget}`} title="Insert image">
                          {/* Images are served through the authenticated contributor image route. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/api/contribute/images/${image.id}`} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </aside>
            <div className="contribute-editor-content">
          <div className="contribute-title"><div><Link className="contribute-back-list" href="/contribute"><ArrowLeft size={15} /> Problems</Link><h1>{editingId ? "Edit problem" : "Create a problem"}</h1><p>Markdown and LaTeX supported.</p></div><button className="contribute-primary" disabled={busy} type="submit">{busy ? "Working..." : editingId ? "Save changes" : "Publish problem"}</button></div>
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
              <section className="contribute-card"><div className="contribute-card-heading"><h2>Question</h2>{uploadProgress?.field === "question" ? (
                  <span className="upload-progress" role="status" aria-label={`Uploading image: ${uploadProgress.percent}%`}>
                    <span className="upload-progress-fill" style={{ width: `${uploadProgress.percent}%` }} />
                    <span>Uploading {uploadProgress.percent}%</span>
                  </span>
                ) : (
                  <label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadImage(event, "question")} disabled={busy} /></label>
                )}</div><textarea ref={questionEditor} onFocus={() => setImageTarget("question")} value={statement} onChange={(event) => setStatement(event.target.value)} required placeholder="Write the question in Markdown..." /><p className="contribute-hint">Inline math: $...$ · Display math: $$...$$</p></section>
              <section className="contribute-card"><h2>Accepted answers</h2>{answers.map((answer, index) => <div className="contribute-answer" key={index}><input value={answer} onChange={(event) => setAnswers((current) => current.map((value, i) => i === index ? event.target.value : value))} required maxLength={100} placeholder={`Answer ${index + 1}`} />{answers.length > 1 && <button type="button" aria-label={`Remove answer ${index + 1}`} onClick={() => setAnswers((current) => current.filter((_, i) => i !== index))}><Trash2 size={17} /></button>}</div>)}{answers.length < 10 && <button className="contribute-add" type="button" onClick={() => setAnswers((current) => [...current, ""])}><Plus size={16} /> Add answer</button>}</section>
              <section className="contribute-card">
                <div className="contribute-card-heading"><h2>Explanation</h2>{uploadProgress?.field === "explanation" ? (
                  <span className="upload-progress" role="status" aria-label={`Uploading image: ${uploadProgress.percent}%`}>
                    <span className="upload-progress-fill" style={{ width: `${uploadProgress.percent}%` }} />
                    <span>Uploading {uploadProgress.percent}%</span>
                  </span>
                ) : (
                  <label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadImage(event, "explanation")} disabled={busy} /></label>
                )}</div>
                <textarea ref={explanationEditor} onFocus={() => setImageTarget("explanation")} value={explanation} onChange={(event) => setExplanation(event.target.value)} required placeholder="Write the explanation in Markdown..." />
                <p className="contribute-hint">Inline math: $...$ · Display math: $$...$$</p>
              </section>
            </div>
            <aside className="contribute-side"><section className="contribute-card contribute-preview"><h2>Preview</h2><h3>{title || "Untitled problem"}</h3><ProblemContent markdown={statement} />{explanation && <><h3>Explanation</h3><ProblemContent markdown={explanation} /></>}</section></aside>
          </div>
            </div>
          </div>
        </form>
      )}
    </main>
  );
}
