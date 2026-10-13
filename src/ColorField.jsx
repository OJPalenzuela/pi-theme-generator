import { useState } from "react";

const HEX = /^#[0-9a-fA-F]{6}$/;

// One color: a picker and a hex field. Invalid text is kept as a draft and never sent up.
export default function ColorField({ label, value, onChange, children }) {
  const [draft, setDraft] = useState(null);
  const invalid = draft !== null && !HEX.test(draft);

  return (
    <li className="flex min-h-7 items-center gap-2 font-mono text-xs">
      <span className="whitespace-nowrap">{label}</span>
      <span className="min-w-3 flex-1 border-b border-dotted border-line" />
      {children}
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
        className={`w-20 rounded border bg-transparent px-1 py-0.5 text-right font-mono text-xs ${invalid ? "border-danger text-danger" : "border-transparent hover:border-line"}`}
      />
    </li>
  );
}
