import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BiDollar, BiLineChart, BiLineChartDown } from 'react-icons/bi';
import { Skeleton } from './ui/skeleton';

export function SectionCardDashboard({ items, loading }: { items?: { income: number; expense: number; profit: number }; loading: boolean }) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    });

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid auto-rows-min gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-3">
            {loading ? (
                <div className="from-primary/5 to-card flex flex-col items-center gap-2 rounded-md border bg-gradient-to-t p-4 shadow-xs">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ) : (
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Income</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(items?.income ?? 0)}
                        </CardTitle>
                        <CardAction>
                            <BiLineChart size={30} />
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">Total pemasukan</div>
                    </CardFooter>
                </Card>
            )}
            {loading ? (
                <div className="from-primary/5 to-card flex flex-col items-center gap-2 rounded-md border bg-gradient-to-t p-4 shadow-xs">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ) : (
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Expense</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(items?.expense ?? 0)}
                        </CardTitle>
                        <CardAction>
                            <BiLineChartDown size={30} />
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">Total Pengeluaran</div>
                    </CardFooter>
                </Card>
            )}
            {loading ? (
                <div className="from-primary/5 to-card flex flex-col items-center gap-2 rounded-md border bg-gradient-to-t p-4 shadow-xs">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ) : (
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Profit</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {formatter.format(items?.profit ?? 0)}
                        </CardTitle>
                        <CardAction>
                            <BiDollar size={30} />
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">Total Penghasilan</div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
