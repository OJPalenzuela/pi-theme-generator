import { useState } from "react";
import {
  GROUPS,
  DEFAULT_PALETTE,
  deriveRoles,
  buildTheme,
  toJson,
  fromJson,
  mergeTheme,
  fileName,
} from "./theme.js";
import Palette from "./Palette.jsx";
import ColorField from "./ColorField.jsx";
import Preview from "./Preview.jsx";
// Bundled, not fetched: a fetch of this path would 404 in the Vite build.
import presetText from "./presets/opencode.json?raw";

const EXPORT_KEYS = ["pageBg", "cardBg", "infoBg"];
const SECTIONS = [...GROUPS, ["Surfaces", EXPORT_KEYS]];
const BUTTON =
  "cursor-pointer rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-ink hover:bg-action";
const preset = fromJson(presetText);

export default function App() {
  const [name, setName] = useState(preset.name || "my-theme");
  const [colors, setColors] = useState(() => mergeTheme({}, preset));
  const [bases, setBases] = useState(DEFAULT_PALETTE.bases);
  const [tokens, setTokens] = useState(DEFAULT_PALETTE.tokens);
  const [status, setStatus] = useState({ message: "Loaded opencode preset", bad: false });
  // Bumped when values come from outside (preset, import, palette): rows remount and drop half-typed text.
  const [revision, setRevision] = useState(0);

  const setColor = (key, hex) => setColors((prev) => ({ ...prev, [key]: hex }));

  function loadTheme(theme, message) {
    if (theme.name) setName(theme.name);
    setColors((prev) => mergeTheme(prev, theme));
    setRevision((n) => n + 1);
    setStatus({ message, bad: false });
  }

  function applyPalette() {
    setColors((prev) => ({ ...prev, ...deriveRoles({ bases, tokens }) }));
    setRevision((n) => n + 1);
    setStatus({ message: "Applied palette to roles", bad: false });
  }

  async function importFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    // Cleared so picking the same file again still fires change.
    event.target.value = "";
    try {
      loadTheme(fromJson(await file.text()), `Imported ${file.name}`);
    } catch (error) {
      setStatus({ message: `Cannot import ${file.name}: ${error.message}`, bad: true });
    }
  }

  function download() {
    const label = name.trim() || "theme";
    let theme;
    try {
      theme = buildTheme({
        name: label,
        colors,
        pageBg: colors.pageBg,
        cardBg: colors.cardBg,
        infoBg: colors.infoBg,
      });
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

  return (
    <div className="flex h-screen flex-col bg-canvas font-sans text-[14px] leading-6 text-ink max-[1100px]:h-auto">
      <header className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-divider px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">pi theme generator</h1>
          <p className="text-[13px] text-muted">
            Create and export color themes for the pi coding agent
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label htmlFor="name" className="text-[13px] text-muted">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-[150px] rounded-md border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink"
          />
          <button
            type="button"
            className={BUTTON}
            onClick={() => loadTheme(preset, "Loaded opencode preset")}
          >
            Load opencode preset
          </button>
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
            Download JSON
          </button>
        </div>
        <p
          className={`min-h-[1.4em] w-full text-right text-xs ${status.bad ? "text-danger" : "text-muted"}`}
        >
          {status.message}
        </p>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[minmax(340px,440px)_minmax(0,1fr)] max-[1100px]:grid-cols-1">
        <section className="overflow-auto border-r border-divider px-6 pb-6 max-[1100px]:max-h-[60vh] max-[1100px]:border-r-0 max-[1100px]:border-b">
          <Palette
            bases={bases}
            tokens={tokens}
            onBase={(hue, hex) => setBases((prev) => ({ ...prev, [hue]: hex }))}
            onToken={(token, hue) => setTokens((prev) => ({ ...prev, [token]: hue }))}
            onApply={applyPalette}
          />
          {SECTIONS.map(([title, keys]) => (
            <section key={title}>
              <h2 className="mt-6 mb-2 text-[15px] font-semibold">{title}</h2>
              <ul>
                {keys.map((key) => (
                  <ColorField
                    key={`${key}-${revision}`}
                    label={key}
                    value={colors[key]}
                    onChange={(hex) => setColor(key, hex)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </section>
        <Preview colors={colors} />
      </main>
    </div>
  );
}
