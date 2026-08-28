# Single Plant Website Update

## Purpose

Use this runbook to create or update one BradCooke.com plant profile. The
workflow starts and finishes in the BradCooke.com project, but canonical plant
work remains in Abbey Root.

Use the [multi-plant runbook](PLANT_MULTI_UPDATE.md) when one observation date
includes more than one plant or when one plant has several new photographs.

## Repository Ownership

Abbey Root owns:

- the Abbey plant tooling
- canonical plant workspaces under `working/plants/<slug>/`
- original plant photographs and XMP sidecars copied into those workspaces
- plant validation and export

BradCooke.com owns:

- generated plant Markdown under `content/plants/`
- publication manifests under `generated/plant-publication/`
- sanitized public images under `site/public/images/plants/`
- the Astro build and GitHub Pages deployment

Do not edit BradCooke.com plant imports directly. Correct their canonical
sources in Abbey Root and export them again.

> **Publishing boundary:** `abbey site publish` publishes the active Abbey
> project. Run it from BradCooke.com to publish `bradcooke.com`. Running it from
> Abbey Root publishes `abbeyroot.com` and is not part of this workflow.

## Start the Session

Begin in BradCooke.com and confirm both repositories are clean:

```bash
BRAD_REPO="$HOME/git/brad6887.github.io"
ABBEY_REPO="$HOME/git/abbey-root"

cd "$BRAD_REPO"
git pull
abbey session
git status
git -C "$ABBEY_REPO" status
```

Keep one plant and one coherent observation or correction as the session
objective. Stop and reconcile either repository before continuing if it has
unrelated changes.

## Update an Existing Plant

### 1. Prepare the Photograph

Caption the photograph with the plant's display name and export the original
image with its adjacent XMP sidecar:

```text
IMG_9896.JPG
IMG_9896.xmp
```

Preview the metadata-derived rename from Abbey Root:

```bash
cd "$ABBEY_REPO"
abbey plant rename-exports "$HOME/incoming/photos" --dry-run
```

The proposed slug and capture date must match the intended plant and
observation date. Correct the XMP description if necessary, then repeat the
preview. Apply the rename only after the complete preview is correct:

```bash
abbey plant rename-exports "$HOME/incoming/photos"
```

Keep each photograph and XMP sidecar together. Do not remove the incoming
originals until the canonical copies and published derivatives have been
verified.

### 2. Preview and Apply the Observation

From Abbey Root, preview the canonical update:

```bash
abbey plant update <slug> \
  --photo "$HOME/incoming/photos/<slug>-YYYY-MM-DD.jpg" \
  --narrative "Current condition and visible changes." \
  --care "Watered." \
  --status thriving \
  --date YYYY-MM-DD \
  --dry-run
```

`--care` and `--status` are optional. Review the preview. To actually apply the
update, repeat the same command without `--dry-run`:

```bash
abbey plant update <slug> \
  --photo "$HOME/incoming/photos/<slug>-YYYY-MM-DD.jpg" \
  --narrative "Current condition and visible changes." \
  --care "Watered." \
  --status thriving \
  --date YYYY-MM-DD
```

The command copies the photograph into the canonical workspace, appends a
dated history entry, selects the new current photograph, and updates structured
status metadata. It rejects a second observation for the same date.

### 3. Validate the Canonical Workspace

```bash
abbey plant validate <slug>
```

Resolve every `FAIL` before export. Optional-field warnings may represent an
honest unknown value and do not need invented facts.

### 4. Export the Plant to BradCooke.com

Still in Abbey Root, run the explicit plant export:

```bash
abbey plant publish <slug>
```

The command validates the canonical workspace, generates the plant Markdown
and manifest, creates sanitized public image derivatives, and writes them to
the BradCooke.com import paths declared by the configured `exports.plants`
target. It fails closed if the target project identity, domain, or import paths
do not match.

This is a plant export, not a website deployment. Do not run `abbey site
publish` from Abbey Root.

## Create a New Plant

Use this section when `working/plants/<slug>/` does not exist.

### 1. Rename and Verify the Initial Photograph

Follow **Prepare the Photograph** above. Confirm that the proposed slug is the
plant's final slug before applying the rename.

### 2. Create the Canonical Workspace

From Abbey Root:

```bash
abbey plant new <slug> \
  --name "Plant Name" \
  --type orchid \
  --status recovering \
  --date YYYY-MM-DD \
  --photo "$HOME/incoming/photos/<slug>-YYYY-MM-DD.jpg"
```

The command refuses to overwrite an existing workspace, imports the initial
photograph and matching sidecar, assigns the first image to the hero and
current roles, creates the Plant Model documents, and validates the result.

### 3. Complete the Plant Model

Complete verified facts in:

```text
working/plants/<slug>/facts.yaml
```

Use `null` for unknown facts. Do not infer a species or provenance that the tag
or direct observation does not establish.

Replace all scaffold content with plant-specific material:

- `inventory.md` — current leaves, roots, flowers, potting, and concerns
- `history.md` — acquisition event, observations, photographs, and care
- `story.md` — concise public narrative grounded in the history
- `photo-metadata.md` — filenames, dates, descriptions, sources, and corrections

Check for stale scaffold markers:

```bash
if rg -n 'TODO|Entry Template|example\.jpg|Describe the event' \
  "working/plants/<slug>"
then
  echo "FAIL placeholder content remains"
else
  echo "PASS no placeholder content remains"
fi
```

Then validate and export the plant using the preceding sections.

## Make a Manual Correction

Use a manual edit for a correction to canonical facts or existing prose, not
for a new observation.

- Edit structured facts in `working/plants/<slug>/facts.yaml`.
- Edit existing dated prose in `working/plants/<slug>/history.md`.
- Preserve the existing YAML and dated-entry structures.
- Use `null` when a fact is unknown.
- Do not duplicate the correction in BradCooke.com's generated imports.

When correcting an observation date, review every affected canonical reference:

1. Rename dated files under `working/plants/<slug>/photos/` when needed.
2. Correct the dated heading and photo references in `history.md`.
3. Update `photos.current` in `facts.yaml` if it names a renamed image.
4. Update `status.updated` only if this remains the latest observation.
5. Search the workspace for the old date and filename.

```bash
rg 'old-date|old-photo-name' "working/plants/<slug>"
abbey plant validate <slug>
abbey plant publish <slug>
```

## Build and Verify BradCooke.com

Return to the BradCooke.com repository:

```bash
cd "$BRAD_REPO"
abbey site build
```

Inspect the exported page and publication manifest:

```bash
slug="<slug>"
sed -n '1,180p' "content/plants/$slug.md"
python3 -m json.tool "generated/plant-publication/$slug.json"
```

The manifest must report `canonical_original_preserved: true`,
`source_hash_unchanged: true`, and `private_metadata_detected: false` for each
derivative. Visually inspect the affected page, especially the current image,
history entry, and any public image whose extension changed.

Review both repository changes:

```bash
git -C "$ABBEY_REPO" status
git -C "$ABBEY_REPO" diff
git -C "$ABBEY_REPO" diff --check

git status
git diff
git diff --check
```

Expected ownership is:

- Abbey Root: canonical workspace and source photograph changes
- BradCooke.com: generated Markdown, manifest, and public image changes

## Capture, Commit, and Publish

Capture the work in the repository that owns each result. Keep canonical plant
changes and BradCooke.com generated imports as separate reviewable commits.
Run the normal Abbey review and end-of-session checks in each repository before
committing. Do not include unrelated changes.

After both commits exist and the BradCooke.com working tree is clean, preview
the project-owned deployment from BradCooke.com:

```bash
cd "$BRAD_REPO"
abbey site publish --dry-run
```

Confirm that the resolved project is `BradCooke.com`, the domain is
`bradcooke.com`, and the target is `origin:main`. When publication is explicitly
approved, run:

```bash
abbey site publish
```

The command rebuilds and validates the site, then asks before pushing the
configured branch and starting the GitHub Pages deployment. List the recent
GitHub Actions runs and watch the deployment run:

```bash
gh run list \
  --repo brad6887/brad6887.github.io \
  --branch main \
  --limit 5

run_id="REPLACE_WITH_RUN_ID"
gh run watch "$run_id" \
  --repo brad6887/brad6887.github.io
```

After the deployment succeeds, verify that the live plant page contains the
observation date:

```bash
curl -fsSL \
  "https://bradcooke.com/orchid-rescue/<slug>/" |
  rg "YYYY-MM-DD"
```
