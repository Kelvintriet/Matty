import { randomInt } from "node:crypto";

export const problemCodeCount = 26 ** 3;

export function problemCodeAt(index: number) {
  let value = index;
  let code = "";
  for (let position = 0; position < 3; position += 1) {
    code = String.fromCharCode(65 + value % 26) + code;
    value = Math.floor(value / 26);
  }
  return code;
}

export function randomCodeOffset() {
  return randomInt(problemCodeCount);
}

export function isDuplicateKey(error: unknown): boolean {
  let current: unknown = error;
  for (let i = 0; i < 5 && current && typeof current === "object"; i += 1) {
    if ("code" in current && current.code === "ER_DUP_ENTRY") return true;
    if ("errno" in current && current.errno === 1062) return true;
    current = "cause" in current ? current.cause : undefined;
  }
  return false;
}
