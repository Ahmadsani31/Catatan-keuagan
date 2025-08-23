import FormSelect from '@/components/form-select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { NumericFormat } from 'react-number-format';
import FormDatePicker from '../form-date-picker';
import FormTextarea from '../form-textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import FormInputFile from '../form-input-file';

type propsModal = {
    open: boolean;
    onOpenChange: (e: boolean) => void;
    kreditur: [];
};

type propsForm = {
    amount: string;
    payment_method: string;
    note: string;
    file_image: File | null;
    date: string;
};

export default function ModalKrediturTransaction({ open, onOpenChange, kreditur }: propsModal) {
    // const [open, setOpen] = useState<boolean>(false);
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<Required<propsForm>>({
        amount: '',
        payment_method: '',
        note: '',
        file_image: null,
        date: format(new Date(), 'yyyy-MM-dd'),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('krediturs.payment.store', [kreditur]), {
            onSuccess: (page) => {
                reset();
                onOpenChange(false);
            },
        });
    };

    const handleCloseModal = () => {
        clearErrors();
        reset();
        onOpenChange(false);
    };

    const options = [
        { value: 'CASH', label: 'Cash' },
        { value: 'TRANSFER', label: 'Transfer' },
    ];

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pembayaran</DialogTitle>
                        <DialogDescription>Buat pembayaran baru untuk kreditur disini, klik simpan setelah selesai.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <FormDatePicker
                            id="date"
                            title="Tanggal"
                            onSelect={(value) => setData('date', value)}
                            errors={errors.date}
                            value={data.date}
                            placeholder="Pilih tanggal"
                            modal={true}
                        />
                        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
                            <div className="grid w-full items-center">
                                <Label htmlFor={'harga'} className="mb-2">
                                    Nominal
                                </Label>
                                <NumericFormat
                                    id="harga"
                                    className={cn(errors.amount ? 'border-red-500' : '')}
                                    value={data.amount}
                                    allowLeadingZeros
                                    onValueChange={(e) => setData('amount', e.value)}
                                    thousandSeparator=","
                                    prefix="Rp. "
                                    placeholder="Nominal"
                                    customInput={Input}
                                />
                                {errors.amount && <p className="m-0 text-sm text-red-500">{errors.amount}</p>}
                            </div>
                            <FormSelect
                                id="payment_method"
                                title="Metode Pembayaran"
                                dataValue={options}
                                value={data.payment_method}
                                onValueChange={(value) => setData('payment_method', value)}
                                placeholder="Pilih metode pembayaran"
                                errors={errors.payment_method}
                            />
                        </div>
                        <FormInputFile
                            id="file_image"
                            title="Bukti pembayaran (opsional)"
                            onChange={(e) => setData('file_image', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                            ref={fileInputCover}
                            errors={errors.file_image}
                        />
                        <FormTextarea
                            id="note"
                            title="Keterangan"
                            placeholder="Keterangan (opsional)..."
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            errors={errors.note}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" size={'lg'} variant={'outline'} onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button type="submit" size={'lg'} disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
