import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';

import HeaderTitle from '@/components/header-title';
import { SmartCheckboxGroup } from '@/components/smart-checkbox-group';
import { Card, CardContent } from '@/components/ui/card';
import { pageEdit, useFormEdit } from '@/types/page-roles';

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

    const { data, setData, post, processing, errors, reset } = useForm<Required<useFormEdit>>({
        id: role.data.id,
        name: role.data.name,
        permission: role.data.permissions,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route('roles.assign-permissions'), {
            onFinish: () => reset('name'),
            onSuccess: (page) => {
                route('roles.index');
            },
        });
    };

    console.log('====================================');
    console.log(data);
    console.log('====================================');

    const initialSelected = (role.data.permissions ?? []).map((v: number | string) => String(v));

    const items = permissions.data.map((p: any) => ({
        id: p.id,
        label: p.name,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />

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
                            <div className="grid w-full items-center">
                                <SmartCheckboxGroup
                                    title="Permission"
                                    items={items}
                                    defaultValue={initialSelected} // internal (uncontrolled) state
                                    onChange={(next) => setData('permission', next)} // opsional: sinkron ke useForm
                                    name="permission[]" // opsional: render hidden input
                                    listHeight={800}
                                />
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
