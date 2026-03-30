import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Static data ───────────────────────────────────────────────────────────────

const managerStats = [
  { label: "Active Roles", value: "12", icon: "work"     },
  { label: "Time to Hire", value: "18d", icon: "schedule" },
  { label: "Team Size",    value: "08", icon: "group"    },
];

const teamMembers = [
  {
    name: "Elena Rodriguez",
    role: "Active Recruiter",
    initials: "ER",
    color: "#7c3aed",
    stats: [
      { label: "Active Roles",  value: "7"   },
      { label: "Success Rate",  value: "91%" },
    ],
    actionLabel: "MANAGE PIPELINE",
    actionIcon: "manage_accounts",
  },
  {
    name: "Julian Chen",
    role: "Sourcing Specialist",
    initials: "JC",
    color: "#0ea5e9",
    stats: [
      { label: "Sourced / Month", value: "142" },
      { label: "Match Accuracy",  value: "87%" },
    ],
    actionLabel: "VIEW SOURCES",
    actionIcon: "travel_explore",
  },
];

const activities = [
  {
    icon: "person_search",
    iconBg: "#ecdcff",
    iconFg: "#552299",
    text: "Elena sourcing candidates for",
    highlight: "Principal Product Designer",
    time: "2 hours ago",
  },
  {
    icon: "move_down",
    iconBg: "#d1fae5",
    iconFg: "#065f46",
    text: "Julian moved 5 candidates to",
    highlight: "Interview Stage",
    time: "5 hours ago",
  },
];

const filterPills = ["By Performance", "By Load", "Recruiters", "Associates"];

// ── Shared styles ─────────────────────────────────────────────────────────────

const card = {
  background: "#ffffff",
  borderRadius: 14,
  border: "1px solid rgba(85,34,153,0.07)",
  boxShadow: "0 4px 20px rgba(85,34,153,0.08)",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function HiringPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <main
      className="min-h-screen px-6 py-9 xl:px-10"
      style={{ background: "#F8F9FB" }}
    >
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1
            className="font-extrabold tracking-tight leading-none"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.95rem", color: "#3d007d" }}
          >
            Organisation Hierarchy
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#4a4452" }}>
            Manage your hiring team's structure, capacity, and performance.
          </p>
        </div>
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shrink-0 transition-all hover:-translate-y-px"
          style={{ background: "#552299", boxShadow: "0 4px 14px rgba(85,34,153,0.28)" }}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add Role
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — Manager Hero + AI Insight
      ══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col xl:flex-row gap-5 mb-6">

        {/* Manager Hero Card */}
        <div className="flex-1 p-7" style={card}>

          {/* Avatar + Name */}
          <div className="flex items-start gap-5">
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 70, height: 70, borderRadius: "50%",
                background: "linear-gradient(145deg, #3d007d 0%, #552299 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Manrope, sans-serif", fontWeight: 900,
                fontSize: "1.35rem", color: "#fff",
                boxShadow: "0 6px 20px rgba(85,34,153,0.32)",
              }}>
                MT
              </div>
              {/* online dot */}
              <div style={{
                position: "absolute", bottom: 4, right: 4,
                width: 13, height: 13, borderRadius: "50%",
                background: "#22c55e", border: "2.5px solid #fff",
                boxShadow: "0 0 6px rgba(34,197,94,0.5)",
              }} />
            </div>

            <div style={{ flex: 1 }}>
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h2
                  style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900, fontSize: "1.3rem", color: "#1b1b1e" }}
                >
                  Marcus Thorne
                </h2>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "3px 10px", borderRadius: 99,
                  background: "#ecdcff", color: "#552299",
                }}>
                  Sr. HR Manager
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#4a4452", lineHeight: 1.5 }}>
                Overseeing end-to-end hiring across Engineering, Product & Design
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Engineering", "Product", "Design"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11, fontWeight: 600, color: "#6b5f78",
                      background: "#f5f3f7", padding: "3px 10px", borderRadius: 8,
                      border: "1px solid rgba(124,116,131,0.14)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-4 mt-6 pt-6"
            style={{ borderTop: "1px solid rgba(85,34,153,0.07)" }}
          >
            {managerStats.map(({ label, value, icon }) => (
              <div
                key={label}
                style={{
                  background: "#f8f6ff", borderRadius: 12, padding: "15px 16px",
                  border: "1px solid rgba(85,34,153,0.07)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined" style={{ color: "#7c3aed", fontSize: 15 }}>
                    {icon}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.11em", color: "#6b5f78",
                  }}>
                    {label}
                  </span>
                </div>
                <p style={{
                  fontFamily: "Manrope, sans-serif", fontWeight: 900,
                  fontSize: "1.75rem", color: "#3d007d", lineHeight: 1,
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Team Insight Card */}
        <div
          className="xl:w-80 rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: "#ecdcff",
            border: "1px solid rgba(85,34,153,0.13)",
            boxShadow: "0 4px 20px rgba(85,34,153,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div style={{
              width: 36, height: 36, borderRadius: 11, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #552299, #7c3aed)",
              boxShadow: "0 4px 12px rgba(85,34,153,0.3)",
            }}>
              <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 18 }}>
                auto_awesome
              </span>
            </div>
            <div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 13, color: "#3d007d" }}>
                AI Team Insight
              </p>
              <p style={{ fontSize: 11, color: "#7c3aed" }}>Updated just now</p>
            </div>
          </div>

          {/* Insight text */}
          <p style={{ fontSize: 13, color: "#2e0060", lineHeight: 1.75 }}>
            Marcus has successfully closed{" "}
            <strong style={{ color: "#552299" }}>3 high-priority VP roles</strong> this
            quarter with a 100% offer acceptance rate.
            <br /><br />
            Suggest{" "}
            <strong style={{ color: "#552299" }}>reassigning Sourcing Specialist</strong>{" "}
            to Q3 Tech Expansion to balance pipeline load.
          </p>

          {/* Efficiency Benchmark */}
          <div>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: "#552299" }}>
                Efficiency Benchmark
              </span>
              <span style={{ fontSize: 11, fontWeight: 900, color: "#3d007d" }}>92%</span>
            </div>
            <div style={{ height: 8, background: "rgba(85,34,153,0.15)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                width: "92%", height: "100%", borderRadius: 99,
                background: "linear-gradient(90deg, #552299, #7c3aed)",
                boxShadow: "0 0 8px rgba(124,58,237,0.35)",
              }} />
            </div>
            <p style={{ fontSize: 11, color: "#6b5f78", marginTop: 6 }}>
              Top 8% of HR managers in your industry
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — Team Grid
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        {/* Team member cards */}
        {teamMembers.map((m) => (
          <div key={m.name} className="rounded-2xl p-6 flex flex-col gap-5" style={card}>

            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: `linear-gradient(145deg, ${m.color}cc, ${m.color})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff",
                  boxShadow: `0 4px 14px ${m.color}44`,
                }}>
                  {m.initials}
                </div>
                <div style={{
                  position: "absolute", bottom: 2, right: 2,
                  width: 11, height: 11, borderRadius: "50%",
                  background: "#22c55e", border: "2px solid #fff",
                }} />
              </div>
              <div>
                <p style={{
                  fontFamily: "Manrope, sans-serif", fontWeight: 800,
                  fontSize: "0.98rem", color: "#1b1b1e",
                }}>
                  {m.name}
                </p>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: "#f0e8ff", color: "#552299",
                  padding: "2px 9px", borderRadius: 99,
                }}>
                  {m.role}
                </span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {m.stats.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "#f8f6ff", borderRadius: 10, padding: "11px 13px",
                    border: "1px solid rgba(85,34,153,0.07)",
                  }}
                >
                  <p style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#6b5f78", marginBottom: 5,
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: "Manrope, sans-serif", fontWeight: 900,
                    fontSize: "1.2rem", color: "#3d007d",
                  }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action button */}
            <button
              className="w-full rounded-xl font-extrabold text-xs text-white flex items-center justify-center gap-2 py-2.5 transition-all hover:-translate-y-px"
              style={{
                background: "#552299",
                letterSpacing: "0.1em",
                boxShadow: "0 4px 12px rgba(85,34,153,0.26)",
                border: "none", cursor: "pointer",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
                {m.actionIcon}
              </span>
              {m.actionLabel}
            </button>
          </div>
        ))}

        {/* Expand Team placeholder */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:-translate-y-px"
          style={{
            border: "2px dashed rgba(85,34,153,0.22)",
            background: "rgba(236,220,255,0.12)",
            minHeight: 220,
            boxShadow: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(236,220,255,0.3)";
            e.currentTarget.style.borderColor = "rgba(85,34,153,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(236,220,255,0.12)";
            e.currentTarget.style.borderColor = "rgba(85,34,153,0.22)";
          }}
        >
          <div style={{
            width: 54, height: 54, borderRadius: "50%",
            background: "rgba(85,34,153,0.09)",
            border: "2px dashed rgba(85,34,153,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className="material-symbols-outlined" style={{ color: "#552299", fontSize: 26 }}>add</span>
          </div>
          <div className="text-center">
            <p style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 800,
              fontSize: "0.95rem", color: "#552299",
            }}>
              Expand Team
            </p>
            <p style={{ fontSize: 12, color: "#6b5f78", marginTop: 4, lineHeight: 1.6 }}>
              Add a new coordinator or lead<br />to your hiring team
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 + 4 — Activity  |  Capacity + Filters
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* ── Recent Team Activity ── */}
        <div className="rounded-2xl p-6" style={card}>
          {/* header */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#f0e8ff",
            }}>
              <span className="material-symbols-outlined" style={{ color: "#552299", fontSize: 18 }}>
                history
              </span>
            </div>
            <div>
              <h3 style={{
                fontFamily: "Manrope, sans-serif", fontWeight: 800,
                fontSize: "0.95rem", color: "#1b1b1e",
              }}>
                Recent Team Activity
              </h3>
              <p style={{ fontSize: 11, color: "#6b5f78" }}>Live updates from your team</p>
            </div>
          </div>

          {/* activity rows */}
          <div className="flex flex-col gap-5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-4">
                {/* circle icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: a.iconBg, border: `1px solid ${a.iconFg}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span className="material-symbols-outlined" style={{ color: a.iconFg, fontSize: 18 }}>
                    {a.icon}
                  </span>
                </div>
                {/* text */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: "#1b1b1e", lineHeight: 1.55 }}>
                    {a.text}{" "}
                    <strong style={{ color: "#552299" }}>{a.highlight}</strong>
                  </p>
                  <p style={{ fontSize: 11, color: "#a09ab0", marginTop: 4 }}>{a.time}</p>
                </div>
                {/* connector line (not last) */}
              </div>
            ))}
          </div>
        </div>

        {/* ── Capacity + Filters ── */}
        <div className="flex flex-col gap-4">

          {/* Hiring Capacity Card */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #2e0060 0%, #552299 60%, #7c3aed 100%)",
              boxShadow: "0 8px 32px rgba(85,34,153,0.28)",
            }}
          >
            {/* decorative orb */}
            <div style={{
              position: "absolute", top: -50, right: -50, width: 180, height: 180,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,181,253,0.2), transparent)",
              pointerEvents: "none",
            }} />

            {/* label row */}
            <div className="flex items-center gap-2 mb-4" style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ color: "#e9d5ff", fontSize: 18 }}>speed</span>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#c4b5fd",
              }}>
                Hiring Capacity
              </span>
            </div>

            {/* big number */}
            <div className="flex items-end gap-3 mb-3" style={{ position: "relative" }}>
              <p style={{
                fontFamily: "Manrope, sans-serif", fontWeight: 900,
                fontSize: "3rem", color: "#fff", lineHeight: 1,
              }}>
                84%
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", paddingBottom: 7 }}>
                Utilization
              </p>
            </div>

            {/* bar */}
            <div
              style={{
                height: 7, background: "rgba(255,255,255,0.15)", borderRadius: 99,
                marginBottom: 16, position: "relative",
              }}
            >
              <div style={{
                width: "84%", height: "100%", borderRadius: 99,
                background: "linear-gradient(90deg, #c4b5fd, #ffffff)",
                boxShadow: "0 0 8px rgba(255,255,255,0.25)",
              }} />
            </div>

            {/* recommendation */}
            <div className="flex items-start gap-2" style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ color: "#fde68a", fontSize: 17, marginTop: 1 }}>
                warning
              </span>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>
                Team is near full capacity.{" "}
                <strong style={{ color: "#fde68a" }}>
                  Recommend onboarding 1 additional recruiter
                </strong>{" "}
                before the Q3 sprint begins.
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="rounded-2xl p-5" style={card}>
            <p style={{
              fontSize: 10, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#6b5f78", marginBottom: 14,
            }}>
              Quick Filters
            </p>
            <div className="flex flex-wrap gap-2">
              {filterPills.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className="transition-all hover:-translate-y-px"
                  style={{
                    padding: "7px 17px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                    cursor: "pointer",
                    background: activeFilter === i ? "#552299" : "#f5f3f7",
                    color: activeFilter === i ? "#fff" : "#4a4452",
                    border: `1.5px solid ${activeFilter === i ? "#552299" : "rgba(124,116,131,0.18)"}`,
                    boxShadow: activeFilter === i ? "0 3px 10px rgba(85,34,153,0.22)" : "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
