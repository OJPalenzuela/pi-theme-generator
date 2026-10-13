import { TOKENS, STEPS } from "./theme.js";
import RefSelect from "./RefSelect.jsx";

// Palette only fills roles when asked, so hand-edited roles are never overwritten silently.
// Every cell is a color input. Step 200 of a hue is its base; the other steps derive from it unless set by hand.
export default function Palette({ hues, scales, tokens, onStep, onToken, onAddHue, onApply }) {
  const hueOptions = hues.map((hue) => ({ value: hue, color: scales[hue][200] }));
  return (
    <>
      <h2 className="panel-heading">Hues</h2>
      <div>
        <div className="grid h-6 grid-cols-[76px_repeat(9,46px)] items-center font-mono text-[11px] text-muted">
          <span />
          {STEPS.map((step) => (
            <span key={step} className="text-center">
              {step}
            </span>
          ))}
        </div>
        {hues.map((hue) => {
          const colors = scales[hue];
          return (
            <div key={hue} className="grid h-8 grid-cols-[76px_repeat(9,46px)] items-center">
              <span className="font-mono text-[11px] font-medium">{hue}</span>
              {STEPS.map((step) => (
                <span
                  key={step}
                  className="relative h-8 cursor-default hover:z-20 after:pointer-events-none after:absolute after:-inset-px after:border-2 after:border-transparent after:content-[''] hover:after:border-hover-ring"
                  style={{ background: colors[step] }}
                >
                  <input
                    type="color"
                    aria-label={`Edit ${hue}.${step}`}
                    title={colors[step]}
                    value={colors[step]}
                    onChange={(event) => onStep(hue, step, event.target.value)}
                    className="absolute inset-0 size-full cursor-default opacity-0"
                  />
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onAddHue}
        className="mt-2 cursor-pointer text-[12px] text-muted hover:text-ink"
      >
        + Add hue
      </button>

      <h2 className="panel-heading mt-4">Tokens</h2>
      <ul>
        {TOKENS.map((token) => (
          <li key={token} className="token-row">
            <span className="whitespace-nowrap">{token}</span>
            <span className="border-b border-dotted border-line" />
            <RefSelect
              label={`${token} hue`}
              value={tokens[token]}
              color={scales[tokens[token]][200]}
              options={hueOptions}
              onChange={(hue) => onToken(token, hue)}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onApply}
        className="mt-4 cursor-pointer rounded-[2px] bg-action px-3 text-[13px] leading-7 text-ink"
      >
        Apply palette to roles
      </button>
    </>
  );
}
