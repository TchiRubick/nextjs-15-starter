import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import { getScopedI18n } from '@/locales/server';

export const metadata: Metadata = {
  title: 'Privacy Policy | Refuges des Hauts',
  description:
    'Read our privacy policy to understand the rules of using our website.',
};

const PrivacyPolicy = async () => {
  const [tPrivacyPolicy, tPrivacyPolicyDescription] = await Promise.all([
    getScopedI18n('privacyPolicy'),
    getScopedI18n('privacyPolicy.description'),
  ]);

  return (
    <Card className='mx-auto mt-10 w-5/6 border-none'>
      <CardHeader>
        <CardTitle className='font-regular text-center text-xl tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl xl:text-left'>
          {tPrivacyPolicy('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{tPrivacyPolicy('subtitle')}</p>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <h2 className='mt-12 text-2xl font-bold'>
                {tPrivacyPolicyDescription(
                  `${index}.title` as keyof typeof tPrivacyPolicyDescription
                )}
              </h2>
              <p className='mt-6'>
                {tPrivacyPolicyDescription(
                  `${index}.description` as keyof typeof tPrivacyPolicyDescription
                )}
              </p>
            </div>
          ))}
        <p className='mt-12'>{tPrivacyPolicy('lastUpdated')}</p>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;
