import { useEffect } from "react";

// Closes an open popup on a click outside ref, or on Escape. Only listens while open.
export default function useDismiss(ref, open, setOpen) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (event) => {
      if (!ref.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, ref, setOpen]);
}
