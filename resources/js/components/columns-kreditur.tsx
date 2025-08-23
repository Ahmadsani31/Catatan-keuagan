import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { InfoIcon, PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import KrediturStatusBadge from './kreditur-status-badge';

type columnsItems = {
    date: string;
    name: string;
    cash_amount: string;
    cash_pay: string;
    status: string;
    note: string;
}

export const ColumnsKreditur: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'date',
        header: 'Tanggal',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }: any) => (
            <div className='items-center'>
                <p>{row.original.name}</p>
                <KrediturStatusBadge status={row.original.status} />
            </div>
        ),
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
            return (
                <div>
                    {currencyFormatter.format(row.original.cash.amount)}
                    <p className='text-xs text-teal-400'>sisa : {currencyFormatter.format(row.original.cash.available)}</p>
                </div>
            );
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
        accessorKey: 'note',
        header: 'Keterangan',
        cell: ({ row }: any) => <p className="text-wrap">{row.original.note}</p>,
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }: any) => {
            return (
                <div className="flex justify-center items-center gap-x-1">
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={route('krediturs.payment.index', [row.original])}>
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
