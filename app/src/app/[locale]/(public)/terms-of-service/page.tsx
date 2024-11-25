import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import { getScopedI18n } from '@/locales/server';

export const metadata: Metadata = {
  title: 'Terms of Service | Refuges des Hauts',
  description:
    'Read our terms of service to understand the rules of using our website.',
};

const TermsOfService = async () => {
  const [tTermsOfService, tTermsOfServiceDescription] = await Promise.all([
    getScopedI18n('termsOfService'),
    getScopedI18n('termsOfService.description'),
  ]);
  return (
    <Card className='mx-auto mt-10 w-5/6 border-none'>
      <CardHeader>
        <CardTitle className='font-regular text-center text-xl tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl xl:text-left'>
          {tTermsOfService('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mt-6'>{tTermsOfService('subtitle')}</p>

        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='mt-6'>
              <h2 className='mt-12 text-2xl font-bold'>
                {tTermsOfServiceDescription(
                  `${index}.title` as keyof typeof tTermsOfServiceDescription
                )}
              </h2>
              <p className='mt-6'>
                {tTermsOfServiceDescription(
                  `${index}.description` as keyof typeof tTermsOfServiceDescription
                )}
              </p>
            </div>
          ))}
        <p className='mt-12'>{tTermsOfService('lastUpdated')}</p>
      </CardContent>
    </Card>
  );
};

export default TermsOfService;
