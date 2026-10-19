import { useState } from "react";
import { generateAIGuide } from "../services/api";

export default function AIGuideGenerator() {
  const [targetGame, setTargetGame] = useState("");
  const [region, setRegion] = useState("");
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setGuide(null);
    setLoading(true);

    try {
      const result = await generateAIGuide({ targetGame, region });
      setGuide(result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface-card guide-card h-full overflow-hidden">
      <div className="guide-photo">
        <span className="guide-photo-label">READ THE LAND</span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="eyebrow">Knowledge for the field</p>
        <h2 className="section-title">Ask the field guide.</h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          Get a beginner-friendly overview. Always confirm seasons and
          regulations with your local wildlife authority.
        </p>
        <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
          <label className="grid gap-1.5 text-xs font-semibold text-stone-300" htmlFor="guide-topic">
            Wildlife or topic
            <input
              autoComplete="off"
              className="field-input"
              id="guide-topic"
              maxLength={80}
              onChange={(event) => setTargetGame(event.target.value)}
              placeholder="e.g. elk habitat"
              required
              value={targetGame}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-stone-300" htmlFor="guide-region">
            General region
            <input
              autoComplete="off"
              className="field-input"
              id="guide-region"
              maxLength={120}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="e.g. Rocky Mountains"
              required
              value={region}
            />
          </label>
          <button className="button-primary mt-1 justify-center" disabled={loading} type="submit">
            {loading ? "Preparing your guide…" : "Generate field guide"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-xl border border-red-900/70 bg-red-950/50 p-3 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        {guide && (
          <article className="guide-note mt-5 rounded-xl p-4" aria-live="polite">
            <h3 className="text-lg font-bold text-lime-200">{guide.title}</h3>
            {[
              ["Habitat notes", guide.habitatNotes],
              ["Observation tips", guide.trackingTips],
              ["Useful gear", guide.recommendedGear],
              ["Safety reminders", guide.safetyWarnings],
            ].map(([heading, items]) =>
              Array.isArray(items) && items.length > 0 ? (
                <section className="mt-4" key={heading}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">{heading}</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-stone-300">
                    {items.map((item, index) => <li key={`${heading}-${index}`}>{item}</li>)}
                  </ul>
                </section>
              ) : null
            )}
            {guide.regulationsReminder && (
              <p className="mt-4 border-t border-white/10 pt-3 text-sm leading-6 text-lime-100">
                {guide.regulationsReminder}
              </p>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
