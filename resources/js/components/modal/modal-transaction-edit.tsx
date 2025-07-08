import { Loader2, PencilIcon } from "lucide-react";
import TextInput from "@/components/textInput";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import FormTextarea from "@/components/form-textarea";
import { NumericFormat } from 'react-number-format';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, flashMessage } from "@/lib/utils";
import FormDatePicker from "@/components/form-date-picker";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios";
import FormLoadingSkeleton from "../form-loading-skeleton";
import InputLoadingSkeleton from "../input-loading-skeleton";


export default function ModalTransactionEdit({ open, setOpen, transactions }: any) {

    // console.log(categoryIncome);

    const [categoryType, setCategoryType] = useState<Array<{ value: string; label: string }>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { data, setData, put, processing, errors, reset } = useForm<Required<any>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: transactions.type,
        category_id: "",
        amount: transactions.amount,
        description: transactions.description,
    });


    async function fetchType(value: string) {

        console.log(value);
        setLoading(true);
        try {
            const response = await axios.get(route('transaction.type', [value]));
            const param = response.data;
            console.log(param);
            setCategoryType(param.categoryType);
            // setTransaksiType(param.page_data.categoryType)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            // reset('category_id');
        }
    }

    useEffect(() => {
        fetchType(transactions.type)
    }, [transactions.type])

    useEffect(() => {
        setData('category_id', transactions.category.id)
    }, [])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        return
        put(route('transaction.update', [transactions]), {
            onSuccess: page => {
                console.log(page);
                const flash = flashMessage(page)
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
                setOpen(false)
            },
        });
    };

    const handleChangeTabs = (val: string) => {
        fetchType(val)
        reset('category_id');
    }

    console.log(data);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Transaksi</DialogTitle>
                    <DialogDescription>
                        Buat data transaksi income atau expense baru disini, klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={transactions.type} onValueChange={(val) => handleChangeTabs(val)} className="w-full">
                    <TabsList className='w-full h-12'>
                        <TabsTrigger value="Pemasukan" className='data-[state=active]:bg-green-300 '>Pemasukan</TabsTrigger>
                        <TabsTrigger value="Pengeluaran" className='data-[state=active]:bg-red-300 '>Pengeluaran</TabsTrigger>
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
                        {loading ? <InputLoadingSkeleton loop={1} /> : (

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
                                    defaultValue={data.category_id}
                                    onValueChange={(value) => setData('category_id', Number(value))}
                                >
                                    <SelectTrigger className={`border h-10 ${errors.category_id ? 'border-red-500' : ''}`}>
                                        {/* <SelectValue placeholder='Pilih Kategori' /> */}
                                        <SelectValue>
                                            {categoryType.find((d: { value: string, label: string }) => d.value === data.category_id) ? categoryType.find((d: { value: string, label: string }) => d.value === data.category_id)?.label : (<p className="text-muted-foreground">Pilih Kategori</p>)}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryType.map((data: { value: string; label: string }, index: number) => (
                                            <SelectItem className='hover:bg-green-100 hover:cursor-pointer h-10' key={index} value={data.value.toString()}>
                                                {data.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors && (
                                    <p className="text-sm m-0 text-red-500">{errors.category_id}</p>
                                )}
                            </div>
                        )}
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
                        <Button type='button' variant={'outline'} size={'lg'} onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button type='submit' size={'lg'} disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </form>


            </DialogContent>
        </Dialog >
    )
}