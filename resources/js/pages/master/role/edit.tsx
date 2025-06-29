import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Camera, LoaderCircle, NotebookText, SquarePen, Trash } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import TextInput from '@/components/textInput';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '/master/roles',
    }, {
        title: 'Create',
        href: '',
    },
];

type itemsProps = {
    title: string
    role: ItemsData
}

type LoginForm = {
    id: number;
    name: string;
    permission: string[];
};

type ItemsData = {
    id: string;
    name: string;
    encrypted_id: string;
}


export default function RolesIndex({ role, permission, permissionRole, title }: any) {

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<LoginForm>>({
        id: role.data.id,
        name: role.data.name,
        permission: permissionRole,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        put(route('roles.update'), {
            onFinish: () => reset('name'),
            onSuccess: page => {
                route('roles.index')
            },
        });
    };

    const handlePermissionChange = (id: string, checked: boolean) => {
        if (checked) {
            setData('permission', [...data.permission, id])
        } else {
            setData('permission', data.permission.filter((perm) => perm !== id))
        }
    }

    console.log(data.permission);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300 p-3'>
                        <p>Roles Create</p>
                    </div>
                    <div className='bg-white m-2 border rounded-lg'>
                        <form onSubmit={handleSubmit} className='p-4'>
                            <TextInput title="Name" type="text" placeholder='set role name' value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                            <div className='border rounded-md p-2'>
                                <p>Permission</p>
                                <hr className='my-2' />
                                {permission.map((item: any, index: any) => (

                                    <div className='mb-3 flex items-center gap-2' key={index}>
                                        <Checkbox name='permission[]' id={item.id}
                                            checked={data.permission.includes(item.id)}
                                            onCheckedChange={(checked) =>
                                                handlePermissionChange(item.id, checked === true)
                                            }
                                        />
                                        <label htmlFor={item.id} className="block">
                                            {item.name}
                                        </label>
                                    </div>
                                )
                                )}
                            </div>
                            <Button type="submit" variant={'outline'} className="float-right bg-[#4E6688] text-white" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan Roles
                            </Button>
                        </form>

                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
