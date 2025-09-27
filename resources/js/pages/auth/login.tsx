import { Head, router, useForm } from '@inertiajs/react';
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
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

interface GoogleJwtPayload {
    iss: string;
    nbf: number;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    azp: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
    jti: string;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [passVisible, setPassVisible] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
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
                        <div className="flex justify-center">
                            <GoogleLogin
                                size="large"
                                onSuccess={(credentialResponse) => {
                                    // console.log(credentialResponse);
                                    if (credentialResponse.credential) {
                                        const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
                                        const userData = {
                                            id: decoded?.sub,
                                            email: decoded?.email,
                                        };
                                        // console.log(userData);
                                        // router.post(route('register'), userData);

                                        router.post(route('google-auth'), userData, {
                                            onStart: () => setLoadingGoogle(true),
                                            onFinish: () => setLoadingGoogle(false),
                                            onSuccess: () => console.log('login via google success'),
                                        });
                                    } else {
                                        console.log('No credential received');
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
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
            {loadingGoogle && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm">
                    {/* Spinner */}
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                    {/* Logo + Text */}
                    <div className="mt-6 flex items-center space-x-3 text-gray-700">
                        {/* Google Icon (SVG) */}
                        <svg className="h-6 w-6" viewBox="0 0 533.5 544.3">
                            <path
                                fill="#4285f4"
                                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h147.5c-6.4 34.5-25.9 63.7-55.1 83.3v68h88.9c52-47.9 80.2-118.6 80.2-196.1z"
                            />
                            <path
                                fill="#34a853"
                                d="M272 544.3c73.7 0 135.5-24.4 180.7-66.1l-88.9-68c-24.7 16.6-56.5 26.4-91.8 26.4-70.6 0-130.5-47.7-151.9-111.5H28.6v69.9c45.6 90.3 139.2 149.3 243.4 149.3z"
                            />
                            <path fill="#fbbc04" d="M120.1 324.9c-10.9-32.6-10.9-67.9 0-100.5v-69.9H28.6c-37.7 74.6-37.7 165.7 0 240.3l91.5-69.9z" />
                            <path
                                fill="#ea4335"
                                d="M272 107.7c39.9 0 75.7 13.7 104 40.6l77.8-77.8C407.5 24.4 345.7 0 272 0 167.8 0 74.2 59 28.6 149.3l91.5 69.9c21.4-63.8 81.3-111.5 151.9-111.5z"
                            />
                        </svg>
                        <span className="text-lg font-medium">Waiting login via Google…</span>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
