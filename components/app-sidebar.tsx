"use client"

import type * as React from "react"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Receipt,
  Store,
  CreditCard,
  UserCheck,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"

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
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Store Management",
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
          icon: Package,
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: ShoppingCart,
        },
        {
          title: "Customers",
          url: "/dashboard/customers",
          icon: Users,
        },
        {
          title: "Inventory",
          url: "/dashboard/inventory",
          icon: Package,
        },
      ],
    },
    {
      title: "Financial",
      items: [
        {
          title: "Billing",
          url: "/dashboard/billing",
          icon: Receipt,
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Store Settings",
          url: "/dashboard/settings",
          icon: Store,
        },
        {
          title: "Staff",
          url: "/dashboard/staff",
          icon: UserCheck,
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Store className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">VendorHub</h2>
            <p className="text-sm text-muted-foreground">My Store Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HelpCircle />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
