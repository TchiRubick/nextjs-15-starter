import Link from 'next/link';

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
import { signup } from '@packages/auth/src';
import { useForm } from 'react-hook-form';
import { SignupInput } from '@packages/auth/src';

export const SignupForm = async () => {
  const { register, getValues } = useForm<SignupInput>();

  const registert = await signup({
    username: getValues('username'),
    email: getValues('email'),
    password: getValues('password'),
  });

  return (
    <form action={registert}>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>
            Enter your username, email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Username</Label>
              <Input
                id='user'
                type='text'
                placeholder='user'
                required
                {...register('username')}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                {...register('email')}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                id='password'
                type='password'
                required
                {...register('password')}
              />
            </div>
            <Button type='submit' className='w-full'>
              Sign up
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Have you already an account?{' '}
            <Link href='/auth' className='underline'>
              Signin
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
