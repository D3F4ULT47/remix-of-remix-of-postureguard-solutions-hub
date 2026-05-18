import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Cloud, Shield, ArrowRight, CheckCircle2, Plus,
  Server, GitBranch, Zap, Activity
} from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { InfraCanvas } from "@/components/dashboard/InfraCanvas";

export const Route = createFileRoute("/dashboard/infra-scan")({
  component: InfraScanPage,
});

const CLOUD_PROVIDERS = [
  { name: "Amazon Web Services", desc: "Scan EC2, S3, RDS, and other AWS services", status: "connected", popular: true },
  { name: "Google Cloud Platform", desc: "Monitor GCE, Cloud Storage, and GKE clusters", status: "coming_soon", popular: false },
  { name: "Microsoft Azure", desc: "Secure Azure VMs, Storage, and App Services", status: "coming_soon", popular: false },
  { name: "DigitalOcean", desc: "Scan Droplets, Spaces, and Kubernetes", status: "coming_soon", popular: false },
  { name: "Linode", desc: "Monitor Linode instances and volumes", status: "coming_soon", popular: false },
  { name: "Vultr", desc: "Secure Vultr cloud infrastructure", status: "coming_soon", popular: false },
];

const CODE_REPOS = [
  { name: "GitHub", desc: "Scan repositories for secrets and vulnerabilities", status: "coming_soon", popular: true },
  { name: "GitLab", desc: "Security scanning for GitLab repositories", status: "coming_soon", popular: false },
  { name: "Bitbucket", desc: "Atlassian Bitbucket security analysis", status: "coming_soon", popular: false },
  { name: "Azure DevOps", desc: "Microsoft Azure DevOps repositories", status: "coming_soon", popular: false },
];

const CICD_TOOLS = [
  { name: "Jira", desc: "Integrate security scans into Jira workflows", status: "connect", popular: true },
  { name: "GitHub Actions", desc: "Automated security checks in GitHub workflows", status: "coming_soon", popular: false },
  { name: "GitLab CI/CD", desc: "Security scanning in GitLab pipelines", status: "coming_soon", popular: false },
  { name: "Datadog", desc: "Security monitoring and alerting", status: "coming_soon", popular: false },
  { name: "New Relic", desc: "Application security monitoring", status: "coming_soon", popular: false },
  { name: "Splunk", desc: "Security information and event management", status: "coming_soon", popular: false },
];

function ProviderCard({ provider, onConnect }: { provider: typeof CLOUD_PROVIDERS[0], onConnect?: () => void }) {
  return (
    <div className="glass-panel flex flex-col rounded-2xl shadow-sm transition-all hover:border-border/80 border-border/40 overflow-hidden">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-surface-elevated text-muted-foreground">
            <Cloud className="h-4.5 w-4.5" />
          </div>
          {provider.popular && (
            <span className="rounded-md bg-emerald/20 px-2 py-0.5 text-[10px] font-bold text-emerald uppercase tracking-wider">Popular</span>
          )}
          {provider.status === "coming_soon" && (
            <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">Coming Soon</span>
          )}
        </div>
        <h3 className="text-[14px] font-bold text-foreground">{provider.name}</h3>
        <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">{provider.desc}</p>
      </div>
      <div className="px-5 pb-5">
        {provider.status === "connected" ? (
          <button 
            onClick={onConnect}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-emerald/90 shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4" /> Connected
          </button>
        ) : provider.status === "connect" ? (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm">
            <Plus className="h-4 w-4" /> Connect
          </button>
        ) : (
          <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/30 px-4 py-2.5 text-[12px] font-medium text-muted-foreground cursor-not-allowed">
            <Plus className="h-3.5 w-3.5" /> Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}

function InfraScanPage() {
  const [showCanvas, setShowCanvas] = useState(false);

  if (showCanvas) {
    return <InfraCanvas onExit={() => setShowCanvas(false)} />;
  }

  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Security Posture Scan</h1>
            <p className="mt-1 text-sm text-muted-foreground">Connect your cloud providers, repositories, and infrastructure for comprehensive security scanning.</p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-12">

        {/* Hero */}
        <div className="text-center py-6">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 mb-5">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Scan Your Infrastructure</h2>
          <p className="mt-2 text-[14px] text-muted-foreground max-w-md mx-auto">
            Connect your cloud providers, repositories, and infrastructure for comprehensive security scanning
          </p>
        </div>

        {/* Cloud Providers */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Cloud className="h-5 w-5 text-primary" />
            <h2 className="text-[17px] font-bold text-foreground">Cloud Providers</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CLOUD_PROVIDERS.map(p => (
              <ProviderCard 
                key={p.name} 
                provider={p} 
                onConnect={p.status === "connected" ? () => setShowCanvas(true) : undefined} 
              />
            ))}
          </div>
        </div>

        {/* Code Repositories */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <GitBranch className="h-5 w-5 text-primary" />
            <h2 className="text-[17px] font-bold text-foreground">Code Repositories</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CODE_REPOS.map(p => (
              <ProviderCard key={p.name} provider={p} />
            ))}
          </div>
        </div>

        {/* CI/CD & Monitoring */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-[17px] font-bold text-foreground">CI/CD & Monitoring</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CICD_TOOLS.map(p => (
              <ProviderCard key={p.name} provider={p} />
            ))}
          </div>
        </div>

        {/* Bottom benefits section */}
        <div className="glass-panel rounded-2xl p-8 border-border/40">
          <h3 className="text-[18px] font-bold text-foreground mb-5">Why Connect Your Infrastructure?</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Activity, title: "Continuous Monitoring", desc: "Real-time security scanning across all your infrastructure" },
              { icon: Shield, title: "Instant Alerts", desc: "Get notified immediately when vulnerabilities are detected" },
              { icon: Zap, title: "Automated Remediation", desc: "Auto-fix common security issues in your CI/CD pipeline" },
              { icon: CheckCircle2, title: "Compliance Tracking", desc: "Automatic compliance reporting across all connected systems" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardPageShell>
  );
}
