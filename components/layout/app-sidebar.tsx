"use client";

import {
  Building,
  Calendar,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ConfirmAlert } from "@/components/confirm-alert";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/slice/auth-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Departments", url: "/department", icon: Building },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Doctors", url: "/doctors", icon: Stethoscope },
];

export function AppSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <Sidebar className="border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <SidebarHeader className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800 dark:bg-slate-950">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <HeartPulse size={20} />
          </div>

          <p className="text-base font-black text-slate-900 dark:text-white">
            MediBook
          </p>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                        )}
                      >
                        <item.icon
                          size={18}
                          className={
                            isActive
                              ? "text-white"
                              : "text-slate-400 dark:text-slate-500"
                          }
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-950">
        <ConfirmAlert
          icon={<LogOut className="mr-2 size-4" />}
          loading={loading}
          buttonText="Logout"
          confirmText="Logout"
          variant="outline"
          className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          headerText="Are you sure you want to logout?"
          subText="You will be redirected to the login page."
          onConfirm={async () => {
            await dispatch(logout());
            router.replace("/login");
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
