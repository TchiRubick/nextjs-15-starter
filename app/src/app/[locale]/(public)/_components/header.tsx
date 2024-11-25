'use client';

import { logoutMutation } from '@/actions/auth.action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';
import { LogOut, Menu, ShieldCheck, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { DetailsProfileForm } from './details-profile-form';
import { LanguagePicker } from './languages-picker';
import { ReservationRecap } from './reservation-recap';

export const Header = () => {
  const tHeader = useScopedI18n('header');

  const navigationItems = [
    {
      title: tHeader('home'),
      href: '/',
    },

    {
      title: tHeader('reservations'),
      href: '/properties',
    },
    {
      title: tHeader('gallery'),
      href: '/pictures',
    },
    {
      title: tHeader('about'),
      href: '/about',
    },
    {
      title: tHeader('contact'),
      href: '/contact',
      mobile_only: true,
    },
    {
      title: tHeader('login'),
      href: '/auth',
      mobile_only: true,
    },
    {
      title: tHeader('signup'),
      href: '/auth/signup',
      mobile_only: true,
    },
  ];

  const desktopItems = navigationItems.filter((item) => !item.mobile_only);

  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const { data, isFetching } = useSession();

  const mobileMenuItems = useMemo(() => {
    if (data) {
      return navigationItems.filter(
        (tab) => tab.href !== '/auth' && tab.href !== '/auth/signup'
      );
    }
    return navigationItems;
  }, [data, navigationItems]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getClassName = (path: string) =>
    cn('text-white/90 hover:text-white', {
      'border-b-2 text-white': pathname === path,
    });

  const handleLogout = async () => {
    await logoutMutation();
    window.location.reload();
  };

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-40 w-full transition-all duration-300',
        isScrolled ? 'bg-emerald-950/60 backdrop-blur-sm' : 'bg-emerald-950/90'
      )}
    >
      <div className='container relative mx-auto flex h-20 items-center justify-between px-4'>
        <Link href='/' className='text-xl font-semibold text-white'>
          {tHeader('siteTitle')}
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex lg:items-center lg:gap-1'>
          {desktopItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={getClassName(item.href)}
              prefetch
            >
              <Button
                variant='ghost'
                className='text-white/90 hover:bg-white/10 hover:text-white'
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <Link href='/contact' prefetch>
            <Button
              variant='ghost'
              className='hidden text-white/90 hover:bg-white/10 hover:text-white md:inline-flex'
            >
              {tHeader('contact')}
            </Button>
          </Link>
          <div className='hidden h-6 border-r border-white/20 md:inline-block'></div>
          <div className='flex items-center gap-2'>
            {data && !isFetching && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='h-8 w-8 cursor-pointer'>
                    {data.image && <AvatarImage src={data.image} />}
                    <AvatarFallback>
                      {data.username && data.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild className='w-full'>
                      <Label className='flex h-7 cursor-pointer items-center gap-2 pl-1 hover:bg-slate-100'>
                        <User className='h-5 w-5' />
                        {tHeader('profile')}
                      </Label>
                    </SheetTrigger>
                    <SheetContent>
                      <ScrollArea className='h-full w-full overflow-hidden'>
                        <SheetHeader>
                          <SheetTitle>{tHeader('editProfile')}</SheetTitle>
                          <SheetDescription>
                            {tHeader('editProfileDescription')}
                          </SheetDescription>
                        </SheetHeader>
                        <DetailsProfileForm
                          forceClose={() => setSheetOpen(false)}
                        />
                        <div>
                          <SheetTitle>{tHeader('reservationRecap')}</SheetTitle>
                          <SheetDescription>
                            {tHeader('reservationRecapDescription')}
                          </SheetDescription>
                          <ReservationRecap />
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                  <Separator />
                  {data.role === 'admin' && (
                    <Link prefetch href='/admin/products'>
                      <DropdownMenuItem className='cursor-pointer'>
                        <ShieldCheck className='h-6 w-6' />
                        {tHeader('admin')}
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Separator />
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={handleLogout}
                  >
                    <LogOut className='h-6 w-6' />
                    <Label className='cursor-pointer bg-white text-slate-900 hover:bg-white/90'>
                      {tHeader('logout')}
                    </Label>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!data && !isFetching && (
              <div className='hidden lg:block'>
                <Link href='/auth' prefetch>
                  <Button
                    variant='ghost'
                    className='text-white/90 hover:bg-white/10 hover:text-white'
                  >
                    {tHeader('login')}
                  </Button>
                </Link>
                <Link href='/auth/signup' prefetch>
                  <Button className='bg-white text-slate-900 hover:bg-white/90'>
                    {tHeader('signup')}
                  </Button>
                </Link>
              </div>
            )}
            {isFetching && (
              <div className='h-6 w-6 animate-pulse rounded-full bg-white/10'></div>
            )}
            <LanguagePicker />
          </div>

          <Button
            variant='ghost'
            className='text-white/90 hover:bg-white/10 hover:text-white lg:hidden'
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className='absolute right-0 top-20 w-full bg-slate-900 p-4 lg:hidden'>
            <nav className='flex flex-col gap-4'>
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className='text-lg text-white/90 hover:text-white'
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};
