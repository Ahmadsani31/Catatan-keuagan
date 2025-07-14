import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BiDollar, BiLineChart, BiLineChartDown } from 'react-icons/bi';

export function SectionCardDashboard() {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid auto-rows-min gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-3">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Income</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Rp.10,300,250.00</CardTitle>
                    <CardAction>
                        <BiLineChart size={30} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">Total pemasukan</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Expense</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Rp.1,250.00</CardTitle>
                    <CardAction>
                        <BiLineChartDown size={30} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">Total Pengeluaran</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Profit</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Rp.423,250.00</CardTitle>
                    <CardAction>
                        <BiDollar size={30} />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">Total Penghasilan</div>
                </CardFooter>
            </Card>
        </div>
    );
}
