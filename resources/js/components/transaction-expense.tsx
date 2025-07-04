import { useForm } from "@inertiajs/react";
import FormTextarea from "./form-textarea";
import TextInput from "./textInput";
import { FormEventHandler } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import FormInput from "./form-input";
import ReactSelect from "./react-select";

export default function TransactionExpense({ categoryExpense }: any) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<any>>({
        id: 0,
        type: '',
        amount: '',
        keterangan: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // return
        post(route('master.categories.store'), {
            onSuccess: page => {

            },
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <ReactSelect
                    id='type'
                    title='Katagori'
                    dataValue={categoryExpense}
                    value={data.type}
                    onValueChange={(value) => setData('type', value)}
                    placeholder='Pilih jenis transaksi'
                    errors={errors.type}
                />
                <FormInput
                    id="amount"
                    title="Harga"
                    type="number"
                    placeholder='Harga'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    errors={errors.name}
                />

                <FormTextarea
                    id='keterangan'
                    title="Keterangan"
                    placeholder='Keterangan...'
                    value={data.keterangan}
                    onChange={(e) => setData('keterangan', e.target.value)}
                    errors={errors.keterangan}
                />
            </div>
            <div className='flex justify-end mt-4'>
                <Button type='button' variant={'outline'} size={'lg'}>
                    Close
                </Button>
                <Button type='submit' size={'lg'} disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </div>
        </form>
    )
}