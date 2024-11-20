import { useSession } from '@/hooks/useSession';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutationAction } from '@packages/fetch-action/index';
import { formDataBuilder } from '@/lib/formdata-builder';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { userUpdate } from '@/actions/user.action';
import { useEffect } from 'react';

export function Profile() {
  const { data } = useSession();
  const { register, getValues, handleSubmit } = useForm();

  const { mutateAsync, error, isError } = useMutationAction(userUpdate);

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    }
  }, [isError, error?.message]);

  const onSubmit = async () => {
    const formData = formDataBuilder(getValues);

    await mutateAsync(data?.id as string, formData);
    window.location.replace('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-center pt-20 sm:pt-40'>
        <Card className=''>
          <h2 className='text-center text-2xl font-bold text-black'>
            Modifier votre profile{' '}
          </h2>
          <div className='flex flex-col sm:flex-row sm:gap-5'>
            <CardHeader className='self-center'>
              <CardTitle className='text-2xl'>
                <Label
                  htmlFor='imageavatar'
                  className='relative cursor-pointer hover:opacity-50'
                >
                  <Avatar className='h-40 w-40'>
                    <AvatarImage
                      src='/gallery/p.jpg'
                      width={500}
                      height={500}
                    />
                  </Avatar>
                  <Input id='imageavatar' className='hidden' type='file' />
                </Label>
              </CardTitle>
              <CardDescription className='self-center text-xl font-bold text-black'>
                {data?.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 sm:pt-10'>
                <div className='flex flex-row gap-2'>
                  <Label htmlFor='username' className='self-center'>
                    UserName:
                  </Label>
                  <Input
                    id='username'
                    placeholder='username'
                    required
                    defaultValue={data?.username}
                    {...register('username')}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex flex-row gap-2'>
                    <Label htmlFor='email' className='self-center'>
                      Email:
                    </Label>
                    <Input
                      id='email'
                      placeholder='email@gmail.com'
                      value={data?.email}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className='flex flex-row gap-2'>
                  <Label htmlFor='adresse' className='self-center'>
                    Adresse:
                  </Label>
                  <Input id='adresse' placeholder='adresse' />
                </div>
                <div className='flex flex-row gap-2'>
                  <Label htmlFor='telephone' className='self-center'>
                    Téléphone:
                  </Label>
                  <Input id='telephone' placeholder='telephone' />
                </div>
                <Button type='submit' className='w-full'>
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </form>
  );
}
