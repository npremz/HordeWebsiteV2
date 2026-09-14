import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitArticleImages } from '../src/lib/content/blog-inline-images.ts';

const image = '![Une capture réelle](/src/assets/images/blog/analyse-web-interface-without-copying/reference.png "Source, date et observation.")';
test('keeps prose order and separates a captioned local image', () => {
  const blocks = splitArticleImages(`Début.\n\n${image}\n\n## Suite\n\nFin.`);
  assert.deepEqual(blocks.map(({ kind }) => kind), ['text', 'image', 'text']);
  assert.equal(blocks[1].alt, 'Une capture réelle');
  assert.equal(blocks[1].caption, 'Source, date et observation.');
  assert(blocks[2].content.includes('## Suite'));
});
test('keeps existing posts and fenced examples unchanged', () => {
  const prose = `Texte.\n\n\`\`\`md\n${image}\n\`\`\`\n\nFin.`;
  assert.deepEqual(splitArticleImages(prose), [{ kind: 'text', content: prose }]);
});
test('rejects remote, traversal, empty-alt and embedded images', () => {
  for (const invalid of [image.replace('/src/assets/images/blog/analyse-web-interface-without-copying/reference.png', 'https://example.com/image.png'), image.replace('reference.png', '../reference.png'), image.replace('Une capture réelle', ' '), `Texte ${image}`, `Texte\n${image}`]) {
    assert.throws(() => splitArticleImages(invalid), /image/i);
  }
});
test('supports an optional caption and CRLF', () => {
  const blocks = splitArticleImages('Texte.\r\n\r\n![Capture](/src/assets/images/blog/example/capture.webp)');
  assert.equal(blocks[1].caption, '');
  assert.equal(blocks[1].source, '/src/assets/images/blog/example/capture.webp');
});
