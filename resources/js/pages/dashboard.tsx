import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { SectionCardDashboard } from '@/components/section-card-dashboard';

import ChartArea from '@/components/chart-area';
import { MonthList } from '@/components/month-list';

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

export default function Dashboard({ page_data }: { page_data: { income: number; expense: number; profit: number } }) {
    const { auth } = usePage<PageProps>().props;

    const page = auth?.organization;
    console.log(page_data);

    const handleSubmit = (e: number) => {
        console.log(e);

        // Aksi yang ingin dilakukan saat form disubmit
        router.reload({
            only: ['page_data'],
            data: {
                bulan: e,
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row items-center justify-between rounded-md border bg-gradient-to-t from-teal-50 to-green-50 p-4">
                    <div>
                        <span className="text-secondary-foreground text-sm">Nama Organisasi / Company</span>
                        <h3 className="text-3xl font-bold">{page?.name}</h3>
                        <p>{page?.address}</p>
                        {/* <p className='text-muted-foreground italic'>"{page.keterangan}"</p> */}
                    </div>
                    <img className="size-[100px]" src="/assets/icon/profit-growth.png" alt="icon-dashboard" />
                </div>
                <MonthList onChange={(i) => handleSubmit(i)} />
                <SectionCardDashboard items={page_data} />
                <ChartArea />
            </div>
        </AppLayout>
    );
}
