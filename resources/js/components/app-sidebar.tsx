import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItem, NavItemNew } from '@/types';
import { Link } from '@inertiajs/react';
import { BanknoteIcon, BookMarked, CircleDollarSign, CookieIcon, CreditCardIcon, FileArchive, GiftIcon, HomeIcon, User2Icon } from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';

const mainNavItems: NavItemNew[] = [
    {
        header: '',
        roles: ['admin', 'editor'],
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
            {
                title: 'Bank',
                href: '/master/bank',
                icon: CreditCardIcon,
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
            {
                title: 'Hutang-piutang',
                href: '/krediturs',
                icon: BanknoteIcon,
                permissions: ['krediturs_access'],
            },
            {
                title: 'Budgeting',
                href: '#',
                icon: GiftIcon,
                permissions: ['krediturs_access'],
                badge: 'Ongoing',
            },
        ],
    },
    {
        header: 'Laporan',
        roles: ['admin', 'editor'],
        menu: [
            {
                title: 'Transaksi',
                href: '/laporan/transactions',
                icon: FileArchive,
                permissions: ['laporan_transactions_access'],
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: HomeIcon,
    },
];

export function AppSidebar() {
    return (
        <div className="bg-green-50">
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
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    {/* <NavUser /> */}
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}
