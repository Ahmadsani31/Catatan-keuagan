import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, Loader2, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';

import { flashMessage, progressToast } from '@/lib/utils';
import { ColumnsCategory } from '@/components/columns-category';


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
    progressToast

    console.log(categories);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} asChild >
                        <Link href={route('master.categories.create')}>
                            <PlusCircle /> Tambah
                        </Link>
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={ColumnsCategory}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={categories.data}
                            defaultPageLength={10} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
