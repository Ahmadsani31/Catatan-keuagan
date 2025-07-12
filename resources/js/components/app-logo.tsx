import appLogo from '@asset/icon/app-icon.png';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const page = usePage().props.auth;
    // console.log(page?.organization?.name);

    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src={appLogo} />
            </div>
            <div className="ml-1 grid flex-1 items-center text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{page?.organization?.name}</span>
                <span className="mb-0.5 text-xs leading-none font-light">{page?.organization?.address}</span>
            </div>
        </>
    );
}
