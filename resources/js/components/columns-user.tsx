import FormInput from '@/components/form-input';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { flashMessage } from '@/lib/utils';
import { columnsItemsUser } from '@/types/page-user';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderCircle, LockKeyhole, PencilIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
// import { toast } from 'react-toastify';
import AddTooltip from './add-tooltip';
import ColumnsDatatableActionDelete from './columns-datatable-action-delete';
import { Badge } from './ui/badge';

export const ColumnsUser: ColumnDef<columnsItemsUser>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <div>
                <Badge variant="secondary" className={row.original.role == 'admin' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                    {row.original.role}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Joined At',
    },
    {
        id: 'actions',
        header: () => <span className="flex justify-center"> Aksi </span>,
        cell: ({ row }) => {
            const [dialogOpen, setDialogOpen] = useState(false);

            const { data, setData, post, reset, errors, processing } = useForm<
                Required<{ password: string; password_confirmation: string; _method: string }>
            >({
                password: '',
                password_confirmation: '',
                _method: 'PUT',
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

                        const flash = flashMessage(success);

                        if (flash.type == 'success') {
                            setDialogOpen(false);
                            // toast.success(flash.message);
                        }
                        // if (flash.type == 'error') toast.error(flash.message);
                    },
                });
            };

            return (
                <div className="flex justify-center gap-x-1">
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AddTooltip text="Update password" side="left">
                            <AlertDialogTrigger asChild className="cursor-pointer">
                                <Button variant={'custom'} className="bg-amber-500" size={'sm'}>
                                    <LockKeyhole />
                                </Button>
                            </AlertDialogTrigger>
                        </AddTooltip>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Update Password User</AlertDialogTitle>
                                <AlertDialogDescription>Silahkan update password user dengan yang baru.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <FormInput
                                    id="password"
                                    title="Password"
                                    type="password"
                                    placeholder="Masukan password..."
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    errors={errors.password}
                                />
                                <FormInput
                                    id="password_confirmation"
                                    title="Konfirmasi password"
                                    type="password"
                                    placeholder="Konfirmasi password..."
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    errors={errors.password_confirmation}
                                />
                                <div className="flex justify-end gap-x-2">
                                    <Button type="button" variant={'outline'} onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AddTooltip text="Edit user" side="top">
                        <Button variant={'default'} size={'sm'} asChild>
                            <Link href={route('master.users.edit', { user: row.original })}>
                                <PencilIcon />
                            </Link>
                        </Button>
                    </AddTooltip>
                    {/* <Button variant={'custom'} className="bg-teal-500" size={'sm'} onClick={() => setOpen(true)}>
                        <RotateCcwIcon />
                    </Button>
                    {open && <ModalUserAssignRoles open={open} onOpenChange={setOpen} user={row.original} />} */}
                    <AddTooltip text="Delete user" side="top">
                        <ColumnsDatatableActionDelete url={route('master.users.destroy', { id: row.original })} />
                    </AddTooltip>
                </div>
            );
        },
    },
];
