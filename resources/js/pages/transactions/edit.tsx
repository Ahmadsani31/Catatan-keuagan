import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle, PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormEventHandler, useRef } from 'react';

import FormDatePicker from '@/components/form-date-picker';
import FormInputFile from '@/components/form-input-file';
import FormTextarea from '@/components/form-textarea';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { NumericFormat } from 'react-number-format';

import DialogPreviewImage from '@/components/dialog-preview-image';

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
        title: 'Edit',
        href: '',
    },
];

interface pageCreate {
    transactions: {
        data: {
            id: number;
            date: string;
            type: string;
            category: {
                id: number;
                name: string;
            };
            description: string;
            file_image: string;
            amount: string;
        };
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
    id: number;
    date: string;
    type: string;
    category_id: number | string;
    description: string;
    amount: string;
    file_image: File | null;
    _method: string;
};

export default function Edit({ transactions, page_info, page_data }: pageCreate) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<propsForm>>({
        id: transactions.data.id,
        date: transactions.data.date,
        type: transactions.data.type,
        category_id: transactions.data.category.id,
        amount: transactions.data.amount,
        description: transactions.data.description,
        file_image: null,
        _method: page_info.method,
    });

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

    const handleChangeTabs = (val: string) => {
        setData('type', val);
        if (val == 'Pengeluaran') {
            page_data.categoryExpense.find((e) => e.value == transactions.data.category.id)
                ? setData('category_id', transactions.data.category.id)
                : setData('category_id', 0);
        } else {
            page_data.categoryIncome.find((e) => e.value == transactions.data.category.id)
                ? setData('category_id', transactions.data.category.id)
                : setData('category_id', 0);
        }
    };

    // console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('transactions.index')}>
                            <ArrowBigLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <FormDatePicker
                                id="date"
                                title="Tanggal"
                                onSelect={(value) => setData('date', value)}
                                errors={errors.date}
                                value={data.date}
                                placeholder="Pilih tanggal"
                                modal={true}
                            />
                            <Tabs defaultValue={transactions.data.type} onValueChange={(val) => handleChangeTabs(val)}>
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
                                            <Link href={route('master.categories.index')} className="rounded-md bg-gray-100 p-1">
                                                <PencilIcon size={15} />
                                            </Link>
                                        </div>
                                        <Select
                                            value={data.category_id.toString()}
                                            defaultValue={data.category_id.toString()}
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                                                {/* <SelectValue placeholder='Pilih Kategori' /> */}
                                                <SelectValue>
                                                    {page_data.categoryIncome.find(
                                                        (d: { value: number; label: string }) => d.value === Number(data.category_id),
                                                    ) ? (
                                                        page_data.categoryIncome.find(
                                                            (d: { value: number; label: string }) => d.value === Number(data.category_id),
                                                        )?.label
                                                    ) : (
                                                        <p className="text-muted-foreground">Pilih Kategori</p>
                                                    )}
                                                </SelectValue>
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
                                            <Link href={route('master.categories.index')} className="rounded-md bg-gray-100 p-1">
                                                <PencilIcon size={15} />
                                            </Link>
                                        </div>
                                        <Select
                                            value={data.category_id.toString()}
                                            defaultValue={data.category_id.toString()}
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <SelectTrigger className={`h-10 border ${errors.category_id ? 'border-red-500' : ''}`}>
                                                {/* <SelectValue placeholder='Pilih Kategori' /> */}
                                                <SelectValue>
                                                    {page_data.categoryExpense.find(
                                                        (d: { value: number; label: string }) => d.value === Number(data.category_id),
                                                    ) ? (
                                                        page_data.categoryExpense.find(
                                                            (d: { value: number; label: string }) => d.value === Number(data.category_id),
                                                        )?.label
                                                    ) : (
                                                        <p className="text-muted-foreground">Pilih Kategori</p>
                                                    )}
                                                </SelectValue>
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
                            <div className="mb-2 flex flex-row items-center gap-2">
                                <FormInputFile
                                    id="file_image"
                                    title="Bukti Transaksi (opsional)"
                                    onChange={(e) => setData('file_image', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                    ref={fileInputCover}
                                    errors={errors.file_image}
                                />
                                <DialogPreviewImage url_image={transactions.data.file_image} size="size-14" />
                            </div>
                            <FormTextarea
                                id="keterangan"
                                title="Keterangan"
                                placeholder="Keterangan..."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                errors={errors.description}
                            />
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={() => reset()}>
                                    Reset
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
        </AppLayout>
    );
}
