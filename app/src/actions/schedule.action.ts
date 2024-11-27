'use server';

import {
  deleteSchedule,
  getScheduleByUserId,
  getSchedules,
  ScheduleStatus,
  updateScheduleStatus,
} from '@packages/db/models/schedule';

export const getSchedulesQuery = async () => {
  const schedules = await getSchedules();

  return schedules;
};

export const updateScheduleStatusMutation = async (
  id: number,
  status: ScheduleStatus
) => {
  const [schedule] = await updateScheduleStatus(id, status);

  return schedule;
};

export const getScheduleByUserIdQuery = async (userId: string) => {
  try {
    return await getScheduleByUserId(userId);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteScheduleByUserIdMutation = async (scheduleId: number) => {
  const schedules = await deleteSchedule(scheduleId);

  return schedules;
};
