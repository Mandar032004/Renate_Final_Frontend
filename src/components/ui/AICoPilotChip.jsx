export default function AICoPilotChip({ message = "New candidate matching pattern found." }) {
  return (
    <div className="fixed bottom-10 right-10 z-40">
      <div className="glass-panel bg-secondary-container text-on-secondary-container px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-primary/10">

        {/* Pulsing icon */}
        <div className="flex h-10 w-10 items-center justify-center bg-primary-container rounded-full shadow-[0_0_15px_rgba(85,34,153,0.4)]">
          <span
            className="material-symbols-outlined text-white text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_fix_high
          </span>
        </div>

        {/* Text */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">AI Co-Pilot</p>
          <p className="text-sm font-bold">{message}</p>
        </div>

        {/* CTA */}
        <button className="ml-4 text-xs font-black uppercase text-primary border-b-2 border-primary/20 hover:border-primary transition-all">
          Expand Insight
        </button>
      </div>
    </div>
  );
}
