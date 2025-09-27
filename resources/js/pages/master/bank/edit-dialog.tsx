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
    bank: {
        id: number;
        name: string;
        alias: string;
        amount: number;
        account_number: string;
        status: string;
        created_at: string;
    };
};

type propsForm = {
    name: string;
    alias: string;
    account_number: string;
    status: string;
    _method: string;
};

export default function EditDialog({ open, onOpenChange, bank }: propsModal) {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<Required<propsForm>>({
        name: bank.name ?? '',
        alias: bank.alias ?? '',
        account_number: bank.account_number ?? '',
        status: bank.status ?? '',
        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.bank.update', [bank]), {
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
        { value: 'Aktif', label: 'ACTIVE' },
        { value: 'Tidak Aktif', label: 'INACTIVE' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[625px]"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Bank</DialogTitle>
                        <DialogDescription>Buat data bank baru disini, klik simpan setelah selesai.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <TextInput
                            title="Name"
                            type="name"
                            placeholder="Nama bank"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors.name}
                            autoFocus={true}
                        />
                        <TextInput
                            title="Alias"
                            type="text"
                            placeholder="Singkat nama bank / alias"
                            value={data.alias}
                            onChange={(e) => setData('alias', e.target.value)}
                            errors={errors.alias}
                        />
                        <TextInput
                            title="Nomor Rekening"
                            type="number"
                            placeholder="Nomor akun / rekening bank (opsional)"
                            value={data.account_number}
                            onChange={(e) => setData('account_number', e.target.value)}
                            errors={errors.account_number}
                        />
                        <FormSelect
                            id="status"
                            title="Status"
                            dataValue={options}
                            value={data.status}
                            onValueChange={(value) => setData('status', value)}
                            placeholder="Pilih Status"
                            errors={errors.status}
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
