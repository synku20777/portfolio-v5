# Case-study image placements

Reviewed on 2026-10-17. Paths below refer to `src/assets/figma-webp/portfolio-v2/` unless stated otherwise.

## Used in the current pages

| Study | Asset | Placement and reason |
| --- | --- | --- |
| UxUnite | `uxunite/text-input-states.webp` | After Design Process. It shows the state details behind the UI kit work. |
| UxUnite | `uxunite/type-scale-montserrat.webp` | After Typography System. It connects the written scale to the actual text roles. |
| UxUnite | `uxunite/color-tertiary-semantic.webp` | After Accessibility Approach. It lets the reader inspect the recorded palette ratios. |
| Artsy | `artsy/user-flow-diagram.webp` | After Design Process. It exposes the screen relationships behind the proposed experience. |
| Artsy | `artsy/route-map-screen.webp` | Beside the interactive prototype discussion. It makes the route interface readable outside the angled collage. |
| Cloud First | `cloud-first/information-architecture-map.webp` | After Information Architecture and Product Goals. It replaces the smaller copy in the final showcase. |
| Cloud First | `cloud-first/salesforce-article-page.webp` | In Visual Showcase. It shows the client article layout with an illustrative-content caption. |
| Cloud First | `cloud-first/origination-initiative-page.webp` | In Visual Showcase. It shows event details and materials together, with an illustrative-content caption. |

Each image has a smaller responsive copy, dimensions, lazy loading, alt text, and a caption.
Nestor requested removal of all full-size image links in the next review. Those links are now absent from the case studies.
Transparent diagrams have a white background in the page copies so their black connectors remain visible in dark mode.
The source files stay intact. No report PDFs or new metrics were added.

The Cloud First showcase now starts with the panoramic portal overview across the page.
Below it, a narrow wireframe sits beside two stacked article screens. The layout keeps all four images uncropped.
The UxUnite homepage preview now uses the existing mobile-screen trio (`public/photos/projects/UxUnite/3.webp`).

## Useful candidates for a later pass

| Asset | Possible use | What to resolve first |
| --- | --- | --- |
| `artsy/paper-wireframe-sketch.webp` | Beside Low-Fidelity Wireframes, before the flow diagram. The sketch could show early layout options. | The source is sideways. Prepare an upright page copy. Confirm which parts are Nestor's work before assigning individual credit. |
| `artsy/home-screen.webp` | Beside Personalized Tours. A straight screen would make the search and tour entry points easier to read. | Use it as a replacement for a broad mockup rather than another gallery item. Label the content illustrative. |
| `artsy/artwork-detail-screen.webp` | Beside the discussion of deeper artwork stories. | Confirm artwork reproduction rights. Label the screen content illustrative. |
| `uxunite/atoms-buttons-inputs.webp` | Beside UI Kit Development if the study expands on component rules. | The input state sheet already covers this part of the story. Add it only with a distinct decision to explain. |
| `uxunite/checkbox-radio.webp`, `tabs-component.webp`, `tooltip-component.webp`, `menus-component.webp`, `bubble-component.webp` | Focused examples beside a component decision. | Identify the actual decision or revision. Avoid a second component catalog. |
| `uxunite/component-library-sheet.webp`, `atoms-and-components-sheet.webp` | A sharper replacement for the final overview sheet. | Use a focused crop or section when discussing a specific rule. The page already has an overview. |
| `uxunite/brand-workshop-whiteboard.webp` | A higher-resolution replacement for the existing workshop image. | It repeats the existing image. No additional placement is needed. |
| `uxunite/mobile-calendar-page.webp` | A readable calendar example beside a specific product rule. | Confirm what rule it demonstrates. The final showcase already includes the calendar screen. |
| `uxunite/design-system-bug-off.webp`, `workshop-screen-share.webp` | Evidence of a workshop or a system review, if that is what they document. | Ask Nestor what the event was and what he contributed. Confirm photo consent before publication. |
| `uxunite/community-signup-screen.webp` | An example of the system in a signup flow. | Confirm the rights and consent for the audience photograph inside the screen. |
| `cloud-first/laptop-events-mockup.webp`, `monitor-mockup.webp` | An overview image if the current hero changes. | The existing hero and showcase already provide product context. The new straight screens add more detail. |

## Additional leads outside this public folder

The library guide lists converted assets in ignored `src/assets/figma-webp/`. This pass did not add those files.

- IT-Workshoppen: logo and owl variants could explain the identity choices. Match each version to the report first.
- IT-Workshoppen: contrast checker screens could support a palette comparison. Confirm which screen belongs to each palette.
- Firefly: installation drawings could connect the separate owner needs to the manual. Check the actual sequence before use.
- Firefly: device and room renders need an origin check and an illustrative-content caption before use.

## Checks and limits

The build and file checks appear in the chat report. Source images and smaller exports were inspected locally.
Browser access was blocked by policy in this session. Page screenshots at 390px and 1280px remain unchecked in both themes.
