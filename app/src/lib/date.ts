import { addDays, toDate } from 'date-fns';

export const TODAY = toDate(new Date());
export const TOMORROW = addDays(TODAY, 1);
