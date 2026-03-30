/**
 * StatCard — reusable metric card.
 *
 * Props:
 *   variant: "candidates" | "validated"
 *   value:   primary number string  e.g. "1,248"
 *   total:   denominator string     e.g. "1,248"  (validated variant only)
 *   label:   card heading string
 *   badge:   trend/badge string     e.g. "+12%"   (candidates variant only)
 *   progress: 0-100 number          (validated variant only)
 *   batchLabel: string              (validated variant only)
 */
export default function StatCard({
  variant = "candidates",
  value,
  total,
  label,
  badge,
  progress = 0,
  batchLabel,
}) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(85,34,153,0.04)] border border-outline-variant/10 flex flex-col justify-between group">

      {/* Top */}
      <div>
        <p className="text-on-surface-variant font-medium mb-1">{label}</p>
        {variant === "validated" ? (
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-extrabold font-headline">{value}</h3>
            <span className="text-outline text-sm">/ {total}</span>
          </div>
        ) : (
          <h3 className="text-4xl font-extrabold font-headline">{value}</h3>
        )}
      </div>

      {/* Bottom */}
      {variant === "candidates" && (
        <div className="mt-6 flex items-end justify-between">
          {badge && (
            <div className="flex items-center text-emerald-600 font-bold gap-1 text-sm bg-emerald-50 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              {badge}
            </div>
          )}
          {/* Mini bar chart */}
          <div className="h-12 w-32 flex items-end gap-1">
            <div className="w-2 bg-primary-fixed-dim rounded-t h-1/2  group-hover:h-2/3  transition-all" />
            <div className="w-2 bg-primary-fixed-dim rounded-t h-2/3  group-hover:h-3/4  transition-all" />
            <div className="w-2 bg-primary-fixed-dim rounded-t h-3/5  group-hover:h-4/5  transition-all" />
            <div className="w-2 bg-primary-container rounded-t h-4/5  group-hover:h-full transition-all" />
          </div>
        </div>
      )}

      {variant === "validated" && (
        <div className="mt-8">
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary-fixed-dim rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          {batchLabel && (
            <p className="text-xs text-outline mt-3 font-semibold uppercase tracking-widest">
              {batchLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
