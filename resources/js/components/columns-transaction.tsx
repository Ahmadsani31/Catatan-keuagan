import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import AddTooltip from './add-tooltip';
import CategoryStatusBadge from './category-status-badge';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import DialogPreviewImage from './dialog-preview-image';

interface columnsItems {
    id: number;
    encrypted_id: string;
    date: string;
    description: string;
    amount: number;
    category: {
        name: string;
    };
    type: string;
    file_image: string;
}

export const ColumnsTransaction: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'date',
        header: 'Tanggal',
    },
    {
        accessorKey: 'description',
        header: 'Keterangan',
    },
    {
        accessorKey: 'amount',
        header: 'Harga',
        cell: (row) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return currencyFormatter.format(row.getValue() as number);
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Katagori',
    },
    {
        accessorKey: 'type',
        header: 'Jenis',
        cell: (row) => <CategoryStatusBadge status={row.getValue()} />,
    },
    {
        accessorKey: 'file_image',
        header: () => <span className="flex justify-center">Screnshoot</span>,
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <DialogPreviewImage
                    url_image={row.original.file_image}
                    size="size-10"
                    title="Bukti transaksi"
                    description="screenshot atau foto bukti transaksi"
                />
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center gap-x-1">
                    <AddTooltip text="Edit" side="left">
                        <Button variant={'default'} size={'sm'} asChild>
                            <Link href={route('transactions.edit', [row.original])}>
                                <PencilIcon />
                            </Link>
                        </Button>
                    </AddTooltip>
                    <ColumnsDatatableActionDelete url={route('transactions.destroy', [row.original])} />
                </div>
            );
        },
    },
];
