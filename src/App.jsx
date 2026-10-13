import { useState } from "react";
import {
  GROUPS,
  HUES,
  NEW_HUE_BASE,
  DEFAULT_PALETTE,
  ROLE_REFS,
  paletteScales,
  refOptions,
  resolveRef,
  buildTheme,
  toJson,
  fromJson,
  mergeTheme,
  fileName,
} from "./theme.js";
import Palette from "./Palette.jsx";
import ColorField from "./ColorField.jsx";
import Preview from "./Preview.jsx";
import HeaderMenu from "./HeaderMenu.jsx";
import Modal from "./Modal.jsx";
// Bundled, not fetched: a fetch of this path would 404 in the Vite build.
import presetText from "./presets/default.json?raw";

const EXPORT_KEYS = ["pageBg", "cardBg", "infoBg"];
// Roles can link to the palette; surfaces stay hex.
const SECTIONS = [
  ...GROUPS.map(([title, keys]) => [title, keys, true]),
  ["Surfaces", EXPORT_KEYS, false],
];
const BUTTON = "cursor-pointer rounded-[2px] bg-action px-3 text-[13px] leading-7 text-ink";
const preset = fromJson(presetText);
const PREVIEW_ROWS = 4;

// A section shows its first rows until "View all tokens" opens the rest.
function Group({ title, keys, colors, links, options, onColor, onLink, revision }) {
  const [all, setAll] = useState(false);
  return (
    <section>
      <h2 className="panel-heading mt-4">{title}</h2>
      <ul>
        {(all ? keys : keys.slice(0, PREVIEW_ROWS)).map((key) => (
          <ColorField
            key={`${key}-${revision}`}
            label={key}
            value={colors[key]}
            link={links[key]}
            options={options}
            onLink={(ref) => onLink(key, ref)}
            onChange={(hex) => onColor(key, hex)}
          />
        ))}
      </ul>
      {keys.length > PREVIEW_ROWS && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-2 cursor-pointer rounded-[2px] border border-line px-3 text-[12px] leading-7 text-muted hover:text-ink"
        >
          {all ? "Show fewer tokens" : "View all tokens"}
        </button>
      )}
    </section>
  );
}

// Why a theme name cannot be used, or "" when it can. The current name is never a clash with itself.
function renameProblem(next, current, names) {
  if (!next) return "Name cannot be empty";
  if (next !== current && names.includes(next)) return "That name is already used";
  return "";
}

export default function App() {
  const [name, setName] = useState(preset.name || "my-theme");
  // Hex values, used by every color that is not linked to the palette.
  const [custom, setCustom] = useState(() => mergeTheme({}, preset));
  // Role -> "hue.step" or "token.step"; a linked role follows the palette live.
  const [links, setLinks] = useState({});
  const [hues, setHues] = useState(HUES);
  const [bases, setBases] = useState(DEFAULT_PALETTE.bases);
  // "hue.step" -> hex for single steps the user set by hand.
  const [overrides, setOverrides] = useState({});
  const [tokens, setTokens] = useState(DEFAULT_PALETTE.tokens);
  const [status, setStatus] = useState({ message: "Loaded default preset", bad: false });
  // Bumped when values come from outside (preset, import, palette): rows remount and drop half-typed text.
  const [revision, setRevision] = useState(0);
  // Each theme keeps a snapshot of its editor state; the current theme's snapshot is taken when you switch away.
  const [themes, setThemes] = useState([{ id: 0, state: null }]);
  const [currentId, setCurrentId] = useState(0);
  const [source, setSource] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState("");

  const scales = paletteScales(bases, overrides);
  const colors = {
    ...custom,
    ...Object.fromEntries(
      Object.entries(links).map(([role, ref]) => [role, resolveRef(ref, scales, tokens)]),
    ),
  };
  const options = refOptions(hues, scales, tokens);

  // Only custom colors show the hex field, so a hex write never touches links.
  const setColor = (key, hex) => setCustom((prev) => ({ ...prev, [key]: hex }));

  // "custom" keeps the color the role shows now as its hex, then unlinks it.
  function setLink(key, ref) {
    if (ref === "custom") setCustom((prev) => ({ ...prev, [key]: colors[key] }));
    setLinks((prev) => {
      const next = { ...prev };
      if (ref === "custom") delete next[key];
      else next[key] = ref;
      return next;
    });
  }

  function loadTheme(theme, message) {
    if (theme.name) setName(theme.name);
    setCustom(mergeTheme(colors, theme));
    setLinks({});
    setRevision((n) => n + 1);
    setStatus({ message, bad: false });
  }

  // Links every role to its default reference, so the roles follow the palette from now on.
  function applyPalette() {
    setLinks(ROLE_REFS);
    setRevision((n) => n + 1);
    setStatus({ message: "Applied palette to roles", bad: false });
  }

  // Step 200 of a hue is its base (the other steps derive from it); any other step, and gray's 200, is set alone.
  function setStep(hue, step, hex) {
    if (step === 200 && hue !== "gray") setBases((prev) => ({ ...prev, [hue]: hex }));
    else setOverrides((prev) => ({ ...prev, [`${hue}.${step}`]: hex }));
  }

  // New hues get the next free name (hue-1, hue-2, ...) and a default base the user can change.
  function addHue() {
    let n = 1;
    while (hues.includes(`hue-${n}`)) n++;
    const hue = `hue-${n}`;
    setHues((prev) => [...prev, hue]);
    setBases((prev) => ({ ...prev, [hue]: NEW_HUE_BASE }));
  }

  async function importFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    // Cleared so picking the same file again still fires change.
    event.target.value = "";
    try {
      const imported = fromJson(await file.text());
      // A name another theme already uses is not taken, so the list never shows two equal names.
      if (renameProblem(imported.name, name, names)) imported.name = "";
      loadTheme(imported, `Imported ${file.name}`);
    } catch (error) {
      setStatus({ message: `Cannot import ${file.name}: ${error.message}`, bad: true });
    }
  }

  function buildCurrent(label) {
    return buildTheme({
      name: label,
      colors,
      pageBg: colors.pageBg,
      cardBg: colors.cardBg,
      infoBg: colors.infoBg,
    });
  }

  function download() {
    const label = name.trim() || "theme";
    let theme;
    try {
      theme = buildCurrent(label);
    } catch (error) {
      setStatus({ message: error.message, bad: true });
      return;
    }
    const url = URL.createObjectURL(new Blob([toJson(theme)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName(label);
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ message: `Downloaded ${link.download}`, bad: false });
  }

  const snapshot = () => ({ name, custom, links, hues, bases, overrides, tokens });
  const names = themes.map((t) => (t.id === currentId ? name : t.state.name));
  // Writes a state back into the editor; bumping revision remounts the rows.
  function restore(state) {
    setName(state.name);
    setCustom(state.custom);
    setLinks(state.links);
    setHues(state.hues);
    setBases(state.bases);
    setOverrides(state.overrides);
    setTokens(state.tokens);
    setRevision((n) => n + 1);
  }
  // The list with the current theme's live state saved into it.
  const stash = () => themes.map((t) => (t.id === currentId ? { ...t, state: snapshot() } : t));
  const defaultState = (label) => ({
    name: label,
    custom: mergeTheme({}, preset),
    links: {},
    hues: HUES,
    bases: DEFAULT_PALETTE.bases,
    overrides: {},
    tokens: DEFAULT_PALETTE.tokens,
  });

  function switchTo(id) {
    if (id === currentId) return;
    const target = themes.find((t) => t.id === id);
    setThemes(stash());
    restore(target.state);
    setCurrentId(id);
  }

  function newTheme() {
    let label = "new-theme";
    for (let i = 2; names.includes(label); i++) label = `new-theme-${i}`;
    const id = Math.max(...themes.map((t) => t.id)) + 1;
    const fresh = defaultState(label);
    setThemes([...stash(), { id, state: fresh }]);
    restore(fresh);
    setCurrentId(id);
    setStatus({ message: `Created ${label}`, bad: false });
  }

  // Reset keeps the current name and replaces colors, links and palette.
  function reset() {
    restore(defaultState(name));
    setStatus({ message: "Reset to default theme", bad: false });
  }

  function deleteTheme() {
    const rest = themes.filter((t) => t.id !== currentId);
    if (rest.length === 0) return;
    setStatus({ message: `Deleted ${name}`, bad: false });
    setThemes(rest);
    restore(rest[0].state);
    setCurrentId(rest[0].id);
  }

  function openSource() {
    try {
      setSource(toJson(buildCurrent(name.trim() || "theme")));
    } catch (error) {
      setStatus({ message: error.message, bad: true });
    }
  }

  function openRename() {
    setDraft(name);
    setRenaming(true);
  }

  function rename() {
    if (renameError) return;
    setName(draft.trim());
    setRenaming(false);
    setStatus({ message: `Renamed to ${draft.trim()}`, bad: false });
  }
  const trimmed = draft.trim();
  const renameError = renameProblem(trimmed, name, names);

  return (
    <div className="flex h-screen flex-col bg-canvas p-5 font-sans text-[13px] text-ink transition-colors duration-150 max-[1100px]:h-auto">
      <header className="mb-6 flex flex-wrap items-start gap-x-6 gap-y-3">
        <div className="pl-4">
          <h1 className="text-[22px] leading-tight font-semibold">pi theme generator</h1>
          <p className="mt-1.5 text-[13px] leading-[1.4] text-muted">
            Create and export color themes for the pi coding agent
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label htmlFor="theme" className="text-[13px] text-muted">
            Theme:
          </label>
          <div className="relative">
            <select
              id="theme"
              value={currentId}
              onChange={(event) => switchTo(Number(event.target.value))}
              className="cursor-pointer appearance-none rounded-[2px] bg-action py-0 pr-7 pl-2.5 text-[13px] leading-7 text-ink outline-none"
            >
              {themes.map((t, i) => (
                <option key={t.id} value={t.id}>
                  {names[i]}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[10px] text-muted"
            >
              ▾
            </span>
          </div>
          <label
            className={`relative ${BUTTON} has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink`}
          >
            Import
            <input
              type="file"
              accept=".json,application/json"
              onChange={importFile}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
          </label>
          <button type="button" className={BUTTON} onClick={download}>
            Export
          </button>
          <HeaderMenu
            items={[
              { label: "New", onSelect: newTheme },
              { label: "Source", hint: "View the JSON", onSelect: openSource },
              { label: "Reset", hint: "Reset to default theme", onSelect: reset },
              { label: "Rename", onSelect: openRename },
              { label: "Delete", danger: true, disabled: themes.length < 2, onSelect: deleteTheme },
            ]}
          />
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[522px_minmax(0,1fr)] gap-4 max-[1100px]:grid-cols-1">
        <section className="overflow-auto px-4 pb-4 max-[1100px]:max-h-[60vh]">
          <Palette
            hues={hues}
            scales={scales}
            tokens={tokens}
            onStep={setStep}
            onToken={(token, hue) => setTokens((prev) => ({ ...prev, [token]: hue }))}
            onAddHue={addHue}
            onApply={applyPalette}
          />
          {SECTIONS.map(([title, keys, linkable]) => (
            <Group
              key={title}
              title={title}
              keys={keys}
              colors={colors}
              links={links}
              options={linkable ? options : undefined}
              onColor={setColor}
              onLink={setLink}
              revision={revision}
            />
          ))}
        </section>
        <div className="flex min-h-0 flex-col">
          <Preview colors={colors} />
          <p className={`mt-2 min-h-[1.4em] text-xs ${status.bad ? "text-danger" : "text-muted"}`}>
            {status.message}
          </p>
        </div>
      </main>

      <Modal open={source !== null} title="Source" onClose={() => setSource(null)}>
        <pre className="mb-3 max-h-[60vh] overflow-auto bg-canvas p-3 font-mono text-[12px] leading-5">
          {source}
        </pre>
        <div className="flex justify-end">
          <button type="button" className={BUTTON} onClick={() => setSource(null)}>
            Close
          </button>
        </div>
      </Modal>

      <Modal open={renaming} title="Rename theme" onClose={() => setRenaming(false)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            rename();
          }}
        >
          <input
            type="text"
            aria-label="Theme name"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-full rounded-[2px] bg-action px-2.5 text-[13px] leading-7 text-ink outline-none"
          />
          <p className="mt-2 min-h-[1.4em] text-xs text-danger">{renameError}</p>
          <div className="mt-3 flex justify-end gap-2">
            <button type="button" className={BUTTON} onClick={() => setRenaming(false)}>
              Cancel
            </button>
            <button type="submit" className={BUTTON} disabled={renameError !== ""}>
              Rename
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
