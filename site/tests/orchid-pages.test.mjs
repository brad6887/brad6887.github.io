import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const site = new URL('../', import.meta.url);
const plants = new URL('../content/plants/', site);
const expectedSlugs = ['bungalow-bill', 'doctor-robert', 'helter-skelter', 'honey-pie',
  'lady-madonna', 'martha-my-dear', 'mother-natures-son', 'phal-mccartney',
  'revolution', 'rocky-raccoon', 'something'];
const field = (text, key) => text.match(new RegExp('^' + key + ': (.+)$', 'm'))?.[1];

test('all established orchid URLs and image roles match generated metadata (build first)', () => {
  assert.ok(existsSync(new URL('dist/orchid-rescue/index.html', site)),
    'Run abbey site build before npm test.');
  const slugs = readdirSync(plants).filter(name => name.endsWith('.md')).filter(name => {
    const content = readFileSync(new URL(name, plants), 'utf8').split('---')[1];
    return field(content, 'type') === 'orchid' && field(content, 'draft') !== 'true';
  }).map(name => name.slice(0, -3)).sort();
  for (const slug of expectedSlugs) assert.ok(slugs.includes(slug), slug + ' route was removed');
  assert.ok(existsSync(new URL('dist/orchid-rescue/coming-soon/index.html', site)));
  for (const slug of slugs) {
    const metadata = readFileSync(new URL(slug + '.md', plants), 'utf8').split('---')[1];
    const page = readFileSync(new URL('dist/orchid-rescue/' + slug + '/index.html', site), 'utf8');
    const original = field(metadata, 'originalImage');
    const current = field(metadata, 'currentImage');
    const featured = field(metadata, 'heroImage') || current || original;
    const frames = [...page.matchAll(/<figure\b[^>]*data-image-role="([^"]+)"[^>]*>([\s\S]*?)<\/figure>/g)];
    assert.deepEqual(frames.map(match => match[1]), ['original', 'current', 'featured'], slug);
    for (const [index, expected] of [original, current, featured].entries()) {
      const frame = frames[index][2];
      const label = ['Original', 'Current', 'Featured'][index];
      assert.match(frame, new RegExp('<strong[^>]*>' + label + '</strong>'), slug);
      assert.doesNotMatch(frame, /\bHero\b|hero photograph/);
      const src = frame.match(/<img\b[^>]*src="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
      assert.equal(src, expected, slug + ' ' + label);
      if (expected) {
        const url = new URL(expected, 'https://preview.invalid');
        assert.ok(existsSync(new URL('dist' + decodeURI(url.pathname), site)), expected);
        assert.match(frame, new RegExp('alt="[^"]*' + label.toLowerCase() + ' photograph"'));
      } else assert.match(frame, /image-missing/);
    }
    const dates = [...page.matchAll(/<h2\b[^>]*>\s*(\d{4}-\d{2}-\d{2})\b/g)].map(match => match[1]);
    assert.deepEqual(dates, [...dates].sort().reverse(), slug + ' newest-first dates');
  }
});
