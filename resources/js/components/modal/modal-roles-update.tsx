import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import TextInput from '../textInput';
import { Button } from '../ui/button';

type propsModal = {
    roles?: {
        id: number;
        name: string;
    };
    open: boolean;
    onOpenChange: (e: boolean) => void;
};

type propsForm = {
    id: number;
    name: string;
};

export default function ModalRolesUpdate({ open, onOpenChange, roles }: propsModal) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<propsForm>>({
        id: roles?.id ?? 0,
        name: roles?.name ?? '',
    });

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Roles</DialogTitle>
                        <DialogDescription>Edit your roles name. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <TextInput
                            title="Name"
                            type="text"
                            placeholder="Nama permission"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors.name}
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
            </DialogContent>
        </Dialog>
    );
}
