@AGENTS.md

# astro-practice

Practice build of the Acerna homepage in Lumos for Astro. I'm Fazlu, a Webflow developer learning Astro. I direct and review, you build. After each task, explain what you did in plain language and compare to Webflow concepts where it helps.

## Figma

- File key: `BpH38KY1zZ1JbbCi3XwQIf`, page "Template #1"
- Homepage frame: `642:586` (desktop only, 1200px wide). No mobile frames exist, so derive fluid mins as the lumos-import-figma skill describes and list them as guesses.
- StyleGuide frame: `241:730`. Components: Button `246:326`, Navigation Bar `574:1093`.
- Figma reads are rate limited. Read each frame once, keep what you need in your notes, and don't re-fetch the same node.
- Ignore everything else on the page (covers, OG images, drafts, inner pages) unless I ask.

## Design decisions

These refine the Figma file, which is inconsistent. Where they conflict with a layer in the file, these win. Values on the homepage that don't fit go in the skill's ASK list, never into a new token silently.

**Font:** one family, Inter (variable, with `font-optical-sizing: auto` so large sizes render as Inter Display). Ignore General Sans and Instrument Sans in the file. Headings Medium (500), body Regular (400), emphasis SemiBold (600). Self-host, preload only the main file.

**Type scale (desktop max):**

| Token | Size | Line height | Letter spacing |
| --- | --- | --- | --- |
| h1 | 60px | 1.1 | -0.02em |
| h2 | 48px | 1.1 | -0.02em |
| h3 | 40px | 1.2 | -0.02em |
| h4 | 32px | 1.2 | -0.01em |
| h5 | 24px | 1.2 | -0.015em |
| h6 | 20px | 1.3 | -0.01em |
| text-large | 18px | 1.35 | -0.01em |
| text-main | 16px | 1.5 | 0 |
| text-small | 14px | 1.45 | 0 |

**Colors** (renamed from the file, which has both "Orange 100" and "Orange-100" meaning different things):

| Token | Hex | Figma name |
| --- | --- | --- |
| orange-50 | #FFF7F4 | Orange-100 |
| orange-100 | #FFEFEA | Orange-200 |
| orange-300 | #F89F66 | Orange 100 |
| orange-500 | #EA7A32 | Orange 200 |
| orange-700 | #D8592D | Orange 300 |
| neutral-100 | #FAF8F7 | Neutral-100 |
| neutral-200 | #F2E7E4 | Neutral 200 |
| neutral-600 | #AF8A7A | Neutral 600 |
| neutral-700 | #8B6251 | Neutral 700 |
| neutral-800 | #624B43 | Neutral 800 |
| neutral-900 | #4F3E39 | Neutral 900 |
| neutral-1000 | #1B1918 | Neutral 1000 |
| white | #FFFFFF | White |

Default theme: white background, neutral-1000 text, neutral-800 muted text, orange-500 accent. Orange text is orange-700 on light backgrounds and orange-300 on the dark theme; orange-500 is for backgrounds only. Labels on orange buttons are neutral-1000. Check contrast on orange buttons with white text and flag anything below WCAG AA.

## Animation and performance

- CSS first: transitions, keyframes, and scroll-driven animations (`animation-timeline`) with an `@supports` fallback.
- GSAP only when CSS can't do it cleanly (complex timelines, pinning, SplitText). Import it inside the component that needs it, never globally.
- Any other library (Swiper, Lenis, Rive, Three.js and so on) only when the design clearly calls for it. Propose it with a reason and wait for my approval before installing.
- Animate only `transform` and `opacity`. Always respect `prefers-reduced-motion`.
- Target Lighthouse 95+ in all four categories on mobile.
- Images through Astro's `<Image>` with width and height. Lazy load below the fold; the hero image loads eagerly with `fetchpriority="high"`.
- Ship no client JavaScript unless a feature needs it. No framework islands for static content.

## Workflow

- Never commit to `main`. Work on the branch I've checked out. If I'm on `main`, stop and tell me.
- Before building anything, show a short plan and wait for my approval.
- Small commits with clear messages. Don't push, I push.
- Before starting the dev server, check `astro dev status`. If it isn't running, start it with `astro dev --background` and give me the localhost link.
- Don't run `npm audit fix` and don't upgrade Astro or Lumos.

## Teaching

- I'm learning the terminal, Git and Astro as we go.
- Before running any command, explain in one line what it does.
- After each task, give me a short lesson: what changed, why, and the Webflow equivalent where one exists.
- When I ask a question mid-task, answer it fully before continuing.
- Keep lessons short unless I ask for more.
