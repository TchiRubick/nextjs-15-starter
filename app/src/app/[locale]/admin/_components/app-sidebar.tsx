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
import {
  Store,
  CalendarRange,
  WashingMachine,
  House,
  HousePlus,
} from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    title: 'Magasin',
    url: '/',
    icon: Store,
  },
  {
    title: 'Réservations',
    url: '/admin/schedules',
    icon: CalendarRange,
  },
  {
    title: 'Mes chalets',
    url: '/admin/products',
    icon: House,
  },
  {
    title: 'Creer un chalet',
    url: '/admin/products/create',
    icon: HousePlus,
  },
  {
    title: 'Equipements',
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
