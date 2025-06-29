import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { SquarePen, SquarePlus, Trash } from 'lucide-react';

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
import { DataTable } from './datatable/data-table';
import { columns } from './datatable/columns';
import { Button } from '@/components/ui/button';

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


export default function RolesIndex({ permission, title }: any) {
    const [open, setOpen] = useState<boolean>(false);

    console.log('permission', permission);


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
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 flex justify-between items-center px-4 py-2'>
                        <p className='font-bold'>Permission</p>
                        <Button variant={'outline'} size={'sm'} className='cursor-pointer rounded' onClick={handleOpenModal}>
                            <SquarePlus size={18} />Add
                        </Button>
                        {/* <LinkHref href='/master/permission/0' className={`${colors.primary} text-white`} icon={<SquarePlus size={18} />} text='Add' /> */}
                    </div>
                    <div className='bg-white m-2 rounded-lg p-2'>
                        <DataTable columns={columns} data={permission} />
                        {/* <Table>
                            <TableHeader className='bg-gray-200'>
                                <TableRow>
                                    <TableHead className="font-bold w-[10px]">No</TableHead>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permission?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-center'>{(permission.current_page - 1) * permission.per_page + index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="font-bold text-center">
                                            <button onClick={() => handleEditModal(item.id.toString())} className='p-2 m-1 border hover:bg-gray-200 rounded-lg'><SquarePen size={16} /></button>
                                            <button onClick={() => handeleDelte(item.id.toString())} className='p-2 m-1 border hover:bg-gray-200 rounded-lg'><Trash size={16} /></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> */}

                    </div>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Create Permission</DialogTitle>
                            <DialogDescription>
                                Make your permission name. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2 py-4">
                            {/* <SelectComponent title='Role' value={data.role} options={role} onChange={(e) => setData('role', e?.value ?? "")} placeholder="Search role..." required={true} /> */}
                            {/* <Select options={role} onChange={(e) => setData('role', e.value)} className='text-sm' placeholder="Search role..." /> */}
                            <TextInput title="Name" type="text" placeholder='set role name' value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                        </div>
                        <DialogFooter>
                            <ButtonCostum isLoading={processing}>Save changes</ButtonCostum>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
