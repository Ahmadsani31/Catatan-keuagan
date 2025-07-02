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

export const ColumnsCategory: ColumnDef<columnsItems>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'>Aksi</span>),
        cell: ({ row }) => {

            const handleDetele = () => {
                router.delete(
                    route('roles.delete', [row.original.id]), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (success) => {
                        const flash = flashMessage(success)
                        if (flash.type == 'success') toast.success(flash.message);
                        if (flash.type == 'error') toast.error(flash.message);
                    }
                })
            }

            return (
                <div className='flex justify-center gap-x-1'>
                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('roles.edit', { id: row.original.id })}>
                            <PencilIcon />
                        </Link>
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild className='cursor-pointer'>
                            <Button variant={'destructive'} size={'sm'} >
                                <TrashIcon />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah anda sudah yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini dapat menghapus data secara permanent dan tidak bisa dibatalkan. "Yes", berarti kamu sudah yakin untuk menghapus data secara permanent dari server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDetele}>Yes, delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]