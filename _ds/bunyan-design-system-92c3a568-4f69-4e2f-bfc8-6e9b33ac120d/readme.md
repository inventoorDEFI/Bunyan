# Bunyan Design System

Bunyan (بنيان, "structure / edifice") is a Saudi platform that makes real estate development funding faster, regulated and transparent.

- **Bunyan Build** (formerly *Wasl*) prepares developers and connects them to CMA-licensed capital partners — readiness file, document checklist, partner matching, data-room sharing.
- **Bunyan Invest** lets investors view and back real estate projects, with construction progress verified by inspectors and anchored on-chain.

Audience: Saudi developers, CMA-licensed capital partners, investors, inspectors and Shariah reviewers. Arabic first, English equal. Mobile first, RTL and LTR.

## Sources
- Brand brief and MVP colour/type spec supplied in chat (no codebase, Figma or product screenshots were provided).
- Logo files: `uploads/Bunyan_Official_Logo.png`, `bunyan-lockup-color-2.png`, `bunyan-lockup-black-2.png`, `bunyan-lockup-color.svg`, `bunyan-lockup-black.svg`, `bunyan-mark*.svg` → copied to `assets/logo/`.
- Because no product UI was supplied, the UI kits are **reference compositions** built from the brief, not recreations of shipped screens.

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `fonts/` — self-hosted woff2 (Sora variable, DM Mono 400/500, Noto Kufi Arabic variable)
- `assets/logo/` — all supplied logo files; `assets/logo.svg` = primary mark
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (see below), one card per folder
- `ui_kits/bunyan-build/` — developer app; `ui_kits/bunyan-invest/` — investor app; `ui_kits/shared/Shell.jsx` — phone frame, app bar, language context
- `SKILL.md` — agent skill entry; `thumbnail.html` — project tile

## Components
- **core/**: Button, IconButton, Icon, Badge, Tag, Card, Logo
- **forms/**: Input, Select, Checkbox, Radio, Switch
- **navigation/**: Tabs, BottomNav
- **feedback/**: Dialog, Toast, Tooltip
- **data/**: FloorProgress, Stat, MilestoneList

Namespace: `window.BunyanDesignSystem_92c3a5`.

### Intentional additions
No source component inventory existed, so a standard set was authored. Brand-specific additions:
- **FloorProgress** — the stacked-floor progress motif from the brand idea.
- **MilestoneList** — inspector-verified, on-chain milestone timeline (Bunyan Invest core).
- **Stat** — label + figure pairing used across both products.
- **Logo** — renders the supplied files so nobody redraws the mark.
- **Icon** — wrapper for the Lucide CDN set (see Iconography).
- **BottomNav** — mobile-first tab bar.

---

## Content fundamentals
**Voice:** credible, calm, institutional, Saudi-rooted. Bunyan talks like a well-run licensed firm, not a startup. It states facts, names the regulator, and tells people what happens next.

- **Person:** address the user as *you*; Bunyan refers to itself as *Bunyan* or *we* sparingly. "Your project is ready for review." "A reviewer will confirm within three working days."
- **Casing:** sentence case for headings, buttons and labels ("Submit for review", not "Submit For Review"). Mono labels are UPPERCASE via CSS only — write them in sentence case in source.
- **Specificity over hype:** say *CMA-licensed*, *Shariah approved*, *verified by inspector*, *anchored on-chain*. Give numbers with units: "SAR 42.5M", "Floor 6 of 12", "3 working days".
- **Never:** guarantees ("guaranteed returns", "risk-free"), exclamation marks, hype verbs ("unlock", "supercharge", "revolutionise"), crypto slang ("to the moon", "WAGMI"). Returns are always "expected".
- **Emoji:** not used anywhere.
- **Arabic first:** write the Arabic as an original, formal Modern Standard Arabic text, not a literal translation. Use Arabic-Indic numerals in Arabic body copy (٤٨ وحدة); keep Western digits for currency figures, IDs and hashes in DM Mono.
- **Currency:** `SAR 42,500,000` in English (unit first, mono); `٤٢٫٥ مليون ريال` in Arabic prose.
- **Product names:** "Bunyan Build", "Bunyan Invest" (never "Wasl" in new copy; mention "formerly Wasl" only in transition comms).

Examples
- Button: "Continue with Nafath" / "المتابعة عبر نفاذ"
- Empty state: "No partner requests yet. Complete your readiness file to appear to licensed partners."
- Status: "In review", "Verified", "Rejected", "Draft".
- Disclaimer: "Returns are not guaranteed. Read the offering memorandum before investing."

## Visual foundations
**Concept.** Najdi architecture — mud-brick mass, flat parapets, triangular crenellations (*sharafat*), small deep openings — and buildings rising floor by floor. Translate this as: warm mineral grounds, crisp rectilinear forms, restrained ornament, and progress drawn as stacked floors. No gradients, no glassmorphism, no glow.

**Colour.** Warm paper (`#F7F6F1`) page, warm-white (`#FCFBF8`) cards. Primary teal `#066D67` for actions, links, completed states; deep teal `#075550` hover. Sand `#B99045` is the accent — in-progress floor, investment CTA, small ornament; never large fills except pale sand `#F5EDDD` callouts. Ink `#101C24` text and inverse panels. The **logo is bronze `#5A4423`** (from the supplied files) — keep it bronze; it is not recoloured teal. Status: teal = approved, sand-dark = pending, brick `#A23E2F` (derived) = rejected.

**Type.** Sora for all Latin UI (600 for headings with −0.02em tracking, 400 body). DM Mono for labels (11px uppercase, 0.08em), metadata, IDs, hashes, currency units and figures in tables. Noto Kufi Arabic for Arabic at the same sizes with ~30% looser leading; no negative tracking in Arabic. `html[dir=rtl]` swaps `--font-sans` automatically.

**Spacing & layout.** 4px base; 20px mobile gutters; 16px between cards; 44px minimum control height. Single-column mobile layouts; app bar 56px, bottom nav 60px, sticky CTA bar at bottom on detail screens. Use logical properties (`padding-inline`, `inset-inline-start`) everywhere so RTL mirrors without overrides.

**Corners.** Architectural, not bubbly: 2px floor slabs, 4px tags/checkboxes, 8px controls, 12px cards, 20px only for bottom-sheet tops. Pill radius only for status badges and switches.

**Borders & shadows.** Borders do the work: 1px `#E4E2D9` on cards, `#CFCCC1` on inputs. Cards are flat; `shadow-2` appears only on interactive hover; `shadow-3` for dialogs, sheets and toasts. No inner shadows. No coloured left-border cards.

**Backgrounds & imagery.** Flat colour fields only. Project photography should be real, daylight, warm and slightly desaturated (Riyadh stone, sand, sky) — none was supplied, so a pale-sand placeholder with the floor stack stands in. No hand-drawn illustration, no repeating full-page patterns. The crenellation band (`.bn-crenel`) may appear once per page as a divider.

**Motion.** Quiet and functional: 120–200ms, `cubic-bezier(.2,0,0,1)`. Fades and short slides for sheets; floor fills grow bottom-up. No bounces, no parallax, no looping decoration.

**States.** Hover: one step darker (teal-600 → 700) or pale-teal tint for outlined/ghost. Press: two steps darker (teal-800) — no scale/shrink. Focus: teal border + 3px `rgba(6,109,103,.22)` ring. Disabled: sunken surface, slate-300 text.

**Transparency & blur.** Only the dialog scrim (ink at 45%). No backdrop blur.

## Iconography
- No icon set was supplied. **Substitution: Lucide** (outline, 2px stroke, rounded joins) via `lucide-static@0.460.0` on unpkg, rendered through the `Icon` component as a CSS mask so it takes `currentColor`. This matches the thin, geometric line of the Bunyan mark.
- Sizes: 16 (inline/tags), 18–20 (controls, lists), 22 (bottom nav).
- Common names: `building-2`, `layers`, `landmark`, `hard-hat`, `file-check`, `file-plus`, `shield-check`, `link-2` (on-chain), `map-pin`, `wallet`, `chart-pie`, `compass`, `fingerprint` (Nafath).
- Mirror directional icons (`chevron-left/right`, `arrow-*`) in RTL.
- No emoji, no unicode-glyph icons (except `●` status dots drawn by CSS), no icon font.
- The Bunyan mark (sun within circle and two squares) is a logo — never use it as a generic icon.

## Fonts
Sora, DM Mono and Noto Kufi Arabic were downloaded from Google Fonts and self-hosted in `fonts/` (latin, latin-ext, arabic subsets). Replace with licensed brand files if the team has them.
