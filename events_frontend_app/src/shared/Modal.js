import React, { useEffect } from "react";
import Icon from "./Icon";

/**
 * PUBLIC_INTERFACE
 * Modal is an accessible dialog with backdrop and ESC close.
 */
export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button type="button" className="iconButton" aria-label="Close dialog" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
      <button type="button" className="backdrop" aria-label="Close dialog backdrop" onClick={onClose} />
    </>
  );
}
