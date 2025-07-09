import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormEventHandler, useState } from 'react';

import FormInput from '@/components/form-input';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import { dataProps, pageEdit, useFormEdit } from '@/types/page-roles';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '/master/roles',
    },
    {
        title: 'Edit',
        href: '',
    },
];

export default function RolesIndex({ role, permissions, page_info }: pageEdit) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const { data, setData, put, processing, errors, reset } = useForm<Required<useFormEdit>>({
        id: role.data.id,
        name: role.data.name,
        permission: role.data.permissions,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        put(route('roles.update'), {
            onFinish: () => reset('name'),
            onSuccess: (page) => {
                route('roles.index');
            },
        });
    };

    const handleSelectAllChange = (checked: boolean) => {
        console.log(checked);

        if (checked) {
            setSelectedItems(permissions.data.map((item: dataProps) => item.id));
            setData(
                'permission',
                permissions.data.map((item: dataProps) => item.id.toString()),
            );
        } else {
            reset('permission');
            setSelectedItems([]);
        }
        console.log(selectedItems);
    };

    const handleIndividualChange = (itemId: number, checked: boolean) => {
        if (checked) {
            setData('permission', [...data.permission, itemId.toString()]);
        } else {
            setData(
                'permission',
                data.permission.filter((perm) => perm !== itemId.toString()),
            );
        }
    };

    const isAllSelected = selectedItems.length === permissions.data.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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

            </div> */}

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('roles.index')}>
                            <ArrowBigLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormInput
                                id="roles"
                                title="Name"
                                type="text"
                                placeholder="Name role"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <div className="grid w-full items-center">
                                <div className="flex flex-row justify-between">
                                    <Label htmlFor="permission" className="mb-3">
                                        Permission
                                    </Label>
                                    <div className="space-x-1">
                                        <Label htmlFor="permission-all" className="mb-3">
                                            Checked ALL
                                        </Label>
                                        <Checkbox
                                            id="permission-all"
                                            checked={isAllSelected}
                                            onCheckedChange={(checked) => handleSelectAllChange(!!checked)}
                                        />
                                    </div>
                                </div>

                                <div className="h-52 overflow-auto rounded border p-3">
                                    {permissions.data.map((item: any, index: any) => (
                                        <div className="mb-3 flex items-center gap-2" key={index}>
                                            <Checkbox
                                                name="permission[]"
                                                id={item.id}
                                                checked={data.permission.includes(item.id)}
                                                onCheckedChange={(checked) => handleIndividualChange(item.id, !!checked)}
                                            />
                                            <label htmlFor={item.id} className="block">
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={() => reset()}>
                                    Reset
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Update
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
