import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Refuges des Hauts',
  description:
    'Read our terms of service to understand the rules of using our website.',
};

const TermsOfService = () => {
  return (
    <main className='container mx-auto py-20 lg:py-40'>
      <h1 className='text-3xl font-bold'>Terms of Service</h1>

      <p className='mt-6'>
        Welcome to Refuges des Hauts. By accessing our website, you agree to
        comply with and be bound by the following terms and conditions of use.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>Use of the Site</h2>

      <p className='mt-6'>
        You agree to use the site only for lawful purposes and in a way that
        does not infringe the rights of, restrict, or inhibit anyone else's use
        and enjoyment of the site.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>Intellectual Property</h2>

      <p className='mt-6'>
        All content on this site, including text, graphics, logos, icons,
        images, and software, is the property of Refuges des Hauts or its
        content suppliers and is protected by international copyright laws.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>Limitation of Liability</h2>

      <p className='mt-6'>
        Refuges des Hauts will not be liable for any damages arising from the
        use of or inability to use the site or any content or services provided
        through the site.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>Changes to the Terms</h2>

      <p className='mt-6'>
        We may revise these terms of service at any time by amending this page.
        Please check this page from time to time to take notice of any changes
        we made, as they are binding on you.
      </p>

      <p className='mt-12'>Last updated: 2024-11-12</p>
    </main>
  );
};

export default TermsOfService;
