import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, BadgeDollarSignIcon, Calendar, CalendarDays, CircleDollarSign, CircleDollarSignIcon, DollarSign, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { pageIndex } from '@/types/page-roles';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnsRole } from '@/components/columns-role';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import TransactionIncome from '@/components/transaction-income';
import TransactionExpense from '@/components/transaction-expense';
import { ColumnsTransaction } from '@/components/columns-transaction';
import FormDatePicker from '@/components/form-date-picker';
import axios from 'axios';
import ModalTransaction from '@/components/modal/modal-transaction';
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

export default function Index({ transactions, page_info, page_data }: any) {

    console.log(page_data);

    const [open, setOpen] = useState<boolean>(false);

    const { message, type } = usePage().props as { message?: string; type?: string };

    async function fetchType(value: string) {
        console.log(value);

        try {
            const response = await axios.get(route('master.categories.create'));
            const param = response.data;
            console.log(param);

            // setTransaksiType(param.page_data.categoryType)
        } catch (error) {
            console.error(error);
        }
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />
                    <Button variant={'default'} size={'lg'} asChild>
                        <Link href={route('transactions.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>
                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <div className="my-5 grid auto-rows-min gap-4 md:grid-cols-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                            <SectionCards name="Income" icon={CircleDollarSignIcon} value={formatter.format(page_data.income)} />
                            <SectionCards name="Expense" icon={BadgeDollarSignIcon} value={formatter.format(page_data.expense)} />
                        </div>
                        <DataTable
                            columns={ColumnsTransaction}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={transactions.data}
                            defaultPageLength={10} />
                    </CardContent>
                </Card>
            </div>
            {open && <ModalTransaction open={open} setOpen={setOpen} />}
        </AppLayout>
    );
}
