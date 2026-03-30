import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const funnelStages = [
  {
    stage: "Sourced",
    count: 5000,
    description: "Raw candidates identified by AI web-scraping and job boards.",
    icon: "travel_explore",
    aiInsight: "AI scanned 12,400+ profiles across 8 platforms to surface 5,000 top matches.",
    dropInsight: null,
  },
  {
    stage: "AI Screened",
    count: 1200,
    description: "Candidates who passed the initial automated skill-match.",
    icon: "smart_toy",
    aiInsight: "NLP models scored resumes on 24 technical signals — 94% precision on Python/ML roles.",
    dropInsight: "76% filtered due to missing technical depth in Python/LLMs.",
  },
  {
    stage: "Voice Validated",
    count: 450,
    description: "Top-tier talent that completed the AI-voice screening.",
    icon: "mic",
    aiInsight: "AI identified 450 candidates with 85%+ communication scores.",
    dropInsight: "62% dropped due to low verbal clarity or misaligned salary expectations.",
  },
  {
    stage: "Hiring Manager Review",
    count: 156,
    description: "Finalists hand-picked for the engineering team.",
    icon: "how_to_reg",
    aiInsight: "156 finalists ranked by composite: skills (50%), culture-fit (30%), communication (20%).",
    dropInsight: "65% deprioritized after structured ranking — flagged for future roles.",
  },
];

const aiImpact = [
  { label: "Time Saved",          value: "142 hrs", sub: "per month",                  icon: "schedule",            iconBg: "#ecdcff", iconFg: "#552299" },
  { label: "Cost per Hire",       value: "−22%",    sub: "reduction",                  icon: "savings",             iconBg: "#dfc8fd", iconFg: "#3d007d" },
  { label: "Accuracy",            value: "94%",     sub: "match rate",                 icon: "verified",            iconBg: "#d1fae5", iconFg: "#065f46" },
  { label: "Candidate Sentiment", value: "88%",     sub: "positive AI-voice experience", icon: "sentiment_satisfied", iconBg: "#fef3c7", iconFg: "#92400e" },
];

const sourcingData = [
  { source: "LinkedIn", pct: 40, color: "#0a66c2", icon: "person_search" },
  { source: "GitHub",   pct: 35, color: "#6e40c9", icon: "code" },
  { source: "Indeed",   pct: 25, color: "#2557a7", icon: "work" },
];

const velocityData = [
  { month: "Oct", days: 47 },
  { month: "Nov", days: 41 },
  { month: "Dec", days: 34 },
  { month: "Jan", days: 28 },
  { month: "Feb", days: 22 },
  { month: "Mar", days: 18 },
];

const MAX = funnelStages[0].count;
const FILL_COLORS = ["#552299", "#6b35b5", "#8845cf", "#a855f7"];

// ── Shared glass card style ───────────────────────────────────────────────────

const glassCard = {
  background: "rgba(255, 255, 255, 0.62)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255, 255, 255, 0.55)",
  boxShadow: "0 8px 32px rgba(85,34,153,0.09), inset 0 1px 0 rgba(255,255,255,0.7)",
};

// ── Animated Funnel Bar ───────────────────────────────────────────────────────

function FunnelBar(props) {
  const { x, y, width, height, index } = props;
  const ratio = funnelStages[index].count / MAX;
  const barW = Math.max(width * ratio, 28);
  const cx = x + width / 2;
  const rx = cx - barW / 2;
  const gId = `pg-${index}`;

  return (
    <g>
      <defs>
        <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#552299">
            <animate
              attributeName="stopColor"
              values="#552299;#7c3aed;#c084fc;#7c3aed;#552299"
              dur={`${2.8 + index * 0.35}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="55%" stopColor="#8b5cf6">
            <animate
              attributeName="stopColor"
              values="#8b5cf6;#c084fc;#552299;#c084fc;#8b5cf6"
              dur={`${2.8 + index * 0.35}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#c084fc">
            <animate
              attributeName="stopColor"
              values="#c084fc;#552299;#8b5cf6;#552299;#c084fc"
              dur={`${2.8 + index * 0.35}s`}
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      {/* glow bloom */}
      <rect
        x={rx + 2} y={y + 5} width={barW - 4} height={height}
        rx={8} fill={FILL_COLORS[index]} opacity={0.22}
        style={{ filter: "blur(9px)" }}
      />
      {/* main bar */}
      <rect x={rx} y={y} width={barW} height={height} rx={8} fill={`url(#${gId})`} />
    </g>
  );
}

// ── Smart Funnel Tooltip ──────────────────────────────────────────────────────

function FunnelTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = funnelStages[payload[0].payload.index];
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 10px 40px rgba(85,34,153,0.18)",
        border: "1px solid rgba(124,58,237,0.18)",
        borderRadius: 14,
        padding: "14px 16px",
        maxWidth: 265,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span className="material-symbols-outlined" style={{ color: "#7c3aed", fontSize: 17 }}>auto_awesome</span>
        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, color: "#552299", fontSize: 13 }}>
          {d.stage}
        </p>
      </div>
      <p style={{ fontWeight: 700, color: "#1b1b1e", fontSize: 14, marginBottom: 7 }}>
        {d.count.toLocaleString()} candidates
      </p>
      <p style={{ color: "#4a4452", fontSize: 12, lineHeight: 1.65 }}>{d.aiInsight}</p>
    </div>
  );
}

// ── Velocity Tooltip ──────────────────────────────────────────────────────────

function VelocityTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(124,58,237,0.18)",
        borderRadius: 10,
        padding: "8px 14px",
        boxShadow: "0 4px 20px rgba(85,34,153,0.14)",
      }}
    >
      <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#1b1b1e", fontWeight: 800, fontSize: 15 }}>{payload[0].value} days</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const chartData = funnelStages.map((s, i) => ({ stage: s.stage, count: s.count, index: i }));

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.65); }
        }
        @keyframes grad-sweep {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>

      <main
        className="min-h-screen px-6 py-8 xl:px-10"
        style={{
          background: "linear-gradient(140deg, #f3eeff 0%, #ede8ff 35%, #f8f4ff 65%, #eef1ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background orbs */}
        <div style={{
          position: "absolute", top: -100, right: -80, width: 460, height: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 60, left: -80, width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(85,34,153,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div className="mb-8" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#22c55e",
              animation: "pulse-dot 2s ease-in-out infinite",
              boxShadow: "0 0 8px rgba(34,197,94,0.55)",
            }} />
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#22c55e",
            }}>
              Live Intelligence
            </span>
          </div>
          <h1 style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(1.55rem, 3vw, 2.05rem)",
            fontWeight: 900,
            color: "#1b1b1e",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}>
            Predictive Intelligence{" "}
            <span style={{
              background: "linear-gradient(90deg, #552299, #7c3aed, #a855f7, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "250% 100%",
              animation: "grad-sweep 5s ease infinite",
            }}>
              Dashboard
            </span>
          </h1>
          <p style={{ marginTop: 6, fontSize: 13, color: "#6b5f78" }}>
            AI-powered recruitment pipeline — end-to-end predictive visibility
          </p>
        </div>

        {/* ── Main Layout ── */}
        <div className="flex flex-col xl:flex-row gap-6" style={{ position: "relative" }}>

          {/* ═══ LEFT COLUMN: Funnel + Sourcing Heatmap ═══ */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Smart Funnel Card */}
            <div className="rounded-2xl p-7" style={glassCard}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #552299, #7c3aed)",
                  boxShadow: "0 4px 14px rgba(85,34,153,0.32)",
                }}>
                  <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 18 }}>filter_alt</span>
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "Manrope, sans-serif", fontWeight: 800,
                    fontSize: "1.05rem", color: "#1b1b1e",
                  }}>
                    Smart Candidate Pipeline
                  </h2>
                  <p style={{ fontSize: 12, color: "#6b5f78" }}>
                    5,000 sourced → 156 finalists · hover bars for AI insights
                  </p>
                </div>
              </div>

              {/* Bar Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <XAxis
                    type="number"
                    domain={[0, MAX]}
                    tick={{ fill: "#cdc3d4", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    width={155}
                    tick={{ fill: "#4a4452", fontSize: 12, fontWeight: 600, fontFamily: "Manrope, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<FunnelTooltip />}
                    cursor={{ fill: "rgba(124,58,237,0.05)", radius: 8 }}
                  />
                  <Bar dataKey="count" shape={<FunnelBar />} radius={8}>
                    {chartData.map((_, i) => <Cell key={i} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Stage rows with drop-off insights */}
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
                {funnelStages.map((s, i) => {
                  const pct = Math.round((s.count / MAX) * 100);
                  const dropPct = i > 0
                    ? Math.round(((funnelStages[i - 1].count - s.count) / funnelStages[i - 1].count) * 100)
                    : null;

                  return (
                    <div key={s.stage} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      {/* Icon badge */}
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0, marginTop: 2,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(124,58,237,0.09)",
                        border: "1px solid rgba(124,58,237,0.14)",
                      }}>
                        <span className="material-symbols-outlined" style={{ color: FILL_COLORS[i], fontSize: 16 }}>
                          {s.icon}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Name + drop badge + count */}
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          marginBottom: 5, flexWrap: "wrap", gap: 4,
                        }}>
                          <span style={{
                            fontFamily: "Manrope, sans-serif", fontWeight: 700,
                            fontSize: 13, color: "#1b1b1e",
                          }}>
                            {s.stage}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            {dropPct !== null && (
                              <span style={{
                                fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20,
                                background: "rgba(198,40,40,0.08)", color: "#c62828",
                                border: "1px solid rgba(198,40,40,0.14)",
                              }}>
                                −{dropPct}% drop
                              </span>
                            )}
                            <span style={{ fontSize: 12, fontWeight: 800, color: FILL_COLORS[i] }}>
                              {s.count.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div style={{
                          height: 5, background: "rgba(124,58,237,0.09)",
                          borderRadius: 99, marginBottom: 5,
                        }}>
                          <div style={{
                            width: `${pct}%`, height: "100%", borderRadius: 99,
                            background: `linear-gradient(90deg, ${FILL_COLORS[i]}, #c084fc)`,
                          }} />
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: 11, color: "#6b5f78", lineHeight: 1.55 }}>
                          {s.description}
                        </p>

                        {/* Drop-off insight chip */}
                        {s.dropInsight && (
                          <div style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            marginTop: 6, padding: "4px 10px", borderRadius: 8,
                            background: "rgba(245,158,11,0.08)",
                            border: "1px solid rgba(245,158,11,0.22)",
                          }}>
                            <span className="material-symbols-outlined" style={{ color: "#d97706", fontSize: 13 }}>
                              insights
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#92400e", lineHeight: 1.4 }}>
                              {s.dropInsight}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sourcing Heatmap Card */}
            <div className="rounded-2xl p-6" style={glassCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 11,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
                  boxShadow: "0 4px 12px rgba(14,165,233,0.22)",
                }}>
                  <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 17 }}>public</span>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "Manrope, sans-serif", fontWeight: 800,
                    fontSize: "0.95rem", color: "#1b1b1e",
                  }}>
                    Talent Source Distribution
                  </h3>
                  <p style={{ fontSize: 11, color: "#6b5f78" }}>
                    Where Scraping Agent finds best-fit candidates
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {sourcingData.map(({ source, pct, color, icon }) => (
                  <div key={source}>
                    <div style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between", marginBottom: 8,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `${color}18`,
                          border: `1px solid ${color}30`,
                        }}>
                          <span className="material-symbols-outlined" style={{ color, fontSize: 15 }}>{icon}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1b1b1e" }}>{source}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color }}>
                        {pct}%{" "}
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#6b5f78" }}>of pipeline</span>
                      </span>
                    </div>
                    <div style={{
                      height: 9, background: "rgba(124,58,237,0.07)",
                      borderRadius: 99, overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${pct}%`, height: "100%", borderRadius: 99,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN: AI Impact + Velocity ═══ */}
          <div className="xl:w-80 flex flex-col gap-5">

            {/* AI Impact header */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2e0060 0%, #552299 55%, #7c3aed 100%)",
                boxShadow: "0 8px 36px rgba(85,34,153,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div style={{
                position: "absolute", top: -45, right: -45, width: 180, height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,181,253,0.22), transparent)",
              }} />
              <div style={{
                position: "absolute", bottom: -30, left: -25, width: 130, height: 130,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent)",
              }} />
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 12, position: "relative",
              }}>
                <span className="material-symbols-outlined" style={{ color: "#e9d5ff", fontSize: 18 }}>
                  auto_awesome
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#c4b5fd",
                }}>
                  AI Impact Summary
                </span>
              </div>
              <p style={{
                color: "rgba(255,255,255,0.88)", fontSize: 13,
                lineHeight: 1.75, fontFamily: "Inter, sans-serif", position: "relative",
              }}>
                Renate AI reduced your hiring cycle from{" "}
                <strong style={{ color: "#fde68a" }}>47 days</strong> to just{" "}
                <strong style={{ color: "#86efac" }}>18 days</strong>, while improving
                final-hire quality to{" "}
                <strong style={{ color: "#fff" }}>94% match accuracy</strong>.
              </p>
            </div>

            {/* AI Metric cards */}
            {aiImpact.map(({ label, value, sub, icon, iconBg, iconFg }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{ ...glassCard, display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: iconBg,
                  border: `1px solid ${iconFg}22`,
                }}>
                  <span className="material-symbols-outlined" style={{ color: iconFg, fontSize: 22 }}>{icon}</span>
                </div>
                <div>
                  <p style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.13em", color: "#6b5f78",
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: "Manrope, sans-serif", fontWeight: 900,
                    fontSize: "1.45rem", color: iconFg, lineHeight: 1.1,
                  }}>
                    {value}
                  </p>
                  <p style={{ fontSize: 11, color: "#a09ab0", marginTop: 2 }}>{sub}</p>
                </div>
              </div>
            ))}

            {/* Hiring Velocity Chart */}
            <div className="rounded-2xl p-5" style={glassCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  boxShadow: "0 3px 10px rgba(16,185,129,0.25)",
                }}>
                  <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 17 }}>trending_down</span>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "Manrope, sans-serif", fontWeight: 800,
                    fontSize: "0.9rem", color: "#1b1b1e",
                  }}>
                    Hiring Velocity
                  </h3>
                  <p style={{ fontSize: 11, color: "#6b5f78" }}>Time-to-Hire Trend · last 6 months</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={148}>
                <AreaChart
                  data={velocityData}
                  margin={{ top: 10, right: 6, left: -24, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="velFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(124,58,237,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#a09ab0" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#a09ab0" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[14, 50]}
                  />
                  <Tooltip content={<VelocityTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="days"
                    stroke="#7c3aed"
                    strokeWidth={2.5}
                    fill="url(#velFill)"
                    dot={{ fill: "#7c3aed", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#10b981", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#c62828" }}>↑ 47 days (Oct)</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#059669" }}>↓ 18 days (Mar) · −62%</span>
              </div>
            </div>

            {/* Pipeline Conversion summary */}
            <div className="rounded-2xl p-5" style={glassCard}>
              <p style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.15em", color: "#6b5f78", marginBottom: 14,
              }}>
                Pipeline Conversion
              </p>
              {funnelStages.map((s, i) => (
                <div
                  key={s.stage}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: i < funnelStages.length - 1
                      ? "1px solid rgba(124,58,237,0.07)"
                      : "none",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1b1b1e" }}>{s.stage}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 800, padding: "2px 11px", borderRadius: 99,
                    background: "rgba(124,58,237,0.09)", color: FILL_COLORS[i],
                    border: `1px solid ${FILL_COLORS[i]}28`,
                  }}>
                    {((s.count / MAX) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
