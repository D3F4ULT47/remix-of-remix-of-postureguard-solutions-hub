import { useState, useRef, MouseEvent as ReactMouseEvent } from "react";
import { 
  Network, Database, ShieldAlert, Cpu, Server, ExternalLink, 
  ZoomIn, ZoomOut, Maximize, Target, Activity, Lock, Globe,
  ShieldCheck, FileText, ArrowRight, MousePointerClick, ChevronRight
} from "lucide-react";
import { InspectionPanel } from "./InspectionPanel";
import { Link, useNavigate } from "@tanstack/react-router";
import { LiveIndicator, AIBadge, StatusBadge } from "./SharedUI";

// Operational Infrastructure Dataset
const nodes = [
  { id: "igw-1", type: "network", label: "Internet Gateway", x: 100, y: 400, group: "internet", exposure: "public", criticality: "high", score: 100, ports: "443, 80", connections: ["alb-main"] },
  { id: "alb-main", type: "lb", label: "ext-gateway-lb", x: 320, y: 400, group: "vpc-public", exposure: "public", criticality: "high", score: 92, ports: "443", connections: ["eks-worker-1", "eks-worker-2"] },
  { id: "eks-worker-1", type: "compute", label: "eks-node-group-a", x: 550, y: 320, group: "vpc-private", exposure: "internal", criticality: "critical", score: 45, cve: "CVE-2024-21626", ports: "22, 10250", connections: ["rds-master"] },
  { id: "eks-worker-2", type: "compute", label: "eks-node-group-b", x: 550, y: 480, group: "vpc-private", exposure: "internal", criticality: "medium", score: 88, ports: "10250", connections: ["rds-master"] },
  { id: "rds-master", type: "database", label: "rds-postgres-main", x: 780, y: 400, group: "vpc-private", exposure: "internal", criticality: "critical", score: 72, ports: "5432", compliance: "SOC 2 (CC6.1)", connections: [] },
  { id: "s3-assets", type: "database", label: "s3-public-assets", x: 780, y: 150, group: "internet", exposure: "public", criticality: "high", score: 65, cve: "AC-1104", ports: "443", connections: [] },
  { id: "iam-role", type: "network", label: "eks-admin-role", x: 550, y: 150, group: "iam", exposure: "internal", criticality: "high", score: 50, connections: ["eks-worker-1"] },
];

export function InfraCanvas({ onExit }: { onExit: () => void }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Navigation & Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const navigate = useNavigate();

  // Active interaction logic (click overrides hover)
  const activeNodeId = selectedNode || hoveredNode;
  const activeNode = nodes.find(n => n.id === activeNodeId);
  const selectedData = nodes.find(n => n.id === selectedNode);

  // Relationship check
  const isRelated = (id: string) => {
    if (!activeNodeId) return true; // Everything visible if nothing selected/hovered
    if (activeNodeId === id) return true;
    
    // Check if directly connected
    const activeData = nodes.find(n => n.id === activeNodeId);
    if (activeData?.connections.includes(id)) return true;
    
    // Check if parent of active
    const isParent = nodes.some(n => n.id === id && n.connections.includes(activeNodeId));
    if (isParent) return true;

    return false;
  };

  // Determine line style
  const getLineStyle = (sourceId: string, targetId: string) => {
    const isAttackPath = (sourceId === "eks-worker-1" && targetId === "rds-master") || (sourceId === "alb-main" && targetId === "eks-worker-1");
    
    if (activeNodeId) {
      if (activeNodeId === sourceId || activeNodeId === targetId) {
        if (isAttackPath) return { stroke: "rgba(239,68,68,0.8)", strokeWidth: 3, dashed: true, animate: true, zIndex: 10 };
        return { stroke: "rgba(56,189,248,0.8)", strokeWidth: 3, dashed: false, animate: true, zIndex: 10 }; // highlighted path
      }
      return { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1, dashed: false, animate: false, zIndex: 1 }; // dimmed
    }
    
    if (isAttackPath) return { stroke: "rgba(239,68,68,0.4)", strokeWidth: 2, dashed: true, animate: false, zIndex: 5 };
    return { stroke: "rgba(255,255,255,0.15)", strokeWidth: 2, dashed: false, animate: false, zIndex: 2 };
  };

  // Panning logic
  const handleMouseDown = (e: ReactMouseEvent) => {
    // Only pan if clicking on the background, not nodes
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-background overflow-hidden">
      
      {/* Top Header - Edge to Edge with integrated Attack Patterns CTA */}
      <header className="glass-panel flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-surface/80 backdrop-blur-xl px-6 shadow-sm z-50">
        <div className="flex items-center gap-6 text-[13px] font-medium">
          <button onClick={onExit} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            &larr; Back to Dashboard
          </button>
          <div className="h-4 w-px bg-border/60" />
          <div className="flex items-center gap-4 text-foreground">
            <span className="font-semibold flex items-center gap-2"><Network className="h-4 w-4" /> Topology Intelligence</span>
            <span className="text-muted-foreground/50">|</span>
            <span className="font-mono text-[11px] text-muted-foreground bg-surface-elevated px-2 py-1 rounded">vpc-main-production</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/dashboard/attack-patterns" className="group flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-1.5 text-[12px] font-bold text-destructive transition-colors hover:bg-destructive/20 shadow-[0_0_15px_-5px_var(--destructive)]">
            <Activity className="h-3.5 w-3.5 animate-pulse" /> Investigate Attack Paths
          </Link>
          <div className="h-4 w-px bg-border/60" />
          <LiveIndicator text="Environment Live" status="active" />
        </div>
      </header>

      {/* Canvas Controls */}
      <div className="absolute bottom-6 left-6 z-50 flex flex-col gap-2 rounded-xl border border-border/60 bg-surface-elevated/90 p-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => setZoomLevel(z => Math.min(z + 0.2, 2))} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors">
          <ZoomIn className="h-4 w-4" />
        </button>
        <button onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.4))} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors">
          <ZoomOut className="h-4 w-4" />
        </button>
        <div className="my-1 border-t border-border/60 mx-2" />
        <button onClick={resetView} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors" title="Reset View">
          <Maximize className="h-4 w-4" />
        </button>
        <button onClick={() => setSelectedNode(null)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors" title="Clear Focus">
          <MousePointerClick className="h-4 w-4" />
        </button>
      </div>

      {/* Canvas Surface Area */}
      <div 
        className="relative flex-1 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_100%)] cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />

        {/* Transform Wrapper */}
        <div 
          className="absolute inset-0 transition-transform duration-200 ease-out origin-center"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})` }}
        >
          {/* Virtual Coordinate System (1000x800 base size centered in screen) */}
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -translate-x-1/2 -translate-y-1/2">
            
            {/* Hierarchical Groupings (VPC / Subnets) */}
            {/* Public Subnet Box */}
            <div 
              className={`absolute top-[300px] left-[220px] w-[200px] h-[200px] rounded-2xl border-2 border-dashed border-emerald/20 bg-emerald/5 transition-opacity duration-500 flex items-start p-3 ${activeNodeId ? "opacity-30" : "opacity-100"}`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald">subnet-public-1a</span>
            </div>
            {/* Private Subnet Box */}
            <div 
              className={`absolute top-[220px] left-[450px] w-[450px] h-[360px] rounded-2xl border-2 border-dashed border-border/40 bg-surface/20 transition-opacity duration-500 flex items-start p-3 ${activeNodeId ? "opacity-30" : "opacity-100"}`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">subnet-private-1a</span>
            </div>
            
            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrow-normal" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.4)" />
                </marker>
                <marker id="arrow-highlight" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(56,189,248,0.8)" />
                </marker>
                <marker id="arrow-threat" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(239,68,68,0.8)" />
                </marker>
              </defs>
              
              {nodes.map(source => 
                source.connections.map(targetId => {
                  const target = nodes.find(n => n.id === targetId);
                  if (!target) return null;
                  
                  const style = getLineStyle(source.id, target.id);
                  const markerId = style.stroke.includes("239") && style.strokeWidth > 1 ? "url(#arrow-threat)" : 
                                   style.stroke.includes("56") ? "url(#arrow-highlight)" : 
                                   style.strokeWidth > 1 ? "url(#arrow-normal)" : "";

                  return (
                    <path
                      key={`${source.id}-${target.id}`}
                      d={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
                      stroke={style.stroke}
                      strokeWidth={style.strokeWidth}
                      strokeDasharray={style.dashed ? "6 6" : "none"}
                      fill="none"
                      markerEnd={markerId}
                      className={`transition-all duration-500 ${style.animate ? "animate-[dash_1s_linear_infinite]" : ""}`}
                      style={{ zIndex: style.zIndex }}
                    />
                  );
                })
              )}
            </svg>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes dash {
                to { stroke-dashoffset: -12; }
              }
            `}} />

            {/* Nodes Layer */}
            {nodes.map((node) => {
              const isActive = activeNodeId === node.id;
              const related = isRelated(node.id);
              const isCompromised = !!node.cve;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer
                    ${isActive ? "scale-110 z-30" : "hover:scale-105 z-10"}
                    ${!related ? "opacity-20 grayscale scale-95" : "opacity-100 grayscale-0"}
                  `}
                  style={{ top: node.y, left: node.x }}
                >
                  <div className={`relative grid h-14 w-14 place-items-center rounded-2xl border bg-surface/90 shadow-lg backdrop-blur-md transition-all duration-500 ${
                    isActive ? "border-primary shadow-[0_0_40px_-5px_var(--primary)] bg-primary/10" : 
                    isCompromised ? "border-destructive/50 shadow-[0_0_25px_-5px_var(--destructive)]" : 
                    "border-border/60 hover:border-primary/40"
                  }`}>
                    {node.type === "network" ? <Globe className="h-6 w-6 text-foreground" /> :
                     node.type === "database" ? <Database className="h-6 w-6 text-foreground" /> :
                     node.type === "lb" ? <Network className="h-6 w-6 text-foreground" /> :
                     <Cpu className="h-6 w-6 text-foreground" />}
                     
                     {/* Compromised Pulse */}
                     {isCompromised && (
                       <div className="absolute -top-1.5 -right-1.5 grid h-4 w-4 place-items-center rounded-full bg-destructive shadow-[0_0_10px_var(--destructive)]">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                       </div>
                     )}
                  </div>
                  
                  {/* Node Label */}
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center gap-1.5 whitespace-nowrap rounded-md border bg-surface-elevated/95 px-3 py-1.5 text-[12px] font-semibold transition-all duration-500 backdrop-blur-md shadow-md ${
                      isActive ? "border-primary/50 text-primary" : "border-border/40 text-foreground"
                    }`}>
                      {node.exposure === "public" ? <Globe className="h-3 w-3 text-emerald" /> : <Lock className="h-3 w-3 text-muted-foreground" />}
                      {node.label}
                    </div>
                    {/* Micro-indicator */}
                    {isCompromised && (
                      <div className="mt-1.5 flex items-center gap-1 whitespace-nowrap rounded border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-destructive">
                        <ShieldAlert className="h-3 w-3" /> {node.cve}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep SOC Investigation Drawer */}
      <InspectionPanel
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title={
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 bg-primary/10">
              {selectedData?.type === "database" ? <Database className="h-5 w-5 text-primary" /> :
               selectedData?.type === "compute" ? <Cpu className="h-5 w-5 text-primary" /> :
               selectedData?.type === "lb" ? <Network className="h-5 w-5 text-primary" /> :
               <Globe className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <div className="text-[16px] font-bold text-foreground">{selectedData?.label}</div>
              <div className="text-[11px] text-muted-foreground capitalize">{selectedData?.type} • {selectedData?.group}</div>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          
          {/* Name Field */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Name</label>
            <div className="rounded-lg border border-border/60 bg-surface/50 px-3 py-2.5 text-[13px] font-mono text-foreground">
              {selectedData?.label}
            </div>
          </div>

          {/* Resource Metadata — accordion style */}
          <button className="flex items-center justify-between w-full border-b border-border/40 pb-2 text-left group">
            <span className="text-[13px] font-semibold text-foreground">Resource Metadata</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Threats Section */}
          <div>
            <h4 className="text-[13px] font-semibold text-foreground mb-3">Threats</h4>
            <div className="flex flex-col gap-0 rounded-xl border border-border/60 overflow-hidden">
              {selectedData?.cve ? (
                <>
                  <button 
                    onClick={() => selectedData?.cve && navigate({ to: "/dashboard/threats", search: { cveId: selectedData.cve, view: true } })}
                    className="flex items-center justify-between px-3 py-3 border-b border-border/30 hover:bg-surface-elevated/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] font-semibold text-foreground">{selectedData.cve}</span>
                      <StatusBadge status="HIGH" type="warning" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => navigate({ to: "/dashboard/threats", search: { cveId: "CVE-2024-3094", view: true } })}
                    className="flex items-center justify-between px-3 py-3 border-b border-border/30 hover:bg-surface-elevated/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] font-semibold text-foreground">CVE-2024-3094</span>
                      <StatusBadge status="HIGH" type="warning" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => navigate({ to: "/dashboard/threats", search: { cveId: "CVE-2023-4863", view: true } })}
                    className="flex items-center justify-between px-3 py-3 border-b border-border/30 hover:bg-surface-elevated/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] font-semibold text-foreground">CVE-2023-4863</span>
                      <StatusBadge status="HIGH" type="warning" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <div className="px-3 py-4 text-center text-[12px] text-muted-foreground">
                  No active threats detected
                </div>
              )}
            </div>
          </div>

          {/* DPDP Compliance */}
          <button className="flex items-center justify-between w-full border-b border-border/40 pb-2 text-left group">
            <span className="text-[13px] font-semibold text-foreground">DPDP Compliance</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Bottom CTAs — matching reference: Close + Save */}
          <div className="mt-auto pt-4 flex gap-3">
            <button 
              onClick={() => setSelectedNode(null)}
              className="flex-1 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-[13px] font-semibold text-destructive transition-colors hover:bg-destructive/20"
            >
              Close
            </button>
            <button className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 shadow-[0_0_15px_-5px_var(--primary)]">
              Save
            </button>
          </div>

        </div>
      </InspectionPanel>
    </div>
  );
}
