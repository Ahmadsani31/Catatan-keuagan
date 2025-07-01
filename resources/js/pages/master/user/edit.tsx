import FormInput from '@/components/form-input'
import HeaderTitle from '@/components/header-title'
import ReactSelect from '@/components/react-select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { flashMessage } from '@/lib/utils'
import { BreadcrumbItem } from '@/types'
import { pageUserEdit, pageUserIndex, PropsFormUserCreate, PropsFormUserEdit } from '@/types/page-user'
import { Head, Link, useForm } from '@inertiajs/react'
import { AlignCenterHorizontalIcon, ArrowLeft, BackpackIcon, CassetteTape, LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'
import { toast } from 'react-toastify'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit User',
        href: '',
    },
];

export default function Edit({ users, page_info, page_data }: pageUserEdit) {

    console.log(users);


    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsFormUserEdit>>({
        id: users.data.id,
        name: users.data.name,
        roles: users.data.role ?? null,
        email: users.data.email,
        _method: page_info.method
    });

    console.log(data);


    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();


        post(page_info.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success)

                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);

            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 md:flex-row md:items-center'>
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={CassetteTape} />
                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('master.users.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form className='space-y-4' onSubmit={onHandleSubmit}>
                            <FormInput
                                id='name'
                                title="Name"
                                type="text"
                                placeholder='Masukan nama...'
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <FormInput
                                id='email'
                                title="Email"
                                type="text"
                                placeholder='Masukan email...'
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                errors={errors.email}
                            />
                            <ReactSelect id='role'
                                title='Role'
                                value={data.roles}
                                dataValue={page_data.roles}
                                onValueChange={(value) => setData('roles', value)}
                                placeholder='Pilih rules'
                                errors={errors.roles}
                            />
                            <div className='flex justify-end gap-x-2'>
                                <Button type='button' variant={'outline'} size={'lg'} onClick={() => reset()}>
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
    )
}