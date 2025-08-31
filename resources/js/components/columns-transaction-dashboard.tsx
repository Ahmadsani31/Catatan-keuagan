import { columnsItems } from '@/types/page-roles';
import { ColumnDef } from '@tanstack/react-table';
import CategoryStatusBadge from './category-status-badge';

export const ColumnsTransactionDashboard: ColumnDef<columnsItems>[] = [
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
        cell: ({ row }: any) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return currencyFormatter.format(row.original.amount);
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Katagori',
    },
    {
        accessorKey: 'type',
        header: 'Jenis',
        cell: ({ row }: any) => <CategoryStatusBadge status={row.original.type} />,
    },
];
