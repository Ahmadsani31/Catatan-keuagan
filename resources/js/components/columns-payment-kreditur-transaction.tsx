import { ColumnDef } from '@tanstack/react-table';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import DialogPreviewImage from './dialog-preview-image';

type columnsItems = {
    date: string;
    payment_method: string;
    amount: string;
    note: string;
    file_image: string;
    kreditur: {
        id: number;
    };
};
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
        cell: (row) => <p className="text-wrap">{(row.getValue() as string) ?? '-'}</p>,
    },
    {
        accessorKey: 'file_image',
        header: () => <span className="flex justify-center">Bukti</span>,
        cell: (row) => (
            <div className="flex items-center justify-center">
                <DialogPreviewImage
                    url_image={row.getValue() as string}
                    size="size-10"
                    title="Bukti Pembayaran"
                    description="screenshot atau gambar bukti pembayaran transaksi"
                />
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center">Aksi</span>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <ColumnsDatatableActionDelete url={route('krediturs.payment.destroy', [row.original.kreditur.id, row.original])} />
            </div>
        ),
    },
];
