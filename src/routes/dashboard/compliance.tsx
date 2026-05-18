import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FileText, AlertTriangle, ArrowRight, Activity, Calendar } from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { LiveIndicator, StatusBadge } from "@/components/dashboard/SharedUI";

export const Route = createFileRoute("/dashboard/compliance")({
  component: CompliancePage,
});

const FRAMEWORKS = [
  { name: "SOC 2 Type II", score: 85, controls: "112/130 Passed", status: "Audit Ready", drift: "+2%", driftColor: "text-emerald", nextAudit: "Nov 15, 2026", failingControl: "CC6.1 Logical Access" },
  { name: "GDPR", score: 92, controls: "45/48 Passed", status: "Compliant", drift: "0%", driftColor: "text-muted-foreground", nextAudit: "Jan 10, 2027", failingControl: "Right to Erasure Timeout" },
  { name: "ISO 27001", score: 72, controls: "82/114 Passed", status: "Attention Required", drift: "-5%", driftColor: "text-destructive", nextAudit: "Oct 01, 2026", failingControl: "A.9.2.4 Secret Auth Info" },
  { name: "DPDP (India)", score: 88, controls: "32/36 Passed", status: "Compliant", drift: "+8%", driftColor: "text-emerald", nextAudit: "Dec 05, 2026", failingControl: "Data Fiduciary Notice" },
  { name: "HIPAA", score: 45, controls: "21/46 Passed", status: "Non-Compliant", drift: "-12%", driftColor: "text-destructive", nextAudit: "Past Due", failingControl: "Encryption at Rest" },
];

function CompliancePage() {
  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Compliance Frameworks</h1>
            <p className="mt-1 text-sm text-muted-foreground">Continuous monitoring against regulatory standards and internal policies.</p>
          </div>
          <LiveIndicator text="Real-time Policy Engine Active" status="active" />
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        
        {/* Top Summary Analytics */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center shadow-sm border-border/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Global Posture</div>
            <div className="text-4xl font-bold text-foreground">78%</div>
            <div className="mt-2 text-[12px] text-emerald font-medium flex items-center gap-1">
              <Activity className="h-3 w-3" /> +2% from last month
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center shadow-sm border-border/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-destructive" /> Failing Controls
            </div>
            <div className="text-4xl font-bold text-destructive">43</div>
            <div className="mt-2 text-[12px] text-muted-foreground font-medium">Across 5 frameworks</div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between shadow-sm border-border/60 md:col-span-2 bg-gradient-to-br from-surface to-surface-elevated">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Remediation Timeline</div>
              {/* Visual Analytics Variety: Timeline Distribution */}
              <div className="flex w-full h-10 mt-3 rounded-xl overflow-hidden bg-surface-elevated border border-border/60 shadow-inner">
                <div className="h-full bg-destructive" style={{ width: '15%' }} title="Past Due" />
                <div className="h-full bg-accent" style={{ width: '25%' }} title="Due < 30 Days" />
                <div className="h-full bg-emerald" style={{ width: '60%' }} title="Due > 30 Days" />
              </div>
              <div className="flex justify-between mt-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <span className="text-destructive">15% Past Due</span>
                <span className="text-accent">25% &lt; 30 Days</span>
                <span className="text-emerald">60% &gt; 30 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frameworks Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-foreground">Active Frameworks & Policies</h2>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--primary)]">
              <FileText className="h-4 w-4" /> Generate Exec Report
            </button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {FRAMEWORKS.map((fw) => (
              <div key={fw.name} className="glass-panel group flex flex-col rounded-2xl p-0 transition-colors hover:border-primary/40 shadow-md">
                
                <div className="p-6 pb-4 border-b border-border/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{fw.name}</h3>
                      <div className="mt-1 flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-emerald" /> {fw.controls}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-2xl font-bold text-foreground">{fw.score}%</span>
                      <StatusBadge 
                        status={fw.status} 
                        type={fw.score >= 90 ? "success" : fw.score >= 75 ? "warning" : "error"} 
                      />
                    </div>
                  </div>

                  <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-surface-elevated shadow-inner">
                    <div className={`h-full rounded-full transition-all duration-1000 ${
                      fw.score >= 90 ? "bg-emerald shadow-[0_0_10px_var(--emerald)]" :
                      fw.score >= 75 ? "bg-primary shadow-[0_0_10px_var(--primary)]" :
                      "bg-destructive shadow-[0_0_10px_var(--destructive)]"
                    }`} style={{ width: `${fw.score}%` }} />
                  </div>
                  
                  <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Posture Drift: <span className={fw.driftColor}>{fw.drift}</span></span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Next Audit: {fw.nextAudit}</span>
                  </div>
                </div>

                <div className="bg-surface/30 p-6 pt-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-muted-foreground font-medium">Top Failing Control: <span className="text-foreground">{fw.failingControl}</span></span>
                    <Link to="/dashboard/infra-scan" className="flex items-center gap-1 font-semibold text-primary hover:underline">
                      Inspect Assets <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  {fw.score < 80 && (
                    <Link to="/dashboard/actions" className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface-elevated py-2 text-[12px] font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                      Queue Remediation Workflows
                    </Link>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageShell>
  );
}
