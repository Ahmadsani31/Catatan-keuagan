import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

import FormDatePicker from '@/components/form-date-picker';
import FormInput from '@/components/form-input';
import FormTextarea from '@/components/form-textarea';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { NumericFormat } from 'react-number-format';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kreditur',
        href: '/master/categories',
    },
    {
        title: 'Tambah Kreditur',
        href: '',
    },
];

//USER CREATE
export interface pageCreate {
    page_info: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
}

export interface propsForm {
    name: string;
    phone: string;
    address: string;
    date: string;
    note: string;
    amount: string;
    _method: string;
}

export default function Create({ page_info }: pageCreate) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<propsForm>>({
        name: '',
        phone: '',
        address: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: '',
        note: '',
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('krediturs.index')}>
                            <ArrowBigLeft /> Back
                        </Link>
                    </Button>
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
                            <div className="grid w-full items-center">
                                <Label htmlFor={'harga'} className="mb-3">
                                    Nominal
                                </Label>
                                <NumericFormat
                                    id="harga"
                                    className={cn(errors.amount ? 'border-red-500' : '')}
                                    value={data.amount}
                                    allowLeadingZeros
                                    onValueChange={(e) => setData('amount', e.value)}
                                    thousandSeparator=","
                                    prefix="Rp. "
                                    placeholder="Nominal"
                                    customInput={Input}
                                />
                                {errors.amount && <p className="m-0 text-sm text-red-500">{errors.amount}</p>}
                            </div>
                            <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
                                <FormInput
                                    id="name"
                                    title="Nama perorangan"
                                    type="text"
                                    placeholder="Name perorangan"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    errors={errors.name}
                                />
                                <FormInput
                                    id="phone"
                                    title="Nomor Handphone"
                                    type="text"
                                    placeholder="Nomor handphone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    errors={errors.phone}
                                />
                            </div>

                            <FormTextarea
                                id="address"
                                title="Alamat"
                                placeholder="Alamat..."
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                errors={errors.address}
                            />

                            <FormTextarea
                                id="note"
                                title="Keterangan"
                                placeholder="Keterangan (opsional)..."
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                                errors={errors.note}
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
