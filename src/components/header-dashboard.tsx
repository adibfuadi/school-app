"use client";

import { SidebarTrigger } from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ⬅️ ganti ini
import { NavUser } from "./asidebar/nav-user";

const HeaderDashboard = () => {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  const pathname = usePathname(); // ⬅️ ganti ini

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/billing")) return "Billing";
    if (pathname.includes("/workflows")) return "Workflows";
    if (pathname.includes("/templates")) return "Templates";
    if (pathname.includes("/settings")) return "Settings";
    return null; // Default label
  };

  const pageHeading = getPageLabel(pathname);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center bg-white">
      <div className="flex w-full justify-between px-4">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden text-[15px] md:block">
                {pageHeading ? (
                  <BreadcrumbLink asChild>
                    <Link href={`/dashboard`}>Dashboard</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="line-clamp-1">
                    Dashboard
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {pageHeading && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="text-[15px]">
                    <BreadcrumbPage className="line-clamp-1">
                      {pageHeading}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
