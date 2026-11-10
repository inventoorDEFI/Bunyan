# Bunyan · بنيان

A responsive, bilingual redesign of the supplied Bunyan company site and product workspaces. Ivory, forest green and bronze; architectural photography; self-hosted Sora and Noto Kufi Arabic. Preserves the supplied copy and routes, with two Arabic corrections documented in [DEPLOYMENT.md](DEPLOYMENT.md).

## Develop

Requires Node 22+ and npm. Use this existing checkout; a separate worktree is unnecessary.

```sh
npm ci
npm run build
npm run dev
```

Netlify Dev runs the static site and the lead function together. Re-run `npm run build` after frontend edits. To run in a restricted cloud runtime that cannot download the unused Deno edge engine:

```sh
XDG_CONFIG_HOME=/workspace/.config npx netlify dev --offline --no-open --internal-disable-edge-functions
```

This project uses Node functions, not Edge Functions. The flag affects only the unused local edge engine. For a static visual preview without form handling, run `node scripts/serve.mjs`.

## Validate

```sh
npm test
npm run test:browser
python3 scripts/copy-audit.py /path/to/original.zip
```

The browser test requires Python Playwright, `/usr/bin/chromium`, and Netlify Dev running on port 8888. Override its URL with `BUNYAN_TEST_URL` when needed. It checks desktop/mobile Arabic and English routes, overflow, navigation, filters, modal keyboard interaction, form validation and actual local Netlify Blobs persistence. Screenshots and reports go into ignored `artifacts/`. Tests submit fictional contact details only.

## Structure

- `pages-home.jsx`, `pages-build.jsx`, `pages-other.jsx`: company pages and request forms.
- `shell.jsx`, `core.jsx`: shared navigation, modals, components and copy.
- `app.jsx`, `flows.jsx`, `ws-*.jsx`, `dashboards.jsx`: original product demo workspaces.
- `site.css`, `redesign.css`, `tokens/`: shared styling and redesign.
- `scripts/build.mjs`: bundles React for production; no browser Babel, remote fonts or remote runtime scripts.
- `server/leads.mjs`, `netlify/functions/leads.mjs`: validated contact requests and private durable storage.
- `netlify.toml`: production hosting, security headers and API routing.
- `dist/`: generated website; always rebuild from source.

The original standalone exports and design-system package are retained as source references and are excluded from the deployment build. See [DEPLOYMENT.md](DEPLOYMENT.md) for publication and live-product dependencies.
