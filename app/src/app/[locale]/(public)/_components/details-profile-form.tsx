import { userUpdate } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';
import { useScopedI18n } from '@/locales/client';
import { UpdateUser } from '@packages/db/models/user';
import { useMutationAction } from '@packages/fetch-action/index';
import { useForm } from 'react-hook-form';

export const DetailsProfileForm = ({
  forceClose,
}: {
  forceClose?: () => void;
}) => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm<UpdateUser>();
  const tDetailsProfile = useScopedI18n('detailsProfile');

  const { mutateAsync } = useMutationAction(userUpdate, {
    onSuccess: () => {
      toast({
        variant: 'default',
        title: tDetailsProfile('successTitle'),
        description: tDetailsProfile('successDescription'),
      });
      if (forceClose) {
        forceClose();
      }
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: tDetailsProfile('errorTitle'),
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
            {tDetailsProfile('usernameLabel')}
          </Label>
          <Input
            id='username'
            placeholder={tDetailsProfile('usernamePlaceholder')}
            className='col-span-3'
            required
            defaultValue={data?.username}
            {...register('username')}
          />
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='email' className='self-center'>
            {tDetailsProfile('emailLabel')}
          </Label>
          <Input
            id='email'
            placeholder={tDetailsProfile('emailPlaceholder')}
            className='col-span-3'
            value={data?.email}
            readOnly
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='telephone' className='self-center'>
            {tDetailsProfile('phoneLabel')}
          </Label>
          <Input
            id='telephone'
            placeholder={tDetailsProfile('phonePlaceholder')}
            defaultValue={data?.phone ?? ''}
            className='col-span-3'
            {...register('phone')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='adresse' className='self-center'>
            {tDetailsProfile('addressLabel')}
          </Label>
          <Input
            id='adresse'
            placeholder={tDetailsProfile('addressPlaceholder')}
            defaultValue={data?.address ?? ''}
            className='col-span-3'
            {...register('address')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='country' className='self-center'>
            {tDetailsProfile('countryLabel')}
          </Label>
          <Input
            id='country'
            placeholder={tDetailsProfile('countryPlaceholder')}
            defaultValue={data?.country ?? ''}
            className='col-span-3'
            {...register('country')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='city' className='self-center'>
            {tDetailsProfile('cityLabel')}
          </Label>
          <Input
            id='city'
            placeholder={tDetailsProfile('cityPlaceholder')}
            defaultValue={data?.city ?? ''}
            className='col-span-3'
            {...register('city')}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='zipCode' className='self-center'>
            {tDetailsProfile('zipCodeLabel')}
          </Label>
          <Input
            id='zipCode'
            placeholder={tDetailsProfile('zipCodePlaceholder')}
            defaultValue={data?.zipCode ?? ''}
            className='col-span-3'
            {...register('zipCode')}
          />
        </div>
        <Button type='submit' className='w-full'>
          {tDetailsProfile('saveButton')}
        </Button>
      </div>
    </form>
  );
};
