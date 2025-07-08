import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { SectionCardDashboard } from '@/components/section-card-dashboard';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChartArea from '@/components/chart-area';

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

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const page = auth?.organization;
    console.log(page);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex flex-row border p-4 rounded-md items-center justify-between bg-gradient-to-t from-teal-50 to-green-50'>
                    <div>
                        <span className='text-sm text-secondary-foreground'>Nama Organisasi / Company</span>
                        <h3 className='font-bold text-3xl'>{page?.name}</h3>
                        <p>{page?.address}</p>
                        {/* <p className='text-muted-foreground italic'>"{page.keterangan}"</p> */}
                    </div>
                    <img className="size-[100px]" src="/assets/icon/profit-growth.png" alt="icon-dashboard" />
                </div>
                <Tabs defaultValue="1" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="1" onClick={() => alert('a')}>1 Mouth</TabsTrigger>
                        <TabsTrigger value="2">3 Mouth</TabsTrigger>
                        <TabsTrigger value="3">6 Mouth</TabsTrigger>
                        <TabsTrigger value="4">12 Mouth</TabsTrigger>
                    </TabsList>
                </Tabs>
                <SectionCardDashboard />
                <ChartArea />
            </div>
        </AppLayout>
    );
}
