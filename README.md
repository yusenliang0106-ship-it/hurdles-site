# Social Media & Online Strategies website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui structure.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Layout

- `components/ui/`: shadcn-style primitives (this is where `npx shadcn add …` writes). Contains `scroll-locked-video-hero.tsx`.
- `components/demo.tsx`: demo usage of the hero, rendered by `app/page.tsx`.
- `lib/utils.ts`: the `cn()` helper that shadcn components import.
- `components.json`: shadcn config. Its aliases map `@/components/ui`, `@/lib/utils`, etc.
- `app/globals.css`: Tailwind entry plus shadcn theme tokens (neutral).

## Video hero

`MetroHero` props: `videoSrc`, `title`, `tagline`, `scrollHint`, `signature` (or `false`), `scrubDistance` (px of scroll input to play the full clip, default 3200), `className`, `style`.

The default video streams from `cdn.21st.dev`. For production, host your own MP4 (for example in `public/`) and pass `videoSrc`.
