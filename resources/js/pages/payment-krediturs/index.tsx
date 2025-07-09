import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, PlusCircle } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

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

    console.log(kreditur);
    console.log(paymentKreditur);

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

                        <Button variant={'default'} size={'lg'} onClick={() => setOpen(true)}>
                            <PlusCircle /> Tambah
                        </Button>
                    </div>
                </div>
                <Card className="@container/card">
                    <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{kreditur.name}</CardContent>
                </Card>
                <div className="my-5 grid auto-rows-min gap-4 lg:grid-cols-3">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Nominal</CardDescription>
                            {/* <CardAction>{icon && createElement(icon)}</CardAction> */}
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.amount)}
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>sisa</CardDescription>
                            {/* <CardAction>{icon && createElement(icon)}</CardAction> */}
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.available)}
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Terbayarkan</CardDescription>
                            {/* <CardAction>{icon && createElement(icon)}</CardAction> */}
                        </CardHeader>
                        <CardFooter className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(kreditur.cash.pay)}
                        </CardFooter>
                    </Card>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsPaymnetKrediturTransaction}
                            sortableColumns={['name', 'created_at']}
                            searchableColumns={['name']}
                            data={paymentKreditur.data}
                            defaultPageLength={10}
                        />
                    </CardContent>
                </Card>
            </div>
            {open && <ModalKrediturTransaction open={open} onOpenChange={setOpen} kreditur={kreditur} />}
        </AppLayout>
    );
}
