import React from 'react'
import Select from 'react-select'

interface selectItems {
    items: Option[],
    title: string,
    errors?: string,
    onSelect: (value: string | undefined) => void
}

interface Option {
    value: string;
    label: string;
}

export default function SelectReact({ items, title, errors, onSelect }: selectItems) {
    const onchangeSelected = (value: Option | null) => {
        console.log(value);
        onSelect(value?.label);
    }
    return (
        <div className='grid gap-2'>
            <label htmlFor={title} className="block text-sm mb-1">
                {title}
            </label>
            <Select options={items} onChange={(e) => onchangeSelected(e)} className='text-sm' placeholder="Search role..." />
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}
