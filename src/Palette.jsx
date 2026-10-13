import { HUES, TOKENS, STEPS, scale } from "./theme.js";
import ColorField from "./ColorField.jsx";

// The nine generated steps of one hue, lightest first.
function Strip({ base }) {
  const colors = scale(base);
  return (
    <span className="flex gap-0.5">
      {STEPS.map((step) => (
        <span
          key={step}
          className="size-3.5 rounded-sm border border-line"
          style={{ background: colors[step] }}
        />
      ))}
    </span>
  );
}

// Palette only fills roles when asked, so hand-edited roles are never overwritten silently.
export default function Palette({ bases, tokens, onBase, onToken, onApply }) {
  return (
    <>
      <h2 className="mt-6 mb-2 text-[15px] font-semibold">Hues</h2>
      <ul>
        {HUES.map((hue) => (
          <ColorField key={hue} label={hue} value={bases[hue]} onChange={(hex) => onBase(hue, hex)}>
            <Strip base={bases[hue]} />
          </ColorField>
        ))}
      </ul>

      <h2 className="mt-6 mb-2 text-[15px] font-semibold">Tokens</h2>
      <ul>
        {TOKENS.map((token) => (
          <li key={token} className="flex min-h-7 items-center gap-2 font-mono text-xs">
            <span className="whitespace-nowrap">{token}</span>
            <span className="min-w-3 flex-1 border-b border-dotted border-line" />
            <select
              value={tokens[token]}
              onChange={(event) => onToken(token, event.target.value)}
              className="rounded border border-line bg-surface px-1 py-0.5 font-mono text-xs text-ink"
            >
              {HUES.map((hue) => (
                <option key={hue} value={hue}>
                  {hue}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onApply}
        className="mt-4 cursor-pointer rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-ink hover:bg-action"
      >
        Apply palette to roles
      </button>
    </>
  );
}
