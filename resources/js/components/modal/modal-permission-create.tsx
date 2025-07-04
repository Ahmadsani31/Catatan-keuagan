import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import TextInput from "../textInput";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type propsModal = {
    open: boolean,
    onOpenChange: (e: boolean) => void,
}

type propsForm = {
    id: number,
    name: string,
}

export default function ModalPermissionCreate({ open, onOpenChange }: propsModal) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<propsForm>>({
        id: 0,
        name: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('permission.store'), {
            onSuccess: page => {
                reset('name');
                onOpenChange(false);
            },
        });
    };

    const handleCloseModal = () => {
        reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Permission</DialogTitle>
                        <DialogDescription>
                            Make your permission name. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <TextInput
                            title="Name"
                            type="text"
                            placeholder='Nama permission'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors.name}
                        />
                    </div>
                    <DialogFooter>
                        <Button type='button' size={'lg'} variant={'outline'} onClick={handleCloseModal}>Cancel</Button>
                        <Button type='submit' size={'lg'} disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}