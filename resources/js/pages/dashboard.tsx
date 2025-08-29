import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { SectionCardDashboard } from '@/components/section-card-dashboard';

import { MonthList } from '@/components/month-list';
import { useState } from 'react';

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
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e: number) => {
        console.log(e);
        setLoading(true);
        // Aksi yang ingin dilakukan saat form disubmit
        router.reload({
            only: ['page_data'],
            data: {
                bulan: e,
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex flex-row items-center justify-between rounded-md border p-4">
                    <div className="z-10 text-white">
                        <span className="text-sm">My Organisasi / Company</span>
                        <h3 className="text-3xl font-bold">{page?.name}</h3>
                        <p>{page?.address}</p>
                        {/* <p className='text-muted-foreground italic'>"{page.keterangan}"</p> */}
                    </div>
                    <img
                        className="absolute inset-0 h-full w-full rounded-l-md rounded-r-md object-cover"
                        src="/assets/images/dashboard.jpg"
                        alt="icon-dashboard"
                    />
                    <div className="absolute inset-0 rounded-l-md rounded-r-md bg-gradient-to-r from-black/90 to-transparent"></div>
                </div>
                <MonthList onChange={(i) => handleSubmit(i)} />
                <SectionCardDashboard items={page_data} loading={loading} />
                {/* <ChartArea /> */}
            </div>
        </AppLayout>
    );
}
