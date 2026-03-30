import { useState } from "react";
import {
  Star,
  Check,
  Zap,
  Rocket,
  Building2,
  ArrowRight,
  Mic,
  Cpu,
  Layers,
  TrendingUp,
  Clock,
  Shield,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Pricing data
───────────────────────────────────────────── */
const plans = [
  {
    id: "explore",
    name: "EXPLORE",
    price: 350,
    period: "/ month",
    tagline: "Perfect for teams getting started",
    icon: Zap,
    highlighted: false,
    features: [
      "Up to 2,000 minutes / month",
      "3 concurrent AI agents",
      "Basic analytics dashboard",
      "Email support (48h SLA)",
      "Standard voice quality",
      "REST API access",
      "Community templates library",
    ],
  },
  {
    id: "growth",
    name: "GROWTH",
    price: 1200,
    period: "/ month",
    tagline: "Scale your AI hiring pipeline fast",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 10,000 minutes / month",
      "15 concurrent AI agents",
      "Advanced analytics & reporting",
      "Priority support (4h SLA)",
      "HD voice quality + custom voice",
      "Full API + webhooks",
      "Custom workflow builder",
      "ATS integrations (Greenhouse, Lever)",
      "Team collaboration tools",
    ],
  },
  {
    id: "scale",
    name: "SCALE",
    price: 2500,
    period: "/ month",
    tagline: "Enterprise-grade for high-volume hiring",
    icon: Building2,
    highlighted: false,
    features: [
      "Unlimited minutes",
      "Unlimited concurrent agents",
      "Enterprise analytics suite",
      "Dedicated success manager (1h SLA)",
      "Studio-grade voice + cloning",
      "Custom API + secure data pipeline",
      "White-label options",
      "SSO & advanced RBAC",
      "SLA guarantee (99.95% uptime)",
      "On-premise deployment available",
    ],
  },
];

/* ─────────────────────────────────────────────
   Cost rates
───────────────────────────────────────────── */
const RATES = {
  llm: 0.009,
  voice: 0.05,
  platform: 0.02,
};

const total_rate = RATES.llm + RATES.voice + RATES.platform;

function fmt(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function StatBox({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1">
        <Icon size={20} className="text-purple-200" />
      </div>
      <span className="text-2xl font-headline font-bold text-white">{value}</span>
      <span className="text-xs text-purple-200/70 font-body text-center leading-tight">{label}</span>
    </div>
  );
}

function CostBar({ label, icon: Icon, cost, totalCost, color }) {
  const pct = totalCost > 0 ? (cost / totalCost) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-gray-400" />
          <span className="text-sm font-body text-gray-600">{label}</span>
        </div>
        <span className="text-sm font-headline font-semibold text-gray-800">${fmt(cost)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="text-[10px] text-gray-400 font-body text-right">{pct.toFixed(1)}% of total</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function Billing() {
  const [minutes, setMinutes] = useState(5000);

  const llmCost = minutes * RATES.llm;
  const voiceCost = minutes * RATES.voice;
  const platformCost = minutes * RATES.platform;
  const totalCost = minutes * total_rate;

  return (
    <main className="font-body bg-[#f6f4fb] min-h-screen px-8 py-10 space-y-12">

      {/* ══════════════════════════════════════
          SECTION A — ENTERPRISE PILOT HERO
      ══════════════════════════════════════ */}
      <section
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(135deg, #2a0060 0%, #4c1d95 45%, #7c3aed 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c084fc, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #818cf8, transparent)", transform: "translateY(40%)" }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 px-10 py-14">

          {/* LEFT — Copy */}
          <div className="flex-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 rounded-full px-4 py-1.5">
              <Star size={14} className="text-amber-300 fill-amber-300" />
              <span className="text-xs font-headline font-bold text-amber-200 tracking-widest uppercase">
                Limited Time Offer
              </span>
            </div>

            <div>
              <h1 className="font-headline font-extrabold text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                $500&nbsp;
                <span
                  className="font-headline"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #c084fc, #f0abfc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  for 10,000 minutes
                </span>
              </h1>
              <p className="mt-3 text-purple-200 font-body text-lg max-w-lg leading-relaxed">
                Launch your AI-powered hiring pipeline in under&nbsp;
                <strong className="text-white">48 hours</strong>. One flat price. Zero
                surprises.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-bold text-[#2a0060] text-sm transition-all duration-200 shadow-lg hover:shadow-purple-400/40 hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: "linear-gradient(135deg, #c084fc, #f0abfc)" }}
              >
                <Rocket size={16} />
                Activate Pilot
                <ArrowRight size={15} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-bold text-white text-sm border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200">
                Talk to Sales
                <ChevronRight size={15} />
              </button>
            </div>

            <p className="text-purple-300/60 text-xs font-body">
              ✦ No credit card required &nbsp;·&nbsp; ✦ Cancel anytime &nbsp;·&nbsp; ✦ Enterprise SLA
            </p>
          </div>

          {/* RIGHT — Glassmorphism stats */}
          <div
            className="shrink-0 w-full max-w-xs rounded-2xl border border-white/15 p-8 space-y-6 shadow-xl"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
          >
            <p className="text-purple-200/60 text-[11px] uppercase tracking-[0.2em] font-headline text-center">
              Pilot Includes
            </p>

            <div className="grid grid-cols-3 gap-4">
              <StatBox icon={Clock}    value="48h"    label="Launch guarantee" />
              <StatBox icon={Mic}      value="10K"    label="AI call minutes" />
              <StatBox icon={Shield}   value="99.9%"  label="Uptime SLA" />
            </div>

            <div className="border-t border-white/10 pt-5 space-y-3">
              {[
                "Full ATS integration",
                "Dedicated onboarding",
                "Custom voice persona",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-400/20 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-purple-300" />
                  </div>
                  <span className="text-purple-100/80 text-xs font-body">{f}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <span className="text-3xl font-headline font-black text-white">$500</span>
              <span className="text-purple-300/70 text-sm font-body ml-1">one-time</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION B — 3-TIER PRICING GRID
      ══════════════════════════════════════ */}
      <section>
        <div className="text-center mb-10">
          <p className="text-xs font-headline font-bold tracking-[0.3em] uppercase text-[#552299] mb-2">
            Subscription Plans
          </p>
          <h2 className="font-headline font-extrabold text-3xl text-gray-900 tracking-tight">
            Choose your growth tier
          </h2>
          <p className="mt-2 text-gray-500 font-body text-base max-w-xl mx-auto">
            All plans include core AI interviewing, analytics, and API access.
            Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "shadow-2xl shadow-purple-400/30 ring-2 ring-[#552299]"
                    : "shadow-md hover:shadow-lg border border-gray-100"
                }`}
                style={
                  plan.highlighted
                    ? { background: "linear-gradient(160deg, #552299 0%, #3d007d 100%)" }
                    : { background: "#ffffff" }
                }
              >
                {/* Most Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute top-5 right-5 text-[10px] font-headline font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: "linear-gradient(135deg, #c084fc, #f0abfc)", color: "#2a0060" }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1 gap-6">
                  {/* Header */}
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                        plan.highlighted ? "bg-white/15" : "bg-purple-50"
                      }`}
                    >
                      <Icon size={22} className={plan.highlighted ? "text-purple-200" : "text-[#552299]"} />
                    </div>

                    <p
                      className={`text-[10px] font-headline font-black tracking-[0.25em] uppercase mb-1 ${
                        plan.highlighted ? "text-purple-300" : "text-[#552299]"
                      }`}
                    >
                      {plan.name}
                    </p>

                    <div className="flex items-end gap-1">
                      <span
                        className={`font-headline font-black text-4xl ${
                          plan.highlighted ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${plan.price.toLocaleString()}
                      </span>
                      <span
                        className={`font-body text-sm mb-1.5 ${
                          plan.highlighted ? "text-purple-200/70" : "text-gray-400"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={`text-sm font-body mt-1 ${
                        plan.highlighted ? "text-purple-200/80" : "text-gray-500"
                      }`}
                    >
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.highlighted ? "bg-purple-300/20" : "bg-purple-50"
                          }`}
                        >
                          <Check
                            size={10}
                            className={plan.highlighted ? "text-purple-200" : "text-[#552299]"}
                          />
                        </div>
                        <span
                          className={`text-sm font-body leading-snug ${
                            plan.highlighted ? "text-purple-100/90" : "text-gray-600"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full mt-2 py-3 rounded-xl font-headline font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      plan.highlighted
                        ? "bg-white text-[#552299] hover:bg-purple-50 shadow-lg"
                        : "bg-[#552299] text-white hover:bg-[#3d007d] shadow-md shadow-purple-400/20"
                    }`}
                  >
                    {plan.id === "scale" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION C — LIVE COST CALCULATOR
      ══════════════════════════════════════ */}
      <section className="rounded-3xl bg-white border border-gray-100 shadow-md p-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT — controls */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-[#552299]" />
                <p className="text-[11px] font-headline font-bold tracking-[0.3em] uppercase text-[#552299]">
                  Live Cost Calculator
                </p>
              </div>
              <h2 className="font-headline font-extrabold text-2xl text-gray-900 tracking-tight">
                Estimate your monthly spend
              </h2>
              <p className="mt-1 text-gray-500 font-body text-sm">
                Drag the slider to see a real-time cost breakdown.
              </p>
            </div>

            {/* Minute display */}
            <div className="text-center p-6 rounded-2xl bg-purple-50 border border-purple-100">
              <p className="text-gray-500 text-xs font-body uppercase tracking-widest mb-1">Monthly Usage</p>
              <p className="font-headline font-black text-5xl text-[#552299]">
                {minutes.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm font-body">minutes</p>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-body">
                <span>1,000 min</span>
                <span>50,000 min</span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={100}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full h-2 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #552299 0%, #552299 ${
                    ((minutes - 1000) / (50000 - 1000)) * 100
                  }%, #e9e7eb ${((minutes - 1000) / (50000 - 1000)) * 100}%, #e9e7eb 100%)`,
                }}
              />
              <style>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: #552299;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(85,34,153,0.35);
                  cursor: pointer;
                  transition: transform 0.15s;
                }
                input[type='range']::-webkit-slider-thumb:hover {
                  transform: scale(1.15);
                }
              `}</style>
            </div>

            {/* Quick presets */}
            <div className="flex gap-2 flex-wrap">
              {[1000, 5000, 10000, 25000, 50000].map((v) => (
                <button
                  key={v}
                  onClick={() => setMinutes(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-headline font-bold transition-all duration-150 ${
                    minutes === v
                      ? "bg-[#552299] text-white shadow-md"
                      : "bg-gray-100 text-gray-500 hover:bg-purple-50 hover:text-[#552299]"
                  }`}
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — breakdown */}
          <div className="flex-1 space-y-8">
            {/* Total cost callout */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "linear-gradient(135deg, #2a0060, #7c3aed)" }}
            >
              <p className="text-purple-200/70 text-xs font-body uppercase tracking-widest mb-1">
                Estimated Monthly Total
              </p>
              <p className="font-headline font-black text-5xl text-white">
                ${fmt(totalCost)}
              </p>
              <p className="text-purple-300/60 text-xs font-body mt-1">
                for {minutes.toLocaleString()} minutes
              </p>
            </div>

            {/* Rate cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "LLM",      rate: RATES.llm,      icon: Cpu,    cost: llmCost,      color: "#552299" },
                { label: "Voice",    rate: RATES.voice,    icon: Mic,    cost: voiceCost,    color: "#7c3aed" },
                { label: "Platform", rate: RATES.platform, icon: Layers, cost: platformCost, color: "#a855f7" },
              ].map(({ label, rate, icon: Icon, cost, color }) => (
                <div key={label} className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-center space-y-1">
                  <Icon size={16} className="mx-auto" style={{ color }} />
                  <p className="text-xs text-gray-400 font-body">{label}</p>
                  <p className="font-headline font-bold text-gray-800 text-sm">${fmt(cost)}</p>
                  <p className="text-[10px] text-gray-400 font-body">${rate}/min</p>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="space-y-5">
              <p className="text-xs font-headline font-bold tracking-widest uppercase text-gray-400">
                Cost Breakdown
              </p>

              <CostBar
                label="LLM Processing"
                icon={Cpu}
                cost={llmCost}
                totalCost={totalCost}
                color="linear-gradient(90deg, #552299, #7c3aed)"
              />
              <CostBar
                label="Voice Synthesis"
                icon={Mic}
                cost={voiceCost}
                totalCost={totalCost}
                color="linear-gradient(90deg, #7c3aed, #a855f7)"
              />
              <CostBar
                label="Platform Fee"
                icon={Layers}
                cost={platformCost}
                totalCost={totalCost}
                color="linear-gradient(90deg, #a855f7, #d946ef)"
              />
            </div>

            <p className="text-center text-xs text-gray-400 font-body border-t border-gray-100 pt-4">
              Rates: LLM $0.009&nbsp;·&nbsp;Voice $0.050&nbsp;·&nbsp;Platform $0.020&nbsp;per minute
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
