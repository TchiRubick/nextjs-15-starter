import { pageOrphanGuard } from '@packages/auth/index';
import { SigninForm } from './signin-form';

const SigninPage = async () => {
  // await pageOrphanGuard();
  return (
    <div className='flex justify-center pt-28'>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
