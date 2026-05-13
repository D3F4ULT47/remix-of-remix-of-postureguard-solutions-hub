import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { ThreatCanvas } from "@/components/solutions/Canvases";

export const Route = createFileRoute("/solutions/threat-intelligence")({
  head: () => ({
    meta: [
      { title: "Threat Intelligence — PostureGuard" },
      { name: "description", content: "Real-time CVE feeds, AI risk scoring and SOC-grade prioritization correlated to your live infrastructure." },
      { property: "og:title", content: "Threat Intelligence — PostureGuard" },
      { property: "og:description", content: "From global feed to your prioritized queue in under a second." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPage
      category="Solutions"
      page="Threat Intelligence"
      eyebrow="Live CVE & AI Risk Scoring"
      title="From the global threat feed to your prioritized queue in under a second."
      intro="Every CVE, advisory and active campaign correlated against your real infrastructure, scored with EPSS, CVSS and business context — not raw severity."
      capabilityTags={["CVE", "EPSS", "CVSS v4", "STIX/TAXII", "MITRE ATT&CK", "SOC Webhooks"]}
      metrics={[
        { label: "Live CVEs Tracked", value: "1.2M", delta: "12 sources" },
        { label: "Critical · You", value: "9", delta: "needs action", intent: "primary" },
        { label: "Mean Time to Alert", value: "47s", delta: "feed → SOC", intent: "emerald" },
        { label: "False-Positive Rate", value: "2.1%", delta: "AI-scored", intent: "muted" },
      ]}
      about={{
        title: "Threat intelligence in context",
        lead: "Most threat feeds drown teams in CVEs. We surface the handful that actually matter to you.",
        points: [
          { h: "Live ingestion", p: "NVD, MITRE, vendor advisories, exploit databases and dark-web chatter — normalized into one stream." },
          { h: "Asset correlation", p: "Each advisory matched against the exact software bills, container images and packages you run." },
          { h: "AI risk scoring", p: "EPSS × CVSS × exposure × business criticality, not just a static severity label." },
          { h: "Operational hand-off", p: "Slack, Jira, ServiceNow, PagerDuty and SIEM integrations — with full context, not just an ID." },
        ],
      }}
      why={{
        title: "The operational gap in threat response",
        lead: "The CVE backlog is impossible. The exploitable subset is small. We help you find it.",
        risks: [
          { title: "30,000+ CVEs published per year", description: "Less than 5% are ever exploited in the wild. Static severity ranking wastes engineering time on the other 95%.", severity: "High" },
          { title: "Patch latency drives breaches", description: "Median time-to-exploit after disclosure is now under 24 hours for high-EPSS vulnerabilities.", severity: "Critical" },
          { title: "SOC alert fatigue", description: "Tier-1 analysts triage 200+ alerts per shift. Without context, real signal disappears.", severity: "High" },
          { title: "Threat intel rarely reaches engineers", description: "Intel platforms produce reports; engineers need actionable, ticketed work items.", severity: "Medium" },
        ],
      }}
      how={{
        title: "The intelligence orchestration layer",
        lead: "A streaming pipeline that ingests, correlates, scores and routes — with explainable scoring at every step.",
        pillars: [
          { h: "Threat ingestion", p: "Streaming connectors to 12+ public and commercial feeds, deduplicated in real time." },
          { h: "Correlation engine", p: "Match advisories to your SBOM, container registries and runtime asset inventory." },
          { h: "AI scoring", p: "Composite score combining exploit likelihood (EPSS), severity (CVSS v4), exposure and asset criticality." },
          { h: "Live processing", p: "End-to-end latency from public disclosure to scored, routed alert under one minute." },
        ],
        canvas: <ThreatCanvas />,
      }}
      faq={{ title: "Threat feed & SOC integration", items: [
        { q: "Which threat feeds are included?", a: "NVD, MITRE CVE, vendor PSIRTs (Microsoft, Red Hat, Cisco, Oracle), CISA KEV, EPSS, exploit-DB, GitHub Security Advisories, plus optional commercial feeds (Recorded Future, Mandiant)." },
        { q: "How does AI scoring work and is it explainable?", a: "Every score exposes its components: EPSS percentile, CVSS vector, exposure path and business criticality. You can see exactly why a CVE was elevated or suppressed." },
        { q: "Can I bring my own threat intel?", a: "Yes — STIX/TAXII 2.1, MISP and custom JSON feeds are supported. Your private indicators stay in your tenant." },
        { q: "How are alerts delivered?", a: "Slack, Microsoft Teams, PagerDuty, Opsgenie, Jira, ServiceNow, plus generic webhooks and SIEM forwarding (Splunk, Sentinel, Chronicle, Elastic)." },
        { q: "What about zero-days?", a: "Zero-day intelligence and CISA KEV entries get fast-track routing with separate SLAs and direct-to-on-call paging." },
        { q: "Do you support MITRE ATT&CK mapping?", a: "Every active campaign and CVE is mapped to ATT&CK techniques, letting you see coverage gaps in your detections." },
      ]}}
      next={{ to: "/solutions/ai-copilot", title: "AI Security Copilot" }}
    />
  );
}
