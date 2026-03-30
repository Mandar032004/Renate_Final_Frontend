import { reviewTeam } from "../../data/candidates";

export default function JobHeader({ job }) {
  if (!job) return null;

  const { title, department, location, remote, salary } = job;

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-12">

      {/* Left: Title block */}
      <div className="space-y-4 min-w-0">
        <nav className="flex items-center gap-2 text-xs font-bold tracking-widest text-outline uppercase">
          <span>Active Roles</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary">{department}</span>
        </nav>

        <h1 className="text-4xl lg:text-5xl font-extrabold font-headline text-primary tracking-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-base lg:text-lg">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">location_on</span>
            {location}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant shrink-0" />
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">home_work</span>
            {remote}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant shrink-0" />
          <span className="font-semibold text-primary">{salary}</span>
        </div>
      </div>

      {/* Right: Review Team — flex layout, no absolute positioning */}
      <div className="shrink-0">
        <div className="flex flex-col items-start md:items-end gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-outline">Review Team</span>
          <div className="flex items-center">
            {reviewTeam.map((member, i) => (
              <img
                key={member.id}
                src={member.avatar}
                alt="Team member"
                className="h-10 w-10 rounded-full ring-4 ring-background object-cover"
                style={{ marginLeft: i === 0 ? 0 : "-0.75rem" }}
              />
            ))}
            <div
              className="h-10 w-10 rounded-full ring-4 ring-background bg-secondary-container flex items-center justify-center text-on-secondary-container text-xs font-bold shrink-0"
              style={{ marginLeft: "-0.75rem" }}
            >
              +2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
