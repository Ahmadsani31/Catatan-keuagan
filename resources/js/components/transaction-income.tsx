import { cn, flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Loader2, PencilIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import FormDatePicker from './form-date-picker';
import FormTextarea from './form-textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

export default function TransactionIncome({ categoryIncome }: any) {
    // console.log(categoryIncome);

    const { data, setData, post, processing, errors, reset } = useForm<Required<any>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: 'Pemasukan',
        category_id: '',
        amount: '',
        description: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('transaction.store'), {
            onSuccess: (page) => {
                console.log(page);
                const flash = flashMessage(page);
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
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
                <div className="grid w-full items-center">
                    <div className="mb-2 flex flex-row items-center gap-2">
                        <Label>Katagori</Label>
                        <Link href={route('master.categories.index')} className="rounded-md bg-gray-100 p-1">
                            <PencilIcon size={15} />
                        </Link>
                    </div>
                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)} required={true}>
                        <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Transaksi Expense">
                                {/* {dataValue.find((d) => d.value.toString() === value) ? dataValue.find((d) => d.value.toString() === value)?.value : placeholder} */}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih salah satu</SelectLabel>
                                {categoryIncome.map((data: { value: string; label: string }, index: number) => (
                                    <SelectItem className="h-10 hover:cursor-pointer hover:bg-green-100" key={index} value={data.value.toString()}>
                                        {data.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors && <p className="m-0 text-sm text-red-500">{errors.category_id}</p>}
                </div>

                <div className="grid w-full items-center">
                    <Label htmlFor={'harga'} className="mb-3">
                        Harga
                    </Label>
                    <NumericFormat
                        id="harga"
                        className={cn(errors.amount ? 'border-red-500' : '')}
                        value={data.amount}
                        allowLeadingZeros
                        onValueChange={(e) => setData('amount', e.value)}
                        thousandSeparator=","
                        prefix="Rp. "
                        placeholder="Harga"
                        customInput={Input}
                    />
                    {errors.amount && <p className="m-0 text-sm text-red-500">{errors.amount}</p>}
                </div>
                <FormTextarea
                    id="keterangan"
                    title="Keterangan"
                    placeholder="Keterangan..."
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    errors={errors.description}
                />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant={'outline'} size={'lg'}>
                    Close
                </Button>
                <Button type="submit" size={'lg'} disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </div>
        </form>
    );
}
