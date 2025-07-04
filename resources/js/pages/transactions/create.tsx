import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, ArrowBigLeft, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';
import { pageCreate, propsForm } from '@/types/page-categories';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kategori',
        href: '/master/categories',
    }, {
        title: 'Create',
        href: '',
    },
];

export default function Create({ page_info, page_data }: pageCreate) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<propsForm>>({
        id: 0,
        name: '',
        type: '',
        _method: page_info.method
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.categories.store'), {
            onSuccess: page => {
                reset();
            },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('master.categories.index')}>
                            <ArrowBigLeft /> Back
                        </Link>
                    </Button>

                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <FormSelect
                                id='type'
                                title='Type'
                                dataValue={page_data.categoryType}
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                                placeholder='Pilih jenis transaksi'
                                errors={errors.type}
                            />
                            <FormInput
                                id="roles"
                                title="Name"
                                type="text"
                                placeholder='Name role'
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />

                            <div className='flex justify-end gap-x-2'>
                                <Button type='button' variant={'outline'} size={'lg'} onClick={() => reset()} >
                                    Reset
                                </Button>
                                <Button type='submit' variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
