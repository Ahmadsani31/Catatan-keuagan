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

export const ColumnsUser: ColumnDef<columnsItemsUser>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'> Aksi  </span>),
        cell: ({ row }) => {

            const [dialogOpen, setDialogOpen] = useState(false);

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
                }
                )
            }

            const { data, setData, post, reset, errors, processing } = useForm<Required<any>>({
                password: '',
                password_confirmation: '',
                _method: 'PUT'
            });

            console.log(errors);


            const handleResetPassword: FormEventHandler = (e) => {
                e.preventDefault();
                console.log(data);

                post(route('master.users.update-password', [row.original]), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (success) => {
                        console.log(success);

                        const flash = flashMessage(success)

                        if (flash.type == 'success') {
                            setDialogOpen(false);
                            toast.success(flash.message)
                        };
                        if (flash.type == 'error') toast.error(flash.message);
                    },

                });
            };

            return (
                <div className='flex justify-center gap-x-1'>
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild className='cursor-pointer'>
                            <Button variant={'secondary'} size={'sm'} >
                                <LockKeyhole />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Update Password User</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Silahkan update password user dengan yang baru.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form onSubmit={handleResetPassword} className='space-y-4'>
                                <FormInput
                                    id='password'
                                    title="Password"
                                    type="password"
                                    placeholder='Masukan password...'
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    errors={errors.password}
                                />
                                <FormInput
                                    id='password_confirmation'
                                    title="Konfirmasi password"
                                    type="password"
                                    placeholder='Konfirmasi password...'
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    errors={errors.password_confirmation}
                                />
                                <div className='flex justify-end gap-x-2'>
                                    <Button type="button" variant={"outline"} onClick={() => setDialogOpen(false)}>Cancel</Button>
                                    <Button type='submit' disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Update Password</Button>
                                </div>
                            </form>

                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('master.users.edit', { user: row.original })}>
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