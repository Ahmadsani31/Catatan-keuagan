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
import ColumnsDatatableActionDelete from "./columns-datatable-action-delete";
import ModalCategoriesUpdate from "./modal/modal-categories-update";
import CategoryStatusBadge from "./category-status-badge";

export const ColumnsCategory: ColumnDef<columnsItems>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }: any) => <CategoryStatusBadge status={row.original.type} />
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'>Aksi</span>),
        cell: ({ row }: any) => {

            const [open, setOpen] = useState<boolean>(false);
            return (
                <div className='flex justify-center gap-x-1'>
                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('master.categories.edit', [row.original])}>
                            <PencilIcon />
                        </Link>
                    </Button>

                    {open && <ModalCategoriesUpdate
                        open={open}
                        onOpenChange={setOpen}
                        category={row.original}
                    />}

                    <ColumnsDatatableActionDelete
                        url="master.categories.destroy"
                        id={row.original.id}
                    />

                </div>
            )
        },
    },
]