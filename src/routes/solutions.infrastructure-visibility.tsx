import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { InfraCanvas } from "@/components/solutions/Canvases";

export const Route = createFileRoute("/solutions/infrastructure-visibility")({
  head: () => ({
    meta: [
      { title: "Infrastructure Visibility Canvas — PostureGuard" },
      { name: "description", content: "Multi-cloud topology, asset intelligence and live attack-surface mapping across AWS, Azure, GCP and on-prem." },
      { property: "og:title", content: "Infrastructure Visibility Canvas — PostureGuard" },
      { property: "og:description", content: "See your full attack surface across every cloud, every account, in one canvas." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPage
      category="Solutions"
      page="Infrastructure Visibility Canvas"
      eyebrow="Asset & Attack Surface Intelligence"
      title="One canvas for every cloud, account and asset you actually run."
      intro="A continuously-rebuilt topology of your infrastructure with security, compliance and exposure overlays — from VPC down to IAM role."
      capabilityTags={["AWS", "Azure", "GCP", "On-prem", "Attack Paths", "Drift Detection"]}
      metrics={[
        { label: "Assets Indexed", value: "1,071", delta: "across 21 accounts" },
        { label: "Exposed", value: "47", delta: "internet-reachable", intent: "primary" },
        { label: "Attack Paths", value: "12", delta: "to PII", intent: "emerald" },
        { label: "Drift Events", value: "8", delta: "last 24h", intent: "muted" },
      ]}
      about={{
        lead: "If you can't see it, you can't defend it. The Canvas keeps your topology honest.",
        points: [
          { h: "Live multi-cloud topology", p: "AWS, Azure, GCP and on-prem assets reconciled into a single graph — refreshed every few minutes, not nightly." },
          { h: "Identity & data overlays", p: "Trace a public ALB through IAM roles down to a PII-bearing RDS instance and see the full blast radius." },
          { h: "Attack-path analysis", p: "Graph traversal computes exploitable paths between exposed entry points and crown-jewel assets." },
          { h: "Drift & change feed", p: "Every config change, security-group edit and policy mutation captured in an append-only timeline." },
        ],
      }}
      why={{
        lead: "Cloud sprawl makes static inventories obsolete the moment they ship.",
        risks: [
          { title: "Shadow accounts and forgotten regions", description: "Most enterprises run 2–3× more cloud accounts than security teams know about.", severity: "High" },
          { title: "Identity is the new perimeter", description: "Misconfigured IAM is the #1 root cause of cloud breaches — but rarely modeled in topology tools.", severity: "Critical" },
          { title: "CSPMs flag findings, not paths", description: "A list of misconfigurations can't tell you which one a real attacker would chain.", severity: "High" },
          { title: "Inventory tools age in days, not seconds", description: "Nightly snapshots miss the very drift events that cause incidents.", severity: "Medium" },
        ],
      }}
      how={{
        lead: "A real-time graph engine with security and identity intelligence layered directly into the topology.",
        pillars: [
          { h: "Real-time graph", p: "Cloud APIs streamed into a graph database; nodes and edges reconciled within minutes." },
          { h: "Node relationships", p: "Compute, storage, network, identity and data modeled as first-class entities with typed edges." },
          { h: "Security intelligence", p: "Findings, CVEs and policy violations attached to nodes — visible inline in the topology." },
          { h: "Compliance findings", p: "Each asset annotated with the compliance controls it impacts and its current evidence status." },
        ],
        canvas: <InfraCanvas />,
      }}
      faq={[
        { q: "Which clouds and providers are supported?", a: "AWS, Azure, GCP and Oracle Cloud as first-class providers. Kubernetes (EKS/AKS/GKE/self-hosted), VMware vSphere and bare-metal via collector." },
        { q: "How fresh is the topology?", a: "Most resource types refresh in under 5 minutes via event-driven ingestion (CloudTrail, Azure Activity Log, GCP Audit Logs). Full reconciliation runs hourly." },
        { q: "Do you require agents?", a: "No. The Canvas is fully agentless using read-only cloud roles. An optional lightweight collector exists for on-prem and air-gapped environments." },
        { q: "Can I query the graph directly?", a: "Yes — the underlying graph is exposed via a Cypher-style query API and a saved-query library for common attack-path patterns." },
        { q: "How does attack-path analysis work?", a: "We model exploitability between nodes (network reach, IAM trust, data flow) and run constrained graph traversals from exposed entry points to sensitive sinks." },
        { q: "Will this slow down my cloud accounts?", a: "Ingestion uses standard read APIs with adaptive rate limiting. Typical impact is below 0.1% of account API quota." },
      ]}
      next={{ to: "/solutions/threat-intelligence", title: "Threat Intelligence" }}
    />
  );
}
