import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Camera, DollarSign, ShoppingCart, SquarePen, Trash, Users } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/DashboardCard';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Organizations',
        href: '',
    },
];

type itemsProps = {
    organizations: {
        data: ItemsData[];
        links: [];
    }
}

type ItemsData = {
    id: string;
    name: string;
    keterangan: string;
    type: string;
}

export default function OrganizationsCreate({ organizations }: any) {

    console.log('====================================');
    console.log(organizations.name);
    console.log('====================================');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Organizations',
            href: '/organizations',
        },
        {
            title: organizations.name,
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizations" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DashboardCard
                        title="Income"
                        value="$12,345"
                        icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
                    />
                    <DashboardCard
                        title="Outcame"
                        value="1,234"
                        icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
                    />
                    <DashboardCard
                        title="Orders"
                        value="567"
                        icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
                    />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 p-3'>
                        <p>User</p>
                    </div>
                    <div className='bg-white m-2 border rounded-lg'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold w-[10px]">No</TableHead>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold">Type</TableHead>
                                    <TableHead className="font-bold">Keterangan</TableHead>
                                    <TableHead className="font-bold text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {organizations?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-center'>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.keterangan}</TableCell>
                                        <TableCell className="font-bold text-center">
                                            <Button onClick={() => alert('adasd')} className='p-1 m-1' variant={'outline'}><SquarePen size={22} /></Button>
                                            <Button className='p-1 m-1' variant={'outline'}><Trash size={18} /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
