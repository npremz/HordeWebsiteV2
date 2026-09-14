export type ArticleBlock =
  | { kind: 'text'; content: string }
  | { kind: 'image'; source: string; alt: string; caption: string };

// Deliberately narrow: standalone local images, with an optional visible caption.
// Code fences stay untouched; raw HTML and remote image embeds are not enabled.
export function splitArticleImages(content: string): ArticleBlock[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ArticleBlock[] = [];
  let pending: string[] = [];
  let inCode = false;
  const flush = () => {
    if (pending.length) blocks.push({ kind: 'text', content: pending.join('\n') });
    pending = [];
  };
  for (const [index, line] of lines.entries()) {
    if (line.startsWith('```')) inCode = !inCode;
    if (!inCode && line.trim().startsWith('![')) {
      const match = line.match(/^!\[([^\]\n]+)\]\((\/src\/assets\/images\/blog\/[a-z0-9-]+\/[a-zA-Z0-9_-]+\.(?:png|jpe?g|webp))(?: "([^"\n]+)")?\)$/);
      if (!match || !match[1].trim() || (index > 0 && lines[index - 1].trim()) || (index + 1 < lines.length && lines[index + 1].trim())) {
        throw new Error(`Invalid inline blog image at line ${index + 1}: use a standalone local image with alt text.`);
      }
      flush();
      blocks.push({ kind: 'image', source: match[2], alt: match[1], caption: match[3] || '' });
    } else {
      if (!inCode && line.includes('![')) throw new Error(`Inline blog images need their own paragraph (line ${index + 1}).`);
      pending.push(line);
    }
  }
  flush();
  return blocks;
}
