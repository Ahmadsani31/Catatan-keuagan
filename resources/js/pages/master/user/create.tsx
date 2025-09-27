import FormInput from '@/components/form-input';
import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import ReactSelect from '@/components/react-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { pageUserIndex, PropsFormUserCreate } from '@/types/page-user';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CassetteTape, EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
// import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'User',
        href: '/master/users',
    },
    {
        title: 'Create',
        href: '',
    },
];

export default function Create({ page_info, page_data }: pageUserIndex) {
    const [passVisible, setPassVisible] = useState(false);

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsFormUserCreate>>({
        name: '',
        email: '',
        roles: null,
        password: '',
        password_confirmation: '',
        _method: page_info.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(page_info.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                // const { type, message } = success.props.flash_message as { type: string; message: string };

                // if (type == 'error') toast.error(message);
                // if (type == 'success') toast.error(message);
                console.log(success.props.flash_message);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page_info.title ?? 'Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_info.title} subtitle={page_info.subtitle} icon={CassetteTape} />
                    <Button variant={'destructive'} size={'lg'} asChild>
                        <Link href={route('master.users.index')}>
                            <ArrowLeft /> Back
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <form className="space-y-4" onSubmit={onHandleSubmit}>
                            <FormInput
                                id="name"
                                title="Name"
                                type="text"
                                placeholder="Masukan nama..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                            <FormInput
                                id="email"
                                title="Email"
                                type="text"
                                placeholder="Masukan email..."
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                errors={errors.email}
                            />
                            <ReactSelect
                                id="role"
                                title="Role"
                                dataValue={page_data.roles}
                                onValueChange={(value) => setData('roles', value ? Number(value) : null)}
                                placeholder="Pilih rules"
                                errors={errors.roles}
                            />
                            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <div className="relative flex items-center">
                                        <Input
                                            id="password"
                                            type={passVisible ? 'text' : 'password'}
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                        />
                                        <span className="absolute right-2 cursor-pointer text-gray-400" onClick={() => setPassVisible(!passVisible)}>
                                            {passVisible ? <EyeIcon /> : <EyeOffIcon />}
                                        </span>
                                    </div>

                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password_confirmation">Konfirmasi password</Label>
                                    </div>
                                    <Input
                                        id="password_confirmation"
                                        type={passVisible ? 'text' : 'password'}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Konfirmasi password..."
                                    />
                                    <InputError message={errors.password} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={() => reset()}>
                                    Reset
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
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
