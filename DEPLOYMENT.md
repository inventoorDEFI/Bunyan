# Deploy Bunyan to Netlify

The official target is **bunyan.capital**. GoDaddy remains the domain registrar. This project is ready to build on Netlify; the custom domain is not live from this work session.

## Recommended: import the GitHub repository

1. In your Netlify account choose **Add new project → Import an existing project → GitHub** and select `inventoorDEFI/Bunyan`. The redesign is pushed to `main`.
2. Use the branch containing this redesign. Netlify reads `netlify.toml`: build command `npm run build`, publish directory `dist`, functions directory `netlify/functions`, Node 22.
3. Deploy and verify the Netlify URL before changing DNS. Submit a test investor request and confirm a `BN-…` record exists in Netlify's **Blobs** store `bunyan-leads`, under `requests/`. Requests do not send email notifications automatically; assign an operator to review and export new requests daily. The existing three-business-day response copy is preserved.
4. In Netlify **Domain management**, add `bunyan.capital` and `www.bunyan.capital`; make `bunyan.capital` primary. Use the precise DNS targets Netlify shows for this project.
5. In GoDaddy DNS, back up the existing zone. Update only the web records Netlify identifies. Preserve MX, SPF, DKIM, DMARC and other email records. Do not change nameservers unless intentionally migrating the complete DNS zone.
6. Wait for DNS verification and Netlify's HTTPS certificate, then enforce HTTPS. Verify both domains, Arabic/English, forms, and mobile navigation over HTTPS. Retain the prior deployment for rollback.

**Do not use Netlify Drop for this project.** Uploading only the static `dist/` folder omits the server function used by contact forms. Use a Git import or the CLI with functions.

## CLI alternative

From the project root, with Node 22 or newer:

```sh
npm ci
npm test
npm run build
npx netlify login
npx netlify deploy --site-name bunyan-capital --prod
```

If that site name is unavailable, choose an available name in the account UI and run `npx netlify link` before deploying. Linking uses the site's internal ID; the chosen Netlify site name does not determine the custom domain. On an existing site, use `npx netlify link`, then `npx netlify deploy --prod`. Never commit an authentication token or `.netlify/state.json`.

This cloud session has no Netlify account binding, and outbound access to `api.netlify.com` and `bunyan.capital` is denied by the environment policy. For deployment from the agent, allow `api.netlify.com` and configure `NETLIFY_AUTH_TOKEN` securely in environment settings. Add the assigned `*.netlify.app` hostname and `bunyan.capital` for live verification. Do not put tokens in chat. The environment configuration service could not confirm saving the credential requirement; do not assume it was saved.

## What is functional

- Original bilingual marketing pages, routing, responsive navigation, project filtering and project detail views.
- Investor, licensed-institution and broker interest forms use a same-origin server function and private Netlify Blobs storage. Server validation, consent timestamps, honeypot, payload limits, same-origin checks and conditional rate limits are included. Storage failure never reports success. No lead data is saved in browser local storage.
- Requests are private server data. There is no public lead listing endpoint. Netlify project access controls govern access to the Blobs store. Confirm your hosting region, operator permissions, retention and deletion process against your actual privacy practices before collecting production data. Rate-limit entries store a digest of the IP, not the raw address, and reuse one record per digest; rotate/purge these under your chosen retention process.

## Existing product integrations to verify before live financial operation

The upload is a frontend demonstration, not a financial transaction backend. Its original demo labels and disclosures remain visible. The investor, developer, institution, inspector, Shariah and admin workspaces retain the original demo functionality. Sign-in, Nafath approval, holdings, document signing, tranches and subscription flows in these workspaces are demonstrations; they do not authenticate real users, move funds, submit investments or write to Stellar. Do not enter real identity documents into demo screens.

The original developer application URL (`https://waslcapital.netlify.app`) and live sign-in URLs (`https://bunyan.capital/sign-in`, `https://wasl.capital/sign-in`) are preserved. Verify ownership and operation of these external services before using them. This project does not create those services or the original 80-question developer application. Institution and broker CTA buttons now open the same site's working request forms in new tabs, retaining their original copy.

## Copy preservation

The original English/Arabic UI copy, project examples, images, brand assets and regulatory disclosures were retained. Two Arabic grammatical corrections were made:

- `نبني من الأساس، طابق بعد طابق.` → `نبني من الأساس، طابقًا بعد طابق.`
- `استخدم رقم تجريبي` → `استخدم رقمًا تجريبيًا`

A new bilingual submission-error message was necessary to accurately report failed server submissions. New visual labels reuse existing brand/product wording. `scripts/copy-audit.py` checks 1,215 original quoted content strings against the supplied ZIP, with these two corrections allowed; it is a string-preservation check, not a legal review or translation certification.
