import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItemNew, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BanknoteIcon, BookMarked, BookOpen, CircleDollarSign, CookieIcon, FileArchive, FileType, Folder, LucideALargeSmall, PiggyBankIcon, User2Icon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItemNew[] = [
    {
        header: 'Dashboard',
        menu: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: CookieIcon,
                permissions: ['dashboard_list'],
            },
        ],
    },
    {
        header: 'Master',
        menu: [
            {
                title: 'User',
                href: '/master/users',
                icon: User2Icon,
                permissions: ['user_list'],
            },
            {
                title: 'Roles',
                href: '/master/roles',
                icon: CookieIcon,
                permissions: ['roles_list'],
            },
            {
                title: 'Permission',
                href: '/master/permission',
                icon: LucideALargeSmall,
                permissions: ['permission_list'],
            },
            {
                title: 'Kategori',
                href: '/master/categories',
                icon: BookMarked,
                permissions: ['permission_list'],
            },
        ],
    },
    {
        header: 'Transaksi',
        menu: [
            {
                title: 'Transaksi',
                href: '/transactions',
                icon: CircleDollarSign,
                permissions: ['organizations_list'],
            },
        ],
    },
    {
        header: 'Dept',
        menu: [
            {
                title: 'Kreditur',
                href: '/krediturs',
                icon: BanknoteIcon,
                permissions: ['organizations_list'],
            }
        ],
    },
    {
        header: 'Laporan',
        menu: [
            {
                title: 'Transaksi',
                href: '#',
                icon: FileArchive,
                permissions: ['organizations_list'],
            },
            {
                title: 'Krediturs',
                href: '#',
                icon: FileArchive,
                permissions: ['organizations_list'],
            },
            {
                title: 'User',
                href: '#',
                icon: FileArchive,
                permissions: ['organizations_list'],
            }
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
