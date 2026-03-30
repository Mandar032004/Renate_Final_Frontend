import { useState } from "react";

// ─── Reusable primitives ────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[22px] w-[42px] shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#552299]/40 ${
        checked ? "bg-[#552299]" : "bg-surface-container-highest"
      }`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function Field({ label, type = "text", placeholder, defaultValue, value, onChange, readOnly, className = "", mono }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-sm text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-[#552299]/25 focus:border-[#552299]/50 transition-all ${mono ? "font-mono text-xs" : ""} ${readOnly ? "opacity-70 cursor-default" : ""} ${className}`}
      />
    </div>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-[#552299]/25 focus:border-[#552299]/50 transition-all appearance-none cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}

function Slider({ label, value, onChange, min = 0, max = 100, suffix = "%" }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">{label}</label>
        <span className="text-sm font-bold text-[#552299] tabular-nums">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#552299] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
        style={{
          background: `linear-gradient(to right, #552299 0%, #552299 ${pct}%, #e3e2e6 ${pct}%, #e3e2e6 100%)`,
        }}
      />
    </div>
  );
}

function SaveButton({ label = "Save Changes", onClick, success, loading, icon = "save" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 ${
        success
          ? "bg-emerald-600 text-white"
          : loading
          ? "bg-[#552299]/70 text-white cursor-wait"
          : "bg-[#552299] text-white hover:bg-[#3d007d] hover:shadow-md"
      }`}
    >
      <span className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}>
        {success ? "check" : loading ? "sync" : icon}
      </span>
      {success ? "Saved!" : loading ? "Saving…" : label}
    </button>
  );
}

function useSave() {
  const [state, setState] = useState(null);
  const trigger = () => {
    setState("loading");
    setTimeout(() => setState("success"), 900);
    setTimeout(() => setState(null), 2800);
  };
  return [state === "success", state === "loading", trigger];
}

function Divider() {
  return <div className="h-px bg-outline-variant/10 -mx-6" />;
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-outline-variant/8 last:border-0">
      <div className="pr-4">
        <p className="text-sm font-medium text-on-surface leading-tight">{label}</p>
        {desc && <p className="text-xs text-outline mt-0.5 leading-snug">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Panel: Profile Information ─────────────────────────────────────────────

function ProfileInformation() {
  const [success, loading, save] = useSave();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#552299]/5 border border-[#552299]/10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#552299] to-[#3d007d] flex items-center justify-center text-white font-extrabold text-lg font-headline shadow-md">
          RA
        </div>
        <div>
          <button className="text-sm font-semibold text-[#552299] hover:text-[#3d007d] transition-colors">
            Change photo
          </button>
          <p className="text-xs text-outline mt-0.5">JPG, PNG or GIF · Max 2 MB</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" defaultValue="Renate" placeholder="First name" />
        <Field label="Last Name" defaultValue="Admin" placeholder="Last name" />
      </div>
      <Field label="Email" type="email" defaultValue="admin@renate.ai" placeholder="you@company.com" />
      <Field label="Job Title" defaultValue="Talent Acquisition Lead" placeholder="Your role" />
      <Field label="Company" defaultValue="Renate AI" placeholder="Company name" />
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Bio</label>
        <textarea
          rows={3}
          defaultValue="Managing AI-powered recruitment at scale."
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-sm text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-[#552299]/25 focus:border-[#552299]/50 transition-all resize-none"
        />
      </div>
      <SaveButton success={success} loading={loading} onClick={save} />
    </div>
  );
}

// ─── Panel: Email & Notifications ───────────────────────────────────────────

function EmailNotifications() {
  const [prefs, setPrefs] = useState({
    newApplications: true,
    interviewScheduled: true,
    statusChanges: false,
    teamMentions: true,
    weeklyDigest: true,
    aiRecommendations: false,
    securityAlerts: true,
  });
  const [success, loading, save] = useSave();

  const rows = [
    { key: "newApplications", label: "New candidate applications", desc: "When a new application is submitted" },
    { key: "interviewScheduled", label: "Interview scheduled", desc: "Confirmation when interviews are booked" },
    { key: "statusChanges", label: "Candidate status changes", desc: "When a candidate moves through stages" },
    { key: "teamMentions", label: "Team mentions", desc: "When someone mentions you in a comment" },
    { key: "weeklyDigest", label: "Weekly digest", desc: "Summary of hiring activity every Monday" },
    { key: "aiRecommendations", label: "AI recommendations", desc: "When Renate AI surfaces top candidates" },
    { key: "securityAlerts", label: "Security alerts", desc: "Login attempts and account changes" },
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="-mx-0">
        {rows.map(({ key, label, desc }) => (
          <ToggleRow
            key={key}
            label={label}
            desc={desc}
            checked={prefs[key]}
            onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
          />
        ))}
      </div>
      <div className="pt-4">
        <SaveButton label="Save Preferences" success={success} loading={loading} onClick={save} icon="notifications" />
      </div>
    </div>
  );
}

// ─── Panel: Password & Security ─────────────────────────────────────────────

function PasswordSecurity() {
  const [twoFA, setTwoFA] = useState(false);
  const [success, loading, save] = useSave();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.08em] mb-3">Change Password</p>
        <div className="flex flex-col gap-3">
          <Field label="Current Password" type="password" placeholder="••••••••" />
          <Field label="New Password" type="password" placeholder="••••••••" />
          <Field label="Confirm New Password" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-4">
          <SaveButton label="Update Password" success={success} loading={loading} onClick={save} icon="lock_reset" />
        </div>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-on-surface">Two-Factor Authentication</p>
          <p className="text-xs text-outline mt-0.5">Add an extra layer of security</p>
        </div>
        <Toggle checked={twoFA} onChange={setTwoFA} />
      </div>

      <Divider />

      <div>
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.08em] mb-3">Active Sessions</p>
        {[
          { device: "Chrome · macOS", location: "Mumbai, IN", time: "Current session", current: true },
          { device: "Safari · iPhone 15", location: "Mumbai, IN", time: "2 hours ago", current: false },
          { device: "Firefox · Windows", location: "Pune, IN", time: "3 days ago", current: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-outline-variant/8 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-outline text-base">devices</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">{s.device}</p>
              <p className="text-xs text-outline">{s.location} · {s.time}</p>
            </div>
            {s.current ? (
              <span className="text-[10px] font-bold text-[#552299] bg-[#552299]/10 px-2 py-0.5 rounded-full">Active</span>
            ) : (
              <button className="text-xs text-error hover:underline font-medium">Revoke</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel: Voice Assessment Settings ───────────────────────────────────────

function VoiceAssessmentSettings() {
  const [lang, setLang] = useState("en-US");
  const [sensitivity, setSensitivity] = useState(70);
  const [pause, setPause] = useState(40);
  const [noise, setNoise] = useState(true);
  const [transcript, setTranscript] = useState(true);
  const [success, loading, save] = useSave();

  return (
    <div className="flex flex-col gap-5">
      <Select label="Assessment Language" value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="ja">Japanese</option>
      </Select>

      <Divider />

      <Slider label="Speech Sensitivity" value={sensitivity} onChange={setSensitivity} />
      <Slider label="Pause Detection Threshold" value={pause} onChange={setPause} />

      <Divider />

      <ToggleRow label="Background Noise Reduction" desc="Filter ambient noise during assessments" checked={noise} onChange={setNoise} />
      <ToggleRow label="Auto-Transcription" desc="Automatically transcribe voice responses" checked={transcript} onChange={setTranscript} />

      <div className="pt-1">
        <SaveButton label="Save Settings" success={success} loading={loading} onClick={save} icon="mic" />
      </div>
    </div>
  );
}

// ─── Panel: Match Threshold ──────────────────────────────────────────────────

function MatchThreshold() {
  const [threshold, setThreshold] = useState(65);
  const [weights, setWeights] = useState({ hard: 50, soft: 30, exp: 20 });
  const [success, loading, save] = useSave();

  const total = weights.hard + weights.soft + weights.exp;
  const balanced = total === 100;

  const reset = () => { setThreshold(65); setWeights({ hard: 50, soft: 30, exp: 20 }); };

  return (
    <div className="flex flex-col gap-5">
      <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${balanced ? "bg-[#552299]/5 border-[#552299]/15" : "bg-amber-50 border-amber-200"}`}>
        <span className={`material-symbols-outlined text-base mt-0.5 ${balanced ? "text-[#552299]" : "text-amber-600"}`}>
          {balanced ? "info" : "warning"}
        </span>
        <p className={`text-xs leading-relaxed ${balanced ? "text-on-surface-variant" : "text-amber-800"}`}>
          {balanced
            ? <>Candidates below <strong className="text-[#552299]">{threshold}%</strong> match will not appear in shortlists.</>
            : <>Weights must total <strong>100%</strong>. Currently <strong>{total}%</strong>.</>}
        </p>
      </div>

      <Slider label="Minimum Match Threshold" value={threshold} onChange={setThreshold} />

      <Divider />

      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Scoring Weights</p>
      <Slider label="Hard Skills" value={weights.hard} onChange={(v) => setWeights((w) => ({ ...w, hard: v }))} />
      <Slider label="Soft Skills" value={weights.soft} onChange={(v) => setWeights((w) => ({ ...w, soft: v }))} />
      <Slider label="Experience" value={weights.exp} onChange={(v) => setWeights((w) => ({ ...w, exp: v }))} />

      <div className="flex items-center gap-2 pt-1">
        <SaveButton success={success} loading={loading} onClick={save} icon="tune" />
        <button
          onClick={reset}
          className="px-4 py-2.5 rounded-lg border border-outline-variant/25 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ─── Panel: AI Model Preferences ────────────────────────────────────────────

function AIModelPreferences() {
  const [model, setModel] = useState("advanced");
  const [creativity, setCreativity] = useState(50);
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [contextWindow, setContextWindow] = useState(true);
  const [success, loading, save] = useSave();

  const models = [
    { id: "standard", label: "Standard", desc: "Faster · Lower cost", icon: "bolt" },
    { id: "advanced", label: "Advanced", desc: "Balanced performance & accuracy", icon: "auto_awesome" },
    { id: "expert", label: "Expert", desc: "Highest accuracy · Deep analysis", icon: "psychology" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">AI Model</label>
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModel(m.id)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
              model === m.id
                ? "border-[#552299] bg-[#552299]/5"
                : "border-outline-variant/20 bg-surface-container-low hover:border-[#552299]/30"
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${model === m.id ? "text-[#552299]" : "text-outline"}`}>{m.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold leading-tight ${model === m.id ? "text-[#552299]" : "text-on-surface"}`}>{m.label}</p>
              <p className="text-xs text-outline mt-0.5">{m.desc}</p>
            </div>
            {model === m.id && (
              <span className="material-symbols-outlined text-[#552299] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <Slider label="Response Creativity" value={creativity} onChange={setCreativity} />
        <div className="flex justify-between text-[10px] text-outline font-medium">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      <Divider />

      <ToggleRow label="Auto-Suggest Candidates" desc="AI proactively recommends top fits" checked={autoSuggest} onChange={setAutoSuggest} />
      <ToggleRow label="Extended Context Window" desc="Remember more interview history" checked={contextWindow} onChange={setContextWindow} />

      <div className="pt-1">
        <SaveButton label="Save Preferences" success={success} loading={loading} onClick={save} icon="smart_toy" />
      </div>
    </div>
  );
}

// ─── Panel: Members & Roles ──────────────────────────────────────────────────

function MembersRoles() {
  const members = [
    { name: "Sarah Chen", email: "sarah@renate.ai", role: "Admin", initials: "SC", active: true },
    { name: "Marcus Johnson", email: "marcus@renate.ai", role: "Manager", initials: "MJ", active: true },
    { name: "Priya Kapoor", email: "priya@renate.ai", role: "Reviewer", initials: "PK", active: false },
    { name: "Alex Rivera", email: "alex@renate.ai", role: "Reviewer", initials: "AR", active: true },
  ];

  const roleStyle = {
    Admin: "bg-[#552299]/10 text-[#552299]",
    Manager: "bg-blue-100 text-blue-700",
    Reviewer: "bg-surface-container-high text-on-surface-variant",
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-on-surface-variant">{members.length} members</p>
        <span className="text-[10px] font-bold text-[#552299] bg-[#552299]/10 px-2.5 py-1 rounded-full">Pro · 10 seats</span>
      </div>
      {members.map((m, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/20 transition-colors">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
              m.active ? "bg-gradient-to-br from-[#552299] to-[#3d007d]" : "bg-outline/30"
            }`}
          >
            {m.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface truncate">{m.name}</p>
            <p className="text-xs text-outline truncate">{m.email}</p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${roleStyle[m.role]}`}>{m.role}</span>
          <button className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined text-base">more_horiz</span>
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Panel: Invite Colleagues ────────────────────────────────────────────────

function InviteColleagues() {
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("Reviewer");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!emails.trim()) return;
    setSent(true);
    setEmails("");
    setNote("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Email Addresses</label>
        <textarea
          rows={3}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="colleague@company.com, another@company.com"
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-sm text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-[#552299]/25 focus:border-[#552299]/50 transition-all resize-none"
        />
        <p className="text-xs text-outline">Separate multiple emails with commas</p>
      </div>

      <Select label="Assign Role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Admin</option>
        <option>Manager</option>
        <option>Reviewer</option>
      </Select>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Personal Note (optional)</label>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a personal message to your invite..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-sm text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-[#552299]/25 focus:border-[#552299]/50 transition-all resize-none"
        />
      </div>

      {sent && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
          <p className="text-sm text-emerald-700 font-medium">Invites sent successfully!</p>
        </div>
      )}

      <button
        type="button"
        onClick={send}
        className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-lg bg-[#552299] text-white text-sm font-semibold hover:bg-[#3d007d] transition-all shadow-sm active:scale-95"
      >
        <span className="material-symbols-outlined text-base">send</span>
        Send Invites
      </button>
    </div>
  );
}

// ─── Panel: Permissions ──────────────────────────────────────────────────────

function Permissions() {
  const [perms, setPerms] = useState({
    view_candidates: { Admin: true, Manager: true, Reviewer: true },
    edit_candidates: { Admin: true, Manager: true, Reviewer: false },
    delete_records: { Admin: true, Manager: false, Reviewer: false },
    export_data: { Admin: true, Manager: true, Reviewer: false },
    manage_jobs: { Admin: true, Manager: true, Reviewer: false },
    view_analytics: { Admin: true, Manager: true, Reviewer: true },
    manage_team: { Admin: true, Manager: false, Reviewer: false },
    billing_access: { Admin: true, Manager: false, Reviewer: false },
  });
  const [success, loading, save] = useSave();

  const labels = {
    view_candidates: "View Candidates",
    edit_candidates: "Edit Candidates",
    delete_records: "Delete Records",
    export_data: "Export Data",
    manage_jobs: "Manage Jobs",
    view_analytics: "View Analytics",
    manage_team: "Manage Team",
    billing_access: "Billing Access",
  };

  const roles = ["Admin", "Manager", "Reviewer"];

  const toggle = (perm, role) => {
    if (role === "Admin") return;
    setPerms((p) => ({ ...p, [perm]: { ...p[perm], [role]: !p[perm][role] } }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
        <span className="material-symbols-outlined text-amber-500 text-base">lock</span>
        <p className="text-xs text-amber-800">Admin permissions are locked and cannot be changed.</p>
      </div>

      <div className="rounded-xl border border-outline-variant/15 overflow-hidden">
        <div className="grid grid-cols-4 bg-surface-container-low px-4 py-2.5 border-b border-outline-variant/10">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Permission</span>
          {roles.map((r) => (
            <span key={r} className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em] text-center">{r}</span>
          ))}
        </div>
        {Object.keys(labels).map((perm) => (
          <div key={perm} className="grid grid-cols-4 items-center px-4 py-2.5 border-b border-outline-variant/8 last:border-0 hover:bg-surface-container-lowest/50 transition-colors">
            <span className="text-xs text-on-surface">{labels[perm]}</span>
            {roles.map((role) => (
              <div key={role} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => toggle(perm, role)}
                  disabled={role === "Admin"}
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    perms[perm][role]
                      ? "bg-[#552299] text-white shadow-sm"
                      : "bg-surface-container border border-outline-variant/25 text-transparent"
                  } ${role === "Admin" ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80 active:scale-90"}`}
                >
                  <span className="material-symbols-outlined text-[11px] leading-none">check</span>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <SaveButton label="Save Permissions" success={success} loading={loading} onClick={save} icon="security" />
    </div>
  );
}

// ─── Panel: ATS Connections ──────────────────────────────────────────────────

function ATSConnections() {
  const [connected, setConnected] = useState({
    greenhouse: true,
    lever: false,
    workday: false,
    bamboohr: false,
  });

  const ats = [
    { id: "greenhouse", name: "Greenhouse", desc: "Sync candidates and job postings" },
    { id: "lever", name: "Lever", desc: "Two-way data sync with your pipeline" },
    { id: "workday", name: "Workday", desc: "Enterprise HR & talent management" },
    { id: "bamboohr", name: "BambooHR", desc: "HR data and employee records" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {ats.map(({ id, name, desc }) => {
        const isOn = connected[id];
        return (
          <div key={id} className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all ${isOn ? "bg-[#552299]/5 border-[#552299]/15" : "bg-surface-container-low border-outline-variant/10"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOn ? "bg-[#552299]/10" : "bg-surface-container"}`}>
              <span className={`material-symbols-outlined text-xl ${isOn ? "text-[#552299]" : "text-outline"}`}>integration_instructions</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-on-surface">{name}</p>
                {isOn && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <p className="text-xs text-outline">{desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setConnected((c) => ({ ...c, [id]: !c[id] }))}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isOn
                  ? "bg-surface-container text-on-surface-variant hover:bg-error-container hover:text-on-error-container"
                  : "bg-[#552299] text-white hover:bg-[#3d007d] shadow-sm"
              }`}
            >
              {isOn ? "Disconnect" : "Connect"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── Panel: Calendar Sync ────────────────────────────────────────────────────

function CalendarSync() {
  const [synced, setSynced] = useState({ google: false, outlook: true });
  const [freq, setFreq] = useState("realtime");
  const [success, loading, save] = useSave();

  const cals = [
    { id: "google", name: "Google Calendar", icon: "event" },
    { id: "outlook", name: "Microsoft Outlook", icon: "calendar_month" },
  ];

  const freqs = [
    { id: "realtime", label: "Real-time", desc: "Instant sync as events change" },
    { id: "hourly", label: "Every hour", desc: "Sync once per hour" },
    { id: "daily", label: "Daily", desc: "Sync once per day at midnight" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {cals.map(({ id, name, icon }) => (
        <div key={id} className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all ${synced[id] ? "bg-[#552299]/5 border-[#552299]/15" : "bg-surface-container-low border-outline-variant/10"}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${synced[id] ? "bg-[#552299]/10" : "bg-surface-container"}`}>
            <span className={`material-symbols-outlined text-xl ${synced[id] ? "text-[#552299]" : "text-outline"}`}>{icon}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-on-surface">{name}</p>
            <p className="text-xs text-outline">{synced[id] ? "Syncing events" : "Not connected"}</p>
          </div>
          <Toggle checked={synced[id]} onChange={(v) => setSynced((s) => ({ ...s, [id]: v }))} />
        </div>
      ))}

      <Divider />

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Sync Frequency</label>
        {freqs.map(({ id, label, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFreq(id)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
              freq === id
                ? "border-[#552299] bg-[#552299]/5"
                : "border-outline-variant/15 bg-surface-container-low hover:border-[#552299]/25"
            }`}
          >
            <div>
              <p className={`text-sm font-semibold ${freq === id ? "text-[#552299]" : "text-on-surface"}`}>{label}</p>
              <p className="text-xs text-outline">{desc}</p>
            </div>
            {freq === id && <span className="material-symbols-outlined text-[#552299] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
          </button>
        ))}
      </div>

      <SaveButton label="Save Sync Settings" success={success} loading={loading} onClick={save} icon="sync" />
    </div>
  );
}

// ─── Panel: Webhook Settings ─────────────────────────────────────────────────

function WebhookSettings() {
  const [url, setUrl] = useState("https://api.yourcompany.com/webhooks/renate");
  const [showSecret, setShowSecret] = useState(false);
  const [events, setEvents] = useState({
    candidate_created: true,
    candidate_status_changed: true,
    interview_scheduled: false,
    interview_completed: true,
    report_generated: false,
  });
  const [testState, setTestState] = useState(null);
  const [success, loading, save] = useSave();

  const eventLabels = {
    candidate_created: "Candidate Created",
    candidate_status_changed: "Candidate Status Changed",
    interview_scheduled: "Interview Scheduled",
    interview_completed: "Interview Completed",
    report_generated: "Report Generated",
  };

  const testWebhook = () => {
    setTestState("loading");
    setTimeout(() => setTestState("success"), 1200);
    setTimeout(() => setTestState(null), 3500);
  };

  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Endpoint URL"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-server.com/webhook"
        mono
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Signing Secret</label>
        <div className="flex items-center gap-2">
          <input
            type={showSecret ? "text" : "password"}
            readOnly
            value="wh_sk_a7f3c9b2d1e4f6a8b0c2d4e6f8a0b2c4"
            className="flex-1 px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/25 text-xs text-on-surface font-mono opacity-70 cursor-default focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowSecret((s) => !s)}
            className="p-2.5 rounded-lg border border-outline-variant/25 hover:bg-surface-container transition-colors text-outline"
          >
            <span className="material-symbols-outlined text-base">{showSecret ? "visibility_off" : "visibility"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">Subscribe to Events</label>
        {Object.keys(eventLabels).map((key) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer py-1.5 border-b border-outline-variant/8 last:border-0">
            <input
              type="checkbox"
              checked={events[key]}
              onChange={() => setEvents((e) => ({ ...e, [key]: !e[key] }))}
              className="w-4 h-4 rounded accent-[#552299] cursor-pointer"
            />
            <span className="text-sm text-on-surface">{eventLabels[key]}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <SaveButton label="Save Webhook" success={success} loading={loading} onClick={save} icon="webhook" />
        <button
          type="button"
          onClick={testWebhook}
          disabled={testState === "loading"}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
            testState === "success"
              ? "border-emerald-300 text-emerald-700 bg-emerald-50"
              : testState === "loading"
              ? "border-outline-variant/25 text-outline cursor-wait"
              : "border-outline-variant/25 text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          <span className={`material-symbols-outlined text-base ${testState === "loading" ? "animate-spin" : ""}`}>
            {testState === "success" ? "check_circle" : testState === "loading" ? "sync" : "send"}
          </span>
          {testState === "success" ? "200 OK" : testState === "loading" ? "Sending…" : "Test"}
        </button>
      </div>
    </div>
  );
}

// ─── Panel registry ──────────────────────────────────────────────────────────

const PANELS = {
  "Profile Information":        { component: ProfileInformation,      icon: "badge" },
  "Email & Notifications":      { component: EmailNotifications,      icon: "notifications" },
  "Password & Security":        { component: PasswordSecurity,        icon: "lock" },
  "Voice Assessment Settings":  { component: VoiceAssessmentSettings, icon: "mic" },
  "Match Threshold":            { component: MatchThreshold,          icon: "tune" },
  "AI Model Preferences":       { component: AIModelPreferences,      icon: "smart_toy" },
  "Members & Roles":            { component: MembersRoles,            icon: "people" },
  "Invite Colleagues":          { component: InviteColleagues,        icon: "person_add" },
  "Permissions":                { component: Permissions,             icon: "security" },
  "ATS Connections":            { component: ATSConnections,          icon: "integration_instructions" },
  "Calendar Sync":              { component: CalendarSync,            icon: "calendar_month" },
  "Webhook Settings":           { component: WebhookSettings,         icon: "webhook" },
};

// ─── Section definitions ─────────────────────────────────────────────────────

const sections = [
  {
    title: "Account",
    items: ["Profile Information", "Email & Notifications", "Password & Security"],
    icon: "manage_accounts",
  },
  {
    title: "AI Configuration",
    items: ["Voice Assessment Settings", "Match Threshold", "AI Model Preferences"],
    icon: "psychology",
  },
  {
    title: "Team",
    items: ["Members & Roles", "Invite Colleagues", "Permissions"],
    icon: "group",
  },
  {
    title: "Integrations",
    items: ["ATS Connections", "Calendar Sync", "Webhook Settings"],
    icon: "link",
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activePanel, setActivePanel] = useState(null);

  const panel = activePanel ? PANELS[activePanel] : null;
  const PanelContent = panel?.component;

  const toggle = (item) => setActivePanel((prev) => (prev === item ? null : item));

  return (
    <main className="max-w-screen-2xl mx-auto px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Settings</h1>
        <p className="text-on-surface-variant mt-2">Manage your Renate AI workspace.</p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Settings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 min-w-0">
          {sections.map(({ title, items, icon }) => (
            <div key={title} className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low">
                <span className="material-symbols-outlined text-primary-container">{icon}</span>
                <h2 className="font-bold text-on-surface">{title}</h2>
              </div>
              <ul className="divide-y divide-outline-variant/10">
                {items.map((item) => {
                  const isActive = activePanel === item;
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggle(item)}
                        className={`w-full flex items-center justify-between px-6 py-4 text-sm transition-colors group ${
                          isActive
                            ? "bg-[#552299]/6 text-[#552299]"
                            : "text-on-surface-variant hover:bg-surface-container-low"
                        }`}
                      >
                        <span className={`transition-colors font-medium ${isActive ? "text-[#552299]" : "group-hover:text-primary"}`}>
                          {item}
                        </span>
                        <span
                          className={`material-symbols-outlined text-sm transition-all duration-200 ${
                            isActive ? "text-[#552299] rotate-90" : "text-outline group-hover:text-primary"
                          }`}
                        >
                          chevron_right
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Slide-in detail panel */}
        {activePanel && PanelContent && (
          <div className="w-[400px] shrink-0 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-md overflow-hidden self-start sticky top-6">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#552299]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#552299] text-base">{panel.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-on-surface">{activePanel}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Panel body */}
            <div className="p-5 overflow-y-auto max-h-[calc(100vh-200px)]">
              <PanelContent />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
