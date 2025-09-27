import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

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
    const isMobile = useIsMobile();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position={isMobile ? 'top-center' : 'top-right'} />
        </AppLayoutTemplate>
    );
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768); // <768px dianggap mobile
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}
