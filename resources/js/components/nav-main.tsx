import { NavItemNew } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

type AuthProps = {
    auth?: {
        permissions?: Record<string, boolean>;
    };
};

export function NavMain({ items = [] }: { items: NavItemNew[] }) {
    const page = usePage<AuthProps>();

    // const permissions: string[] = page.props?.auth?.permissions ?? [];
    const permissions: Record<string, boolean> = page.props.auth?.permissions ?? {};

    // const permission = page.props?.auth?.permissions;
    // console.log(page.props.sidebarOpen);

    const { state } = useSidebar();

    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((item, index) => (
                <div key={index}>
                    {state == 'expanded' ? (
                        <SidebarGroupLabel>
                            <h3 className="font-light">{item.header}</h3>
                        </SidebarGroupLabel>
                    ) : null}

                    <SidebarMenu>
                        {item.menu
                            // .filter(menuItem => {
                            //     if (!menuItem.permissions) return true;

                            //     if (Array.isArray(menuItem.permissions)) {
                            //         return menuItem.permissions.some(permiss => permissions?.[permiss]);
                            //     }

                            //     return permissions?.[menuItem.permissions];
                            // }
                            // )
                            .map((menuItem, idx) => (
                                <SidebarMenuItem key={idx}>
                                    <SidebarMenuButton asChild isActive={page.url.startsWith(menuItem.href)} tooltip={{ children: menuItem.title }}>
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
