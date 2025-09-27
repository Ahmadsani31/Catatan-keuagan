import FormSelect from '@/components/form-select';
import TextInput from '@/components/textInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type propsModal = {
    open: boolean;
    onOpenChange: (e: boolean) => void;
};

type propsForm = {
    name: string;
    type: string;
    _method: string;
};

export default function CreateDialog({ open, onOpenChange }: propsModal) {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<Required<propsForm>>({
        name: '',
        type: '',
        _method: 'POST',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.categories.store'), {
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
        { value: 'Pemasukan', label: 'Pemasukan' },
        { value: 'Pengeluaran', label: 'Pengeluaran' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Kategori</DialogTitle>
                        <DialogDescription>Buat data kategori baru disini, klik simpan setelah selesai.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <FormSelect
                            id="type"
                            title="Type"
                            dataValue={options}
                            value={data.type}
                            onValueChange={(value) => setData('type', value)}
                            placeholder="Pilih jenis transaksi"
                            errors={errors.type}
                        />
                        <TextInput
                            title="Name"
                            type="text"
                            placeholder="Nama kategory"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors.name}
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
