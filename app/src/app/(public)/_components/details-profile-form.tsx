import { useSession } from '@/hooks/useSession';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutationAction } from '@packages/fetch-action/index';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userUpdate } from '@/actions/user.action';
import { UpdateUser } from '@packages/db/models/user';

export const DetailsProfileForm = ({
  forceClose,
}: {
  forceClose?: () => void;
}) => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm<UpdateUser>();

  const { mutateAsync } = useMutationAction(userUpdate, {
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Profile updated successfully',
      });
      forceClose && forceClose();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    },
  });

  const onSubmit = async (data: UpdateUser) => {
    await mutateAsync(data);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='username' className='self-center'>
            UserName:
          </Label>
          <Input
            id='username'
            placeholder='username'
            className='col-span-3'
            required
            defaultValue={data?.username}
            {...register('username')}
          />
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='email' className='self-center'>
            Email:
          </Label>
          <Input
            id='email'
            placeholder='email@gmail.com'
            className='col-span-3'
            value={data?.email}
            readOnly
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='telephone' className='self-center'>
            Téléphone:
          </Label>
          <Input
            id='telephone'
            placeholder='telephone'
            defaultValue={data?.phone ?? ''}
            className='col-span-3'
            {...register('phone')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='adresse' className='self-center'>
            Adresse:
          </Label>
          <Input
            id='adresse'
            placeholder='adresse'
            defaultValue={data?.address ?? ''}
            className='col-span-3'
            {...register('address')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='country' className='self-center'>
            Pays:
          </Label>
          <Input
            id='country'
            placeholder='Pays'
            defaultValue={data?.country ?? ''}
            className='col-span-3'
            {...register('country')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='city' className='self-center'>
            Ville:
          </Label>
          <Input
            id='city'
            placeholder='Paris'
            defaultValue={data?.city ?? ''}
            className='col-span-3'
            {...register('city')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='zipCode' className='self-center'>
            Code postal:
          </Label>
          <Input
            id='zipCode'
            placeholder='75001'
            defaultValue={data?.zipCode ?? ''}
            className='col-span-3'
            {...register('zipCode')}
          />
        </div>
        <Button type='submit' className='w-full'>
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
