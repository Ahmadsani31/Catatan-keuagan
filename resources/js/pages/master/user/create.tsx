import FormInput from '@/components/form-input'
import HeaderTitle from '@/components/header-title'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { AlignCenterHorizontalIcon, ArrowLeft, BackpackIcon, CassetteTape, LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'
import { toast } from 'react-toastify'

type propsPage = {
    title: string
}


type PropsForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Buat User',
        href: '',
    },
];

export default function Create({ title }: propsPage) {

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',

    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        toast.success('hello');
        return

        post(route('master.user.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {

                const flash = success.props.flash_message as { message: string; type?: string };
                toast.success('hello')

                if (flash?.type == 'error') toast.error(flash.message);

                console.log('====================================');
                console.log(flash.type);
                console.log('====================================');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className='flex flex-col items-start justify-between mb-8 gap-y-4 md:flex-row md:items-center'>
                    <HeaderTitle title={title} subtitle={'asdasd'} icon={CassetteTape} />
                    <Button variant={'secondary'} size={'lg'} asChild>
                        <Link href={route('master.user.index')}>
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
                            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-4 sm:gap-6 items-start'>
                                <FormInput
                                    id='password'
                                    title="Password"
                                    type="password"
                                    placeholder='Masukan password...'
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    errors={errors.password}
                                />
                                <FormInput
                                    id='password_confirmation'
                                    title="Konfirmasi password"
                                    type="password"
                                    placeholder='Konfirmasi password...'
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    errors={errors.password_confirmation}
                                />
                            </div>
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