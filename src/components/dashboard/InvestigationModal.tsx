import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

export function InvestigationModal({
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
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Dimmed backdrop — preserves page visibility */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "modalFadeIn 0.2s ease-out" }}
      />

      {/* Centered investigation modal */}
      <div
        className="relative z-10 flex max-h-[85vh] w-[clamp(540px,65vw,920px)] flex-col overflow-hidden rounded-2xl border border-border/60 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)]"
        style={{
          background: "color-mix(in oklab, var(--surface-elevated) 97%, transparent)",
          backdropFilter: "blur(24px)",
          animation: "modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-border/50 px-8 py-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] font-semibold tracking-tight text-foreground">{title}</h2>
            {subtitle && <div className="mt-1.5 text-[12px] font-medium text-muted-foreground">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="ml-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-7 custom-scrollbar">
          {children}
        </div>
      </div>

      {/* Keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
