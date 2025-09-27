'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-6">
                    <CardTitle>Transaksi terbanyak bedasarkan kategori</CardTitle>
                    <CardDescription className="text-xs">Data bedasarkan transaksi 6 bulan terakhir.</CardDescription>
                </div>
                <div className="flex">
                    {['Pemasukan', 'Pengeluaran'].map((key) => {
                        return (
                            <button
                                key={key}
                                data-active={value === key}
                                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 cursor-pointer flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => onChangeRadio(key)}
                            >
                                <span className="font-bold">{key}</span>
                            </button>
                        );
                    })}
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
                    />
                </div>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm"></CardFooter> */}
        </Card>
    );
}
