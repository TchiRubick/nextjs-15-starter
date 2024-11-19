'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function PropertySidebar() {
  return (
    <Card className='sticky top-24 p-6'>
      <div className='space-y-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='w-full' size='lg'>
              <Calendar className='mr-2 h-4 w-4' />
              Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a Viewing</DialogTitle>
            </DialogHeader>
            <div className='p-4'>
              <p>Booking form implementation coming soon...</p>
            </div>
          </DialogContent>
        </Dialog>

        <Separator />

        <Link href='/contact'>
          <Button variant='outline' className='w-full' size='lg'>
            <MessageSquare className='mr-2 h-4 w-4' />
            Contact
          </Button>
        </Link>
      </div>
    </Card>
  );
}
