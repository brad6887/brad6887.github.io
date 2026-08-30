---
title: "BradCooke.com Redesign Session 1: Personal Hub Design"
description: "Captured the BradCooke.com personal hub design, homepage copy, navigation, Plants hierarchy, and deferred work."
date: 2026-08-30
status: pending
reviewed: false
session: bradcooke-com-redesign-session-1-personal-hub-design
tags:
  - BradCooke.com
  - design
  - personal-hub
---

# BradCooke.com Redesign Session 1: Personal Hub Design

## Objective

Define BradCooke.com as Brad's personal hub for his projects and hobbies, and
capture the agreed Session 1 design decisions for a later implementation
session.

## Definition of Done

- Record the personal hub purpose, homepage introduction, four tiles, and exact
  tile descriptions.
- Record the navigation changes and Plants hierarchy while preserving existing
  orchid URLs.
- Capture the About message, subtle Clydeverse/Cooke Holdings direction, and
  explicitly deferred orchid work.
- Use Abbey's session-update naming and format, and validate the resulting
  file and Git status/diff.
- Leave site implementation, public content, and planning documents unchanged.
  Do not commit, push, or publish.

## Summary

Session 1 established the design direction for BradCooke.com as a personal hub
for Brad's projects and hobbies. The homepage will introduce that purpose in
Brad's voice and offer four tiles: Plants, Bread Pitt, Museum of Dumb Ideas,
and Abbey Root.

Plants replaces Orchids in the homepage and navigation information
architecture. A new `/plants/` landing page will initially point to Orchid
Rescue without moving existing orchid pages. Design decisions are complete
for this session; site implementation remains future work.

## Accomplishments

### Personal hub and homepage introduction

Agreed that BradCooke.com is the personal hub for Brad's projects and hobbies.
Bread Pitt and Abbey Root remain separate sites with their own canonical
content; BradCooke.com links to them.

Approved homepage introduction:

> This is a sample of some of the things I work on in my spare time. I'm always adding new stuff.

### Homepage tiles

Agreed on these four tiles and their exact descriptions, in this order:

| Tile                 | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Plants               | This is where I track the health and wellness of my plants.                               |
| Bread Pitt           | This is where I collect recipes and document my cooking experiments.                      |
| Museum of Dumb Ideas | This is where I put things I find weird and amusing. Feel free to send me suggestions.    |
| Abbey Root           | This is where I document my home lab setup and the technical workings behind my websites. |

Plants leads to `/plants/`, Museum of Dumb Ideas leads to the existing Museum
section, and Bread Pitt and Abbey Root lead to their separate external sites.

### Navigation and route decisions

Agreed navigation:

**About | Plants | Museum | Bread Pitt ↗ | Abbey Root ↗ | Contact**

- Replace Orchids with Plants in navigation and on the homepage.
- Remove Projects from navigation and redirect `/projects/` to the homepage
  (`/`) during implementation.
- Replace the Journal navigation entry with an external Abbey Root link.
- Add Bread Pitt as an external navigation link.
- Use Museum as the navigation label and Museum of Dumb Ideas as the homepage
  tile title.

### Plants hierarchy and URL preservation

Agreed hierarchy:

**BradCooke.com → Plants → Orchid Rescue → individual orchid pages**

- Add `/plants/` as the landing page for plant tracking.
- Initially include only Orchid Rescue as a category on that page.
- Preserve existing `/orchid-rescue/` URLs, including individual orchid pages;
  do not move or rename them as part of the new hierarchy.
- Allow other plant categories to be added when there is real content for
  them. Do not create empty categories in this pass.

### About message

Agreed that the About message should communicate that Brad:

- Is a Navy veteran.
- Works in IT.
- Uses his home lab to document and support his hobbies.
- Has many hobbies.
- Likes weird stuff.

These are the required message points; final About wording was not fixed in
this session.

### Clydeverse and Cooke Holdings

Keep the Clydeverse/Cooke Holdings layer subtle and unexplained. Include
explicit links only where they fit naturally. Introduce deeper connections
later as clues rather than explaining the whole relationship on the personal
hub.

### Deferred orchid work

Explicitly deferred to later sessions:

- Individual orchid narrative rewrites.
- Orchid template changes to show entries newest first.
- Orchid template header photos labeled Original, Current, and Hero.

These are future work, not requirements completed or implemented in Session 1.

## Impact

The design gives BradCooke.com a clear personal purpose and a simple path to
each project or hobby. The Plants hierarchy supports future plant categories
without changing existing orchid URLs. External links preserve content
ownership in Bread Pitt and Abbey Root.

This update provides the design handoff for the next session without changing
the live site or duplicating the decisions across planning documents.

## Validation

- Reviewed repository instructions, `.abbey/project.yml`, `PROJECT_STATUS.md`,
  `NEXT.md`, and the session-updates README before capture.
- Ran `abbey session` in the BradCooke.com repository; the starting working
  tree was clean on `main`, a remote was configured, and no recurring reviews
  were due.
- Created the update with `abbey session capture --title` and `--no-journal`,
  using Abbey's date-prefixed, title-derived filename and standard template.
- Checked the completed update against all requested design decisions and
  verified the homepage introduction and four tile descriptions verbatim.
- Validated the session-update metadata with Abbey's metadata validator.
- Reviewed `git status` and `git diff`, including a no-index diff against
  `/dev/null` so the new, untracked file was included in the review.
- Ran `git diff --check` and the corresponding no-index whitespace check for
  the new file; both passed. The only repository change is this session update.
- No site build was run because no website code, public content, assets, or
  configuration changed. No commit, push, or publication was performed.

## Lessons Learned

Use a broad Plants entry point now while retaining stable Orchid Rescue URLs.
The information architecture can support future hobbies and plant categories
without requiring empty pages or premature content migrations.

Separating design decisions from implementation and orchid storytelling keeps
the next session focused and makes deferred work explicit.

## Next Steps

- Use this update as the Session 2 design handoff. Review the current site and
  define the implementation scope and validation criteria before editing it.
- In a later implementation session, apply the homepage copy and tiles,
  navigation changes, `/plants/` landing page, `/projects/` redirect, and About
  message while preserving existing orchid URLs.
- Keep individual orchid narratives and the newest-first/photo-header
  template changes for later sessions.
- Reconcile planning through the Abbey review workflow when requested; do not
  duplicate broad planning updates as part of this capture.

## Notes

Source: the **Plan Website Redesign** conversation and Brad's explicit Session
1 capture instructions. Captured on 2026-08-30.

This is a design-only session update. `status: pending` and `reviewed: false`
retain Abbey's capture defaults pending the subsequent planning review; they
do not imply that site changes have been implemented.

The repository's journal policy is optional. No journal entry was requested
or created. Commit, push, publication, and post-commit session certification
were intentionally not performed.

The initial `abbey session` invocation encountered a recurring-review error
under the shell's Python 3.7.5. Rerunning with the already installed Homebrew
Python first on the command's PATH succeeded. No toolkit or system
configuration was changed.
