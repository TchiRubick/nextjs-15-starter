import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Refuges des Hauts',
  description:
    'Learn more about our privacy policy and how we handle your personal data.',
};

const PrivacyPolicy = () => {
  return (
    <main className='container mx-auto py-20 lg:py-40'>
      <h1 className='text-3xl font-bold'>Privacy Policy</h1>

      <p className='mt-6'>
        At Next Real Estate, we respect your privacy and are committed to
        protecting it through our compliance with this policy.
      </p>

      <p className='mt-6'>
        This policy describes the types of information we may collect from you
        or that you may provide when you visit the website{' '}
        <a href='https://next-realestate.vercel.app/'>
          https://next-realestate.vercel.app/
        </a>{' '}
        (our &quot;Website&quot;) and our practices for collecting, using,
        maintaining, protecting, and disclosing that information.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>
        What information do we collect?
      </h2>

      <p className='mt-6'>
        We collect information from you when you fill out a form on our Website,
        such as when you sign up for our newsletter or contact us through our
        contact form.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>
        How do we use your information?
      </h2>

      <p className='mt-6'>
        We use information in the aggregate to understand how our Users as a
        group use the services and resources provided on our Website. We also
        use the information you provide about yourself when requesting a
        newsletter or contacting us through our contact form to respond to your
        request or to contact you about your request.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>
        How do we protect your information?
      </h2>

      <p className='mt-6'>
        We take appropriate security measures to protect against unauthorized
        access to or unauthorized alteration, disclosure or destruction of data.
        These include internal reviews of our data collection, storage and
        processing practices and security measures, as well as physical security
        measures to guard against unauthorized access to systems where we store
        personal data.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>
        Do we disclose any information to outside parties?
      </h2>

      <p className='mt-6'>
        We do not sell, trade, or rent Users personal identification information
        to others. We may share generic aggregated demographic information not
        linked to any personal identification information regarding visitors and
        users with our business partners, trusted affiliates and advertisers for
        the purposes outlined above.
      </p>

      <h2 className='mt-12 text-2xl font-bold'>
        Changes to this privacy policy
      </h2>

      <p className='mt-6'>
        Next Real Estate has the discretion to update this privacy policy at any
        time. When we do, we will revise the updated date at the bottom of this
        page. We encourage Users to frequently check this page for any changes
        to stay informed about how we are helping to protect the personal
        information we collect. You acknowledge and agree that it is your
        responsibility to review this privacy policy periodically and become
        aware of modifications.
      </p>

      <p className='mt-12'>
        By using this Website, you signify your acceptance of this policy. If
        you do not agree to this policy, please do not use our Website. Your
        continued use of the Website following the posting of changes to this
        policy will be deemed your acceptance of those changes.
      </p>

      <p className='mt-12'>Last updated: 2024-11-12</p>
    </main>
  );
};

export default PrivacyPolicy;
