import { usePage } from '@inertiajs/react';

interface AuthProps {
    permissions: {
        [key: string]: boolean;
    };
}

interface PageProps {
    auth: AuthProps;
    [key: string]: unknown;
}

export default function hasAnyPermission(permissions: string[]): boolean {
    const { auth } = usePage<PageProps>().props;

    const allPermissions = auth.permissions;

    let hasPermission = false;

    permissions.forEach(function (item) {
        if (allPermissions[item]) {
            hasPermission = true;
        }
    });

    return hasPermission;
}
