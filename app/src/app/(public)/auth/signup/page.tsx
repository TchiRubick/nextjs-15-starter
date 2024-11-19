import { isValidUrl } from '@/lib/url';
import { pageOrphanGuard } from '@packages/auth/index';
import { SignupForm } from './signup-form';

const SignupPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  await pageOrphanGuard();

  const urlParameters = await searchParams;

  const safeUrl = isValidUrl(urlParameters.callbackUrl)
    ? urlParameters.callbackUrl
    : undefined;

  return (
    <div className='flex justify-center pt-28'>
      <SignupForm callbackUrl={safeUrl} />
    </div>
  );
};

export default SignupPage;
