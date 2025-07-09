import { Button } from '@/components/ui/button';
import { columnsItems } from '@/types/page-permission';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import ModalPermissionUpdate from './modal/modal-permission-update';
export const ColumnsPermission: ColumnDef<columnsItems>[] = [
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
                    <ModalPermissionUpdate open={open} onOpenChange={setOpen} permissions={row.original} />

                    <ColumnsDatatableActionDelete url="master.users.destroy" id={row.original.id} />
                </div>
            );
        },
    },
];
