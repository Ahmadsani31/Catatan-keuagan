import { Button } from "@/components/ui/button";
import { columnsItemsUser } from "@/types/page-user";
import { Link, router, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle, LockKeyhole, PencilIcon, TrashIcon } from "lucide-react";

export const ColumnsOrganizations: ColumnDef<columnsItemsUser>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "address",
        header: "Alamat",
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