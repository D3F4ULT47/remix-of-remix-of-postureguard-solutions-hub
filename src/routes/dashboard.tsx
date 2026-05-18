import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Dashboard-specific Navbar */}
      <DashboardNavbar />
      
      {/* 
        This is where child routes will be rendered. 
        Note that the DashboardNavbar is sticky and handles the top space.
      */}
      <main className="flex-1 relative flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
