# Compressed HTML budget

Every generated HTML body has a **14,000-byte budget for each encoding**. `npm run build` runs `scripts/check-html-budget.mjs` after Astro succeeds. It recursively measures every `.html` file in `dist`, including redirect documents, and reports the route, raw bytes, gzip bytes, Brotli bytes, and status. Missing or empty build output fails the check.

The estimates use Node's standard library: **gzip level 5** and **Brotli quality 3**. Quality 3 reproduced the four measured live Brotli responses during planning; it is an observed approximation, not a guarantee about Vercel's compression settings. Maximum-quality Brotli is not used. The budget covers compressed HTML bodies only, excluding response headers, TLS, and separately requested assets. It does not prove delivery in one TCP flight, and HTTP/3 uses a different transport.

## Measurements and explicit exceptions

Measured on 2026-10-27 with Node 24.20.0. Before values are from the pre-change production build and live Brotli responses supplied in the approved plan. After values are local production build estimates. All 28 HTML files are checked: 25 pass both budgets, and these three studies retain explicit exceptions.

| Route | Before gzip 5 | Before live Brotli | After raw | After gzip 5 | After Brotli 3 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 13,162 | 13,014 | 99,208 | 12,819 | 12,705 |
| `/case-studies/astra/` | 17,114 | 17,534 | 76,946 | 16,239 | 16,538 |
| `/case-studies/firefly/` | 15,311 | 15,532 | 79,695 | 14,441 | 14,612 |
| `/case-studies/aurora-design-system/` | 14,124 | 14,487 | 60,368 | 13,778 | 14,188 |

The three studies preserve their complete long-form content, media, accessible markup, and existing islands. Removing more HTML would require work beyond the approved shared-font, ineffective-script, and decorative-icon reductions. Astra and Firefly remain above both budgets; Aurora passes gzip but still exceeds Brotli by 188 bytes.

The `EXCEPTIONS` object in the checker caps each encoding at the corresponding **after** measurement above. A route fails if either ceiling grows, including Aurora's under-budget gzip ceiling. Unlisted oversized routes fail. Ceilings never increase automatically. After a deliberate reduction, lower each ceiling to the new measurement, and remove the entry when both encodings meet 14,000 bytes. Any proposed increase requires explicit review and approval; do not regenerate ceilings to make a failed build pass.

## Changes and local checks

- Font-face declarations moved unchanged into the external global stylesheet; the font preload and `font-display: swap` remain.
- Removed the ineffective serialized view-transition setup. The inline prepaint theme bootstrap and Astro hydration bootstrap remain.
- Astra and Firefly decorative body icons use one external, hashed SVG sprite via Vite `?no-inline`. Geometry, outer sizing, stroke, and inherited colors remain. No prose, diagrams, screenshots, URLs, or content schema changed.
- Run `node --test scripts/check-html-budget.test.mjs` for boundary, exception, compression, route traversal, and missing-output checks. Run `npm run build` and `git diff --check` before review.

Local validation completed on 2026-10-27:

- Production build, four Node test cases, and `git diff --check` passed. The build enumerated 28 HTML files, including the Aurora redirect.
- Independent read-only review verified all 21 extracted SVG instances against their original geometry and outer styling, unchanged MDX content, unchanged font-face properties, budget logic, final measurements, and exception caps; no findings remained.
- In Chromium, Astra and Firefly decorative icons rendered at 390px and 1280px in light and dark themes. Both enabled-script previews and script-blocked previews passed. The latter used temporary localhost fixtures with `Content-Security-Policy: script-src 'none'`; the dark fixture supplied the root `dark` class without JavaScript. These fixture changes are not production output.
- Jakarta loaded from the external stylesheet; the font preload remained. An isolated Node VM check confirmed the prepaint bootstrap is unchanged (apart from source line endings) and initializes both system themes when local-storage reads throw. This is an initialization check, not a full browser test of every storage-denial behavior.
- All 38 homepage keyboard targets retained their sequence and visible focus at both widths in both themes: skip link, primary navigation, hero actions, motion control, whole project cards, notes, and footer. The homepage and three tracked studies retained one main landmark, one H1, labeled navigation landmarks, and named visible link/button controls. Decorative sprite instances are hidden from assistive technology and are not focusable.

## Deployment validation still required

No deployment is part of this change. After an approved deployment:

1. Request every generated HTML route separately with `Accept-Encoding: br` and `Accept-Encoding: gzip`, with automatic decompression disabled. Record requested route, response status, actual `Content-Encoding`, compressed body bytes, headers, and each redirect hop. Mark delivery failures or a different/missing encoding as unverified, rather than treating them as successful measurements.
2. Compare three equivalent cold mobile Lighthouse runs before and after on the homepage, Astra, Firefly, and Aurora design system. Keep browser version, throttling, location, and cache conditions comparable. Investigate a repeatable loading regression. The supplied planning report recorded Performance 98 and LCP 1.5 seconds; one historical run is not a three-run baseline.

Vercel hosting and negotiated compression remain unchanged. External CSS, hydration strategies, image delivery, and animation behavior remain. Critical CSS extraction, image optimization, and content splitting are outside this change.

References: [supplied Lighthouse report](https://pagespeed.web.dev/analysis/https-nestorskuliks-xyz/udhyjfqfpq?form_factor=mobile), [Vercel compression](https://vercel.com/docs/how-vercel-cdn-works/compression).
