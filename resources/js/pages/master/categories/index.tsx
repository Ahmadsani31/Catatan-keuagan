import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ColumnsCategory } from '@/components/columns-category';
import ModalCategoriesCreate from '@/components/modal/modal-categories-create';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kategori',
        href: '',
    },
];

export default function RolesIndex({ categories, page_info }: any) {
    const [open, setOpen] = useState<boolean>(false);

    console.log(categories);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} onClick={() => setOpen(true)}>
                        <PlusCircle /> Tambah
                    </Button>
                </div>
                <Card className="py-1 [&_td]:px-3 [&_th]:px-3">
                    <CardContent className="[&-td]:whitespace-nowrap">
                        <DataTable
                            columns={ColumnsCategory}
                            sortableColumns={['name', 'created_at']}
                            searchableColumns={['name']}
                            data={categories.data}
                            defaultPageLength={10}
                        />
                    </CardContent>
                </Card>
            </div>
            <ModalCategoriesCreate open={open} onOpenChange={setOpen} />
        </AppLayout>
    );
}
