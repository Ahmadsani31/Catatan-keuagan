import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, Loader2, PlusCircle, SquarePen, SquarePlus, Trash } from 'lucide-react';

import ButtonCostum from '@/components/buttonCostum';

import { FormEventHandler, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import TextInput from '@/components/textInput';
import Select from 'react-select'
import SelectComponent from '@/components/SelectComponent';
import axios from 'axios';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/header-title';
import { pageIndex } from '@/types/page-permission';
import { ColumnsPermission } from '@/components/columns-permission';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Permission',
        href: '',
    },
];

type itemsProps = {
    permission: {
        data: ItemsData[];
    },
    title: string
}

type ItemsData = {
    id: string;
    name: string;
    keterangan: string;
    type: string;
}


type LoginForm = {
    id: string;
    name: string;
};


export default function RolesIndex({ permissions, page_info }: pageIndex) {
    const [open, setOpen] = useState<boolean>(false);

    console.log('permission', permissions);


    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        id: "",
        name: "",
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

    const handleEditModal = (id: string) => {
        axios.get(route('permission.show', { id: id }))
            .then(function (response) {
                // handle success
                setData('id', response.data?.data.id);
                setData('name', response.data?.data.name);
                console.log('response', response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
                setOpen(true);

            });
        // router.visit(route('permission.show', { id: id }), {
        //     method: 'get',
        //     preserveState: true,
        //     preserveScroll: true,
        //     onSuccess: (page) => {
        //         console.log('page', page);

        //     },
        // })

    }

    const handeleDelte = (id: string) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(route('permission.destroy', { id: id }), {
                onSuccess: () => {
                    console.log('Permission deleted successfully');
                },
            });
        }
    };


    const handleOpenModal = () => {
        reset('id');
        reset('name');
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} onClick={() => setOpen(true)} >
                        <PlusCircle /> Tambah
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={ColumnsPermission}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={permissions.data}
                            defaultPageLength={10} />
                    </CardContent>
                </Card>
            </div>

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
                            <Button type='button' size={'lg'} variant={'outline'} onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type='submit' size={'lg'} disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
