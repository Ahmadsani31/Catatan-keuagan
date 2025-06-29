import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TextInput from '@/components/textInput';
import { FormEventHandler, useState } from 'react';
import { Combobox } from '@/components/Combobox';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Permission',
        href: '/master/permission',
    },
    {
        title: 'Permission Create',
        href: '',
    },
];


type LoginForm = {
    id: string;
    role: string;
    name: string;
};


export default function RolesIndex({ permission, role, title }: any) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        id: "",
        role: "",
        name: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('data', data);

        // post(route('roles.store'), {
        //     onFinish: () => reset('name'),
        // });
    };



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='bg-gray-300  px-4 py-2'>
                        <p className='font-bold'>Permission Create</p>
                    </div>
                    <div className='bg-white m-2 border rounded-lg'>
                        <form onSubmit={handleSubmit} className='p-4'>
                            <Combobox title='Role' items={role} placeholder='role' onChange={(e) => setData('role', e)} />
                            <TextInput title="Name" type="text" placeholder='set role name' value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
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
