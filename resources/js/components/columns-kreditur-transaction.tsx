import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { InfoIcon, PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import KrediturStatusBadge from './kreditur-status-badge';

interface columnsItems {
    id: number;
    encrypted_id: string;
    date: string;
    name: string;
    cash: {
        amount: number;
        pay: number;
    };
    status: string;
    note: string;
}

export const ColumnsKrediturTransaction: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'date',
        header: 'Nama',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'cash.amount',
        header: 'Nominal',
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
        accessorKey: 'cash.pay',
        header: 'Terbayarkan',
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
        accessorKey: 'status',
        header: 'Status',
        cell: (row) => <KrediturStatusBadge status={row.getValue()} />,
    },
    {
        accessorKey: 'note',
        header: 'Keterangan',
        cell: (row) => <p className="text-wrap">{row.getValue() as string}</p>,
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center gap-x-1">
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={route('krediturs.transactions', [row.original])}>
                            <InfoIcon />
                        </Link>
                    </Button>
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('krediturs.edit', [row.original])}>
                            <PencilIcon />
                        </Link>
                    </Button>

                    <ColumnsDatatableActionDelete url={route('krediturs.destroy', [row.original])} />
                </div>
            );
        },
    },
];
