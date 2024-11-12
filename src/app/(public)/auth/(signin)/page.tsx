import { pageOrphanGuard } from '@packages/auth/index';
import { SigninForm } from './signin-form';

// TODO: use pageOrphanGuard to prevent a connected user from accessing this page

const SigninPage = async () => {
  await pageOrphanGuard();
  return <SigninForm />;
};

export default SigninPage;
