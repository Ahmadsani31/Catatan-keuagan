import FormDatePicker from '@/components/form-date-picker';
import FormTextarea from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Loader2, PencilIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import FormInputFile from '../form-input-file';
import InputLoadingSkeleton from '../input-loading-skeleton';

export default function ModalTransaction({ open, setOpen }: any) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);
    // console.log(categoryIncome);

    const [categoryType, setCategoryType] = useState<Array<{ value: string; label: string }>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<any>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: '',
        category_id: '',
        amount: '',
        image: null,
        description: '',
    });

    async function fetchType(value: string) {
        console.log(value);
        setLoading(true);
        try {
            const response = await axios.get(route('transactions.type', [value]));
            const param = response.data;
            console.log(param);
            setCategoryType(param.categoryType);
            // setTransaksiType(param.page_data.categoryType)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            reset('category_id');
        }
    }

    useEffect(() => {
        fetchType('Pemasukan');
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('transactions.store'), {
            onSuccess: (page) => {
                console.log(page);

                setOpen(false);
            },
        });
    };

    const handleChangeTabs = (val: string) => {
        fetchType(val);
        setData('type', val);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Transaksi</DialogTitle>
                    <DialogDescription>Buat data transaksi income atau expense baru disini, klik simpan setelah selesai.</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="Pemasukan" onValueChange={(val) => handleChangeTabs(val)} className="w-full">
                    <TabsList className="h-12 w-full">
                        <TabsTrigger value="Pemasukan" className="data-[state=active]:bg-green-300">
                            Pemasukan
                        </TabsTrigger>
                        <TabsTrigger value="Pengeluaran" className="data-[state=active]:bg-red-300">
                            Pengeluaran
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
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
                        {loading ? (
                            <InputLoadingSkeleton loop={1} />
                        ) : (
                            <div className="grid w-full items-center">
                                <div className="mb-2 flex flex-row items-center gap-2">
                                    <Label>Katagori</Label>
                                    <Link href={route('master.categories.index')} className="rounded-md bg-gray-100 p-1">
                                        <PencilIcon size={15} />
                                    </Link>
                                </div>
                                <Select
                                    value={data.category_id}
                                    defaultValue={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Pilih Kategori" />
                                        {/* <SelectValue>
                                            {categoryType.find((d: { value: string, label: string }) => d.value.toString() === data.category_id) ? categoryType.find((d: { value: string, label: string }) => d.value.toString() === data.category_id)?.label : "asd"}
                                        </SelectValue> */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryType.map((data: { value: string; label: string }, index: number) => (
                                            <SelectItem
                                                className="h-10 hover:cursor-pointer hover:bg-green-100"
                                                key={index}
                                                value={data.value.toString()}
                                            >
                                                {data.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors && <p className="m-0 text-sm text-red-500">{errors.category_id}</p>}
                            </div>
                        )}
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
                        <FormInputFile
                            id="image"
                            title="File Bukti"
                            onChange={(e) => setData('image', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                            ref={fileInputCover}
                            errors={errors.cover}
                        />
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
                        <Button type="button" variant={'outline'} size={'lg'} onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button type="submit" size={'lg'} disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
