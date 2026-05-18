import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ShieldCheck, ArrowUpRight, Activity, Network, ShieldAlert, 
  ArrowRight, Search, FileText, AlertTriangle, Crosshair 
} from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { LiveIndicator, StatusBadge } from "@/components/dashboard/SharedUI";

export const Route = createFileRoute("/dashboard/overview")({
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Operational Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">Live telemetry and prioritized security alerts across connected environments.</p>
          </div>
          <LiveIndicator text="Environment Live" status="active" />
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Security Posture & Critical Asset Monitoring */}
        <div className="glass-panel group relative flex flex-col rounded-2xl p-6 lg:col-span-2 overflow-hidden hover:border-primary/30 transition-colors shadow-lg">
          {/* Subtle gradient overlay to prevent dead space */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          
          <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-[15px] font-semibold text-foreground">Global Posture Score</h2>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-emerald">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +5 from last week
            </div>
          </div>
          
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-8">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-primary/20 shadow-[0_0_40px_-10px_var(--primary)]">
              <div 
                className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent border-t-transparent"
                style={{ transform: 'rotate(-45deg)' }}
              />
              <div className="text-center">
                <div className="text-5xl font-bold tracking-tight text-foreground">75</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Score</div>
              </div>
            </div>
          </div>

          {/* Micro-information metrics */}
          <div className="relative z-10 mt-auto grid grid-cols-4 gap-4 border-t border-border/40 pt-5 text-center">
            <div>
              <div className="text-2xl font-semibold text-destructive">3</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Critical</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-accent">12</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">High</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">1,402</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Assets</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-emerald">82%</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Compliant</div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Investigations & Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel flex flex-col rounded-2xl p-6 shadow-lg hover:border-border transition-colors">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h2 className="text-[15px] font-semibold text-foreground">Active Investigations</h2>
              <span className="text-[12px] text-muted-foreground">2 Ongoing</span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/dashboard/attack-patterns" className="group rounded-xl border border-destructive/20 bg-destructive/5 p-3 transition-colors hover:border-destructive/40 hover:bg-destructive/10">
                <div className="flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-destructive" />
                  <span className="text-[13px] font-medium text-foreground">AC-8492: External Breach</span>
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground/80 line-clamp-1">Tracking lateral movement across EKS nodes.</p>
              </Link>
            </div>
          </div>

          <div className="glass-panel flex flex-1 flex-col rounded-2xl p-6 shadow-lg hover:border-border transition-colors">
            <h2 className="text-[15px] font-semibold text-foreground border-b border-border/40 pb-4">Platform Workflows</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/dashboard/infra-scan" className="group flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3 transition-colors hover:border-primary/40 hover:bg-surface-elevated">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Network className="h-4 w-4" />
                  </div>
                  <div className="text-[13px] font-medium text-foreground">Open Topology Canvas</div>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <button className="group flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3 text-left transition-colors hover:border-emerald/40 hover:bg-surface-elevated">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald/10 text-emerald group-hover:scale-110 transition-transform">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="text-[13px] font-medium text-foreground">Generate Exec Report</div>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-emerald transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Compliance Drift & Infrastructure Exposure */}
        <div className="glass-panel flex flex-col rounded-2xl p-6 lg:col-span-1 shadow-lg hover:border-border transition-colors">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-[15px] font-semibold text-foreground">Compliance Drift</h2>
            <Link to="/dashboard/compliance" className="text-[12px] font-medium text-primary hover:underline">Full Audit &rarr;</Link>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            {[
              { name: "SOC 2 Type II", score: 85, color: "bg-emerald", drift: "-2%" },
              { name: "ISO 27001", score: 72, color: "bg-accent", drift: "-5%" },
              { name: "HIPAA", score: 45, color: "bg-destructive", drift: "-12%" },
            ].map((framework) => (
              <div key={framework.name}>
                <div className="mb-1.5 flex items-center justify-between text-[13px] font-medium">
                  <span className="text-foreground">{framework.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-destructive">{framework.drift}</span>
                    <span className="text-foreground">{framework.score}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                  <div className={`h-full rounded-full ${framework.color}`} style={{ width: `${framework.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 shadow-lg hover:border-border transition-colors flex flex-col">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-[15px] font-semibold text-foreground">Infrastructure Exposure Summary</h2>
            <Link to="/dashboard/threats" className="flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
              Analyze all threats <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-2 flex-1 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-border/30 text-muted-foreground text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pt-3 font-medium">Asset ID</th>
                  <th className="pb-3 pt-3 font-medium">Exposure Type</th>
                  <th className="pb-3 pt-3 font-medium">Severity</th>
                  <th className="pb-3 pt-3 text-right font-medium">Last Scanned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  { asset: "eks-prod-cluster-01", type: "Container Breakout", sev: "CRITICAL", time: "2m ago", threatId: "CVE-2024-21626" },
                  { asset: "ext-gateway-lb", type: "RCE / Buffer Overflow", sev: "HIGH", time: "14m ago", threatId: "CVE-2023-4863" },
                  { asset: "s3-public-assets", type: "Anomalous API Spikes", sev: "HIGH", time: "1h ago", threatId: "AC-1104" },
                ].map((exposure) => (
                  <tr key={exposure.asset} className="group transition-colors hover:bg-surface-elevated/50">
                    <td className="py-3">
                      <Link to="/dashboard/infra-scan" className="font-mono text-[12px] text-foreground hover:text-primary transition-colors">
                        {exposure.asset}
                      </Link>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{exposure.type}</span>
                        <Link to={`/dashboard/threats?cveId=${exposure.threatId}&view=true`} className="text-[10px] text-primary/60 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View Threat &rarr;
                        </Link>
                      </div>
                    </td>
                    <td className="py-3">
                      <StatusBadge 
                        status={exposure.sev} 
                        type={exposure.sev === "CRITICAL" ? "error" : "warning"} 
                      />
                    </td>
                    <td className="py-3 text-right text-muted-foreground text-[11px]">{exposure.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardPageShell>
  );
}
