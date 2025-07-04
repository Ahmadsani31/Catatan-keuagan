import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, Loader2, PlusCircle, SquarePen, SquarePlus, Trash } from 'lucide-react';

import ButtonCostum from '@/components/buttonCostum';

import { FormEventHandler, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import TextInput from '@/components/textInput';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/header-title';
import { pageIndex } from '@/types/page-permission';
import { ColumnsPermission } from '@/components/columns-permission';
import { Card, CardContent } from '@/components/ui/card';
import ModalPermissionCreate from '@/components/modal/modal-permission-create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Permission',
        href: '',
    },
];

type ItemsData = {
    id: string;
    name: string;
    keterangan: string;
    type: string;
}


type LoginForm = {
    id: string;
    name: string;
};


export default function RolesIndex({ permissions, page_info }: pageIndex) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} onClick={() => setOpen(true)} >
                        <PlusCircle /> Tambah
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={ColumnsPermission}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={permissions.data}
                            defaultPageLength={10} />
                    </CardContent>
                </Card>
            </div>

            <ModalPermissionCreate open={open} onOpenChange={setOpen} />
        </AppLayout >
    );
}
