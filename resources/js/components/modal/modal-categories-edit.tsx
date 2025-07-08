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
import FormLoadingSkeleton from "../form-loading-skeleton";

type propsModal = {
    category?: {
        id: number,
        name: string,
        type: string,
    },
    open: boolean,
    onOpenChange: (e: boolean) => void,
}

type propsForm = {
    id: number,
    name: string,
    type: string,
}

export default function ModalCategoriesEdit({ open, onOpenChange, category }: propsModal) {
    const [loading, setLoading] = useState<boolean>(false);
    const [transaksiType, setTransaksiType] = useState([]);

    const { data, setData, put, processing, errors, clearErrors, reset } = useForm<Required<propsForm>>({
        id: Number(category),
        name: '',
        type: '',
    });

    useEffect(() => {
        async function fetchType() {
            setLoading(true)
            try {
                const response = await axios.get(route('master.categories.edit', [category]));
                const param = response.data;
                setTransaksiType(param.page_data.categoryType)
                setData('name', param.category.name)
                setData('type', param.category.type)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        fetchType()
    }, [category])



    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        put(route('master.categories.update', [category]), {
            onSuccess: page => {
                reset();
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
                <DialogHeader>
                    <DialogTitle>Edit Kategori</DialogTitle>
                    <DialogDescription>
                        Edit data kategori disini, klik update setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {loading ? <FormLoadingSkeleton loop={2} /> : (
                        <>
                            <div className="grid gap-4 mb-4">
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
                                <Button type='button' size={'lg'} variant={'outline'} onClick={handleCloseModal}>Close</Button>
                                <Button type='submit' size={'lg'} disabled={processing}>
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                </form>
            </DialogContent>
        </Dialog>
    )
}