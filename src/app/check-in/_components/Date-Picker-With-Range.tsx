'use client';

import { format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerWithRangeProps {
  value: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  className,
  value,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>(value);
  const [count, setCount] = useState<0 | 1>(0);

  const today = new Date();
  const handleDateChange = (newDate: DateRange | undefined) => {
    if (date?.from && newDate?.from) {
      const updatedDate = {
        from: date.from,
        to: newDate.to
      };

      if (updatedDate.to && !isSameDay(updatedDate.from, updatedDate.to)) {
        setDate(updatedDate);
        onDateRangeChange(updatedDate);
      } else if (updatedDate.to && isSameDay(updatedDate.from, updatedDate.to)) {
        console.log(
          'The start and end dates must be different. Please select a valid range.'
        );
      }
    } else {
      setDate(newDate);
      onDateRangeChange(newDate);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
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
            disabled={{
              before: today,
            }}
            fromMonth={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
