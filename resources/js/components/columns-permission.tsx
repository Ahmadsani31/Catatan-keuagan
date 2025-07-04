import FormInput from "@/components/form-input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { flashMessage } from "@/lib/utils";
import { columnsItems, useFormEdit } from "@/types/page-permission";
import { Link, router, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, LoaderCircle, LockKeyhole, PencilIcon, TrashIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TextInput from "./textInput";
import ColumnsDatatableActionDelete from "./columns-datatable-action-delete";
import ModalPermission from "./modal/modal-permission-create";
import ModalPermissionUpdate from "./modal/modal-permission-update";
export const ColumnsPermission: ColumnDef<columnsItems>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'>Aksi</span>),
        cell: ({ row }) => {

            const [open, setOpen] = useState<boolean>(false);

            return (
                <div className='flex justify-center gap-x-1'>
                    <Button variant={'default'} size={'sm'} onClick={() => setOpen(true)} >
                        <PencilIcon />
                    </Button>
                    <ModalPermissionUpdate open={open} onOpenChange={setOpen} permissions={row.original} />

                    <ColumnsDatatableActionDelete
                        url="master.users.destroy"
                        id={row.original.id}
                    />
                </div>
            )
        },
    },
]