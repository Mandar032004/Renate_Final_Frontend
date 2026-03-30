import { candidates } from "../../data/candidates";
import CandidateCard from "./CandidateCard";

export default function CandidateList() {
  return (
    <section>
      {/* Section header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold font-headline text-primary tracking-tight">
          Shortlisted Candidates
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface-variant font-semibold text-sm hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface-variant font-semibold text-sm hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-lg">sort</span>
            Sort
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
}
