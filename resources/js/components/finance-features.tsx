import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PiggyBank, Shield, Smartphone, Target, Users } from 'lucide-react';
import moneyTrackingImage from '../../../public/assets/images/money-tracking.jpg';
import savingsGoalImage from '../../../public/assets/images/savings-goal.jpg';

const FinanceFeatures = () => {
    const features = [
        {
            icon: PiggyBank,
            title: 'Menabung Otomatis',
            description: 'Atur tabungan otomatis dan capai target finansial Anda lebih cepat',
            color: 'text-primary',
        },
        {
            icon: BarChart3,
            title: 'Tracking Pengeluaran',
            description: 'Pantau setiap rupiah yang keluar dan masuk dengan visualisasi yang mudah dipahami',
            color: 'text-accent',
        },
        {
            icon: Target,
            title: 'Goal Setting',
            description: 'Tetapkan target keuangan dan dapatkan insights untuk mencapainya',
            color: 'text-primary',
        },
        {
            icon: Shield,
            title: 'Keamanan Terjamin',
            description: 'Data finansial Anda dilindungi dengan enkripsi tingkat bank',
            color: 'text-accent',
        },
        {
            icon: Smartphone,
            title: 'Mobile First',
            description: 'Akses kapan saja, dimana saja melalui aplikasi mobile yang responsif',
            color: 'text-primary',
        },
        {
            icon: Users,
            title: 'Community Support',
            description: 'Bergabung dengan komunitas finansial untuk tips dan motivasi',
            color: 'text-accent',
        },
    ];

    return (
        <section className="from-background to-muted/30 bg-gradient-to-b py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                        Fitur Unggulan untuk
                        <span className="from-primary to-accent block bg-gradient-to-r bg-clip-text text-transparent">Masa Depan Finansial Anda</span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
                        Dengan teknologi terdepan dan interface yang intuitif, kami membuat pengelolaan keuangan menjadi mudah dan menyenangkan.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group from-card to-card/50 border-0 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <CardHeader>
                                <div
                                    className={`h-12 w-12 rounded-xl bg-gradient-to-r ${
                                        feature.color === 'text-primary' ? 'from-primary/20 to-primary-glow/20' : 'from-accent/20 to-accent-glow/20'
                                    } mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-foreground text-xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-muted-foreground leading-relaxed">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Feature Showcase */}
                <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <h3 className="text-foreground mb-6 text-2xl font-bold md:text-4xl">
                            Visualisasi Keuangan yang
                            <span className="text-primary"> Powerful</span>
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Dapatkan insight mendalam tentang pola pengeluaran Anda dengan chart dan grafik yang interaktif. Buat keputusan finansial
                            yang lebih bijak berdasarkan data real-time.
                        </p>
                        <Button variant="hero" size="lg">
                            Lihat Demo
                        </Button>
                    </div>
                    <div className="relative">
                        <img src={moneyTrackingImage} alt="Money Tracking Visualization" className="w-full rounded-2xl shadow-2xl" />
                        <div className="from-primary/20 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent" />
                    </div>
                </div>

                {/* Savings Goal Section */}
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="relative order-2 lg:order-1">
                        <img src={savingsGoalImage} alt="Savings Goal Achievement" className="w-full rounded-2xl shadow-2xl" />
                        <div className="from-accent/20 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent" />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h3 className="text-foreground mb-6 text-2xl font-bold md:text-4xl">
                            Capai Target
                            <span className="text-accent"> Tabungan Anda</span>
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Dengan sistem goal-setting yang cerdas, kami membantu Anda tetap fokus pada target finansial. Dapatkan reminder dan
                            motivasi untuk konsisten menabung.
                        </p>
                        <Button variant="accent" size="lg">
                            Mulai Target Baru
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinanceFeatures;
