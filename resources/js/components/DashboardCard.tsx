// components/DashboardCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, ShoppingCart } from "lucide-react"

type DashboardCardProps = {
    title: string
    value: string
    icon?: React.ReactNode
    className?: string
}

export function DashboardCard({ title, value, icon, className }: DashboardCardProps) {
    return (
        <Card className={`w-full ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
