import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../data/jobs";
import JobHeader from "../components/dashboard/JobHeader";
import StatCard from "../components/dashboard/StatCard";
import AIRecommendationCard from "../components/dashboard/AIRecommendationCard";
import CandidateList from "../components/dashboard/CandidateList";
import AICoPilotChip from "../components/ui/AICoPilotChip";

export default function JobDashboard() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = getJobById(jobId);

  if (!job) {
    return (
      <main className="max-w-screen-2xl mx-auto px-8 py-20 text-center">
        <p className="text-2xl font-bold text-on-surface-variant">Job not found.</p>
        <button
          onClick={() => navigate("/hiring")}
          className="mt-6 bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold hover:-translate-y-px transition-all"
        >
          Back to Jobs
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-screen-2xl mx-auto px-8 py-10">

      {/* Page title + review team */}
      <JobHeader job={job} />

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          variant="candidates"
          label="Total Candidates"
          value={job.totalCandidates.toLocaleString()}
          badge={job.totalCandidatesBadge}
        />
        <StatCard
          variant="validated"
          label="Voice Validated"
          value={job.voiceValidated.toLocaleString()}
          total={job.totalCandidates.toLocaleString()}
          progress={Math.round((job.voiceValidated / job.totalCandidates) * 100)}
          batchLabel={job.batchLabel}
        />
        <AIRecommendationCard matchCount={job.aiMatches} jobId={jobId} />
      </div>

      {/* Shortlisted candidates */}
      <CandidateList />

      {/* Floating AI insight chip */}
      <AICoPilotChip message="New candidate matching pattern found." />
    </main>
  );
}
