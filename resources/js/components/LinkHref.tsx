import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function LinkHref({ href, icon, text, className }: { href: string; icon?: React.ReactNode; text?: string; className?: string }) {
    return (
        <Link href={href} className={cn('flex items-center gap-2 rounded-md border px-2 py-1', className)}>
            {icon}
            {text}
        </Link>
    );
}
