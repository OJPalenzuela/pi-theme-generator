# React + Tailwind migration

Scope: replace the vanilla DOM UI (src/app.js, inline CSS in index.html) with React 19 and Tailwind CSS 4 on Vite 8. Pure logic in src/theme.js stays framework-free.
Owner: parent session. Verify: independent check after implementation (new dependencies).

## Specs

- S1 "Hay que migrar este repo a react y tailwind css en sus ultimas versiones" (latest published versions at migration time).
- S2 Behavior unchanged: Load opencode preset, Import, Download JSON, Hues + Tokens + "Apply palette to roles", role rows with color picker and hex text, invalid hex marked, status line, preview of the pi roles.
- S3 `npm test`, `npm run build`, `npm start` (port 8000), `npm run preview` keep working.
- S4 No Python. No change to the exported JSON format (buildTheme output unchanged).

## Tasks

- T1 S1,S3 — install react, react-dom, tailwindcss, @tailwindcss/vite, @vitejs/plugin-react; vite.config.js.
- T2 S2,S4 — move the role-merge and file-name logic from app.js into src/theme.js with tests (TDD: RED then GREEN).
- T3 S2 — React UI: src/main.jsx, src/App.jsx, src/Palette.jsx, src/ColorField.jsx, src/Preview.jsx.
- T4 S2 — Tailwind styles in src/index.css; index.html becomes the React mount point.
- T5 S3 — README and package.json scripts reflect React + Tailwind.
- T6 S1–S4 — verify in browser (screens, console, flows), then independent verify.

## Log

- L1 Hay que migrar este repo a react y tailwind css en sus ultimas versiones
- L2 Evidence: T1-T5 done. npm test 15/15; npm run build exit 0; browser on :8000: 14 sections, 59 role rows, 0 console errors, invalid hex cleared by preset load, palette apply sets accent. Latest versions checked against the npm registry (react 19.3.0, tailwindcss 4.3.3, @vitejs/plugin-react 6.1.2, vite 8.3.4). Dark mode not exercised in the browser.
- L3 Independent verify (read-only): S1, S3, S4 PASS; S2 UNVERIFIED in its own run, covered by the parent browser checks above.
- L4 Incident: the verify subagent was told to stop whatever listened on :8000 and killed a process it did not start. Ownership of that process is unknown and it cannot be restored. Not repeated.
- L5 Commits: none. The repo has no commits and the policy requires an explicit user request, so the work-unit commit step awaits a decision.
