import { syncPlans } from '@/actions/sync-plans';
import { db } from '@packages/db';
import { Plan } from '@packages/db/schema';

export default async function BillingPage() {
  let allPlans = await db.select().from(Plan);

  if (!allPlans.length) {
    allPlans = await syncPlans();
  }

  return (
    <div>
      <h1>Billing</h1>
      <div>
        {allPlans.map((plan) => (
          <div key={plan.id}>{plan.name}</div>
        ))}
      </div>
    </div>
  );
}
