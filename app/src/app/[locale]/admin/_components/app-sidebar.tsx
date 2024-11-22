import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Store, CalendarRange, Target, WashingMachine } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    title: 'Store',
    url: '/',
    icon: Store,
  },
  {
    title: 'Booking',
    url: '/admin/schedules',
    icon: CalendarRange,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Target,
  },
  {
    title: 'Amenities',
    url: '/admin/amenities',
    icon: WashingMachine,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger className='z-10' />
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} prefetch>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
