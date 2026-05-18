import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ChevronDown,
  ZoomIn, ZoomOut, Maximize, Plus, Workflow,
  FileText, Sparkles, Crosshair, Server
} from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { StatusBadge, LiveIndicator } from "@/components/dashboard/SharedUI";

export const Route = createFileRoute("/dashboard/attack-patterns")({
  component: AttackPatternsPage,
});

type StageData = {
  title: string;
  mitre: string;
  tactic: string;
  assets: string[];
  compliance: string[];
  summary: string;
  cves: { id: string; severity: string; desc: string }[];
};

/* ── Attack Chain Data ── */
const ROW1: StageData[] = [
  {
    title: "Fetch IAM Credential\nEndpoint",
    mitre: "TA0001", tactic: "Initial Access",
    assets: ["ext-gateway-lb"],
    compliance: ["ISO 27001 A.12.6", "DPDP §8"],
    summary: "Exploitation of public-facing gateway to access IMDS v1 endpoint and retrieve temporary IAM credentials.",
    cves: [
      { id: "CVE-2023-4863", severity: "HIGH", desc: "Heap buffer overflow in WebP codec" },
      { id: "CVE-2026-2004", severity: "HIGH", desc: "Server-side request forgery via IMDS" },
    ],
  },
  {
    title: "Discover EC2 User\nCredentials",
    mitre: "TA0006", tactic: "Credential Access",
    assets: ["eks-prod-cluster-01"],
    compliance: ["ISO 27001 A.9.4", "DPDP §6"],
    summary: "Extracted temporary IAM credentials from instance metadata service with overly permissive policies.",
    cves: [
      { id: "CVE-2024-21626", severity: "CRITICAL", desc: "Container escape via runc" },
      { id: "CVE-2026-2005", severity: "HIGH", desc: "IAM role privilege escalation" },
    ],
  },
  {
    title: "Lateral Movement\nto EC2 User",
    mitre: "TA0008", tactic: "Lateral Movement",
    assets: ["eks-worker-1", "eks-worker-2"],
    compliance: ["ISO 27001 A.13.1"],
    summary: "SSH access attempt using extracted credentials to worker nodes across subnet boundary.",
    cves: [
      { id: "CVE-2026-2006", severity: "HIGH", desc: "SSH key injection via metadata" },
    ],
  },
  {
    title: "Obtain DB Name &\nCredentials",
    mitre: "TA0009", tactic: "Collection",
    assets: ["rds-postgres-main"],
    compliance: ["DPDP §8", "ISO 27001 A.10.1"],
    summary: "Environment variable enumeration revealed plaintext RDS connection strings.",
    cves: [
      { id: "CVE-2026-6473", severity: "HIGH", desc: "Plaintext credential exposure in env" },
      { id: "CVE-2024-3094", severity: "CRITICAL", desc: "XZ Utils backdoor" },
    ],
  },
  {
    title: "Discover DB Instances\n(IP Address & Port)",
    mitre: "TA0007", tactic: "Discovery",
    assets: ["rds-postgres-main"],
    compliance: ["ISO 27001 A.13.1"],
    summary: "DNS enumeration and service discovery to locate database endpoints within VPC.",
    cves: [
      { id: "CVE-2026-2004", severity: "HIGH", desc: "Internal DNS zone transfer" },
    ],
  },
  {
    title: "Dump DB Contents",
    mitre: "TA0010", tactic: "Exfiltration",
    assets: ["rds-postgres-main", "s3-public-assets"],
    compliance: ["DPDP §8", "ISO 27001 A.13.2"],
    summary: "Anomalous high-volume outbound transfer detected from rds-postgres-main.",
    cves: [
      { id: "CVE-2024-3094", severity: "CRITICAL", desc: "Auth bypass enabling data access" },
      { id: "CVE-2026-6473", severity: "HIGH", desc: "Unencrypted data channel" },
    ],
  },
];

const ROW2: StageData[] = [
  {
    title: "Import Leaked Keys",
    mitre: "TA0006", tactic: "Credential Access",
    assets: ["ext-gateway-lb"],
    compliance: ["ISO 27001 A.9.4"],
    summary: "Multiple failed authentication attempts from TOR exit nodes using leaked credential databases.",
    cves: [
      { id: "CVE-2026-2004", severity: "HIGH", desc: "Brute-force rate limiting bypass" },
    ],
  },
  {
    title: "List SSM Parameters",
    mitre: "TA0007", tactic: "Discovery",
    assets: ["ssm-param-store"],
    compliance: ["ISO 27001 A.9.2"],
    summary: "GetParameter and ListParameters API call spike detected from compromised role.",
    cves: [
      { id: "CVE-2026-2005", severity: "HIGH", desc: "SSM parameter store enumeration" },
    ],
  },
  {
    title: "Extract SSH Key\nfrom SSM",
    mitre: "TA0006", tactic: "Credential Access",
    assets: ["eks-worker-1"],
    compliance: ["ISO 27001 A.10.1"],
    summary: "SSH private key extracted from SSM Parameter Store using compromised credentials.",
    cves: [
      { id: "CVE-2023-38545", severity: "HIGH", desc: "curl SOCKS5 heap buffer overflow" },
      { id: "CVE-2026-2006", severity: "HIGH", desc: "SSM secret exfiltration" },
    ],
  },
  {
    title: "Discover EC2\nPublic IP",
    mitre: "TA0007", tactic: "Discovery",
    assets: ["eks-worker-1", "eks-worker-2"],
    compliance: ["ISO 27001 A.13.1"],
    summary: "Public IP enumeration of EC2 instances to identify externally accessible targets.",
    cves: [
      { id: "CVE-2026-2004", severity: "HIGH", desc: "EC2 describe-instances abuse" },
    ],
  },
  {
    title: "Obtain Instance\nMetadata (IMDSv1)",
    mitre: "TA0009", tactic: "Collection",
    assets: ["eks-prod-cluster-01"],
    compliance: ["ISO 27001 A.12.6", "DPDP §6"],
    summary: "IMDSv1 exploitation for credential harvesting. Instance not configured for IMDSv2.",
    cves: [
      { id: "CVE-2024-21626", severity: "CRITICAL", desc: "Container escape via runc" },
      { id: "CVE-2026-6473", severity: "HIGH", desc: "IMDSv1 credential harvesting" },
    ],
  },
  {
    title: "Dump DB Contents",
    mitre: "TA0010", tactic: "Exfiltration",
    assets: ["rds-postgres-main"],
    compliance: ["DPDP §8"],
    summary: "Database dump via established exfiltration channel to attacker-controlled infra.",
    cves: [
      { id: "CVE-2024-3094", severity: "CRITICAL", desc: "Auth bypass enabling data dump" },
      { id: "CVE-2023-3824", severity: "MEDIUM", desc: "Buffer overflow in data handler" },
    ],
  },
];

/* ─────────────────────────── Components ─────────────────────────── */

function StageBox({
  stage, id, selected, dimmed, onSelect,
}: {
  stage: StageData; id: string; selected: boolean; dimmed: boolean; onSelect: () => void;
}) {
  return (
    <div className={`flex flex-col shrink-0 transition-all duration-300 ${dimmed ? "opacity-30 scale-[0.98]" : "opacity-100"}`} style={{ width: 152 }}>
      <button
        onClick={onSelect}
        className={`rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
          selected
            ? "border-primary/70 bg-primary/8 shadow-[0_0_24px_-6px_var(--primary)] ring-1 ring-primary/20"
            : "border-border/50 bg-surface-elevated/60 hover:border-border/80 hover:bg-surface-elevated"
        }`}
      >
        <div className="text-[11px] font-semibold text-foreground leading-[1.35] whitespace-pre-line">{stage.title}</div>
      </button>

      {/* ── Expansion: directly attached below ── */}
      {selected && (
        <div
          className="mt-0 rounded-b-xl border border-t-0 border-primary/30 bg-surface-elevated/95 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ animation: "expandDown 0.22s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* Summary */}
          <div className="px-3 py-2.5 border-b border-border/20">
            <p className="text-[10.5px] text-muted-foreground leading-relaxed">{stage.summary}</p>
          </div>

          {/* MITRE + Tactic + Assets */}
          <div className="px-3 py-2 border-b border-border/20 text-[10px] flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">MITRE</span>
              <span className="font-mono font-bold text-primary">{stage.mitre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tactic</span>
              <span className="font-semibold text-foreground">{stage.tactic}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Assets</span>
              <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
                {stage.assets.map(a => (
                  <span key={a} className="rounded bg-surface px-1 py-px font-mono text-[8.5px] text-foreground border border-border/40">{a}</span>
                ))}
              </div>
            </div>
            {stage.compliance.length > 0 && (
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Compliance</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
                  {stage.compliance.map(c => (
                    <span key={c} className="rounded bg-accent/10 px-1 py-px text-[8.5px] text-accent border border-accent/20">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CVEs */}
          <div className="px-3 py-2">
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Threats</div>
            <div className="flex flex-col gap-1">
              {stage.cves.map(cve => (
                <Link
                  key={cve.id}
                  to="/dashboard/threats"
                  search={{ cveId: cve.id, view: true }}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-surface/50 px-2 py-1.5 hover:border-primary/40 hover:bg-surface-elevated transition-all group/c"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-foreground group-hover/c:text-primary transition-colors">{cve.id}</span>
                    <StatusBadge status={cve.severity} type={cve.severity === "CRITICAL" ? "error" : cve.severity === "HIGH" ? "warning" : "success"} />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground -rotate-90" />
                </Link>
              ))}
            </div>
          </div>

          {/* Stage CTAs */}
          <div className="px-3 py-2 border-t border-border/20 flex gap-1.5">
            <Link to="/dashboard/threats" className="flex-1 rounded-md bg-primary/10 border border-primary/20 py-1.5 text-center text-[9px] font-bold text-primary hover:bg-primary/20 transition-colors">
              Threat Intel
            </Link>
            <Link to="/dashboard/infra-scan" className="flex-1 rounded-md border border-border/40 bg-surface py-1.5 text-center text-[9px] font-bold text-foreground hover:bg-surface-elevated transition-colors">
              View Asset
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Arrow({ dimmed }: { dimmed: boolean }) {
  return (
    <div className={`flex items-center shrink-0 self-start mt-[18px] mx-[3px] transition-opacity duration-300 ${dimmed ? "opacity-15" : "opacity-50"}`}>
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <line x1="0" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
        <polygon points="14,2 20,5 14,8" fill="currentColor" className="text-muted-foreground" />
      </svg>
    </div>
  );
}

function Pill({ text, variant }: { text: string; variant: "start" | "end" }) {
  const cls = variant === "start"
    ? "border-emerald/30 bg-emerald/10 text-emerald"
    : "border-border/60 bg-surface-elevated text-foreground";
  return (
    <div className={`shrink-0 self-start mt-[14px] rounded-full border px-3.5 py-1.5 text-[10px] font-bold ${cls}`}>
      {text}
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

function AttackPatternsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const toggle = (key: string) => setSelected(prev => prev === key ? null : key);

  const selRow = selected?.startsWith("r1") ? "r1" : selected?.startsWith("r2") ? "r2" : null;
  const selIdx = selected ? parseInt(selected.split("-")[1]) : -1;

  const isDimmed = (row: string, idx: number) => {
    if (!selected) return false;
    const key = `${row}-${idx}`;
    if (key === selected) return false;
    // Same row, before selected = on path
    if (row === selRow && idx < selIdx) return false;
    return true;
  };

  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Attack Patterns & Campaigns</h1>
            <p className="mt-1 text-sm text-muted-foreground">Threat hunting workspace. Analyze adversary lateral movement and kill-chains.</p>
          </div>
          <LiveIndicator text="Correlating Telemetry" status="active" />
        </div>
      }
    >
      <div className="flex flex-col gap-5">

        {/* ── Campaign Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-destructive/30 bg-destructive/5">
              <Crosshair className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-foreground leading-tight">AWS Data Exfiltration</h2>
              <div className="flex items-center gap-2.5 mt-0.5 text-[11px]">
                <span className="font-mono font-bold text-primary">AC-8492</span>
                <StatusBadge status="CRITICAL" type="error" />
                <span className="flex items-center gap-1 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" /> Active
                </span>
                <span className="text-muted-foreground">UNC2452</span>
                <span className="text-muted-foreground/50">6 assets • 2h ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Link to="/dashboard/infra-scan" className="rounded-lg border border-border/50 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:bg-surface-elevated transition-colors">Trace Movement</Link>
            <Link to="/dashboard/threats" className="rounded-lg bg-primary/10 border border-primary/25 px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary/20 transition-colors">Investigate <ArrowRight className="h-3 w-3 inline ml-0.5" /></Link>
            <button className="rounded-lg border border-border/50 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:bg-surface-elevated transition-colors"><FileText className="h-3 w-3 inline mr-1" />Export</button>
            <button className="rounded-lg border border-border/50 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:bg-surface-elevated transition-colors"><Sparkles className="h-3 w-3 inline mr-1 text-primary" />AI Summary</button>
          </div>
        </div>

        {/* ── Attack Flow Canvas ── */}
        <div className="relative glass-panel rounded-2xl border-border/40 shadow-lg overflow-hidden" style={{ minHeight: 480 }}>
          <div className="overflow-auto custom-scrollbar p-8" style={{ minHeight: 480 }}>
            <div className="origin-top-left transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>

              {/* ── ROW 1 ── */}
              <div className="flex items-start">
                {ROW1.map((s, i) => (
                  <div key={`r1-${i}`} className="flex items-start shrink-0">
                    <StageBox stage={s} id={`r1-${i}`} selected={selected === `r1-${i}`} dimmed={isDimmed("r1", i)} onSelect={() => toggle(`r1-${i}`)} />
                    {i < ROW1.length - 1 && <Arrow dimmed={isDimmed("r1", i + 1)} />}
                  </div>
                ))}
              </div>

              {/* ── Vertical connector ── */}
              <div className={`ml-20 my-2 transition-opacity duration-300 ${selected && selRow === "r1" ? "opacity-20" : selected ? "opacity-15" : "opacity-40"}`}>
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <path d="M2 0 C2 16, 12 16, 12 32" stroke="currentColor" strokeWidth="1" fill="none" className="text-muted-foreground" />
                  <polygon points="9,28 12,32 15,28" fill="currentColor" className="text-muted-foreground" />
                </svg>
              </div>

              {/* ── ROW 2 ── */}
              <div className="flex items-start">
                <Pill text="Start" variant="start" />
                <Arrow dimmed={!!selected && selRow === "r1"} />
                {ROW2.map((s, i) => (
                  <div key={`r2-${i}`} className="flex items-start shrink-0">
                    <StageBox stage={s} id={`r2-${i}`} selected={selected === `r2-${i}`} dimmed={isDimmed("r2", i)} onSelect={() => toggle(`r2-${i}`)} />
                    {i < ROW2.length - 1 && <Arrow dimmed={isDimmed("r2", i + 1)} />}
                  </div>
                ))}
                <Arrow dimmed={!!selected && selRow === "r1"} />
                <Pill text="End" variant="end" />
              </div>

            </div>
          </div>

          {/* ── Zoom Controls ── */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            {[
              { icon: Plus, action: () => setZoom(z => Math.min(z + 10, 150)), tip: "Add" },
              { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 10, 150)), tip: "Zoom In" },
              { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 10, 50)), tip: "Zoom Out" },
              { icon: Maximize, action: () => setZoom(100), tip: "Reset" },
            ].map(({ icon: Icon, action, tip }) => (
              <button key={tip} onClick={action} title={tip} className="grid h-7 w-7 place-items-center rounded-md border border-border/50 bg-surface/90 text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors backdrop-blur-sm">
                <Icon className="h-3 w-3" />
              </button>
            ))}
            <span className="ml-2 text-[10px] text-muted-foreground/50 flex items-center gap-1 select-none">
              <Workflow className="h-3 w-3" /> Attack Flow
            </span>
          </div>

          <span className="absolute bottom-3 right-3 text-[9px] font-mono text-muted-foreground/30 select-none">{zoom}%</span>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
      `}} />
    </DashboardPageShell>
  );
}
