import { Fragment, useRef, useState } from "react";
import useDismiss from "./useDismiss.js";

// Name with a square of its color. Only the swatch carries color.
export function Swatch({ color }) {
  return (
    <span
      className="h-3 w-4 shrink-0 rounded-[2px] shadow-[inset_0_0_0_0.5px_#8080803d]"
      style={{ background: color }}
    />
  );
}

// Options are { value, color, group? }; a group name becomes a heading above its first option. The trigger swatch is shown only when a color is passed.
export default function RefSelect({ label, value, color, options, onChange }) {
  const [open, setOpen] = useState(false);
  // The list opens upward near the bottom of the panel, where a downward list would sit below the scroll area.
  const [up, setUp] = useState(false);
  const ref = useRef(null);
  useDismiss(ref, open, setOpen);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setUp(window.innerHeight - ref.current.getBoundingClientRect().bottom < 300);
          setOpen(!open);
        }}
        className="flex min-h-7 cursor-pointer items-center justify-end gap-2 font-mono text-[12px]"
      >
        <span>{value}</span>
        {color && <Swatch color={color} />}
      </button>
      {open && (
        <div
          role="listbox"
          aria-label={label}
          className={`absolute right-0 z-10 max-h-72 w-44 overflow-y-auto bg-surface py-1 font-mono text-[12px] shadow-md ${up ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          {options.map((option, i) => (
            <Fragment key={option.value}>
              {option.group && option.group !== options[i - 1]?.group && (
                <p className="px-2 pt-2 pb-1 text-[11px] text-muted">{option.group}</p>
              )}
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-3 px-2 py-1.5 text-left hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none"
              >
                <span className="min-w-0 flex-1 truncate">{option.value}</span>
                <Swatch color={option.color} />
              </button>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
