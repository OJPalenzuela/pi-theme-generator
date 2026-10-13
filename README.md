# pi theme generator

Browser tool to create and export color themes for the [pi](https://pi.dev) coding agent.
Build a palette, apply it to the 56 color roles, tweak any role by hand, see the result on a preview, and download a theme JSON for `~/.pi/agent/themes/`.

Stack: React 19, Tailwind CSS 4 and Vite+ (`vp`). The color logic in `src/theme.js` has no framework dependency and is covered by Vitest through `vp test`.

## Run

```bash
pnpm install         # once, pulls in React, Tailwind and Vite+
pnpm start           # Vite dev server at http://localhost:8000
pnpm build           # static build in dist/
pnpm preview         # serves dist/ at http://localhost:8000
```

Open the page through Vite. Browsers block ES modules from `file://`.

## Use

- **Hues** sets one base color per hue. Each hue gets 9 steps: 100 drifts toward white, 900 toward black, and the base sits at 200.
- **Tokens** pick which hue plays `accent`, `interactive` and `neutral`.
- **Apply palette to roles** fills every role from the palette. It only runs when you click, so hand edits are not overwritten silently.
- **Theme** switches between themes kept in the page; **New**, **Rename** and **Delete** manage them. Themes live in memory until you reload the page.
- **Source** shows the theme JSON. **Reset** restores the built-in dark palette in the current theme.
- **Export** downloads `<name>.json`.
- **Import** reads a pi theme JSON into the current theme; `vars` references are resolved to hex. A name another theme already uses is not taken.

## Notes

- The preset uses `#0000ee` for ANSI index 4 (`border`, `accent`, `borderAccent` in the source theme). Pi allows ANSI indexes, but this tool exports hex only, so those three values are an approximation of your terminal's blue.
- The preview shows most roles, not all 59.

## Test

```bash
pnpm test            # runs vp test (Vitest)
```
