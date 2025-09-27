import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const isMobile = useIsMobile();
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
            <Toaster
                position={isMobile ? 'top-center' : 'top-right'}
                reverseOrder={false}
                toastOptions={{
                    duration: 6000,
                }}
            />
        </AuthLayoutTemplate>
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
