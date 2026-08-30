---
title: "BradCooke.com Redesign Session 4: Orchid Featured Photo Curation"
description: "Reviewed all eleven orchid photo trios, applied Brad's six final Featured selections, preserved Original and Current, and validated the canonical image-review workflow."
date: 2026-08-30
status: pending
reviewed: false
session: bradcooke-com-redesign-session-4-orchid-featured-photo-curation
tags:
  - BradCooke.com
  - orchids
  - website
---

# BradCooke.com Redesign Session 4: Orchid Featured Photo Curation

## Objective

Curate the three photographs above individual orchid pages on ubuntu-dev01,
using `/home/bcooke/git/brad6887.github.io` as the authoritative website
repository. Preserve canonical ownership in Abbey Root, original photographs,
narratives, newest-first chronology, and existing URLs.

## Definition of Done

- Show Original, Current, and Featured, retaining the internal `hero` schema.
- Review all eleven plants together; correct only evidence-backed role choices.
- Preserve sources and use Abbey's existing sanitized derivative pipeline.
- Provide the smallest useful reusable review aid through Abbey.
- Validate all orchid routes, metadata/image correspondence, narratives, and
  desktop/mobile presentation; capture follow-ups.
- Leave all changes unstaged. No commit, push, website publication, or deployment.

## Summary

Reviewed all 33 image slots using a private canonical-metadata contact sheet.
Seven previously missing Original roles now have documented source selections.
The initial pass changed four Featured selections through `abbey plant hero`.
Brad's final review then specified six Featured replacements, all applied
through that same canonical selector. All eleven Current selections remain the
August 30 photographs, byte-for-byte unchanged. Original selections from the
initial pass are also unchanged by the final cleanup.

The shared component now labels the curated image **Featured**, including its
image alternative text and accessible link label. The internal `photos.hero`
and exported `heroImage` fields retain their existing names. No individual
template overrides, narrative rewrites, or chronology changes were introduced.

Implementation and validation are complete. All changes remain unstaged,
including the preserved Session 3 work.

## Accomplishments

### Batch review method

Added `abbey plant image-review [slug ...] [--candidates]` in Abbey Root. It
generates a private HTML contact sheet, JSON role/path report, and
auto-oriented, metadata-stripped thumbnails. Original, Current, and Featured
appear together for each plant; absent selections and Featured fallbacks are
explicit. Optional galleries contain the existing source photographs, not
invented replacements. Paths and captions are escaped; unsafe references fail.

Session review artifacts on ubuntu-dev01:

- Before: `/home/bcooke/git/abbey-root/.abbey/plant-image-review-before/index.html`
- After: `/home/bcooke/git/abbey-root/.abbey/plant-image-review/index.html`

Both include source filenames and paths. The report is private working
material, not a public site route or a second source of truth. Thumbnails show
canonical source framing; actual exported images are checked separately.
The report never changes facts, images, narratives, or website imports.

The canonical model documentation, CLI metadata, generated CLI reference,
and focused regression tests accompany the command. The linked Abbey record is
`/home/bcooke/git/abbey-root/docs/session-updates/2026-08-30-orchid-image-review-and-curation-for-bradcooke-com-session-4.md`.
That linked record covers the initial implementation; Brad's final curation
and its follow-up validation are captured in this website session record.

### All-eleven selection review

Paths below are relative to each canonical `working/plants/<slug>/photos/`.
Current remains `<slug>-2026-08-30.jpg` for every plant. The table reflects
Brad's final review; the five plants marked for no change retain their
initial Session 4 selections.

| Plant | Original | Featured | Session 4 decision |
| --- | --- | --- | --- |
| Bungalow Bill | `Bungalow Bill - 1 of 13.jpeg` | `Bungalow Bill - 19.png` | Added documented March 29 rescue-day Original; retained Featured. |
| Doctor Robert | `IMG_C52D2813-DCED-40FD-BBF7-605ACE5D9306.jpeg` | `IMG_1481C7B6-2459-4C3F-826D-752A88C735DC.jpeg` | Preserved the initial pass's March 1 Original; Brad selected this distinct representative Featured. |
| Helter Skelter | `HelterSkelter - 1 of 12.jpeg` | `helter-skelter-2026-08-23.jpg` | Preserved acquisition Original; Brad selected the August 23 Featured, distinct from August 30 Current. |
| Honey Pie | `Honey_Pie - 1.jpeg` | `Honey_Pie - 7.JPG` | Preserved acquisition Original; July 12 Featured has a clearer full bloom display and plant framing. |
| Lady Madonna | `Lady_Madonna - 1.jpeg` | `Lady_Madonna - 18.jpeg` | Preserved Original; Brad selected photo 18 for Featured. No crop adjustment requested. |
| Martha My Dear | `Martha - 1.JPG` | `martha-my-dear-2026-08-01.jpg` | Preserved the initial pass's July 19 rescue-day Original; Brad selected the August 1 Featured. |
| Mother Nature's Son | `Mother_natures_son - 1.jpg` | `Mother_natures_son - 14.jpeg` | Added documented February 1 acquisition Original; April 5 Featured shows the unpackaged plant and developing growth. |
| Phal McCartney | `Phal_McCartney - 1.jpeg` | `Phal_McCartney - 9.jpeg` | Added January 5 first documented view; retained existing bloom Featured. |
| Revolution | `Revolution - 1.png` | `Revolution - 21.jpeg` | Retained earliest documented 2020 bloom and the established peak-bloom Featured. |
| Rocky Raccoon | `rocky-raccoon-2026-08-02.jpg` | `rocky-raccoon-2026-08-03.jpg` | Preserved first-photo Original; Brad selected the August 3 Featured. |
| Something | `Something - 1.jpeg` | `Something - 6.jpeg` | Preserved the initial pass's January 5 rescue-day Original; Brad selected photo 6 as a distinct representative Featured. |

The seven new Originals are supported by existing `photo-metadata.md` records,
except Doctor Robert's solo portrait, which is explicitly identified in the
March 1 rescue section of `history.md` and has matching embedded March 1
15:09:07 EXIF. Phal McCartney's first two photographs share January 5; embedded
times confirm photo 1 at 08:33:23 precedes photo 2 at 08:45:30. This does not
invent an acquisition date. The four Session 3 Originals remain unchanged.

Historical photographs can be imperfect without being the wrong Original.
Broad store views, acquisition packaging, and older low-resolution images
remain honest provenance. Cropping cannot restore portions absent from the
source. No synthetic replacement, arbitrary first-file heuristic, or additional
photo metadata reconstruction was used.

### Brad's final curation decisions

Brad reviewed all eleven plants and requested the six Featured selections
recorded above. Bungalow Bill, Honey Pie, Mother Nature's Son, Phal McCartney,
and Revolution required no change. All six supplied filenames resolved exactly
inside their respective canonical photo directories; no normalized substitute
or ambiguous match was needed.

Featured is a curated representative image, distinct from Original and Current
when useful. It does not have to show the orchid at its healthiest or prettiest.
Some orchids have been recovering since acquisition and do not yet have an
ideal Featured candidate, so a distinct representative photograph is useful
without implying peak health, ideal composition, or a new chronology.

The final cleanup changed only `photos.hero` in the six canonical `facts.yaml`
files. Brad explicitly authorized that necessary Abbey Root scope extension
and regeneration of its private image-review report. The website remains
authoritative at `/home/bcooke/git/brad6887.github.io`; no Mac checkout was
changed. No Original, Current, index, status, date, narrative, source image,
sidecar, crop, or rotation change was needed.

### Derivatives and publication boundary

The initial pass used the existing local `abbey plant publish-batch` export
for the nine plants whose roles changed. It regenerates BradCooke.com's imported
Markdown, sanitized public derivatives, and provenance manifests; its temporary staging
is filesystem staging, not Git staging or a Git commit.

In the initial pass, the four changed Featured sources produced refreshed web
derivatives; the seven new Original roles produced their own web derivatives.
Existing auto-orientation, sRGB conversion, 2400-pixel maximum edge, metadata removal, source-hash checks,
and content-versioned URLs are retained. Obsolete managed role derivatives are
replaced by the exporter and remain reproducible from preserved sources.

No custom crop or rotation override was added. The selected replacement sources
already work with the shared proportional `object-fit: contain` presentation.
A general crop editor/schema was not justified by this batch. Any future crop
workflow should bind adjustments to an exact source/hash and apply them through
the derivative pipeline, not hand-edit public images or individual templates.

The final cleanup reran `abbey plant publish-batch` for only Doctor Robert,
Helter Skelter, Lady Madonna, Martha My Dear, Rocky Raccoon, and Something.
Their six Featured derivatives, imported `heroImage` URLs, and corresponding
provenance records were regenerated. `abbey plant image-review --candidates`
refreshed the existing private report from the final canonical selections.

## Impact

All eleven orchids have explicit Original, Current, and Featured selections.
The site still builds independently from its generated imports. Repeated
curation is now a lightweight Abbey command rather than eleven manual page
reviews or a separately maintained selection document.

## Validation

The checks below document the initial batch. Final cleanup verification is
recorded separately at the end of this section.

- Confirmed hostname ubuntu-dev01, website repo path, branch `main`, and
  `origin git@github.com:brad6887/brad6887.github.io.git`. Abbey Root is also
  on `main` with `origin git@github.com:brad6887/abbey-root.git`.
- Reviewed both website AGENTS files, project configuration, planning,
  Session 3 records in both repos, Plant Model, image selection/export code,
  derivative handling, source provenance, and the plant/session runbooks.
- Ran `abbey session` in both repositories. Preserved the existing unstaged
  Session 3 baseline; no pull, reset, or unrelated cleanup occurred.
- Saved pre-edit working-tree hashes/content and pre-build orchid HTML under
  `/tmp/bradcooke-session4-*.json` on Ubuntu for exact comparisons.
- All eleven `abbey plant validate` checks passed. Existing optional species/
  rescue-date warnings and Doctor Robert's unreferenced store photos remain.
- `bash tests/test-abbey-plant.sh`: 135 passed, zero failed.
- `python3 tests/test_abbey_plant_image_review.py`: seven passed, including
  missing/fallback roles, explicit roles, template filtering, unsafe/missing
  paths, symlink escape, candidate filtering, escaping, thumbnail source
  preservation, deterministic cached review, and output/argument boundaries.
- `abbey docs generate` and `abbey docs check` passed; only the relevant CLI
  reference changed.
- Added a built-site regression test covering every established orchid URL,
  role order/labels, metadata-to-image correspondence, accessible labels,
  image existence, and descending timeline dates. Run after `abbey site build`.
- Final `abbey site build` and `abbey site validate` passed: 179 pages and
  all eight configured required routes. `npm --prefix site test`: six passed,
  zero failed (five preserved chronology tests and the new all-orchid check).
- All thirteen Orchid Rescue routes are unchanged and returned HTTP 200.
  All 427 local anchor/image targets across those pages resolve.
- Browser checks passed for every one of the eleven plants at 1280px and 390px:
  exactly Original / Current / Featured, three loaded images, proportional
  containment, three desktop columns / one mobile column, and no horizontal
  overflow. No browser warnings/errors were reported.
- Visually inspected the updated Honey Pie desktop trio and Rocky Raccoon's
  stacked mobile trio. Also verified Mother Nature's Son at 320, 700, 701,
  and 960px; stacking changes at the intended 700px boundary.
- All eleven imported narrative bodies and rendered `plant-content` articles
  are byte-for-byte unchanged from the Session 3 working-tree baseline.
- All 534 tracked canonical plant files other than facts are unchanged,
  including photographs, sidecars, provenance, and narratives. Facts differ
  only in the reviewed Original/Featured fields; all Current and index roles,
  statuses, and dates remain unchanged.
- Verified source and derivative SHA-256 hashes for all 299 publication
  manifest image records. All 33 role derivatives passed an independent
  private-metadata check; preservation flags are true.
- All 285 existing non-Hero public plant files retain their original bytes.
  The exporter replaced the three obsolete Hero filenames for Helter Skelter,
  Honey Pie, and Mother Nature's Son; those web copies are reproducible from
  the preserved sources. Rocky Raccoon's existing Hero filename has new bytes
  and a new content-hash URL. The seven new Original web images are added.
- Final private contact sheet: eleven plants, 33 populated roles, zero missing
  Original selections. The optional gallery covers 276 existing source photos.
- `abbey validate` passed in Abbey Root. `abbey review` ran in both repos and
  accepted both changed session records' metadata. Existing BradCooke.com
  README frontmatter and backlog-statistics warnings remain; Abbey Root's
  deliberately omitted journal is covered by the recorded per-session override.
- Reviewed final Git status and tracked/untracked diffs and whitespace. The
  index is empty in both repos. Session 3 changes remain preserved, and no
  unrelated planning or content changes were introduced.

### Final cleanup validation

- All six requested filenames matched exactly and were applied through
  `abbey plant hero`. Only the six `photos.hero` fields changed in canonical
  facts; all eleven Original, Current, and index selections, statuses, and
  dates are preserved.
- The five no-change orchids and all canonical source photographs, sidecars,
  provenance, and narrative files are unchanged from the cleanup baseline.
  All eleven imported narrative bodies and rendered `plant-content` articles
  are byte-for-byte unchanged.
- Only the six Featured derivatives and their matching imported `heroImage`
  URLs and manifest records changed. Every non-Featured public image retains
  its baseline bytes. All 299 source and derivative manifest hashes match;
  preservation flags remain true. An independent ExifTool check found no EXIF,
  XMP, or IPTC metadata in the six final Featured derivatives.
- Regenerated `abbey plant image-review --candidates`: eleven plants, 33 explicit
  roles, zero missing Original selections; report selections match canonical
  facts. All seven existing image-review regression tests passed.
- All eleven `abbey plant validate` checks passed (six during export and five
  separately). Existing optional species/rescue-date and Doctor Robert
  unreferenced-photo warnings remain.
- `abbey site build` and `abbey site validate` passed: 179 pages and all eight
  required routes. `npm --prefix site test`: six passed, zero failed.
- All thirteen Orchid Rescue preview routes returned HTTP 200 and matched the
  rebuilt files. All 427 local anchor/image targets across those pages resolve.
- All six affected pages passed browser checks at 1280px and 390px: Original /
  Current / Featured order, three loaded images, proportional containment,
  three desktop columns / one mobile column, and no horizontal overflow.
  Browser logs contained no warnings or errors. Visually inspected Doctor
  Robert's desktop trio and Something's mobile Featured photo.
- `abbey validate` passed in both repositories. Final Git status, full tracked
  diffs, the untracked session-record diff, and `git diff --check` were reviewed.
  Only task-related changes were added to the existing Session 3/4 baseline.
  Both Git indexes remain empty and both HEADs are unchanged.
- The updated website session record passes Abbey review metadata validation.
  Existing README-frontmatter and backlog-statistics warnings remain.
- Temporary verification evidence is under
  `site/node_modules/.cache/session4-final-curation/` in the website repository,
  using its existing ignored cache; the shared image-review report remains in
  Abbey Root's existing private review directory. No journal, planning,
  framework, or linked Abbey session-record changes were made in this cleanup.
- Nothing was staged, committed, pushed, website-published, or deployed.

## Lessons Learned

Review Original provenance separately from Featured composition. A plant's
first photograph can remain important evidence even when a later photograph
makes a better highlight. Preserve Current's temporal meaning rather than
using it as another aesthetic choice.

A side-by-side report makes the recurring workflow concrete enough to justify
a small reusable command. Selection remains a deliberate review decision; the
tool does not rank images or silently resolve provenance.

## Next Steps

- Brad's final selections are applied and available in the private report/site
  preview. Future adjustments can use the same command and canonical roles as
  recovering orchids develop new representative photographs.
- Keep narrative cleanup, stale `REQUIRED:` observation prose, historical
  Looking Ahead notes, and uncertain chronology deferred from Session 3.
- Consider a source-bound crop override only when a concrete selected photograph
  needs it; do not introduce a general image editing framework speculatively.
- Reconcile older planning and Abbey's existing recurring-review warnings in
  their own sessions.

## Notes

All edits, generated artifacts, tests, and builds are on ubuntu-dev01. The Mac
only provides SSH transport and browser viewing; its site checkouts and synced
project references were not edited.

Captured with `abbey session capture --title` and `--no-journal`. The linked
Abbey record uses the supported per-session journal override; no project
journal policy was changed. Capture `status: pending` / `reviewed: false`
is for later planning reconciliation. Commit and post-commit certification are
intentionally excluded. Nothing was staged, committed, pushed, website-published,
or deployed.
