"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import katex from "katex";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, CircleX, Dumbbell, Trophy, LogIn, Menu, RotateCcw, Sparkles, UserRound, X } from "lucide-react";
import { topics, type LessonBlock } from "./content/course";

const topicIntroductions: Record<string, string> = {
  "scientific-notation": "Write and calculate with very large and very small numbers.",
  "significant-figures": "Show precision and round numbers to the right number of digits.",
  "absolute-percentage-error": "Measure how far an estimate is from an accepted value and find bounds for rounded measurements.",
  "number-sets": "Recognize different types of numbers and describe them using sets.",
  "unit-zero-revision": "Review Unit 0, then answer all 10 test questions correctly in one attempt.",
  "nth-term": "Find a rule that describes any term in a sequence.",
  "quadratic-sequence": "Use differences to find a formula for a quadratic sequence.",
  "arithmetic-sequence": "Explore sequences that change by the same amount each time.",
  "geometric-sequence": "Explore sequences that multiply by the same ratio each time.",
  "recursive-sequence": "Build sequences using earlier terms.",
  "sigma-notation": "Use sigma notation to write and evaluate sums.",
  "arithmetic-series": "Find the total of terms in an arithmetic sequence.",
  "geometric-series": "Find finite and infinite sums of geometric sequences.",
  "induction": "Prove statements using mathematical induction.",
  "sequence-applications": "Apply sequences and series to real-world patterns.",
  "financial-mathematics": "Use mathematics to explore interest, savings, loans, and depreciation.",
  "exponents": "Use exponent rules and solve exponential equations.",
  "logarithms": "Use logarithms to work backwards from powers and solve equations.",
};

function PressButton({
  children,
  className = "",
  onClick,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [pressed, setPressed] = useState(false);
  const releaseInside = useRef(false);
  const hitArea = useRef<DOMRect | null>(null);

  function isInside(button: HTMLButtonElement, x: number, y: number) {
    const bounds = hitArea.current ?? button.getBoundingClientRect();
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
  }

  return (
    <button
      {...props}
      type="button"
      disabled={disabled}
      className={`${className} press-button ${pressed ? "is-pressed" : ""}`}
      onPointerDown={(event) => {
        if (event.button !== 0 || !event.isPrimary || disabled) {
          return;
        }

        releaseInside.current = false;
        hitArea.current = event.currentTarget.getBoundingClientRect();
        event.currentTarget.setPointerCapture(event.pointerId);
        setPressed(true);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          setPressed(isInside(event.currentTarget, event.clientX, event.clientY));
        }
      }}
      onPointerUp={(event) => {
        releaseInside.current = isInside(event.currentTarget, event.clientX, event.clientY);
        setPressed(false);
      }}
      onPointerCancel={() => {
        releaseInside.current = false;
        setPressed(false);
      }}
      onLostPointerCapture={() => setPressed(false)}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          setPressed(true);
        }
      }}
      onKeyUp={() => setPressed(false)}
      onBlur={() => setPressed(false)}
      onClick={(event) => {
        if (event.detail === 0 || releaseInside.current) {
          onClick?.(event);
        }

        releaseInside.current = false;
        hitArea.current = null;
      }}
    >
      {children}
    </button>
  );
}

function playAnswerSound(isCorrect: boolean) {
  try {
    const context = new AudioContext();
    const notes = isCorrect ? [523.25, 659.25, 783.99] : [246.94, 196];
    const noteLength = isCorrect ? 0.12 : 0.16;
    const volume = context.createGain();

    volume.gain.setValueAtTime(0.0001, context.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.02);
    volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + notes.length * noteLength + 0.12);
    volume.connect(context.destination);

    notes.forEach((frequency, index) => {
      const tone = context.createOscillator();
      const start = context.currentTime + index * noteLength;

      tone.type = isCorrect ? "sine" : "triangle";
      tone.frequency.value = frequency;
      tone.connect(volume);
      tone.start(start);
      tone.stop(start + noteLength);
    });

    window.setTimeout(() => void context.close(), 700);
  } catch {
    // Answer feedback stays available if the browser blocks audio.
  }
}

function shuffledAnswers(question: string, options: string[]) {
  let seed = 2166136261;

  for (const character of question) {
    seed = Math.imul(seed ^ character.charCodeAt(0), 16777619) >>> 0;
  }

  const shuffled = [...options];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const swapIndex = Math.floor((seed / 4294967296) * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function MathText({ text }: { text: string }) {
  const parts = text.split(/(\\\([\s\S]*?\\\))/g);

  return parts.map((part, index) => {
    if (!part.startsWith("\\(") || !part.endsWith("\\)")) {
      return part;
    }

    const html = katex.renderToString(part.slice(2, -2), {
      throwOnError: false,
      output: "htmlAndMathml",
      trust: false,
    });

    return <span className="lesson-math" key={index} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

function PracticeBlock({
  block,
  onCorrect,
  onWrong,
  completed,
}: {
  block: Extract<LessonBlock, { type: "quiz" }>;
  onCorrect?: () => void;
  onWrong?: () => void;
  completed: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const answer = completed ? block.answer : selected;
  const showFeedback = completed || checked;

  return (
    <section className="practice-block">
      <div className="block-label">YOUR TURN</div>
      {block.proof && (
        <div className="proof-template">
          <strong><MathText text={block.proof.heading} /></strong>
          {block.proof.lines.map((line, index) => <p key={index}><MathText text={line} /></p>)}
        </div>
      )}
      <h3><MathText text={block.question} /></h3>
      <div className="answer-grid" role="group" aria-label="Answer choices">
        {shuffledAnswers(block.question, block.options).map((option) => (
          <button
            className={`answer ${answer === option ? "answer-selected" : ""} ${answer === option && showFeedback ? answer === block.answer ? "answer-correct" : "answer-wrong" : ""}`}
            key={option}
            aria-pressed={answer === option}
            disabled={completed}
            onClick={() => {
              setSelected(option);
              setChecked(false);
            }}
          >
            <span className="answer-radio" />
            <MathText text={option} />
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`answer-feedback ${answer === block.answer ? "feedback-right" : "feedback-try"}`} role="status">
          {answer === block.answer ? <CheckCircle2 size={22} /> : <CircleX size={22} />}
          <div>
            <strong>{answer === block.answer ? "Great job!" : "Not quite yet"}</strong>
            <span><MathText text={answer === block.answer ? block.explanation : "Give it another try."} /></span>
          </div>
          {answer !== block.answer && <RotateCcw className="retry-mark" size={18} />}
        </div>
      )}
      {!completed && <PressButton
        className="primary-button"
        disabled={!selected}
        onClick={() => {
          setChecked(true);
          const isCorrect = selected === block.answer;
          playAnswerSound(isCorrect);

          if (isCorrect) {
            onCorrect?.();
          } else {
            onWrong?.();
          }
        }}
      >
        Check answer
      </PressButton>}
    </section>
  );
}

function LessonRenderer({
  blocks,
  onCorrect,
  onWrong,
  completedStepIds,
  stepKey,
}: {
  blocks: LessonBlock[];
  onCorrect: (key: string) => void;
  onWrong?: () => void;
  completedStepIds: string[];
  stepKey: string;
}) {
  return (
    <div className="lesson-blocks">
      {blocks.map((block, index) => (
        <div className={`lesson-block ${block.width === "half" ? "block-half" : "block-full"}`} key={index}>
          {block.type === "text" && <p className="lesson-text"><MathText text={block.text} /></p>}
          {block.type === "number-set-diagram" && (
            <figure className="number-set-diagram" aria-label="Natural numbers are inside integers, integers are inside rational numbers, and rational numbers are inside real numbers. Irrational numbers are real but outside the rational numbers.">
              <figcaption>HOW THE SETS FIT TOGETHER</figcaption>
              <div className="number-set-figure" aria-hidden="true">
                <div className="set-ring set-real">
                  <span className="set-label"><MathText text={"\\(\\mathbb{R}\\)"} /></span>
                  <div className="set-ring set-rational">
                    <span className="set-label"><MathText text={"\\(\\mathbb{Q}\\)"} /></span>
                    <div className="set-ring set-integer">
                      <span className="set-label"><MathText text={"\\(\\mathbb{Z}\\)"} /></span>
                      <div className="set-ring set-natural">
                        <span className="set-label"><MathText text={"\\(\\mathbb{N}\\)"} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p><MathText text={"\\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\)"} /> · Irrational numbers are in <MathText text={"\\(\\mathbb{R}\\)"} /> outside <MathText text={"\\(\\mathbb{Q}\\)"} />.</p>
            </figure>
          )}
          {block.type === "sequence-diagram" && (
            <figure className="sequence-diagram" aria-label={`Sequence: ${block.terms.join(", ")}. ${block.operation} at each step.`}>
              <figcaption>FOLLOW THE PATTERN</figcaption>
              <div className="sequence-diagram-flow">
                {block.terms.map((term, termIndex) => (
                  <div className="sequence-diagram-step" key={`${termIndex}-${term}`}>
                    <span className="sequence-diagram-term"><small><MathText text={`\\(u_{${termIndex + 1}}\\)`} /></small><MathText text={term} /></span>
                    {termIndex < block.terms.length - 1 && <span className="sequence-diagram-arrow" aria-hidden="true"><small><MathText text={block.operation} /></small>→</span>}
                  </div>
                ))}
              </div>
            </figure>
          )}
          {block.type === "sigma-diagram" && (
            <figure className="sigma-diagram">
              <figcaption>READ THE NOTATION</figcaption>
              <div className="sigma-formula">
                <MathText text={"\\(\\displaystyle \\sum_{k=r}^{n} f(k) = f(r) + f(r+1) + \\cdots + f(n)\\)"} />
              </div>
              <p><MathText text={"\\(k\\)"} /> is the index. For integers <MathText text={"\\(r < n\\)"} />, start at <MathText text={"\\(r\\)"} />, finish at <MathText text={"\\(n\\)"} />, and add <MathText text={"\\(f(k)\\)"} /> at each index. If <MathText text={"\\(r = n\\)"} />, the sum is just <MathText text={"\\(f(r)\\)"} />.</p>
              <div className="sigma-example">
                <span>EXAMPLE</span>
                <MathText text={"\\(\\displaystyle \\sum_{n=1}^{3} 2n = 2 + 4 + 6 = 12\\)"} />
              </div>
            </figure>
          )}
          {block.type === "example" && (
            <section className="example-block">
              <div className="block-label">{block.label}</div>
              <p className="example-expression"><MathText text={block.expression} /></p>
              <p className="example-detail"><MathText text={block.detail} /></p>
              {block.steps && (
                <ol className="example-steps">
                  {block.steps.map((step) => <li key={step}><MathText text={step} /></li>)}
                </ol>
              )}
            </section>
          )}
          {block.type === "quiz" && <PracticeBlock key={`${stepKey}:${index}:${completedStepIds.includes(`${stepKey}:${index}`)}`} block={block} onWrong={onWrong} completed={completedStepIds.includes(`${stepKey}:${index}`)} onCorrect={() => onCorrect(`${stepKey}:${index}`)} />}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mode, setMode] = useState<"Learning" | "Practice" | "Leaderboard">("Learning");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState(topics[0].lessons[0].id);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(topics[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [lessonPositions, setLessonPositions] = useState<Record<string, number>>({});
  const [startedLessonIds, setStartedLessonIds] = useState<string[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [redoingLessonIds, setRedoingLessonIds] = useState<string[]>([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [testRestarted, setTestRestarted] = useState(false);
  const [testAttempt, setTestAttempt] = useState(0);

  useEffect(() => {
    // Browser storage is available only after hydration.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem("matty-progress-v1");
      if (saved) {
        const progress = JSON.parse(saved);
        if (progress.inductionLessonVersion !== 2 && Array.isArray(progress.completedStepIds)) {
          const oldQuestionIndexes = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19];
          const oldQuestionKeys = oldQuestionIndexes.map((index) => `induction:${index}:0`);
          const completedBefore = oldQuestionKeys.every((key) => progress.completedStepIds.includes(key));
          const wasPreviouslyCompleted = completedBefore || (
            Array.isArray(progress.completedLessonIds) && progress.completedLessonIds.includes("induction")
          );
          const hasPreviousAttempt = oldQuestionKeys.some((key) => progress.completedStepIds.includes(key)) ||
            Number.isInteger(progress.lessonPositions?.induction);

          if (completedBefore) {
            progress.completedLessonIds = [
              ...(Array.isArray(progress.completedLessonIds) ? progress.completedLessonIds : []),
              "induction",
            ];
          }

          if (hasPreviousAttempt) {
            progress.completedStepIds = progress.completedStepIds.filter((key: unknown) =>
              typeof key !== "string" || !oldQuestionKeys.includes(key));
            progress.lessonPositions = { ...progress.lessonPositions, induction: 0 };

            if (wasPreviouslyCompleted) {
              progress.redoingLessonIds = [
                ...(Array.isArray(progress.redoingLessonIds) ? progress.redoingLessonIds : []),
                "induction",
              ];
            }
          }
        }
        if (progress.unitZeroTestVersion !== 2 && Array.isArray(progress.completedStepIds)) {
          const testStart = 4;
          const testKeys = Array.from({ length: 10 }, (_, index) => `unit-zero-revision:${testStart + index}:0`);
          const hasTestProgress = testKeys.some((key) => progress.completedStepIds.includes(key));

          if (hasTestProgress) {
            if (testKeys.every((key) => progress.completedStepIds.includes(key))) {
              progress.completedLessonIds = [
                ...(Array.isArray(progress.completedLessonIds) ? progress.completedLessonIds : []),
                "unit-zero-revision",
              ];
            }
            progress.completedStepIds = progress.completedStepIds.filter((key: unknown) =>
              typeof key !== "string" || !testKeys.includes(key));
            progress.lessonPositions = { ...progress.lessonPositions, "unit-zero-revision": testStart };
            progress.redoingLessonIds = [
              ...(Array.isArray(progress.redoingLessonIds) ? progress.redoingLessonIds : []),
              "unit-zero-revision",
            ];
          }
        }
        if (progress.sequenceExtensionsVersion !== 1 && Array.isArray(progress.completedStepIds)) {
          for (const lessonId of ["quadratic-sequence", "sigma-notation"]) {
            const lesson = topics.flatMap((topic) => topic.lessons).find((item) => item.id === lessonId);
            const finalStart = lesson?.guidedSteps?.findIndex((step) => step.part === "Final check") ?? -1;
            const added = 6;
            if (!lesson?.guidedSteps || finalStart < added) continue;

            const oldFinalStart = finalStart - added;
            const oldQuizKeys = lesson.guidedSteps.flatMap((step, index) => {
              if (index >= oldFinalStart && index < finalStart) return [];
              const oldIndex = index >= finalStart ? index - added : index;
              return step.blocks.flatMap((block, blockIndex) =>
                block.type === "quiz" ? [`${lesson.id}:${oldIndex}:${blockIndex}`] : []);
            });
            if (oldQuizKeys.length > 0 && oldQuizKeys.every((key) => progress.completedStepIds.includes(key))) {
              progress.completedLessonIds = [
                ...(Array.isArray(progress.completedLessonIds) ? progress.completedLessonIds : []),
                lessonId,
              ];
            }
            progress.completedStepIds = progress.completedStepIds.map((key: unknown) => {
              if (typeof key !== "string") return key;
              const [id, index, block] = key.split(":");
              const stepIndex = Number(index);
              return id === lessonId && stepIndex >= oldFinalStart
                ? `${id}:${stepIndex + added}:${block}`
                : key;
            });
            const position = progress.lessonPositions?.[lessonId];
            if (Number.isInteger(position) && position >= oldFinalStart) {
              progress.lessonPositions[lessonId] = position + added;
            }
          }
        }
        if (progress.slideReviewVersion !== 1 && Array.isArray(progress.completedStepIds)) {
          const addedSteps: Record<string, number> = {
            "scientific-notation": 6,
            "significant-figures": 12,
            "absolute-percentage-error": 12,
            "number-sets": 6,
            "nth-term": 6,
          };
          const previousCompletedLessons: string[] = [];

          for (const lesson of topics.flatMap((topic) => topic.lessons)) {
            const added = addedSteps[lesson.id];
            const finalStart = lesson.guidedSteps?.findIndex((step) => step.part === "Final check") ?? -1;
            if (!added || finalStart < added || !lesson.guidedSteps) continue;

            const oldFinalStart = finalStart - added;
            const oldQuizKeys = lesson.guidedSteps.flatMap((step, index) => {
              if (index >= oldFinalStart && index < finalStart) return [];
              const oldIndex = index >= finalStart ? index - added : index;
              return step.blocks.flatMap((block, blockIndex) =>
                block.type === "quiz" ? [`${lesson.id}:${oldIndex}:${blockIndex}`] : []);
            });
            if (oldQuizKeys.length > 0 && oldQuizKeys.every((key) => progress.completedStepIds.includes(key))) {
              previousCompletedLessons.push(lesson.id);
            }
            progress.completedStepIds = progress.completedStepIds.map((key: unknown) => {
              if (typeof key !== "string") return key;
              const [id, index, block] = key.split(":");
              const stepIndex = Number(index);
              return id === lesson.id && stepIndex >= oldFinalStart
                ? `${id}:${stepIndex + added}:${block}`
                : key;
            });
            const position = progress.lessonPositions?.[lesson.id];
            if (Number.isInteger(position) && position >= oldFinalStart) {
              progress.lessonPositions[lesson.id] = position + added;
            }
          }
          progress.completedLessonIds = [
            ...(Array.isArray(progress.completedLessonIds) ? progress.completedLessonIds : []),
            ...previousCompletedLessons,
          ];
        }
        if (Array.isArray(progress.completedStepIds)) setCompletedStepIds(progress.completedStepIds.filter((id: unknown) => typeof id === "string"));
        if (Array.isArray(progress.startedLessonIds)) setStartedLessonIds(progress.startedLessonIds.filter((id: unknown) => typeof id === "string"));
        if (Array.isArray(progress.redoingLessonIds)) setRedoingLessonIds(progress.redoingLessonIds.filter((id: unknown) => typeof id === "string"));
        const savedCompletedLessons = Array.isArray(progress.completedLessonIds)
          ? progress.completedLessonIds.filter((id: unknown): id is string => typeof id === "string")
          : [];
        // Existing completions stay earned when the final checks are added.
        if (progress.knowledgeCheckVersion !== 1 && Array.isArray(progress.completedStepIds)) {
          for (const topic of topics) {
            for (const lesson of topic.lessons) {
              if (!lesson.guidedSteps?.some((step) => step.part === "Final check")) continue;
              const previousQuizKeys = lesson.guidedSteps.flatMap((step, stepIndex) =>
                step.part === "Final check" ? [] : step.blocks.flatMap((block, blockIndex) =>
                  block.type === "quiz" ? [`${lesson.id}:${stepIndex}:${blockIndex}`] : []));
              if (previousQuizKeys.length > 0 && previousQuizKeys.every((key) => progress.completedStepIds.includes(key)) && !savedCompletedLessons.includes(lesson.id)) {
                savedCompletedLessons.push(lesson.id);
              }
            }
          }
        }
        // Preserve completion of the original one-question Number Sets lesson.
        if (progress.completedStepIds?.includes("number-sets:0:5") && !savedCompletedLessons.includes("number-sets")) {
          savedCompletedLessons.push("number-sets");
        }
        // Preserve completion of the original short sequence lessons.
        for (const [lessonId, oldQuizKey] of [
          ["nth-term", "nth-term:0:2"],
          ["quadratic-sequence", "quadratic-sequence:0:3"],
          ["arithmetic-sequence", "arithmetic-sequence:0:2"],
          ["geometric-sequence", "geometric-sequence:0:2"],
          ["recursive-sequence", "recursive-sequence:0:2"],
          ["sigma-notation", "sigma-notation:0:2"],
          ["arithmetic-series", "arithmetic-series:0:2"],
          ["geometric-series", "geometric-series:0:4"],
          ["induction", "induction:0:3"],
          ["sequence-applications", "sequence-applications:0:2"],
          ["financial-mathematics", "financial-mathematics:0:8"],
          ["exponents", "exponents:0:4"],
          ["logarithms", "logarithms:0:4"],
        ]) {
          if (progress.completedStepIds?.includes(oldQuizKey) && !savedCompletedLessons.includes(lessonId)) {
            savedCompletedLessons.push(lessonId);
          }
        }
        setCompletedLessonIds(savedCompletedLessons);
        if (progress.lessonPositions && typeof progress.lessonPositions === "object") setLessonPositions(progress.lessonPositions);
        const topic = topics.find((item) => item.id === progress.selectedTopicId);
        const lesson = topic?.lessons.find((item) => item.id === progress.selectedLessonId);
        if (topic && lesson) {
          setSelectedTopicId(topic.id);
          setSelectedLessonId(lesson.id);
          setExpandedTopicId(topic.id);
          const position = progress.lessonPositions?.[lesson.id];
          if (lesson.guidedSteps && Number.isInteger(position)) {
            setCurrentStepIndex(Math.max(0, Math.min(position, lesson.guidedSteps.length - 1)));
          }
        }
      }
    } catch {
      // Ignore unavailable or invalid storage and start with empty progress.
    }
    setProgressLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try {
      localStorage.setItem("matty-progress-v1", JSON.stringify({ knowledgeCheckVersion: 1, slideReviewVersion: 1, sequenceExtensionsVersion: 1, unitZeroTestVersion: 2, inductionLessonVersion: 2, completedStepIds, completedLessonIds, redoingLessonIds, lessonPositions, startedLessonIds, selectedTopicId, selectedLessonId }));
    } catch {
      // The lesson remains usable even if browser storage is unavailable.
    }
  }, [completedStepIds, completedLessonIds, redoingLessonIds, lessonPositions, startedLessonIds, selectedTopicId, selectedLessonId, progressLoaded]);

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? topics[0];
  const selectedLesson = selectedTopic.lessons.find((lesson) => lesson.id === selectedLessonId) ?? selectedTopic.lessons[0];
  const lessonIndex = selectedTopic.lessons.findIndex((lesson) => lesson.id === selectedLesson.id);
  const guidedSteps = selectedLesson.guidedSteps;
  const currentGuidedStep = guidedSteps?.[currentStepIndex];
  const parts = guidedSteps ? [...new Set(guidedSteps.map((step, index) => step.part ?? String(Math.floor(index / 7))))] : [];
  const currentPart = currentGuidedStep?.part ?? String(Math.floor(currentStepIndex / 7));
  const currentStepKey = `${selectedLesson.id}:${currentStepIndex}`;
  const isExerciseStep = currentGuidedStep?.blocks.some((block) => block.type === "quiz") ?? false;
  const canAdvance = !isExerciseStep || currentGuidedStep!.blocks.every((block, index) =>
    block.type !== "quiz" || completedStepIds.includes(`${currentStepKey}:${index}`));

  function lessonStatus(lesson: typeof selectedLesson) {
    const steps = lesson.guidedSteps ?? [{ blocks: lesson.blocks }];
    const quizKeys = steps.flatMap((step, stepIndex) => step.blocks.flatMap((block, blockIndex) =>
      block.type === "quiz" ? [`${lesson.id}:${stepIndex}:${blockIndex}`] : []));
    if (completedLessonIds.includes(lesson.id) || (quizKeys.length > 0 && quizKeys.every((key) => completedStepIds.includes(key)))) return "done";
    if (startedLessonIds.includes(lesson.id) || quizKeys.some((key) => completedStepIds.includes(key))) return "in-progress";
    return "not-started";
  }

  const currentLessonStatus = lessonStatus(selectedLesson);
  const hasNextLesson = Boolean(selectedTopic.lessons[lessonIndex + 1]);

  function selectLesson(topicId: string, lessonId: string) {
    setTestRestarted(false);
    setSelectedTopicId(topicId);
    setSelectedLessonId(lessonId);
    const lesson = topics.find((topic) => topic.id === topicId)?.lessons.find((item) => item.id === lessonId);
    const savedPosition = lessonPositions[lessonId];
    setCurrentStepIndex(lesson?.guidedSteps && Number.isInteger(savedPosition)
      ? Math.max(0, Math.min(savedPosition, lesson.guidedSteps.length - 1))
      : 0);
    setExpandedTopicId(topicId);
  }

  function startLesson() {
    setStartedLessonIds((current) => current.includes(selectedLesson.id) ? current : [...current, selectedLesson.id]);
  }

  function markCurrentStepComplete(key: string) {
    setStartedLessonIds((current) => current.includes(selectedLesson.id) ? current : [...current, selectedLesson.id]);
    setCompletedStepIds((current) => current.includes(key) ? current : [...current, key]);

    const steps = selectedLesson.guidedSteps ?? [{ blocks: selectedLesson.blocks }];
    const quizKeys = steps.flatMap((step, stepIndex) => step.blocks.flatMap((block, blockIndex) =>
      block.type === "quiz" ? [`${selectedLesson.id}:${stepIndex}:${blockIndex}`] : []));
    if (quizKeys.length > 0 && quizKeys.every((quizKey) => quizKey === key || completedStepIds.includes(quizKey))) {
      setRedoingLessonIds((current) => current.filter((id) => id !== selectedLesson.id));
    }
  }

  function moveToStep(index: number) {
    setCurrentStepIndex(index);
    setLessonPositions((current) => ({ ...current, [selectedLesson.id]: index }));
    setStartedLessonIds((current) => current.includes(selectedLesson.id) ? current : [...current, selectedLesson.id]);
  }

  function restartUnitTest() {
    const testStart = guidedSteps?.findIndex((step) => step.part === "Unit 0 test") ?? -1;
    if (testStart < 0) return;

    setCompletedStepIds((current) => current.filter((key) => {
      const [lessonId, step] = key.split(":");
      return lessonId !== selectedLesson.id || Number(step) < testStart;
    }));
    setLessonPositions((current) => ({ ...current, [selectedLesson.id]: testStart }));
    setCurrentStepIndex(testStart);
    setTestAttempt((current) => current + 1);
    setTestRestarted(true);
  }

  function redoLesson() {
    setTestRestarted(false);
    setRedoingLessonIds((current) => current.includes(selectedLesson.id)
      ? current
      : [...current, selectedLesson.id]);
    setCompletedLessonIds((current) => current.includes(selectedLesson.id)
      ? current
      : [...current, selectedLesson.id]);
    setCompletedStepIds((current) => current.filter((key) => !key.startsWith(`${selectedLesson.id}:`)));
    setLessonPositions((current) => ({ ...current, [selectedLesson.id]: 0 }));
    setStartedLessonIds((current) => current.includes(selectedLesson.id) ? current : [...current, selectedLesson.id]);
    setCurrentStepIndex(0);
  }

  function goToNextStep() {
    if (guidedSteps && currentStepIndex < guidedSteps.length - 1) {
      moveToStep(currentStepIndex + 1);
      return;
    }

    if (guidedSteps && !guidedSteps.some((step) => step.blocks.some((block) => block.type === "quiz"))) {
      setCompletedLessonIds((current) => current.includes(selectedLesson.id)
        ? current
        : [...current, selectedLesson.id]);
      setRedoingLessonIds((current) => current.filter((id) => id !== selectedLesson.id));
    }

    const nextLesson = selectedTopic.lessons[lessonIndex + 1];

    if (nextLesson) {
      selectLesson(selectedTopic.id, nextLesson.id);
    }
  }

  function toggleTopic(topicId: string) {
    setExpandedTopicId((current) => current === topicId ? null : topicId);
  }


  return (
    <main className={`app-shell ${sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      <aside className="app-sidebar" aria-label="Main navigation">
        <div className="sidebar-top">
          {sidebarExpanded && <span className="sidebar-caption">YOUR SPACE</span>}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarExpanded((current) => !current)}
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={sidebarExpanded}
          >
            {sidebarExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mode-navigation">
          {[
            { name: "Learning" as const, icon: BookOpen },
            { name: "Practice" as const, icon: Dumbbell },
            { name: "Leaderboard" as const, icon: Trophy },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`mode-button ${mode === name ? "mode-selected" : ""}`}
              onClick={() => setMode(name)}
              aria-current={mode === name ? "page" : undefined}
              aria-label={name}
              title={!sidebarExpanded ? name : undefined}
            >
              <Icon size={23} strokeWidth={2.2} />
              {sidebarExpanded && <span>{name}</span>}
              {sidebarExpanded && name !== "Learning" && <small>SOON</small>}
            </button>
          ))}
        </nav>

        <div className="sidebar-account">
          {sidebarExpanded && (
            <div className="guest-profile">
              <span className="guest-avatar"><UserRound size={20} /></span>
              <span><strong>Guest learner</strong><small>Grade 10 · MYP 5</small></span>
            </div>
          )}
          <button className="login-button" onClick={() => setShowLogin(true)} aria-label="Log in" title={!sidebarExpanded ? "Log in" : undefined}>
            <LogIn size={20} />
            {sidebarExpanded && <span>Log in</span>}
          </button>
        </div>
      </aside>

      <div className="workspace">
      <header className="topbar">
        <div className="header-location"><span>Mathematics</span><ChevronRight size={14} /><strong>{mode}</strong></div>
        <div className="header-actions">
          <span className="header-grade">Grade 10 · MYP 5</span>
          <button className="header-account" onClick={() => setShowLogin(true)} aria-label="Open account"><UserRound size={19} /></button>
        </div>
      </header>

      {mode === "Learning" ? <div className="app-layout">
        <article className="lesson-area">
          <div className="lesson-breadcrumb">{selectedTopic.title} <span>/</span> {selectedLesson.title}</div>

          <header className="lesson-header">
            <div className="lesson-header-copy">
              <span className="lesson-tag">
                {currentLessonStatus === "not-started"
                  ? "TOPIC INTRODUCTION"
                  : guidedSteps
                  ? `STEP ${currentStepIndex + 1} OF ${guidedSteps.length}`
                  : `LESSON ${lessonIndex + 1} OF ${selectedTopic.lessons.length}`}
              </span>
              <h1>{selectedLesson.title}</h1>
              <span className="lesson-topic">{selectedTopic.title}</span>
            </div>
            <div className="header-number" aria-hidden="true">{String(lessonIndex + 1).padStart(2, "0")}</div>
          </header>

          {currentLessonStatus === "done" && !redoingLessonIds.includes(selectedLesson.id) && (
            <div className="completed-lesson-banner">
              <span><CheckCircle2 size={19} /> Topic completed</span>
              <button type="button" onClick={redoLesson}><RotateCcw size={16} /> Redo topic</button>
            </div>
          )}

          {progressLoaded && currentLessonStatus === "not-started" ? (
            <section className="topic-introduction">
              <span className="intro-icon"><BookOpen size={27} /></span>
              <div className="block-label">READY TO LEARN?</div>
              <h2>{selectedLesson.title}</h2>
              <p>{topicIntroductions[selectedLesson.id]}</p>
              <PressButton className="primary-button intro-start-button" onClick={startLesson}>
                Start topic <ChevronRight size={19} />
              </PressButton>
            </section>
          ) : progressLoaded && (
            <>
          <div className="lesson-content" key={`${selectedLesson.id}:${currentStepIndex}:${selectedLesson.id === "unit-zero-revision" ? testAttempt : 0}`}>
            <div className="content-heading">
              <span className="heading-dot" />
              <h2><MathText text={currentGuidedStep?.title ?? "Let’s learn"} /></h2>
            </div>
            {guidedSteps && <div className="guided-progress">
              <span>PART {parts.indexOf(currentPart) + 1} OF {parts.length}</span>
              <div className="guided-progress-track">
                <span style={{ width: `${((currentStepIndex + 1) / guidedSteps.length) * 100}%` }} />
              </div>
              <span>{currentStepIndex + 1}/{guidedSteps.length}</span>
            </div>}
            {testRestarted && currentGuidedStep?.part === "Unit 0 test" && (
              <div className="test-restart-notice" role="status">
                Incorrect answer. The test has restarted from question 1; your revision pages are still available.
              </div>
            )}
            <LessonRenderer
              blocks={currentGuidedStep?.blocks ?? selectedLesson.blocks}
              onCorrect={(key) => {
                setTestRestarted(false);
                markCurrentStepComplete(key);
              }}
              onWrong={currentGuidedStep?.part === "Unit 0 test" ? restartUnitTest : undefined}
              completedStepIds={completedStepIds}
              stepKey={currentStepKey}
            />
          </div>

          <div className="lesson-navigation">
            {guidedSteps ? (
              <>
                <PressButton
                  className="guided-back-button"
                  disabled={currentStepIndex === 0}
                  onClick={() => {
                    moveToStep(Math.max(0, currentStepIndex - 1));
                  }}
                >
                  <ChevronLeft size={17} /> Back
                </PressButton>
                <PressButton className="next-button guided-next-button" disabled={!canAdvance} onClick={goToNextStep}>
                  {currentStepIndex === guidedSteps.length - 1
                    ? hasNextLesson ? "Next topic" : currentLessonStatus === "done" && !redoingLessonIds.includes(selectedLesson.id) ? "Completed" : "Finish test"
                    : currentGuidedStep?.part === "Number sets" && selectedLesson.id === "unit-zero-revision" ? "Start test" : "Next"}
                  <ChevronRight size={18} />
                </PressButton>
              </>
            ) : (
              <>
                <span>{lessonIndex + 1} / {selectedTopic.lessons.length} lessons</span>
                {hasNextLesson && (
                  <button className="next-button" onClick={goToNextStep}>
                    Next lesson <span aria-hidden="true">→</span>
                  </button>
                )}
              </>
            )}
          </div>
            </>
          )}
        </article>

        <aside className="topics-panel" aria-label="Course topics">
          <div className="topics-heading">
            <div>
              <span className="topics-eyebrow">MATHEMATICS</span>
              <h2>Units & topics</h2>
            </div>
            <span className="topic-count">{topics.length}</span>
          </div>

          <div className="progress-legend" aria-label="Progress status colors">
            <span><i className="status-dot status-done" /> Done</span>
            <span><i className="status-dot status-in-progress" /> In progress</span>
            <span><i className="status-dot status-not-started" /> Not started</span>
          </div>

          <div className="topic-list">
            {topics.map((topic, index) => {
              const expanded = expandedTopicId === topic.id;

              return (
                <section className={`topic-group ${expanded ? "topic-expanded" : ""}`} key={topic.id}>
                  <button className="topic-button" aria-expanded={expanded} onClick={() => toggleTopic(topic.id)}>
                    <span className="topic-number">{String(index).padStart(2, "0")}</span>
                    <span className="topic-title">{topic.title}<small>{topic.lessons.length} {topic.lessons.length === 1 ? "topic" : "topics"}</small></span>
                    <span className={`topic-chevron ${expanded ? "chevron-open" : ""}`} aria-hidden="true" />
                  </button>
                  {expanded && (
                    <div className="subtopic-list">
                      {topic.lessons.map((lesson, lessonNumber) => (
                        <button
                          key={lesson.id}
                          className={`subtopic-button subtopic-${lessonStatus(lesson)} ${selectedLessonId === lesson.id && selectedTopicId === topic.id ? "subtopic-selected" : ""}`}
                          aria-current={selectedLessonId === lesson.id && selectedTopicId === topic.id ? "page" : undefined}
                          onClick={() => selectLesson(topic.id, lesson.id)}
                        >
                          <span className="subtopic-number">{lessonStatus(lesson) === "done" ? <CheckCircle2 size={15} /> : lessonNumber + 1}</span>
                          <span>{lesson.title}<span className="sr-only"> — {lessonStatus(lesson).replaceAll("-", " ")}</span></span>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </aside>
      </div> : (
        <section className="mode-preview">
          <span className="preview-label">PREVIEW</span>
          <div className="preview-heading">
            <span className="preview-icon">{mode === "Practice" ? <Dumbbell size={29} /> : <Trophy size={29} />}</span>
            <div>
              <h1>{mode === "Practice" ? "Put it into practice" : "Leaderboard"}</h1>
              {mode === "Practice" && <p>Practice problems across all topics.</p>}
            </div>
          </div>

          {mode === "Practice" ? (
            <div className="preview-card">
              <h2>All topics</h2>
              <p>Practice problems and adaptive ratings are coming soon.</p>
              <button className="primary-button practice-coming-soon" disabled>Practice coming soon</button>
            </div>
          ) : (
            <div className="leaderboard-card">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Username</th>
                    <th scope="col">Elo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, username: "Sample learner 1", elo: 1450 },
                    { rank: 2, username: "Sample learner 2", elo: 1280 },
                    { rank: 3, username: "Sample learner 3", elo: 1100 },
                  ].map((entry) => (
                    <tr key={entry.rank}>
                      <td><span className="leaderboard-rank">{entry.rank}</span></td>
                      <td>{entry.username}</td>
                      <td>{entry.elo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button className="return-learning" onClick={() => setMode("Learning")}><BookOpen size={17} /> Back to learning</button>
        </section>
      )}
      </div>

      {showLogin && (
        <div className="account-backdrop" onClick={() => setShowLogin(false)}>
          <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title" onClick={(event) => event.stopPropagation()}>
            <button className="account-close" aria-label="Close account" onClick={() => setShowLogin(false)}><X size={21} /></button>
            <span className="account-illustration"><Sparkles size={30} /></span>
            <h2 id="account-title">Your learning space</h2>
            <p>Login is coming soon. You can explore lessons as a guest.</p>
            <button className="primary-button" onClick={() => {
              setShowLogin(false);
              setMode("Learning");
            }}>Continue learning</button>
          </section>
        </div>
      )}
    </main>
  );
}
