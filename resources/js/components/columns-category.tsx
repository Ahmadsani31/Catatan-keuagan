import { Button } from '@/components/ui/button';
import { columnsItems } from '@/types/page-roles';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import CategoryStatusBadge from './category-status-badge';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import ModalCategoriesEdit from './modal/modal-categories-edit';

export const ColumnsCategory: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }: any) => <CategoryStatusBadge status={row.original.type} />,
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }: any) => {
            const [open, setOpen] = useState<boolean>(false);

            return (
                <div className="flex justify-center gap-x-1">
                    <Button variant={'default'} size={'sm'} onClick={() => setOpen(true)}>
                        <PencilIcon />
                    </Button>

                    {open && <ModalCategoriesEdit open={open} onOpenChange={setOpen} category={row.original} />}

                    <ColumnsDatatableActionDelete url={route('master.categories.destroy', [row.original])} />
                </div>
            );
        },
    },
];
