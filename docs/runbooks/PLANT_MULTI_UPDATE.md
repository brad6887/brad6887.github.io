# Multi-Plant Website Update

## Purpose

Use this runbook for a reviewed batch of BradCooke.com plant observations,
typically several plants photographed on one date. It also supports several
new photographs for one plant in the same observation.

Use the [single-plant runbook](PLANT_SINGLE_UPDATE.md) for new-plant onboarding,
one-plant observations, or manual corrections.

## Repository Ownership

Abbey Root owns the Abbey plant tooling, canonical workspaces under
`working/plants/`, and the batch worksheet. BradCooke.com owns the generated
plant Markdown, publication manifests, sanitized public images, Astro build,
and GitHub Pages deployment.

Do not edit BradCooke.com plant imports directly. Correct canonical sources in
Abbey Root, then export the affected plants again.

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

Use one observation date and an explicit set of plant slugs as the session
scope. Stop and reconcile either repository before continuing if it has
unrelated changes.

## 1. Caption and Export the Photographs

Caption each photograph with its plant display name. Export original images
with adjacent XMP sidecars into the incoming directory:

```text
IMG_9875.JPG
IMG_9875.xmp
```

Keep every image and XMP sidecar together. Move unrelated photographs to a
separate intake directory so the batch remains explicit.

## 2. Preview and Rename the Exports

Run plant tooling from Abbey Root:

```bash
cd "$ABBEY_REPO"
abbey plant rename-exports "$HOME/incoming/photos" --dry-run
```

Review every proposed plant slug and capture date. Missing sidecars, captions,
capture dates, or destination collisions are blocking. macOS AppleDouble
`._*` files are ignored.

After the complete preview is correct:

```bash
abbey plant rename-exports "$HOME/incoming/photos"
```

Several photographs for one plant and date receive deterministic suffixes:

```text
revolution-2026-08-18-01.jpg
revolution-2026-08-18-01.xmp
revolution-2026-08-18-02.jpg
revolution-2026-08-18-02.xmp
```

## 3. Prepare the Batch Worksheet

Specify the observation date and output path explicitly:

```bash
abbey plant update-batch prepare \
  "$HOME/incoming/photos" \
  --date YYYY-MM-DD \
  --output "working/plant-updates/YYYY-MM-DD.yml"
```

Preparation reports:

- `OK` when photographs were grouped for a plant
- `WARN ... no photos ... skipped` when a plant has no update that day
- `WARN ... history already has an update ... skipped` when that observation
  is already complete
- `FAIL` when a photograph slug has no canonical plant workspace

An unknown slug may indicate a caption error or a plant that still needs
onboarding. Move that photograph aside or complete the single-plant onboarding
workflow. Do not delete source material merely to make preparation pass.

Preparation does not overwrite an existing worksheet. Continue with the
existing file or preserve it under a different name before regenerating.

## 4. Complete and Review the Worksheet

For every included plant:

- write a non-empty `narrative`
- add `care` when applicable
- set `status` only when it changed
- select `current` when more than one photograph is listed

A single listed photograph is selected automatically. Sequence numbers record
capture order, not quality, so current-image selection must remain explicit for
multi-photo observations.

Example:

```yaml
- plant: revolution
  photos:
    - revolution-2026-08-18-01.jpg
    - revolution-2026-08-18-02.jpg
  current: revolution-2026-08-18-01.jpg
  narrative: >-
    Steady recovery. The new leaf continues to grow.
  care: Watered.
  status: null
```

Confirm that the worksheet contains only the intended plant slugs and date.
Validate its YAML and structure before checking canonical workspace state:

```bash
worksheet="working/plant-updates/YYYY-MM-DD.yml"
abbey plant update-batch validate "$worksheet"
```

## 5. Preview and Apply the Batch

Preview the complete canonical update:

```bash
abbey plant update-batch apply \
  "$worksheet" \
  --dry-run
```

Do not continue until every included update reports `OK`. Apply the reviewed
worksheet:

```bash
abbey plant update-batch apply \
  "$worksheet"
```

The command validates the complete batch before writing, copies photographs
into their canonical workspaces, adds the dated history entries, and updates
current-image and status metadata. XMP sidecars remain in the incoming
directory.

Do not remove incoming files until canonical copies, history entries, and
published pages have been verified. Preserve or archive original exports when
they are the authoritative source photographs.

If every update reports `DONE ... update already applied`, do not delete or
recreate canonical files. Continue with plant validation and export. If apply
reports an incomplete or inconsistent existing update, stop and inspect the
named workspace before proceeding.

## 6. Validate the Updated Plants

Populate the plant array from the reviewed worksheet, preserving its order:

```bash
mapfile -t plants < <(
  abbey plant update-batch slugs "$worksheet"
)

printf 'Plants: %s\n' "${plants[*]}"
```

Confirm the printed list, then validate each plant and stop at the first
failure:

```bash
for plant in "${plants[@]}"
do
  abbey plant validate "$plant" || break
done
```

Resolve every `FAIL` before export. Optional species or rescue-date warnings
may represent honest unknown values.

## 7. Export the Batch to BradCooke.com

Still in Abbey Root, export the same explicit slug list:

```bash
abbey plant publish-batch "${plants[@]}"
```

Batch export validates and processes plants serially, stops on the first
failure, and writes generated Markdown, publication manifests, and sanitized
public images to the configured BradCooke.com project. Each plant is staged as
one validated file operation, and the exporter fails closed if the target
project identity, domain, or import paths do not match.

This is a plant export, not a website deployment. Do not run `abbey site
publish` from Abbey Root.

## 8. Build and Verify BradCooke.com

Return to the BradCooke.com repository:

```bash
cd "$BRAD_REPO"
abbey site build
```

Confirm that every intended slug has an exported page and manifest:

```bash
for slug in "${plants[@]}"
do
  test -f "content/plants/$slug.md" || echo "FAIL missing page: $slug"
  test -f "generated/plant-publication/$slug.json" || \
    echo "FAIL missing manifest: $slug"
done
```

Inspect at least one representative page and manifest, plus any plant with
several photographs or a changed public-image extension:

```bash
slug="${plants[0]}"
sed -n '1,180p' "content/plants/$slug.md"
python3 -m json.tool "generated/plant-publication/$slug.json"
```

Each manifest must report `canonical_original_preserved: true`,
`source_hash_unchanged: true`, and `private_metadata_detected: false` for every
derivative. Visually inspect all affected plant pages, especially their current
images and multi-photo history entries.

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

- Abbey Root: batch worksheet, canonical workspaces, and source photographs
- BradCooke.com: generated Markdown, manifests, and public image changes

## 9. Capture, Commit, and Publish

Capture the work in the repository that owns each result. Record the plant
slugs, observation date, validation and export results, BradCooke.com build
result, warnings, and workflow lessons. Keep canonical changes and generated
BradCooke.com imports as separate reviewable commits. Run the normal Abbey
review and end-of-session checks in each repository before committing, and do
not include unrelated changes.

After both commits exist and BradCooke.com is clean, preview deployment from
the BradCooke.com repository:

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
configured branch and starting the GitHub Pages deployment. Verify several
updated live plant pages after the deployment succeeds.

Check the GitHub Actions deployment from the BradCooke.com repository:

```bash
gh run list \
  --repo brad6887/brad6887.github.io \
  --branch main \
  --limit 5

run_id="REPLACE_WITH_RUN_ID"
gh run watch "$run_id" \
  --repo brad6887/brad6887.github.io
```

Finally, verify that a representative live page contains the observation date:

```bash
curl -fsSL \
  https://bradcooke.com/orchid-rescue/rocky-raccoon/ |
  rg "YYYY-MM-DD"
```
