import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItemNew } from '@/types';
import { Link } from '@inertiajs/react';
import { BanknoteIcon, BookMarked, CircleDollarSign, CookieIcon, FileArchive, User2Icon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItemNew[] = [
    {
        header: 'Dashboard',
        roles: ['admin', 'editor', 'viewer'],
        menu: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: CookieIcon,
                permissions: ['dashboard_access'],
            },
        ],
    },
    {
        header: 'Master',
        roles: ['admin', 'editor'],
        menu: [
            {
                title: 'User',
                href: '/master/users',
                icon: User2Icon,
                permissions: ['user_access'],
            },
            // {
            //     title: 'Roles',
            //     href: '/master/roles',
            //     icon: CookieIcon,
            //     permissions: ['roles_access'],
            // },
            // {
            //     title: 'Permission',
            //     href: '/master/permission',
            //     icon: LucideALargeSmall,
            //     permissions: ['permission_access'],
            // },
            {
                title: 'Kategori',
                href: '/master/categories',
                icon: BookMarked,
                permissions: ['category_access'],
            },
        ],
    },
    {
        header: 'Transaksi',
        roles: ['admin', 'editor'],
        menu: [
            {
                title: 'Transaksi',
                href: '/transactions',
                icon: CircleDollarSign,
                permissions: ['transactions_access'],
            },
        ],
    },
    {
        header: 'Dept',
        roles: ['admin', 'editor'],
        menu: [
            {
                title: 'Hutang-piutang',
                href: '/krediturs/',
                icon: BanknoteIcon,
                permissions: ['krediturs_access'],
            },
        ],
    },
    {
        header: 'Laporan',
        roles: ['admin', 'editor'],
        menu: [
            {
                title: 'Transaksi',
                href: '/transactions/laporan',
                icon: FileArchive,
                permissions: ['laporan_transactions_access'],
            },
        ],
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
