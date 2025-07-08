import { Link, useForm } from "@inertiajs/react";
import FormTextarea from "./form-textarea";
import TextInput from "./textInput";
import { FormEventHandler, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { Loader2, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import FormInput from "./form-input";
import ReactSelect from "./react-select";
import FormDatePicker from "./form-date-picker";
import FormSelect from "./form-select";
import { format } from "date-fns";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function TransactionExpense({ categoryExpense }: any) {

    // console.log(categoryExpense);


    const { data, setData, post, processing, errors, reset } = useForm<Required<any>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: 'Pengeluaran',
        category_id: '',
        amount: '',
        description: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('transaction.store'), {
            onSuccess: page => {
                console.log(page);

            },
        });
    };
    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid gap-4">
                <FormDatePicker
                    id="date"
                    title="Tanggal"
                    onSelect={(value) => setData('date', value)}
                    errors={errors.type}
                    value={data.date}
                    placeholder="Pilih tanggal"
                    modal={true}
                />
                <div className='grid w-full items-center'>
                    <div className="flex flex-row items-center gap-2 mb-2">
                        <Label>
                            Katagori
                        </Label>
                        <Link href={route('master.categories.index')} className="bg-gray-100 p-1 rounded-md">
                            <PencilIcon size={15} />
                        </Link>
                    </div>
                    <Select
                        value={data.category_id}
                        onValueChange={(value) => setData('category_id', value)}
                        required={true}
                    >
                        <SelectTrigger className={`border h-10 ${errors.category_id ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder='Transaksi Expense'>
                                {/* {dataValue.find((d) => d.value.toString() === value) ? dataValue.find((d) => d.value.toString() === value)?.value : placeholder} */}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih salah satu</SelectLabel>
                                {categoryExpense.map((data: { value: string; label: string }, index: Key | null | undefined) => (
                                    <SelectItem className='hover:bg-green-100 hover:cursor-pointer h-10' key={index} value={data.value.toString()}>
                                        {data.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors && (
                        <p className="text-sm m-0 text-red-500">{errors.category_id}</p>
                    )}
                </div>

                <div className='grid w-full items-center'>
                    <Label htmlFor={'harga'} className='mb-3'>
                        Harga
                    </Label>
                    <NumericFormat
                        id="harga"
                        className={cn(errors.amount ? "border-red-500" : "")}
                        value={data.amount}
                        allowLeadingZeros
                        onValueChange={(e) => setData('amount', e.value)}
                        thousandSeparator=","
                        prefix="Rp. "
                        placeholder="Harga"
                        customInput={Input}
                    />
                    {errors.amount && (
                        <p className="text-sm m-0 text-red-500">{errors.amount}</p>
                    )}
                </div>

                <FormTextarea
                    id='keterangan'
                    title="Keterangan"
                    placeholder='Keterangan...'
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    errors={errors.description}
                />
            </div>
            <div className='flex justify-end mt-4 gap-2'>
                <Button type='button' variant={'outline'} size={'lg'}>
                    Close
                </Button>
                <Button type='submit' size={'lg'} disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </div>
        </form>
    )
}