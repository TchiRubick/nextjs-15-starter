import { isValidUrl } from '@/lib/url';
import { pageOrphanGuard } from '@packages/auth/index';
import { SigninForm } from './signin-form';

const SigninPage = async ({
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
      <SigninForm callbackUrl={safeUrl} />
    </div>
  );
};

export default SigninPage;
