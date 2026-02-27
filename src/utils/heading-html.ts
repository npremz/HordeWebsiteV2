export function formatHeadingHtml(value: string | null | undefined): string {
  if (!value) return "";

  return value
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, " <br> ")
    .replace(/\n/g, " <br> ");
}
