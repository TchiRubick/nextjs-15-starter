'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';

export function Forgotpassword() {
  const tForgotPassword = useScopedI18n('forgotPassword');

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{tForgotPassword('title')}</CardTitle>
        <CardDescription>{tForgotPassword('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>{tForgotPassword('label')}</Label>
            <Input id='identifier' placeholder='m@example.com' required />
          </div>

          <Button type='submit' className='w-full'>
            {tForgotPassword('button')}
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          <Link href='/auth/signup' className='underline'>
            {tForgotPassword('backToSignIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
