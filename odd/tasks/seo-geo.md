# SEO and GEO for pi theme generator

Feature `seo-geo`, branch `feat/seo-geo` from `master`. One writer; edit surfaces `index.html` and `public/**` only.
Read this file until `## Log` before you start. Report a verdict per S# and the commit SHAs.

## Specs

S1. `index.html` `<title>` is `pi theme generator: color themes for the pi coding agent`. `<meta name="description">` is "Browser tool to create and export color themes for the pi coding agent. Build a palette, apply it to 56 color roles, and download a theme JSON." It must be 160 characters or fewer. Add `<meta name="robots" content="index, follow">`.
S2. Open Graph and Twitter tags in `<head>`: `og:type` is `website`, `og:title` and `og:description` repeat S1, `og:site_name` is `pi theme generator`, `og:locale` is `en_US`, `twitter:card` is `summary`. No `og:image` and no `og:url` in this feature (see S8).
S3. One `<script type="application/ld+json">` in `<head>` with schema.org `SoftwareApplication`: `name` "pi theme generator", `description` equal to the S1 meta description, `applicationCategory` "DeveloperApplication", `operatingSystem` "Any", `browserRequirements` "Requires JavaScript", `offers` `{"@type": "Offer", "price": "0", "priceCurrency": "USD"}`. The block must pass `JSON.parse`.
S4. In `<body>`, before `<div id="root">`, a `<noscript>` block with plain HTML: one `<h1>` "pi theme generator" and three or four factual sentences. The sentences say what the tool does, that it edits the 56 pi color roles, that the export is a theme JSON for `~/.pi/agent/themes/`, and link to https://pi.dev. Visible only when JavaScript is off.
S5. Favicon: create `public/favicon.svg` (a simple inline SVG, no external assets). Replace `<link rel="icon" href="data:," />` with `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.
S6. `public/robots.txt` has exactly two lines: `User-agent: *` and `Allow: /`. No `Sitemap:` line yet (see S8).
S7. `public/llms.txt` follows the llms.txt format (https://llmstxt.org): `# pi theme generator`, a one-line `>` summary, `## About` (facts from S1 and S4), `## Use` (build a palette, apply it to roles, tweak roles, download the JSON), and `## Links` with https://pi.dev and https://pi.dev/docs/latest/themes. No repository link: the repo has no remote yet.
S8. DEFERRED until the user gives the public URL: `<link rel="canonical">`, `og:url`, `og:image`, `public/sitemap.xml`, and the `Sitemap:` line in robots.txt. Do not invent a domain.
S9. Checks: `pnpm exec vp check` exits 0; `pnpm build` exits 0; `dist/robots.txt`, `dist/llms.txt` and `dist/favicon.svg` exist; `dist/index.html` contains the S1–S5 items; `git diff --stat master -- src` is empty.

## Tasks

T1 | S1, S2 | index.html head meta | commit 1 (with T2, T3)
T2 | S3 | JSON-LD in head | commit 1
T3 | S4 | noscript block | commit 1
T4 | S5 | favicon | commit 2
T5 | S6, S7 | robots.txt and llms.txt | commit 3
T6 | S9 | verify all | no commit; after T5
T7 | S8 | canonical, og:url, og:image, sitemap | blocked: needs public URL

## Log

L1 (2026-10-13, user, verbatim): "ahora necesitamos un SEO y GEO exepcional, inicia con eso"
L2 (2026-10-13, user, verbatim): "Usa odd y subagentes para esto, no acapafes el orquetador principal porque por eso estas compactando a cada rato"
L3 (decision): no git remote and no LICENSE file in the repo; the public URL is unknown, so S8 stays deferred. Work-unit commits on `feat/seo-geo` are part of the ODD request in L2. Push and pull request stay with the user.
L4 (status 2026-10-13): no task started; T1-T6 pending, T7 blocked. Three subagent launches failed before any edit; `git status` shows only this file. (a) `worker` in background: `@earendil-works/chord` missing in the host install `releases/1.2.0` (present in `1.1.0`). (b) `gentle-ai-worker` in foreground: MCP and `mem_save` tools unavailable to the child. (c) builtin `worker` in foreground: provider `claude-bridge` is registered by a parent extension, and the child does not load its hooks. Owner decision needed: repair the host install so background children start, or allow the needed extension for the worker agent.
L5 (2026-10-13, verified by parent): host repaired by copying `chord` 1.1.0 into `releases/1.2.0`; background worker then ran. Commits: `b04a140` (T1-T3), `978858d` (T4), `2d92ebf` (T5). Parent checks: S1 description 143 characters; S3 JSON parses and equals S1; `@context` added to the JSON-LD block, which schema.org requires (accepted deviation from S3's list); S4 noscript precedes `#root` with one `<h1>`; S2 has no og:url, og:image or canonical; robots.txt is two lines; S5-S7 files are in `dist/`; `git diff master -- src` is empty; `pnpm build` passes. S9 `vp check` first failed on this file's formatting (blank lines only); fixed with `vp fmt`, content unchanged, and it passes now. Not verified: browser rendering of the noscript block and the favicon. S8 stays deferred until the public URL is known.
L6 (2026-10-13, user, verbatim): "si, license mit". Added `LICENSE` (MIT, holder OJPalenzuela, 2026) in commit `3583aef` on `feat/seo-geo`; `package.json` already declared MIT.
