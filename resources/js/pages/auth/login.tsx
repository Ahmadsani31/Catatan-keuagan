import { Head, useForm } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import toast from 'react-hot-toast';
import { BiLogoGoogle } from 'react-icons/bi';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [passVisible, setPassVisible] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleLoginViaGoogle = () => {
        toast.success('fitur ongoin');
    };

    return (
        <AuthLayout title="Masuk ke akun kamu" description="Silahkan masukan email and password untuk masuk ke akun keuaganmu">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <Card className="rounded-xl">
                    <CardContent className="px-10 py-8">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {/* {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                            Forgot password?
                                        </TextLink>
                                    )} */}
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

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" size={'lg'} className="w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>
                        <div className="my-5 flex items-center text-sm text-gray-500">
                            <div className="flex-grow border-t border-gray-300" />
                            <p className="mx-2 py-4 text-gray-500">or Login via google</p>
                            <div className="flex-grow border-t border-gray-300" />
                        </div>
                        <Button
                            type="button"
                            variant={'secondary'}
                            size={'lg'}
                            className="w-full"
                            onClick={handleLoginViaGoogle}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <BiLogoGoogle />
                            Google
                        </Button>
                    </CardContent>
                </Card>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
