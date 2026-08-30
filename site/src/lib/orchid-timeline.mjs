// Presentation only: never rewrite the generated imports or canonical history.
export function headingText(node) {
  return node.value ?? (node.children ?? []).map(headingText).join('');
}

export function observationDate(heading) {
  const match = /^(\d{4}-\d{2}-\d{2})(?:\s|$)/.exec(heading);
  if (!match) return null;
  const date = new Date(`${match[1]}T00:00:00Z`);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === match[1]
    ? match[1] : null;
}

const paragraph = (value) => ({ type: 'paragraph', children: [{ type: 'text', value }] });

export function orderOrchidTimeline(tree) {
  const sections = [];
  let section = { nodes: [], title: '', date: null };
  for (const node of tree.children) {
    // Subheadings (Photos, Care, Notes, etc.) stay with their parent entry.
    if (node.type === 'heading' && node.depth <= 2) {
      if (section.nodes.length) sections.push(section);
      const title = headingText(node);
      section = { nodes: [], title, date: observationDate(title) };
    }
    section.nodes.push(node);
  }
  if (section.nodes.length) sections.push(section);
  const firstDated = sections.findIndex((entry) => entry.date);
  if (firstDated < 0) return;

  const introduction = sections.slice(0, firstDated).flatMap((entry) => entry.nodes);
  const dated = [];
  const notes = [];
  let precedingTitle = '';
  for (const entry of sections.slice(firstDated)) {
    if (entry.date) {
      dated.push(entry);
      precedingTitle = entry.title;
    } else {
      notes.push(paragraph(`Source placement: after “${precedingTitle}”.`), ...entry.nodes);
    }
  }
  // Stable sort preserves authored order for observations on the same date.
  dated.sort((a, b) => b.date.localeCompare(a.date));
  tree.children = [
    ...introduction,
    ...(notes.length ? [
      { type: 'html', value: '<details class="plant-history-notes"><summary>Undated and historical notes</summary>' },
      paragraph('These sections retain their original wording and source order. They may describe earlier expectations; no exact dates have been inferred.'),
      ...notes,
      { type: 'html', value: '</details>' },
    ] : []),
    { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Observations and updates' }] },
    paragraph('Newest first. Observations on the same date retain their original order.'),
    ...dated.flatMap((entry) => entry.nodes),
  ];
}

export default function orchidTimeline() {
  const processed = new WeakSet();
  return {
    name: 'orchid-timeline',
    heading(node, context) {
      const path = context.fileURL?.pathname ?? '';
      if (!path.includes('/content/plants/') || context.data.astro?.frontmatter?.type !== 'orchid') return;
      const root = context.parent(node);
      if (root?.type !== 'root' || processed.has(root)) return;
      processed.add(root);
      const tree = { children: [...root.children] };
      orderOrchidTimeline(tree);
      context.setProperty(root, 'children', tree.children);
    },
  };
}
