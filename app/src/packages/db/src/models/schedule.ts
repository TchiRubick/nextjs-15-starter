import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../..';
import { Schedule } from '../schema';
import { zSelectProduct } from './products';
import { zSelectUser } from './user';

// ============================================================================
// Schemas
// ============================================================================
export const zInsertSchedule = createInsertSchema(Schedule, {
  startDate: z.date(),
  endDate: z.date(),
  userId: zSelectUser.shape.id,
  productId: zSelectProduct.shape.id,
});

export const zSelectSchedule = createSelectSchema(Schedule);

export const zUpdateSchedule = zInsertSchedule.pick({
  startDate: true,
  endDate: true,
  userId: true,
  productId: true,
});

export const schedules = zInsertSchedule.shape;

// ============================================================================
// Types
// ============================================================================
export type InsertSchedule = z.infer<typeof zInsertSchedule>;
export type UpdateSchedule = z.infer<typeof zUpdateSchedule>;
export type ScheduleSelect = z.infer<typeof zSelectSchedule>;

// ============================================================================
// Queries
// ============================================================================
export const getSchedules = async () => db.query.Schedule.findMany();

export const createSchedule = async (input: InsertSchedule) =>
  db.insert(Schedule).values(input).returning();

export const deleteSchedule = async (id: number) =>
  db.delete(Schedule).where(eq(Schedule.id, id)).returning();

export const getProductAvailability = async (
  id: number,
  start: Date,
  end: Date
) => {
  const schedules = await db.query.Schedule.findMany({
    where: (schedule, { eq, and, gt, lt }) =>
      and(
        eq(schedule.productId, id),
        gt(schedule.endDate, start),
        lt(schedule.startDate, end)
      ),
  });

  return schedules.length === 0;
};
