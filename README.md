# Social Media & Online Strategies website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui structure.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Layout

- `components/ui/`: shadcn-style primitives (this is where `npx shadcn add …` writes).
- `lib/utils.ts`: the `cn()` helper that shadcn components import.
- `components.json`: shadcn config. Its aliases map `@/components/ui`, `@/lib/utils`, etc.
- `app/globals.css`: Tailwind entry plus shadcn theme tokens (neutral).

## Hurdles homepage (`/`)

The gentle track page is the homepage (`app/page.tsx`). It used to live at `/track`, which now redirects to `/`. The older video-hero demo was removed.

A gentler, track-focused version of the Hurdles site, built around `components/ui/parallax-scrolling.tsx` (Osmo's parallax, GSAP ScrollTrigger + Lenis). Content comes from `/hurdles/index.html`.

- `ParallaxComponent` props: `title`, `subtitle`, `images` (layers 1, 2 and 4, back to front; layer 3 is the title), `children` (the section under the header), `smoothScroll` (default true). With no props it renders the original Osmo demo.
- Its styles live next to it in `components/ui/parallax-scrolling.css`. `components/parallax-demo.tsx` is the original demo with the Osmo credit.
- Layer art: `public/track/backdrop.svg` (studio-lit backdrop), `far-track.svg` (blurred far track) and `near-track.svg` (sharp near track with one hurdle). The older stands/foreground/sky SVGs are unused.
- Changes from the supplied component: `@studio-freight/lenis` is now `lenis`; cleanup uses `gsap.matchMedia()` so it only removes its own ScrollTriggers and also removes the ticker callback; reduced-motion visitors get no parallax and no smooth scroll.
- Theme: warm palette scoped to `.track-theme` in `app/track.css`, so the rest of the site keeps the neutral shadcn tokens.

### Interactive sections

- `lib/track/interactions.ts`: plain-DOM setup for the scroll story (a dot tracing the path over one hurdle), the takeoff slider, the tabs (athletes and the is / isn't toggle), the statement text that fills in as you scroll, and the question highlights. `components/track/track-interactions.tsx` runs it once on the page and cleans it up on leave.
- `lib/track/schematics.ts`: the geometry for those drawings. They are schematic shapes, not data.
- Everything is readable without JavaScript. With reduced motion, the scroll-linked fades are off and the story dot jumps instead of gliding.
