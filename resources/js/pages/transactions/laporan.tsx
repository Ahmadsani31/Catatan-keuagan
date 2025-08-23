import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, CircleDollarSign, DollarSign, HandCoinsIcon, PlusCircle } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ColumnsTransaction } from '@/components/columns-transaction';
import { SectionCards } from '@/components/section-cards';
import FormDatePicker from '@/components/form-date-picker';
import { use, useState } from 'react';
import FormDateRangePicker from '@/components/form-date-range-picker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

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

export default function Laporan({ transactions, page_info }: any) {

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        // Aksi yang ingin dilakukan saat form disubmit
        router.reload({
            only: ['transactions'],
            data: {
                dateStart: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '',
                dateEnd: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : ''
            },
        });
    }


    console.log(dateRange);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                </div>
                <Card>
                    <CardContent className='gap-4 flex flex-col'>
                        <FormDateRangePicker
                            id="date"
                            title="Tanggal Mulai"
                            onSelect={(value) => setDateRange(value)}
                            // errors={errors.date}
                            value={dateRange}
                            placeholder="Pilih tanggal"
                            modal={true}
                        />
                        <Button type="submit" className='w-full' variant={'default'} size={'lg'} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </CardContent>
                </Card>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsTransaction}
                            sortableColumns={['name', 'created_at']}
                            searchableColumns={['name']}
                            data={transactions.data}
                            defaultPageLength={10}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
