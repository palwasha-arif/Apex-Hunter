export default function AIGuideGenerator() {
  return (
    <div className="surface-card h-full p-6 sm:p-7">
      <p className="eyebrow">Knowledge for the field</p>
      <h2 className="section-title">AI field guide</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        The guide generator is ready for a Gemini API connection. Add your own
        key to the server environment when you’re ready to enable it.
      </p>
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-sm font-medium text-slate-200">To enable AI guides</p>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-400">
          <li>Get a Gemini API key from Google AI Studio.</li>
          <li>Set GEMINI_API_KEY in server/.env.</li>
          <li>Implement and connect the guide-generation endpoint.</li>
        </ol>
      </div>
    </div>
  );
}
