import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Network, Radar, Sparkles, ArrowUpRight } from "lucide-react";
import { Breadcrumbs, PageShell, SectionLabel } from "@/components/solutions/PageShell";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — PostureGuard" },
      { name: "description", content: "Four capabilities, one cybersecurity platform: compliance posture, infrastructure visibility, threat intelligence and AI copilot." },
      { property: "og:title", content: "Solutions — PostureGuard" },
      { property: "og:description", content: "The PostureGuard platform — explore the four capabilities." },
    ],
  }),
  component: SolutionsIndex,
});

const items = [
  { to: "/solutions/dpdp-compliance", title: "DPDP Compliance Posture", desc: "Continuous regulatory posture across DPDP, GDPR, ISO and SOC 2 — with AI remediation and audit-ready evidence.", Icon: ShieldCheck, tags: ["DPDP", "GDPR", "ISO 27001"] },
  { to: "/solutions/infrastructure-visibility", title: "Infrastructure Visibility Canvas", desc: "Live multi-cloud topology with identity, data and attack-path overlays — across AWS, Azure, GCP and on-prem.", Icon: Network, tags: ["AWS", "Azure", "GCP"] },
  { to: "/solutions/threat-intelligence", title: "Threat Intelligence", desc: "Streaming CVE feeds, AI risk scoring and SOC-grade prioritization correlated to your live infrastructure.", Icon: Radar, tags: ["CVE", "EPSS", "MITRE"] },
  { to: "/solutions/ai-copilot", title: "AI Security Copilot", desc: "Reasoning copilot over your full posture — drafts remediations, briefs the board, automates SOC workflows.", Icon: Sparkles, tags: ["Reasoning", "Auto-PRs", "Reports"] },
] as const;

function SolutionsIndex() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10">
        <Breadcrumbs category="Platform" page="Solutions" />
        <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> Platform Capabilities
            </div>
            <h1 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-[32px]">
              One cybersecurity platform. Four operational capabilities.
            </h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              PostureGuard unifies regulatory compliance, infrastructure visibility, threat intelligence and AI-assisted operations into a single, consistent product surface.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14">
          <SectionLabel>Capabilities</SectionLabel>
          <div className="grid gap-3 md:grid-cols-2">
            {items.map(({ to, title, desc, Icon, tags }) => (
              <Link
                key={to}
                to={to}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-primary/40 hover:bg-surface/80"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-elevated text-primary group-hover:border-primary/40 group-hover:shadow-[0_0_24px_-6px_var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
