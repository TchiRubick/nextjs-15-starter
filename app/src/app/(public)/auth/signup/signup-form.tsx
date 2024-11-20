'use client';

import { registerMutation } from '@/actions/auth.action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { SignupInput } from '@packages/auth/src/actions/types';
import { useMutationAction } from '@packages/fetch-action/index';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export const SignupForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const { register: namedRegister, handleSubmit } = useForm<SignupInput>();

  const { mutateAsync, isPending } = useMutationAction(registerMutation, {
    onSuccess() {
      window.location.replace(callbackUrl ?? '/');
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    },
  });

  const onSubmit = async (data: SignupInput) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>
            Enter your username, email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='mt-3 grid gap-2'>
                <Label htmlFor='user'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='user'
                  required
                  {...namedRegister('username')}
                />
              </div>
              <div className='mt-3 grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  {...namedRegister('email')}
                />
              </div>
              <div className='mt-3 grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  {...namedRegister('password')}
                />
              </div>
            </div>
            <div>
              <div className='mt-3 grid gap-2'>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  type='text'
                  placeholder='Address'
                  {...namedRegister('address')}
                />
              </div>
              <div className='mt-3 grid gap-2'>
                <Label htmlFor='phone'>Numero du telephone</Label>
                <Input
                  id='phone'
                  {...namedRegister('phone')}
                  type='tel'
                  placeholder='+33 6 00 00 00 00'
                />
              </div>
              <div className='mt-3 grid gap-2'>
                <Label htmlFor='zipCode'>Code postal</Label>
                <Input
                  id='zipCode'
                  type='text'
                  placeholder='75001'
                  {...namedRegister('zipCode')}
                />
              </div>
            </div>
          </div>
          <div className='mt-3 grid gap-2'>
            <Label htmlFor='city'>Ville</Label>
            <Input
              id='city'
              type='text'
              placeholder='Paris'
              {...namedRegister('city')}
            />
          </div>
          <div className='mt-3 grid gap-2'>
            <Label htmlFor='country'>Pays</Label>
            <Input
              id='country'
              type='text'
              placeholder='France'
              {...namedRegister('country')}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? <Loader2 className='animate-spin' /> : 'Sign up'}
          </Button>
          <CardFooter className='mt-4 text-center text-sm'>
            Have you already an account?{' '}
            <Link
              prefetch
              href={`/auth?callbackUrl=${callbackUrl}`}
              className='text-blue-500'
            >
              Signin
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
};
