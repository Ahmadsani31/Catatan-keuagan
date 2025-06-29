import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function LinkHref({ href, icon, text, className }: { href: string, icon?: React.ReactNode, text?: string, className?: string }) {
    return (
        <Link href={href} className={cn('px-2 py-1 border flex items-center gap-2 rounded-md', className)}>{icon}{text}</Link>
    )
}