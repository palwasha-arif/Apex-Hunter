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
    <div className="surface-card trip-card h-full p-6 sm:p-8">
      <p className="eyebrow">Make time outside</p>
      <h2 className="section-title">Plan a safe first outing.</h2>
      <p className="mt-3 text-sm leading-6 text-stone-300">
        Sketch out your next trip. This starter keeps the plan in this browser
        session; saving trips to your account can be added with the API.
      </p>
      <div className="trip-detail-row mt-6 grid grid-cols-2 gap-3">
        <div className="trip-detail">
          <span aria-hidden="true">⌖</span>
          <div><small>GO SOMEWHERE</small><b>Past the trailhead</b></div>
        </div>
        <div className="trip-detail">
          <span aria-hidden="true">☼</span>
          <div><small>TAKE YOUR TIME</small><b>First light to dusk</b></div>
        </div>
      </div>
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
        <p className="mt-4 rounded-xl border border-lime-900 bg-lime-950/50 p-3 text-sm text-lime-200" role="status">
          Planned: {trip}
        </p>
      )}
    </div>
  );
}
