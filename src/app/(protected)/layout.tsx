"use client";
import { useRouter } from "next/navigation";
import { AppSidebar } from "~/components/asidebar/asidebar";
import HeaderDashboard from "~/components/header-dashboard";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { useUser } from "~/hooks/useUser";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <div className="w-full">
          <>
            <HeaderDashboard />
            <div className="p-6">{children}</div>
          </>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
