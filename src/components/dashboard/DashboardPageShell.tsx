import { ReactNode } from "react";

export function DashboardPageShell({ 
  children, 
  className = "",
  header 
}: { 
  children: ReactNode; 
  className?: string;
  header?: ReactNode;
}) {
  return (
    <div className="flex-1 w-full relative">
      {/* Optional atmospheric background glow for dashboard pages */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-radial-primary opacity-50" />
      
      <div className={`relative mx-auto w-full max-w-[1400px] px-6 py-8 ${className}`}>
        {header && <div className="mb-8">{header}</div>}
        {children}
      </div>
    </div>
  );
}
