import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { jobs } from "../data/jobs";
import { usePostJob } from "../context/PostJobContext";

// ─── Module-level constants ───────────────────────────────────────────────────

const totalCandidates = jobs.reduce((s, j) => s + j.totalCandidates, 0);
const totalShortlisted = jobs.reduce((s, j) => s + j.voiceValidated, 0);
const ACCURACY = 94;

const featuredJobs = [
  { id: "ai-engineer", label: "AI Engineer",       icon: "psychology"     },
  { id: "devops",      label: "DevOps Engineer",   icon: "cloud_sync"     },
  { id: "ml-engineer", label: "ML Engineer",       icon: "model_training" },
  { id: "frontend",    label: "Frontend Engineer", icon: "code"           },
];

const FEED_ITEMS = [
  "Scraping GitHub profiles...",
  "Validating voice responses...",
  "Generating candidate summaries...",
  "Running NLP skill extraction...",
  "Scoring match thresholds...",
  "Syncing ATS pipeline...",
  "Ranking shortlist candidates...",
  "Analyzing interview transcripts...",
];

const FEED_ICONS = [
  "code", "mic", "auto_awesome", "psychology",
  "analytics", "sync", "format_list_numbered", "record_voice_over",
];

// Shared card animation variants (flashcard stagger)
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 24 },
  },
};

// ─── NumberTicker ─────────────────────────────────────────────────────────────

function NumberTicker({ target, suffix = "", label, delta, icon, iconBg, iconFg }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-64px 0px 0px 0px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 22, mass: 1.1 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 flex flex-col gap-3"
      style={{ border: "1px solid rgba(85,34,153,0.08)", boxShadow: "0px 4px 24px rgba(85,34,153,0.06)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#4a4452" }}>
          {label}
        </span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          <span className="material-symbols-outlined text-sm" style={{ color: iconFg }}>{icon}</span>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-1">
        <motion.span
          className="font-extrabold leading-none"
          style={{ fontFamily: "Manrope, sans-serif", fontSize: "2.75rem", color: "#1b1b1e" }}
        >
          {display}
        </motion.span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm" style={{ color: "#16a34a" }}>trending_up</span>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#dcfce7", color: "#15803d" }}>
          {delta}
        </span>
      </div>
    </div>
  );
}

// ─── PulseHero ────────────────────────────────────────────────────────────────

function PulseHero() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0,
          animation: "pulse-dot 2s ease-in-out infinite",
          boxShadow: "0 0 8px rgba(34,197,94,0.55)",
        }} />
        <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "#22c55e" }}>
          Live System Status
        </span>
        <span className="text-[10px] font-bold px-3 py-0.5 rounded-full" style={{
          background: "#dcfce7", color: "#15803d", border: "1px solid rgba(34,197,94,0.2)",
        }}>
          All Systems Operational
        </span>
      </div>
      <h1 className="tracking-tight leading-tight" style={{
        fontFamily: "Manrope, sans-serif",
        fontSize: "clamp(1.55rem, 2.8vw, 2.15rem)",
        fontWeight: 900,
        color: "#1b1b1e",
        letterSpacing: "-0.025em",
      }}>
        Welcome back, Admin.{" "}
        <span style={{
          background: "linear-gradient(90deg, #552299 0%, #7c3aed 55%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Your AI Agents
        </span>{" "}
        are currently optimized.
      </h1>
      <p className="text-sm" style={{ color: "#6b5f78" }}>
        {jobs.length} active roles · {totalCandidates.toLocaleString()} candidates processed this cycle
      </p>
    </div>
  );
}

// ─── TickerRow ────────────────────────────────────────────────────────────────

function TickerRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NumberTicker target={totalCandidates} label="Total Processed"   delta="+12% from last week" icon="groups"                  iconBg="#ecdcff" iconFg="#552299" />
      <NumberTicker target={totalShortlisted} label="Total Shortlisted" delta="+8% from last week"  icon="verified"               iconBg="#dfc8fd" iconFg="#3d007d" />
      <NumberTicker target={ACCURACY} suffix="%" label="AI Accuracy"   delta="+3% from last week"  icon="precision_manufacturing" iconBg="#d1fae5" iconFg="#065f46" />
    </div>
  );
}

// ─── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({ job, jobData: passedData, featured = false, isNew = false }) {
  const navigate = useNavigate();
  const resolved = passedData ?? jobs.find((j) => j.id === job.id);

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{
        border: isNew
          ? "1.5px solid rgba(34,197,94,0.3)"
          : "1px solid rgba(85,34,153,0.08)",
        boxShadow: isNew
          ? "0px 4px 24px rgba(34,197,94,0.08)"
          : "0px 4px 24px rgba(85,34,153,0.06)",
        minHeight: featured ? 178 : 148,
        transition: "box-shadow 0.18s ease",
      }}
      onClick={() => isNew ? navigate("/hiring") : navigate(`/jobs/${job.id}`)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = isNew
          ? "0px 8px 28px rgba(34,197,94,0.15)"
          : "0px 8px 32px rgba(85,34,153,0.14)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = isNew
          ? "0px 4px 24px rgba(34,197,94,0.08)"
          : "0px 4px 24px rgba(85,34,153,0.06)")
      }
    >
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Icon + Title row */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: isNew ? "#dcfce7" : "#ecdcff" }}
          >
            <span className="material-symbols-outlined" style={{ color: isNew ? "#16a34a" : "#552299" }}>
              {job.icon}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-extrabold truncate" style={{
                fontFamily: "Manrope, sans-serif", fontSize: "0.95rem", color: "#1b1b1e",
              }}>
                {job.label}
              </p>
              {isNew && (
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0" style={{
                  background: "#dcfce7", color: "#15803d",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}>
                  ★ Posted recently
                </span>
              )}
            </div>
            {resolved && (
              <p className="text-xs truncate mt-0.5" style={{ color: "#4a4452" }}>
                {resolved.department} · {resolved.location}
              </p>
            )}
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0" style={{
            background: "#dcfce7", color: "#15803d",
          }}>
            {resolved?.status ?? "Active"}
          </span>
        </div>

        {/* Stats + CTA */}
        {resolved && (
          <div className="flex items-center gap-5 mt-auto flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#cdc3d4" }}>Candidates</p>
              <p className="font-extrabold text-sm" style={{ fontFamily: "Manrope, sans-serif", color: "#1b1b1e" }}>
                {resolved.totalCandidates.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#cdc3d4" }}>AI Matches</p>
              <p className="font-extrabold text-sm" style={{ fontFamily: "Manrope, sans-serif", color: "#552299" }}>
                {resolved.aiMatches}
              </p>
            </div>
            {featured && (
              <button
                className="ml-auto text-xs font-bold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-85"
                style={{ background: "#552299" }}
                onClick={(e) => { e.stopPropagation(); navigate("/hiring"); }}
              >
                Manage Pipeline
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions slide-up panel */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3 border-t translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(85,34,153,0.08)",
        }}
      >
        <button
          disabled
          title="Coming soon"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold px-3 py-1.5 rounded-lg opacity-50 cursor-not-allowed"
          style={{ background: "#ecdcff", color: "#552299" }}
        >
          Edit Job
        </button>
        <button
          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-85"
          style={{ background: "#552299" }}
          onClick={(e) => { e.stopPropagation(); navigate("/analytics"); }}
        >
          View Analytics
        </button>
        <span className="ml-auto text-[10px] font-medium" style={{ color: "#a09ab0" }}>Quick Actions</span>
      </div>
    </div>
  );
}

// ─── BentoGrid ────────────────────────────────────────────────────────────────

function BentoGrid() {
  const navigate = useNavigate();
  const { postedJobs } = usePostJob();

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined" style={{ color: "#552299" }}>work_history</span>
          <h2 className="font-extrabold tracking-tight" style={{
            fontFamily: "Manrope, sans-serif", fontSize: "1.05rem", color: "#552299",
          }}>
            Active Roles
          </h2>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#ecdcff", color: "#552299" }}>
          {featuredJobs.length + postedJobs.length} Roles
        </span>
      </div>

      {/* ── Recently Posted section ── */}
      <AnimatePresence>
        {postedJobs.length > 0 && (
          <motion.div
            key="recently-posted"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#22c55e", display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
                <span className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: "#22c55e" }}>
                  Recently Posted
                </span>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.2)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {postedJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  >
                    <BentoCard job={job} jobData={job} isNew />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Bento Grid (flashcard stagger) ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Row 1: AI Engineer (col-span-2) + DevOps */}
        <motion.div variants={cardAnim} className="col-span-2 min-h-[178px]">
          <BentoCard job={featuredJobs[0]} featured />
        </motion.div>
        <motion.div variants={cardAnim}>
          <BentoCard job={featuredJobs[1]} />
        </motion.div>

        {/* Row 2: ML Engineer + Frontend + View All */}
        <motion.div variants={cardAnim}>
          <BentoCard job={featuredJobs[2]} />
        </motion.div>
        <motion.div variants={cardAnim}>
          <BentoCard job={featuredJobs[3]} />
        </motion.div>

        {/* View All card */}
        <motion.div variants={cardAnim}>
          <button
            className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all group"
            style={{ borderColor: "rgba(85,34,153,0.2)", minHeight: 148, background: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#552299";
              e.currentTarget.style.background = "rgba(85,34,153,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(85,34,153,0.2)";
              e.currentTarget.style.background = "transparent";
            }}
            onClick={() => navigate("/hiring")}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#ecdcff" }}>
              <span className="material-symbols-outlined" style={{ color: "#552299" }}>open_in_new</span>
            </div>
            <span className="text-xs font-bold" style={{ color: "#552299" }}>View All Roles</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── AIBrainFeed ──────────────────────────────────────────────────────────────

function AIBrainFeed() {
  const shouldReduce = useReducedMotion();
  const doubled = [...FEED_ITEMS, ...FEED_ITEMS];

  return (
    <div
      className="bg-white rounded-2xl flex flex-col overflow-hidden"
      style={{
        border: "1px solid rgba(85,34,153,0.08)",
        boxShadow: "0px 4px 24px rgba(85,34,153,0.06)",
        minHeight: 500,
        flex: 1,
      }}
    >
      <div className="px-5 py-4 flex items-center gap-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(85,34,153,0.07)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)" }}>
          <span className="material-symbols-outlined text-sm text-white">smart_toy</span>
        </div>
        <span className="font-extrabold tracking-tight text-sm"
          style={{ fontFamily: "Manrope, sans-serif", color: "#552299" }}>
          Live Agent Activity
        </span>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0,
            animation: "pulse-dot 2s ease-in-out infinite",
          }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#22c55e" }}>Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
        <div className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, white, transparent)" }} />
        <motion.div
          animate={shouldReduce ? {} : { y: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          className="pt-3"
        >
          {doubled.map((text, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3"
              style={{ borderBottom: "1px solid rgba(85,34,153,0.04)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "#ecdcff" }}>
                <span className="material-symbols-outlined" style={{ color: "#552299", fontSize: 14 }}>
                  {FEED_ICONS[i % FEED_ICONS.length]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: "#1b1b1e" }}>{text}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#a09ab0" }}>
                  {i % 3 === 0 ? "just now" : i % 3 === 1 ? "2s ago" : "5s ago"}
                </p>
              </div>
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ background: i % 4 === 0 ? "#22c55e" : "#dfc8fd" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── MobileNotificationsButton ────────────────────────────────────────────────

function MobileNotificationsButton() {
  return (
    <button
      className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm"
      style={{
        background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)",
        boxShadow: "0 8px 24px rgba(85,34,153,0.35)",
      }}
    >
      <span className="material-symbols-outlined text-lg">notifications_active</span>
      Recent Activity
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ background: "#22c55e" }}>
        8
      </span>
    </button>
  );
}

// ─── PostJobModal ─────────────────────────────────────────────────────────────

const ICONS = ["work", "psychology", "code", "cloud_sync", "model_training", "design_services", "analytics", "group"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid-Level", "Senior", "Lead", "Manager"];
const WORK_TYPES = [
  { id: "Remote",  icon: "home_work"      },
  { id: "Hybrid",  icon: "corporate_fare" },
  { id: "On-site", icon: "location_on"    },
];

function PostJobModal() {
  const { isOpen, setIsOpen, addJob } = usePostJob();

  const [form, setForm] = useState({ title: "", description: "", experience: "Mid-Level", workType: "Remote", icon: "work" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => setIsOpen(false);

  const handleSkillKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const val = skillInput.trim().replace(/,$/, "");
      if (val && !skills.includes(val)) setSkills((s) => [...s, val]);
      setSkillInput("");
    }
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setErrors({ title: "Job title is required" });
      return;
    }
    addJob({ ...form, skills });
  };

  const inputBase = {
    border: "1.5px solid rgba(85,34,153,0.15)",
    background: "#faf9fc",
    color: "#1b1b1e",
    outline: "none",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Modal centering container */}
          <div className="fixed inset-0 z-[51] flex items-center justify-center p-0 sm:p-6">
            <motion.div
              key="modal"
              className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:w-[560px] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.93, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.91, y: 14 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Modal header ── */}
              <div className="flex items-center justify-between px-6 py-5 shrink-0"
                style={{ borderBottom: "1px solid rgba(85,34,153,0.08)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #552299, #7c3aed)" }}>
                    <span className="material-symbols-outlined text-white text-base">work</span>
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base" style={{ fontFamily: "Manrope, sans-serif", color: "#1b1b1e" }}>
                      Post a New Job
                    </h2>
                    <p className="text-xs" style={{ color: "#7c7483" }}>Fill in the details to create a new role</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-base" style={{ color: "#7c7483" }}>close</span>
                </button>
              </div>

              {/* ── Form body ── */}
              <div className="flex-1 overflow-y-auto px-6 py-5" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Job Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Job Title <span style={{ color: "#ba1a1a" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setErrors({}); }}
                    placeholder="e.g. Senior React Developer"
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all"
                    style={{
                      ...inputBase,
                      border: errors.title ? "1.5px solid #ba1a1a" : inputBase.border,
                    }}
                    onFocus={(e) => (e.target.style.border = "1.5px solid #552299")}
                    onBlur={(e) => (e.target.style.border = errors.title ? "1.5px solid #ba1a1a" : "1.5px solid rgba(85,34,153,0.15)")}
                  />
                  {errors.title && <p className="text-xs" style={{ color: "#ba1a1a" }}>{errors.title}</p>}
                </div>

                {/* Job Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Job Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm resize-none transition-all"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.border = "1.5px solid #552299")}
                    onBlur={(e) => (e.target.style.border = "1.5px solid rgba(85,34,153,0.15)")}
                  />
                </div>

                {/* Experience Level */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Experience Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, experience: level }))}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                        style={form.experience === level
                          ? { background: "#552299", color: "#fff", boxShadow: "0 2px 8px rgba(85,34,153,0.3)" }
                          : { background: "#f5f3f7", color: "#4a4452", border: "1px solid rgba(85,34,153,0.1)" }
                        }
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills tag input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Skills
                  </label>
                  <div
                    className="flex flex-wrap gap-2 items-center min-h-[46px] px-3 py-2 rounded-xl"
                    style={{ border: "1.5px solid rgba(85,34,153,0.15)", background: "#faf9fc" }}
                    onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
                  >
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "#ecdcff", color: "#552299" }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => setSkills((s) => s.filter((x) => x !== skill))}
                          className="leading-none hover:opacity-60 transition-opacity"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>close</span>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKey}
                      placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                      className="flex-1 min-w-[120px] bg-transparent text-sm focus:outline-none"
                      style={{ color: "#1b1b1e" }}
                    />
                  </div>
                  <p className="text-[10px]" style={{ color: "#a09ab0" }}>Press Enter or comma to add a skill tag</p>
                </div>

                {/* Work Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Work Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {WORK_TYPES.map(({ id, icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, workType: id }))}
                        className="flex flex-col items-center gap-1.5 py-3.5 rounded-xl transition-all"
                        style={form.workType === id
                          ? { background: "#552299", color: "#fff", border: "2px solid #552299", boxShadow: "0 2px 12px rgba(85,34,153,0.3)" }
                          : { background: "#faf9fc", color: "#4a4452", border: "2px solid rgba(85,34,153,0.1)" }
                        }
                      >
                        <span className="material-symbols-outlined text-xl">{icon}</span>
                        <span className="text-xs font-bold">{id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Icon picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>
                    Role Icon
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {ICONS.map((ico) => (
                      <button
                        key={ico}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, icon: ico }))}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                        style={form.icon === ico
                          ? { background: "#552299", boxShadow: "0 2px 8px rgba(85,34,153,0.3)" }
                          : { background: "#f5f3f7", border: "1px solid rgba(85,34,153,0.1)" }
                        }
                      >
                        <span className="material-symbols-outlined text-lg"
                          style={{ color: form.icon === ico ? "#fff" : "#552299" }}>
                          {ico}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Modal footer ── */}
              <div
                className="px-6 py-4 flex items-center justify-end gap-3 shrink-0"
                style={{ borderTop: "1px solid rgba(85,34,153,0.08)", background: "#faf9fc" }}
              >
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-gray-200"
                  style={{ color: "#4a4452", background: "#efedf1" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)",
                    boxShadow: "0 4px 14px rgba(85,34,153,0.3)",
                  }}
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  Post Job
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── LandingPage ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>

      <PostJobModal />

      <main className="max-w-screen-2xl mx-auto px-8 py-10" style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <div className="flex flex-col xl:flex-row gap-8 items-start">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <PulseHero />
            <TickerRow />
            <BentoGrid />
          </div>

          {/* ── Right sidebar (desktop only) ── */}
          <aside className="hidden xl:flex flex-col w-[272px] shrink-0 self-stretch">
            <AIBrainFeed />
          </aside>
        </div>

        {/* ── Mobile notification button ── */}
        <div className="xl:hidden fixed bottom-6 right-6 z-50">
          <MobileNotificationsButton />
        </div>
      </main>
    </>
  );
}
