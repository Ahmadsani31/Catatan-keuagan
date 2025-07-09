import { Card, CardAction, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { ComponentType, createElement } from 'react';

export function SectionCards({ name, icon, value, className }: { name: string; icon: ComponentType; value: string; className: string }) {
    return (
        <Card className={cn('@container/card', className)}>
            <CardHeader>
                <CardDescription>{name}</CardDescription>
                <CardAction>{icon && createElement(icon)}</CardAction>
            </CardHeader>
            <CardFooter className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardFooter>
        </Card>
    );
}
