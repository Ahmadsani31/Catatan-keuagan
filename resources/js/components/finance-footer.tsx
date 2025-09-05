import FinanceLogo from '@/components/finance-logo';

const FinanceFooter = () => {
    return (
        <footer className="border-border bg-card w-full border-t px-6 py-16 md:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="space-y-6 md:col-span-2">
                        <FinanceLogo />
                        <p className="text-muted-foreground max-w-xs">Modern task management for teams that value clarity, focus, and results.</p>
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="bg-muted text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.313-1.732.467-3.482.46-5.33a29.005 29.005 0 00-.46-5.33z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-foreground text-lg font-medium">Product</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Updates
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* <div className="space-y-4">
                        <h4 className="text-foreground text-lg font-medium">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div> */}

                    <div className="space-y-4">
                        <h4 className="text-foreground text-lg font-medium">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Guides & Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Community
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-border text-muted-foreground mt-16 flex flex-col items-center justify-between border-t pt-8 text-sm md:flex-row">
                    <div>© 2025 adsa developer.</div>
                    <div className="mt-4 flex gap-6 md:mt-0">
                        <a href="#" className="hover:text-foreground transition-colors">
                            ADSA
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FinanceFooter;
