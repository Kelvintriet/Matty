"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Eraser, FileText, PenLine, RotateCcw, Trash2, Plus } from "lucide-react";

type Point = { x: number; y: number };
type Stroke = Point[];
type WorkspaceData = { notes: string; strokes: Stroke[]; boardHeight: number };

const emptyWorkspace: WorkspaceData = { notes: "", strokes: [], boardHeight: 900 };

export default function PracticeWorkspace({ problemId }: { problemId: string }) {
  const [mode, setMode] = useState<"notes" | "whiteboard">("notes");
  const [data, setData] = useState<WorkspaceData>(emptyWorkspace);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [history, setHistory] = useState<Stroke[][]>([]);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const drawing = useRef(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const storageKey = `matty-workspace-v1:${problemId}`;

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved && typeof saved.notes === "string" && Array.isArray(saved.strokes)) {
        setData({
          notes: saved.notes,
          strokes: saved.strokes.filter((stroke: unknown) => Array.isArray(stroke)),
          boardHeight: Number.isFinite(saved.boardHeight) ? Math.max(900, Math.min(saved.boardHeight, 10000)) : 900,
        });
      }
    } catch {
      setStorageError(true);
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // Surface storage failures while keeping the workspace usable.
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setStorageError(true);
    }
  }, [data, loaded, storageKey]);

  useEffect(() => {
    const field = notesRef.current;
    if (mode === "notes" && field && field.scrollHeight > field.clientHeight) {
      field.style.height = `${field.scrollHeight}px`;
    }
  }, [mode, loaded]);

  function pointFor(event: PointerEvent<SVGSVGElement>): Point {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1000, (event.clientX - bounds.left) / bounds.width * 1000)),
      y: Math.max(0, Math.min(data.boardHeight, (event.clientY - bounds.top) / bounds.height * data.boardHeight)),
    };
  }

  function eraseAt(event: PointerEvent<SVGSVGElement>) {
    const point = pointFor(event);
    const bounds = event.currentTarget.getBoundingClientRect();
    const scaleX = bounds.width / 1000;
    const scaleY = bounds.height / data.boardHeight;

    function isNearStroke(stroke: Stroke) {
      return stroke.some((end, index) => {
        const start = stroke[Math.max(0, index - 1)];
        const dx = (end.x - start.x) * scaleX;
        const dy = (end.y - start.y) * scaleY;
        const px = (point.x - start.x) * scaleX;
        const py = (point.y - start.y) * scaleY;
        const lengthSquared = dx * dx + dy * dy;
        const fraction = lengthSquared ? Math.max(0, Math.min(1, (px * dx + py * dy) / lengthSquared)) : 0;
        return Math.hypot(px - fraction * dx, py - fraction * dy) <= 14;
      });
    }

    setData((current) => ({ ...current, strokes: current.strokes.filter((stroke) => !isNearStroke(stroke)) }));
  }

  function startStroke(event: PointerEvent<SVGSVGElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    setHistory((current) => [...current.slice(-49), data.strokes]);

    if (tool === "eraser") {
      eraseAt(event);
      return;
    }

    const point = pointFor(event);
    setData((current) => ({ ...current, strokes: [...current.strokes, [point]] }));
  }

  function continueStroke(event: PointerEvent<SVGSVGElement>) {
    if (!drawing.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    if (tool === "eraser") {
      eraseAt(event);
      return;
    }

    const point = pointFor(event);
    setData((current) => {
      const strokes = [...current.strokes];
      const last = strokes.length - 1;
      if (last >= 0) strokes[last] = [...strokes[last], point];
      return { ...current, strokes };
    });
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setData((current) => ({ ...current, strokes: previous }));
    setHistory((current) => current.slice(0, -1));
  }

  return (
    <section className="workspace-card" aria-label="Working area">
      <div className="working-toolbar">
        <div className="working-modes" aria-label="Working mode">
          <button type="button" className={mode === "notes" ? "active" : ""} aria-pressed={mode === "notes"} onClick={() => setMode("notes")}><FileText size={16} /> Notes</button>
          <button type="button" className={mode === "whiteboard" ? "active" : ""} aria-pressed={mode === "whiteboard"} onClick={() => setMode("whiteboard")}><PenLine size={16} /> Whiteboard</button>
        </div>
        {mode === "whiteboard" && (
          <div className="board-actions">
            <button type="button" className={tool === "pen" ? "active" : ""} aria-pressed={tool === "pen"} onClick={() => setTool("pen")}><PenLine size={15} /> Pen</button>
            <button type="button" className={tool === "eraser" ? "active" : ""} aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")}><Eraser size={15} /> Eraser</button>
            <button type="button" disabled={!history.length} onClick={undo}><RotateCcw size={15} /> Undo</button>
            <button type="button" disabled={!data.strokes.length} onClick={() => {
              setHistory((current) => [...current.slice(-49), data.strokes]);
              setData((current) => ({ ...current, strokes: [] }));
            }}><Trash2 size={15} /> Clear</button>
          </div>
        )}
      </div>
      {mode === "notes" ? (
        <>
          <label className="sr-only" htmlFor="practice-work">Your working</label>
          <textarea
            ref={notesRef}
            id="practice-work"
            value={data.notes}
            onChange={(event) => {
              const field = event.currentTarget;
              setData((current) => ({ ...current, notes: field.value }));
              if (field.scrollHeight > field.clientHeight) field.style.height = `${field.scrollHeight}px`;
            }}
            placeholder="Start writing..."
          />
        </>
      ) : (
        <>
          <svg
            className={`working-board ${tool === "eraser" ? "is-erasing" : ""}`}
            viewBox={`0 0 1000 ${data.boardHeight}`}
            preserveAspectRatio="none"
            style={{ height: `${data.boardHeight}px` }}
            aria-label="Drawing whiteboard"
            onPointerDown={startStroke}
            onPointerMove={continueStroke}
            onPointerUp={() => { drawing.current = false; }}
            onPointerCancel={() => { drawing.current = false; }}
            onLostPointerCapture={() => { drawing.current = false; }}
          >
            {data.strokes.map((stroke, index) => stroke.length === 1 ? (
              <circle key={index} cx={stroke[0].x} cy={stroke[0].y} r="2" fill="#354c3b" />
            ) : (
              <polyline key={index} points={stroke.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="#354c3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>
          <button className="board-more" type="button" disabled={data.boardHeight >= 10000} onClick={() => setData((current) => ({ ...current, boardHeight: Math.min(10000, current.boardHeight + 500) }))}><Plus size={16} /> Add space</button>
        </>
      )}
      {storageError && <p className="workspace-storage-error" role="status">Unable to save your work in this browser.</p>}
    </section>
  );
}
