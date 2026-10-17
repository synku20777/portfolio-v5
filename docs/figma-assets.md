# Figma asset library

Reusable images from the Figma file "Portfolio-v2" (page "Finals", file key `TIJWHH4T7iKADIZXIQ4ApV`). Saved to `src/assets/figma-webp/portfolio-v2/` (git ignores this folder; it was moved out of `public/` on 2026-10-17 because Astro ships everything in `public/`). Pulled on 2026-10-17.

## Format

- All files are lossless WebP. Each file was checked against its source image. The alpha channel and all visible pixels are identical.
- WebP sets the hidden color under fully transparent pixels to zero. This does not change how the image looks.
- Files are original resolution, up to 4096 px. The folder totals about 13 MB. Do not use these files as-is in a page. Make a smaller copy for the page (see the next section).

## Using an asset on a page

- Files in `public/` are not optimized by Astro. For a page image, copy the file to `src/assets/` and use `OptimizedImage`, or resize it first with `sharp`.
- Add alt text that describes what the image shows.
- Check that sample text in an image is not presented as real data. Mark such images "illustrative" in the caption.

## Contents

| Folder | File | Figma node | Notes |
| --- | --- | --- | --- |
| `cloud-first/` | `monitor-mockup`, `laptop-events-mockup`, `salesforce-article-page`, `origination-initiative-page`, `information-architecture-map` | Case - Accenture `79:31329` | The article pages are mockups with sample content. The map is the site structure. |
| `artsy/` | `home-screen`, `artwork-detail-screen`, `route-map-screen` | Case - Artsy `79:31253` | 1440 px wide screens. |
| `artsy/` | `user-flow-diagram`, `paper-wireframe-sketch` | Case 2 `79:32284` | Process artifacts. |
| `uxunite/` | `component-library-sheet`, `atoms-and-components-sheet`, `color-tertiary-semantic` | Case 1 `79:31735` | Source for the UxUnite page. `component-library-sheet` is 3926 px wide, about 2.5 times the size of the copy now on the page. |
| `uxunite/` | `atoms-buttons-inputs`, `type-scale-montserrat`, `text-input-states`, `bubble-component`, `checkbox-radio`, `tabs-component`, `tooltip-component`, `menus-component` | Case - CPHUX `79:30507` | One component per image. |
| `uxunite/` | `design-system-bug-off`, `community-signup-screen`, `brand-workshop-whiteboard`, `workshop-screen-share`, `mobile-calendar-page` | Case 1 `79:31735` | Event graphic, product screens, and workshop artifacts. |
| `personal/` | `portrait-bw` | CV - Oneslider `70:8140` | 500 px portrait. |

## Left out on purpose

- Wireframe placeholders (colored boxes labeled "Thumbnail Image") and grey wireframes.
- Low-resolution copies of images that are saved at a higher resolution.
- Photos that look like stock images (a night-time building, a brick building, a colored corridor, a portrait of a man in a hat). The license is unknown.
- Reproductions of artworks (The Scream, a Soviet poster) that are only used as sample content.
- Workshop photos where attendee faces are visible and not blurred. Check consent before use.

## Raw originals (not converted)

Pulled on 2026-10-17 with the Figma REST API, because the connector call limit was reached. Files keep their original format (JPEG or PNG). They are in `src/assets/figma-raw/`, which git ignores and the site does not serve. Each folder has a `manifest.json` that lists the Figma layer that uses each image.

| Folder | Figma file and nodes | Images | Project |
| --- | --- | --- | --- |
| `Main-zmHLsi/` | `Main` (`zmHLsi0OMxjxZdEVdBcpFk`), nodes `353:413`, `545:1065`, `0:1` | 60 | IT-Workshoppen |
| `Design-cAellC/` | `Design` (`cAellCAbSDpMlC9EvOB5Ch`), nodes `1:3`, `217:1017`, `168:4` | 30 | Firefly |

| `Design-JvMwyW/` | `Design` (`JvMwyWXspEiqHEQawTDAvb`), node `295:343` ("Digital Design System" page) | 1 | Design-system documentation |

### Converted copies

All 91 raw images are converted to lossless WebP in `src/assets/figma-webp/` (same folder layout, same file names, `.webp`). Git ignores this folder. Move the files you use into `public/photos/` or `src/assets/` and give them clear names.

- The conversion ran through `agy` on 2026-10-17. It was verified separately: the originals have the same hashes as before, git shows no other change, and all 91 files match their sources.
- "Match" means the same size, the same alpha channel, and the same color on every visible pixel. WebP does not keep the hidden color under fully transparent pixels. This does not change how an image looks.
- Input is 91.4 MB and output is 89.8 MB. The JPEG sources do not get smaller in lossless WebP. For page use, make a smaller lossy or resized copy.

### `Design-JvMwyW/` (Digital Design System page)

The page holds one image fill and is mostly vector layout. The image (`001-Teamember.png`, 1024 px) is an AI-generated sci-fi scene used as sample content in the `Teammember` component. It does not fit the portfolio. Do not use it.

The useful assets are renders of the documentation frames. They are **not saved yet**, because the Figma REST API and the connector both hit their Starter-plan limits (REST `Retry-After` was 399185 s, about 4.6 days from 2026-10-17). Export these as PNG when the limit resets, or export them by hand in Figma:

| Node | Name | Size | Scale |
| --- | --- | --- | --- |
| `369:4688` | Spacers | 1920×1682 | 2× |
| `370:5024` | Grid and breakpoints | 1920×5960 | 1× |
| `369:4733` | Helpers (lists, switch, radio, progress, slider, input) | 1920×1619 | 2× |
| `394:396` | Buttons (all types, states, sizes) | 2463×1660 | 2× |
| `722:3581` | Footer | 1949×417 | 2× |
| `828:6105` | Teammember component set | 770×506 | 2× |
| `396:4145` | Buttons component set | 2084×693 | 2× |
| `369:4641`, `547:3877`, `547:3892`, `657:2900`, `657:2934`, `657:2947`, `657:2927` | Measure line, unordered list, ordered list, switch, radio, progress, slider | small | 2× |

To resume, run `figma-export.js` (it lives in the session scratch folder and is easy to rewrite: `GET /v1/images/:key?ids=…&format=png&scale=…`).

### `Main-zmHLsi/` (IT-Workshoppen)

| Files | What they are | Use |
| --- | --- | --- |
| 001–006, 009, 010, 018, 058, 059 | Office and laptop photos, 1480 px | Good. Stock-style. Check the license. |
| 004, 005, 008, 041, 044–047 | Large photos, 4096 px. File names show Unsplash or Pexels. | Good. Free licenses, but credit and check the terms. |
| 007, 025–033 | IT-Workshoppen logo, shield, owl mascot, and character variants | Good. This is the brand work for the study. 024 is only 117 px wide. |
| 021, 022, 023 | WebAIM contrast checker screens: 2.66:1 (fail), 8.12:1 and 7.16:1 (pass) | Possible before/after evidence. Low resolution. Confirm which palette each screen shows before use. |
| 052–054, 057 | Survey charts and a word cloud from a report, 470–820 px | Low resolution. Source is a report, so check rights. |
| 011–017, 042 | Portraits | Confirm who they are and whether they are stock before use. |
| 035–040 | Stills from a video of one presenter | Real person. Get consent before use. |
| 050, 051, 056 | Sample logos with a "SMASHINGLOGO" watermark | Do not use. |
| 019, 020, 043, 048, 049, 055, 060 | Small crops, an org chart, and a Figma panel | Low value. |

### `Design-cAellC/` (Firefly)

| Files | What they are | Use |
| --- | --- | --- |
| 001–003, 010, 011 | Product renders of a white wall device, 1024 px (010 and 011 have transparent backgrounds) | Good. They look like AI renders. Confirm the origin and say so in the caption. |
| 005–008, 012, 018, 019 | Fireplace rooms, with and without the device, 1024 px | Same note. |
| 004, 009 | Two portraits for personas, 1024 px | They look AI-generated. Confirm, and label as illustrative. |
| 021, 023–030 | Line drawings of the device and installation steps | Good. Own work, readable. |
| 022 | Firefly logo, 338 px | Small. Find the vector. |
| 013–017, 020 | Screenshots of Figma plugins and a font pairing page. 020 is nearly blank. | Do not use. |

## Not yet pulled

The Figma tool returns at most 20 images per node. These nodes had more:

- Case 1 `79:31735`, Case 2 `79:32284`, CPHUX title slide `79:30507`, Artsy slide 2 `79:31278`. Only the first 20 images of each came through. Sections can be fetched one at a time.
- SVG icons and logos were not saved. The tool lists them separately.
