# Validation — 11 November 2026 (Riyadh)

Validated the production build locally through Netlify Dev, using system Chromium and Playwright. This is not a claim of live-site or production-cloud validation.

- `npm run build`: passed; bundled production React, all CSS, fonts and imagery self hosted. JavaScript bundle approximately 388 KiB before compression.
- `npm test`: 8 tests passed, 0 failed. Covers Arabic persistence and consent, storage failure, origin checks, required fields and enums, extra-field removal, payload/content-type validation, honeypot, rate limits, institutional and broker input.
- `python3 scripts/smoke.py`: 104 checks passed, 0 failures, 0 browser exceptions. Covers 24 routes × 2 languages × 2 widths, mobile menus, modal keyboard interaction, validation, actual form submission through the local Netlify function, filters and stage disclosure.
- Additional 320px checks: 10 representative marketing/application routes passed without horizontal overflow.
- `python3 scripts/copy-audit.py <original.zip>`: 1,215 original quoted content strings checked, no missing strings; two permitted Arabic corrections documented.
- `netlify functions:build --src netlify/functions --functions .netlify/functions-build`: passed.
- Actual local function rate limiting: five requests returned 201, the sixth returned 429.
- Test request records verified under the local Netlify Blobs store, outside the static publish directory. No test records, credentials, local Netlify state, or local rate-limit data are included in the repository or delivery ZIP.
- Home images loaded successfully; security headers verified through Netlify Dev.
- Desktop/mobile English and Arabic screenshots captured under `artifacts/`.

Source pushed to GitHub `inventoorDEFI/Bunyan`, branch `main`. Public deployment, domain DNS, HTTPS issuance, production Blobs permissions/storage and real-provider integrations remain unverified. Outbound deployment API access is denied in this environment, and no Netlify account credential is configured. See DEPLOYMENT.md for the publication steps and the distinction between working contact requests and original demo financial workflows.
