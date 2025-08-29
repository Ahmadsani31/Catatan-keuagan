import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ColumnsTransaction } from '@/components/columns-transaction';
import FormDateRangePicker from '@/components/form-date-range-picker';
import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Laporan Transaksi',
        href: '',
    },
];

interface LaporanProps {
    transactions: {
        data: any[];
        meta: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
            from: number;
            to: number;
        };
    };
    page_info: {
        title: string;
        subtitle: string;
    };
}

export default function Laporan({ transactions, page_info }: LaporanProps) {
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Aksi yang ingin dilakukan saat form disubmit
        router.reload({
            only: ['transactions'],
            data: {
                dateStart: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '',
                dateEnd: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '',
            },
            onFinish: () => setLoading(false),
        });
    };

    console.log(dateRange);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />
                </div>
                <Card>
                    <CardContent className="flex flex-col gap-4">
                        <FormDateRangePicker
                            id="date"
                            title="Tanggal Mulai"
                            onSelect={(value) => setDateRange(value)}
                            // errors={errors.date}
                            value={dateRange}
                            placeholder="Pilih tanggal"
                            modal={true}
                        />
                        <Button type="submit" variant={'custom'} className="bg-emerald-500" size={'lg'} onClick={handleSubmit}>
                            Cari Data
                        </Button>
                    </CardContent>
                </Card>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        {loading ? (
                            <div className="flex h-96 w-full items-center justify-center">Loading...</div>
                        ) : (
                            <DataTable
                                columns={ColumnsTransaction}
                                sortableColumns={['name', 'created_at']}
                                searchableColumns={['description']}
                                data={transactions.data}
                                defaultPageLength={100}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
