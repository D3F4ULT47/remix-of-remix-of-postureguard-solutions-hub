import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/solutions/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PostureGuard — Real-Time Threat Detection & Compliance Automation" },
      { name: "description", content: "Enterprise-grade security automation: vulnerability scanning, real-time CVE alerts, and one-click compliance frameworks." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[12px] font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> Now in Beta · Early Access Available
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          Real-Time Threat Detection & Compliance Automation
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
          PostureGuard helps startups achieve enterprise-grade security with automated vulnerability scanning, real-time CVE alerts, and one-click compliance frameworks.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-emerald-foreground shadow-[0_0_28px_-6px_var(--emerald)]">Try Free Scan</button>
          <Link to="/compliance-score" className="rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40">See Compliance Score</Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-[12px] text-muted-foreground">
          {["SOC2 Ready", "GDPR Compliant", "ISO 27001"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald" /> {t}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-border px-6 py-14">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Platform</div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-[28px]">Explore the Solutions ecosystem</h2>
          </div>
          <Link to="/solutions" className="hidden items-center gap-1.5 text-sm font-medium text-primary md:inline-flex">
            All capabilities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            { to: "/solutions/dpdp-compliance", t: "DPDP Compliance Posture" },
            { to: "/solutions/infrastructure-visibility", t: "Infrastructure Visibility" },
            { to: "/solutions/threat-intelligence", t: "Threat Intelligence" },
            { to: "/solutions/ai-copilot", t: "AI Security Copilot" },
          ].map((s) => (
            <Link key={s.to} to={s.to} className="group rounded-xl border border-border bg-surface/50 p-5 hover:border-primary/40">
              <div className="text-[12px] font-semibold text-foreground">{s.t}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-primary">
                Open page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
