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

export function Profile() {
  const { data } = useSession();
  const { register, getValues, handleSubmit } = useForm();

  const { mutateAsync, error, isError } = useMutationAction(userUpdate);

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error?.message,
    });
  }

  const onSubmit = async () => {
    const formData = formDataBuilder(getValues);

    await mutateAsync(data?.id as string, formData);
    window.location.replace('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-center pt-20 sm:pt-40'>
        <Card className='flex flex-col sm:flex-row sm:gap-5'>
          <CardHeader className='self-center'>
            <CardTitle className='text-2xl'>
              <Avatar className='h-40 w-40'>
                <AvatarImage src='/gallery/p.jpg' width={500} height={500} />
              </Avatar>
            </CardTitle>
            <CardDescription className='self-center'>
              Usernameexemple
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 sm:pt-10'>
              <div className='flex flex-row gap-2'>
                <Label htmlFor='email' className='self-center'>
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
                    id='username'
                    placeholder='email@gmail.com'
                    value={data?.email}
                    required
                    disabled
                  />
                </div>
              </div>
              <Button type='submit' className='w-full'>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
