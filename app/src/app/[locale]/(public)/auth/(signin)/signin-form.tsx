'use client';

import { loginMutation } from '@/actions/auth.action';
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
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { formDataBuilder } from '@/lib/formdata-builder';
import { useScopedI18n } from '@/locales/client';
import { useMutationAction } from '@packages/fetch-action/index';

export const SigninForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const { register, getValues, handleSubmit } = useForm();
  const tAuth = useScopedI18n('auth');

  const { mutateAsync, isPending, error, isError } =
    useMutationAction(loginMutation);

  if (isError) {
    toast({
      variant: 'destructive',
      title: tAuth('error'),
      description: error?.message,
    });
  }

  const onSubmit = async () => {
    const formData = formDataBuilder(getValues);

    await mutateAsync(formData);
    console.log(callbackUrl);
    window.location.replace(callbackUrl ?? '/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>{tAuth('login')}</CardTitle>
          <CardDescription>{tAuth('loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{tAuth('emailOrUsername')}</Label>
              <Input
                {...register('identifier')}
                id='identifier'
                placeholder='m@example.com'
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{tAuth('password')}</Label>
                <Link
                  href='forgotpassword'
                  className='ml-auto inline-block text-sm underline'
                >
                  {tAuth('forgotPassword')}
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
              {isPending ? (
                <Loader2 className='mr-2 animate-spin' />
              ) : (
                tAuth('login')
              )}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            {tAuth('signUpPrompt')}
            <Link href={`/auth/signup?callbackUrl=${callbackUrl}`}>
              {tAuth('signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
