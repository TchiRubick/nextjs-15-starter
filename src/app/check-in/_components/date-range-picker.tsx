'use client';

import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale
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

interface DateRangePickerProps {
  value: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;
  className?: string;
}

const today = new Date();

export function DateRangePicker({
  className,
  value,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(value);

  const handleDateChange = (newDate: DateRange | undefined) => {
    if (date?.from && newDate?.from) {
      const updatedDate = {
        from: date.from,
        to: newDate.to,
      };

      if (updatedDate.to && !isSameDay(updatedDate.from, updatedDate.to)) {
        setDate(updatedDate);
        onDateRangeChange(updatedDate);
      } else if (
        updatedDate.to &&
        isSameDay(updatedDate.from, updatedDate.to)
      ) {
        console.log(
          'Les dates de début et de fin doivent être différentes.'
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
            variant="ghost"
            className={cn(
              'h-12 w-full justify-start bg-white/10 px-3 font-normal hover:bg-white/20',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-white/70" />
            {date?.from ? (
              date.to ? (
                <span className="text-white">
                  {format(date.from, 'dd MMM yyyy', { locale: fr })} - {' '}
                  {format(date.to, 'dd MMM yyyy', { locale: fr })}
                </span>
              ) : (
                format(date.from, 'dd MMM yyyy', { locale: fr })
              )
            ) : (
              <span className="text-white/70">Sélectionnez vos dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          sideOffset={8}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={{
              before: today,
            }}
            fromMonth={today}
            locale={fr}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-slate-100 text-slate-900",
              day_outside: "text-slate-500 opacity-50",
              day_disabled: "text-slate-500 opacity-50",
              day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
