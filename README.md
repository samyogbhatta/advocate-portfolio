# Advocate Dinesh Duwadi

Static Astro + TypeScript portfolio. Nepali `/ne/` is the default; English is `/en/`.

```sh
npm ci
npm run dev
npm run build
```

Cloudflare Pages: project root `advocate-dinesh-duwadi` (or `/` if this folder is the repository root), build command `npm run build`, output `dist`, Node.js 22.12+ or 24. Set **SITE_URL** to the real HTTPS origin before building. Without it, a preview uses example.com metadata and `noindex`. There is no database or runtime adapter. `_redirects` sends `/` to `/ne/`; `404.html` handles unknown routes.

Edit identity and translations in `src/data/site.ts`. Empty configuration entries are available for verified office address, map, registration, credentials and social links. Add rendering/schema only after these are verified. Assets are in `src/assets`; the original portrait is not redrawn.

The form defaults to preparing an email draft in the visitor’s mail application, with no website storage or delivery. It never claims that draft delivery succeeded. Optional **PUBLIC_CONTACT_ENDPOINT** switches to JSON POST. The endpoint must validate all fields and consent, enforce size limits and rate limiting, handle errors, and return `{ "ok": true }` only after actual delivery. Use Cloudflare Pages Functions or a Worker; keep provider credentials in server secrets. Configure CORS only for the real site origin if the endpoint is on another origin. No delivery provider is currently connected.

Optional later details: exact office address, verified credentials/registration, social URLs. Do not add unverified awards, results or testimonials.

Deployment reference: https://docs.astro.build/en/guides/deploy/cloudflare/
