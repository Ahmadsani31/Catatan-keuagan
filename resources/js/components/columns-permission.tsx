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

            const handleDetele = () => {
                router.delete(
                    route('master.users.destroy', [row.original.id]), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (success) => {
                        const flash = flashMessage(success)
                        if (flash.type == 'success') toast.success(flash.message);
                        if (flash.type == 'error') toast.error(flash.message);
                    }
                })
            }

            const { data, setData, post, processing, errors, reset } = useForm<Required<useFormEdit>>({
                id: row.original.id,
                name: row.original.name,
            });

            const handleSubmit: FormEventHandler = (e) => {
                e.preventDefault();

                post(route('permission.store'), {
                    onSuccess: page => {
                        reset('name');
                        setOpen(false);
                    },
                });
            };


            const [open, setOpen] = useState<boolean>(false);

            const handleOpenModal = () => {
                // reset();
                setOpen(true);
            }

            const handleCloseModal = () => {
                // reset();
                setOpen(false);
            }

            return (
                <div className='flex justify-center gap-x-1'>
                    <Button variant={'default'} size={'sm'} onClick={handleOpenModal} >
                        <PencilIcon />
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-[625px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Create Permission</DialogTitle>
                                    <DialogDescription>
                                        Make your permission name. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-2 py-4">
                                    <TextInput
                                        title="Name"
                                        type="text"
                                        placeholder='Nama permission'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        errors={errors.name}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type='button' size={'lg'} variant={'outline'} onClick={handleCloseModal}>Cancel</Button>
                                    <Button type='submit' size={'lg'} disabled={processing}>
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Submit
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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