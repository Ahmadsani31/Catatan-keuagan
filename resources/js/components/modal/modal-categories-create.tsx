import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormSelect from "@/components/form-select";
import TextInput from "@/components/textInput";
import { Button } from "@/components/ui/button";
import { FormEventHandler, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { flashMessage } from "@/lib/utils";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "axios";

type propsModal = {

    open: boolean,
    onOpenChange: (e: boolean) => void,
}

type propsForm = {
    id: number,
    name: string,
    type: string,
}

export default function ModalCategoriesCreate({ open, onOpenChange }: propsModal) {
    // const [open, setOpen] = useState<boolean>(false);
    const [transaksiType, setTransaksiType] = useState([]);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<Required<propsForm>>({
        id: 0,
        name: '',
        type: '',
    });

    useEffect(() => {
        async function fetchType() {
            try {
                const response = await axios.get(route('master.categories.type'));
                console.log(response.data);
                setTransaksiType(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchType()
        reset()
    }, [open])



    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.categories.store'), {
            onSuccess: page => {
                reset('name');
                onOpenChange(false);
                const flash = flashMessage(page)
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
            },
        });
    };


    const handleCloseModal = () => {
        clearErrors();
        reset();
        onOpenChange(false);
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Category</DialogTitle>
                        <DialogDescription>
                            Make your categories name. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4">
                        <FormSelect
                            id='type'
                            title='Type'
                            dataValue={transaksiType}
                            value={data.type}
                            onValueChange={(value) => setData('type', value)}
                            placeholder='Pilih jenis transaksi'
                            errors={errors.type}
                        />
                        <TextInput
                            title="Name"
                            type="text"
                            placeholder='Nama kategory'
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