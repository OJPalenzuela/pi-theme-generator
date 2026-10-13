import { useEffect, useRef, useState } from "react";

// Items are { label, hint?, danger?, disabled?, onSelect }. Closes on an outside click or Escape, like RefSelect.
export default function HeaderMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.type === "keydown" ? event.key === "Escape" : !ref.current.contains(event.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="More theme actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-[2px] bg-action px-3 text-[13px] leading-7 text-ink"
      >
        ···
      </button>
      {open && (
        <ul role="menu" className="absolute right-0 z-10 mt-1 w-56 bg-surface py-1 shadow-md">
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={`block w-full cursor-pointer px-3 py-1.5 text-left hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none disabled:cursor-default disabled:opacity-40 ${item.danger ? "text-danger" : "text-ink"}`}
              >
                <span className="block text-[13px]">{item.label}</span>
                {item.hint && <span className="block text-[12px] text-muted">{item.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
