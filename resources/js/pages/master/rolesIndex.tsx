import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Camera, NotebookText, SquarePen, SquarePlus, Trash } from 'lucide-react';

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


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '',
    },
];

type itemsProps = {
    role: {
        data: ItemsData[];
        links: [];
    },
    title: string
}

type ItemsData = {
    id: string;
    name: string;
    encrypted_id: string;
}

export default function RolesIndex({ role, title }: itemsProps) {

    console.log('====================================');
    console.log(role);
    console.log('====================================');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 flex justify-between items-center p-3'>
                        <p>User</p>
                        <Link href='/master/roles/create/0' className='p-1 border flex items-center gap-2 rounded-md bg-white'><SquarePlus size={18} />Add</Link>
                    </div>
                    <div className='bg-white m-2 border rounded-lg p-4'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold w-[10px]">No</TableHead>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {role?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-center'>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="font-bold text-center">
                                            <Link href={`/master/roles/create/${item.encrypted_id}`} className='p-2 m-1 border hover:bg-gray-200 rounded-lg' as="button" ><SquarePen size={18} /></Link>
                                            <Button variant={'outline'} className='m-1 border hover:bg-gray-200 rounded-lg'><Trash size={18} /></Button>
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
