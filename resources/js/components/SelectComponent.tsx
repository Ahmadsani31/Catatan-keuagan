import Select from 'react-select';
type itemsProps = {
    title: string;
    value?: string;
    placeholder: string;
    options: ComboboxItem[];
    onChange: (selected: ComboboxItem | null) => void;
    errors?: string;
    required?: boolean;
};

type ComboboxItem = {
    value: string;
    label: string;
};

export default function SelectComponent({ title, value, options, errors, placeholder, onChange, required }: itemsProps) {
    return (
        <div>
            <label htmlFor={title} className="mb-2 block font-medium">
                {title}
            </label>
            <Select
                options={options}
                value={value ? options.find((option) => option.value.toString() === value)?.label : { value: '', label: placeholder }}
                onChange={(option) => onChange(option as ComboboxItem | null)}
                placeholder={placeholder}
                className="text-sm"
                required={required}
            />
            {errors && <p className="ms-1 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
