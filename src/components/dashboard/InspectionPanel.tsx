import { X } from "lucide-react";
import { ReactNode } from "react";

export function InspectionPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-y-0 right-0 z-50 w-[420px] flex flex-col border-l border-border bg-surface/95 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in slide-in-from-right-8 duration-300"
      style={{
        background: "color-mix(in oklab, var(--surface-elevated) 95%, transparent)"
      }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 py-5">
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[12px] font-medium text-muted-foreground">{subtitle}</p>}
        </div>
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {children}
      </div>
    </div>
  );
}
