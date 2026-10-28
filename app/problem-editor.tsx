"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import ProblemContent from "./problem-content";

const draftKey = "matty-problem-draft-v1";
type Draft = { markdown: string; images: Record<string, string> };

const initialDraft = String.raw`A triangle has a base of $8$ cm and a height of $5$ cm.

Find its **area** in $\text{cm}^2$.

$$A=\frac{1}{2}bh$$`;

export default function ProblemEditor({ onBack }: { onBack: () => void }) {
  const [draft, setDraft] = useState<Draft>({ markdown: initialDraft, images: {} });
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const editor = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved !== null) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.markdown === "string" && parsed.images && typeof parsed.images === "object") {
            setDraft({ markdown: parsed.markdown, images: parsed.images });
          } else {
            throw new Error("Legacy draft");
          }
        } catch {
          const images: Record<string, string> = {};
          const markdown = saved.replace(/!\[([^\]]*)\]\((data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+)\)/gi, (_match, alt: string, data: string, extension: string) => {
            const path = `uploads/image-${Object.keys(images).length + 1}.${extension}`;
            images[path] = data;
            return `![${alt}](${path})`;
          });
          setDraft({ markdown, images });
        }
      }
    } catch {
      setMessage("This browser could not load the draft.");
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(draft));
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
    const start = editor.current?.selectionStart ?? draft.markdown.length;
    const end = editor.current?.selectionEnd ?? draft.markdown.length;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\\]/g, " ");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const data = reader.result;
      setDraft((current) => {
        let path = `uploads/${safeName}`;
        let suffix = 2;
        while (path in current.images) {
          path = `uploads/${suffix}-${safeName}`;
          suffix += 1;
        }
        return {
          markdown: `${current.markdown.slice(0, start)}\n\n![${alt}](${path})\n\n${current.markdown.slice(end)}`,
          images: { ...current.images, [path]: data },
        };
      });
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
          <textarea ref={editor} id="problem-markdown" value={draft.markdown} onChange={(event) => setDraft((current) => ({ ...current, markdown: event.target.value }))} spellCheck={false} />
          <p>Use <code>$...$</code> for inline math and <code>$$...$$</code> for display math.</p>
          {message && <p className="workspace-storage-error" role="status">{message}</p>}
        </section>
        <section className="problem-editor-pane problem-editor-preview"><div className="problem-editor-toolbar"><strong>Preview</strong></div><ProblemContent markdown={draft.markdown} images={draft.images} /></section>
      </div>
    </div>
  );
}
