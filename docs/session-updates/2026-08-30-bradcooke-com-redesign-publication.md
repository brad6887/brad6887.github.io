---
title: "BradCooke.com Redesign Publication"
description: "Validated the personal-hub redesign and final orchid templates and image selections, with separate canonical and website commits before GitHub Pages publication."
date: 2026-08-30
status: pending
reviewed: false
session: bradcooke-com-redesign-publication
tags:
  - BradCooke.com
  - publishing
  - orchids
---

# BradCooke.com Redesign Publication

## Objective

Publish the completed redesign from ubuntu-dev01, using
`/home/bcooke/git/brad6887.github.io` as the authoritative website source and
its configured Abbey GitHub Pages workflow. Do not publish AbbeyRoot.com.

## Definition of Done

- Review both related change sets and final Session 4 selections.
- Pass required website, canonical plant, Abbey, and whitespace validation.
- Commit the related canonical work separately, then commit the website changes.
- Publish BradCooke.com through `abbey site publish` to `origin:main`.
- Verify the exact GitHub Pages deployment and public routes; capture warnings.

## Summary

The personal-hub redesign was already published in commit `ece9f03`; the
starting website HEAD is `7b49d37`. This continuation publishes the remaining
Session 3/4 orchid template, Original/Current/Featured presentation, final
curated image imports, tests, and session records on top of that redesign.

The plant publishing runbook requires a separate canonical commit first.
Brad explicitly authorized including the related Abbey Root Session 3/4 work
in a local commit on ubuntu-dev01. An Abbey Root push and AbbeyRoot.com
publication remain outside this continuation.

## Accomplishments

- Confirmed both repositories, branches, remotes, and intended changes.
- Confirmed all six final Featured filenames exactly against canonical facts,
  exported metadata, image bytes, and provenance records.
- Confirmed all eleven orchids retain explicit Original / Current / Featured
  roles, preserved narratives, and newest-first presentation.
- Used Abbey session, review, capture, validation, and site tooling; no manual
  export, pull, merge, reset, unrelated cleanup, or public journal was needed.

## Impact

The site remains independently buildable from its own committed generated
imports. Canonical ownership and the separate website publication boundary
are preserved.

## Validation

- `abbey site build`: 179 pages, all eight configured required routes.
- `abbey site validate` and `abbey validate`: passed in BradCooke.com.
- Website tests: six passed, including every established orchid route,
  role-to-image correspondence, and chronology.
- Canonical plant tests: 135 passed; image-review tests: seven passed.
- All eleven canonical plant validations, `abbey docs check`, and canonical
  `abbey validate` passed.
- Existing final-curation integrity checker verified all 299 source/derivative
  records, 33 roles, exact final selections, source preservation, absence of
  private image metadata, and unchanged narratives/Original/Current.
- Reviewed full tracked and untracked changes and `git diff --check`.
  Website baseline and remote were both `7b49d37` before this continuation.
- Abbey Doctor reports no failures in either repository.

## Lessons Learned

Complete the canonical and generated-import commits separately before website
publication. The published image files and their manifests provide a verifiable
boundary without requiring the website build to read Abbey Root.

## Next Steps

- Complete the approved commit and publication sequence, then append exact
  commit, deployment, live-route, and final repository results below.
- Address existing backlog-statistics and planning debt in a separate session.
- Keep narrative cleanup and future photo improvements outside this publication.

## Notes

All repository operations, builds, and tests are on ubuntu-dev01. The Mac
provides SSH access only; its checkouts and synced project references are
unchanged. Temporary logs are under
`/tmp/bradcooke-publish-20260830.NkneqO` on Ubuntu.

Existing warnings: website session README lacks frontmatter; generated backlog
statistics are missing/stale. Canonical validators report optional unknown
species/rescue dates and two unreferenced Doctor Robert source photos. Abbey
Root also has due dependency/infrastructure reviews and the intentionally
omitted journal entry under its documented per-session capture override.
These are not site-build failures and were not repaired as unrelated cleanup.

Capture uses `--no-journal`; status remains pending/unreviewed for later planning
reconciliation, not as a claim that implementation is incomplete.
