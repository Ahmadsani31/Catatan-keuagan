import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';

export type CheckboxItem = {
    id: string | number;
    label: React.ReactNode;
    disabled?: boolean;
};

type Props = {
    items: CheckboxItem[];

    /** Uncontrolled: nilai awal (direkomendasikan stringified) */
    defaultValue?: (string | number)[];

    /** Controlled: jika diisi maka komponen jadi controlled */
    value?: (string | number)[];

    /** Callback tiap perubahan (dipanggil di controlled & uncontrolled) */
    onChange?: (next: string[]) => void;

    /** Hilangkan repot di parent; jika diisi akan render hidden inputs */
    name?: string; // ex: "permission[]"

    /** Judul grup */
    title?: React.ReactNode;

    /** Label untuk check all */
    checkAllLabel?: React.ReactNode;

    /** Tinggi list (px). Default 208 (= ~h-52) */
    listHeight?: number;

    className?: string;
};

export function SmartCheckboxGroup({
    items,
    defaultValue,
    value,
    onChange,
    name,
    title = 'Select items',
    checkAllLabel = 'Check All',
    listHeight = 208,
    className,
}: Props) {
    // normalize IDs to string
    const allIds = React.useMemo(() => items.map((it) => String(it.id)), [items]);

    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string[]>(() => (defaultValue ?? []).map(String));

    const selected = React.useMemo<string[]>(
        () => (isControlled ? (value as (string | number)[]).map(String) : internal),
        [isControlled, value, internal],
    );

    const selectedSet = React.useMemo(() => new Set(selected), [selected]);

    const selectedCount = allIds.filter((id) => selectedSet.has(id)).length;
    const allChecked = selectedCount > 0 && selectedCount === allIds.length;
    const noneChecked = selectedCount === 0;
    const checkAllState: boolean | 'indeterminate' = allChecked ? true : noneChecked ? false : 'indeterminate';

    const emit = (next: string[]) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const toggleAll = (checked: boolean | 'indeterminate') => {
        const next = checked ? allIds : [];
        emit(next);
    };

    const toggleOne = (id: string, checked: boolean | 'indeterminate') => {
        const next = new Set(selected);
        if (checked) next.add(id);
        else next.delete(id);
        emit(Array.from(next));
    };

    return (
        <div className={cn('grid w-full gap-2', className)}>
            <div className="flex items-center justify-between">
                <Label className="mb-1">{title}</Label>
                <div className="flex items-center gap-2">
                    <Label htmlFor="smart-check-all" className="cursor-pointer text-sm">
                        {checkAllLabel}
                    </Label>
                    <Checkbox id="smart-check-all" checked={checkAllState} onCheckedChange={toggleAll} aria-label="Check all" />
                </div>
            </div>

            <div className="overflow-auto rounded border p-3" style={{ maxHeight: listHeight }}>
                {items.map((it) => {
                    const idStr = String(it.id);
                    const isChecked = selectedSet.has(idStr);
                    return (
                        <div key={idStr} className="mb-3 flex items-center gap-2 last:mb-0">
                            <Checkbox
                                id={`smart-cb-${idStr}`}
                                checked={isChecked}
                                onCheckedChange={(c) => toggleOne(idStr, c)}
                                disabled={it.disabled}
                            />
                            <Label htmlFor={`smart-cb-${idStr}`} className={cn('cursor-pointer', it.disabled && 'opacity-50')}>
                                {it.label}
                            </Label>

                            {/* optional hidden inputs untuk submit berbasis DOM */}
                            {name && isChecked && <input type="hidden" name={name} value={idStr} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
