import { useParams, useNavigate } from "react-router-dom";
import { getCandidateBySlug } from "../data/candidates";

const statusStyles = {
  Scheduled: { wrapper: "bg-primary-fixed text-primary", icon: "event_available" },
  "In Review": { wrapper: "bg-surface-container text-on-surface-variant", icon: "visibility" },
};

export default function CandidateProfile() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const candidate = getCandidateBySlug(candidateId);

  if (!candidate) {
    return (
      <main className="max-w-screen-2xl mx-auto px-8 py-20 text-center">
        <p className="text-2xl font-bold text-on-surface-variant">Candidate not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold hover:-translate-y-px transition-all"
        >
          Go Back
        </button>
      </main>
    );
  }

  const {
    name, title, score, result, highlight, status, avatar,
    location, experience, skills,
    aiReasoning, insightChips, dimensionalScores,
  } = candidate;
  const style = statusStyles[status] ?? statusStyles["In Review"];

  return (
    <main className="p-8 max-w-[1600px] mx-auto">

      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Candidates
      </button>

      {/* Asymmetric 3-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr_380px] gap-8">

        {/* ── Left Column: Profile Card ── */}
        <section className="space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(85,34,153,0.06)]">

            {/* Avatar + verified badge */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Name + title */}
            <div className="text-center mb-8">
              <h2 className="font-headline text-2xl font-extrabold text-primary mb-1">{name}</h2>
              <p className="text-on-surface-variant text-sm font-medium">{title}</p>
            </div>

            {/* Meta info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Location</p>
                  <p className="text-sm font-semibold">{location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">history_edu</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Experience</p>
                  <p className="text-sm font-semibold">{experience}</p>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div className={`flex items-center justify-center gap-2 py-2 rounded-full font-bold text-sm mb-8 ${style.wrapper}`}>
              <span className="material-symbols-outlined text-sm">{style.icon}</span>
              {status}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button className="w-full bg-primary text-white font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-xl shadow-primary/20 active:scale-95">
                <span className="material-symbols-outlined">event_available</span>
                Schedule Interview
              </button>
              <button className="w-full bg-surface-container-high text-on-surface-variant font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:scale-95">
                <span className="material-symbols-outlined">download</span>
                Download Profile
              </button>
            </div>
          </div>
        </section>

        {/* ── Center Column: AI Score + Reasoning ── */}
        <section className="space-y-6">

          {/* AI Score card */}
          <div className="bg-surface-container-lowest rounded-xl p-10 shadow-[0px_20px_40px_rgba(85,34,153,0.06)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-2 mb-4 shadow-[0_2px_8px_rgba(85,34,153,0.1)]">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  AI Decision Reasoning
                </div>
                <h3 className="font-headline text-3xl font-extrabold text-primary leading-tight">
                  {result === "PASSED" ? "Elite Technical Archetype" : "Promising Candidate"}
                </h3>
              </div>
              <div className="bg-primary p-4 rounded-2xl text-white text-center min-w-[100px] shadow-lg shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Voice Score</p>
                <p className="text-3xl font-black font-headline tracking-tighter">
                  {score}<span className="text-sm">/10</span>
                </p>
              </div>
            </div>

            {/* Reasoning text */}
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-base mb-8">
              <p>{aiReasoning}</p>

              {/* Two-panel insight grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                <div className="p-6 rounded-xl bg-surface-container-low border-l-4 border-primary">
                  <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                    Key Highlight
                  </h4>
                  <p className="text-sm">{highlight}</p>
                </div>
                <div className="p-6 rounded-xl bg-surface-container-low border-l-4 border-primary">
                  <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                    Skills Match
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                    {skills.length > 3 && (
                      <span className="bg-surface-container text-outline px-3 py-1 rounded-full text-xs font-semibold">
                        +{skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight chips */}
            {insightChips && (
              <div className="flex flex-wrap gap-3">
                {insightChips.map((chip) => (
                  <div
                    key={chip}
                    className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-2 border border-primary/10"
                  >
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    {chip}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Right Column: Dimensional Breakdown ── */}
        <section className="space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(85,34,153,0.06)]">
            <h3 className="font-headline text-xl font-extrabold text-primary mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined">bar_chart</span>
              Dimensional Breakdown
            </h3>

            <div className="space-y-8">
              {(dimensionalScores ?? []).map(({ label, score: pct }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{label}</span>
                    <span className="font-headline font-extrabold text-primary">{pct}%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#552299] rounded-full shadow-[0_0_12px_rgba(85,34,153,0.4)] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Historical context */}
            <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Historical Context</p>
              <p className="text-sm text-on-surface-variant italic">
                "Candidate shows consistent performance across 4 assessment cycles with zero critical red flags."
              </p>
            </div>
          </div>

          {/* Full skills card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(85,34,153,0.06)]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">All Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary-fixed text-primary px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
