import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

/**
 * Server entry used only at build time by scripts/prerender.mjs, so every
 * route ships real HTML instead of an empty <div id="root">. The client still
 * boots normally on top of it from main.jsx.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}

// Re-exported so the prerender script only has to load this one bundled file
// instead of resolving src/ modules under bare Node.
export { ORIGIN, indexableRoutes, jsonLdBlock, metaFor } from './seo'
