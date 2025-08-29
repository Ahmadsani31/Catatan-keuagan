import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, DollarSign, Shield, TrendingUp } from 'lucide-react';
import financeHeroImage from '../../../public/assets/images/finance-hero.jpg';

const FinanceHero = () => {
    const { auth } = usePage<SharedData>().props;
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[url(/assets/images/welcome-hero.jpg)] bg-cover p-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-white/90"></div>

            <div
                className="from-primary/10 via-background to-accent/5 absolute inset-0 bg-gradient-to-br"
                style={{ backgroundImage: 'var(--finance-hero-bg)' }}
            />

            {/* Floating elements */}
            <div className="bg-primary/20 absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full blur-xl" />
            <div className="bg-accent/20 absolute right-10 bottom-20 h-32 w-32 animate-pulse rounded-full blur-xl delay-1000" />

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="bg-primary/15 border-primary/20 mb-6 inline-flex items-center rounded-full border px-4 py-2">
                            <Shield className="text-primary mr-2 h-4 w-4" />
                            <span className="text-sm font-medium">Aman & Terpercaya</span>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-6xl">
                            Kelola Keuangan
                            <span className="from-primary to-accent block bg-gradient-to-r bg-clip-text text-transparent">dengan Cerdas</span>
                        </h1>

                        <p className="text-muted-foreground mb-8 max-w-lg text-xl">
                            Mulai perjalanan finansial yang lebih baik. Simpan, lacak, dan kembangkan uang Anda dengan mudah dan aman.
                        </p>

                        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                            {auth.user ? (
                                <Button variant="hero" size="lg" className="group" asChild>
                                    <Link href={route('dashboard')}>
                                        Dashboard
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="hero" size="lg" className="group" asChild>
                                        <Link href={route('login')}>
                                            Mulai Menabung Sekarang
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                    <Button variant="elegant" size="lg" asChild>
                                        <Link href={route('register')}>Registrasi Sekarang</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="border-border/50 grid grid-cols-3 gap-6 border-t pt-8">
                            <div className="text-center">
                                <div className="text-primary text-2xl font-bold">100K+</div>
                                <div className="text-muted-foreground text-sm">Pengguna Aktif</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">₹2.5M+</div>
                                <div className="text-muted-foreground text-sm">Total Tabungan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-primary text-2xl font-bold">99.9%</div>
                                <div className="text-muted-foreground text-sm">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src={financeHeroImage}
                                alt="Finance Management App Interface"
                                className="mx-auto w-full max-w-lg rounded-2xl shadow-2xl"
                            />
                            {/* Floating cards */}
                            <Card className="from-primary to-primary-glow absolute -top-6 -left-6 bg-gradient-to-r p-4 shadow-lg">
                                <div className="flex items-center">
                                    <DollarSign className="mr-2 h-6 w-6" />
                                    <div>
                                        <div className="text-lg font-bold">₹25,000</div>
                                        <div className="text-xs opacity-90">Tabungan Bulan Ini</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="from-accent to-accent-glow absolute -right-6 -bottom-6 bg-gradient-to-r p-4 shadow-lg">
                                <div className="flex items-center">
                                    <TrendingUp className="mr-2 h-6 w-6" />
                                    <div>
                                        <div className="text-lg font-bold">+15%</div>
                                        <div className="text-xs opacity-90">Pertumbuhan</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinanceHero;
