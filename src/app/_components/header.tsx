'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigationItems = [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'À propos',
      href: '/about',
    },
    {
      title: 'Réservation',
      href: '/check-in',
    },
    {
      title: 'Équipements',
      href: '/features',
    },
    {
      title: 'Environs',
      href: '/around',
    },
    {
      title: 'Photos',
      href: '/pictures',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isOpen, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-sm'
          : 'bg-slate-900'
      )}
    >
      <div className='container relative mx-auto flex h-20 items-center justify-between px-4'>
        <Link href="/" className="text-xl font-semibold text-white">
          TWBlocks
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex lg:items-center lg:gap-1'>
          {navigationItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Button
                variant="ghost"
                className="text-white/90 hover:bg-white/10 hover:text-white"
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <Link href='/contact'>
            <Button
              variant='ghost'
              className='hidden text-white/90 hover:bg-white/10 hover:text-white md:inline-flex'
            >
              Contact
            </Button>
          </Link>
          <div className='hidden h-6 border-r border-white/20 md:inline-block'></div>
          <div className='hidden gap-2 lg:flex'>
            <Link href='/signin'>
              <Button
                variant='ghost'
                className="text-white/90 hover:bg-white/10 hover:text-white"
              >
                Connexion
              </Button>
            </Link>
            <Link href='/signup'>
              <Button className="bg-white text-slate-900 hover:bg-white/90">
                S&apos;inscrire
              </Button>
            </Link>
          </div>

          <Button
            variant='ghost'
            className='lg:hidden text-white/90 hover:bg-white/10 hover:text-white'
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
