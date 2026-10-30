"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Clipboard } from "lucide-react";

const levelGuidance = String.raw`Difficulty guide for this platform:
- Assign one MYP-style difficulty level from 1 to 8. These are informal authoring estimates, not official IB marks or a fixed conversion from another rating system.
- Levels 1–2: introductory recognition and direct use of a familiar fact or rule. For example, round a number to a given number of decimal places.
- Levels 3–4: apply familiar methods in a straightforward problem. For example, find a term of an arithmetic sequence given its first term and common difference.
- Levels 5–6: use confident reasoning, potentially with connected steps or working backwards. For example, find an arithmetic sequence's first term and common difference from two given terms.
- Levels 7–8: challenging or unfamiliar applications requiring sustained reasoning, potentially combining several subtopics.

Choose the level based on the concepts, reasoning, number and complexity of steps, and how much of the method is given. Give a short reason for the suggested level; if a requested level does not match the problem, say so.`;

const authoringPrompt = String.raw`You are helping create a mathematics problem for a Grade 10 MYP 5 practice platform.

Create one original problem for:
- Units: [choose one or more existing units]
- Subtopics: [choose one or more existing subtopics across units]
- MYP level: [1–8]

${levelGuidance}

Return these clearly separated fields:
1. Title
2. Question in Markdown
3. Accepted final answers, one per line
4. A brief explanation in Markdown
5. Any image needed, described clearly for the contributor to create or upload
6. Suggested MYP level, with a brief reason

Use $...$ for inline LaTeX and $$...$$ on separate lines for display equations. Use proper LaTeX fractions, powers, subscripts, and symbols. Keep the question self-contained. The final answer must be a number or an exact text answer; provide equivalent accepted spellings or forms explicitly because the platform does not automatically recognize algebraic equivalence. Verify every answer and calculation.

For an image, write standard Markdown like ![description](IMAGE_URL). Do not output base64, invent a real upload URL, or claim to have uploaded an image. The contributor will upload the image and replace IMAGE_URL with the path inserted by the editor.

Use the requested difficulty, avoid ambiguous answers, and make the explanation sufficient to check the result. Do not include the answer or explanation in the question.`;

const sourceProblemPrompt = String.raw`You are helping create an original mathematics problem for a Grade 10 MYP 5 practice platform.

Use the following existing problem as a reference for its mathematical concepts and level:
[Paste the source problem here, including any relevant diagram details.]

Create a new problem for:
- Units: [choose one or more existing units]
- Subtopics: [choose one or more existing subtopics across units]
- MYP level: [1–8]

${levelGuidance}

Identify the concepts and reasoning used in the source, then write a genuinely new, self-contained problem. Change the setting, wording, and mathematical values or structure; do not copy the source wording or diagram. Keep the intended difficulty unless asked to change it.

Return these clearly separated fields:
1. Title
2. Question in Markdown
3. Accepted final answers, one per line
4. A brief explanation in Markdown
5. Any image needed, described clearly for the contributor to create or upload
6. Suggested MYP level, with a brief reason

Use $...$ for inline LaTeX and $$...$$ on separate lines for display equations. Use proper LaTeX fractions, powers, subscripts, and symbols. The final answer must be a number or exact text; list accepted equivalent forms explicitly because the platform does not automatically recognize algebraic equivalence. Solve the new problem independently and verify all calculations and accepted answers.

For an image, write standard Markdown like ![description](IMAGE_URL). Do not output base64, invent an upload URL, or claim to have uploaded an image. The contributor will upload the image and replace IMAGE_URL with the path inserted by the editor.

Avoid ambiguous answers. Keep the answer and explanation out of the question, and make the explanation sufficient to check the result.`;

const markdownExample = String.raw`A triangle has base $8$ cm and height $5$ cm.

![A triangle with its base and height labelled](/api/contribute/images/IMAGE_ID)

Find its **area**, in $\text{cm}^2$.

$$A = \frac{1}{2}bh$$`;

export default function DocsPage() {
  const [copyStatus, setCopyStatus] = useState<{ prompt: "original" | "source"; status: "copied" | "failed" } | null>(null);

  async function copyPrompt(prompt: "original" | "source") {
    try {
      await navigator.clipboard.writeText(prompt === "original" ? authoringPrompt : sourceProblemPrompt);
      setCopyStatus({ prompt, status: "copied" });
    } catch {
      setCopyStatus({ prompt, status: "failed" });
    }
  }

  return (
    <main className="docs-page">
      <header className="docs-header"><Link href="/contribute"><ArrowLeft size={17} /> Contribute</Link><span>MATHEMATICS · MYP 5</span></header>
      <div className="docs-layout">
        <nav className="docs-nav" aria-label="On this page">
          <span>ON THIS PAGE</span>
          <a href="#create">Create a problem</a>
          <a href="#markdown">Markdown and math</a>
          <a href="#images">Images</a>
          <a href="#answers">Answers</a>
          <a href="#levels">MYP levels</a>
          <a href="#prompt">AI prompt</a>
        </nav>
        <article className="docs-content">
          <span className="docs-kicker">CONTRIBUTOR GUIDE</span>
          <h1>Creating problems</h1>
          <p className="docs-lead">Write, review, and publish problems for the practice list.</p>

          <section id="create"><h2>Create a problem</h2><ol><li>Open <Link href="/contribute">Contribute</Link> with an authorized account.</li><li>Choose one or more subtopics across units, then set a level from 1 to 8.</li><li>Write the question, accepted answers, and explanation. Check the preview.</li><li>Publish when it is ready. Published problems appear in Practice.</li></ol></section>

          <section id="markdown"><h2>Markdown and LaTeX</h2><p>Use Markdown for text and <code>$...$</code> for inline math. Put display math between <code>$$</code> on separate lines.</p><pre><code>{markdownExample}</code></pre><p>Use LaTeX for mathematical expressions, including fractions, powers and subscripts.</p></section>

          <section id="images"><h2>Images</h2><p>Select <strong>Add image</strong> in the question or explanation editor. It inserts a Markdown image reference at the cursor, with a short path instead of image data.</p><pre><code>{"![Description of the image](/api/contribute/images/IMAGE_ID)"}</code></pre><p>Use the path generated by the editor; <code>IMAGE_ID</code> is only an example. PNG, JPEG and WebP files up to 2 MB are accepted. Images are available in the preview; students see the explanation after a correct answer.</p></section>

          <section id="answers"><h2>Accepted answers</h2><p>Add each accepted final answer separately. Numeric answers are compared as numbers; text answers are compared exactly after trimming spaces. Equivalent fractions, expressions, units and capitalization are not automatically converted.</p><p>For example, add both <code>0.5</code> and <code>1/2</code> if both should be accepted. Explanations appear after a correct answer.</p></section>

          <section id="levels"><h2>MYP levels</h2><p>Choose a level from 1 to 8 based on the reasoning and knowledge required. These descriptions are informal authoring guidance, not official IB marking criteria.</p><div className="docs-table-wrap"><table><thead><tr><th>Levels</th><th>General difficulty</th></tr></thead><tbody><tr><td>1–2</td><td>Introductory facts and direct methods</td></tr><tr><td>3–4</td><td>Familiar methods in straightforward problems</td></tr><tr><td>5–6</td><td>Connected steps or working backwards</td></tr><tr><td>7–8</td><td>Challenging, unfamiliar applications</td></tr></tbody></table></div></section>

          <section id="prompt"><div className="docs-section-heading"><div><h2>AI authoring prompt</h2><p>Replace the bracketed fields before using it.</p></div><button onClick={() => copyPrompt("original")}>{copyStatus?.prompt === "original" && copyStatus.status === "copied" ? <Check size={16} /> : <Clipboard size={16} />}{copyStatus?.prompt === "original" ? (copyStatus.status === "copied" ? "Copied" : "Copy failed") : "Copy prompt"}</button></div><pre><code>{authoringPrompt}</code></pre><p>Review the maths, difficulty, answers, and image before publishing.</p>
            <div className="docs-section-heading docs-source-heading">
              <div><h2>Based on an existing problem</h2><p>Paste the reference problem into the prompt.</p></div>
              <button onClick={() => copyPrompt("source")}>{copyStatus?.prompt === "source" && copyStatus.status === "copied" ? <Check size={16} /> : <Clipboard size={16} />}{copyStatus?.prompt === "source" ? (copyStatus.status === "copied" ? "Copied" : "Copy failed") : "Copy prompt"}</button>
            </div>
            <pre><code>{sourceProblemPrompt}</code></pre>
          </section>
        </article>
      </div>
    </main>
  );
}
