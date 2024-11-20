'use server';

import {
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
