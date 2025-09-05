import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
const FinanceHero = () => {
    const { auth } = usePage<SharedData>().props;

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section
            id="home"
            className="bg-background relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-28 md:px-12 md:py-36"
        >
            {/* Cosmic particle effect (background dots) */}
            <div className="cosmic-grid absolute inset-0 opacity-30"></div>

            {/* Gradient glow effect */}
            <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="bg-primary h-full w-full opacity-10 blur-[120px]"></div>
            </div>

            <div
                className={`relative z-10 max-w-4xl transform space-y-6 text-center transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <h1 className="text-foreground text-4xl font-medium tracking-tighter text-balance md:text-6xl lg:text-7xl">
                    Kelola Keuangan kamu
                    <span className="text-foreground"> dengan</span> cerdas
                </h1>

                <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance md:text-xl">
                    Mulai perjalanan finansial yang lebih baik. Simpan, lacak pengeluaran dan pemasukan, dan pahami kebutuhan simpan uang dengan mudah
                    dan aman.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
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
                {/* <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground h-12 min-h-[48px] px-8 text-base transition-all duration-200">
                        Kelola sekarang, registrasi..
                    </Button>
                </div> */}
            </div>
        </section>
    );
};

export default FinanceHero;
