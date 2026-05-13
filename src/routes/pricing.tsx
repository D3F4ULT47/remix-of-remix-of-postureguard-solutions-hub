import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Breadcrumbs, PageShell } from "@/components/solutions/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — PostureGuard" }, { name: "description", content: "Simple, transparent pricing for PostureGuard." }] }),
  component: Pricing,
});

const tiers = [
  { name: "Starter", price: "$0", desc: "For early-stage teams.", features: ["Basic vulnerability scanning", "5 assets monitored", "Monthly compliance reports", "Email notifications", "Community support"] },
  { name: "Growth", price: "$199", desc: "Most popular.", popular: true, features: ["Advanced vulnerability scanning", "25 assets monitored", "Real-time CVE alerts", "Weekly compliance reports", "SOC2 & ISO 27001 support", "Priority email support", "Basic API access"] },
  { name: "Scale", price: "$599", desc: "For growing security teams.", features: ["Enterprise vulnerability scanning", "100 assets monitored", "Real-time threat intelligence", "Daily compliance monitoring", "All compliance frameworks", "Custom policy builder", "Full API access", "Phone & chat support"] },
  { name: "Enterprise", price: "Custom", desc: "Tailored to your org.", features: ["Unlimited asset monitoring", "Custom threat feeds", "Advanced compliance automation", "Dedicated security consultant", "Custom integrations", "SLA guarantees", "On-premise deployment", "24/7 priority support"] },
];

function Pricing() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Breadcrumbs category="Platform" page="Pricing" />
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground">Pricing</h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">Start free. Scale to enterprise without re-platforming.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.name} className={`relative rounded-2xl border p-6 ${t.popular ? "border-primary/50 bg-primary/5 glow-soft" : "border-border bg-surface/50"}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-primary-foreground">Most Popular</div>}
              <div className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-mono text-3xl font-semibold text-foreground">{t.price}</span>
                {t.price !== "Custom" && <span className="text-[12px] text-muted-foreground">/mo</span>}
              </div>
              <div className="mt-1 text-[12px] text-muted-foreground">{t.desc}</div>
              <ul className="mt-5 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
