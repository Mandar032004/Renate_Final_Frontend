import { useNavigate } from "react-router-dom";

export default function AIRecommendationCard({ matchCount = 12, jobId }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl shadow-xl shadow-primary/20 text-white overflow-hidden group">
      {/* Flex column fills the card height; decorative icon sits in-flow at the end */}
      <div className="flex flex-col h-full gap-4">

        {/* Top row: icon badge + status pill */}
        <div className="flex items-start justify-between gap-4">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md shrink-0">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest bg-white/20 px-2 py-1 rounded uppercase whitespace-nowrap">
            System Active
          </span>
        </div>

        {/* Middle: label + heading */}
        <div className="flex-1">
          <p className="text-primary-fixed/80 font-medium text-sm">AI Recommendation Engine</p>
          <h3 className="text-2xl font-bold font-headline mt-1">
            {matchCount} Top Matches Found
          </h3>
        </div>

        {/* Bottom row: CTA + decorative icon in-flow */}
        <div className="flex items-end justify-between gap-4">
          <button
            onClick={() => jobId && navigate(`/jobs/${jobId}`)}
            className="flex items-center gap-2 text-sm font-bold bg-white text-primary-container px-4 py-2 rounded-lg hover:scale-105 transition-transform shrink-0"
          >
            Review Matches
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          {/* Decorative — in normal flow, no absolute positioning */}
          <span className="material-symbols-outlined text-[72px] opacity-10 group-hover:scale-110 transition-transform duration-700 leading-none select-none">
            auto_awesome
          </span>
        </div>
      </div>
    </div>
  );
}
