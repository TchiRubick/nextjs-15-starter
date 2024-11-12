'use client';

import { login } from '@/actions/auth';
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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { useMutationAction } from '@packages/fetch-action/index';

export const SigninForm = () => {
  const { toast } = useToast();
  const { register, getValues, handleSubmit } = useForm();

  const { mutateAsync, isPending, error } = useMutationAction(login);

  const onSubmit = async () => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }

    const formData = getValues();
    const formDataObject = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObject.append(key, formData[key]);
    });

    await mutateAsync(formDataObject);
    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email or username</Label>
              <Input
                {...register('identifier')}
                id='identifier'
                placeholder='m@example.com'
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='forgotpassword'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register('password')}
                id='password'
                type='password'
                placeholder='password'
              />
            </div>

            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? <Loader2 className='mr-2 animate-spin' /> : 'Login'}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/auth/signup' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
