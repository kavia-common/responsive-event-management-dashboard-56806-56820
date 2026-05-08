import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, deleteEvent, listEvents, updateEvent } from "../api/events";
import Icon from "../shared/Icon";
import EventCard from "../shared/EventCard";
import EventModal from "../shared/EventModal";
import MapPanel from "../shared/MapPanel";
import EmptyState from "../shared/EmptyState";

/**
 * PUBLIC_INTERFACE
 * EventsPage shows the event feed and a map view, plus create/edit modals.
 */
export default function EventsPage() {
  const qc = useQueryClient();
  const [view, setView] = useState("feed"); // 'feed' | 'map'
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
    staleTime: 15_000
  });

  const events = useMemo(() => {
    const data = eventsQuery.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return [];
  }, [eventsQuery.data]);

  const createMut = useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["events"] });
      setModalOpen(false);
      setEditing(null);
    }
  });

  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => updateEvent(id, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["events"] });
      setModalOpen(false);
      setEditing(null);
    }
  });

  const deleteMut = useMutation({
    mutationFn: deleteEvent,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["events"] });
    }
  });

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(evt) {
    setEditing(evt);
    setModalOpen(true);
  }

  async function onSubmit(payload) {
    if (editing && (editing.id || editing._id)) {
      const id = editing.id || editing._id;
      return updateMut.mutateAsync({ id, payload });
    }
    return createMut.mutateAsync(payload);
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="tabs" role="tablist" aria-label="Event views">
          <button
            type="button"
            className={`tab ${view === "feed" ? "tab--active" : ""}`}
            onClick={() => setView("feed")}
            role="tab"
            aria-selected={view === "feed" ? "true" : "false"}
          >
            <Icon name="calendar" /> Feed
          </button>
          <button
            type="button"
            className={`tab ${view === "map" ? "tab--active" : ""}`}
            onClick={() => setView("map")}
            role="tab"
            aria-selected={view === "map" ? "true" : "false"}
          >
            <Icon name="map" /> Map
          </button>
        </div>

        <div className="pageHeader__actions">
          <button type="button" className="primaryButton" onClick={openCreate}>
            <Icon name="plus" /> Create event
          </button>
        </div>
      </div>

      {eventsQuery.isLoading ? (
        <div className="skeletonGrid" aria-busy="true" aria-label="Loading events">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeletonCard" key={i} />
          ))}
        </div>
      ) : eventsQuery.isError ? (
        <div className="errorPanel" role="alert">
          <div className="errorPanel__title">Couldn’t load events</div>
          <div className="errorPanel__body">
            {String(eventsQuery.error?.message || "Unknown error")}
            <div className="errorPanel__hint">
              Ensure <span className="mono">REACT_APP_API_BASE</span> or{" "}
              <span className="mono">REACT_APP_BACKEND_URL</span> points to your backend.
            </div>
          </div>
        </div>
      ) : view === "map" ? (
        <MapPanel events={events} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events yet"
          body="Create your first event to populate the feed and map."
          actionLabel="Create event"
          onAction={openCreate}
        />
      ) : (
        <div className="eventGrid">
          {events.map((evt) => (
            <EventCard
              key={evt.id || evt._id || `${evt.title}-${evt.date}-${evt.location}`}
              event={evt}
              onEdit={() => openEdit(evt)}
              onDelete={() => deleteMut.mutate(evt.id || evt._id)}
              deleting={deleteMut.isPending}
            />
          ))}
        </div>
      )}

      <EventModal
        open={modalOpen}
        mode={editing ? "edit" : "create"}
        initialValue={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        busy={createMut.isPending || updateMut.isPending}
        error={createMut.error || updateMut.error}
      />
    </div>
  );
}
