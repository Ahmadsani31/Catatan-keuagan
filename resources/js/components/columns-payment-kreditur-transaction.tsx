import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';

type columnsItems = {
    date: string;
    payment_method: string;
    amount: string;
    note: string;
}
export const ColumnsPaymnetKrediturTransaction: ColumnDef<columnsItems>[] = [
    {
        accessorKey: 'date',
        header: 'Tanggal',
    },
    {
        accessorKey: 'payment_method',
        header: 'Nama',
    },
    {
        accessorKey: 'amount',
        header: 'Nominal',
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
        accessorKey: 'note',
        header: 'Keterangan',
        cell: ({ row }: any) => <p className="text-wrap">{row.original.note ?? '-'}</p>,
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <ColumnsDatatableActionDelete url={route('payment-krediturs.destroy', [row.original.kreditur.id, row.original])} />
            </div>
        ),
    },
];
