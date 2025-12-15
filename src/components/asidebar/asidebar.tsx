"use client";

import * as React from "react";
import {
  AudioWaveform,
  AudioWaveformIcon,
  Book,
  BookOpen,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  Clipboard,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  LayoutDashboard,
  Map,
  Megaphone,
  PieChart,
  School,
  Settings,
  SquareTerminal,
  User2,
  Users,
} from "lucide-react";

import { NavMain } from "~/components/asidebar/nav-main";
import { NavProjects } from "~/components/asidebar/nav-projects";
import { NavUser } from "~/components/asidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: User2,
    },
    {
      title: "Students",
      url: "/students",
      icon: GraduationCap,
    },
    {
      title: "Parents",
      url: "/parents",
      icon: Users,
    },
    {
      title: "Subjects",
      url: "/subjects",
      icon: Book,
    },
    {
      title: "Classes",
      url: "/classes",
      icon: School,
    },
    {
      title: "Leassons",
      url: "/lessons",
      icon: BookOpen,
    },
    {
      title: "Exams",
      url: "/exams",
      icon: BookOpenCheck,
    },
    {
      title: "Assignments",
      url: "/assignments",
      icon: Clipboard,
    },
    {
      title: "Results",
      url: "/results",
      icon: CheckCircle2,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: Megaphone,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="mt-2 flex h-[40px] items-center gap-2">
          <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
            <AudioWaveform className="h-6 w-6 text-white" />
          </div>
          <span className="truncate text-2xl font-medium">SchoolApp</span>
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">SchoolApp</span>
            <span className="truncate text-xs">Enterprise</span>
          </div> */}
        </div>
      </SidebarHeader>
      <hr className="border-background" />
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects items={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
