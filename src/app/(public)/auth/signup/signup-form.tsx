import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/actions/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutationAction } from '@packages/fetch-action/index';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const SignupForm = () => {
  const { register: namedRegister, getValues, handleSubmit } = useForm();

  const { mutateAsync, isPending, error, isError } =
    useMutationAction(register);
  const onSubmit = async () => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
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
