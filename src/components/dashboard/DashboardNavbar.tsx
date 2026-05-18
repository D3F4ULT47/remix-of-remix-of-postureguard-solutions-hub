import { Link, useLocation } from "@tanstack/react-router";
import { ShieldCheck, Bell, Settings } from "lucide-react";

const navLinks = [
  { to: "/dashboard/overview", label: "Overview" },
  { to: "/dashboard/infra-scan", label: "Infra Scan" },
  { to: "/dashboard/compliance", label: "Compliance" },
  { to: "/dashboard/threats", label: "Threat Intelligence" },
  { to: "/dashboard/attack-patterns", label: "Attack Patterns" },
  { to: "/dashboard/actions", label: "Actions" },
];

export function DashboardNavbar() {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 w-full glass-panel border-b border-border bg-background/80">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6">
        {/* Top Header Row */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_-4px_var(--primary)]">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight text-foreground">PostureGuard</div>
              <div className="text-[10px] font-medium tracking-[0.18em] text-primary">BETA</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground">
              <Settings className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 pl-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                NK
              </div>
              <span className="text-[13px] font-medium text-foreground">Nishchay kumar</span>
            </div>
          </div>
        </div>

        {/* Sub-navigation Row */}
        <nav className="flex items-center gap-6 pb-0 pt-2 text-[13px] font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative pb-3 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary shadow-[0_-2px_12px_rgba(56,189,248,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
