import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="p-6 h-[calc(100vh-3.5rem)] overflow-hidden">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
