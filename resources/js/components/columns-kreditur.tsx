import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { NotepadTextIcon, PencilIcon } from 'lucide-react';
import AddTooltip from './add-tooltip';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import KrediturStatusBadge from './kreditur-status-badge';

type columnsItems = {
    date: string;
    name: string;
    status: string;
    note: string;
    encrypted_id: string;
    cash: {
        amount: number;
        pay: number;
        available: number;
    };
};

export const ColumnsKreditur: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'date',
        header: 'Tanggal',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }) => (
            <div className="items-center">
                <p>{row.original.name}</p>
                <KrediturStatusBadge status={row.original.status} />
            </div>
        ),
    },
    {
        accessorKey: 'cash.amount',
        header: 'Nominal',
        cell: ({ row }) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return (
                <div>
                    {currencyFormatter.format(row.original.cash.amount)}
                    <p className="text-xs text-teal-400">sisa : {currencyFormatter.format(row.original.cash.available)}</p>
                </div>
            );
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
        accessorKey: 'note',
        header: 'Keterangan',
        cell: (row) => <p className="text-wrap">{row.getValue() as string}</p>,
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-x-1">
                    <AddTooltip text="Detail" side="left">
                        <Button variant={'custom'} className="bg-indigo-500" size={'sm'} asChild>
                            <Link href={route('krediturs.payment.index', [row.original])}>
                                <NotepadTextIcon />
                            </Link>
                        </Button>
                    </AddTooltip>
                    <AddTooltip text="Edit" side="top">
                        <Button variant={'default'} size={'sm'} asChild>
                            <Link href={route('krediturs.edit', [row.original])}>
                                <PencilIcon />
                            </Link>
                        </Button>
                    </AddTooltip>
                    <ColumnsDatatableActionDelete url={route('krediturs.destroy', [row.original])} />
                </div>
            );
        },
    },
];
