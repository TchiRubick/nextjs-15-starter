'use client';

import { register } from '@/actions/auth.action';
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
import { toast } from '@/hooks/use-toast';
import { formDataBuilder } from '@/lib/formdata-builder';
import { useMutationAction } from '@packages/fetch-action/index';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export const SignupForm = () => {
  const { register: namedRegister, getValues, handleSubmit } = useForm();

  const { mutateAsync, isPending, error, isError } =
    useMutationAction(register);

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error?.message,
    });
  }

  const onSubmit = async () => {
    const formData = formDataBuilder(getValues);

    await mutateAsync(formData);
    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <Label htmlFor='user'>Username</Label>
              <Input
                id='username'
                type='text'
                placeholder='user'
                required
                {...namedRegister('username')}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                {...namedRegister('email')}
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
                {...namedRegister('password')}
              />
            </div>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? <Loader2 className='animate-spin' /> : 'Sign up'}
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
