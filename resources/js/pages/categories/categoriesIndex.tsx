import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Camera, SquarePen, Trash } from 'lucide-react';

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
        title: 'Organizations',
        href: '',
    },
];

type itemsProps = {
    categories: {
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

import { columns } from "./columns"
import { DataTable } from './data-table';

export default function CategoriesIndex({ categories }: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 p-3'>
                        <p>Categories</p>
                    </div>
                    <div className='bg-white m-2'>
                        <DataTable columns={columns} data={categories.data} />
                        {/* <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold w-[10px]">No</TableHead>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold">Type</TableHead>
                                    <TableHead className="font-bold text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-center'>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell className="font-bold text-center">
                                            <Button onClick={() => alert('adasd')} className='p-1 m-1' variant={'outline'}><SquarePen size={22} /></Button>
                                            <Button className='p-1 m-1' variant={'outline'}><Trash size={18} /></Button>
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
