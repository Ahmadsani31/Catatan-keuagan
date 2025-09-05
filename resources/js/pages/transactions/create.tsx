import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle, PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import FormDatePicker from '@/components/form-date-picker';
import FormInputFile from '@/components/form-input-file';
import FormTextarea from '@/components/form-textarea';
import HeaderTitle from '@/components/header-title';
import ModalCategoriesCreateIn from '@/components/modal/modal-categories-create-in';
import ModalCategoriesCreateOut from '@/components/modal/modal-categories-create-out';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { NumericFormat } from 'react-number-format';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transaksi',
        href: '/transactions',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

interface pageCreate {
    transactions: {
        id: number;
        date: string;
        type: string;
        category_id: number | string;
        description: string;
        amount: string;
    };
    page_info: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
    page_data: {
        categoryIncome: {
            value: number;
            label: string;
        }[];
        categoryExpense: {
            value: number;
            label: string;
        }[];
    };
}

type propsForm = {
    date: string;
    type: string;
    category_id: number | string;
    description: string;
    amount: string;
    file_image: File | null;
    _method: string;
};

export default function Create({ page_info, page_data }: pageCreate) {
    const [openIn, setOpenIn] = useState<boolean>(false);
    const [openOut, setOpenOut] = useState<boolean>(false);

    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<propsForm>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: '',
        category_id: '',
        amount: '',
        file_image: null,
        description: '',
        _method: page_info.method,
    });

    // useEffect(() => {
    //     setData('category_id', transactions.category_id);
    // }, [])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(page_info.action, {
            onSuccess: (page) => {
                reset();
            },
        });
    };

    useEffect(() => {
        setData('type', 'Pemasukan');
    }, []);

    const handleChangeTabs = (val: string) => {
        setData('type', val);
        reset('category_id');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormDatePicker
                                id="date"
                                title="Tanggal"
                                onSelect={(value) => setData('date', value)}
                                errors={errors.date}
                                value={data.date}
                                placeholder="Pilih tanggal"
                                modal={true}
                            />
                            <Tabs defaultValue="Pemasukan" onValueChange={(val) => handleChangeTabs(val)}>
                                <TabsList className="h-12 w-full">
                                    <TabsTrigger value="Pemasukan" className="data-[state=active]:bg-green-300">
                                        Pemasukan
                                    </TabsTrigger>
                                    <TabsTrigger value="Pengeluaran" className="data-[state=active]:bg-red-300">
                                        Pengeluaran
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="Pemasukan">
                                    <div className="grid w-full items-center">
                                        <div className="mb-2 flex flex-row items-center gap-2">
                                            <Label>Katagori</Label>
                                            <button type="button" className="cursor-pointer rounded bg-gray-100 p-1" onClick={() => setOpenIn(true)}>
                                                <PencilIcon size={15} />
                                            </button>
                                        </div>
                                        <Select
                                            value={data.category_id.toString()}
                                            defaultValue={data.category_id.toString()}
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Pilih Kategori pemasukan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {page_data.categoryIncome.map((data, index: number) => (
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
                                </TabsContent>
                                <TabsContent value="Pengeluaran">
                                    <div className="grid w-full items-center">
                                        <div className="mb-2 flex flex-row items-center gap-2">
                                            <Label>Katagori</Label>
                                            <button type="button" className="cursor-pointer rounded bg-gray-100 p-1" onClick={() => setOpenOut(true)}>
                                                <PencilIcon size={15} />
                                            </button>
                                        </div>
                                        <Select
                                            value={data.category_id.toString()}
                                            defaultValue={data.category_id.toString()}
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Pilih Kategori pengeluaran" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {page_data.categoryExpense.map((data, index: number) => (
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
                                </TabsContent>
                            </Tabs>

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
                            <FormInputFile
                                id="file_image"
                                title="Bukti Transaksi (opsional)"
                                onChange={(e) => setData('file_image', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                ref={fileInputCover}
                                errors={errors.file_image}
                            />
                            <div className="flex justify-end gap-x-2">
                                <Button variant={'destructive'} size={'lg'} asChild>
                                    <Link href={route('transactions.index')}>
                                        <ArrowBigLeft /> Back
                                    </Link>
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            {openIn && <ModalCategoriesCreateIn open={openIn} onOpenChange={setOpenIn} />}
            {openOut && <ModalCategoriesCreateOut open={openOut} onOpenChange={setOpenOut} />}
        </AppLayout>
    );
}
