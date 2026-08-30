---
title: "BradCooke.com Redesign Session 2: Personal Hub Implementation"
description: "Implemented the personal-hub homepage, navigation, Plants landing page, Projects redirect, conversational About page, and temporary Abbey Root diagram visual."
date: 2026-08-30
status: pending
reviewed: false
session: bradcooke-com-redesign-session-2-personal-hub-implementation
tags:
  - BradCooke.com
  - personal-hub
  - website
---

# BradCooke.com Redesign Session 2: Personal Hub Implementation

## Objective

Implement the Session 1 personal-hub design on ubuntu-dev01 in
`/home/bcooke/git/brad6887.github.io`, preserving existing orchid URLs and
leaving the deferred orchid chronology, narrative, and photo-header work alone.

## Definition of Done

- Use the approved homepage introduction and four tile descriptions exactly.
- Provide a two-column desktop grid that stacks on narrow screens.
- Apply About, Plants, Museum, Bread Pitt, Abbey Root, Contact navigation,
  keeping the site name as Home and marking the external links.
- Add a Plants landing page with Orchid Rescue as its only category.
- Retire the Projects index and redirect its existing URL to Home.
- Rewrite About using the supplied personal copy and a concise About This Site.
- Use the approved network diagram as a temporary Abbey Root tile visual,
  preserving a source asset without implying technical accuracy or adding clues.
- Validate the build, routes, links, responsive behavior, and working-tree scope.
- Capture Session 2 through Abbey tooling. Commit, push, and publish only
  after explicit approval.

## Summary

BradCooke.com now presents Brad's projects and hobbies as a personal hub.
The homepage centers on Plants, Bread Pitt, Museum of Dumb Ideas, and Abbey
Root in the approved order. Plants links to a new landing page, while Bread
Pitt and Abbey Root link to their separate canonical sites.

The implementation was validated on ubuntu-dev01 and published to
[BradCooke.com](https://bradcooke.com/) after Brad explicitly approved
publication on 2026-08-30. The publication record below supersedes the earlier
uncommitted-preview state.

## Accomplishments

### Homepage and imagery

- Replaced the technical introduction, featured technical project, Current
  Focus, and What I'm Working Toward sections with the approved introduction
  and four cards.
- Preserved the introduction and each tile description verbatim from Session 1.
- Added a small shared `HubCard.astro` component with a full-card link,
  descriptive image alternatives, and a visible keyboard focus outline.
- Used the existing site colors, type, borders, and rounded card styling.
  The grid has two columns above 600px and one column at narrower widths.
- Reused Phal McCartney's existing index image through its content metadata
  and the existing Museum photograph of Brad with the stuck Jeep.
- Copied the existing public Bread Pitt loaf photograph, unchanged, from
  `/home/bcooke/git/bread-pitt/public/images/bakes/2026/bake001/bake001-final-2026-07-30.jpg`
  to `site/public/images/projects/bread-pitt.jpg`. Its source repository was
  only read, and the copy's SHA-256 matches the original.
- Initially used the Abbey Root domain as simple text because no suitable
  project image was present. In the continuation, replaced that fallback
  with the network diagram Brad approved in the Plan Website Redesign
  conversation, explicitly as a temporary placeholder rather than an accurate
  or canonical representation of the lab.
- Preserved the original 1536 x 1024 PNG, unchanged, at
  `site/public/images/projects/abbey-root-lab-network-placeholder-source.png`.
  Its SHA-256 is
  `aed4b4c8f083a06c33e481800c3aad465ed139eb4cc7ff7d7c5b4fff01acbab1`.
- Created a 960 x 540 WebP tile derivative (42,766 bytes) at
  `site/public/images/projects/abbey-root-lab-network-placeholder.webp`.
  The complete diagram is fitted proportionally with neutral side padding,
  not cropped, stretched, redrawn, or technically corrected. The source is
  approximately 1.46 MiB and is not loaded by the homepage.
- Wired the derivative through the existing `HubCard.astro` image properties.
  Shared card markup, image sizing, rounded corners, responsive behavior, and
  the approved tile description remain unchanged. The image filename and alt
  text explicitly identify its placeholder/noncanonical status.
- All image processing occurred in this repository on ubuntu-dev01. The
  browser download was only a temporary transfer artifact; no local checkout
  was edited. No new artwork or Clydeverse/Cooke Holdings elements were added.

The tile derivative can be reproduced from the preserved source, from the
repository root, with the installed ImageMagick tool:

```sh
convert site/public/images/projects/abbey-root-lab-network-placeholder-source.png \
  -resize 960x540 -background '#f5f5f5' -gravity center -extent 960x540 \
  -strip -quality 85 site/public/images/projects/abbey-root-lab-network-placeholder.webp
```

### Navigation and Plants

- Navigation is now About | Plants | Museum | Bread Pitt ↗ | Abbey Root ↗ |
  Contact. The Brad Cooke brand still links to Home.
- Retained content-driven navigation for ordinary pages and the existing
  explicit-link approach for separate site sections and external destinations.
- Removed Journal from navigation while preserving its index and entry URLs.
- Added `content/pages/plants.md`, generating `/plants/`, with only an
  Orchid Rescue entry linking to the existing `/orchid-rescue/` collection.
- Allowed navigation links to wrap and kept external names/arrows together.
  Added primary-navigation labeling and keyboard focus styling.

### Projects and About

- Removed the old Projects index content and its unused listing branch in
  the generic page renderer.
- Configured the built-in Astro redirect from `/projects/` to `/`.
- Preserved the existing project detail pages rather than expanding the
  session into a historical-content migration.
- Replaced the technical-portfolio About copy with the two user-supplied
  paragraphs about Navy service, IT, the home lab, hobbies, and weird stuff.
- Kept About This Site concise and consistent with the personal-hub identity.

### Validation configuration

Added About, Plants, and Contact to the required routes in
`.abbey/project.yml`, retaining the existing Journal, Museum, Orchid Rescue,
and Projects checks. The Projects requirement now protects the redirect
artifact.

## Impact

Visitors can reach each hobby or project directly from Home without needing
to understand the home lab or any Clydeverse/Cooke Holdings context. The
Plants hierarchy leaves all existing Orchid Rescue links intact. No plant
imports, source narratives, observation order, photographs, publication
manifests, or orchid templates changed.

## Validation

The implementation and placeholder checks below record the pre-publication
state. The later authorized commit, push, deployment, and live checks are
recorded under Publication.

- Confirmed hostname `ubuntu-dev01`, user `bcooke`, the authoritative
  repository path, a clean starting working tree on `main`, and remote
  `git@github.com:brad6887/brad6887.github.io.git`.
- Starting HEAD was `866dad6` (`bradcooke.com resesign plan`). No pull,
  merge, branch change, reset, staging, commit, push, or deployment occurred.
- Reviewed root and site `AGENTS.md`, `PROJECT_STATUS.md`, `NEXT.md`,
  `.abbey/project.yml`, both plant runbooks, the session-update README, and
  the committed Session 1 update before editing.
- Ran `abbey session`; there were no recurring reviews due. The planning
  files still describe earlier publishing work, so the explicit Session 2
  request and Session 1 update governed this implementation.
- Ran the baseline and final `abbey site build` successfully using the
  installed Node 24.18.0 and Astro 7 dependency. The final build reports
  179 pages, with all eight configured required-route checks passing.
- Ran `abbey site validate` successfully after the final build.
- Compared built homepage text against the exact approved introduction and
  four descriptions, and checked all four destination URLs.
- Checked the exact navigation order on 19 built pages and resolved 578
  internal link/image references across the main pages and Orchid Rescue.
- Compared all 13 generated Orchid Rescue routes with the baseline: no route
  was lost or renamed, including all 11 individual orchid pages.
- Verified the Plants page exposes only Orchid Rescue as a category.
- Verified About's supplied wording; the existing Markdown renderer uses
  typographic apostrophes in the rendered output.
- Checked the generated Projects HTML for an immediate meta refresh, a
  fallback link to Home, and noindex metadata. Served the built artifact
  privately and verified in the browser that `/projects/` reaches `/`.
- Confirmed both external destinations, `https://breadpitt.net/` and
  `https://abbeyroot.com/`, returned HTTP 200 from ubuntu-dev01.
- Used a private, loopback-bound Astro background preview on ubuntu-dev01,
  accessed through an SSH tunnel. Reviewed desktop and mobile layouts,
  confirmed two-column versus stacked cards, loaded images, and no
  horizontal overflow at the tested narrow, intermediate, and wide sizes.
- Clicked through Plants to Orchid Rescue and checked the rewritten About
  page. The final browser error/warning check was empty.
- Confirmed `content/plants/`, plant images, publication manifests, orchid
  templates, planning documents, and journal entries have no Git changes.
  The domain file and existing project detail routes are preserved.
- Ran `abbey review` before capture. Created this update with
  `abbey session capture --title` and `--no-journal`, following the
  configured event-driven journal policy.
- Reviewed `git status`, tracked and untracked diffs, session metadata, and
  whitespace checks. No unrelated files are included.

### Placeholder visual follow-up validation

- Reconfirmed ubuntu-dev01, the authoritative repository, `main`, the remote,
  and the existing uncommitted Session 2 work before this continuation. Ran
  `abbey session`; no recurring reviews were due.
- Retrieved the exact approved generated image from the referenced
  conversation. The text-only conversation reference had no attachment, so
  the original browser image asset was used. The copied source checksum
  matches that download byte-for-byte.
- Re-ran `abbey site build` and `abbey site validate`: 179 pages built and all
  eight configured required routes passed.
- Rechecked the exact approved homepage introduction, four descriptions,
  four destinations, all four loaded images, and the placeholder alt text.
- Resolved 579 internal link/image references across 19 built pages, checked
  navigation, retained all 13 baseline Orchid Rescue routes, and rechecked
  the Plants category and Projects redirect artifact.
- Confirmed Abbey Root and Bread Pitt both returned HTTP 200 from ubuntu-dev01.
- Reviewed the private Ubuntu preview at viewport widths 320, 390, 600, 601,
  960, and 1280 pixels: all four images loaded at the same 16:9 ratio, cards
  stacked at 600px and below, two columns appeared above 600px, and no
  horizontal overflow occurred. Desktop and mobile visual inspection showed
  the full placeholder diagram without cropping. Browser errors/warnings
  were empty. The temporary viewport override was reset after testing.
- Verified the original PNG checksum, derivative dimensions and size, and
  exact copies in the built output. The homepage references only the WebP.
- Re-ran `abbey review`, changed-session metadata validation, `git status`,
  `git diff`, and tracked/untracked whitespace checks. Only the same existing
  README metadata and generated-backlog-statistics warnings remain.
- Confirmed the shared card component and protected orchid content, images,
  manifests, templates, planning files, and journal remain unchanged. HEAD
  is still `866dad6`; nothing was staged, committed, pushed, or published.

## Lessons Learned

The existing Astro page collection and site theme support the personal-hub
design without a new framework, dependencies, or client-side interaction.

Astro's configured redirects generate a small HTML meta-refresh page for a
static build. This is appropriate for the current GitHub Pages deployment;
it is not a server-issued HTTP 301 in the deployed static artifact.

## Publication

Brad approved the preview and explicitly requested publication on 2026-08-30.
All repository work remained on ubuntu-dev01 in
`/home/bcooke/git/brad6887.github.io`.

- Reconfirmed the approved 16-file working tree and unchanged remote baseline.
  Re-ran `abbey session`, `abbey review`, the publish dry run, the 579 internal
  link/image checks, protected-content checks, and staged whitespace checks.
- Committed the approved redesign as
  `ece9f035f011abb0970d70dbae8277c05c1a463b`
  (`Redesign BradCooke.com as a personal hub`).
- Published with `abbey site publish`, using the configured `origin:main`
  GitHub Pages target. Its fresh build generated 179 pages and passed all
  eight required-route checks before the push.
- The project-owned [GitHub Pages workflow run 33332321011](https://github.com/brad6887/brad6887.github.io/actions/runs/33332321011)
  built and deployed that exact commit successfully. Deployment completed
  at 2026-08-30 14:59:13 CDT (19:59:13 UTC).
- Verified the live homepage's approved introduction, four destinations,
  four images, stylesheets, and explicit placeholder alt text. The served
  WebP was exactly 42,766 bytes and matched the local SHA-256:
  `8e5511aa0922a83bc356c18342aec8ef1e19afd16874bec9e15c3e855d19a5c5`.
- All 20 unique required/Orchid Rescue routes returned HTTP 200, including
  all 13 baseline orchid routes. The live Projects redirect artifact,
  Plants link to Orchid Rescue, and approved About copy also passed.
- No technical-accuracy claims or Clydeverse/Cooke Holdings additions were
  introduced. The diagram remains an explicitly temporary placeholder.
- `abbey end` confirmed a clean, synchronized repository, committed session
  documentation, and no Abbey Doctor failures. Full session certification
  remains incomplete only because of pre-existing missing/stale generated
  backlog statistics. This unrelated housekeeping issue was left unchanged.
- The successful hosted workflow reported Node.js runtime-deprecation
  annotations for existing Pages actions. These were non-blocking; no
  workflow or dependency changes were made during publication.

This publication record is a documentation-only follow-up; it does not
change the deployed website source. No public journal entry was requested.

## Next Steps

- Handle the pre-existing backlog-statistics/certification issue through a
  separate Abbey housekeeping review.
- Replace the temporary Abbey Root visual with an accurate lab diagram in a
  later session. That future visual could support subtle Easter eggs, but no
  Clydeverse/Cooke Holdings additions are included in this continuation.
- Keep individual orchid narrative rewrites, newest-first entries, and
  Original/Current/Hero photo headers for a separate session.
- Add other plant categories only when real content exists.
- Reconcile the older planning state through the Abbey review workflow when
  requested; no duplicate planning updates were made here.

## Notes

The continuation adds only the approved temporary Abbey Root diagram visual
and its validation/capture details. The diagram is not technically accurate or
canonical. No Clydeverse/Cooke Holdings explanation, new clues, or broader
integrations were added.

Preview startup used the native `astro dev --background` workflow required
by `site/AGENTS.md`. Abbey tooling handled session startup, builds, artifact
validation, review, and capture. An initial browser resize check stalled;
reloading the preview restored testing without a site change. The temporary
built-artifact server was stopped after validation. The native development
preview remains bound to ubuntu-dev01 loopback port 4321 for review through
the current SSH tunnel; it is not a public deployment.

Abbey review reports pre-existing session metadata debt in
`docs/session-updates/README.md` (missing YAML frontmatter) and missing/stale
generated backlog statistics. These are unrelated to this redesign and were
left unchanged. No repository test script is defined; validation used the
existing build, Abbey checks, artifact checks, and browser review.

The update retains Abbey's `status: pending` and `reviewed: false` defaults
for the subsequent planning review. No public journal entry was created.
Post-commit certification was attempted; its existing blocker is recorded
under Publication. All site and capture changes are confined to the
authoritative ubuntu-dev01 repository.
