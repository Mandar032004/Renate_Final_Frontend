import { Link } from "react-router-dom";

const statusStyles = {
  Scheduled: {
    wrapper: "bg-primary-fixed text-primary",
    icon: "event_available",
  },
  "In Review": {
    wrapper: "bg-surface-container text-on-surface-variant",
    icon: "visibility",
  },
};

export default function CandidateCard({ candidate }) {
  const { name, title, score, result, highlight, status, avatar, slug } = candidate;
  const style = statusStyles[status] ?? statusStyles["In Review"];

  return (
    <Link
      to={`/candidate/${slug}`}
      className="block bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
    >
      <div className="flex items-center gap-8">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="h-16 w-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-lg font-bold text-on-surface">{name}</h4>
            <span className="text-xs font-medium text-on-surface-variant">{title}</span>
          </div>
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            {/* Score badge */}
            <div className="flex items-center gap-2 bg-secondary-container/30 px-3 py-1 rounded-full shrink-0">
              <span
                className="material-symbols-outlined text-sm text-on-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="text-xs font-bold text-on-secondary-container">
                {score} {result}
              </span>
            </div>
            {/* Highlight */}
            <p className="text-sm text-on-surface-variant line-clamp-1 min-w-0">
              <span className="font-bold text-primary">Key Highlight:</span> {highlight}
            </p>
          </div>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Status</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs ${style.wrapper}`}>
              <span className="material-symbols-outlined text-xs">{style.icon}</span>
              {status}
            </div>
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
