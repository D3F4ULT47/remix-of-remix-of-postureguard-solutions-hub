import { ReactNode } from "react";
import { CheckCircle2, Shield, Zap } from "lucide-react";
import {
  Breadcrumbs, CapabilityTag, FAQ, FeatureFooter, MetricCard, PageShell, ProductCanvas, RiskCard, SectionDivider, SectionHeader,
} from "./PageShell";

export interface SolutionPageProps {
  category: string;
  page: string;
  eyebrow: string;
  title: string;
  intro: string;
  capabilityTags: string[];
  metrics: { label: string; value: string; delta?: string; intent?: "primary" | "emerald" | "muted" }[];
  about: { title?: string; lead: string; points: { h: string; p: string }[] };
  why: { title?: string; lead: string; risks: { title: string; description: string; severity: "Critical" | "High" | "Medium" | "Low" }[] };
  how: { title?: string; lead: string; pillars: { h: string; p: string }[]; canvas: ReactNode; pillarsSlot?: ReactNode };
  faq: { title?: string; items: { q: string; a: string }[] } | { q: string; a: string }[];
  next: { to: string; title: string };
}

/* Normalize FAQ prop — supports both legacy array and new object format */
function normalizeFaq(faq: SolutionPageProps["faq"]): { title: string; items: { q: string; a: string }[] } {
  if (Array.isArray(faq)) {
    return { title: "Platform support & integration details", items: faq };
  }
  return { title: faq.title || "Platform support & integration details", items: faq.items };
}

export function SolutionPage(p: SolutionPageProps) {
  const faq = normalizeFaq(p.faq);

  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20">
        <Breadcrumbs category={p.category} page={p.page} />
        <header className="mt-8 mb-8 md:mb-10">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              {p.eyebrow}
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-[36px] font-bold leading-[1.05] tracking-tight text-white md:text-[52px] lg:text-[60px]">
            {p.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">{p.intro}</p>
        </header>
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="flex flex-wrap gap-2.5">{p.capabilityTags.map((t) => <CapabilityTag key={t}>{t}</CapabilityTag>)}</div>
          </div>
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {p.metrics.map((m) => <MetricCard key={m.label} {...m} />)}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── About / Operational Overview ─── */}
      <section className="min-h-[85vh] flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
          <SectionHeader
            title={p.about.title || "Operational overview"}
            subtitle={p.about.lead}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {p.about.points.map((pt) => (
              <div key={pt.h} className="rounded-2xl border border-border bg-surface/40 p-8">
                <div className="text-[17px] font-semibold text-foreground">{pt.h}</div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{pt.p}</p>
              </div>
            ))}
          </div>
          {/* Capability highlights */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: Shield, label: "Enterprise-grade security", desc: "SOC 2 Type II certified" },
              { icon: Zap, label: "Real-time monitoring", desc: "Continuous posture scoring" },
              { icon: CheckCircle2, label: "Audit-ready in minutes", desc: "One-click evidence export" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 rounded-xl border border-border bg-surface/30 p-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-[14px] font-semibold text-foreground">{label}</div>
                  <div className="text-[13px] mt-0.5 text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── Why / The Operational Gap ─── */}
      <section className="min-h-[85vh] flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
          <SectionHeader
            title={p.why.title || "The operational gap"}
            subtitle={p.why.lead}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {p.why.risks.map((r) => <RiskCard key={r.title} {...r} />)}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── How / Inside the Platform ─── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Removed the extra bg-radial-primary that caused double-intensity glow */}
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
          <SectionHeader
            title={p.how.title || "Inside the platform"}
            subtitle={p.how.lead}
          />
          <div className="space-y-12">
            {p.how.pillarsSlot ? (
              p.how.pillarsSlot
            ) : (
              <div className={`grid gap-6 ${p.how.pillars.length === 3 ? "md:grid-cols-3" : p.how.pillars.length === 4 ? "md:grid-cols-4" : "md:grid-cols-2"}`}>
                {p.how.pillars.map((pt) => (
                  <div key={pt.h} className="rounded-2xl border border-border bg-surface/40 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] transition-colors hover:border-border-strong hover:bg-surface/60">
                    <div className="text-[16px] font-semibold text-foreground">{pt.h}</div>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">{pt.p}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="w-full">
              <ProductCanvas>{p.how.canvas}</ProductCanvas>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── FAQ ─── */}
      <section className="min-h-[70vh] flex items-center">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-[40px]">
              FAQs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-slate-400">
              Operational details, integration depth and what to expect during evaluation.
            </p>
          </div>
          <FAQ items={faq.items} />
        </div>
      </section>

      <FeatureFooter next={p.next} />
    </PageShell>
  );
}
