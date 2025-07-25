import React from 'react';

interface propsPage {
    title: string;
    subtitle: string;
    icon: React.ElementType;
}

export default function HeaderTitle({ title, subtitle, icon: Icon }: propsPage) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-x-1">
                <Icon className="size-6" />
                <h1 className="text-lg font-bold lg:text-2xl">{title}</h1>
            </div>
            <p className="text-muted-foreground text-sm font-medium">{subtitle}</p>
        </div>
    );
}
