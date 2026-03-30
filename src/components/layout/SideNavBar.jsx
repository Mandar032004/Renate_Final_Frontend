import { NavLink } from "react-router-dom";
import renateLogo from "../../assets/renate-logo.png";

const navItems = [
  { icon: "home",     label: "Home",      to: "/"          },
  { icon: "work",     label: "Hiring",    to: "/hiring"    },
  { icon: "insights", label: "Analytics", to: "/analytics" },
  { icon: "payments", label: "Billing",   to: "/billing"   },
  { icon: "settings", label: "Settings",  to: "/settings"  },
];

export default function SideNavBar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#552299] dark:bg-[#3d007d] flex flex-col py-6 shadow-[0px_20px_40px_rgba(85,34,153,0.12)] z-50">

      {/* Brand Header */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={renateLogo}
            alt="Renate AI Logo"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-headline font-bold tracking-tight text-white text-xl">Renate AI</span>
          <span className="text-[10px] uppercase tracking-widest text-purple-200/60 font-medium">Enterprise Suite</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ icon, label, to }) => (
          <NavLink
            key={icon}
            to={to}
            end={to === "/"}
            aria-label={label}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-purple-100/70 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {icon}
                </span>
                <span className="font-headline font-bold tracking-tight">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer tagline */}
      <div className="px-6 mt-auto">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-purple-100/40 text-[10px] uppercase tracking-[0.2em]">
          The Sovereign Path
        </div>
      </div>
    </aside>
  );
}
