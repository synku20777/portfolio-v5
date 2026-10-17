---
name: new-case-study
description: Scaffold, edit or audit a case study in src/content/case-studies. Use when adding a project, rewriting a study, or checking one for unsupported claims, missing alt text, missing images or empty summary cards.
---

# New or audited case study

Read `AGENTS.md`, `docs/case-study-guide.md` and `docs/case-study-report-sources.md` first. Do not commit or push.

## Add a study

1. Ask for anything missing: project name, Nestor's role, team size, source (report path, repo URL), and what evidence exists (research, tests, metrics). Do not guess.
2. Copy the closest sibling MDX from `src/content/case-studies/`. Use a slug-style file name (`my-project.mdx`).
3. Fill frontmatter per the guide. Pick an unused `order`. Copy a neighbour's `bentoSpan`.
4. Put images in `public/photos/projects/<Project>/` as webp. Reference them as `/photos/projects/...`.
5. Load the `ste-writing` skill (STE-flavored mode) and write the body with it. Use first person, or "we" for team work. Label goals as goals and sample data as illustrative. Run the self-lint before you save.
6. Add a row to `docs/case-study-report-sources.md` with evidence used and limits preserved.

## Audit a study

Check and report, do not silently rewrite facts:

- Each number and outcome claim has a source in the source map.
- Goals are not phrased as results. Sample sizes are present or marked unspecified.
- `constraint`, `keyDecision`, `result` are set and honest.
- Every referenced image exists under `public/`; every `<img>` has descriptive alt text.
- Individual vs team attribution and prototype vs production are explicit.
- No hype words listed in `AGENTS.md`.
- Prose passes the `ste-writing` self-lint: sentences of 20 words or fewer, active voice, no contractions, semicolons, or em dashes.

## Verify

Run `npm run build`. Confirm the route and homepage card exist. Report changed files, checks run, and anything not checked (for example the 390px or dark-mode view).
