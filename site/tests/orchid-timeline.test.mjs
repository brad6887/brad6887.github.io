import test from 'node:test';
import assert from 'node:assert/strict';
import orchidTimeline, { orderOrchidTimeline, observationDate, headingText } from '../src/lib/orchid-timeline.mjs';

const h = (value, depth = 2) => ({ type: 'heading', depth, children: [{ type: 'text', value }] });
const p = (value) => ({ type: 'paragraph', children: [{ type: 'text', value }] });

test('sorts complete dated entries, preserves ties, introductions, and attached subheadings', () => {
  const intro = p('Original introduction');
  const photo = { type: 'image', url: '/unchanged.jpg', alt: 'Original alternative' };
  const tree = { children: [intro, h('Before 2026-01-01 — background'), p('Uncertain rescue'),
    h('2026-01-01 — Rescue'), photo, h('Care', 3), p('Historical care'),
    h('2026-08-30 — First'), p('First same-day entry'), h('2026-08-30 — Second'), p('Second same-day entry')] };
  const originals = [...tree.children];
  orderOrchidTimeline(tree);
  assert.equal(tree.children[0], intro);
  assert.deepEqual(tree.children.filter(n => n.type === 'heading' && observationDate(headingText(n))).map(headingText),
    ['2026-08-30 — First', '2026-08-30 — Second', '2026-01-01 — Rescue']);
  for (const node of originals) assert.equal(tree.children.filter(n => n === node).length, 1);
  assert.equal(tree.children[tree.children.indexOf(photo) + 1].depth, 3);
});

test('separates Looking Ahead and approximate dates without assigning dates or changing wording', () => {
  const looking = p('Watch for a future leaf.');
  const tree = { children: [h('2026-04-10 — Assessment'), p('An observation'),
    h('Mid-April — Recovery'), p('Approximate date'), h('Looking Ahead', 1), looking,
    h('2026-08-30 — Update'), p('Recent observation')] };
  orderOrchidTimeline(tree);
  assert.ok(tree.children.some(n => n.type === 'html' && n.value.includes('<details')));
  const notes = tree.children.indexOf(looking);
  const latest = tree.children.findIndex(n => headingText(n) === '2026-08-30 — Update');
  assert.ok(notes < latest);
  assert.ok(tree.children.some(n => headingText(n).includes('Source placement: after “2026-04-10')));
  assert.equal(headingText(looking), 'Watch for a future leaf.');
});

test('does not invent precision from ranges, approximate dates, invalid dates, or fenced examples', () => {
  for (const value of ['Before 2026-01-01', '2026-02-30 — Invalid', '2026-01', '2026-01-01/2026-02-01', 'Spring 2026'])
    assert.equal(observationDate(value), null);
  assert.equal(observationDate('2024-02-29 — Valid'), '2024-02-29');
  const tree = { children: [{ type: 'code', value: '## 2026-08-30 — Example' }, p('No timeline')] };
  const before = structuredClone(tree);
  orderOrchidTimeline(tree);
  assert.deepEqual(tree, before);
});

test('only transforms orchid imports, never unrelated content', () => {
  const transform = orchidTimeline().heading;
  for (const [path, type] of [['/repo/content/journal/note.md', 'orchid'], ['/repo/content/plants/fern.md', 'fern']]) {
    const tree = { children: [h('2026-01-01'), h('2026-08-30')] };
    const before = structuredClone(tree);
    transform(tree.children[0], { fileURL: new URL(`file://${path}`), data: { astro: { frontmatter: { type } } }, parent() { throw new Error("Unrelated content must not be traversed"); } });
    assert.deepEqual(tree, before);
  }
});


test('native Astro Markdown integration preserves source nodes and generates a usable timeline', async () => {
  const { createSatteriMarkdownProcessor } = await import('@astrojs/markdown-satteri');
  const renderer = await createSatteriMarkdownProcessor({ mdastPlugins: [orchidTimeline()] });
  const result = await renderer.render([
    'Intro stays above.', '', '## 2026-01-05 — Rescue', '', '![First](/first.jpg)', '',
    '### Care', '', 'Historical care.', '', '## Looking Ahead', '', 'Old expectations.', '',
    '## 2026-08-30 — Update', '', 'Recent observation.', '',
    '~~~md', '## 2099-01-01 — Example only', '~~~',
  ].join('\n'), { fileURL: new URL('file:///repo/content/plants/test.md'), frontmatter: { type: 'orchid' } });
  assert.ok(result.code.indexOf('Intro stays above.') < result.code.indexOf('<details'));
  assert.ok(result.code.indexOf('</details>') < result.code.indexOf('Observations and updates'));
  assert.ok(result.code.indexOf('2026-08-30 — Update') < result.code.indexOf('id="2026-01-05'));
  assert.match(result.code, /<img[^>]+src="\/first.jpg"/);
  assert.match(result.code, /Old expectations/);
  assert.match(result.code, /Historical care/);
  assert.equal(result.metadata.headings.filter(h => h.depth === 2 && /^2026/.test(h.text)).length, 2);
});
