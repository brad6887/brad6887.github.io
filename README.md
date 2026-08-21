# BradCooke.com

BradCooke.com is an independent Abbey project for personal publishing, project
pages, museum exhibits, hobbies, and Orchid Rescue.

## Ownership

- This repository owns the Astro site and its GitHub Pages deployment.
- Abbey Root owns the shared Abbey toolkit and canonical plant workspaces.
- Plant publishing exports generated Markdown, sanitized images, and provenance
  manifests into the paths declared in `.abbey/project.yml`.

## Build

```bash
abbey site build
```

The same project-owned build runs in GitHub Actions. A push to `main` deploys
the validated `site/dist` artifact through GitHub Pages.

## Plant updates

Run plant maintenance and publication from Abbey Root. The exporter validates
this repository's Abbey identity and BradCooke.com domain before writing.
