import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import appLogo from '@asset/icon/app-icon.png';

export default function AppLogo() {
    const page = usePage().props.auth;
    console.log(page?.organization?.name);

    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src={appLogo} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm items-center">
                <span className="mb-0.5 truncate leading-none font-semibold">{page?.organization?.name}</span>
                <span className="mb-0.5 text-xs leading-none font-light">{page?.organization?.address}</span>
            </div>
        </>
    );
}
