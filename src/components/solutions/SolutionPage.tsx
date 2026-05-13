import { ReactNode } from "react";
import {
  Breadcrumbs, CapabilityTag, FAQ, FeatureFooter, MetricCard, PageShell, ProductCanvas, RiskCard, SectionHeader,
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
      {/* Hero — uses same chapter hierarchy as other sections */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:pb-28">
        <Breadcrumbs category={p.category} page={p.page} />
        <header className="mt-10 mb-14 md:mb-20">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            <span className="font-mono text-primary">00</span>
            <span className="h-px w-10 bg-border" />
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              {p.eyebrow}
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.04] tracking-tight text-white md:text-[56px] lg:text-[64px]">
            {p.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">{p.intro}</p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/40 via-border to-transparent" />
        </header>
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="flex flex-wrap gap-2">{p.capabilityTags.map((t) => <CapabilityTag key={t}>{t}</CapabilityTag>)}</div>
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
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader index="01" eyebrow="About the Feature" title="About the Feature" subtitle={p.about.lead} />
          <div className="grid gap-4 md:grid-cols-2">
            {p.about.points.map((pt) => (
              <div key={pt.h} className="rounded-xl border border-border bg-surface/40 p-6">
                <div className="text-[14px] font-semibold text-foreground">{pt.h}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Why */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader index="02" eyebrow="Why We Built This" title="Why We Built This" subtitle={p.why.lead} />
          <div className="grid gap-4 md:grid-cols-2">
            {p.why.risks.map((r) => <RiskCard key={r.title} {...r} />)}
          </div>
        </div>
      </section>

      {/* Section 3 — How (cinematic top-fade) */}
      <section className="relative border-t border-border">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-primary" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader index="03" eyebrow="How We Are Doing It" title="How We Are Doing It" subtitle={p.how.lead} />
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              {p.how.pillarsSlot ? (
                p.how.pillarsSlot
              ) : (
                <div className="space-y-4">
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
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionHeader index="04" eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Operational details, integration depth and what to expect during evaluation." />
          <FAQ items={p.faq} />
        </div>
      </section>

      <FeatureFooter next={p.next} />
    </PageShell>
  );
}
