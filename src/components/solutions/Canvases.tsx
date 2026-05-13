import { Activity, AlertTriangle, ArrowRight, BadgeCheck, Bot, Brain, CheckCircle2, Cloud, Cpu, Database, FileCheck, FileText, Flame, GitBranch, Globe, Layers, Lock, MessageSquare, Network, Search, Server, Shield, ShieldAlert, ShieldCheck, Sparkles, TerminalSquare, Workflow, Zap } from "lucide-react";

/* ---------- DPDP Compliance ---------- */
export function DpdpCanvas() {
  return (
    <div className="grid h-full gap-6 p-8 md:grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-3 space-y-4 rounded-xl border border-border bg-surface/60 p-5">
        <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Frameworks</div>
        {["DPDP 2023", "GDPR", "ISO 27001", "SOC 2", "HIPAA", "PCI-DSS", "NIST CSF", "CIS Controls"].map((f, i) => (
          <div key={f} className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[13px] ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-foreground/5"}`}>
            <span className="flex items-center gap-2 truncate"><FileCheck className="h-4 w-4 shrink-0" /> <span className="truncate">{f}</span></span>
            <span className="shrink-0 font-mono text-[11px]">{[94, 88, 91, 76, 82, 71, 65, 89][i]}%</span>
          </div>
        ))}
      </aside>

      <section className="col-span-9 space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {[
            { l: "Posture Score", v: "94", d: "+6 this week", i: BadgeCheck, c: "text-emerald" },
            { l: "Open Findings", v: "23", d: "8 critical", i: AlertTriangle, c: "text-amber-300" },
            { l: "Auto-Remediated", v: "147", d: "last 30d", i: Zap, c: "text-primary" },
            { l: "Audit Ready", v: "Yes", d: "ISO + DPDP", i: ShieldCheck, c: "text-emerald" },
          ].map(({ l, v, d, i: Icon, c }) => (
            <div key={l} className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{l}</span>
                <Icon className={`h-4 w-4 ${c}`} />
              </div>
              <div className={`mt-2 font-mono text-[26px] font-bold tracking-tight ${c}`}>{v}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-semibold text-foreground">DPDP Readiness Workflow</span>
            <span className="font-mono text-[11px] text-muted-foreground">v2.4 · last run 2m ago</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { t: "Questionnaire", s: "Complete", n: 142, ok: true },
              { t: "Evidence", s: "Complete", n: 89, ok: true },
              { t: "Risk Analysis", s: "Running", n: 23, ok: false },
              { t: "Control Map", s: "Pending", n: 41, ok: false },
            ].map((s) => (
              <div key={s.t} className="rounded-lg border border-border bg-background/50 p-4">
                <div className="truncate text-[13px] font-semibold text-foreground">{s.t}</div>
                <div className={`mt-1 text-[11px] font-medium uppercase tracking-wider ${s.ok ? "text-emerald" : "text-primary"}`}>{s.s}</div>
                <div className="mt-2 font-mono text-[11px] text-muted-foreground">{s.n} items</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { t: "AI Remediation", s: "In Progress", n: 12, ok: false },
              { t: "Policy Engine", s: "Validating", n: 8, ok: false },
              { t: "Audit Report", s: "Queued", n: 1, ok: false },
            ].map((s) => (
              <div key={s.t} className="rounded-lg border border-border bg-background/50 p-4">
                <div className="truncate text-[13px] font-semibold text-foreground">{s.t}</div>
                <div className={`mt-1 text-[11px] font-medium uppercase tracking-wider ${s.ok ? "text-emerald" : "text-primary"}`}>{s.s}</div>
                <div className="mt-2 font-mono text-[11px] text-muted-foreground">{s.n} items</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
            <div className="mb-4 text-[14px] font-semibold text-foreground">Regulatory Mapping</div>
            <div className="space-y-2.5">
              {[
                { k: "§ 8(4) Consent records", v: "Mapped", c: "text-emerald" },
                { k: "§ 9 Data minimization", v: "Partial", c: "text-primary" },
                { k: "§ 11 Breach notification", v: "Mapped", c: "text-emerald" },
                { k: "§ 17 Grievance redress", v: "Gap", c: "text-destructive" },
                { k: "§ 21 Cross-border transfer", v: "Mapped", c: "text-emerald" },
              ].map(({ k, v, c }) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2.5 text-[12.5px]">
                  <span className="text-muted-foreground">{k}</span>
                  <span className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
            <div className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-foreground"><Sparkles className="h-4 w-4 text-primary" /> AI Remediation Suggestions</div>
            <div className="space-y-3 text-[13px]">
              {[
                "Enable retention policy on `users.consent_log` (30d → 365d)",
                "Add DPO contact endpoint at /api/privacy/grievance",
                "Encrypt PII columns in `customers` with column-level KMS",
                "Block cross-region replication for S3 `eu-central-1`",
              ].map((t) => (
                <div key={t} className="rounded-lg border border-border bg-background/40 px-4 py-3 leading-relaxed text-muted-foreground">
                  <span className="mr-2 font-mono font-bold text-primary">{">"}</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Infrastructure Visibility ---------- */
export function InfraCanvas() {
  return (
    <div className="grid h-full gap-6 p-8 md:grid-cols-12">
      <aside className="col-span-3 space-y-4">
        <div className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Cloud Accounts</div>
          {[
            { c: "AWS", n: 12, i: Cloud },
            { c: "Azure", n: 4, i: Cloud },
            { c: "GCP", n: 3, i: Cloud },
            { c: "On-prem", n: 2, i: Server },
            { c: "Kubernetes", n: 45, i: Layers },
          ].map(({ c, n, i: I }) => (
            <div key={c} className="mt-2.5 flex items-center justify-between text-[13px] text-muted-foreground">
              <span className="flex items-center gap-2.5"><I className="h-4 w-4 text-primary" /> {c}</span>
              <span className="font-mono text-[11px]">{n}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Asset Types</div>
          {[
            ["Compute", 312], ["Storage", 184], ["Network", 96], ["Identity", 421], ["Database", 58], ["Serverless", 104]
          ].map(([k, v]) => (
            <div key={k as string} className="mt-2.5 flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-mono text-[11px] text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="col-span-9 space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {[
            { l: "Assets", v: "1,071", c: "text-foreground" },
            { l: "Exposed", v: "47", c: "text-amber-300" },
            { l: "Attack Paths", v: "12", c: "text-destructive" },
            { l: "Drift Events", v: "8", c: "text-primary" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{m.l}</div>
              <div className={`mt-2 font-mono text-[26px] font-bold tracking-tight ${m.c}`}>{m.v}</div>
            </div>
          ))}
        </div>

        <div className="relative h-[360px] overflow-hidden rounded-xl border border-border bg-background/50">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300">
            <defs>
              <linearGradient id="edge" x1="0" x2="1">
                <stop offset="0" stopColor="rgb(56,189,248)" stopOpacity="0.6" />
                <stop offset="1" stopColor="rgb(56,189,248)" stopOpacity="0.05" />
              </linearGradient>
              <radialGradient id="node">
                <stop offset="0" stopColor="rgb(56,189,248)" stopOpacity="0.5" />
                <stop offset="1" stopColor="rgb(56,189,248)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[
              [80, 80, 300, 80], [80, 80, 300, 150], [300, 80, 500, 60], [300, 150, 500, 150],
              [300, 150, 500, 230], [80, 220, 300, 150], [80, 220, 300, 220], [300, 220, 500, 230],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#edge)" strokeWidth="1" />
            ))}
            {[
              [80, 80, "vpc-prod"], [80, 220, "vpc-data"],
              [300, 80, "k8s-api"], [300, 150, "rds-pii"], [300, 220, "lambda"],
              [500, 60, "alb"], [500, 150, "s3-logs"], [500, 230, "iam-role"],
            ].map(([x, y, l], i) => (
              <g key={i}>
                <circle cx={x as number} cy={y as number} r="22" fill="url(#node)" />
                <circle cx={x as number} cy={y as number} r="6" fill="rgb(56,189,248)" />
                <text x={x as number} y={(y as number) + 22} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="ui-monospace">{l}</text>
              </g>
            ))}
            <circle cx="300" cy="150" r="14" fill="none" stroke="rgb(248,113,113)" strokeWidth="1.5" />
            <text x="300" y="115" textAnchor="middle" fontSize="9" fill="rgb(248,113,113)" fontFamily="ui-monospace">PII · exposed</text>
          </svg>
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur">
            <Network className="h-4 w-4 text-primary" /> Topology · realtime
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
            <div className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-foreground"><GitBranch className="h-4 w-4 text-primary" /> Attack Path · Critical</div>
            <div className="space-y-2.5 font-mono text-[12px] text-muted-foreground">
              <div><span className="mr-1 text-primary">→</span> public-alb (0.0.0.0/0)</div>
              <div><span className="mr-1 text-primary">→</span> ec2-web-04 (CVE-2024-3094)</div>
              <div><span className="mr-1 text-primary">→</span> iam-role: *AdminAccess</div>
              <div><span className="mr-1 text-destructive">→</span> rds-pii (encrypted: false)</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
            <div className="mb-4 text-[14px] font-semibold text-foreground">Asset Drift · last 24h</div>
            <div className="space-y-2.5 text-[13px]">
              {[
                ["security-group sg-2a4f", "ingress 22/tcp opened"],
                ["s3 bucket logs-prod", "public-read enabled"],
                ["iam policy DataOps", "wildcard added"],
                ["lambda fn-payment", "vpc detach detected"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-start justify-between gap-4 text-muted-foreground">
                  <span className="font-mono text-[11px] text-foreground">{a}</span>
                  <span className="text-right text-[12px]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Threat Intelligence ---------- */
export function ThreatCanvas() {
  return (
    <div className="grid h-full gap-6 p-8 md:grid-cols-12">
      <section className="col-span-8 space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {[
            { l: "Live CVEs", v: "1,284", c: "text-foreground", i: Activity },
            { l: "Critical · You", v: "9", c: "text-destructive", i: Flame },
            { l: "EPSS > 0.7", v: "34", c: "text-amber-300", i: ShieldAlert },
            { l: "Patched", v: "412", c: "text-emerald", i: CheckCircle2 },
          ].map(({ l, v, c, i: I }) => (
            <div key={l} className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{l}</span>
                <I className={`h-4 w-4 ${c}`} />
              </div>
              <div className={`mt-2 font-mono text-[26px] font-bold tracking-tight ${c}`}>{v}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-foreground">Live Threat Feed</span>
            <span className="flex items-center gap-2 text-[11px] font-medium text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald pulse-dot" /> ingesting · 12 sources</span>
          </div>
          <div className="space-y-2.5">
            {[
              ["CVE-2026-1031", "OpenSSL · heap overflow", 9.8, 0.92, "Critical"],
              ["CVE-2026-0884", "nginx · request smuggling", 8.1, 0.74, "High"],
              ["CVE-2026-0512", "kubernetes · auth bypass", 9.1, 0.81, "Critical"],
              ["CVE-2025-9712", "PostgreSQL · privilege esc.", 7.8, 0.41, "High"],
              ["CVE-2025-9344", "redis · use-after-free", 6.5, 0.28, "Medium"],
              ["CVE-2025-8291", "docker · container escape", 8.8, 0.65, "High"],
            ].map(([id, t, cvss, epss, sev]) => (
              <div key={id as string} className="grid grid-cols-12 items-center gap-3 rounded-lg bg-background/40 px-3 py-2.5 text-[12px]">
                <span className="col-span-3 font-mono text-[11px] font-semibold text-primary truncate">{id}</span>
                <span className="col-span-4 text-foreground truncate">{t}</span>
                <span className="col-span-3 font-mono text-[11px] text-muted-foreground truncate">CVSS {cvss as number} · EPSS {epss as number}</span>
                <span className={`col-span-2 text-right font-mono text-[11px] font-semibold ${sev === "Critical" ? "text-destructive" : sev === "High" ? "text-amber-300" : "text-primary"}`}>{sev as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 text-[14px] font-semibold text-foreground">AI Risk Scoring Pipeline</div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { t: "Ingest", s: "12 feeds", i: Database },
              { t: "Normalize", s: "STIX/TAXII", i: Layers },
              { t: "Correlate", s: "your assets", i: GitBranch },
              { t: "Score", s: "EPSS×CVSS×ctx", i: Brain },
              { t: "Notify", s: "SOC + Slack", i: Zap },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative rounded-lg border border-border bg-background/50 p-4">
                <s.i className="h-4 w-4 text-primary" />
                <div className="mt-2 text-[13px] font-semibold text-foreground">{s.t}</div>
                <div className="mt-1 font-mono text-[11px] text-muted-foreground">{s.s}</div>
                {i < arr.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border-strong md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="col-span-4 space-y-5">
        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 text-[14px] font-semibold text-foreground">Severity (7d)</div>
          <div className="flex h-32 items-end gap-1.5">
            {[18, 24, 16, 32, 28, 41, 36].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h * 2}%` }} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5 font-mono text-[11px] font-semibold text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="text-center">{d}</span>)}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-foreground"><Globe className="h-4 w-4 text-primary" /> Active Campaigns</div>
          <div className="space-y-3 text-[13px]">
            {[
              { k: "APT-29 · phishing", v: "Active", c: "text-destructive" },
              { k: "Volt Typhoon · LotL", v: "Watching", c: "text-amber-300" },
              { k: "FIN7 · POS skim", v: "Contained", c: "text-emerald" },
              { k: "Lapsus$ · SSO spray", v: "Active", c: "text-destructive" },
            ].map(({ k, v, c }) => (
              <div key={k} className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2.5">
                <span className="text-muted-foreground">{k}</span>
                <span className={`font-mono text-[11px] font-semibold ${c}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---------- AI Copilot ---------- */
export function CopilotCanvas() {
  return (
    <div className="grid h-full gap-6 p-8 md:grid-cols-12">
      <aside className="col-span-3 space-y-4 rounded-xl border border-border bg-surface/60 p-5">
        <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Conversations</div>
        {[
          ["Q3 board report", "active"],
          ["CVE-2026-1031 triage", ""],
          ["Cost of last incident", ""],
          ["DPDP gap analysis", ""],
          ["IAM drift resolution", ""],
        ].map(([t, s]) => (
          <div key={t} className={`rounded-lg px-3 py-2.5 text-[13px] font-medium ${s ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-foreground/5"}`}>
            <div className="flex items-center gap-2.5"><MessageSquare className="h-4 w-4" />{t}</div>
          </div>
        ))}
        <div className="mt-4 border-t border-border pt-4 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Tools</div>
        {[
          ["Search assets", Search],
          ["Run scan", TerminalSquare],
          ["Generate report", FileText],
          ["Apply policy", Lock],
          ["Block IP", ShieldAlert],
        ].map(([t, I]) => {
          const Icon = I as typeof Search;
          return (
            <div key={t as string} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-foreground/5">
              <Icon className="h-4 w-4 text-primary" /> {t as string}
            </div>
          );
        })}
      </aside>

      <section className="col-span-9 space-y-5">
        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-5 flex items-center gap-2.5">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-[14px] font-semibold text-foreground">PostureGuard Copilot</span>
            <span className="rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[10px] font-semibold uppercase text-muted-foreground">reasoning · v3</span>
          </div>

          <div className="space-y-4">
            <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm border border-border bg-background/50 px-4 py-3 text-[14px] leading-relaxed text-foreground">
              Summarize our security posture for the board, with financial impact of unresolved findings.
            </div>
            <div className="max-w-[92%] rounded-xl rounded-tl-sm border border-primary/30 bg-primary/5 px-4 py-4 text-[14px] leading-relaxed">
              <div className="text-foreground">Posture is <span className="font-semibold text-emerald">Strong (94/100)</span>. Three exposures concentrate 78% of estimated risk:</div>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• <span className="font-mono text-primary">rds-pii</span> · unencrypted, exposed via attack path A-12 — <span className="font-semibold text-foreground">$2.4M</span> est. breach impact</li>
                <li>• <span className="font-mono text-primary">CVE-2026-1031</span> on 14 hosts — <span className="font-semibold text-foreground">$840K</span> downtime risk</li>
                <li>• DPDP § 17 gap (grievance endpoint) — <span className="font-semibold text-foreground">$312K</span> regulatory exposure</li>
                <li>• Open SSH port on <span className="font-mono text-primary">ec2-bastion-prod</span> — <span className="font-semibold text-foreground">$120K</span> lateral movement risk</li>
              </ul>
              <div className="mt-4 text-foreground">Recommended: enable column KMS on <span className="font-mono text-primary">rds-pii</span> (auto-PR ready) and patch in next maintenance window.</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Generate PDF brief", "Open auto-PR", "Schedule patch", "Notify CFO"].map((t) => (
                  <button key={t} className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary">{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-6 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-foreground">AI Orchestration · current request</span>
            <span className="font-mono text-[11px] font-medium text-muted-foreground">trace · 0.84s · 6 tools</span>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {[
              { t: "Plan", i: Brain },
              { t: "Fetch posture", i: Database },
              { t: "Map paths", i: GitBranch },
              { t: "Score impact", i: Cpu },
              { t: "Draft report", i: FileText },
              { t: "Verify", i: Shield },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative rounded-lg border border-border bg-background/50 p-3.5">
                <s.i className="h-4 w-4 text-primary" />
                <div className="mt-2 text-[12px] font-medium text-foreground">{s.t}</div>
                <div className="mt-1 font-mono text-[10px] text-emerald">ok · {(Math.random() * 200 + 40).toFixed(0)}ms</div>
                {i < arr.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border-strong md:block" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { t: "Auto-PRs Opened", v: "32", d: "this month", i: Workflow },
            { t: "Reports Generated", v: "184", d: "execs + audit", i: FileText },
            { t: "Time Saved", v: "412h", d: "vs manual SOC", i: Zap },
          ].map(({ t, v, d, i: I }) => (
            <div key={t} className="rounded-xl border border-border bg-surface/60 p-5 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t}</span>
                <I className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 font-mono text-[26px] font-bold text-foreground">{v}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
