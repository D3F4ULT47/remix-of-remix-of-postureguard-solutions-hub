import { ReactNode } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-primary" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative">{children}</div>
    </main>
  );
}

export function Breadcrumbs({ category, page }: { category: string; page: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
      <Link to="/" className="hover:text-foreground">PostureGuard</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-muted-foreground/80">{category}</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground">{page}</span>
    </div>
  );
}

/**
 * Compact eyebrow label (kept for places that still need the small chapter tag).
 */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
      <span className="font-mono text-primary">{index}</span>
      <span className="h-px flex-1 max-w-[40px] bg-border" />
      {children}
    </div>
  );
}

/**
 * Dominant chapter-style section header.
 * Anchors each major section ("About the Feature", "Why We Built This", ...).
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        <span className="font-mono text-primary">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.04] tracking-tight text-white md:text-[56px] lg:text-[64px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          {subtitle}
        </p>
      )}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/40 via-border to-transparent" />
    </header>
  );
}

export function CapabilityTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  intent = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  intent?: "primary" | "emerald" | "muted";
}) {
  const tint =
    intent === "emerald" ? "text-emerald" : intent === "muted" ? "text-muted-foreground" : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 font-mono text-2xl font-semibold ${tint}`}>{value}</div>
      {delta && <div className="mt-1 text-[11px] text-muted-foreground">{delta}</div>}
    </div>
  );
}

export function RiskCard({
  title,
  description,
  severity,
}: {
  title: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}) {
  const sevColor = {
    Critical: "text-destructive border-destructive/40 bg-destructive/10",
    High: "text-amber-300 border-amber-400/30 bg-amber-400/10",
    Medium: "text-primary border-primary/30 bg-primary/10",
    Low: "text-emerald border-emerald/30 bg-emerald/10",
  }[severity];
  return (
    <div className="group rounded-xl border border-border bg-surface/50 p-5 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${sevColor}`}>
          {severity}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">RSK-{Math.floor(Math.random() * 9000) + 1000}</span>
      </div>
      <h4 className="mt-3 text-[15px] font-semibold text-foreground">{title}</h4>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface/40">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-4 text-[14.5px] font-medium text-foreground transition-colors hover:bg-primary/5 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 group-open:text-primary" />
          </summary>
          <div className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/* Cinematic top-fade product visual frame */
export function ProductCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-x-8 -inset-y-4 -z-10 rounded-[28px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl" />
      <div className="rounded-2xl border border-border-strong bg-surface/70 p-3 shadow-2xl shadow-black/40 glow-soft">
        <div className="rounded-xl border border-border bg-background/60 p-1">
          <div className="relative max-h-[640px] overflow-hidden rounded-lg mask-fade-bottom">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureFooter({ next }: { next: { to: string; title: string } }) {
  return (
    <div className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Continue exploring</div>
          <div className="mt-1 text-lg font-semibold text-foreground">{next.title}</div>
        </div>
        <Link
          to={next.to}
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Open page
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
