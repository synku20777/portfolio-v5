# Case-study guide

How to write or edit a study in `src/content/case-studies/`. Rules on evidence and voice are in `AGENTS.md`. Study the nearest sibling (for example `aurora.mdx` or `securita.mdx`) and match it.

## Writing

Use the `ste-writing` skill in STE-flavored mode for all study prose, including `description`, `constraint`, `keyDecision`, `result`, `outcomes`, captions, and alt text. In short:

- One idea per sentence. Aim for 20 words or fewer.
- Active voice. Plain verbs ("use", not "leverage").
- No contractions, semicolons, or em dashes.
- One name for one thing. Do not rename a component or a method halfway through.
- Run the self-lint (sentence length, passive voice, nominalization, phrasal verbs) before you save.

STE does not check facts. Use the checklist below for that.

## Frontmatter

Schema: `src/content.config.ts`. Required: `title`, `description`, `category`, `heroImage`.

| Field | Notes |
| --- | --- |
| `role` | What Nestor did, specifically. Shown on the "What I did" card. |
| `client`, `year`, `duration`, `tools` | `client` may be "University project". `tools` is one comma-separated string. |
| `constraint` | One sentence: the limit that shaped the work. |
| `keyDecision` | One sentence: the most consequential choice, with the reason. |
| `result` | One sentence: what changed or was learned. No unsupported outcomes. |
| `outcomes` | Short chips (e.g. "5 think-aloud participants"). Facts only. |
| `tags` | Short labels. |
| `order` | Homepage position, ascending. Check existing values before choosing. |
| `bentoSpan` | Tailwind col-span string. Copy a neighbour's. |
| `themeColor` | `neutral`, `blue`, `violet`, `amber`, `indigo`, `rose`, `emerald`, `teal`. |
| `featured`, `draft`, `comingSoon` | `comingSoon` removes the page and card. `draft` hides in production. |
| `thumbnailImage`, `ogImage`, `homepageSummary` | Optional. |

## Body structure

Not every study needs every section. Prefer this order:

1. **Challenge / response** — two short cards.
2. **Research or context** — what was learned, from whom, how many. State the method honestly.
3. **Decisions** — two to four, each with the alternative and the reason.
4. **Artifacts** — legible screenshots, components, states, before/after. Caption each.
5. **Outcome and limits** — what was achieved, what was only a goal, what remains.
6. **My contribution** — individual vs team, prototype vs production.

## Shared section styles

Keep reusable section styling in `src/layouts/CaseStudyLayout.astro`. Use the named hooks from the existing studies when reusing these layouts:

- `case-process`: numbered process section, with `case-process-steps`, `case-process-step`, `case-process-number`, and `case-process-note` hooks. The connector progresses with scrolling where supported; text remains visible without JavaScript and with reduced motion.
- `case-challenges`: implementation challenges with a lead paragraph and grouped items.
- `case-research`: research content with an unboxed `case-research-aside`; use `case-research-analysis` for a SWOT block and `case-research-media` for supporting images.
- `case-detail-columns`: paired research or goal sections with divided lists and a scroll-driven accent rule.
- `case-outcomes`: outcome section, with `case-outcome-grid`, `case-outcome`, and `case-outcome-summary` hooks.
- `case-showcase`: image or video showcase that follows the page's light/dark surface.

Copy a matching section from Cloud First or UxUnite, including its hooks. Update shared styles in the layout rather than adding page-specific overrides. Hero images fill a square frame using `object-cover`; project color forms a soft shadow behind the image.

Keep only numbered steps inside `case-process-steps`. Place supporting images after that container with `case-process-media`, so the connector cannot cross them.

## Evidence checklist

- [ ] Every number has a source in `case-study-report-sources.md`, or comes from the repo.
- [ ] Goals and targets are labeled as such, never as results.
- [ ] Sample sizes are stated, or stated as unspecified.
- [ ] Team work says "we" and names the split when known.
- [ ] Screenshots with sample data say "illustrative" in the caption.
- [ ] Prototype vs shipped product is explicit.
- [ ] No full report PDFs in `public/`.
- [ ] The source-map row is added or updated.

## Images

- webp, in `public/photos/projects/<Project>/`.
- Original screens beat decorative angled mockups. Crop to what the caption discusses.
- Meaningful alt text describing the content, not "screenshot".
- Check that the image stays readable at 390px width.

## Verify

1. `npm run build`.
2. Open `/case-studies/<slug>/` and the homepage card in light and dark, at 390px and 1280px.
3. Summary cards are all populated.
4. `git diff --check`.
