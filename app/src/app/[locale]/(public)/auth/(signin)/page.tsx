import { pageOrphanGuard } from '@packages/auth/index';
import { SigninForm } from './signin-form';

const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  await pageOrphanGuard();

  const urlParameters = await searchParams;

  return (
    <div className='flex justify-center pt-28'>
      <SigninForm callbackUrl={urlParameters.callbackUrl} />
    </div>
  );
};

export default SigninPage;
