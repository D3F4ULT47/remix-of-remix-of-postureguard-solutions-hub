import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  CheckCircle2, AlertCircle, Clock, Zap, FileTerminal, Network, 
  Settings2, Activity, Play, XOctagon, BookOpen
} from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { AIBadge, LiveIndicator } from "@/components/dashboard/SharedUI";

export const Route = createFileRoute("/dashboard/actions")({
  component: ActionsPage,
});

function ActionsPage() {
  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Remediation Orchestration</h1>
            <p className="mt-1 text-sm text-muted-foreground">Approve, monitor, and configure AI-assisted automated playbooks.</p>
          </div>
          <div className="flex items-center gap-4">
            <LiveIndicator text="Orchestrator Idle" status="warning" />
            <div className="h-4 w-px bg-border/60" />
            <button className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/50 px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-surface-elevated shadow-sm">
              <Settings2 className="h-4 w-4" /> Orchestration Settings
            </button>
          </div>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Main Action Queue */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-[15px] font-semibold text-foreground">Pending Analyst Approvals</h2>
            <span className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">2 Actions Required</span>
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Action Item 1 - Detailed Workflow */}
            <div className="glass-panel flex flex-col rounded-2xl shadow-lg border-border/60 overflow-hidden">
              <div className="flex items-start justify-between bg-surface-elevated/40 border-b border-border/40 p-5">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[16px] font-bold text-foreground">Auto-Patch runc runtime on EKS</h3>
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <Link to="/dashboard/threats?cveId=CVE-2024-21626&view=true" className="rounded-md border border-destructive/20 bg-destructive/10 px-2 py-0.5 font-bold text-destructive transition-colors hover:bg-destructive/20">
                        CVE-2024-21626
                      </Link>
                      <span className="h-3 w-px bg-border/80" />
                      <span>Target: <Link to="/dashboard/infra-scan" className="font-mono text-foreground/80 hover:text-primary transition-colors">eks-prod-cluster-01</Link></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                </div>
              </div>

              <div className="p-6">
                <AIBadge>AI GENERATED PLAYBOOK</AIBadge>
                <div className="mt-4 rounded-xl border border-border/60 bg-surface/50 p-4 shadow-inner">
                  <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-3">
                    <FileTerminal className="h-4 w-4" /> Execution Plan
                  </div>
                  <div className="font-mono text-[12px] leading-relaxed text-foreground/80">
                    <span className="text-muted-foreground"># Task 1: Isolation</span><br/>
                    <span className="text-primary">$</span> kubectl cordon -l role=worker<br/>
                    <span className="text-primary">$</span> kubectl drain -l role=worker --grace-period=300<br/><br/>
                    <span className="text-muted-foreground"># Task 2: Patching</span><br/>
                    <span className="text-primary">$</span> apt-get update && apt-get install --only-upgrade runc<br/><br/>
                    <span className="text-muted-foreground"># Task 3: Verification</span><br/>
                    <span className="text-primary">$</span> kubectl uncordon -l role=worker
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--primary)]">
                    <Play className="h-4 w-4" /> Approve & Execute Playbook
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface px-4 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-surface-elevated">
                    <BookOpen className="h-4 w-4" /> Edit Runbook
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-[13px] font-semibold text-destructive transition-colors hover:bg-destructive/10">
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Action Item 2 - AI Validation */}
            <div className="glass-panel flex flex-col rounded-2xl shadow-sm border-border/60 opacity-80 transition-opacity hover:opacity-100">
              <div className="flex items-start justify-between p-5">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                    <Network className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[16px] font-bold text-foreground">Block Malicious Subnet IP Range</h3>
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <Link to="/dashboard/attack-patterns" className="rounded-md border border-accent/20 bg-accent/10 px-2 py-0.5 font-bold text-accent transition-colors hover:bg-accent/20">
                        AC-1104
                      </Link>
                      <span className="h-3 w-px bg-border/80" />
                      <span>Target: <Link to="/dashboard/infra-scan" className="font-mono text-foreground/80 hover:text-primary">ext-gateway-lb</Link></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface-elevated px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Activity className="h-3.5 w-3.5 animate-pulse" /> Validating
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                 <div className="rounded-xl border border-border/40 bg-surface/30 p-4 flex items-start gap-3">
                   <AIBadge />
                   <p className="text-[12px] leading-relaxed text-muted-foreground mt-0.5">
                     AI is currently simulating the operational impact of this WAF rule to ensure no legitimate traffic is dropped before requesting analyst approval.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Execution Timeline */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 shadow-md border-border/60">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-6">
              <h2 className="text-[15px] font-semibold text-foreground">Execution History</h2>
              <span className="text-[12px] font-medium text-primary hover:underline cursor-pointer">View All Logs</span>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { status: "Completed", time: "10:42 AM", desc: "Patched libwebp on ubuntu-worker-04", color: "bg-emerald", icon: CheckCircle2 },
                { status: "Completed", time: "09:15 AM", desc: "Rotated compromised IAM credential", color: "bg-emerald", icon: CheckCircle2 },
                { status: "Failed", time: "Yesterday", desc: "Automated container restart failed on redis-cache-main", color: "bg-destructive", icon: XOctagon },
                { status: "Completed", time: "Yesterday", desc: "Blocked anomalous Tor exit nodes", color: "bg-emerald", icon: CheckCircle2 },
              ].map((event, i) => (
                <div key={i} className="relative flex gap-4">
                  {i !== 3 && <div className="absolute left-2.5 top-6 h-full w-px bg-border/60" />}
                  <div className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${event.color}/20 text-${event.color}`}>
                    <event.icon className="h-3 w-3" />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-foreground">{event.status}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{event.time}</span>
                    </div>
                    <div className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{event.desc}</div>
                    {event.status === "Failed" && (
                      <button className="mt-2 text-[11px] font-bold text-primary hover:underline">
                        Investigate Failure &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardPageShell>
  );
}
