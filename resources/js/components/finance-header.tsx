import FinanceLogo from '@/components/finance-logo';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { CircleDot, LayoutDashboard, Menu, Moon, Sun, User2Icon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
const FinanceHeader = () => {
    const { appearance, updateAppearance } = useAppearance();
    const [activePage, setActivePage] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

    useEffect(() => {
        // Apply the theme to the document when it changes
        if (isDarkMode) {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        }
    }, [isDarkMode]);

    const handleNavClick = (page: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setActivePage(page);
        const element = document.getElementById(page);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        updateAppearance(!isDarkMode ? 'dark' : 'light');
    };

    return (
        <div className="sticky top-0 z-50 px-4 pt-8">
            <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 md:px-8">
                <div className="p-3">
                    <FinanceLogo />
                </div>
                {/* Mobile menu button */}
                <button className="text-muted-foreground hover:text-foreground rounded-2xl p-3 md:hidden" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop navigation */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center md:flex">
                    <div className="bg-background/80 border-border rounded border px-1 py-1 shadow-lg backdrop-blur-md">
                        <ToggleGroup type="single" value={activePage} onValueChange={(value) => value && setActivePage(value)}>
                            <ToggleGroupItem
                                value="home"
                                className={cn(
                                    'relative rounded-full px-4 py-2 transition-colors',
                                    activePage === 'home'
                                        ? 'text-accent-foreground bg-accent'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                                )}
                                onClick={handleNavClick('home')}
                            >
                                <CircleDot size={16} className="mr-1.5 inline-block" /> Home
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="features"
                                className={cn(
                                    'relative rounded-full px-4 py-2 transition-colors',
                                    activePage === 'features'
                                        ? 'text-accent-foreground bg-accent'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                                )}
                                onClick={handleNavClick('features')}
                            >
                                <LayoutDashboard size={16} className="mr-1.5 inline-block" /> Features
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="about"
                                className={cn(
                                    'relative rounded-full px-4 py-2 transition-colors',
                                    activePage === 'about'
                                        ? 'text-accent-foreground bg-accent'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                                )}
                                onClick={handleNavClick('about')}
                            >
                                <User2Icon size={16} className="mr-1.5 inline-block" /> About
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </nav>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="bg-background/95 border-border absolute top-20 right-4 left-4 z-50 rounded-2xl border px-6 py-4 shadow-lg backdrop-blur-md md:hidden">
                        <div className="flex flex-col gap-4">
                            <a
                                href="#features"
                                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                    activePage === 'features'
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                                onClick={handleNavClick('features')}
                            >
                                <CircleDot size={16} className="mr-1.5 inline-block" /> Features
                            </a>
                            <a
                                href="#dashboard"
                                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                    activePage === 'dashboard'
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                                onClick={handleNavClick('dashboard')}
                            >
                                <LayoutDashboard size={16} className="mr-1.5 inline-block" /> Dashboard
                            </a>
                            <a
                                href="#pricing"
                                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                    activePage === 'pricing'
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                                onClick={handleNavClick('pricing')}
                            >
                                <User2Icon size={16} className="mr-1.5 inline-block" /> About
                            </a>

                            {/* Add theme toggle for mobile */}
                            <div className="flex items-center justify-between px-3 py-2">
                                <span className="text-muted-foreground text-sm">Theme</span>
                                <div className="flex items-center gap-2">
                                    <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <Switch checked={!isDarkMode} onCheckedChange={toggleTheme} className="data-[state=checked]:bg-primary" />
                                    <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="hidden items-center gap-4 md:flex">
                    {/* Theme toggle for desktop */}
                    <div className="flex items-center gap-2 rounded-full px-3 py-2">
                        <Moon size={18} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                        <Switch checked={!isDarkMode} onCheckedChange={toggleTheme} className="data-[state=checked]:bg-primary" />
                        <Sun size={18} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    {/* <div className="rounded-2xl">
                        <Link href="/login">
                            <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                Log in
                            </Button>
                        </Link>
                    </div> */}
                </div>
            </header>
        </div>
    );
};

export default FinanceHeader;
