import { pageOrphanGuard } from '@packages/auth/index';
import { SignupForm } from './signup-form';

// TODO: use pageOrphanGuard to prevent a connected user from accessing this page

const SignupPage = async () => {
  await pageOrphanGuard();
  return <SignupForm />;
};

export default SignupPage;
