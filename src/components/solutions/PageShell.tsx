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
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
      <Link to="/" className="hover:text-foreground">PostureGuard</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-muted-foreground/80">{category}</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground">{page}</span>
    </div>
  );
}

/**
 * Section divider — thin line with soft atmospheric blue semi-circle glow fading upwards.
 * Normalized intensity across all sections.
 */
export function SectionDivider() {
  return (
    <div className="relative h-28 w-full overflow-visible md:h-32">
      {/* Semi-circle glow fading upwards from the bottom line */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_100%_at_50%_100%,oklch(0.55_0.15_240/0.12),transparent_70%)]" />
      {/* Thin, subtle horizontal divider line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-border/50" />
    </div>
  );
}

/**
 * Compact eyebrow label for non-chapter sections.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </div>
  );
}

/**
 * Section header — commanding title + optional subtitle.
 */
export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <h2 className="max-w-4xl text-balance text-[32px] font-bold leading-[1.08] tracking-tight text-white md:text-[44px] lg:text-[52px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          {subtitle}
        </p>
      )}
    </header>
  );
}

export function CapabilityTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
    <div className="rounded-xl border border-border bg-surface/60 p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 font-mono text-[28px] font-bold tracking-tight ${tint}`}>{value}</div>
      {delta && <div className="mt-1 text-[12px] font-medium text-muted-foreground">{delta}</div>}
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
    <div className="group flex flex-col justify-between rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-border-strong">
      <div>
        <div className="flex items-center justify-between">
          <span className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${sevColor}`}>
            {severity}
          </span>
        </div>
        <h4 className="mt-4 text-[16px] font-semibold text-foreground">{title}</h4>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      {items.map((item, i) => (
        <details key={i} className="group rounded-2xl border border-border bg-surface/50 transition-all hover:border-primary/40 hover:shadow-[0_0_24px_-12px_var(--primary)]">
          <summary className="flex cursor-pointer items-center justify-between gap-6 px-8 py-6 outline-none [&::-webkit-details-marker]:hidden">
            <span className="text-[17px] font-semibold text-white md:text-[18px]">{item.q}</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/50 text-muted-foreground transition-colors group-hover:text-primary">
              <Plus className="h-5 w-5 transition-transform duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <div className="px-8 pb-8 pt-1">
            <div className="border-t border-border/50 pt-5">
              <p className="max-w-3xl text-[15px] leading-relaxed text-slate-300">{item.a}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

/* Cinematic top-fade product visual frame */
export function ProductCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      {/* Ambient background glow behind the dashboard frame */}
      <div className="absolute -inset-x-12 -top-16 bottom-1/2 -z-10 rounded-[40px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl" />

      <div className="relative rounded-2xl border border-border-strong bg-surface/80 p-4 shadow-2xl shadow-black/50 glow-soft">
        {/* Inner atmospheric lighting cascading from the top edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] rounded-t-2xl bg-gradient-to-b from-primary/15 via-primary/5 to-transparent opacity-60 mix-blend-screen" />

        <div className="relative rounded-xl border border-border bg-background/60 p-2 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
          <div className="relative min-h-[500px] overflow-hidden rounded-lg mask-fade-bottom">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureFooter({ next }: { next: { to: string; title: string } }) {
  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Continue exploring</div>
          <div className="mt-1 text-base font-semibold text-foreground">{next.title}</div>
        </div>
        <Link
          to={next.to}
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Open page
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
