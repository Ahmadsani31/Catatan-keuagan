import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';

interface columnsItemsUser {
    id: number;
    name: string;
    address: string;
    keterangan: string;
    created_at: string;
}

export const ColumnsOrganizations: ColumnDef<columnsItemsUser>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'address',
        header: 'Alamat',
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center gap-x-1">
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('master.users.edit', [row.original])}>
                            <PencilIcon />
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
