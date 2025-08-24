import { NavItemNew, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

type AuthProps = {
    auth?: {
        permissions?: Record<string, boolean>;
    };
};

export function NavMain({ items = [] }: { items: NavItemNew[] }) {
    const page = usePage<AuthProps>();
    const { roles, permissions } = usePage<SharedData>().props.auth;

    const { state } = useSidebar();
    const userRoles = roles;
    const userPermissions = permissions;

    console.log('roles', userRoles);
    console.log('permission', userPermissions);

    return (
        <SidebarGroup className="px-2 py-0">
            {items
                .filter((item) => (item.roles ? item.roles.some((role) => userRoles.includes(role)) : false))
                .map((item, index) => (
                    <div key={index}>
                        {state == 'expanded' ? (
                            <SidebarGroupLabel>
                                <h3 className="font-light">{item.header}</h3>
                            </SidebarGroupLabel>
                        ) : null}

                        <SidebarMenu>
                            {item.menu
                                .filter((item) =>
                                    item.permissions ? item.permissions.some((permissions) => userPermissions.includes(permissions)) : false,
                                )
                                .map((menuItem, idx) => (
                                    <SidebarMenuItem key={idx}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={page.url.startsWith(menuItem.href)}
                                            tooltip={{ children: menuItem.title }}
                                        >
                                            <Link href={menuItem.href} prefetch>
                                                {menuItem.icon && <menuItem.icon />}
                                                <span>{menuItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </div>
                ))}
        </SidebarGroup>
    );
}
