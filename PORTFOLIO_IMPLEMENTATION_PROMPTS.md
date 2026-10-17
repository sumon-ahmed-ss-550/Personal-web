# Sumon Ahmed Portfolio — Sequential Modernization Implementation Prompts

**Project:** Existing Next.js personal portfolio  
**Master plan:** `PORTFOLIO_MODERNIZATION_AUDIT.md`  
**Recommended creative direction:** **The Obsidian Craft** — a refined, distinctive, dark-first technical portfolio with crisp typography, coherent design tokens, purposeful micro-interactions, and carefully controlled motion.  
**Execution mode:** Autonomous, sequential implementation with verification gates.  
**Language constraint:** Use the project's existing JavaScript/JSX conventions. Do **not** convert the project to TypeScript or introduce `.ts`/`.tsx` files.

---

## READ THIS FIRST — Agent Execution Contract

You are receiving this file as the complete implementation instruction. Read the **entire file** and the project's `PORTFOLIO_MODERNIZATION_AUDIT.md` before editing anything. Then execute Prompt 1, Prompt 2, Prompt 3, and so on in order. Do not ask the user to repeat these instructions, and do not wait for separate approval between prompts.

### Non-negotiable sequencing rules

1. **Never start prompt N until prompt N-1 and every earlier prompt have been verified as complete.** Beginning with Prompt 2, first re-verify the completed work from all preceding prompts. If any old task has regressed or is incomplete, fix it and rerun its relevant checks before starting the current prompt.
2. Finish the current prompt fully before advancing. Do not skip a task just because it is difficult, consumes time, or produces errors.
3. When a problem appears, diagnose it, inspect the actual code and logs, create a minimal reproduction when useful, consult relevant official documentation or reliable browser references, fix the root cause, and repeat the failed test. Do not simply record a failure and move on.
4. Do not hide failures with lint disables, ignored tests, `any`-style shortcuts, blanket exception handlers, fake success states, or weakened project configuration. Fix the underlying issue.
5. After each prompt, run the relevant checks and the project's available lint/build/test commands. If a test exposes a regression from an earlier prompt, repair it before advancing.
6. Maintain `PORTFOLIO_IMPLEMENTATION_LOG.md` at the project root as a concise durable log of the baseline, completed prompt numbers, files changed, commands/results, resolved blockers, and anything that genuinely requires an external user action. Update it after every prompt. **Do not modify this master prompt file.**
7. Preserve pre-existing user changes. At the beginning, inspect `git status` and relevant diffs. Never discard, reset, overwrite, or reformat unrelated user work. Do not use destructive Git commands.
8. Keep changes scoped to the current prompt. Do not perform later prompts early just because a shared file is open. Small supporting changes needed to make the current prompt correct are allowed.
9. Do not claim that a test, live service, URL, email, or browser behavior passed unless you actually verified it. Record exact commands and results.
10. Do not stop at the first solvable problem. Continue troubleshooting until the current code task passes its acceptance checks.

### Missing content, credentials, or external services

- **Never fabricate** a CV, career history, company, qualification, testimonial, project outcome, client, statistic, project URL, social profile, domain, API key, or deployment result.
- Inspect the repository, Git remotes, README files, current links, local assets, and accessible live URLs to discover authentic information before making content decisions.
- If a factual asset or URL cannot be verified, do not publish a fake link or make a broken button. Gracefully omit the unavailable action/entry or provide a clearly designed fallback. Log exactly what information is missing and continue other implementation work.
- If a real external credential is unavailable (for example, an email provider API key), complete the integration code, validation, error handling, and mock/local tests without the credential. Never report live delivery as verified. Document the exact environment variables needed for activation and continue to the next prompt once the code-level implementation and available tests pass.
- If a service is unreachable, use reliable official documentation and local tests/mocks where appropriate. Do not use a fake success response in production code.
- Do not expose secrets in the browser, source control, logs, screenshots, or the progress report. Never paste real secret values into generated files.
- Never bypass security, browser protections, consent requirements, production safeguards, or destructive-operation warnings to force a test to pass.

### Project-wide technical rules

- First verify the live repository state. The audit reports Next.js `16.2.5`, React `19.2.4`, Tailwind CSS v4, Motion/Framer Motion v12, GSAP, and Lenis, but these versions and the current files must be checked directly before relying on them.
- Use the existing App Router and JavaScript/JSX conventions. Preserve existing working behavior unless this file explicitly replaces it.
- Keep Server Components wherever client-side state, browser APIs, or animation are not needed. Keep Client Components narrow.
- Prefer the already installed libraries and native CSS when they can do the job well. Add or remove dependencies only when there is a clear technical reason, after checking version compatibility and official documentation.
- Use Motion for React for ordinary React UI transitions, gestures, and layout transitions; use CSS for simple hover/focus/color effects; reserve GSAP for genuinely complex coordinated timelines; retain Lenis only if it adds clear value and is integrated cleanly. Avoid overlapping animation engines and duplicate animation-frame loops.
- All essential content and controls must work with keyboard navigation, touch input, and reduced-motion settings. A custom visual effect must never suppress the system cursor, block text selection, or be required to use the site.
- Prefer animations of `transform` and `opacity` when appropriate. Avoid expensive scroll handlers, unnecessary `will-change`, and heavy visual effects without measured benefit.
- Every external link must have a real destination. Remove `href="#"` placeholders from actionable UI.
- Keep the UI polished and deliberate, but do not add every possible effect just because it is possible. Quality, clarity, accessibility, loading speed, and maintainability take priority over visual noise.
- Use verified content only. In particular, do not add TypeScript to the listed skills unless evidence from the user's authentic source confirms it; this codebase and user requirements specify JavaScript/JSX.
- Treat any `[x]` checkmarks inside the audit roadmap as an inconsistency, not proof that a task has already been implemented. Verify actual code and Git state independently.
- Never assume the example hostname `sumon.dev`, any sample project names, any example job history, or any audit-proposed metrics are real. Use a canonical domain only when verified from the existing deployment/project configuration or another reliable source.

### Official references to consult as needed

Check current documentation when a version-specific or integration issue arises; do not rely on an example if it conflicts with installed versions.

- Next.js Image: https://nextjs.org/docs/app/api-reference/components/image
- Next.js Metadata / Open Graph: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js Open Graph file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next.js robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Motion for React accessibility: https://motion.dev/docs/react-accessibility
- Motion `AnimatePresence`: https://motion.dev/docs/react-animate-presence
- GSAP with React: https://gsap.com/resources/React/
- Lenis official repository/docs: https://github.com/darkroomengineering/lenis
- Resend with Next.js: https://resend.com/nextjs
- Animation performance guidance: https://web.dev/articles/animations-guide
- Core Web Vitals: https://web.dev/articles/defining-core-web-vitals-thresholds/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

---

# Prompt 1 of 16 — Establish the Baseline and Repair Existing Code-Quality Defects

**Goal:** Establish an accurate baseline and fix the confirmed low-level correctness/lifecycle issues before visual redesign begins. This prompt does not require verification of earlier prompts because there are none.

### Work

1. Inspect `git status`, current diffs, `package.json`, lockfile, app configuration, `src/app/layout.jsx`, `src/app/page.jsx`, and all current component files. Preserve existing user edits.
2. Run the existing lint, build, and test commands that are available without installing or changing dependencies. Record exact baseline failures in `PORTFOLIO_IMPLEMENTATION_LOG.md`.
3. Fix existing lint errors and warnings when the fix is clear and within scope. Fix root causes rather than disabling rules or weakening the ESLint configuration.
4. Repair confirmed defects such as duplicate/overwritten React refs, incorrect effect cleanup/ticker removal, unused variables/imports, invalid utility class names, and unsafe or invalid JSX entities where they still exist in the actual code.
5. Verify that GSAP/Lenis listeners, animations, timers, observers, and event handlers are cleaned up correctly on unmount and under React Strict Mode. Do not perform the full scrolling-library redesign yet.
6. Do not alter the site's visual direction beyond the minimum needed to fix the above issues. Do not invent links or professional content. Do not turn a broken CV link into a photo download.

### Acceptance gate

- Lint passes with no errors; fix warnings that can be resolved safely without broad refactors.
- The production build succeeds.
- No new browser-console errors are introduced in the accessible local page.
- Lifecycle/cleanup code has been reviewed and corrected where defects are confirmed.
- Pre-existing unrelated user changes remain intact.
- Record changed files, commands, results, and any inherited blockers in the implementation log.

**Do not start Prompt 2 until every acceptance item above is satisfied.**

---

# Prompt 2 of 16 — Establish the Design Token and Visual Foundation

**Pre-check:** Re-verify Prompt 1 and all its acceptance gates. Repair any regression before making new changes.

**Goal:** Implement the shared foundation for the selected “Obsidian Craft” visual direction.

### Work

1. Inspect `src/app/globals.css`, existing Tailwind v4 configuration, and the current light/dark theme implementation.
2. Establish semantic tokens for backgrounds, surfaces, cards, primary text, muted text, borders, accent colors, focus rings, shadows, radii, spacing, content widths, and motion timing/easing where appropriate.
3. Map Tailwind CSS v4 tokens using syntax confirmed against the installed version. Avoid competing definitions or variables that resolve to themselves.
4. Define a coherent dark-first obsidian palette and a readable light theme. Preserve the theme-switching capability.
5. Replace scattered hardcoded theme colors with semantic tokens in shared/global styles and the components most clearly affected. Do not redesign each section yet; section-specific redesign comes later.
6. Define a consistent typographic scale and responsive content container/grid conventions. Use current project fonts unless a font change is justified and compatible with the existing loading setup.
7. Ensure all theme text and interactive states retain sufficient contrast and visible focus treatment.

### Acceptance gate

- Theme token values resolve correctly in both light and dark modes.
- Existing page layout still builds and renders.
- There are no Tailwind v4 or CSS build warnings caused by invalid token declarations.
- Global tokens are the single source of truth for shared colors; document any remaining intentional exceptions.
- Lint and build pass; Prompt 1 checks remain green.

**Do not start Prompt 3 until this prompt is complete and verified.**

---

# Prompt 3 of 16 — Fix Global Accessibility and Reduced-Motion Behavior

**Pre-check:** Re-verify Prompts 1–2. Fix earlier regressions first.

**Goal:** Make accessibility foundational rather than an afterthought.

### Work

1. Remove any global CSS rule that hides the native pointer, including `cursor: none !important`. The user's system cursor and normal text selection must remain available.
2. Add a keyboard-accessible “Skip to main content” link and a clear main landmark with a stable target ID.
3. Define consistent `:focus-visible` styles and verify interactive controls remain visibly focused in both themes.
4. Audit semantic landmarks and heading levels. Add accessible names to icon-only controls and hide purely decorative SVGs from assistive technologies where appropriate.
5. Establish a global reduced-motion strategy respecting `prefers-reduced-motion`. For Motion, use the API compatible with the installed package; disable/reduce large transforms, parallax, inertia, and continuous decorative loops while preserving understandable state changes.
6. Ensure hover-only information is also available on focus or touch. Make dialogs, drawers, and keyboard interactions accessible when those components are redesigned in later prompts.
7. Do not add accessibility claims that have not been tested.

### Acceptance gate

- Keyboard-only navigation can locate and operate the current essential controls.
- Native cursor and text selection work.
- Focus indicators are visible.
- Reduced-motion mode removes or substantially reduces non-essential movement and infinite loops.
- No accessibility regression is introduced in the current layout.
- Lint/build pass and earlier prompts remain verified.

**Do not start Prompt 4 until this prompt is complete and verified.**

---

# Prompt 4 of 16 — Consolidate the Animation and Smooth-Scrolling Architecture

**Pre-check:** Re-verify Prompts 1–3. Fix previous failures before proceeding.

**Goal:** Establish one understandable motion system without redundant animation loops or broken cleanup.

### Work

1. Inspect the actually installed versions and imports of Motion/Framer Motion, GSAP, Lenis, and `@studio-freight/lenis`.
2. Use CSS for simple hover, focus, border, color, and decorative effects; use the installed Motion/Framer Motion package for React UI state, gesture, and layout transitions; reserve GSAP for a real need for complex coordinated timelines.
3. If Lenis remains valuable, migrate to its currently documented React integration (`lenis/react`) using the installed compatible package. Remove the deprecated duplicate only after confirming the active imports and lockfile dependencies. If native scrolling is the better fit for this page, simplify the architecture instead of retaining Lenis without a clear benefit.
4. If GSAP is retained, use the official React cleanup mechanism where appropriate, or an equivalent correctly scoped cleanup compatible with the installed version. Do not add `@gsap/react` without checking whether it is needed and version-compatible.
5. Prevent duplicate `requestAnimationFrame` loops, duplicate scroll listeners, stale callbacks, and animation instances surviving unmount.
6. Preserve native anchor navigation, browser history, keyboard scrolling, and reduced-motion behavior. Confirm smooth scrolling does not make anchor links or mobile navigation unreliable.
7. Avoid adding Three.js, WebGL, Spline, or other heavy runtime libraries for decorative effects. Add none unless a specific, measured need is established; this plan does not require 3D.

### Acceptance gate

- There is a documented, clear allocation of responsibilities for CSS, Motion, GSAP, and Lenis/native scroll.
- No duplicate Lenis package is retained without a verified reason.
- All effects clean up on unmount and behave under Strict Mode.
- Anchor navigation, scroll-to-top, keyboard scrolling, and reduced motion still work.
- Lockfile/package changes are intentional and build successfully.
- Lint/build and prior prompt checks pass.

**Do not start Prompt 5 until this prompt is complete and verified.**

---

# Prompt 5 of 16 — Rebuild the Navbar, Mobile Navigation, and Theme Customizer

**Pre-check:** Re-verify Prompts 1–4, including animation cleanup and reduced motion.

**Goal:** Make the global navigation polished, dependable, and responsive.

### Work

1. Redesign the header as a refined, sticky navigation surface aligned with the new token system.
2. Fix responsive breakpoints based on actual viewport testing. Do not show an oversized mobile menu on ordinary laptop widths or force desktop links into cramped layouts.
3. Keep active-section indication subtle and consistent. Ensure section IDs match actual rendered sections.
4. Rebuild the mobile drawer with correct accessible button labels, Escape handling, focus behavior, and background scroll management. Restore scroll state when the drawer closes; do not trap the visitor in a broken overlay.
5. Make theme switching reliable without hydration errors or flashing where reasonably possible. Persist theme selection and initialize it safely using an approach compatible with the existing Next.js architecture.
6. Make accent-color customization update all semantic tokens that depend on the accent. Persist the selected preset, validate custom color input, and ensure readable contrast. Do not trust arbitrary user-entered CSS strings.
7. Include a resume action only if a genuine resume PDF exists and is verified. If missing, do not link to a profile photo or nonexistent path; record the missing asset in the log and gracefully omit or disable the action.

### Acceptance gate

- Desktop, tablet, and mobile navigation work at representative widths.
- Every nav link reaches an actual section.
- Drawer behavior works via mouse, touch, keyboard, and Escape.
- Theme and accent choices persist after reload without console/hydration errors.
- No dead links or invalid CV downloads remain in the navbar.
- Lint/build and all preceding tests pass.

**Do not start Prompt 6 until this prompt is complete and verified.**

---

# Prompt 6 of 16 — Redesign the Hero as a Distinctive Premium Introduction

**Pre-check:** Re-verify Prompts 1–5. Repair previous work if needed.

**Goal:** Deliver the strongest first impression while communicating a truthful, clear professional value proposition.

### Work

1. Redesign the Hero using the approved “Obsidian Craft” direction: strong typographic hierarchy, deliberate whitespace, a restrained ambient accent glow, clean CTAs, and a polished portrait/visual composition.
2. Use only a verified existing portrait/asset. Use the Next.js `Image` component appropriately for local images, with real dimensions or `fill` plus an accurate `sizes` value. Keep a graceful fallback if an asset cannot be loaded.
3. Use professional messaging grounded in the current repository and verified user-provided facts. Do not invent a years-of-experience badge, employment claim, success metric, or availability status. If availability cannot be confirmed, use a neutral CTA rather than stating “Available for work.”
4. Provide a primary action leading to projects and a secondary action leading to contact. Add a copy-email action only using the verified email already present in the project, with accessible success/failure feedback and a fallback when clipboard access is unavailable.
5. Show only verified, working social links. Do not render social icons linked to `#` or guessed handles.
6. Add a refined initial reveal and restrained ambient movement with stable cleanup and reduced-motion handling. Do not delay essential content behind a loader.

### Acceptance gate

- Hero hierarchy is clear on mobile, tablet, and desktop.
- All CTAs and social actions have valid behavior.
- No invented claims or placeholder destinations are visible.
- Animations are smooth, short, interruptible where appropriate, and reduced when requested.
- No image errors, layout shifts caused by missing image dimensions, or console errors.
- Lint/build and all earlier prompt checks pass.

**Do not start Prompt 7 until this prompt is complete and verified.**

---

# Prompt 7 of 16 — Redesign the About Section and Professional Summary

**Pre-check:** Re-verify Prompts 1–6.

**Goal:** Present an authentic, concise, polished introduction with a useful information hierarchy.

### Work

1. Replace awkward offset/fixed-width layouts with a deliberate responsive grid or bento-style composition that follows the shared design tokens.
2. Introduce a compact “Brief / More detail” switch only if two truthful, distinct versions can be created from existing verified bio content. It must be accessible and must not hide critical information from assistive technology.
3. Use existing, confirmed contact/location/profile information only when still accurate and already supported by the project. Never expose sensitive personal details beyond those intentionally published on the current site.
4. Use compact information cards only when the content adds value; do not create artificial metrics just to fill the grid.
5. Add subtle reveal and hover motion that does not distract from reading.

### Acceptance gate

- The section is visually balanced at mobile/tablet/desktop widths with no overflow.
- All biography claims are traceable to existing verified content.
- Any toggle works with keyboard and screen readers and respects reduced motion.
- Tokenized theme colors are used; no accidental hardcoded indigo remains.
- Lint/build and earlier checks pass.

**Do not start Prompt 8 until this prompt is complete and verified.**

---

# Prompt 8 of 16 — Make the Skills Section Useful, Scannable, and Accurate

**Pre-check:** Re-verify Prompts 1–7.

**Goal:** Replace or improve the infinite marquee so visitors can inspect real skills comfortably.

### Work

1. Inventory the actual technologies in the current Skills section and relevant project code. Include only skills supported by the existing content or reliable repository evidence.
2. Do not add TypeScript, tools, frameworks, years-of-practice labels, or proficiency percentages without evidence. A technology appearing in a dependency file does not automatically prove professional proficiency.
3. Create a clear responsive presentation grouped into relevant categories, such as Frontend, Backend/Data, and Tools, only where those categories reflect verified skills.
4. Use reliable local icons or the existing icon system where possible. Avoid a fragile runtime dependency on a “latest” external icon CDN for every badge. Provide readable text labels when an icon fails.
5. If an animated marquee is retained as a secondary decorative element, make it pause on interaction, avoid duplicated screen-reader announcements, and disable continuous movement under reduced motion. Do not make the marquee the only way to read the skills.
6. Use subtle reveal transitions and consistent spacing. Avoid unsupported proficiency bars or fake percentages.

### Acceptance gate

- Every listed skill is supported by real project/user content.
- Categories are navigable and readable without hover.
- Icon failures do not remove the skill name.
- Continuous movement is absent or reduced when requested.
- Responsive layout, lint, build, and previous prompt checks pass.

**Do not start Prompt 9 until this prompt is complete and verified.**

---

# Prompt 9 of 16 — Rebuild Project Data and Premium Project Cards

**Pre-check:** Re-verify Prompts 1–8.

**Goal:** Make the project showcase visually strong and factually trustworthy.

### Work

1. Inspect the current project list, repository history/remotes, README files, local assets, and every candidate demo/source URL. Verify each link before displaying it.
2. Separate project data from visual components using a simple maintainable JavaScript data structure; do not introduce a CMS or database without a demonstrated need.
3. Redesign the cards with a consistent project image/mockup, title, concise description, verified technology tags, and clear actions. Use a responsive grid and polished but restrained hover states.
4. Replace `href="#"` and broken placeholder actions. Render Live Demo and GitHub actions only for verified URLs. Do not invent projects, repositories, screenshots, architecture, results, or customer metrics.
5. If current card content is demonstrably mock/demo data rather than a real completed project, do not present it as a shipped client product. Either classify it accurately based on evidence or omit it until reliable information exists.
6. Add explicit Next.js Image dimensions or appropriate `fill`/`sizes` values and useful alternative text. Do not use a screenshot of a different project as a substitute.
7. Keep links secure and accessible, including valid external-link behavior.

### Acceptance gate

- Every visible project is grounded in verifiable data.
- No action uses a placeholder `#` URL.
- Every active external link has been opened or otherwise verified where practical.
- Cards are responsive, consistent, keyboard-accessible, and theme-aware.
- No avoidable image warnings or console errors; lint/build and all prior checks pass.

**Do not start Prompt 10 until this prompt is complete and verified.**

---

# Prompt 10 of 16 — Add Useful Project Discovery and Accessible Case-Study Details

**Pre-check:** Re-verify Prompts 1–9.

**Goal:** Add meaningful interaction to project discovery without inventing project details.

### Work

1. Add client-side filtering by verified project category/technology only if there are enough real projects for filtering to be useful. Include a clear “All” option and an empty-results state.
2. Add an accessible project quick-view dialog or a dedicated in-page details view if it improves the real content. Use the installed Motion/Framer Motion capabilities for enter/exit transitions where appropriate.
3. A detail view may show problem/context, approach, technologies, role, trade-offs, screenshots, and outcome only where those facts are available. Omit unknown fields rather than fabricate detail.
4. Dialog behavior must include an accessible name, keyboard operation, Escape/close behavior, focus management, sensible focus return, and reduced-motion support. Do not let an overlay trap visitors.
5. Preserve direct access to real external demos/repos where available. Avoid adding an unnecessary routing framework or full page-transition library.

### Acceptance gate

- Filters produce correct results from real project metadata.
- Dialog/details work with keyboard and touch, and do not cause body-scroll or focus bugs.
- Missing project facts are omitted, not fabricated.
- No excessive animation or layout jump occurs.
- Lint/build and all preceding tests pass.

**Do not start Prompt 11 until this prompt is complete and verified.**

---

# Prompt 11 of 16 — Reassess Experience and Career-Credibility Content

**Pre-check:** Re-verify Prompts 1–10.

**Goal:** Integrate a professional experience section only with authentic, supportable information.

### Work

1. Inspect `Experience.jsx` and verify each role, organization, date, and description against existing project content or credible supplied material. The Phase 2 report itself says those entries need confirmation; its presence in code is not proof they are true.
2. Do not automatically re-enable unverified sample roles or company names. Do not manufacture credentials, internships, years, achievements, numbers, or client outcomes.
3. If verified career entries exist, redesign them as a concise responsive timeline with clear roles/dates and factual bullet points. Use subtle, accessible motion only.
4. If the entries cannot be verified, omit unsupported records and remove any dead Experience navigation target. Keep the implementation maintainable so authentic entries can be added later. Do not fill the gap with invented content.
5. Only add Education, Certifications, Testimonials, or Achievements if valid factual content already exists and is clearly supported.

### Acceptance gate

- All displayed career/education claims have a traceable source.
- No section anchor points to missing content.
- Layout and motion behave at all main breakpoints.
- Any omissions for missing proof/content are logged clearly.
- Lint/build and earlier prompt checks pass.

**Do not start Prompt 12 until this prompt is complete and verified.**

---

# Prompt 12 of 16 — Optimize Images, Fonts, and Runtime Performance

**Pre-check:** Re-verify Prompts 1–11.

**Goal:** Improve loading performance and visual stability without compromising image quality.

### Work

1. Inventory all local and remote images, their sizes, rendered dimensions, and current usage. Prioritize large files such as the reported `public/img/laptop.png` and `public/img/natural.png` if they still exist and are in use.
2. Use existing tools or verified platform optimization to produce appropriate modern image formats when available. Never overwrite the only original asset before a valid optimized replacement has been verified. Do not add image-processing dependencies without need.
3. Replace suitable raw `<img>` tags with Next.js `Image` where appropriate; supply meaningful `alt`, explicit dimensions or correct `fill`/`sizes` values, and sensible loading priority. Do not lazy-load the actual above-the-fold LCP image if it needs eager loading; do not preload every image.
4. Reduce external asset requests where local assets or installed icons are more reliable. Keep remote image host allowlists precise and security-conscious.
5. Review font loading, client component size, unused dependencies, unnecessary effects, layout shifts, and expensive scroll handlers. Avoid premature refactors unrelated to measurable issues.
6. Do not add huge videos, WebGL, or background canvases. Set practical asset guidelines for future additions.
7. Measure current and updated behavior with available local build/browser/Lighthouse tools. Report actual values only when measured; do not promise a score before testing.

### Acceptance gate

- No broken/missing images or Next.js image configuration warnings.
- Above-the-fold images load appropriately and layout space is reserved.
- Optimized assets are verified and originals are not lost prematurely.
- No new excessive dependencies or external requests.
- Build and browser checks pass; prior feature tests remain green.

**Do not start Prompt 13 until this prompt is complete and verified.**

---

# Prompt 13 of 16 — Implement a Secure, Honest Contact Workflow

**Pre-check:** Re-verify Prompts 1–12.

**Goal:** Replace the non-functional contact form with a fully implemented submission workflow and truthful feedback.

### Work

1. Verify the current contact email/address and form structure. Make confirmed email and phone details actionable using valid `mailto:` and `tel:` links where appropriate.
2. Implement labeled, accessible form fields, client-side convenience validation, server-side validation, clear errors, submitting state, success state, and retryable failure state. Protect against double submissions and do not clear the user's message on failure.
3. Prefer a server-side Resend integration through a Next.js App Router Route Handler if the project's deployment/runtime supports it and the required dependency can be installed safely. Consult current official documentation. Keep all API keys server-side and read them from environment variables.
4. Use appropriate environment variable names, such as `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`, if needed. Create/update an example environment file with names only and no secrets. Never hardcode a key or expose it through a `NEXT_PUBLIC_` variable.
5. Validate and limit incoming payloads; use a honeypot or similarly proportionate spam mitigation if suitable. Do not claim that a simplistic in-memory limiter is reliable across serverless instances.
6. Handle missing configuration honestly: return a controlled service-unavailable response and show the user a clear fallback such as opening their email client. Never show “Message sent” when it was not sent.
7. If credentials are absent, test validation and failure paths locally or with a mocked provider. Document the environment configuration required for live delivery; do not wait for the user and do not claim live email delivery was tested.
8. Keep private submitted content out of console logs and public error responses.

### Acceptance gate

- Invalid inputs are rejected on both client and server as applicable.
- The UI presents accurate submitting/success/error states.
- API keys cannot be accessed from client bundles.
- Missing credentials do not cause a false success or crash the page.
- Local/mocked tests cover both successful provider response and failure/missing configuration.
- If real credentials are unavailable, the code implementation must still be complete and tested with that limitation logged accurately.
- Lint/build and earlier prompt checks pass.

**Do not start Prompt 14 until this prompt's code and available tests are complete and verified.**

---

# Prompt 14 of 16 — Polish Footer, Scroll Progress, and Cross-Site Micro-Interactions

**Pre-check:** Re-verify Prompts 1–13.

**Goal:** Finish the shared details that make the site feel cohesive and production-ready.

### Work

1. Redesign the footer to use current design tokens, sensible whitespace, accurate current navigation, verified social profiles, and a dynamic current year.
2. Remove dead anchors and placeholder social links. Use `target="_blank"` plus appropriate `rel="noopener noreferrer"` for external links where a new tab is required.
3. Refine the scroll-to-top or progress control so it does not obscure content, has an accessible name, respects reduced motion, and uses the semantic theme accent rather than hardcoded indigo.
4. Add consistent micro-interactions to primary buttons, links, cards, inputs, and icon actions: focus, hover where available, tap feedback, and transition timing must feel related across components.
5. Make sure all interactions remain understandable on touchscreens where hover is not available. Do not add cursor-following effects that interfere with native cursor behavior or text selection.
6. Add no decorative element that compromises the contact form, content reading, sticky header, or project controls.

### Acceptance gate

- All site-wide links and section anchors resolve correctly.
- Copyright year is correct without manual annual edits.
- Interactive elements have consistent visual feedback and accessible names.
- No new dead links, focus traps, overflow, or console errors.
- Lint/build and all previous prompt checks pass.

**Do not start Prompt 15 until this prompt is complete and verified.**

---

# Prompt 15 of 16 — Complete SEO, Metadata, Structured Data, and Sharing Assets

**Pre-check:** Re-verify Prompts 1–14.

**Goal:** Make the portfolio indexable and present well when shared, without inventing a domain or identity claims.

### Work

1. Inspect the actual root layout and current metadata. Use Next.js App Router metadata APIs supported by the installed version.
2. Add or improve title, description, canonical metadata, Open Graph/social metadata, theme color where appropriate, and share-image metadata. Use a canonical base URL only after verifying a real production domain from current project/deployment configuration or another reliable source. Do not use the sample `https://sumon.dev` from the audit unless independently verified.
3. Add an Open Graph image using a supported Next.js file convention and actual project branding. Avoid requiring an image-generation dependency for a simple social card. If a branded portrait cannot be verified or used appropriately, create a clean typography-based social card rather than inventing imagery.
4. Add `robots.js` and `sitemap.js` only as supported by the installed Next.js App Router version. Include only real, canonical, publicly accessible routes; this may remain a single-page site. Do not list nonexistent `/about` or `/projects` pages.
5. Add a JSON-LD `Person` description only with accurate properties. Include `sameAs` profiles only after verifying URLs. Do not invent employer, address, credentials, or domain details.
6. Verify metadata in rendered HTML/build output and check for duplicate/conflicting values. Keep secrets and private user data out of metadata.

### Acceptance gate

- Metadata is valid and rendered as intended.
- OG/share assets follow Next.js file conventions and build successfully.
- Sitemap/robots output is valid and contains no fabricated URLs.
- Structured data uses only verified facts and valid JSON.
- Canonical URL is not guessed; if no production domain can be verified, document the required domain rather than inserting a fake one.
- Lint/build and all earlier prompts pass.

**Do not start Prompt 16 until this prompt is complete and verified.**

---

# Prompt 16 of 16 — Final End-to-End Regression, Responsive, Accessibility, and Performance Audit

**Pre-check:** Re-verify Prompts 1–15 and fix any regression before final QA.

**Goal:** Validate the entire portfolio as one integrated product. Do not implement new major features in this phase; fix defects introduced or discovered during integration.

### Work

1. Run the project's lint, production build, and available tests. Fix root causes for failures and rerun the commands until they pass, or document only the genuine environment restriction that cannot be resolved locally.
2. Run the app and inspect representative mobile, tablet, laptop, and desktop viewports. Test horizontal overflow, sticky/fixed elements, type scaling, image loading, navigation, drawers, theme settings, filters, dialogs, contact form states, and footer links.
3. Exercise keyboard-only navigation, visible focus, semantic landmarks, icon labels, form label/error relationships, dialog escape/focus behavior, and reduced-motion behavior.
4. Check browser-console errors, missing assets, invalid links, React hydration warnings, Next.js Image warnings, and accidental external requests.
5. Test light/dark themes and every accent preset across all rendered sections. Confirm no stale hardcoded accent styles remain where the token system should apply.
6. Measure Lighthouse or equivalent metrics if the tooling is available. Record actual scores and test conditions. Use Core Web Vitals field targets as goals, not as a claim that laboratory results prove field performance. Aim for strong results but do not fabricate scores or disable useful content just to game the report.
7. Verify the contact form with success/failure mocks; if provider credentials are present and authorization permits, test real email safely. If not, report live delivery as pending environment configuration while confirming code-level behavior.
8. Inspect Git diff to ensure no unrelated user edits were removed and no secret values were added. Confirm no unintended large assets, debug logs, temporary files, or test bypasses remain.
9. Update `PORTFOLIO_IMPLEMENTATION_LOG.md` with the status of all 16 prompts, final check commands and exact results, remaining real external prerequisites, and a concise file-change summary.

### Final acceptance gate

- All 16 prompts are marked complete only if their code and available acceptance checks passed.
- Lint/build/test results are exact and reproducible.
- No known broken links, fatal console errors, or missing local assets remain.
- Responsive layout, theme behavior, core interactions, and accessibility basics have been verified.
- Performance findings include actual evidence and clearly label anything not measurable in the current environment.
- Any external-only prerequisite (such as production environment variables or a genuine missing resume PDF) is listed honestly, without fabricating completion.
- No unrelated user changes have been lost.

When finished, summarize the implemented work and verified results. Do not claim the portfolio is “100% perfect” or that real service delivery is verified if it was not tested. Do not stop early merely because a solvable issue is difficult: investigate, fix, and rerun the appropriate tests.

---

## Master Completion Rule

**Execute all 16 prompts automatically, in order, one at a time.** Re-verify every previously completed prompt before starting each new prompt. Fix previous regressions first. Fix problems instead of skipping them. Use relevant official documentation and trustworthy browser references when needed. Do not ask the user to re-explain the workflow. Do not modify this master file. Keep `PORTFOLIO_IMPLEMENTATION_LOG.md` accurate as work progresses.

The final result should be a distinctive, premium, animation-rich yet fast, accessible, responsive, truthful, and maintainable portfolio—not a collection of effects at the expense of professionalism.
