export function normalizeProblemMath(markdown: string): string {
  const protectedParts = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|\$\$[\s\S]*?\$\$|\$(?!\$)[^\n$]*?\$)/g;

  return markdown.split(protectedParts).map((part, index) => {
    if (index % 2 === 1) return part;

    return part
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, math: string) => `\n\n$$\n${math.trim()}\n$$\n\n`)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, math: string) => `$${math}$`)
      .replace(/^[ \t]*\[([^\]\n]+)\][ \t]*$/gm, (match, math: string) => {
        if (!math.includes("=") || !/(?:\\[a-zA-Z]+|[_^])/.test(math)) return match;
        return `\n$$\n${math.trim()}\n$$\n`;
      });
  }).join("");
}
