This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Jalil Brothers — Updates in this batch

Drop these files into your project at the **same relative paths** (they'll overwrite what's there):

```
app/layout.tsx
app/globals.css
styles/navbar.css          ← new file, was missing before
components/Contact/Contact.tsx
components/Footer/Footer.tsx
```

## 1. Fonts — now properly loaded via next/font
- Removed unused Geist / Geist Mono.
- Removed the slow, render-blocking `@import url(fonts.googleapis...)` in globals.css.
- Cormorant Garamond, Inter, and Libre Baskerville are all now loaded through `next/font/google` in `layout.tsx` — faster loading, no layout shift, self-hosted at build time.
- Added a `.accent-serif` / `blockquote` rule using Libre Baskerville, so you have a place to use it (e.g. testimonial quotes, pull-quotes) — it wasn't used anywhere yet.

## 2. Fixed the missing navbar stylesheet
- `styles/navbar.css` now exists (your file, restored) and lives where `globals.css` expects it (`../styles/navbar.css`, one level above `app/`).
- Changed the hardcoded gold `#d4af37` to `var(--gold)` so navbar gold matches the rest of the site (`#C9A227`) exactly.

## 3. Real business details (pulled from jalilbrothers.com)
**Contact.tsx** and **Footer.tsx** now use:
- Address: Shop No. 07, Benazir Plaza, Jinnah Avenue, G-7/2, Islamabad
- Phone: +92-051-2348160
- WhatsApp: 0339-5121222
- Email: jalilbrothers1973@gmail.com
- Hours: Mon–Sat, 11:00 AM – 9:30 PM
- Real social links: Facebook, Instagram, TikTok, WhatsApp (the Footer previously imported Facebook/Instagram/WhatsApp icons from `react-icons` but never actually used them — it was rendering generic Lucide "Camera"/"Globe" icons pointing to `href="#"`. Fixed to render the real icons with real links.)
- Added `FaTiktok` from `react-icons/fa6` — if `react-icons` isn't already a dependency, run `npm install react-icons`.

## Not touched (needs your call)
Testimonials.tsx is currently generic ("Distinguished Clientele," etc.) — it doesn't quote anyone by name, which is safe as-is. Their real site displays named quotes from public figures (a former President, PM, army chief, ambassador). I left this alone rather than inserting real quotes attributed to real people without you explicitly confirming you want that — let me know if you'd like me to add it.

## Still pending from your original list
- Final animation polish (reveal timing, parallax, transitions)
- Responsive testing (mobile/tablet)
- Performance optimization (images, bundle size)
- Final spacing/typography/hover refinement

Send me the rest of the components (AnatomySuit, BespokeJourney, Collections, Craftsmanship, Hero, Heritage, Testimonials) with their `.module.css` files when you're ready to tackle animation polish and responsiveness — I have Hero, Heritage, Navbar, SmoothScroll, Testimonials, Footer, Contact, Craftsmanship already from your upload.
