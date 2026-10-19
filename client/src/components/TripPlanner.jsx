import { useState } from "react";

export default function TripPlanner() {
  const [tripName, setTripName] = useState("");
  const [trip, setTrip] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = tripName.trim();
    if (!name) return;
    setTrip(name);
    setTripName("");
  }

  return (
    <div className="surface-card h-full p-6 sm:p-7">
      <p className="eyebrow">Make time outside</p>
      <h2 className="section-title">Trip planner</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Sketch out your next trip. This starter keeps the plan in this browser
        session; saving trips to your account can be added with the API.
      </p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="trip-name">
          Trip name
        </label>
        <input
          className="field-input min-w-0 flex-1"
          id="trip-name"
          maxLength={80}
          onChange={(event) => setTripName(event.target.value)}
          placeholder="e.g. October ridge camp"
          value={tripName}
        />
        <button className="button-primary justify-center" type="submit">
          Add trip
        </button>
      </form>
      {trip && (
        <p className="mt-4 rounded-xl border border-emerald-900 bg-emerald-950/50 p-3 text-sm text-emerald-200" role="status">
          Planned: {trip}
        </p>
      )}
    </div>
  );
}
