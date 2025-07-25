// components/DashboardCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DashboardCardProps = {
    title: string;
    value: string;
    icon?: React.ReactNode;
    className?: string;
};

export function DashboardCard({ title, value, icon, className }: DashboardCardProps) {
    return (
        <Card className={`w-full ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
