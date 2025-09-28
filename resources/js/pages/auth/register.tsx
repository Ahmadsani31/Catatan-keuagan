import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { Check, Circle, CircleDot, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const accountBaseSchema = z.object({
    name: z.string().min(3, 'Wajib isi'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Min 8 karakter'),
    password_confirmation: z.string().min(8, 'Min 8 karakter'),
});

export const profileSchema = z.object({
    organization: z.string().min(3, 'Wajib diisi'),
    address: z.string().min(3, 'Wajib diisi'),
    keterangan: z.string().max(200, 'Maks 200 karakter').optional(),
});

export const termsSchema = z.object({
    agree: z.boolean().refine((v) => v, 'Anda harus menyetujui syarat & ketentuan'),
});

export const formSchema = accountBaseSchema
    .merge(profileSchema)
    .merge(termsSchema)
    .refine((d) => d.password === d.password_confirmation, {
        message: 'Password tidak sama',
        path: ['password_confirmation'],
    });

export type WizardValues = z.infer<typeof formSchema>;

// —— Step Config ----------------------------------------------------------
export const steps = [
    { key: 'account', title: 'Akun', description: 'Buat akun admin.', fields: ['name', 'email', 'password', 'password_confirmation'] as const },
    {
        key: 'profile',
        title: 'Profil',
        description: 'Lengkapi data profile company.',
        fields: ['organization', 'address', 'keterangan'] as const,
    },
    { key: 'confirm', title: 'Konfirmasi', description: 'Tinjau & setujui.', fields: ['agree'] as const },
] as const;

// —— Helper components ----------------------------------------------------
function Stepper({ current }: { current: number }) {
    return (
        <div className="flex items-center justify-between gap-4">
            {steps.map((s, idx) => {
                const state = idx < current ? 'done' : idx === current ? 'current' : 'next';
                return (
                    <div className="flex flex-1 items-center gap-3" key={s.key}>
                        <div
                            className={cn(
                                'grid size-8 place-items-center rounded-full border transition',
                                state === 'done' && 'bg-primary text-primary-foreground border-primary',
                                state === 'current' && 'bg-background text-foreground border-foreground',
                                state === 'next' && 'bg-muted text-muted-foreground border-muted',
                            )}
                        >
                            {state === 'done' ? (
                                <Check className="size-4" />
                            ) : state === 'current' ? (
                                <CircleDot className="size-4" />
                            ) : (
                                <Circle className="size-4" />
                            )}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm leading-none font-medium">{s.title}</p>
                            <p className="text-muted-foreground text-xs">{s.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// —— Main Component -------------------------------------------------------
export default function Register() {
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const form = useForm<WizardValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            organization: '',
            keterangan: '',
            agree: false,
        },
        mode: 'onChange',
    });

    const progress = Math.round(((step + 1) / steps.length) * 100);

    const next = async () => {
        // Validate only fields in current step
        const fields = steps[step].fields as readonly (keyof WizardValues)[];
        const valid = await form.trigger(fields as any, { shouldFocus: true });
        if (!valid) return;
        setStep((s) => Math.min(s + 1, steps.length - 1));
    };

    const prev = () => setStep((s) => Math.max(s - 1, 0));

    const onSubmit = async (values: WizardValues) => {
        setSubmitting(true);
        try {
            // Simulasi request
            // await new Promise((r) => setTimeout(r, 900));
            // toast.success('Berhasil');
            router.post(route('register'), values, {
                onSuccess: (success) => {
                    console.log(success.props);
                    setSubmitting(false);
                },
                onError: (err) => {
                    console.log(err);
                    if (err.message) {
                        toast.error(err.message || 'Register Failed');
                    } else {
                        toast.error(JSON.stringify(err) || 'Login via Google Failed');
                    }
                    setSubmitting(false);
                },
            });
            // console.log('Wizard submit payload:', values);
        } catch (e) {
            toast.error('Gagal ' + e);
        }
    };

    return (
        <AuthLayout title="Register Account" description="Lengkapi data register untuk memulai langkah keuangan yang baru.">
            <Head title="Register" />

            <Card className="border-muted-foreground/20 w-full shadow-sm">
                <CardContent className="space-y-6">
                    <Stepper current={step} />

                    <div>
                        <Progress value={progress} className="h-2" />
                        <div className="text-muted-foreground mt-2 text-xs">{progress}% selesai</div>
                    </div>

                    <Separator />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {step === 0 && (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel>Nama</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="nama" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="nama@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative flex w-full items-center">
                                                        <Input type={passVisible ? 'text' : 'password'} placeholder="••••••" {...field} />
                                                        <span
                                                            className="absolute right-2 cursor-pointer text-gray-400"
                                                            onClick={() => setPassVisible(!passVisible)}
                                                        >
                                                            {passVisible ? <EyeIcon /> : <EyeOffIcon />}
                                                        </span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password_confirmation"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Konfirmasi Password</FormLabel>
                                                <FormControl>
                                                    <Input type={passVisible ? 'text' : 'password'} placeholder="••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 1 && (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel> Organisasi / Company</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Keluarga kecil, Toko Ayah.." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel>Alamat</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="alamat" className="resize-none" rows={3} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="keterangan"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel>Keterangan (opsional)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Ceritakan sedikit tentang perusahaan Anda"
                                                        className="resize-none"
                                                        rows={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <p className="mb-2 text-sm font-medium">Ringkasan</p>

                                    <div className="bg-muted/30 rounded-xl border p-4">
                                        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                                            <div>
                                                <dt className="text-muted-foreground">Nama</dt>
                                                <dd className="font-medium">{form.getValues('name')}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-muted-foreground">Email</dt>
                                                <dd className="font-medium">{form.getValues('email')}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-muted-foreground">Organisasi / Company</dt>
                                                <dd className="font-medium">{form.getValues('organization')}</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-muted-foreground">Alamat</dt>
                                                <dd className="font-medium">{form.getValues('address') || '-'}</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-muted-foreground">Keterangan (opsional)</dt>
                                                <dd className="font-medium">{form.getValues('keterangan') || '-'}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="agree"
                                        render={({ field }) => (
                                            <FormItem className="flex items-start gap-3">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Saya setuju dengan Syarat & Ketentuan</FormLabel>
                                                    <p className="text-muted-foreground text-xs">Anda harus mencentang ini untuk melanjutkan.</p>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <CardFooter className="flex flex-col justify-between gap-3 px-0 sm:flex-row">
                                <div className="order-2 flex gap-2 sm:order-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className={step === 0 ? 'hidden' : ''}
                                        onClick={prev}
                                        disabled={step === 0 || submitting}
                                    >
                                        Kembali
                                    </Button>
                                    {step < steps.length - 1 ? (
                                        <Button type="button" onClick={next} disabled={submitting}>
                                            Lanjut
                                        </Button>
                                    ) : (
                                        <Button type="submit" disabled={submitting}>
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="mr-2 size-4 animate-spin" /> Send...
                                                </>
                                            ) : (
                                                'Create Account'
                                            )}
                                        </Button>
                                    )}
                                </div>

                                <div className="text-muted-foreground order-1 self-start text-xs sm:order-2 sm:self-center">
                                    Langkah {step + 1} dari {steps.length}
                                </div>
                            </CardFooter>
                        </form>
                    </Form>
                    <Separator />
                    <div className="text-muted-foreground text-center text-sm">
                        Already have an account?{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            Log in
                        </TextLink>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
