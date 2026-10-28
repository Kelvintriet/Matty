"use client";

import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function ProblemContent({ markdown }: { markdown: string }) {
  // Existing lessons use \( ... \); Markdown authors can also use $ ... $ and $$ ... $$.
  const source = markdown.replace(/\\\(([\s\S]*?)\\\)/g, (_, math: string) => `$${math}$`);

  return (
    <div className="problem-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        urlTransform={(url, key) => {
          if (key === "src" && /^data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(url)) return url;
          return defaultUrlTransform(url);
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
