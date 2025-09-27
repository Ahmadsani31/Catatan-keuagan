import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import CategoryStatusBadge from './category-status-badge';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import ModalCategoriesEdit from './modal/modal-categories-edit';
interface columnsItems {
    id: number;
    encrypted_id: string;
    name: string;
    type: string;
    created_at: string;
}

export const ColumnsCategory: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: (row) => <CategoryStatusBadge status={row.getValue()} />,
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => <ActionCell row={row.original} />,
    },
];

function ActionCell({ row }: { row: columnsItems }) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex justify-center gap-x-1">
            <Button variant={'default'} size={'sm'} onClick={() => setOpen(true)}>
                <PencilIcon />
            </Button>

            {open && <ModalCategoriesEdit open={open} onOpenChange={setOpen} category={row} />}

            <ColumnsDatatableActionDelete url={route('master.categories.destroy', [row])} />
        </div>
    );
}
