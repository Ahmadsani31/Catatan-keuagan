import React from 'react'
import { Input } from './ui/input'
type itemsProps = {
    title: string
    value?: string
    placeholder: string
    type: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors?: string
    required?: boolean
}
export default function TextInput({ title, value, errors, placeholder, type, onChange, required }: itemsProps) {
    return (
        <div className="mb-3">
            <label htmlFor={title} className="block text-sm font-medium mb-2">
                {title}
            </label>
            <Input
                id={title}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={errors ? "border-red-500" : ""}
                required={required}
            />
            {errors && (
                <p className="text-sm ms-1 text-red-500">{errors}</p>
            )}
        </div>
    )
}