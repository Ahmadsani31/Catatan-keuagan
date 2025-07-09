import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function DialogPreviewImage({ url_image, size }: { url_image: string; size: string }) {
    if (!url_image) {
        return (
            <Avatar>
                <AvatarFallback>NO</AvatarFallback>
            </Avatar>
        );
    }

    return (
        <Dialog>
            <DialogTrigger className="">
                <img src={url_image} className={`object-cover ${size} cursor-pointer rounded border`} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gambar transaksi</DialogTitle>
                    <DialogDescription>detail data gambar transaksi</DialogDescription>
                    <div className="h-[calc(100vh-200px)] overflow-auto">
                        <img src={url_image} className="object-cover" />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
