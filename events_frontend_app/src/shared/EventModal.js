import React, { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";

function toIsoLocal(datetimeLocalValue) {
  if (!datetimeLocalValue) return null;
  // datetime-local comes without timezone; treat it as local and convert to ISO.
  const d = new Date(datetimeLocalValue);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function fromDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // Convert to yyyy-MM-ddTHH:mm for datetime-local (local time)
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

/**
 * PUBLIC_INTERFACE
 * EventModal is used for creating and editing events.
 */
export default function EventModal({ open, mode, initialValue, onClose, onSubmit, busy, error }) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) return;
    setTitle(initialValue?.title || initialValue?.name || "");
    setDate(fromDate(initialValue?.date || initialValue?.startTime || initialValue?.startsAt));
    setLocation(initialValue?.location || initialValue?.venue || initialValue?.address || "");
    setCategory(initialValue?.category || initialValue?.tag || "General");
    setDescription(initialValue?.description || initialValue?.summary || "");
  }, [open, initialValue]);

  const canSubmit = useMemo(() => title.trim().length >= 3 && location.trim().length >= 2, [title, location]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || busy) return;

    const payload = {
      title: title.trim(),
      date: toIsoLocal(date) || date || null,
      location: location.trim(),
      category: category.trim() || "General",
      description: description.trim()
    };

    await onSubmit(payload);
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit event" : "Create event"}>
      <form onSubmit={handleSubmit} className="form">
        <div className="formRow">
          <label className="label">
            Title
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sunset Run Club"
              autoFocus
              required
              minLength={3}
            />
          </label>
        </div>

        <div className="formGrid">
          <label className="label">
            Date & time
            <input className="input" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <label className="label">
            Category
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>General</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Food</option>
              <option>Tech</option>
              <option>Outdoors</option>
            </select>
          </label>
        </div>

        <div className="formRow">
          <label className="label">
            Location
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Central Park, NYC"
              required
              minLength={2}
            />
          </label>
        </div>

        <div className="formRow">
          <label className="label">
            Description
            <textarea
              className="input textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should attendees know?"
              rows={4}
            />
          </label>
        </div>

        {error ? (
          <div className="inlineError" role="alert">
            <Icon name="x" /> {String(error.message || "Request failed")}
          </div>
        ) : null}

        <div className="formActions">
          <button type="button" className="ghostButton" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="primaryButton" disabled={!canSubmit || busy}>
            {busy ? "Saving…" : isEdit ? "Save changes" : "Create event"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
