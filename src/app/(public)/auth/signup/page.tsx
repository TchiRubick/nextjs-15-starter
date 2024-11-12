import { pageOrphanGuard } from '@packages/auth/index';
import { SignupForm } from './signup-form';

const SignupPage = async () => {
  await pageOrphanGuard();
  return (
    <div className='flex justify-center pt-28'>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
