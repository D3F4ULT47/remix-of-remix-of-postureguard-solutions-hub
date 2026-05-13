import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Breadcrumbs, SectionLabel } from "@/components/solutions/PageShell";

export const Route = createFileRoute("/compliance-score")({
  head: () => ({ meta: [{ title: "Compliance Score — PostureGuard" }, { name: "description", content: "Live compliance score across DPDP, GDPR, ISO 27001 and SOC 2." }] }),
  component: () => (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Breadcrumbs category="Platform" page="Compliance Score" />
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground">Live Compliance Score</h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">A continuous, weighted score across every framework you operate under — recomputed from live evidence.</p>
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {[
            ["DPDP 2023", 94], ["GDPR", 88], ["ISO 27001", 91], ["SOC 2", 76],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl border border-border bg-surface/60 p-5">
              <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-2 font-mono text-4xl font-semibold text-primary">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SectionLabel index="01">Coming soon</SectionLabel>
          <p className="text-[14px] text-muted-foreground">Detailed framework breakdowns, drift timeline and audit export.</p>
        </div>
      </section>
    </PageShell>
  ),
});
