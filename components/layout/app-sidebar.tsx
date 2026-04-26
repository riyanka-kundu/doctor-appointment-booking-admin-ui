"use client";

import {
  Building,
  Calendar,
  HeartPulse,
  LayoutDashboard,
  LogOut,
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/redux/slice/auth-slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Departments", url: "/department", icon: Building },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Doctors", url: "/doctors", icon: HeartPulse },
];

export function AppSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-primary">
            Doctor Booking UI
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link
                      href={item.url}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <ConfirmAlert
          icon={<LogOut className="mr-2 size-4" />}
          loading={loading}
          buttonText="Logout"
          confirmText="Logout"
          variant="outline"
          className="mt-2 w-full"
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
