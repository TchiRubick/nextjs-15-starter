import { pageOrphanGuard } from '@packages/auth/index';
import { SignupForm } from './signup-form';

const SignupPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  await pageOrphanGuard();

  const urlParameters = await searchParams;

  return (
    <div className='flex justify-center pt-28'>
      <SignupForm callbackUrl={urlParameters.callbackUrl} />
    </div>
  );
};

export default SignupPage;
