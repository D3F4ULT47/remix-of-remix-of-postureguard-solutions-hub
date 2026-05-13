import { ReactNode } from "react";
import {
  Breadcrumbs, CapabilityTag, FAQ, FeatureFooter, MetricCard, PageShell, ProductCanvas, RiskCard, SectionLabel,
} from "./PageShell";

export interface SolutionPageProps {
  category: string;
  page: string;
  eyebrow: string;
  title: string;
  intro: string;
  capabilityTags: string[];
  metrics: { label: string; value: string; delta?: string; intent?: "primary" | "emerald" | "muted" }[];
  about: { lead: string; points: { h: string; p: string }[] };
  why: { lead: string; risks: { title: string; description: string; severity: "Critical" | "High" | "Medium" | "Low" }[] };
  how: { lead: string; pillars: { h: string; p: string }[]; canvas: ReactNode; pillarsSlot?: ReactNode };
  faq: { q: string; a: string }[];
  next: { to: string; title: string };
}

export function SolutionPage(p: SolutionPageProps) {
  return (
    <PageShell>
      {/* Compact, doc-like header — NO marketing hero */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-10">
        <Breadcrumbs category={p.category} page={p.page} />
        <div className="mt-6 grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> {p.eyebrow}
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-[44px]">
              {p.title}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{p.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">{p.capabilityTags.map((t) => <CapabilityTag key={t}>{t}</CapabilityTag>)}</div>
          </div>
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {p.metrics.map((m) => <MetricCard key={m.label} {...m} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — About */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionLabel index="01">About the Feature</SectionLabel>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground">{p.about.lead}</h2>
            </div>
            <div className="grid gap-3 md:col-span-7 md:grid-cols-2">
              {p.about.points.map((pt) => (
                <div key={pt.h} className="rounded-xl border border-border bg-surface/40 p-5">
                  <div className="text-[13.5px] font-semibold text-foreground">{pt.h}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{pt.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Why */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionLabel index="02">Why We Built This</SectionLabel>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground">{p.why.lead}</h2>
            </div>
            <div className="grid gap-3 md:col-span-8 md:grid-cols-2">
              {p.why.risks.map((r) => <RiskCard key={r.title} {...r} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — How (cinematic top-fade) */}
      <section className="relative border-t border-border">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-primary" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16">
          <SectionLabel index="03">How We Are Doing It</SectionLabel>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground">{p.how.lead}</h2>
              {p.how.pillarsSlot ? (
                <div className="mt-6">{p.how.pillarsSlot}</div>
              ) : (
                <div className="mt-6 space-y-4">
                  {p.how.pillars.map((pt, i) => (
                    <div key={pt.h} className="flex gap-4 rounded-xl border border-border bg-surface/40 p-4">
                      <div className="font-mono text-[11px] text-primary">0{i + 1}</div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-foreground">{pt.h}</div>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{pt.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-7">
              <ProductCanvas>{p.how.canvas}</ProductCanvas>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <SectionLabel index="04">FAQ</SectionLabel>
          <FAQ items={p.faq} />
        </div>
      </section>

      <FeatureFooter next={p.next} />
    </PageShell>
  );
}
