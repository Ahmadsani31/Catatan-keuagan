import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, CircleDollarSign, HandCoinsIcon, PlusCircle } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ColumnsTransaction } from '@/components/columns-transaction';
import { SectionCards } from '@/components/section-cards';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transaksi',
        href: '',
    },
];

interface propsPage {
    transactions: {
        data: {
            id: number;
            date: string;
            type: string;
            category: {
                id: number;
                name: string;
            };
            bank: {
                id: number;
                name: string;
            };
            description: string;
            file_image: string;
            amount: string;
        }[];
    };
    page_info: {
        title: string;
        subtitle: string;
    };
    page_data: {
        expense: number;
        income: number;
    };
}

export default function Index({ transactions, page_info, page_data }: propsPage) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card my-5 grid auto-rows-min gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2">
                            <SectionCards
                                name="Income"
                                icon={CircleDollarSign}
                                value={formatter.format(page_data.income)}
                                className="bg-green-200 font-mono"
                            />
                            <SectionCards
                                name="Expense"
                                icon={HandCoinsIcon}
                                value={formatter.format(page_data.expense)}
                                className="bg-red-200 font-mono"
                            />
                        </div>
                        <Button variant={'custom'} className="w-full bg-emerald-500" size={'lg'} asChild>
                            <Link href={route('transactions.create')}>
                                <PlusCircle /> Tambah
                            </Link>
                        </Button>
                        <DataTable
                            columns={ColumnsTransaction}
                            sortableColumns={['description', 'category_name', 'created_at']}
                            searchableColumns={['description', 'category_name']}
                            data={transactions.data}
                            defaultPageLength={10}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
