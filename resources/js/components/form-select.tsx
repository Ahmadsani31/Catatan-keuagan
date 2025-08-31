import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type itemsProps = {
    id: string;
    title: string;
    value?: string;
    placeholder: string;
    dataValue: any[];
    onValueChange: (value: string) => void;
    errors?: string;
    required?: boolean;
};

export default function FormSelect({ id, title, dataValue, value, errors, placeholder, onValueChange, required }: itemsProps) {
    // console.log('====================================');
    console.log(dataValue);
    // console.log(value);
    // console.log('====================================');

    return (
        <div className="grid w-full items-center">
            <Label htmlFor={id} className="mb-2">
                {title}
            </Label>
            <Select value={value} onValueChange={onValueChange} required={required}>
                <SelectTrigger className={`h-10 border ${errors ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder={placeholder}>
                        {/* {dataValue.find((d) => d.value.toString() === value) ? dataValue.find((d) => d.value.toString() === value)?.value : placeholder} */}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {dataValue.map((data, index) => (
                        <SelectItem className="h-10 hover:cursor-pointer hover:bg-green-100" key={index} value={data.value.toString()}>
                            {data.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
