import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import FormLoadingSkeleton from '../form-loading-skeleton';
import FormSelect from '../form-select';
import { Button } from '../ui/button';

type propsModal = {
    user?: {
        id: number;
        name: string;
        role: string;
    };
    open: boolean;
    onOpenChange: (e: boolean) => void;
};

type propsForm = {
    id: number;
    name: string;
    role: string;
};

export default function ModalUserAssignRoles({ open, onOpenChange, user }: propsModal) {
    const [loading, setLoading] = useState<boolean>(false);
    const { data, setData, put, processing, errors, reset } = useForm<Required<propsForm>>({
        id: user?.id ?? 0,
        name: user?.name ?? '',
        role: user?.role ?? '',
    });

    // const [valuesRoles, setValuesRoles] = useState({
    //     value: '',
    //     label: '',
    // });
    const [valuesRoles, setValuesRoles] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        async function fetchType() {
            setLoading(true);
            try {
                const response = await axios.get(route('roles.all'));
                const eachRoles = response.data.roles;
                setValuesRoles(
                    eachRoles.map((r: { id: number | string; name: string }) => ({
                        value: r.name,
                        label: r.name,
                    })),
                );

                // setData('name', param.roles.name);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchType();
    }, [user]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('roles.update'), {
            onSuccess: (page) => {
                reset('name');
                onOpenChange(false);
            },
        });
    };

    const handleCloseModal = () => {
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
                <DialogHeader>
                    <DialogTitle>Set Roles</DialogTitle>
                    <DialogDescription>Set your roles name. Click save when you're done.</DialogDescription>
                </DialogHeader>
                {loading ? (
                    <FormLoadingSkeleton loop={1} />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2 py-4">
                            <FormSelect
                                id="roles"
                                title="Roles User"
                                dataValue={valuesRoles}
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                                placeholder="Pilih jenis transaksi"
                                errors={errors.role}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" size={'lg'} variant={'outline'} onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button type="submit" size={'lg'} disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
