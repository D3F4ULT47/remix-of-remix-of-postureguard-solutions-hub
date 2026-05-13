import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { DpdpCanvas } from "@/components/solutions/Canvases";

export const Route = createFileRoute("/solutions/dpdp-compliance")({
  head: () => ({
    meta: [
      { title: "DPDP Compliance Posture — PostureGuard" },
      { name: "description", content: "Continuous DPDP, GDPR & ISO compliance posture with AI-driven remediation and audit-ready reporting." },
      { property: "og:title", content: "DPDP Compliance Posture — PostureGuard" },
      { property: "og:description", content: "Continuous regulatory posture, audit readiness and AI remediation." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPage
      category="Solutions"
      page="DPDP Compliance Posture"
      eyebrow="Regulatory Intelligence"
      title="A continuous compliance engine for DPDP, GDPR, ISO and SOC 2."
      intro="Map your stack to every clause, score your posture in real time, and let the platform draft and verify remediations before your next audit cycle."
      capabilityTags={["DPDP 2023", "GDPR", "ISO 27001", "SOC 2", "AI Remediation", "Audit Export"]}
      metrics={[
        { label: "Posture Score", value: "94", delta: "+6 this week", intent: "emerald" },
        { label: "Open Gaps", value: "23", delta: "8 critical", intent: "primary" },
        { label: "Auto-Remediated", value: "147", delta: "30d window" },
        { label: "Frameworks", value: "12", delta: "live mapped", intent: "muted" },
      ]}
      about={{
        lead: "Stop treating compliance as a quarterly sprint. Operate it like infrastructure.",
        points: [
          { h: "Live regulatory mapping", p: "Every asset, control and policy mapped to clauses across DPDP, GDPR, ISO 27001, SOC 2, HIPAA and PCI-DSS." },
          { h: "Posture scoring", p: "A weighted score per framework, recomputed continuously from evidence, drift and remediation activity." },
          { h: "AI remediation", p: "The engine drafts policy diffs, IaC patches and access changes — gated by reviewers, never auto-applied blindly." },
          { h: "Audit-grade evidence", p: "Cryptographically signed evidence trails exportable for ISO/SOC 2 auditors in one click." },
        ],
      }}
      why={{
        lead: "The cost of compliance keeps rising — but the visibility doesn't.",
        risks: [
          { title: "Quarterly snapshots miss daily drift", description: "Controls implemented in Q1 quietly degrade. By audit time, 30% of evidence is stale.", severity: "High" },
          { title: "Spreadsheet-led GRC programs", description: "Teams maintain hundreds of mappings by hand — error-prone and impossible to scale across cloud accounts.", severity: "High" },
          { title: "Regulators move faster than tooling", description: "DPDP rules, RBI guidelines and DPB directives change monthly with no machine-readable changelog.", severity: "Critical" },
          { title: "Evidence collection bottlenecks audits", description: "30+ days of engineering time per audit cycle gathering screenshots, logs and configs.", severity: "Medium" },
        ],
      }}
      how={{
        lead: "A four-stage compliance engine — questionnaire, evidence, scoring and remediation — running continuously.",
        pillars: [
          { h: "Questionnaire engine", p: "Adaptive control questions per framework, prefilled from your live infrastructure state." },
          { h: "Evidence collector", p: "Agentless evidence ingestion from cloud APIs, code, IdP and ticketing — signed and timestamped." },
          { h: "Risk analysis", p: "Per-control weighted scoring with regulatory criticality and business context." },
          { h: "Reporting pipeline", p: "Auditor-ready PDFs, board summaries, and machine-readable feeds for your GRC stack." },
        ],
        canvas: <DpdpCanvas />,
      }}
      faq={[
        { q: "Which compliance frameworks are supported out of the box?", a: "DPDP 2023, GDPR, ISO 27001 (2022), SOC 2 (Type I & II), HIPAA, PCI-DSS, RBI cyber security framework and SEBI CSCRF. Custom frameworks can be modeled in YAML." },
        { q: "How is evidence collected without agents?", a: "Read-only cloud roles, IdP federation and Git/CI integrations. Evidence is hashed, signed and stored immutably so auditors can verify integrity." },
        { q: "Can the AI remediations be auto-applied?", a: "By default, no. Remediations are drafted as PRs or change requests and require human approval. Auto-apply is opt-in per environment." },
        { q: "How are findings prioritized?", a: "Each finding carries regulatory severity, control weight and blast radius. The score blends all three so engineering effort goes where it matters." },
        { q: "Does it generate auditor reports?", a: "Yes — ISO 27001 SoA, SOC 2 control matrices, DPDP DPIA reports and a board-level posture summary, all exportable to PDF or shared via signed link." },
        { q: "What about on-prem and hybrid environments?", a: "We support agentless collection over private connectivity (PrivateLink, Express Route, IPsec) plus a lightweight collector for fully air-gapped sites." },
      ]}
      next={{ to: "/solutions/infrastructure-visibility", title: "Infrastructure Visibility Canvas" }}
    />
  );
}
