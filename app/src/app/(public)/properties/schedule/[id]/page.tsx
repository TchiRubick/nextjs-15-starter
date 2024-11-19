'use server';

import { getProductQuery } from '@/actions/product.action';
import { TODAY, TOMORROW } from '@/lib/date';
import { isAuth } from '@packages/auth/index';
import { redirect } from 'next/navigation';
import qs from 'query-string';
import { ScheduleForm } from './_components/schedule-form';

const SchedulePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    check_in?: string;
    check_out?: string;
  }>;
}) => {
  const session = await isAuth();

  const { id } = await params;

  const urlParameters = await searchParams;

  const formValues = {
    check_in: urlParameters.check_in ? new Date(urlParameters.check_in) : TODAY,
    check_out: urlParameters.check_out
      ? new Date(urlParameters.check_out)
      : TOMORROW,
  };

  const propertyId = Number(id);

  if (isNaN(propertyId)) {
    redirect('/properties');
  }

  const property = await getProductQuery(propertyId);

  if (!session.user) {
    redirect(
      `/auth?callbackUrl=/properties/schedule/${propertyId}?${qs.stringify(urlParameters)}`
    );
  }

  if (!property) {
    redirect(`/properties`);
  }

  return (
    <main className='min-h-screen bg-background'>
      <ScheduleForm id={propertyId} formValues={formValues} />
    </main>
  );
};

export default SchedulePage;
