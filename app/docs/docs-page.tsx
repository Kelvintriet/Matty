"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Clipboard } from "lucide-react";

const ratingGuidance = String.raw`Difficulty guide for this platform:
- A problem rating is an estimated Elo-style difficulty, not the student's score or an official IB grade. Use a whole number of at least 100; the scale extends beyond 3000. The editor currently accepts ratings from 100 to 10000.
- Below 1000 (Novice): straightforward recognition or direct use of one familiar rule. Example: round 4.673 to 2 decimal places.
- 1000–1199 (Apprentice): familiar concepts with a small calculation or one clear step. Example: find the next term of a simple arithmetic sequence.
- 1200–1399 (Specialist): a familiar concept applied in a short problem, possibly with a simple interpretation. Example: find the 10th term of an arithmetic sequence given its first term and common difference.
- 1400–1599 (Expert): more demanding application, with multiple linked steps or a less obvious setup. Example: find a sequence's first term from two given terms.
- 1600–1899 (Candidate Master): challenging multi-step reasoning that connects ideas or works backwards. Example: use a series total and a term condition to determine unknown sequence values.
- 1900–2999 (Master / Grandmaster): substantially harder, unfamiliar problems requiring several connected insights; assign within this range according to the actual difficulty.
- 3000 and above: exceptional stretch problems, potentially comparable to challenging IB DP Mathematics AA HL questions. Do not assign this range merely because a problem is long.

MYP level 1–8 and problem rating are separate estimates. Levels 1–2 are introductory; 3–4 apply familiar methods; 5–6 require more confident reasoning; and 7–8 can involve challenging, unfamiliar applications. These descriptions are informal authoring guidance, not official IB marking criteria or a fixed conversion between levels and Elo.

Judge difficulty by the concepts needed, number and complexity of steps, how much is given, and whether the method is obvious. Treat the rating as provisional: the system has not yet calibrated problem ratings using student results, and practice submissions do not change student Elo. Give a short reason for your suggested level and rating; if a requested rating does not match the problem, say so rather than forcing the estimate.`;

const authoringPrompt = String.raw`You are helping create a mathematics problem for a Grade 10 MYP 5 practice platform.

Create one original problem for:
- Unit: [choose an existing unit]
- Subtopic: [choose an existing subtopic]
- MYP level: [1–8]
- Estimated problem rating: [e.g. 1400]

${ratingGuidance}

Return these clearly separated fields:
1. Title
2. Question in Markdown
3. Accepted final answers, one per line
4. A brief explanation in Markdown
5. Any image needed, described clearly for the contributor to create or upload
6. Suggested MYP level and problem rating, with a brief reason

Use $...$ for inline LaTeX and $$...$$ on separate lines for display equations. Use proper LaTeX fractions, powers, subscripts, and symbols. Keep the question self-contained. The final answer must be a number or an exact text answer; provide equivalent accepted spellings or forms explicitly because the platform does not automatically recognize algebraic equivalence. Verify every answer and calculation.

For an image, write standard Markdown like ![description](IMAGE_URL). Do not output base64, invent a real upload URL, or claim to have uploaded an image. The contributor will upload the image and replace IMAGE_URL with the path inserted by the editor.

Use the requested difficulty, avoid ambiguous answers, and make the explanation sufficient to check the result. Do not include the answer or explanation in the question.`;

const sourceProblemPrompt = String.raw`You are helping create an original mathematics problem for a Grade 10 MYP 5 practice platform.

Use the following existing problem as a reference for its mathematical concepts and level:
[Paste the source problem here, including any relevant diagram details.]

Create a new problem for:
- Unit: [choose an existing unit]
- Subtopic: [choose an existing subtopic]
- MYP level: [1–8]
- Estimated problem rating: [e.g. 1400]

${ratingGuidance}

Identify the concepts and reasoning used in the source, then write a genuinely new, self-contained problem. Change the setting, wording, and mathematical values or structure; do not copy the source wording or diagram. Keep the intended difficulty unless asked to change it.

Return these clearly separated fields:
1. Title
2. Question in Markdown
3. Accepted final answers, one per line
4. A brief explanation in Markdown
5. Any image needed, described clearly for the contributor to create or upload
6. Suggested MYP level and problem rating, with a brief reason

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
          <a href="#ratings">Ratings and levels</a>
          <a href="#prompt">AI prompt</a>
        </nav>
        <article className="docs-content">
          <span className="docs-kicker">CONTRIBUTOR GUIDE</span>
          <h1>Creating problems</h1>
          <p className="docs-lead">Write, review, and publish problems for the practice list.</p>

          <section id="create"><h2>Create a problem</h2><ol><li>Open <Link href="/contribute">Contribute</Link> with an authorized account.</li><li>Choose a unit and subtopic, then set a level and problem rating.</li><li>Write the question, accepted answers, and explanation. Check the preview.</li><li>Publish when it is ready. Published problems appear in Practice.</li></ol></section>

          <section id="markdown"><h2>Markdown and LaTeX</h2><p>Use Markdown for text and <code>$...$</code> for inline math. Put display math between <code>$$</code> on separate lines.</p><pre><code>{markdownExample}</code></pre><p>Use LaTeX for mathematical expressions, including fractions, powers and subscripts.</p></section>

          <section id="images"><h2>Images</h2><p>Select <strong>Add image</strong> in the question editor. It inserts a Markdown image reference at the cursor, with a short path instead of image data.</p><pre><code>{"![Description of the image](/api/contribute/images/IMAGE_ID)"}</code></pre><p>Use the path generated by the editor; <code>IMAGE_ID</code> is only an example. PNG, JPEG and WebP files up to 2 MB are accepted. Images are available in the preview and become visible to students after publishing.</p></section>

          <section id="answers"><h2>Accepted answers</h2><p>Add each accepted final answer separately. Numeric answers are compared as numbers; text answers are compared exactly after trimming spaces. Equivalent fractions, expressions, units and capitalization are not automatically converted.</p><p>For example, add both <code>0.5</code> and <code>1/2</code> if both should be accepted. Explanations appear after a correct answer.</p></section>

          <section id="ratings"><h2>Ratings and levels</h2><p><strong>Level</strong> is a contributor-assigned MYP-style difficulty from 1 to 8. <strong>Problem rating</strong> is an estimated difficulty on the Elo scale. Set both based on the reasoning and knowledge required; they are separate estimates.</p><div className="docs-table-wrap"><table><thead><tr><th>Rating</th><th>Planned title</th></tr></thead><tbody><tr><td>Below 1000</td><td>Novice</td></tr><tr><td>1000–1199</td><td>Apprentice</td></tr><tr><td>1200–1399</td><td>Specialist</td></tr><tr><td>1400–1599</td><td>Expert</td></tr><tr><td>1600–1899</td><td>Candidate Master</td></tr><tr><td>1900+</td><td>Master / Grandmaster</td></tr></tbody></table></div><p>These titles are the proposed student ranks, not an automatic conversion from a problem’s level. Practice answers currently do not change a student’s rating. Contest ratings and difficulty calibration are planned, not implemented.</p></section>

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
