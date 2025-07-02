import AppLogoIcon from '@/components/app-logo-icon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-2">
                <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-9 w-9 items-center justify-center">
                        <Avatar className='size-[85px]'>
                            <AvatarImage src='/assets/icon/login-icon.png' />
                        </Avatar>
                        {/* <AppLogoIcon className="size-9 fill-current text-black dark:text-white" /> */}
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <div className="px-1 pt-8 pb-0 text-center">
                        <h3 className="text-xl">{title}</h3>
                        <p className='text-muted-foreground'>{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
