import FinanceCTA from '@/components/finance-cta';
import FinanceFeatures from '@/components/finance-features';
import FinanceFooter from '@/components/finance-footer';
import FinanceHeader from '@/components/finance-header';
import FinanceHero from '@/components/finance-hero';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col">
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="cosmic-grid absolute inset-0 opacity-30"></div>

            <FinanceHeader />
            <main>
                <FinanceHero />
                <FinanceFeatures />
                {/* <Features />
                <Testimonials /> */}
                {/* <Pricing /> */}
                {/* <FinanceFeatures /> */}
                <FinanceCTA />
            </main>
            <FinanceFooter />
        </div>
    );
}
