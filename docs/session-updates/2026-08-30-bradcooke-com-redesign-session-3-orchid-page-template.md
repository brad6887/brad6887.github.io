---
title: "BradCooke.com Redesign Session 3: Orchid Page Template"
description: "Added newest-first orchid observations and responsive image roles, with four evidence-backed Original selections exported and validated locally."
date: 2026-08-30
status: pending
reviewed: false
session: bradcooke-com-redesign-session-3-orchid-page-template
tags:
  - BradCooke.com
  - orchids
  - website
---

# BradCooke.com Redesign Session 3: Orchid Page Template

## Objective

Improve the shared individual orchid page template on ubuntu-dev01 in
`/home/bcooke/git/brad6887.github.io`, while preserving existing URLs and
canonical ownership and deferring plant-by-plant narrative rewrites.

## Definition of Done

- Render exact-date observations newest first without losing their contents.
- Preserve introductory history above the timeline and explicitly separate
  undated prose whose placement otherwise becomes misleading.
- Support Original, Current, and Hero panels with a responsive layout,
  proportional images, explicit role metadata, and honest missing-data states.
- Validate the build, existing orchid routes, several different histories,
  desktop/mobile behavior, and the working-tree scope.
- Capture implementation, data decisions, exceptions, and deferred work.
- Do not commit, push, deploy, or publish the website.

The implementation and validation are complete. After the user explicitly
approved the four-plant local export, all three roles were verified on Lady
Madonna, Rocky Raccoon, Revolution, and Honey Pie. Seven other Original roles
remain unset pending provenance review and use the documented fallback.
Nothing was staged, committed, pushed, or deployed.

## Summary

Individual orchid pages now show bounded Original, Current, and Hero panels at
the top. Exact-date observations render newest first, while their photos,
care notes, subordinate headings, and wording remain together. Original source
narratives are unchanged; four generated imports gained only `originalImage`.

Abbey Root owns the small optional `photos.original` schema/tooling extension
and four evidence-backed selections. This repository consumes `originalImage`
without reading Abbey Root at build time or maintaining a separate selection
map. Current and Hero retain their existing canonical selections.

## Accomplishments

### Shared chronology

- Added `site/src/lib/orchid-timeline.mjs`, a native Astro 7/Sätteri Markdown
  plugin restricted to orchid files under `content/plants/`.
- Recognizes complete, valid `YYYY-MM-DD` dates at the start of top-level
  headings. Approximate dates, ranges, fenced code, and nested headings are
  not interpreted as independent observations.
- Sorts complete dated sections descending. Same-day entries retain their
  authored order, including the separate rescue/inspection entries in Doctor
  Robert and Helter Skelter.
- Keeps all material before the first exact-date heading above the timeline,
  including Lady Madonna's and Revolution's Before Tracking histories.
- Moves intervening undated top-level sections into a collapsed, clearly
  labeled **Undated and historical notes** section above the timeline. Their
  original wording and relative source order are retained, with the preceding
  dated heading recorded as source placement, not an inferred date.
- Adds **Observations and updates** and a newest-first explanation. This is a
  build-time presentation transformation; it does not rewrite plant imports.
- Declared the already-installed `@astrojs/markdown-satteri` 0.3.2 as a direct
  dependency. The lockfile changes only its root dependency declaration;
  no package version or Markdown engine was changed.

### Image presentation

- Added `PlantImageRoles.astro` and optional `originalImage` collection metadata.
- Displays three equal-width panels above 700px; stacks them at 700px and below.
  Captions use the existing theme, borders, and rounded corners.
- Uses proportional `object-fit: contain` images in bounded 260px desktop and
  280px mobile frames, with consistent caption space and keyboard-focusable
  links to the public images. Portrait images are not stretched or cropped.
- Original and Current do not substitute other roles when missing. Each shows
  a clear not-yet-designated message. Hero uses its explicit selection, then
  Current, then Original, with fallback wording; it also handles no images.
- Removed the duplicate Current Condition image at the bottom and retained the
  last-updated date beside the plant facts. Removed the individual template's
  nested main landmark because the shared layout already provides it.
- Did not change the Plants index, homepage, navigation, other categories,
  Clydeverse/Cooke Holdings content, or route construction.

### Canonical Original role and export boundary

The extension and canonical selections live in
`/home/bcooke/git/abbey-root`. Its linked implementation record is
`docs/session-updates/2026-08-30-original-plant-image-role-for-bradcooke-com-session-3.md`.
The authoritative schema documentation is `docs/reference/PLANT_MODEL.md` there.

`photos.original` is optional and left unset in new templates for review.
When explicitly populated, Abbey validates the referenced photograph and
exports `originalImage` through its existing sanitized derivative and
provenance-manifest pipeline. It never selects an Original from filenames,
Hero, or an arbitrary first import.

Four canonical selections were established from their existing
`photo-metadata.md` records, rather than guessed:

| Plant | Canonical Original photograph | Recorded evidence |
| --- | --- | --- |
| Lady Madonna | `Lady_Madonna - 1.jpeg` | 2026-01-05 first full-plant assessment; embedded date, XMP, and PDF |
| Rocky Raccoon | `rocky-raccoon-2026-08-02.jpg` | Verified initial photograph, 2026-08-02 13:17:43 |
| Revolution | `Revolution - 1.png` | 2020-10-18 earliest documented bloom; existing browser-compatible source |
| Honey Pie | `Honey_Pie - 1.jpeg` | 2026-06-14 acquisition plant and bloom display; XMP/PDF match |

No narrative, current/hero selection, original photograph, or sidecar changed.
These facts changes are uncommitted in Abbey Root. The approved local export
added one `originalImage` field to each corresponding generated Markdown file,
one Original provenance record to each manifest, and four sanitized derivatives
in BradCooke.com. All existing generated image files and manifest records remain
unchanged.

Auto-review initially rejected the `publish-batch` operation under the
no-publication instruction. The rejection was not bypassed. On 2026-08-30 the
user explicitly approved exporting these four plants into local generated files
with no commit, push, or deployment. The same Abbey command then succeeded:
`abbey plant publish-batch lady-madonna rocky-raccoon revolution honey-pie`.
Only local artifacts were written; neither website was published. The four
approved pages now show all three roles, while seven pages retain the
missing-Original fallback.

## Impact

The shared presentation now supports newest-first observations and all three
photo roles without duplicating canonical data or requiring client-side
JavaScript. Existing plant imports remain compatible. The four approved
Original selections now render from exported metadata; remaining missing
selections stay explicit and require no speculative image assignment.

## Validation

- Confirmed ubuntu-dev01 and the authoritative path before edits. BradCooke.com
  started clean on `main`, HEAD `7b49d37`, remote
  `git@github.com:brad6887/brad6887.github.io.git`. Abbey Root also started clean
  on `main` with `git@github.com:brad6887/abbey-root.git`.
- Read both applicable BradCooke.com AGENTS files, `.abbey/project.yml`,
  PROJECT_STATUS.md, NEXT.md, Session 1, Session 2, and the plant runbooks.
  Reviewed Abbey Root instructions, planning, Plant Model, exporter, and
  photographic provenance before the canonical extension.
- Ran `abbey session` in both repositories. BradCooke.com had no recurring
  reviews due. Abbey Root reported existing dependency/infrastructure reviews;
  they were not expanded into this session.
- Baseline and final `abbey site build` passed: 179 pages, all eight configured
  required routes. `abbey site validate` also passed. No temporary fixture route
  remains in the source or final output.
- `npm test` passed five regression tests, including the real native Markdown
  processor, same-day order, source-node preservation, approximate/invalid dates,
  fenced examples, undated prose, and isolation from other content collections.
- Abbey Root's `tests/test-abbey-plant.sh` passed 135 checks. New fixtures cover
  absent Original, invalid/missing/unsafe references, sanitized output, unchanged
  canonical source hashes, versioned URLs, and role provenance. These exports
  occurred only inside the test suite's temporary fixtures, not real plant data.
- Validated the four real canonical workspaces with `abbey plant validate`: no
  failures; existing unknown species warnings and Lady Madonna's unknown rescue
  date were preserved.
- Compared all 13 built Orchid Rescue routes against the baseline and verified
  HTTP 200 through a private Ubuntu loopback server. All eleven individual
  routes and `/orchid-rescue/` remain unchanged. After export, checked 380 internal
  anchor/image references across the individual pages.
- Compared every original rendered paragraph, list item, heading, and image
  against the baseline across all eleven orchid articles: no original content
  was lost, changed, or duplicated. Their exact-date heading order matches a
  stable newest-first sort; every page's newest entry is 2026-08-30.
- Spot-checked Lady Madonna (28 dated entries), Rocky Raccoon (6), Revolution
  (26), Honey Pie (12), and Doctor Robert (20) in the browser. Desktop panels
  align side by side; mobile stacks. After the approved export, all three images
  loaded and preserved their aspect ratio on the first four pages. Doctor
  Robert retained the missing-Original fallback with Current/Hero loaded.
  Rechecked newest-first headings in the browser and expanded historical notes
  to verify their context. No browser warnings or errors were reported.
- Checked widths 320, 390, 700, 701, 960, and 1280: no horizontal overflow;
  stacking changes at the intended breakpoint. Repeated these exact CSS-width
  checks on Lady Madonna after Original was populated. A final caption
  adjustment gives narrow desktop panels consistent image alignment.
- Separately exercised populated Original/Current/Hero, Hero-to-Current,
  Hero-to-Original, and completely empty states using a temporary generic
  component fixture, not invented plant metadata. All expected images loaded,
  fit proportionally, and reflowed on desktop/mobile. The fixture was removed.
- Verified all four Original source and derivative SHA-256 hashes against their
  manifests, versioned URLs, canonical-preservation flags, and absence of private
  metadata. Removing the new Original record yields each exact prior manifest.
  Source bodies and all frontmatter except the four new `originalImage` lines
  remain byte-for-byte unchanged.
- Ran `abbey review`, `git status`, `git diff`, tracked and untracked whitespace
  checks, and capture metadata validation in both repositories. Pre-existing
  BradCooke.com README frontmatter and backlog-statistics warnings remain.
  Abbey Root also reports the deliberately omitted journal entry; the supported
  per-session override is recorded in its linked capture.
- No staging, commit, pull, merge, reset, push, website publication, or deployment
  occurred. The local export was the only approved addition to generated plant
  artifacts; existing public plant images remain byte-for-byte unchanged.

## Lessons Learned

A build passing is not sufficient evidence of changed chronology: the old
long-running preview initially served cached content. Validation therefore used
the freshly built artifact and an independent baseline comparison. The native
Astro 7 Markdown interface also avoids changing the site's rendering engine.

Undated prose needs explicit context when dated sections are reordered. A
shared presentation safeguard can preserve the evidence while individual
narrative cleanup remains deferred.

## Next Steps

- Review Original-photo provenance for Bungalow Bill, Doctor Robert, Helter
  Skelter, Martha My Dear, Mother Nature's Son, Phal McCartney, and Something.
  Their missing selections are metadata-review gaps, not proof that no early
  photographs exist. Do not fill them by filename or Hero heuristics.
- During later plant-by-plant cleanup, revisit Looking Ahead in Bungalow Bill,
  Doctor Robert, Helter Skelter, Honey Pie, and Lady Madonna. These expectations
  predate later observations and are preserved as historical notes here.
- Review Doctor Robert's Mid-April and Late Spring 2026 entries, and Helter
  Skelter's Spring 2026 move, before assigning precise dates. They remain
  undated historical notes; this session invents no dates.
- Preserve Before Tracking introductions for Lady Madonna and Revolution.
  Revolution's early photographs predate exact-date tracking headings, which
  is why a naive earliest-timeline-image rule would be wrong.
- The latest imported observation text contains `REQUIRED:` in all eleven
  plants. Those existing source placeholders and stale introductions were
  intentionally not rewritten in this template session.
- Reconcile older planning state and existing Abbey housekeeping separately.

## Notes

All repository edits, builds, and temporary test artifacts were on
ubuntu-dev01. The Mac hosted only SSH access and browser viewing; no local
checkout or synced project reference was edited. The preview is loopback-only
and is not a public deployment.

Captured using `abbey session capture --title` with `--no-journal`. No public
journal entry was requested. Capture status remains `pending` and `reviewed:
false` for later planning review; this is capture-review metadata, not an
unfinished implementation. Commit and post-commit certification were
intentionally not performed.
