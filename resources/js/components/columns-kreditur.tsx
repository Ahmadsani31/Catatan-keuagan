import { Button } from '@/components/ui/button';
import { columnsItems } from '@/types/page-roles';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { InfoIcon, PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import KrediturStatusBadge from './kreditur-status-badge';

export const ColumnsKreditur: ColumnDef<columnsItems>[] = [
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
        cell: ({ row }: any) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return currencyFormatter.format(row.original.cash.amount);
        },
    },
    {
        accessorKey: 'cash.pay',
        header: 'Terbayarkan',
        cell: ({ row }: any) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return currencyFormatter.format(row.original.cash.pay);
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => <KrediturStatusBadge status={row.original.status} />,
    },
    {
        accessorKey: 'note',
        header: 'Keterangan',
        cell: ({ row }: any) => <p className="text-wrap">{row.original.note}</p>,
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }: any) => {
            return (
                <div className="flex justify-center gap-x-1">
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={route('payment-krediturs.index', [row.original])}>
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
