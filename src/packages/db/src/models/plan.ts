import { db } from '@packages/db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { Plan } from '../schema';

export const zSelectPLan = createSelectSchema(Plan);

export const zInsertPLan = createInsertSchema(Plan);

export type PlanSelect = z.infer<typeof zSelectPLan>;

export type PlanInsert = z.infer<typeof zInsertPLan>;

export const createPlan = async (input: PlanInsert) =>
  db
    .insert(Plan)
    .values(input)
    .onConflictDoUpdate({ target: Plan.variantId, set: input });

export const getPlans = async () => db.select().from(Plan);
