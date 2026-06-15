export function splitHeadingLines(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n")
    .split(/\n|<br\s*\/?>/gi)
    .map((line) => line.trim())
    .filter(Boolean);
}
