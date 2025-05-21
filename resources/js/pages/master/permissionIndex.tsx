import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Camera, NotebookText, SquarePen, Trash } from 'lucide-react';

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
import { permission } from 'process';


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

type itemsProps = {
    permission: {
        data: ItemsData[];
        links: [];
    },
    title: string
}

type ItemsData = {
    id: string;
    name: string;
    keterangan: string;
    type: string;
}

export default function RolesIndex({ permission, title }: itemsProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                                {permission?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-center'>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.keterangan}</TableCell>
                                        <TableCell className="font-bold text-center">
                                            <Link href={`/organizations/${item.id}/detail`} className='p-2 m-1 border hover:bg-gray-200 rounded-lg' as="button" ><NotebookText size={18} /></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
