import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { Label } from './ui/label';

type itemsProps = {
    id: string;
    title: string;
    value?: DateRange;
    placeholder: string;
    onSelect: (value: DateRange | undefined) => void;
    errors?: string;
    modal?: boolean;
};

export default function FormDateRangePicker({ id, title, value, errors, placeholder, onSelect, modal = false }: itemsProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className="px-1">
                {title}
            </Label>
            <Popover open={open} onOpenChange={setOpen} modal={modal}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={id}
                        size={'lg'}
                        className={`w-full justify-between rounded-sm font-normal ${errors ? 'border-red-500' : ''}`}
                    >
                        {value?.from ? format(value.from, 'EE MMMM dd, yyyy') : placeholder} {value?.to && value.from ? ' - ' : ''}{' '}
                        {value?.to ? format(value.to, 'EE MMMM dd, yyyy') : ''}
                        <CalendarDays />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar mode="range" selected={value} onSelect={onSelect} numberOfMonths={2} className="rounded-lg border shadow-sm" />
                </PopoverContent>
            </Popover>
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
