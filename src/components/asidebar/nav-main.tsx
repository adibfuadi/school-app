"use client";

import { LogOut, Settings, User, type LucideIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={
                  item.url === pathname || pathname?.startsWith(item.url + "/")
                }
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            // <SidebarMenuItem key={item.title}>
            //   <SidebarMenuButton tooltip={item.title}>
            //     {item.icon && <item.icon />}
            //     <span>{item.title}</span>
            //   </SidebarMenuButton>
            // </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <div className="h-4"></div>
      <SidebarGroupLabel>Other</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="profile">
          <SidebarMenuButton
            tooltip="Profile"
            isActive={"/profile" === pathname}
            asChild
          >
            <Link href="/profile">
              <User />
              <span>Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="setting">
          <SidebarMenuButton
            tooltip="Settings"
            isActive={"/settings" === pathname}
            asChild
          >
            <Link href="/settings">
              <Settings />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="signout">
          <SidebarMenuButton
            tooltip="Signout"
            isActive={"/signout" === pathname}
            asChild
          >
            <Link href="/signout">
              <LogOut />
              <span>Sign out</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
