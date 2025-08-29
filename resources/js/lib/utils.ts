import { type ClassValue, clsx } from 'clsx';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function flashMessage(params: any) {
    return params.props.flash_message;
}

interface FlashMessage {
    type: 'success' | 'error';
    message: string;
}

interface FlashParams {
    props: {
        flash_message: FlashMessage;
    };
}

export const progressToast = (params: FlashParams): void => {
    const flash = params.props.flash_message;
    console.log(flash);

    if (flash.type == 'success') toast.success(flash.message);
    if (flash.type == 'error') toast.error(flash.message);
};

export const CATEGORYSTATUS = {
    INCOME: 'Pemasukan',
    EXPENSE: 'Pengeluaran',
    DEBT: 'Hutang',
};

export const KREDITURSTATUS = {
    TERHUTANG: 'Terhutang',
    LUNAS: 'Lunas',
};
