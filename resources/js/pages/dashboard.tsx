import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { SectionCardDashboard } from '@/components/section-card-dashboard';

import { ChartPie } from '@/components/chart-pie';
import { ColumnsTransactionDashboard } from '@/components/columns-transaction-dashboard';
import { DataTable } from '@/components/data-table';
import { MonthList } from '@/components/month-list';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Organization {
    name: string;
    address?: string;
    // Add other fields as needed
}

interface PageProps {
    auth?: {
        organization?: Organization;
    };
    // Add other props if needed
    [key: string]: unknown;
}

export default function Dashboard({
    page_data,
    pie_transaksi,
}: {
    page_data: {
        income: number;
        expense: number;
        profit: number;
        last_transaksi: any;
    };
    pie_transaksi: { id: string; label: string; value: string }[];
}) {
    const { auth } = usePage<PageProps>().props;

    const page = auth?.organization;
    const [loading, setLoading] = useState(false);
    const [inputBulan, setInputBulan] = useState<number>(new Date().getMonth() + 1);
    const [inputType, setInputType] = useState<'Pemasukan' | 'Pengeluaran'>('Pemasukan');

    useEffect(() => {
        queueMicrotask(() => {
            router.reload({
                only: ['page_data', 'pie_transaksi'],
                data: {
                    bulan: inputBulan,
                    type: inputType,
                },
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            });
        });
    }, [inputBulan, inputType]);

    console.log(pie_transaksi);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex flex-row items-center justify-between rounded-md border p-4">
                    <div className="z-10 text-white">
                        <span className="text-sm">My Organisasi / Company</span>
                        <h3 className="text-3xl font-bold">{page?.name}</h3>
                        <p>{page?.address}</p>
                        {/* <p className='text-muted-foreground italic'>"{page.keterangan}"</p> */}
                    </div>
                    <img
                        className="absolute inset-0 h-full w-full rounded-l-md rounded-r-md object-cover"
                        src="/assets/images/dashboard.jpg"
                        alt="icon-dashboard"
                    />
                    <div className="absolute inset-0 rounded-l-md rounded-r-md bg-gradient-to-r from-black/90 to-transparent"></div>
                </div>
                <MonthList onChange={(i) => setInputBulan(i)} />
                <SectionCardDashboard items={page_data} loading={loading} />
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-12 lg:col-span-8 xl:col-span-12">
                        <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                            <CardContent className="[&-td]:whitespace-nowrap">
                                <div className="my-5">
                                    <h4 className="text-lg font-bold">Transaksi Terakhir</h4>
                                </div>

                                <DataTable
                                    columns={ColumnsTransactionDashboard}
                                    sortableColumns={['description', 'category_name', 'created_at']}
                                    searchableColumns={['description', 'category_name']}
                                    data={page_data.last_transaksi.data}
                                    defaultPageLength={'all'}
                                    headerTable={false}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-12 lg:col-span-4 xl:col-span-12">
                        <ChartPie
                            pieData={pie_transaksi}
                            onChangeRadio={(e: string) => setInputType(e as 'Pemasukan' | 'Pengeluaran')}
                            value={inputType}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
