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
import Link from 'next/link';

export function Forgotpassword() {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email or username</Label>
            <Input id='identifier' placeholder='m@example.com' required />
          </div>

          <Button type='submit' className='w-full'>
            Reset password
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          <Link href='/auth/signup' className='underline'>
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
