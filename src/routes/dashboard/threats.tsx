import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ShieldAlert, Search, Cpu, Globe, Key, AlertTriangle, ArrowRight, ExternalLink, Sparkles, FileText } from "lucide-react";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { InvestigationModal } from "@/components/dashboard/InvestigationModal";
import { LiveIndicator, StatusBadge } from "@/components/dashboard/SharedUI";

export const Route = createFileRoute("/dashboard/threats")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      cveId: search.cveId as string | undefined,
      view: search.view === "true" || search.view === true,
    };
  },
  component: ThreatsPage,
});

const MOCK_CVES = [
  { id: "CVE-2024-21626", sev: "CRITICAL", cvss: 9.8, epss: "94.2%", vector: "Container Escape", time: "14m ago", asset: "eks-prod-cluster-01", icon: Cpu },
  { id: "CVE-2023-4863", sev: "HIGH", cvss: 8.8, epss: "87.1%", vector: "RCE / Buffer Overflow", time: "2h ago", asset: "web-gateway-lb", icon: Globe },
  { id: "AC-1104", sev: "HIGH", cvss: 8.5, epss: "82.0%", vector: "Credential Stuffing", time: "3h ago", asset: "s3-public-assets", icon: Key },
  { id: "CVE-2024-3094", sev: "CRITICAL", cvss: 10.0, epss: "99.8%", vector: "Auth Bypass / Backdoor", time: "1d ago", asset: "redis-cache-main", icon: ShieldAlert },
  { id: "CVE-2023-38545", sev: "HIGH", cvss: 8.1, epss: "65.4%", vector: "Heap Overflow", time: "2d ago", asset: "ubuntu-worker-04", icon: AlertTriangle },
  { id: "CVE-2023-3824", sev: "MEDIUM", cvss: 6.5, epss: "12.3%", vector: "Core Buffer Overflow", time: "1w ago", asset: "php-fpm-legacy", icon: Cpu },
];

function ThreatsPage() {
  const { cveId, view } = Route.useSearch();
  const navigate = useNavigate();

  // Search bar state — auto-populated from URL, persists after modal close
  const [searchValue, setSearchValue] = useState(cveId || "");

  // Sync search bar when cveId changes from external navigation
  useEffect(() => {
    if (cveId) {
      setSearchValue(cveId);
    }
  }, [cveId]);

  // Filter logic: use searchValue (local state) to filter, NOT just URL param
  const displayCves = searchValue
    ? MOCK_CVES.filter(c => c.id.toLowerCase().includes(searchValue.toLowerCase()) || c.asset.toLowerCase().includes(searchValue.toLowerCase()))
    : MOCK_CVES;

  const selectedCve = cveId ? MOCK_CVES.find(c => c.id === cveId) : null;

  const openView = (id: string) => {
    setSearchValue(id);
    navigate({ search: { cveId: id, view: true } });
  };

  // CRITICAL: closeView keeps the filter, only closes the modal
  const closeView = () => {
    navigate({ search: { cveId: searchValue || undefined } });
  };

  const clearFilter = () => {
    setSearchValue("");
    navigate({ search: {} });
  };

  return (
    <DashboardPageShell
      header={
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Threat Intelligence</h1>
            <p className="mt-1 text-sm text-muted-foreground">Live CVE feeds, exploitability mapping, and prioritized risk scoring.</p>
          </div>
          <LiveIndicator text="Feed Syncing" status="active" />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search CVE, vector, or asset..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-10 w-[320px] rounded-xl border border-border/60 bg-surface/50 pl-10 pr-4 text-[13px] text-foreground outline-none transition-colors focus:border-primary/50 focus:bg-surface-elevated shadow-sm"
              />
            </div>
          </div>
          {searchValue && (
            <button onClick={clearFilter} className="text-[13px] font-medium text-primary hover:underline">
              Clear Filter
            </button>
          )}
        </div>

        {/* Data Table — ONLY: CVE ID, Severity, CVSS, EPSS, Asset, View */}
        <div className="glass-panel overflow-hidden rounded-2xl shadow-lg border-border/60">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface-elevated/50">
              <tr className="border-b border-border/40 text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="whitespace-nowrap px-6 py-4 font-bold">CVE ID</th>
                <th className="whitespace-nowrap px-6 py-4 font-bold">Severity</th>
                <th className="whitespace-nowrap px-6 py-4 font-bold">CVSS v3</th>
                <th className="whitespace-nowrap px-6 py-4 font-bold">EPSS</th>
                <th className="whitespace-nowrap px-6 py-4 font-bold">Asset</th>
                <th className="whitespace-nowrap px-6 py-4 text-right font-bold">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {displayCves.map((cve, idx) => (
                <tr 
                  key={cve.id} 
                  className={`group transition-colors 
                    ${idx % 2 === 0 ? "bg-transparent" : "bg-surface-elevated/20"} 
                    hover:bg-surface-elevated/60 
                    ${cveId === cve.id ? "bg-primary/5 border-l-2 border-l-primary" : "border-l-2 border-l-transparent"}`
                  }
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <cve.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono font-bold text-foreground">{cve.id}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusBadge 
                      status={cve.sev} 
                      type={cve.sev === "CRITICAL" ? "error" : cve.sev === "HIGH" ? "warning" : "success"} 
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-foreground">{cve.cvss}</td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">{cve.epss}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-foreground">{cve.asset}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button 
                      onClick={() => openView(cve.id)}
                      className="rounded-md border border-border/60 bg-surface px-3 py-1.5 text-[12px] font-semibold text-foreground transition-colors hover:bg-surface-elevated hover:border-primary/50 hover:text-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Centered CVE Investigation Modal */}
      <InvestigationModal
        isOpen={view && !!selectedCve}
        onClose={closeView}
        title={<span className="font-mono text-destructive">{selectedCve?.id}</span>}
        subtitle={
          <div className="flex items-center gap-2">
            <StatusBadge status={selectedCve?.sev || ''} type={selectedCve?.sev === 'CRITICAL' ? 'error' : selectedCve?.sev === 'HIGH' ? 'warning' : 'success'} />
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="uppercase text-[10px] font-bold text-muted-foreground tracking-wider">{selectedCve?.vector}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[10px] text-muted-foreground">Discovered {selectedCve?.time}</span>
          </div>
        }
      >
        <div className="flex flex-col gap-7">

          {/* Top metadata row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{selectedCve?.cvss}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CVSS v3</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/50 p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{selectedCve?.epss}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">EPSS Prob.</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/50 p-4 text-center">
              <div className="text-[13px] font-mono font-bold text-foreground">CWE-1234</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CWE ID</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/50 p-4 text-center">
              <div className="text-[13px] font-mono font-bold text-primary">{selectedCve?.asset}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Affected Asset</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-3">Vulnerability Description</h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              A vulnerability exists in the implementation of the affected component allowing for remote code execution or unauthorized access. This can be exploited by an unauthenticated attacker to compromise the integrity of the environment.
            </p>
          </div>

          {/* Two-column layout for compliance + AI summary */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-3">Compliance & Exposure</h4>
              <div className="rounded-xl border border-border/60 bg-surface/50 p-1 text-[12px] shadow-inner">
                <div className="flex justify-between border-b border-border/40 px-3 py-2.5">
                  <span className="text-muted-foreground">Frameworks</span>
                  <span className="font-medium text-foreground">ISO 27001, DPDP Act</span>
                </div>
                <div className="flex justify-between border-b border-border/40 px-3 py-2.5">
                  <span className="text-muted-foreground">Related CPEs</span>
                  <span className="font-mono text-muted-foreground text-[11px]">cpe:2.3:a:*:*:1.0</span>
                </div>
                <div className="flex justify-between px-3 py-2.5">
                  <span className="text-muted-foreground">Exposure</span>
                  <span className="font-medium text-destructive">Publicly Reachable</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-3">AI Threat Summary</h4>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-[13px] leading-relaxed text-foreground/90">
                  This vulnerability allows unauthorized file system access on the host. Given that <span className="font-mono text-primary/80">{selectedCve?.asset}</span> is an external-facing cluster with active lateral connections, the likelihood of exploitation is significantly elevated.
                </p>
              </div>
            </div>
          </div>

          {/* Remediation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-3">Remediation Guidance</h4>
            <div className="rounded-xl border border-border/60 bg-surface/50 p-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Apply the latest vendor patch. Ensure network segmentation restricts lateral movement from this asset. Rotate any credentials that may have been exposed during the exploitation window.
              </p>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="flex gap-3 pt-2 border-t border-border/40">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 transition-colors hover:bg-surface-elevated text-[13px] font-semibold text-foreground">
              Export Finding <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <Link to="/dashboard/infra-scan" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 transition-colors hover:bg-surface-elevated text-[13px] font-semibold text-foreground">
              Open Asset <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 transition-colors hover:bg-primary/20 text-[13px] font-semibold text-primary">
              Generate AI Summary <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </InvestigationModal>
    </DashboardPageShell>
  );
}
