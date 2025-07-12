import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const flash = usePage().props.flash_message as { message?: string; type?: string };
    useEffect(() => {
        if (flash?.type && flash?.message) {
            if (flash.type === 'success') toast.success(flash.message);
            if (flash.type === 'error') toast.error(flash.message);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                stacked
                transition={Bounce}
            />
        </AppLayoutTemplate>
    );
}
