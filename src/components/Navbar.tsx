import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Network,
  Radar,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const solutions = [
  {
    to: "/solutions/dpdp-compliance",
    title: "DPDP Compliance Posture",
    desc: "Continuous regulatory readiness & audit scoring.",
    Icon: ShieldCheck,
  },
  {
    to: "/solutions/infrastructure-visibility",
    title: "Infrastructure Visibility Canvas",
    desc: "Multi-cloud topology, assets & attack surface.",
    Icon: Network,
  },
  {
    to: "/solutions/threat-intelligence",
    title: "Threat Intelligence",
    desc: "Live CVE feeds with AI risk prioritization.",
    Icon: Radar,
  },
  {
    to: "/solutions/ai-copilot",
    title: "AI Security Copilot",
    desc: "Reasoning, remediation & executive reporting.",
    Icon: Sparkles,
  },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_-4px_var(--primary)]">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">PostureGuard</div>
            <div className="text-[10px] font-medium tracking-[0.18em] text-primary">BETA</div>
          </div>
        </Link>

        {/* Pill nav */}
        <nav
          ref={wrapRef}
          className="glass-panel relative hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex"
          onMouseLeave={() => setOpen(false)}
        >
          <NavItem to="/" exact>Home</NavItem>
          <NavItem to="/compliance-score">Compliance Score</NavItem>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
          >
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-foreground/5 data-[active=true]:text-foreground"
              data-active={open || undefined}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div
                role="menu"
                className="anim-fade-in absolute left-1/2 top-[calc(100%+14px)] w-[420px] -translate-x-1/2"
              >
                <div
                  className="rounded-2xl p-2 ring-1 ring-primary/15"
                  style={{
                    background:
                      "color-mix(in oklab, var(--surface-elevated) 99%, transparent)",
                    backdropFilter: "blur(28px) saturate(170%)",
                    WebkitBackdropFilter: "blur(28px) saturate(170%)",
                    border: "1px solid color-mix(in oklab, var(--primary) 22%, var(--border))",
                    boxShadow:
                      "0 24px 60px -20px rgb(0 0 0 / 0.7), 0 8px 24px -12px rgb(0 0 0 / 0.5), 0 0 40px -16px color-mix(in oklab, var(--primary) 55%, transparent)",
                  }}
                >
                  <div className="border-b border-border/80 px-3 py-2">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                      Platform Capabilities
                    </div>
                  </div>
                  <ul className="grid gap-1 p-1.5">
                    {solutions.map(({ to, title, desc, Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary/15 hover:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),inset_0_0_24px_-12px_var(--primary)]"
                        >
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-surface-elevated text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_18px_-6px_var(--primary)]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13.5px] font-semibold text-white group-hover:text-white">{title}</span>
                            <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground/90 group-hover:text-foreground">{desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <NavItem to="/pricing">Pricing</NavItem>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Login</button>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-transform hover:scale-[1.02]">
            Try Free Scan
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  to,
  children,
  exact,
}: {
  to: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: !!exact }}
      className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      activeProps={{
        className:
          "rounded-full px-4 py-1.5 text-sm font-medium text-foreground bg-foreground/5",
      }}
    >
      {children}
    </Link>
  );
}
