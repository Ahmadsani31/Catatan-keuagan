import FinanceCTA from '@/components/finance-cta';
import FinanceFeatures from '@/components/finance-features';
import FinanceHero from '@/components/finance-hero';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-background min-h-screen">
                <FinanceHero />
                <FinanceFeatures />
                <FinanceCTA />
            </div>
        </>
    );
}
