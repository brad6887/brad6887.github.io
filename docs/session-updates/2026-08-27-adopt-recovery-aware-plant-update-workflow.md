---
title: "Adopt Recovery-Aware Plant Update Workflow"
description: "Updated the BradCooke.com multi-plant runbook for worksheet validation, slug discovery, recovery, and deployment verification."
date: 2026-08-27
status: complete
reviewed: true
session: adopt-recovery-aware-plant-update-workflow
tags:
  - BradCooke.com
  - plants
  - runbook
---

# Adopt Recovery-Aware Plant Update Workflow

## Objective

Adopt Abbey Root's hardened multi-plant worksheet and recovery workflow in the
BradCooke.com operational runbook.

## Definition of Done

- The runbook validates worksheet structure before canonical application.
- Plant arrays come from the reviewed worksheet.
- Already-applied and inconsistent recovery paths are explicit.
- GitHub Actions and live-site verification complete the publishing procedure.

## Summary

The multi-plant runbook now uses the new `validate` and `slugs` commands,
documents recovery-aware apply results, demonstrates safe folded narrative
syntax, and includes GitHub Actions and live-page checks after deployment.

## Accomplishments

- Replaced the hand-written placeholder plant array with worksheet-derived slugs.
- Added a structural worksheet validation checkpoint.
- Added guidance for complete and inconsistent existing updates.
- Added GitHub Actions status and live observation-date verification commands.

## Impact

The public publishing procedure now follows the same reviewed batch boundary
from worksheet preparation through live-site verification, reducing manual
transcription and ambiguous recovery decisions.

## Validation

- Markdown fence, whitespace, and local-link checks passed.
- Documented commands were exercised against the real August 23 worksheet.
- Abbey Root's focused batch workflow suite passed 44 tests.

## Lessons Learned

The worksheet is the best source for batch membership because it already
captures preparation skips and human review. Rescanning the incoming directory
later can silently reintroduce out-of-scope photographs.

## Next Steps

- Use the revised runbook for the next BradCooke.com plant batch.
- Update it only when another real publishing run changes the proven procedure.

## Notes

No commit, push, website publication, or deployment was performed during this
runbook update.
