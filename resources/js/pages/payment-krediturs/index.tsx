import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, CircleDollarSign, CircleDollarSignIcon, HandCoins, Wallet } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

import { ColumnsPaymnetKrediturTransaction } from '@/components/columns-payment-kreditur-transaction';
import ModalKrediturTransaction from '@/components/modal/modal-kreditur-transaction';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Krediturs',
        href: '',
    },
];

export default function Index({ kreditur, paymentKreditur, page_info }: any) {
    const [open, setOpen] = useState<boolean>(false);

    // console.log(kreditur);
    // console.log(paymentKreditur);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />
                    <div className="flex gap-1.5">
                        <Button variant={'destructive'} size={'lg'} asChild>
                            <Link href={route('krediturs.index')}>
                                <ArrowBigLeft /> Back
                            </Link>
                        </Button>
                    </div>
                </div>
                <Card className="@container/card">
                    <div className="px-5">
                        <h1 className="text-2xl font-semibold">{kreditur.name}</h1>
                        <p className="text-muted-foreground text-sm">{kreditur.note}</p>
                    </div>
                </Card>
                <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                    <Card className="gap-2">
                        <CardHeader>
                            <CardDescription>Nominal</CardDescription>
                            <CardAction>
                                <CircleDollarSign />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold text-green-500 tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.amount)}
                        </CardFooter>
                    </Card>
                    <Card className="gap-2">
                        <CardHeader>
                            <CardDescription>sisa</CardDescription>
                            <CardAction>
                                <HandCoins />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold text-red-500 tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.available)}
                        </CardFooter>
                    </Card>
                    <Card className="gap-2">
                        <CardHeader>
                            <CardDescription>Terbayarkan</CardDescription>
                            <CardAction>
                                <Wallet />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold text-amber-500 tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.pay)}
                        </CardFooter>
                    </Card>
                </div>
                <Button
                    variant={'custom'}
                    size={'lg'}
                    className="w-full bg-emerald-500 text-white hover:bg-emerald-700"
                    onClick={() => setOpen(true)}
                >
                    <CircleDollarSignIcon /> Tambah Pembayaran
                </Button>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Log Pembayaran</h2>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsPaymnetKrediturTransaction}
                            sortableColumns={['date']}
                            searchableColumns={['note']}
                            data={paymentKreditur.data}
                            defaultPageLength={5}
                        />
                    </CardContent>
                </Card>
            </div>
            {open && <ModalKrediturTransaction open={open} onOpenChange={setOpen} kreditur={kreditur} />}
        </AppLayout>
    );
}
