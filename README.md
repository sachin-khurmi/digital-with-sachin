# Digital With Sachin

React rebuild of [digitalwithsachin.com](https://digitalwithsachin.com/) — a digital marketing
agency site for Sachin Khurmi. Built with Vite + React Router, deployed on Vercel.

## Stack

- **React 18** + **Vite 5**
- **React Router 6** (client-side routing)
- Plain CSS with custom properties — no UI framework

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  main.jsx              app entry + router
  App.jsx               routes and layout shell
  data/site.js          all site content (services, process, skills, contact)
  components/           Navbar, Footer, CTA, ScrollToTop, Icons
  pages/                Home, Services, Portfolio, About, Contact, NotFound
  styles/global.css     design tokens + all styling
```

Content lives in `src/data/site.js`. Editing services, stats, skills or contact details there
updates every page that uses them.

## Contact form

The form on `/contact` works with no backend: it opens the visitor's mail client with the message
pre-filled. To receive submissions directly instead, set an endpoint (for example a
[Formspree](https://formspree.io) form URL):

```bash
# .env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

The form posts JSON to that URL when the variable is set. On Vercel, add it under
**Settings → Environment Variables**.

## Deploying to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Vite — build command `npm run build`, output directory `dist`.
3. Deploy.

`vercel.json` rewrites all routes to `index.html` so deep links like `/services` work on refresh.

## Notes

- The `/portfolio` page uses placeholder project entries. Replace the `projects` array in
  `src/pages/Portfolio.jsx` with real client work.
- Brand colors and fonts match the original site: `#046bd2` primary, Poppins typeface.
