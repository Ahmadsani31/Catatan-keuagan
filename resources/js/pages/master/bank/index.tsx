import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, PlusCircle } from 'lucide-react';

import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';

import AccountCard from '@/components/account-card';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import CreateDialog from './create-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Bank',
        href: '',
    },
];

interface propsPage {
    banks: {
        data: {
            id: number;
            name: string;
            alias: string;
            amount: number;
            account_number: string;
            status: string;
            created_at: string;
        }[];
    };
    page_info: {
        title: string;
        subtitle: string;
    };
}

export default function RolesIndex({ banks, page_info }: propsPage) {
    const [open, setOpen] = useState<boolean>(false);

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
                <Card>
                    <CardContent>
                        <AccountCard items={banks.data} />
                    </CardContent>
                </Card>
            </div>
            {open && <CreateDialog open={open} onOpenChange={setOpen} />}
        </AppLayout>
    );
}
