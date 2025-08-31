'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ResponsivePie } from '@nivo/pie';

const data = [
    { id: 'Pertamina', label: 'Pertamina', value: '100000' },
    { id: 'Sewa Kos', label: 'Sewa Kos', value: '1350000' },
    { id: '3', label: 'Hiburan', value: '20' },
    { id: '4', label: 'Lainnya', value: '15' },
];

type itemsProps = {
    id: string;
    label: string;
    value: string;
}[];

type ChartPieProps = {
    pieData: itemsProps;
    onChangeRadio: (e: string) => void;
    value: string;
};

export function ChartPie({ pieData, onChangeRadio, value }: ChartPieProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Transaksi terbanyak bedasarkan kategori</CardTitle>
                <CardDescription className="text-xs">Data bedasarkan transaksi 6 bulan terakhir.</CardDescription>
                <div className="items-center justify-center">
                    <RadioGroup
                        defaultValue="Pemasukan"
                        name="type"
                        className="flex"
                        value={value}
                        onValueChange={(v: 'Pemasukan' | 'Pengeluaran') => onChangeRadio(v)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Pemasukan" id="income" />
                            <Label htmlFor="income">Pemasukan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Pengeluaran" id="expense" />
                            <Label htmlFor="expense">Pengeluaran</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="h-80 w-full items-center justify-center">
                    <ResponsivePie /* or Pie for fixed dimensions */
                        data={pieData}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        padAngle={0.6}
                        cornerRadius={2}
                        innerRadius={0.25}
                        valueFormat={(value) =>
                            new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            }).format(value)
                        }
                        activeOuterRadiusOffset={8}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                        // margin={{ top: 40, right: 150, bottom: 40, left: 40 }}
                        // legends={[
                        //     {
                        //         anchor: 'right',
                        //         direction: 'column',
                        //         translateX: 100,
                        //         itemWidth: 100,
                        //         itemHeight: 18,
                        //         itemsSpacing: 10,
                        //         symbolSize: 18,
                        //         symbolShape: 'circle',
                        //     },
                        // ]}
                    />
                </div>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm"></CardFooter> */}
        </Card>
    );
}
