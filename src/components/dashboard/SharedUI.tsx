import { Sparkles, Activity } from "lucide-react";
import { ReactNode } from "react";

// Live pulsing indicator for real-time states
export function LiveIndicator({ text = "Live Sync", status = "active" }: { text?: string, status?: "active" | "warning" | "error" }) {
  const color = status === "active" ? "emerald" : status === "warning" ? "accent" : "destructive";
  
  return (
    <div className={`flex items-center gap-1.5 text-[11px] font-medium text-${color}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${color} opacity-75`}></span>
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full bg-${color}`}></span>
      </span>
      {text}
    </div>
  );
}

// Consistent AI insights badge/header
export function AIBadge({ children }: { children?: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary">
      <Sparkles className="h-3 w-3" />
      {children || "AI INSIGHT"}
    </div>
  );
}

// Consistent Status Badge
export function StatusBadge({ status, type }: { status: string, type: "success" | "warning" | "error" | "neutral" }) {
  const colors = {
    success: "border-emerald/20 bg-emerald/10 text-emerald",
    warning: "border-accent/20 bg-accent/10 text-accent",
    error: "border-destructive/30 bg-destructive/10 text-destructive",
    neutral: "border-border/60 bg-surface/50 text-muted-foreground",
  };

  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider ${colors[type]}`}>
      {status}
    </span>
  );
}
