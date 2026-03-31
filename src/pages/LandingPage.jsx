import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const INITIAL_MESSAGES = [
  { id: 1, role: "ai", text: "Hi Admin! 👋 I'm Renate AI, your intelligent hiring assistant.", ts: "just now" },
  { id: 2, role: "ai", text: "I can help you manage pipelines, post jobs, review analytics, and surface top candidates. What would you like to do?", ts: "just now" },
];

const QUICK_SUGGESTIONS = [
  { label: "Check Pipeline",  icon: "work_history",  action: "pipeline"   },
  { label: "Post a Job",      icon: "add_circle",    action: "post"       },
  { label: "View Analytics",  icon: "insights",      action: "analytics"  },
  { label: "Top Candidates",  icon: "person_search", action: "candidates" },
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
        fontWeight: 900, color: "#1b1b1e", letterSpacing: "-0.025em",
      }}>
        Welcome back, Admin.{" "}
        <span style={{
          background: "linear-gradient(90deg, #552299 0%, #7c3aed 55%, #a855f7 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
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
        border: isNew ? "1.5px solid rgba(34,197,94,0.3)" : "1px solid rgba(85,34,153,0.08)",
        boxShadow: isNew ? "0px 4px 24px rgba(34,197,94,0.08)" : "0px 4px 24px rgba(85,34,153,0.06)",
        minHeight: featured ? 178 : 148,
        transition: "box-shadow 0.18s ease",
      }}
      onClick={() => isNew ? navigate("/hiring") : navigate(`/jobs/${job.id}`)}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = isNew ? "0px 8px 28px rgba(34,197,94,0.15)" : "0px 8px 32px rgba(85,34,153,0.14)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = isNew ? "0px 4px 24px rgba(34,197,94,0.08)" : "0px 4px 24px rgba(85,34,153,0.06)")}
    >
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: isNew ? "#dcfce7" : "#ecdcff" }}>
            <span className="material-symbols-outlined" style={{ color: isNew ? "#16a34a" : "#552299" }}>{job.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-extrabold truncate" style={{ fontFamily: "Manrope, sans-serif", fontSize: "0.95rem", color: "#1b1b1e" }}>
                {job.label}
              </p>
              {isNew && (
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "#dcfce7", color: "#15803d", border: "1px solid rgba(34,197,94,0.3)" }}>
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
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
            style={{ background: "#dcfce7", color: "#15803d" }}>
            {resolved?.status ?? "Active"}
          </span>
        </div>

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

      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3 border-t translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out"
        style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderColor: "rgba(85,34,153,0.08)" }}
      >
        <button disabled title="Coming soon" onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold px-3 py-1.5 rounded-lg opacity-50 cursor-not-allowed"
          style={{ background: "#ecdcff", color: "#552299" }}>
          Edit Job
        </button>
        <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-85"
          style={{ background: "#552299" }}
          onClick={(e) => { e.stopPropagation(); navigate("/analytics"); }}>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined" style={{ color: "#552299" }}>work_history</span>
          <h2 className="font-extrabold tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.05rem", color: "#552299" }}>
            Active Roles
          </h2>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#ecdcff", color: "#552299" }}>
          {featuredJobs.length + postedJobs.length} Roles
        </span>
      </div>

      <AnimatePresence>
        {postedJobs.length > 0 && (
          <motion.div key="recently-posted"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: "#22c55e" }}>Recently Posted</span>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(34,197,94,0.2)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {postedJobs.map((job) => (
                  <motion.div key={job.id} layout
                    initial={{ opacity: 0, scale: 0.92, y: -12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 26 }}>
                    <BentoCard job={job} jobData={job} isNew />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={cardAnim} className="col-span-2 min-h-[178px]">
          <BentoCard job={featuredJobs[0]} featured />
        </motion.div>
        <motion.div variants={cardAnim}><BentoCard job={featuredJobs[1]} /></motion.div>
        <motion.div variants={cardAnim}><BentoCard job={featuredJobs[2]} /></motion.div>
        <motion.div variants={cardAnim}><BentoCard job={featuredJobs[3]} /></motion.div>
        <motion.div variants={cardAnim}>
          <button
            className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all"
            style={{ borderColor: "rgba(85,34,153,0.2)", minHeight: 148, background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#552299"; e.currentTarget.style.background = "rgba(85,34,153,0.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(85,34,153,0.2)"; e.currentTarget.style.background = "transparent"; }}
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
    <div className="bg-white rounded-2xl flex flex-col overflow-hidden"
      style={{ border: "1px solid rgba(85,34,153,0.08)", boxShadow: "0px 4px 24px rgba(85,34,153,0.06)", minHeight: 500, flex: 1 }}>
      <div className="px-5 py-4 flex items-center gap-3 shrink-0" style={{ borderBottom: "1px solid rgba(85,34,153,0.07)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)" }}>
          <span className="material-symbols-outlined text-sm text-white">smart_toy</span>
        </div>
        <span className="font-extrabold tracking-tight text-sm" style={{ fontFamily: "Manrope, sans-serif", color: "#552299" }}>
          Live Agent Activity
        </span>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#22c55e" }}>Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
        <div className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)" }} />
        <motion.div
          animate={shouldReduce ? {} : { y: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          className="pt-3"
        >
          {doubled.map((text, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3" style={{ borderBottom: "1px solid rgba(85,34,153,0.04)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#ecdcff" }}>
                <span className="material-symbols-outlined" style={{ color: "#552299", fontSize: 14 }}>{FEED_ICONS[i % FEED_ICONS.length]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: "#1b1b1e" }}>{text}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#a09ab0" }}>{i % 3 === 0 ? "just now" : i % 3 === 1 ? "2s ago" : "5s ago"}</p>
              </div>
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: i % 4 === 0 ? "#22c55e" : "#dfc8fd" }} />
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
    // bottom-20 so it stacks above the chatbot FAB on mobile
    <button
      className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm"
      style={{ background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)", boxShadow: "0 8px 24px rgba(85,34,153,0.35)" }}
    >
      <span className="material-symbols-outlined text-lg">notifications_active</span>
      Recent Activity
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: "#22c55e" }}>
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

// Mock QR code — hardcoded 19×19 finder-pattern grid
function MockQRCode() {
  const rows = [
    "1111111001011111111",
    "1000001010001000001",
    "1011101001001011101",
    "1011101010001011101",
    "1011101100001011101",
    "1000001001001000001",
    "1111111010101111111",
    "0000000001100000000",
    "1101011011001011011",
    "0110100100110100010",
    "1010010011010010101",
    "0101100010001101001",
    "0000000010110010110",
    "0000000001001000000",
    "1111111001001011010",
    "1000001011010100110",
    "1011101001101001010",
    "1000001010110110011",
    "1111111011001010101",
  ];
  const size = 19;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="156" height="156" style={{ imageRendering: "pixelated", display: "block" }}>
      <rect width={size} height={size} fill="#fff" />
      {rows.map((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#1b1b1e" /> : null
        )
      )}
    </svg>
  );
}

const UPI_APPS = [
  { name: "GPay",    bg: "#4285F4", letter: "G"  },
  { name: "PhonePe", bg: "#5F259F", letter: "Ph" },
  { name: "Paytm",   bg: "#00BAF2", letter: "Pa" },
];

function PostJobModal() {
  const { isOpen, setIsOpen, addJob } = usePostJob();
  const [step, setStep] = useState("payment"); // "payment" | "success" | "form"
  const [form, setForm] = useState({ title: "", description: "", experience: "Mid-Level", workType: "Remote", icon: "work" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  // Reset to payment step each time modal opens
  useEffect(() => { if (isOpen) setStep("payment"); }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleConfirmPayment = () => {
    setStep("success");
    setTimeout(() => setStep("form"), 1900);
  };

  const handleSkillKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const val = skillInput.trim().replace(/,$/, "");
      if (val && !skills.includes(val)) setSkills((s) => [...s, val]);
      setSkillInput("");
    }
  };

  const handleSubmit = () => {
    if (!form.title.trim()) { setErrors({ title: "Job title is required" }); return; }
    addJob({ ...form, skills });
    setForm({ title: "", description: "", experience: "Mid-Level", workType: "Remote", icon: "work" });
    setSkills([]);
  };

  const inputBase = { border: "1.5px solid rgba(85,34,153,0.15)", background: "#faf9fc", color: "#1b1b1e", outline: "none" };

  const stepTitle = step === "payment" ? { icon: "payments", title: "Complete Payment", sub: "One-time fee to post this role" }
    : step === "success" ? { icon: "check_circle", title: "Payment Confirmed", sub: "Unlocking job posting form…" }
    : { icon: "work", title: "Post a New Job", sub: "Fill in the details to create a new role" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="backdrop" className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }} onClick={step !== "success" ? handleClose : undefined} />

          <div className="fixed inset-0 z-[51] flex items-center justify-center p-0 sm:p-6">
            <motion.div key="modal"
              className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:w-[560px] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.93, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.91, y: 14 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 shrink-0" style={{ borderBottom: "1px solid rgba(85,34,153,0.08)" }}>
                <div className="flex items-center gap-3">
                  <motion.div key={step} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: step === "success" ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#552299,#7c3aed)" }}>
                    <span className="material-symbols-outlined text-white text-base">{stepTitle.icon}</span>
                  </motion.div>
                  <div>
                    <h2 className="font-extrabold text-base" style={{ fontFamily: "Manrope, sans-serif", color: "#1b1b1e" }}>{stepTitle.title}</h2>
                    <p className="text-xs" style={{ color: "#7c7483" }}>{stepTitle.sub}</p>
                  </div>
                </div>
                {step !== "success" && (
                  <button onClick={handleClose} className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100">
                    <span className="material-symbols-outlined text-base" style={{ color: "#7c7483" }}>close</span>
                  </button>
                )}
              </div>

              {/* Step content with slide-left AnimatePresence */}
              <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
                <AnimatePresence mode="wait" initial={false}>

                  {/* ── PAYMENT STEP ── */}
                  {step === "payment" && (
                    <motion.div key="payment"
                      className="absolute inset-0 overflow-y-auto px-6 py-6 flex flex-col gap-5"
                      initial={{ x: 0, opacity: 1 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}>

                      {/* Price card */}
                      <div className="rounded-2xl p-5 flex flex-col gap-1.5"
                        style={{ background: "linear-gradient(135deg,rgba(85,34,153,0.06),rgba(124,58,237,0.06))", border: "1.5px solid rgba(85,34,153,0.14)" }}>
                        <p className="text-2xl font-black" style={{ fontFamily: "Manrope,sans-serif", color: "#552299" }}>Pay ₹999/-</p>
                        <p className="text-sm font-semibold" style={{ color: "#1b1b1e" }}>to post a job on Renate AI</p>
                        <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#7c7483" }}>
                          Renate charges per job to provide premium AI candidate matching, voice assessment, and verification features.
                        </p>
                      </div>

                      {/* QR + UPI layout */}
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {/* QR code */}
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <div className="p-3 rounded-2xl" style={{ background: "#fff", border: "1.5px solid rgba(85,34,153,0.12)", boxShadow: "0 4px 16px rgba(85,34,153,0.08)" }}>
                            <MockQRCode />
                          </div>
                          <p className="text-[10px] font-bold" style={{ color: "#a09ab0" }}>Scan with any UPI app</p>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:flex flex-col items-center self-stretch gap-2">
                          <div className="flex-1" style={{ width: 1, background: "rgba(85,34,153,0.1)" }} />
                          <span className="text-[10px] font-black" style={{ color: "#a09ab0" }}>OR</span>
                          <div className="flex-1" style={{ width: 1, background: "rgba(85,34,153,0.1)" }} />
                        </div>
                        <div className="sm:hidden w-full flex items-center gap-3">
                          <div className="flex-1 h-px" style={{ background: "rgba(85,34,153,0.1)" }} />
                          <span className="text-[10px] font-black" style={{ color: "#a09ab0" }}>OR</span>
                          <div className="flex-1 h-px" style={{ background: "rgba(85,34,153,0.1)" }} />
                        </div>

                        {/* UPI apps */}
                        <div className="flex-1 flex flex-col gap-2 w-full">
                          <p className="text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Pay via UPI App</p>
                          {UPI_APPS.map(({ name, bg, letter }) => (
                            <button key={name} onClick={handleConfirmPayment}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-left w-full"
                              style={{ background: "#faf9fc", border: "1.5px solid rgba(85,34,153,0.1)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-black"
                                style={{ background: bg }}>
                                {letter}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold" style={{ color: "#1b1b1e" }}>{name}</p>
                                <p className="text-[10px]" style={{ color: "#a09ab0" }}>Pay ₹999 instantly</p>
                              </div>
                              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#552299" }}>chevron_right</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* UPI ID reference */}
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "#faf9fc", border: "1px solid rgba(85,34,153,0.1)" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#7c3aed" }}>tag</span>
                        <span className="text-xs" style={{ color: "#7c7483" }}>UPI ID: </span>
                        <span className="text-xs font-bold" style={{ color: "#1b1b1e" }}>renate@razorpay</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ── SUCCESS STEP ── */}
                  {step === "success" && (
                    <motion.div key="success"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}>
                      <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 8px 32px rgba(34,197,94,0.4)" }}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.1 }}>
                        <span className="material-symbols-outlined text-white" style={{ fontSize: 40 }}>check</span>
                      </motion.div>
                      <motion.div className="text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <p className="font-extrabold text-lg" style={{ fontFamily: "Manrope,sans-serif", color: "#1b1b1e" }}>Payment Successful!</p>
                        <p className="text-sm mt-1" style={{ color: "#7c7483" }}>₹999 paid · Opening job form…</p>
                      </motion.div>
                      {/* Progress bar */}
                      <motion.div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(85,34,153,0.1)" }}>
                        <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#552299,#7c3aed)" }}
                          initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* ── FORM STEP ── */}
                  {step === "form" && (
                    <motion.div key="form"
                      className="absolute inset-0 overflow-y-auto px-6 py-5 flex flex-col gap-5"
                      initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Job Title <span style={{ color: "#ba1a1a" }}>*</span></label>
                        <input type="text" value={form.title}
                          onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setErrors({}); }}
                          placeholder="e.g. Senior React Developer"
                          className="w-full px-4 py-2.5 rounded-xl text-sm transition-all"
                          style={{ ...inputBase, border: errors.title ? "1.5px solid #ba1a1a" : inputBase.border }}
                          onFocus={(e) => (e.target.style.border = "1.5px solid #552299")}
                          onBlur={(e) => (e.target.style.border = errors.title ? "1.5px solid #ba1a1a" : "1.5px solid rgba(85,34,153,0.15)")} />
                        {errors.title && <p className="text-xs" style={{ color: "#ba1a1a" }}>{errors.title}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Job Description</label>
                        <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                          placeholder="Describe the role, responsibilities, and requirements..." rows={3}
                          className="w-full px-4 py-2.5 rounded-xl text-sm resize-none transition-all" style={inputBase}
                          onFocus={(e) => (e.target.style.border = "1.5px solid #552299")}
                          onBlur={(e) => (e.target.style.border = "1.5px solid rgba(85,34,153,0.15)")} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Experience Level</label>
                        <div className="flex flex-wrap gap-2">
                          {EXPERIENCE_LEVELS.map((level) => (
                            <button key={level} type="button" onClick={() => setForm((f) => ({ ...f, experience: level }))}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                              style={form.experience === level
                                ? { background: "#552299", color: "#fff", boxShadow: "0 2px 8px rgba(85,34,153,0.3)" }
                                : { background: "#f5f3f7", color: "#4a4452", border: "1px solid rgba(85,34,153,0.1)" }}>
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Skills</label>
                        <div className="flex flex-wrap gap-2 items-center min-h-[46px] px-3 py-2 rounded-xl"
                          style={{ border: "1.5px solid rgba(85,34,153,0.15)", background: "#faf9fc" }}
                          onClick={(e) => e.currentTarget.querySelector("input")?.focus()}>
                          {skills.map((skill) => (
                            <span key={skill} className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                              style={{ background: "#ecdcff", color: "#552299" }}>
                              {skill}
                              <button type="button" onClick={() => setSkills((s) => s.filter((x) => x !== skill))}
                                className="leading-none hover:opacity-60 transition-opacity">
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>close</span>
                              </button>
                            </span>
                          ))}
                          <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKey}
                            placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                            className="flex-1 min-w-[120px] bg-transparent text-sm focus:outline-none" style={{ color: "#1b1b1e" }} />
                        </div>
                        <p className="text-[10px]" style={{ color: "#a09ab0" }}>Press Enter or comma to add a skill tag</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Work Type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {WORK_TYPES.map(({ id, icon }) => (
                            <button key={id} type="button" onClick={() => setForm((f) => ({ ...f, workType: id }))}
                              className="flex flex-col items-center gap-1.5 py-3.5 rounded-xl transition-all"
                              style={form.workType === id
                                ? { background: "#552299", color: "#fff", border: "2px solid #552299", boxShadow: "0 2px 12px rgba(85,34,153,0.3)" }
                                : { background: "#faf9fc", color: "#4a4452", border: "2px solid rgba(85,34,153,0.1)" }}>
                              <span className="material-symbols-outlined text-xl">{icon}</span>
                              <span className="text-xs font-bold">{id}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#4a4452" }}>Role Icon</label>
                        <div className="flex gap-2 flex-wrap">
                          {ICONS.map((ico) => (
                            <button key={ico} type="button" onClick={() => setForm((f) => ({ ...f, icon: ico }))}
                              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                              style={form.icon === ico
                                ? { background: "#552299", boxShadow: "0 2px 8px rgba(85,34,153,0.3)" }
                                : { background: "#f5f3f7", border: "1px solid rgba(85,34,153,0.1)" }}>
                              <span className="material-symbols-outlined text-lg" style={{ color: form.icon === ico ? "#fff" : "#552299" }}>{ico}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer */}
              <AnimatePresence mode="wait">
                {step === "payment" && (
                  <motion.div key="footer-payment"
                    className="px-6 py-4 flex items-center justify-between gap-3 shrink-0"
                    style={{ borderTop: "1px solid rgba(85,34,153,0.08)", background: "#faf9fc" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button onClick={handleClose} className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-gray-200"
                      style={{ color: "#4a4452", background: "#efedf1" }}>Cancel</button>
                    <button onClick={handleConfirmPayment}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "linear-gradient(135deg,#552299 0%,#7c3aed 100%)", boxShadow: "0 4px 14px rgba(85,34,153,0.3)" }}>
                      <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                      Confirm Payment
                    </button>
                  </motion.div>
                )}
                {step === "form" && (
                  <motion.div key="footer-form"
                    className="px-6 py-4 flex items-center justify-end gap-3 shrink-0"
                    style={{ borderTop: "1px solid rgba(85,34,153,0.08)", background: "#faf9fc" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button onClick={handleClose} className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-gray-200"
                      style={{ color: "#4a4452", background: "#efedf1" }}>Cancel</button>
                    <button onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "linear-gradient(135deg,#552299 0%,#7c3aed 100%)", boxShadow: "0 4px 14px rgba(85,34,153,0.3)" }}>
                      <span className="material-symbols-outlined text-base">send</span>
                      Post Job
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── AIChatbot ────────────────────────────────────────────────────────────────

function AIChatbot({ open, setOpen, prefill, onPrefillConsumed }) {
  const navigate = useNavigate();
  const { setIsOpen: openPostJob } = usePostJob();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);

  // Populate input from CommandBar prefill when hub opens
  useEffect(() => {
    if (open && prefill) {
      setInput(prefill);
      onPrefillConsumed?.();
    }
  }, [open, prefill]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom on new messages / typing change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typing]);

  const addAIMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: "ai", text, ts: "just now" }]);
  };

  const getAIResponse = (msg) => {
    const m = msg.toLowerCase();
    if (/pipeline|hiring|team/.test(m))
      return { text: "Your pipeline has 4 active roles with 3,557 shortlisted candidates. Navigate to Hiring to manage your full team.", nav: () => setTimeout(() => navigate("/hiring"), 600) };
    if (/post|new job|create job/.test(m))
      return { text: "Opening the Post Job form for you! Fill in the details to publish a new role.", nav: () => setTimeout(() => openPostJob(true), 500) };
    if (/analytics|insight|stat|report/.test(m))
      return { text: "Navigating to Analytics — you'll find funnel metrics, velocity scores, and AI impact data there.", nav: () => setTimeout(() => navigate("/analytics"), 600) };
    if (/candidate|match|score|top/.test(m))
      return { text: "You have 5,451 processed candidates with 94% AI accuracy this cycle. 3,557 have been shortlisted across all active roles.", nav: null };
    if (/billing|plan|cost|price/.test(m))
      return { text: "You're on the Pro plan. Head to Billing to review usage, upgrade, or manage your subscription.", nav: () => setTimeout(() => navigate("/billing"), 600) };
    if (/setting|profile|config/.test(m))
      return { text: "You can manage your profile, AI settings, team permissions, and integrations in the Settings page.", nav: () => setTimeout(() => navigate("/settings"), 600) };
    return { text: "I'm analyzing your pipeline data. Our AI has processed 5,451 candidates across 7 active roles this week. Is there something specific I can help with?", nav: null };
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: text.trim(), ts: "just now" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const { text: aiText, nav } = getAIResponse(text);
      addAIMessage(aiText);
      nav?.();
    }, 1200);
  };

  const handleSuggestion = ({ label, action }) => {
    handleSend(label);
    if (action === "pipeline")   setTimeout(() => navigate("/hiring"),           1900);
    if (action === "analytics")  setTimeout(() => navigate("/analytics"),        1900);
    if (action === "candidates") setTimeout(() => navigate("/jobs/ai-engineer"), 1900);
    // "post" handled by keyword match inside getAIResponse
  };

  const userHasSent = messages.some((m) => m.role === "user");

  return (
    <>
      {/* ── Full-screen backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[48]"
            style={{
              background: "rgba(15, 10, 30, 0.52)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Command Hub window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[49] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={false}
          >
            <motion.div
              className="relative w-full max-w-2xl flex flex-col pointer-events-auto"
              style={{
                height: "min(82vh, 720px)",
                background: "rgba(250, 248, 255, 0.95)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 32px 80px rgba(85,34,153,0.22), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
                borderRadius: 24,
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4 shrink-0"
                style={{ borderBottom: "1px solid rgba(85,34,153,0.09)", background: "rgba(255,255,255,0.88)" }}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #552299, #7c3aed)",
                    boxShadow: "0 4px 12px rgba(85,34,153,0.3)",
                  }}
                >
                  <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>smart_toy</span>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm leading-tight" style={{ fontFamily: "Manrope, sans-serif", color: "#1b1b1e" }}>
                    Renate AI
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
                    <span className="text-[10px] font-bold" style={{ color: "#22c55e" }}>Online</span>
                    <span className="text-[10px]" style={{ color: "#a09ab0" }}>· Command Hub</span>
                  </div>
                </div>

                {/* Prominent close */}
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[#552299]/10 active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#552299" }}>close</span>
                </button>
              </div>

              {/* Messages */}
              <div
                ref={messagesRef}
                className="flex-1 overflow-y-auto px-5 py-5"
                style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex items-end gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mb-0.5"
                        style={{ background: "rgba(85,34,153,0.1)" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#552299" }}>smart_toy</span>
                      </div>
                    )}
                    <div
                      className="max-w-[78%] px-4 py-3 text-sm leading-relaxed"
                      style={msg.role === "ai" ? {
                        background: "rgba(255,255,255,0.9)",
                        color: "#1b1b1e",
                        borderRadius: "14px 14px 14px 3px",
                        border: "1px solid rgba(85,34,153,0.09)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      } : {
                        background: "linear-gradient(135deg, #552299, #7c3aed)",
                        color: "#fff",
                        borderRadius: "14px 14px 3px 14px",
                        boxShadow: "0 4px 14px rgba(85,34,153,0.32)",
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Suggestions — 2×2 grid, before first user message */}
                {!userHasSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="grid grid-cols-2 gap-2 pt-1"
                  >
                    {QUICK_SUGGESTIONS.map(({ label, icon, action }) => (
                      <button
                        key={label}
                        onClick={() => handleSuggestion({ label, action })}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97] text-left"
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          color: "#552299",
                          border: "1px solid rgba(85,34,153,0.15)",
                          boxShadow: "0 2px 8px rgba(85,34,153,0.07)",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Typing / Processing indicator */}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    {/* Pulsing glow avatar */}
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(85,34,153,0.1)",
                        animation: "command-glow 1.4s ease-in-out infinite",
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#552299" }}>smart_toy</span>
                    </div>
                    <div
                      className="px-4 py-3 flex items-center gap-1.5"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "14px 14px 14px 3px",
                        border: "1px solid rgba(85,34,153,0.09)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{
                          display: "inline-block", width: 7, height: 7, borderRadius: "50%",
                          background: "#552299", opacity: 0.5,
                          animation: "typing-dot 1.2s ease-in-out infinite",
                          animationDelay: `${i * 0.18}s`,
                        }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div
                className="px-4 pb-3 pt-2.5 shrink-0"
                style={{ borderTop: "1px solid rgba(85,34,153,0.08)", background: "rgba(255,255,255,0.75)" }}
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1.5px solid rgba(85,34,153,0.14)",
                    boxShadow: "0 2px 8px rgba(85,34,153,0.06)",
                  }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !typing && handleSend()}
                    placeholder="Ask Renate AI anything..."
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                    style={{ color: "#1b1b1e" }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => !typing && handleSend()}
                    disabled={typing || !input.trim()}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: input.trim() && !typing ? "linear-gradient(135deg, #552299, #7c3aed)" : "rgba(85,34,153,0.1)",
                      cursor: input.trim() && !typing ? "pointer" : "default",
                    }}
                  >
                    <span className="material-symbols-outlined"
                      style={{ fontSize: 16, color: input.trim() && !typing ? "#fff" : "#552299" }}>
                      send
                    </span>
                  </motion.button>
                </div>

                {/* Footer chip */}
                <div className="flex justify-center mt-2">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      background: "linear-gradient(135deg, rgba(85,34,153,0.07), rgba(124,58,237,0.07))",
                      color: "#7c3aed",
                      border: "1px solid rgba(85,34,153,0.12)",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 11 }}>auto_awesome</span>
                    Powered by Renate AI v2.0
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── CommandBar ───────────────────────────────────────────────────────────────

function CommandBar({ onActivate }) {
  const [localVal, setLocalVal] = useState("");
  const [hovered, setHovered] = useState(false);

  const activate = (val = localVal) => {
    onActivate(val);
    setLocalVal("");
  };

  return (
    <motion.div
      className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl cursor-text"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "90%",
        maxWidth: 600,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1.5px solid rgba(255,255,255,0.55)",
        border: "1px solid rgba(255,255,255,0.28)",
        outline: "1px solid rgba(85,34,153,0.13)",
        animation: hovered ? "none" : "dock-pulse 3.2s ease-in-out infinite",
        boxShadow: hovered
          ? "0 0 0 3px rgba(85,34,153,0.18), 0 20px 50px rgba(85,34,153,0.32), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 20px 50px rgba(85,34,153,0.3), 0 4px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.22s ease",
      }}
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => activate(localVal)}
    >
      {/* Sparkle icon */}
      <span
        className="material-symbols-outlined shrink-0"
        style={{ fontSize: 20, color: "#7c3aed" }}
      >
        auto_awesome
      </span>

      {/* Input */}
      <input
        type="text"
        value={localVal}
        onChange={(e) => {
          setLocalVal(e.target.value);
          if (e.target.value.length === 1) activate(e.target.value);
        }}
        onFocus={() => activate(localVal)}
        onKeyDown={(e) => e.key === "Enter" && activate()}
        placeholder="Ask Renate AI to post a job, check analytics, or manage candidates..."
        className="flex-1 bg-transparent text-sm focus:outline-none placeholder:truncate"
        style={{ color: "#1b1b1e", caretColor: "#552299", minWidth: 0 }}
      />

      {/* Cmd+K button badge */}
      <button
        onClick={(e) => { e.stopPropagation(); activate(localVal); }}
        className="hidden sm:flex items-center gap-1 text-[10px] font-black shrink-0 px-2.5 py-1.5 rounded-xl tracking-wide transition-all hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, rgba(85,34,153,0.12), rgba(124,58,237,0.12))",
          color: "#7c3aed",
          border: "1px solid rgba(85,34,153,0.18)",
          boxShadow: "0 1px 4px rgba(85,34,153,0.1)",
          letterSpacing: "0.04em",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 11 }}>keyboard_command_key</span>
        K
      </button>
    </motion.div>
  );
}

// ─── LandingPage ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [hubOpen, setHubOpen] = useState(false);
  const [hubPrefill, setHubPrefill] = useState("");

  const openHubWith = (text) => {
    setHubPrefill(text);
    setHubOpen(true);
  };

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30%            { opacity: 1;    transform: translateY(-3px); }
        }
        @keyframes command-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(85,34,153,0.0), 0 0 0 6px rgba(85,34,153,0.12); }
          50%       { box-shadow: 0 0 0 8px rgba(85,34,153,0.0), 0 0 0 14px rgba(124,58,237,0.18); }
        }
        @keyframes dock-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(85,34,153,0.0), 0 8px 32px rgba(85,34,153,0.14), 0 2px 8px rgba(0,0,0,0.06); }
          50%       { box-shadow: 0 0 0 6px rgba(85,34,153,0.07), 0 8px 40px rgba(85,34,153,0.22), 0 2px 8px rgba(0,0,0,0.06); }
        }
      `}</style>

      <PostJobModal />
      {createPortal(<CommandBar onActivate={openHubWith} />, document.body)}
      <AIChatbot
        open={hubOpen}
        setOpen={setHubOpen}
        prefill={hubPrefill}
        onPrefillConsumed={() => setHubPrefill("")}
      />

      <main className="max-w-screen-2xl mx-auto px-8 py-10" style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <PulseHero />
            <TickerRow />
            <BentoGrid />
          </div>
          <aside className="hidden xl:flex flex-col w-[272px] shrink-0 self-stretch">
            <AIBrainFeed />
          </aside>
        </div>

        {/* Mobile notification button — above CommandBar */}
        <div className="xl:hidden fixed bottom-24 right-6 z-50">
          <MobileNotificationsButton />
        </div>
      </main>
    </>
  );
}
