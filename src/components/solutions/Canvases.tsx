import { Activity, AlertTriangle, ArrowRight, BadgeCheck, Bot, Brain, CheckCircle2, Cloud, Cpu, Database, FileCheck, FileText, Flame, GitBranch, Globe, Layers, Lock, MessageSquare, Network, Search, Server, Shield, ShieldAlert, ShieldCheck, Sparkles, TerminalSquare, Workflow, Zap } from "lucide-react";

/* ---------- DPDP Compliance ---------- */
export function DpdpCanvas() {
  return (
    <div className="grid h-full gap-3 p-5 md:grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-3 space-y-2 rounded-lg border border-border bg-surface/60 p-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Frameworks</div>
        {["DPDP 2023", "GDPR", "ISO 27001", "SOC 2", "HIPAA", "PCI-DSS"].map((f, i) => (
          <div key={f} className={`flex items-center justify-between rounded-md px-2.5 py-2 text-[12px] ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-foreground/5"}`}>
            <span className="flex items-center gap-2"><FileCheck className="h-3.5 w-3.5" /> {f}</span>
            <span className="font-mono text-[10px]">{[94, 88, 91, 76, 82, 71][i]}%</span>
          </div>
        ))}
      </aside>

      <section className="col-span-9 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[
            { l: "Posture Score", v: "94", d: "+6 this week", i: BadgeCheck, c: "text-emerald" },
            { l: "Open Findings", v: "23", d: "8 critical", i: AlertTriangle, c: "text-amber-300" },
            { l: "Auto-Remediated", v: "147", d: "last 30d", i: Zap, c: "text-primary" },
            { l: "Audit Ready", v: "Yes", d: "ISO + DPDP", i: ShieldCheck, c: "text-emerald" },
          ].map(({ l, v, d, i: Icon, c }) => (
            <div key={l} className="rounded-lg border border-border bg-surface/60 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</span>
                <Icon className={`h-3.5 w-3.5 ${c}`} />
              </div>
              <div className={`mt-1.5 font-mono text-xl font-semibold ${c}`}>{v}</div>
              <div className="text-[10px] text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-foreground">DPDP Readiness Workflow</span>
            <span className="font-mono text-[10px] text-muted-foreground">v2.4 · last run 2m ago</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { t: "Questionnaire", s: "Complete", n: 142, ok: true },
              { t: "Evidence Collected", s: "Complete", n: 89, ok: true },
              { t: "Risk Analysis", s: "Running", n: 23, ok: false },
              { t: "AI Remediation", s: "Pending", n: 12, ok: false },
              { t: "Audit Report", s: "Queued", n: 1, ok: false },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative rounded-md border border-border bg-background/50 p-3">
                <div className="font-mono text-[10px] text-muted-foreground">0{i + 1}</div>
                <div className="mt-1 text-[12px] font-medium text-foreground">{s.t}</div>
                <div className={`mt-1 text-[10px] ${s.ok ? "text-emerald" : "text-primary"}`}>{s.s}</div>
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">{s.n} items</div>
                {i < arr.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-border-strong md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-surface/60 p-4">
            <div className="mb-2 text-[12px] font-semibold text-foreground">Regulatory Mapping</div>
            <div className="space-y-2">
              {[
                { k: "§ 8(4) Consent records", v: "Mapped", c: "text-emerald" },
                { k: "§ 9 Data minimization", v: "Partial", c: "text-primary" },
                { k: "§ 11 Breach notification", v: "Mapped", c: "text-emerald" },
                { k: "§ 17 Grievance redress", v: "Gap", c: "text-destructive" },
              ].map(({ k, v, c }) => (
                <div key={k} className="flex items-center justify-between rounded-md bg-background/40 px-2.5 py-1.5 text-[11.5px]">
                  <span className="text-muted-foreground">{k}</span>
                  <span className={`font-mono text-[10.5px] ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-foreground"><Sparkles className="h-3.5 w-3.5 text-primary" /> AI Remediation Suggestions</div>
            <div className="space-y-2 text-[11.5px]">
              {[
                "Enable retention policy on `users.consent_log` (30d → 365d)",
                "Add DPO contact endpoint at /api/privacy/grievance",
                "Encrypt PII columns in `customers` with column-level KMS",
              ].map((t) => (
                <div key={t} className="rounded-md border border-border bg-background/40 px-2.5 py-2 text-muted-foreground">
                  <span className="font-mono text-primary">{">"}</span> {t}
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
    <div className="grid h-full gap-3 p-5 md:grid-cols-12">
      <aside className="col-span-3 space-y-3">
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cloud Accounts</div>
          {[
            { c: "AWS", n: 12, i: Cloud },
            { c: "Azure", n: 4, i: Cloud },
            { c: "GCP", n: 3, i: Cloud },
            { c: "On-prem", n: 2, i: Server },
          ].map(({ c, n, i: I }) => (
            <div key={c} className="mt-1.5 flex items-center justify-between text-[11.5px] text-muted-foreground">
              <span className="flex items-center gap-2"><I className="h-3.5 w-3.5 text-primary" /> {c}</span>
              <span className="font-mono text-[10px]">{n}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asset Types</div>
          {[
            ["Compute", 312], ["Storage", 184], ["Network", 96], ["Identity", 421], ["Database", 58],
          ].map(([k, v]) => (
            <div key={k as string} className="mt-1.5 flex items-center justify-between text-[11.5px]">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-mono text-[10px] text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="col-span-9 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[
            { l: "Assets", v: "1,071", c: "text-foreground" },
            { l: "Exposed", v: "47", c: "text-amber-300" },
            { l: "Attack Paths", v: "12", c: "text-destructive" },
            { l: "Drift Events", v: "8", c: "text-primary" },
          ].map((m) => (
            <div key={m.l} className="rounded-lg border border-border bg-surface/60 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
              <div className={`mt-1 font-mono text-xl font-semibold ${m.c}`}>{m.v}</div>
            </div>
          ))}
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-lg border border-border bg-background/50">
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
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md border border-border bg-surface/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
            <Network className="h-3 w-3 text-primary" /> Topology · realtime
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-surface/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-foreground"><GitBranch className="h-3.5 w-3.5 text-primary" /> Attack Path · Critical</div>
            <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground">
              <div><span className="text-primary">→</span> public-alb (0.0.0.0/0)</div>
              <div><span className="text-primary">→</span> ec2-web-04 (CVE-2024-3094)</div>
              <div><span className="text-primary">→</span> iam-role: *AdminAccess</div>
              <div><span className="text-destructive">→</span> rds-pii (encrypted: false)</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface/60 p-4">
            <div className="mb-2 text-[12px] font-semibold text-foreground">Asset Drift · last 24h</div>
            <div className="space-y-1.5 text-[11.5px]">
              {[
                ["security-group sg-2a4f", "ingress 22/tcp opened"],
                ["s3 bucket logs-prod", "public-read enabled"],
                ["iam policy DataOps", "wildcard added"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-start justify-between gap-3 text-muted-foreground">
                  <span className="font-mono text-[10px] text-foreground">{a}</span>
                  <span className="text-right text-[10.5px]">{b}</span>
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
    <div className="grid h-full gap-3 p-5 md:grid-cols-12">
      <section className="col-span-8 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[
            { l: "Live CVEs", v: "1,284", c: "text-foreground", i: Activity },
            { l: "Critical · You", v: "9", c: "text-destructive", i: Flame },
            { l: "EPSS > 0.7", v: "34", c: "text-amber-300", i: ShieldAlert },
            { l: "Patched", v: "412", c: "text-emerald", i: CheckCircle2 },
          ].map(({ l, v, c, i: I }) => (
            <div key={l} className="rounded-lg border border-border bg-surface/60 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</span>
                <I className={`h-3.5 w-3.5 ${c}`} />
              </div>
              <div className={`mt-1 font-mono text-xl font-semibold ${c}`}>{v}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-foreground">Live Threat Feed</span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald pulse-dot" /> ingesting · 12 sources</span>
          </div>
          <div className="space-y-1.5">
            {[
              ["CVE-2026-1031", "OpenSSL · heap overflow", 9.8, 0.92, "Critical"],
              ["CVE-2026-0884", "nginx · request smuggling", 8.1, 0.74, "High"],
              ["CVE-2026-0512", "kubernetes · auth bypass", 9.1, 0.81, "Critical"],
              ["CVE-2025-9712", "PostgreSQL · privilege esc.", 7.8, 0.41, "High"],
              ["CVE-2025-9344", "redis · use-after-free", 6.5, 0.28, "Medium"],
            ].map(([id, t, cvss, epss, sev]) => (
              <div key={id as string} className="grid grid-cols-12 items-center gap-3 rounded-md bg-background/40 px-3 py-2 text-[11.5px]">
                <span className="col-span-3 font-mono text-[11px] text-primary">{id}</span>
                <span className="col-span-5 text-foreground">{t}</span>
                <span className="col-span-2 font-mono text-[10.5px] text-muted-foreground">CVSS {cvss as number} · EPSS {epss as number}</span>
                <span className={`col-span-2 text-right font-mono text-[10px] ${sev === "Critical" ? "text-destructive" : sev === "High" ? "text-amber-300" : "text-primary"}`}>{sev as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-3 text-[12px] font-semibold text-foreground">AI Risk Scoring Pipeline</div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { t: "Ingest", s: "12 feeds", i: Database },
              { t: "Normalize", s: "STIX/TAXII", i: Layers },
              { t: "Correlate", s: "your assets", i: GitBranch },
              { t: "Score", s: "EPSS×CVSS×ctx", i: Brain },
              { t: "Notify", s: "SOC + Slack", i: Zap },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative rounded-md border border-border bg-background/50 p-3">
                <s.i className="h-3.5 w-3.5 text-primary" />
                <div className="mt-1.5 text-[12px] font-medium text-foreground">{s.t}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{s.s}</div>
                {i < arr.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-border-strong md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="col-span-4 space-y-3">
        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-2 text-[12px] font-semibold text-foreground">Severity (7d)</div>
          <div className="flex h-32 items-end gap-1.5">
            {[18, 24, 16, 32, 28, 41, 36].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h * 2}%` }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5 font-mono text-[9px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="text-center">{d}</span>)}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-foreground"><Globe className="h-3.5 w-3.5 text-primary" /> Active Campaigns</div>
          <div className="space-y-2 text-[11.5px]">
            {[
              { k: "APT-29 · phishing", v: "Active", c: "text-destructive" },
              { k: "Volt Typhoon · LotL", v: "Watching", c: "text-amber-300" },
              { k: "FIN7 · POS skim", v: "Contained", c: "text-emerald" },
            ].map(({ k, v, c }) => (
              <div key={k} className="flex items-center justify-between rounded-md bg-background/40 px-2 py-1.5">
                <span className="text-muted-foreground">{k}</span>
                <span className={`font-mono text-[10px] ${c}`}>{v}</span>
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
    <div className="grid h-full gap-3 p-5 md:grid-cols-12">
      <aside className="col-span-3 space-y-2 rounded-lg border border-border bg-surface/60 p-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Conversations</div>
        {[
          ["Q3 board report", "active"],
          ["CVE-2026-1031 triage", ""],
          ["Cost of last incident", ""],
          ["DPDP gap analysis", ""],
        ].map(([t, s]) => (
          <div key={t} className={`rounded-md px-2.5 py-2 text-[11.5px] ${s ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-foreground/5"}`}>
            <div className="flex items-center gap-2"><MessageSquare className="h-3 w-3" />{t}</div>
          </div>
        ))}
        <div className="mt-3 border-t border-border pt-3 text-[10px] uppercase tracking-wider text-muted-foreground">Tools</div>
        {[
          ["Search assets", Search],
          ["Run scan", TerminalSquare],
          ["Generate report", FileText],
          ["Apply policy", Lock],
        ].map(([t, I]) => {
          const Icon = I as typeof Search;
          return (
            <div key={t as string} className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground">
              <Icon className="h-3 w-3 text-primary" /> {t as string}
            </div>
          );
        })}
      </aside>

      <section className="col-span-9 space-y-3">
        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-[12px] font-semibold text-foreground">PostureGuard Copilot</span>
            <span className="rounded-md border border-border bg-background/50 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">reasoning · v3</span>
          </div>

          <div className="space-y-3">
            <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm border border-border bg-background/50 px-3 py-2 text-[12.5px] text-foreground">
              Summarize our security posture for the board, with financial impact of unresolved findings.
            </div>
            <div className="max-w-[92%] rounded-lg rounded-tl-sm border border-primary/30 bg-primary/5 px-3 py-2.5 text-[12.5px]">
              <div className="text-foreground">Posture is <span className="text-emerald">Strong (94/100)</span>. Three exposures concentrate 78% of estimated risk:</div>
              <ul className="mt-2 space-y-1.5 text-muted-foreground">
                <li>• <span className="font-mono text-primary">rds-pii</span> · unencrypted, exposed via attack path A-12 — <span className="text-foreground">$2.4M</span> est. breach impact</li>
                <li>• <span className="font-mono text-primary">CVE-2026-1031</span> on 14 hosts — <span className="text-foreground">$840K</span> downtime risk</li>
                <li>• DPDP § 17 gap (grievance endpoint) — <span className="text-foreground">$312K</span> regulatory exposure</li>
              </ul>
              <div className="mt-2 text-foreground">Recommended: enable column KMS on <span className="font-mono text-primary">rds-pii</span> (auto-PR ready) and patch in next maintenance window.</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Generate PDF brief", "Open auto-PR", "Schedule patch", "Notify CFO"].map((t) => (
                  <button key={t} className="rounded-md border border-border bg-surface/60 px-2 py-1 text-[10.5px] text-foreground hover:border-primary/40 hover:text-primary">{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-foreground">AI Orchestration · current request</span>
            <span className="font-mono text-[10px] text-muted-foreground">trace · 0.84s · 6 tools</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {[
              { t: "Plan", i: Brain },
              { t: "Fetch posture", i: Database },
              { t: "Map paths", i: GitBranch },
              { t: "Score impact", i: Cpu },
              { t: "Draft report", i: FileText },
              { t: "Verify", i: Shield },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative rounded-md border border-border bg-background/50 p-2.5">
                <s.i className="h-3.5 w-3.5 text-primary" />
                <div className="mt-1 text-[11px] font-medium text-foreground">{s.t}</div>
                <div className="mt-0.5 font-mono text-[9.5px] text-emerald">ok · {(Math.random() * 200 + 40).toFixed(0)}ms</div>
                {i < arr.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-border-strong md:block" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { t: "Auto-PRs Opened", v: "32", d: "this month", i: Workflow },
            { t: "Reports Generated", v: "184", d: "execs + audit", i: FileText },
            { t: "Time Saved", v: "412h", d: "vs manual SOC", i: Zap },
          ].map(({ t, v, d, i: I }) => (
            <div key={t} className="rounded-lg border border-border bg-surface/60 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{t}</span>
                <I className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="mt-1 font-mono text-xl font-semibold text-foreground">{v}</div>
              <div className="text-[10px] text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
