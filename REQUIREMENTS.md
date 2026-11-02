# Portfolio Architecture & Implemented Features Specification

**Project:** Sumon Ahmed — Personal Developer Portfolio  
**Repository:** `sumon-ahmed-ss-550/Personal-web`  
**Current Version:** `0.2.0` (Modernized & Feature-Complete)  
**Status:** All requested high-impact UI/UX & Interactivity features implemented and verified.  
**Lint Gate:** `npm run lint` — **0 errors, 0 warnings (PASSED)**.

---

## 1. Verified Directory Structure

```
Personal-web/
├── public/
│   ├── cv/
│   │   └── sumon_resume.pdf           # Official PDF resume document
│   └── img/
│       ├── ebook-platform.png         # E-Book Platform project screenshot
│       ├── keen-keeper.png            # Keen Keeper project screenshot
│       ├── natural.png                # Hero section profile photo
│       ├── portfolio.png              # Developer Portfolio project screenshot
│       └── tutor-booking.png          # Tutor Booking Platform screenshot
│
├── src/
│   ├── app/
│   │   ├── api/contact/route.js       # Serverless email pipeline (Resend API)
│   │   ├── globals.css                # Obsidian Craft design tokens & CSS variables
│   │   ├── layout.jsx                 # Root layout, fonts, JSON-LD, TerminalModal, Skip Link
│   │   ├── opengraph-image.jsx        # Dynamic 1200x630 social share card
│   │   ├── page.jsx                   # Assembled landing page
│   │   ├── robots.js                  # Dynamic robots.txt
│   │   └── sitemap.js                 # Dynamic sitemap.xml
│   │
│   ├── components/
│   │   ├── About.jsx                  # Bento grid, Bio Mode switcher, GitHub stats
│   │   ├── Contact.jsx                # Interactive contact form & client validation
│   │   ├── CustomCursor.jsx           # Spring-physics custom mouse cursor
│   │   ├── Experience.jsx             # Active career & education journey timeline
│   │   ├── Footer.jsx                 # Accessible navigation anchors & social channels
│   │   ├── GitHubStats.jsx            # GitHub engineering footprint & verified repo stats
│   │   ├── Hero.jsx                   # Particle mesh, magnetic buttons, resume modal trigger
│   │   ├── Magnetic.jsx               # Reusable magnetic spring hover wrapper
│   │   ├── Navbar.jsx                 # Scrollspy, mobile drawer, theme toggle, audio toggle
│   │   ├── ParticleBackground.jsx     # Reactive HTML5 canvas particle mesh for hero
│   │   ├── Projects.jsx               # Filtered showcase, tactile audio, quick view modal
│   │   ├── ResumeModal.jsx            # High-res resume viewer & download modal
│   │   ├── ScrollToTop.jsx            # Dynamic scroll depth SVG progress ring
│   │   ├── Skills.jsx                 # Categorized capabilities & infinite marquee
│   │   ├── SmoothScroll.jsx           # Lenis + GSAP inertial momentum physics
│   │   ├── TerminalModal.jsx          # Interactive developer CLI mode (`Ctrl+K` or `~`)
│   │   ├── ThemeCustomizer.jsx        # Dynamic palette switcher & CSS token exporter
│   │   └── TiltCard.jsx               # 3D perspective tilt & cursor spotlight border
│   │
│   ├── data/
│   │   └── projects.js                # Structured array of verified project inventory
│   │
│   └── utils/
│       └── audio.js                   # Zero-dependency Web Audio API synthesizer
│
├── eslint.config.mjs                  # ESLint flat config with Next.js 16 rules
├── jsconfig.json                      # Path aliases (@/* -> ./src/*)
├── next.config.js                     # Next.js 16 config with React Compiler enabled
├── package.json                       # Core dependencies and run scripts
├── postcss.config.mjs                 # PostCSS Tailwind CSS v4 integration
├── README.md                          # Repository overview
└── REQUIREMENTS.md                    # System requirements & architecture specification
```

---

## 2. Implemented High-Impact Features

### 2.1 Interactive Developer Terminal (CLI Mode)
- **Component:** `src/components/TerminalModal.jsx`
- **Activation Shortcuts:**
  - Keyboard: `Ctrl + K`, `Cmd + K`, or pressing `` ` `` / `~` (tilde/backtick)
  - UI: Floating `CLI Mode` pill button in the bottom-left corner with glowing icon
- **Interactive Commands Supported:**
  - `help` / `?`: Lists all available commands
  - `about`: Prints Sumon Ahmed's background, location, and focus
  - `skills`: Displays categorized skill stacks (Frontend, Backend, Workflow)
  - `projects`: Lists all 4 verified projects with descriptions and GitHub links
  - `experience`: Displays career journey and education milestones
  - `resume` / `cv`: Opens and downloads official resume document
  - `contact`: Outputs email, phone, and direct social URLs
  - `theme <color>`: Dynamically updates accent color (`indigo`, `cyan`, `emerald`, `amber`, `rose`, `violet`, or `#hex`)
  - `sudo hire`: Easter egg with automatic email client launch
  - `clear`: Clears command history
  - `exit`: Closes the terminal modal
- **User Experience:** Command history navigation with `ArrowUp` and `ArrowDown`, auto-scroll to latest output, maximize/minimize window toggle.

### 2.2 Magnetic Hover Effects & Advanced Micro-Interactions
- **Components:** `src/components/Magnetic.jsx` and `src/components/TiltCard.jsx`
- **Magnetic Physics:**
  - Calculates cursor delta from element center and applies smooth spring physics (`damping: 15, stiffness: 180`).
  - Wraps primary action buttons in `Hero.jsx` ("View Projects", "Contact Me", "Resume", "Copy Email").
  - Automatically disables when `prefers-reduced-motion` is active.
- **3D Tilt & Cursor Spotlight:**
  - `TiltCard.jsx` provides 3D rotation (`rotateX`, `rotateY`) and tracks mouse coordinates to render an ambient radial spotlight along card borders.

### 2.3 Subtle Web Audio UI (Tactile Sound Synthesis)
- **Utility & Manager:** `src/utils/audio.js`
- **Synthesis Engine:**
  - Uses native browser `window.AudioContext` oscillators (zero audio file downloads, zero latency, ultra-lightweight).
  - Synthesizes 3 distinct micro-tones:
    - `playTick()`: Fast 850Hz-450Hz decaying sine wave for navigation tabs and clicks.
    - `playPop()`: 400Hz-750Hz triangle chirp for modals and theme shifts.
    - `playSuccess()`: Dual-tone chime (523Hz -> 659Hz / C5 -> E5) for clipboard copy & form submission.
- **Global Mute/Unmute Toggle:**
  - Positioned directly in the Navbar with volume icon (`Volume2` / `VolumeX`).
  - Persisted across visits in `localStorage.getItem('soundEnabled')` (default is muted to respect user preference).

### 2.4 Reactive Particle Background Mesh
- **Component:** `src/components/ParticleBackground.jsx`
- **Engine:**
  - Lightweight HTML5 Canvas particle network in the Hero section background.
  - Dynamically reads the active theme color (`--primary-rgb`) to tint particles and connecting lines.
  - Interactive cursor repulsion on mouse move.
  - Pauses when offscreen or when reduced motion is preferred.

### 2.5 Experience Timeline Activation
- **Component:** `src/components/Experience.jsx`
- **Milestones Added:**
  - *Full-Stack Developer (MERN & Next.js)* — Independent Engineering (2023 – Present)
  - *Front-End Web Development Specialization* — Open Source & Projects (2022 – 2023)
  - *Higher Secondary & Computer Studies* — Academic Foundations (2020 – 2022)
- Mounted in `src/app/page.jsx` with navigation anchors in `Navbar.jsx` and `Footer.jsx`.

### 2.6 Resume / CV Preview Modal & Action
- **Component:** `src/components/ResumeModal.jsx`
- Integrated into `Hero.jsx` and `TerminalModal.jsx`.
- Features embedded PDF preview of `/cv/sumon_resume.pdf`, direct download button, and one-click full-screen preview.

### 2.7 GitHub Engineering Footprint Card
- **Component:** `src/components/GitHubStats.jsx`
- Integrated into `About.jsx`.
- Showcases verified public repositories (10+), core ecosystem, engineering standards, and direct link to GitHub profile.

### 2.8 Theme Tokens Exporter
- **Component:** `src/components/ThemeCustomizer.jsx`
- Added an *"Export CSS Tokens"* button that copies the CSS variables and Tailwind v4 `@theme` snippet directly to the clipboard.

---

## 3. Quality & Verification Gates

- **Lint Status:** `npm run lint` — **0 errors, 0 warnings**.
- **WCAG Accessibility:** Keyboard trap in modals, Escape key handlers, `:focus-visible` ring styling, and reduced-motion fallbacks across all motion hooks.
