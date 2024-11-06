'use client';

import { HTMLAttributes, useState } from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerWithRangeProps {
  value?: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  className,
  value,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>(value);

  const today = new Date();

  const handleDateChange = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to && !isSameDay(newDate.from, newDate.to)) {
      setDate(newDate);
      onDateRangeChange(newDate);
      console.log(
        `Selected range: ${format(newDate.from, 'LLL dd, y')} - ${format(newDate.to, 'LLL dd, y')}`
      );
    } else if (
      newDate?.from &&
      newDate?.to &&
      isSameDay(newDate.from, newDate.to)
    ) {
      console.log(
        'The start and end dates must be different. Please select a valid range.'
      );
    } else {
      console.log('Please select both start and end dates.');
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={{ before: today }}
            fromMonth={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
