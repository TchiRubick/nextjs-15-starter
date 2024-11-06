'use client';
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

import { useMutationAction } from '@packages/fetch-action/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signinSchema = z.object({
  identifier: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
});

type SigninInput = z.infer<typeof signinSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  // Using useMutationAction with signin

  const onSubmit = (data: SigninInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('identifier')}
                id='identifier'
                placeholder='m@example.com'
                required
              />
              {errors.identifier && (
                <p className='text-red-500'>{errors.identifier.message}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='#'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register('password')}
                id='password'
                type='password'
                required
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='#' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
