import { Button } from '@/components/ui/button';
import * as React from 'react';

type MonthListProps = {
    /** 0 = Jan, 11 = Des. Jika diisi, komponen menjadi controlled */
    value?: number;
    /** Default bulan terpilih (uncontrolled). Default: bulan berjalan */
    defaultValue?: number;
    /** Callback saat bulan berubah (0..11) */
    onChange?: (monthIndex: number) => void;
    /** Kelas tambahan untuk wrapper */
    className?: string;
    /** Ukuran tombol (shadcn size) */
    size?: 'sm' | 'default' | 'lg' | 'icon';
};

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'] as const;

export function MonthList({ value, defaultValue = new Date().getMonth(), onChange, className = '', size = 'sm' }: MonthListProps) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue);
    const selected = isControlled ? (value as number) : internal;

    const handleSelect = (idx: number) => {
        if (!isControlled) setInternal(idx);
        onChange?.(idx + 1);
    };

    return (
        <div className={`flex flex-wrap gap-2 overflow-x-auto py-1 ${className}`} role="tablist" aria-label="Pilih bulan">
            {MONTHS_ID.map((label, idx) => {
                const active = idx === selected;
                return (
                    <Button
                        key={label}
                        type="button"
                        size={size}
                        variant={active ? 'default' : 'outline'}
                        className={`rounded-full px-4 ${active ? '' : 'bg-background'}`}
                        aria-pressed={active}
                        aria-current={active ? 'date' : undefined}
                        onClick={() => handleSelect(idx)}
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
}
