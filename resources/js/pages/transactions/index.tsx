import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { pageIndex } from '@/types/page-roles';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tran',
        href: '',
    },
];

export default function Index({ page_info, page_data }: any) {

    console.log(page_data);


    const [open, setOpen] = useState<boolean>(false);

    const { message, type } = usePage().props as { message?: string; type?: string };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} onClick={() => setOpen(!open)}>
                        <PlusCircle /> Tambah
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        {/* <DataTable
                            columns={ColumnsRole}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={roles.data}
                            defaultPageLength={10} /> */}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Transaksi</DialogTitle>
                        <DialogDescription>
                            Buat transaction kamu.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="income" className="w-full">
                        <TabsList className='w-full h-12'>
                            <TabsTrigger value="income">Pemasukan</TabsTrigger>
                            <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
                        </TabsList>
                        <TabsContent value="income" >
                            <TransactionIncome categoryIncome={page_data.categoryIncome} />
                        </TabsContent>
                        <TabsContent value="expense" >
                            <TransactionExpense categoryExpense={page_data.categoryExpense} />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
