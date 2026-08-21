---
title: "Split Plant Website Update Runbooks"
description: "Separated single-plant and multi-plant procedures and aligned them with BradCooke.com publishing ownership."
date: 2026-08-21
status: complete
reviewed: true
session: split-plant-website-update-runbooks
tags:
  - BradCooke.com
  - plants
  - runbooks
---

# Split Plant Website Update Runbooks

## Objective

Replace the combined plant website update procedure with focused single-plant
and multi-plant runbooks in the BradCooke.com project.

## Definition of Done

- Single-plant onboarding, observation, and correction procedures are clear.
- Multi-plant batch preparation, review, application, and export are clear.
- Abbey Root remains the canonical plant workspace and tooling source.
- BradCooke.com owns site build, review, and GitHub Pages publication.
- The publishing boundary prevents accidental AbbeyRoot.com deployment.

## Summary

Created two project-owned runbooks under `docs/runbooks/`. Both begin with the
BradCooke.com session, switch to Abbey Root only for canonical plant work and
explicit export, then return to BradCooke.com for site validation and
publication.

## Accomplishments

- Added the single-plant update runbook, including new-plant onboarding and
  manual corrections.
- Added the multi-plant worksheet and batch export runbook.
- Documented canonical and generated artifact ownership.
- Added explicit dry-run and project-resolution checks before site publication.

## Impact

Plant maintenance continues to use Abbey Root's canonical model and tooling,
while every public website operation now clearly belongs to BradCooke.com.
Operators have separate procedures for small updates and recurring batch work.

## Validation

- Markdown fences, trailing whitespace, and local cross-links passed checks for
  all new documentation.
- Current `abbey plant` and `abbey site publish` help were reviewed against the
  documented commands.
- `abbey review` identified the two runbooks and this session update.

## Lessons Learned

A plant export and a site deployment are separate operations. Repository
context must be explicit at that boundary because `abbey site publish` always
publishes the active Abbey project.

## Next Steps

- Use the appropriate runbook during the next plant observation update.
- Revise the procedure if a real run exposes command or ownership drift.

## Notes

No commit, push, website publication, or deployment was performed.
