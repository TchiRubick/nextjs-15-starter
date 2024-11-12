'use client';

import { logout } from '@/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigationItems = [
  {
    title: 'Products',
    href: '/admin/products',
  },
  {
    title: 'Amenities',
    href: '/admin/amenities',
  }
];

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  const { data, isFetching } = useSession();

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
    await logout();
    window.location.reload();
  };

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-40 w-full transition-all duration-300',
        isScrolled ? 'bg-slate-900/90 backdrop-blur-sm' : 'bg-slate-900'
      )}
    >
      <div className='container relative mx-auto flex h-20 items-center justify-between px-4'>
        <Link href='/admin/products' className='text-xl font-semibold text-white'>
          Admin
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex lg:items-center lg:gap-1'>
          {navigationItems.map((item) => (
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
          <div className='hidden gap-2 lg:flex'>
            {data && !isFetching && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    {data.image && <AvatarImage src={data.image} />}
                    <AvatarFallback>
                      {data.username && data.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Label>Profil</Label>
                  </DropdownMenuLabel>
                  {data.role === 'admin' && (
                    <DropdownMenuItem>
                      <Link href='/admin/products'>Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Label
                      onClick={handleLogout}
                      className='bg-white text-slate-900 hover:bg-white/90 cursor-pointer'
                    >
                      Logout
                    </Label>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!data && !isFetching && (
              <div>
                <Link href='/auth' prefetch>
                  <Button
                    variant='ghost'
                    className='text-white/90 hover:bg-white/10 hover:text-white'
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href='/auth/signup' prefetch>
                  <Button className='bg-white text-slate-900 hover:bg-white/90'>
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            )}
            {isFetching && <div className='h-6 w-6 rounded-full bg-white/10 animate-pulse'></div>}
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
              {navigationItems.map((item) => (
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
