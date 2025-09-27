import { ColumnDef } from '@tanstack/react-table';
import CategoryStatusBadge from './category-status-badge';

interface columnsItems {
    id: number;
    date: string;
    description: string;
    amount: number;
    category: {
        name: string;
    };
    type: string;
    file_image: string;
}

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
];
