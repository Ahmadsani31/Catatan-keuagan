import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AlertCircle, Camera, NotebookText, SquarePen, SquarePlus, Terminal, Trash } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LinkHref from '@/components/LinkHref';
import { colors } from '@/constants/colors';
import { DataTable } from './datatable/data-table';
import { columns } from './datatable/columns';
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
        data: [];
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
    console.log(role);


    const { message, type } = usePage().props as { message?: string; type?: string };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 flex justify-between items-center px-4 py-2'>
                        <p className='font-bold'>Roles</p>
                        <Button variant={'default'} size={'sm'} onClick={() => router.visit(route('roles.create'))}><SquarePlus size={18} /> Add</Button>
                        {/* <LinkHref href='/master/roles/create/0' className={`${colors.primary} text-white`} icon={<SquarePlus size={18} />} text='Add' /> */}
                    </div>
                    <div className='bg-white m-2 rounded-lg p-2'>
                        {message ? (
                            <Alert variant="default" className='bg-teal-200'>
                                <AlertDescription>
                                    <p className='text-black font-bold'>{message}</p>
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        <DataTable columns={columns} data={role.data} />
                        {/* <Table>
                            <TableHeader className='bg-gray-200'>
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
                                            <Link href={`/master/roles/create/${item.encrypted_id}`} className='p-2 m-1 border hover:bg-gray-200 rounded-lg' as="button" ><SquarePen size={16} /></Link>
                                            <button onClick={() => router.delete(`/master/roles/delete/${item.encrypted_id}`)} className='p-2 m-1 border hover:bg-gray-200 rounded-lg'><Trash size={16} /></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> */}

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
