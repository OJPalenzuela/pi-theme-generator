import { useState } from "react";
import RefSelect from "./RefSelect.jsx";

const HEX = /^#[0-9a-fA-F]{6}$/;

// One color: an optional hue/token link (roles only), then a picker and a hex field shown only while the color is custom (not linked). Invalid text is kept as a draft and never sent up.
export default function ColorField({ label, value, link, options, onLink, onChange }) {
  const [draft, setDraft] = useState(null);
  const invalid = draft !== null && !HEX.test(draft);
  const locked = Boolean(link);

  return (
    <li className="token-row">
      <span className="whitespace-nowrap">{label}</span>
      <span className="border-b border-dotted border-line" />
      <span className="flex items-center gap-2">
        {options && (
          <RefSelect
            label={`${label} token`}
            value={link ?? "custom"}
            color={locked ? value : undefined}
            options={[{ value: "custom", color: value }, ...options]}
            onChange={(ref) => {
              setDraft(null);
              onLink(ref);
            }}
          />
        )}
        {!locked && (
          <>
            <input
              type="color"
              aria-label={`${label} color`}
              value={value}
              onChange={(event) => {
                setDraft(null);
                onChange(event.target.value);
              }}
              className="size-4 cursor-pointer appearance-none border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-line"
            />
            <input
              type="text"
              maxLength={7}
              aria-label={`${label} hex`}
              value={draft ?? value}
              onChange={(event) => {
                const text = event.target.value;
                if (HEX.test(text)) {
                  setDraft(null);
                  onChange(text.toLowerCase());
                } else {
                  setDraft(text);
                }
              }}
              className={`w-20 rounded-[2px] border bg-transparent px-1 py-0.5 text-right font-mono text-[12px] ${invalid ? "border-danger text-danger" : "border-transparent hover:border-line"}`}
            />
          </>
        )}
      </span>
    </li>
  );
}
