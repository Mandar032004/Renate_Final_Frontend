import { useLocation } from "react-router-dom";
import { usePostJob } from "../../context/PostJobContext";

export default function TopNavBar() {
  const { pathname } = useLocation();
  const { setIsOpen } = usePostJob();
  const isHome = pathname === "/" || pathname === "/dashboard";

  return (
    <header className="sticky top-0 w-full z-40 grid grid-cols-3 items-center px-8 h-16 bg-white/80 backdrop-blur-xl border-b border-[#552299]/10 shadow-[0px_2px_12px_rgba(85,34,153,0.06)]">

      {/* Left: empty anchor column */}
      <div />

      {/* Center: Company Name */}
      <div className="flex justify-center">
        <span
          className="font-semibold text-[#1b1b1e] tracking-tight"
          style={{ fontFamily: "Manrope, sans-serif", fontSize: "0.95rem" }}
        >
          Global Talent Corp
        </span>
      </div>

      {/* Right: Post Job button (home only) + Profile */}
      <div className="flex justify-end items-center gap-3">
        {isHome && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #552299 0%, #7c3aed 100%)",
              boxShadow: "0 2px 12px rgba(85,34,153,0.28)",
              borderRadius: 12,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            <span className="hidden sm:inline">Post Job</span>
          </button>
        )}
        <button className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#552299]/20 hover:ring-[#552299]/50 transition-all duration-200 shadow-[0px_4px_10px_rgba(85,34,153,0.12)]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi3QI8kO0oAwfM_rJ3g45QWTk6T3HYR5K8NRPNBJ0MOO59OPi0ZkzMp2ro93xK_HpopCVKK1VoVwOBzwu60boEfJ4Zlnr44O2NovmOoOGrxwW36jvt5WEkpR6nzgfRpnd7wgorNuuU46uYI-MKhwJ0dAnAB9GJ2yTwNyrht_G1vl250LIUYz-0iTInOXSgxs5jGWP3VYhJbFLWtO96w40UuZ1zqCrUDPBYRykEkFs4G6RzITs_yHsOlY47Tu9NdGM5Grs1sBwD2G"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
