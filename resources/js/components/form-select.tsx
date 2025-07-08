import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

type itemsProps = {
    id: string
    title: string
    value?: string
    placeholder: string
    dataValue: any[]
    onValueChange: (value: string) => void
    errors?: string
    required?: boolean
}

export default function FormSelect({ id, title, dataValue, value, errors, placeholder, onValueChange, required }: itemsProps) {

    // console.log('====================================');
    console.log(dataValue);
    // console.log(value);
    // console.log('====================================');

    return (
        <div className='grid w-full items-center'>
            <Label htmlFor={id} className='mb-2'>
                {title}
            </Label>
            <Select
                value={value}
                onValueChange={onValueChange}
                required={required}
            >
                <SelectTrigger className={`border h-10 ${errors ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder={placeholder}>
                        {/* {dataValue.find((d) => d.value.toString() === value) ? dataValue.find((d) => d.value.toString() === value)?.value : placeholder} */}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Pilih salah satu</SelectLabel>
                        {dataValue.map((data, index) => (
                            <SelectItem className='hover:bg-green-100 hover:cursor-pointer h-10' key={index} value={data.value.toString()}>
                                {data.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}
