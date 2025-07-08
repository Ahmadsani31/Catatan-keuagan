import FormInput from "@/components/form-input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { flashMessage } from "@/lib/utils";
import { columnsItems } from "@/types/page-roles";
import { Link, router, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle, LockKeyhole, PencilIcon, TrashIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import CategoryStatusBadge from "./category-status-badge";
import ModalTransactionEdit from "./modal/modal-transaction-edit";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DialogPreviewImage from "./dialog-preview-image";
import ColumnsDatatableActionDelete from "./columns-datatable-action-delete";

export const ColumnsTransaction: ColumnDef<columnsItems>[] = [
    {
        accessorKey: "date",
        header: "Tanggal",
    },
    {
        accessorKey: "description",
        header: "Keterangan",
    },
    {
        accessorKey: "amount",
        header: "Harga",
        cell: ({ row }: any) => {
            const currencyFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return currencyFormatter.format(row.original.amount)
        }
    },
    {
        accessorKey: "category.name",
        header: "Katagori",
    },
    {
        accessorKey: "type",
        header: "Jenis",
        cell: ({ row }: any) => <CategoryStatusBadge status={row.original.type} />

    },
    {
        accessorKey: 'image',
        header: () => (<span className='flex justify-center'>Screnshoot</span>),
        cell: ({ row }: any) => (<div className="flex justify-center items-center"><DialogPreviewImage url_image={row.original.file_image} size="size-10" /></div>),
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'>Aksi</span>),
        cell: ({ row }) => {
            const [dialogOpen, setDialogOpen] = useState<boolean>(false);
            return (
                <div className='flex justify-center gap-x-1'>
                    <Button variant={'default'} size={'sm'} asChild>
                        <Link href={route('transactions.edit', [row.original])}>
                            <PencilIcon />
                        </Link>
                    </Button>
                    <ColumnsDatatableActionDelete url={route('transactions.destroy', [row.original])} />
                </div>
            )
        },
    },
]