import { Button } from '@/components/ui/button';
import { columnsItems } from '@/types/page-roles';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import ModalRolesUpdate from './modal/modal-roles-update';

export const ColumnsRole: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => {
            const [open, setOpen] = useState<boolean>(false);

            return (
                <div className="flex justify-center gap-x-1">
                    <Button variant={'default'} size={'sm'} onClick={() => setOpen(true)}>
                        <PencilIcon />
                    </Button>
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={route('roles.edit', { id: row.original.encrypted_id })}>
                            <RotateCcwIcon />
                        </Link>
                    </Button>
                    <ModalRolesUpdate open={open} onOpenChange={setOpen} roles={row.original} />

                    <ColumnsDatatableActionDelete url={route('roles.delete', [row.original])} />
                </div>
            );
        },
    },
];
