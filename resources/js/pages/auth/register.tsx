import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from '@/components/ui/card';

type RegisterForm = {
    organization: string;
    address: string;
    keterangan: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        organization: '',
        address: '',
        keterangan: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: (success) => {
                console.log(success.props);

            }
        });
    };

    const [visibleDiv, setVisibleDiv] = useState(false);

    const [formError, setFormError] = useState({ organization: '', address: '' });

    const handleNext = () => {
        const newErrors = { organization: '', address: '' };

        let isValid = true;

        if (!data.organization) {
            newErrors.organization = 'Organisasi wajib diisi';
            isValid = false;
        }

        if (!data.address) {
            newErrors.address = 'Alamat wajib diisi';
            isValid = false;
        }

        setFormError(newErrors);
        isValid ? setVisibleDiv(true) : setVisibleDiv(false);
        return isValid;
    }



    return (
        <AuthLayout title="Buat Keuangan mu lebih mudah dimonitor" description="Silahkan masukan nama organisasi / company kamu dan lanjutkan untuk langkah awal buat akun">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <Card className="rounded-xl">
                    <CardContent className="px-10 py-8">
                        <div className={`grid gap-4 ${visibleDiv ? 'hidden' : ''} transition delay-150 duration-300 ease-in-out`}>
                            <div className="grid">
                                <Label htmlFor="organization" className='mb-2'>Organisasi / Company</Label>
                                <Input
                                    id="organization"
                                    type="text"
                                    className={formError.organization ? 'border-red-500' : ''}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.organization}
                                    onChange={(e) => setData('organization', e.target.value)}
                                    disabled={processing}
                                    placeholder="Ex: Keluarga kecil, Toko Ayah.."
                                />
                                <InputError message={formError.organization} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Alamat</Label>
                                <Textarea value={data.address} className={formError.address ? 'border-red-500' : ''}
                                    onChange={(e) => setData('address', e.target.value)} placeholder='alamat..' />
                                <InputError message={formError.address} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Keterangan</Label>
                                <Textarea value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)} placeholder='keterangan.. (opsional)' />
                                <InputError message={errors.keterangan} />
                            </div>
                            <div className='flex justify-end'>
                                <Button type="button" className="mt-2" onClick={handleNext}>
                                    Next
                                </Button>
                            </div>

                        </div>
                        <div className={`grid gap-4 ${visibleDiv ? '' : 'hidden'}`}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                            <div className='flex gap-2 justify-between'>
                                <Button type="button" className="mt-2" onClick={() => setVisibleDiv(!visibleDiv)}>
                                    Back
                                </Button>
                                <Button type="submit" className="mt-2" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create account
                                </Button>
                            </div>

                        </div>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout >
    );
}
