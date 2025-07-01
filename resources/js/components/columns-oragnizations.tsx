import FormInput from "@/components/form-input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { flashMessage } from "@/lib/utils";
import { columnsItemsUser } from "@/types/page-user";
import { Link, router, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle, LockKeyhole, PencilIcon, TrashIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

export const ColumnsOrganizations: ColumnDef<columnsItemsUser>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "keterangan",
        header: "Keterangan",
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'> Aksi  </span>),
        cell: ({ row }) => {
            return (
                <div className='flex justify-center gap-x-1'>

                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('master.users.edit', { user: row.original })}>
                            <PencilIcon />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
]