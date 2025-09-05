import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const FinanceCTA = () => {
    return (
        <section id="about" className="relative overflow-hidden bg-[url(/assets/images/welcome-hero.jpg)] bg-cover py-24">
            {/* Background */}
            <div className="from-primary via-primary-glow to-accent absolute inset-0 bg-gradient-to-r opacity-5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />

            <div className="relative z-10 container mx-auto px-4">
                <Card className="from-card/80 to-card/40 mx-auto max-w-4xl border-0 bg-gradient-to-br shadow-2xl backdrop-blur-xl">
                    <CardContent className="p-12 text-center">
                        {/* Icon */}
                        <div className="from-primary to-accent mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                            Siap Mengubah Hidup
                            <span className="from-primary to-accent block bg-gradient-to-r bg-clip-text text-transparent">Finansial Anda?</span>
                        </h2>

                        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl">
                            Bergabunglah dengan ribuan orang yang sudah merasakan perubahan positif dalam pengelolaan keuangan mereka. Mulai hari ini
                            dan rasakan perbedaannya!
                        </p>

                        {/* Benefits */}
                        {/* <div className="mx-auto mb-12 grid max-w-2xl gap-4 sm:grid-cols-2">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center text-left">
                                    <CheckCircle className="text-accent mr-3 h-5 w-5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div> */}

                        {/* CTA Buttons */}
                        {/* <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button variant="hero" size="lg" className="group px-8 py-6 text-lg">
                                Daftar Gratis Sekarang
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button variant="elegant" size="lg" className="px-8 py-6 text-lg">
                                Konsultasi Gratis
                            </Button>
                        </div> */}

                        {/* Trust indicators */}
                        {/* <div className="text-center">
                            <p className="text-muted-foreground mb-4 text-sm">Dipercaya oleh:</p>
                            <div className="flex items-center justify-center space-x-8 opacity-60">
                                <div className="text-2xl font-bold">Bank ABC</div>
                                <div className="text-2xl font-bold">FinTech XYZ</div>
                                <div className="text-2xl font-bold">Asuransi 123</div>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default FinanceCTA;
