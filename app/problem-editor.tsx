"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import ProblemContent from "./problem-content";

const draftKey = "matty-problem-draft-v1";
const initialDraft = String.raw`A triangle has a base of $8$ cm and a height of $5$ cm.

Find its **area** in $\text{cm}^2$.

$$A=\frac{1}{2}bh$$`;

export default function ProblemEditor({ onBack }: { onBack: () => void }) {
  const [draft, setDraft] = useState(initialDraft);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const editor = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved !== null) setDraft(saved);
    } catch {
      setMessage("This browser could not load the draft.");
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(draftKey, draft);
    } catch {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setMessage("This browser could not save the draft. Try a smaller image.");
    }
  }, [draft, loaded]);

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/[.]?(png|jpe?g|gif|webp)$/i.test(file.name) || !["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type)) {
      setMessage("Choose a PNG, JPEG, GIF, or WebP image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Choose an image smaller than 2 MB.");
      return;
    }
    const start = editor.current?.selectionStart ?? draft.length;
    const end = editor.current?.selectionEnd ?? draft.length;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\\]/g, " ");
      setDraft((current) => `${current.slice(0, start)}\n\n![${alt}](${reader.result})\n\n${current.slice(end)}`);
      setMessage("");
    };
    reader.onerror = () => setMessage("Could not read the image.");
    reader.readAsDataURL(file);
  }

  return (
    <div className="problem-editor">
      <button className="problem-back" onClick={onBack}><ArrowLeft size={17} /> All problems</button>
      <div className="problem-editor-heading"><h2>Problem editor</h2><span>LOCAL DRAFT</span></div>
      <div className="problem-editor-grid">
        <section className="problem-editor-pane">
          <div className="problem-editor-toolbar"><strong>Markdown</strong><label className="upload-image"><ImagePlus size={16} /> Add image<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={uploadImage} /></label></div>
          <label htmlFor="problem-markdown" className="sr-only">Problem Markdown</label>
          <textarea ref={editor} id="problem-markdown" value={draft} onChange={(event) => setDraft(event.target.value)} spellCheck={false} />
          <p>Use <code>$...$</code> for inline math and <code>$$...$$</code> for display math.</p>
          {message && <p className="workspace-storage-error" role="status">{message}</p>}
        </section>
        <section className="problem-editor-pane problem-editor-preview"><div className="problem-editor-toolbar"><strong>Preview</strong></div><ProblemContent markdown={draft} /></section>
      </div>
    </div>
  );
}
