import React from "react";
import Icon from "./Icon";

/**
 * PUBLIC_INTERFACE
 * EmptyState provides a consistent empty view with optional call-to-action.
 */
export default function EmptyState({ title, body, actionLabel, onAction }) {
  return (
    <div className="emptyState">
      <div className="emptyState__icon" aria-hidden="true">
        <Icon name="calendar" size={22} />
      </div>
      <div className="emptyState__title">{title}</div>
      <div className="emptyState__body">{body}</div>
      {actionLabel ? (
        <button type="button" className="primaryButton" onClick={onAction}>
          <Icon name="plus" /> {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
