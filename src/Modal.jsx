import { useEffect, useRef } from "react";

// Native <dialog>: focus trap, Escape and the backdrop come from the browser. onClose runs however it closes.
export default function Modal({ open, title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[min(640px,calc(100vw-2rem))] bg-surface p-5 text-ink backdrop:bg-black/50"
    >
      <h2 className="mb-3 text-[15px] font-semibold">{title}</h2>
      {open && children}
    </dialog>
  );
}
