import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AlignCenterHorizontalIcon, Loader2, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { pageIndex } from '@/types/page-roles';
import HeaderTitle from '@/components/header-title';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnsRole } from '@/components/columns-role';

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
import { FormEventHandler, useState } from 'react';
import FormSelect from '@/components/form-select';
import { flashMessage } from '@/lib/utils';
import { toast } from 'react-toastify';
import { ColumnsCategory } from '@/components/columns-category';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '',
    },
];

export default function RolesIndex({ categories, page_info, page_data }: any) {

    console.log(categories);

    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<any>>({
        id: "",
        name: "",
        type: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.categories.store'), {
            onSuccess: page => {
                reset('name');
                setOpen(false);
                const flash = flashMessage(page)
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
            },
        });
    };

    const handleOpenModal = () => {
        reset();
        setOpen(true);
    }

    const handleCloseModal = () => {
        reset();
        setOpen(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={AlignCenterHorizontalIcon} />

                    <Button variant={'default'} size={'lg'} onClick={handleOpenModal} >
                        <PlusCircle /> Tambah
                    </Button>

                </div>
                <Card className='py-1 [&_td]:px-3 [&_th]:px-3'>
                    <CardContent className='[&-td]:whitespace-nowrap'>
                        <DataTable
                            columns={ColumnsCategory}
                            sortableColumns={["name", "created_at"]}
                            searchableColumns={["name"]}
                            data={categories.data}
                            defaultPageLength={10} />
                    </CardContent>
                </Card>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Tambah Category</DialogTitle>
                            <DialogDescription>
                                Make your categories name. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2 py-4">
                            <FormSelect
                                id='type'
                                title='Type'
                                dataValue={page_data.categoryType}
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                                placeholder='Pilih type'
                                errors={errors.type}
                            />
                            <TextInput
                                title="Name"
                                type="text"
                                placeholder='Nama kategory'
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />

                        </div>
                        <DialogFooter>
                            <Button type='button' size={'lg'} variant={'outline'} onClick={handleCloseModal}>Cancel</Button>
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
