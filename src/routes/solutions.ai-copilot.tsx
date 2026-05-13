import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { CopilotCanvas } from "@/components/solutions/Canvases";
import { ArrowUpRight, FileText, TrendingUp, Workflow, ShieldCheck, type LucideIcon } from "lucide-react";

const copilotOutputs: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: FileText, title: "Executive Summary", desc: "1-page board-ready summary of posture, top risks, and progress." },
  { icon: TrendingUp, title: "Financial Impact Report", desc: "Estimated breach cost, regulatory penalty exposure & ROI of fixes." },
  { icon: Workflow, title: "Remediation Roadmap", desc: "Step-by-step playbook ranked by impact and effort." },
  { icon: ShieldCheck, title: "Compliance Explanation", desc: "Plain-language analysis of failing controls and how to fix them." },
];

function CopilotOutputCards() {
  return (
    <div className="space-y-3">
      {copilotOutputs.map(({ icon: Icon, title, desc }) => (
        <button
          key={title}
          type="button"
          className="group flex w-full items-center gap-4 rounded-xl border border-border bg-surface/50 p-4 text-left transition-colors hover:border-primary/40 hover:bg-surface/70 glow-soft"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-semibold text-foreground">{title}</span>
            <span className="mt-0.5 block text-[12.5px] leading-relaxed text-muted-foreground">{desc}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </button>
      ))}
    </div>
  );
}

export const Route = createFileRoute("/solutions/ai-copilot")({
  head: () => ({
    meta: [
      { title: "AI Security Copilot — PostureGuard" },
      { name: "description", content: "AI-assisted security operations: reasoning, remediation, executive reports and automated workflows." },
      { property: "og:title", content: "AI Security Copilot — PostureGuard" },
      { property: "og:description", content: "Conversational reasoning over your full security posture, with auditable actions." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SolutionPage
      category="Solutions"
      page="AI Security Copilot"
      eyebrow="Reasoning & Automated Operations"
      title="A reasoning copilot that thinks across your entire security posture."
      intro="Ask in plain English. Get answers grounded in your live infrastructure, threat feed and compliance state — with auditable actions and executive-ready reports."
      capabilityTags={["Conversational AI", "Auto-PRs", "Executive Reports", "Tool Use", "Audit Trail", "Guardrails"]}
      metrics={[
        { label: "Avg. Reasoning Time", value: "0.84s", delta: "6 tool calls", intent: "primary" },
        { label: "Auto-PRs Opened", value: "32", delta: "this month", intent: "emerald" },
        { label: "Reports Generated", value: "184", delta: "execs + audit" },
        { label: "Time Saved", value: "412h", delta: "vs manual SOC", intent: "muted" },
      ]}
      about={{
        title: "AI-native security operations",
        lead: "Not a chatbot. A reasoning agent grounded in your actual platform.",
        points: [
          { h: "Conversational interface", p: "Ask about posture, threats, compliance gaps or financial impact in natural language and get cited answers." },
          { h: "Executive summaries", p: "Board-ready briefings generated in seconds — risk, financial impact and recommended actions." },
          { h: "Remediation guidance", p: "Drafts PRs, IaC patches and policy changes with reviewer-friendly diffs and rollback plans." },
          { h: "Security reasoning", p: "Multi-step planning across the platform's tools, with a visible trace of every step it took." },
        ],
      }}
      why={{
        title: "Why traditional SOC workflows fail",
        lead: "Security teams are stretched thin. The copilot acts as the SOC's force multiplier.",
        risks: [
          { title: "Tool sprawl drowns analysts", description: "Average enterprise SOC uses 45+ tools. Context-switching is the silent productivity killer.", severity: "High" },
          { title: "Reporting eats the senior team", description: "CISO briefings and board reports consume days of the most experienced analysts each cycle.", severity: "Medium" },
          { title: "Black-box AI breaks trust", description: "Generic LLM answers can't be audited. Security work requires citations and reproducibility.", severity: "Critical" },
          { title: "Remediation requires context", description: "Knowing what to fix is half the job — knowing how, in your stack, with your constraints, is the rest.", severity: "High" },
        ],
      }}
      how={{
        title: "How the copilot orchestrates security",
        lead: "AI-generated operational outputs and executive-level intelligence — on demand.",
        pillars: [
          { h: "AI orchestration", p: "A planner decomposes requests into platform tool calls — search, scan, query, generate — with bounded autonomy." },
          { h: "Prompt-response engine", p: "Grounded responses pulled directly from your live posture data, with inline citations to assets and findings." },
          { h: "Reasoning pipeline", p: "Every conversation is a traced reasoning chain you can replay, audit and reuse as a saved playbook." },
          { h: "Automated remediation", p: "Action proposals run through guardrails (env, blast radius, approval) before any change reaches your stack." },
        ],
        canvas: <CopilotCanvas />,
        pillarsSlot: <CopilotOutputCards />,
      }}
      faq={{ title: "Security & deployment details", items: [
        { q: "Which models power the copilot?", a: "A mix of frontier and self-hosted models depending on workload — reasoning runs on frontier models, retrieval and embeddings run in your tenant. No customer data trains shared models." },
        { q: "How is hallucination prevented?", a: "Every answer is grounded in tool calls against your live data. The copilot will refuse to answer rather than guess, and citations link back to the underlying assets and findings." },
        { q: "Can the copilot make changes to my infrastructure?", a: "Only via reviewed PRs or change requests by default. Auto-apply is opt-in per environment with explicit guardrails (blast radius, approver requirements, time windows)." },
        { q: "Is the conversation history auditable?", a: "Yes. Every prompt, tool call, intermediate reasoning step and final answer is recorded immutably and exportable for SOC 2 / ISO audits." },
        { q: "Does my data leave my tenant?", a: "Inference runs through a private gateway with no retention. Embeddings, evidence and conversations stay in your dedicated tenant storage." },
        { q: "Can I build custom playbooks?", a: "Yes — any conversation can be saved as a playbook that runs on a schedule or trigger, with versioning and approval workflows." },
      ]}}
      next={{ to: "/solutions/dpdp-compliance", title: "DPDP Compliance Posture" }}
    />
  );
}
