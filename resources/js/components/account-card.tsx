import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import EditDialog from '@/pages/master/bank/edit-dialog';
import { Edit3Icon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ItemsData {
    id: number;
    name: string;
    alias: string;
    amount: number;
    account_number: string;
    status: string;
    created_at: string;
}

function CreditCardItem({ card }: { card: ItemsData }) {
    const [open, setOpen] = useState<boolean>(false);

    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
    return (
        <>
            <Card
                className={cn(
                    'w-full max-w-[460px] overflow-hidden rounded-2xl shadow-lg',
                    card.status == 'Aktif' ? 'bg-gradient-to-br from-blue-800 to-purple-800 text-white' : 'bg-gray-500 text-gray-800',
                )}
            >
                <CardContent className="flex h-48 flex-col justify-between px-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-lg font-semibold tracking-widest">{card.name}</span>
                            <p className="font-medium">{card.alias}</p>
                        </div>
                        <Badge variant={card.status == 'Aktif' ? 'default' : 'destructive'}>{card.status}</Badge>
                    </div>
                    <div>
                        <span className="text-sm opacity-70">Nominal</span>
                        <h2 className="mb-3 text-2xl tracking-widest">{currencyFormatter.format(card.amount ?? 0)}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-70">Nomor Rekening / Nomor Akun</p>
                            <p className="text-lg tracking-widest">{card.account_number ?? '-'}</p>
                        </div>
                        <div className="text-right">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-white text-white hover:bg-white hover:text-black"
                                onClick={() => setOpen(true)}
                            >
                                <Edit3Icon className="text-black" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {open && <EditDialog open={open} onOpenChange={setOpen} bank={card} />}
        </>
    );
}

export default function AccountCard({ items }: { items: ItemsData[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.length > 0 ? (
                items.map((card) => <CreditCardItem key={card.id} card={card} />)
            ) : (
                <Card className="border-muted-foreground/30 bg-muted/10 col-span-full max-w-[460px] border-2 border-dashed text-center">
                    <CardContent className="flex h-48 items-center justify-center p-10">
                        <p className="text-muted-foreground">Belum ada data, tekan tombol tambah untuk membuat data</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
