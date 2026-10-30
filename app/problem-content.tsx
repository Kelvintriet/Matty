"use client";

import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { normalizeProblemMath } from "@/lib/normalize-problem-math";

export default function ProblemContent({ markdown, images = {} }: {
  markdown: string;
  images?: Record<string, string>;
}) {
  const source = normalizeProblemMath(markdown);

  return (
    <div className="problem-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        urlTransform={(url, key) => {
          const resolved = key === "src" ? images[url] ?? url : url;
          if (key === "src" && /^data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(resolved)) return resolved;
          return defaultUrlTransform(resolved);
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
