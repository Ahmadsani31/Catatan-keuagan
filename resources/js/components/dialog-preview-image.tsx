import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Maximize2, Minimize2, Minus, Plus, X } from 'lucide-react';
import * as React from 'react';
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';

// ------------------------------------------------------------
// DialogPreviewImage (with touch pinch-zoom & mouse panning)
// ------------------------------------------------------------
// - Dibangun dari fungsi awal Anda
// - Tambah pinch-zoom (touch), mouse drag pan, wheel zoom
// - Kontrol zoom (in/out/reset) + toggle fit (contain vs actual)
// - Loading skeleton & error state
// ------------------------------------------------------------

export default function DialogPreviewImage({
    url_image,
    size,
    title,
    description,
}: {
    url_image: string;
    size: string; // contoh: "h-20 w-20"
    title: string;
    description: string;
}) {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hadError, setHadError] = React.useState(false);
    const [fitMode, setFitMode] = React.useState<'contain' | 'actual'>('contain');
    const [percent, setPercent] = React.useState(100);

    const apiRef = React.useRef<ReactZoomPanPinchRef | null>(null);

    const onOpenChange = (v: boolean) => {
        setOpen(v);
        if (v) {
            // reset setiap dibuka
            setIsLoading(true);
            setHadError(false);
            setFitMode('contain');
            setPercent(100);
            // reset transform saat sudah mount wrapper (next frame)
            setTimeout(() => apiRef.current?.resetTransform(), 0);
        }
    };

    const zoomIn = () => apiRef.current?.zoomIn();
    const zoomOut = () => apiRef.current?.zoomOut();
    const resetZoom = () => {
        apiRef.current?.resetTransform();
        setPercent(100);
    };
    const toggleFit = () => {
        setFitMode((m) => (m === 'contain' ? 'actual' : 'contain'));
        // Setelah ganti mode, pusatkan & reset supaya sesuai tampilan
        setTimeout(() => apiRef.current?.resetTransform(), 0);
    };

    if (!url_image) {
        return (
            <Avatar>
                <AvatarFallback>NO</AvatarFallback>
            </Avatar>
        );
    }

    const Controls = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
            <>
                <button onClick={() => zoomIn()}>Zoom In</button>
                <button onClick={() => zoomOut()}>Zoom Out</button>
                <button onClick={() => resetTransform()}>Reset</button>
            </>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <img
                    src={url_image}
                    alt={title || 'preview'}
                    className={`cursor-pointer rounded border object-cover ${size}`}
                    onError={() => setHadError(true)}
                />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] md:max-w-[768px] [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-between text-base sm:text-lg lg:flex-row">
                        <span className="truncate">{title || 'Image preview'}</span>
                        <div className="flex items-center gap-2">
                            {!hadError && (
                                <a href={url_image} download target="_blank" rel="noreferrer" aria-label="Download image">
                                    <Button variant="secondary" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            <Button variant="secondary" size="icon" onClick={toggleFit} aria-label="Toggle fit">
                                {fitMode === 'contain' ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                            </Button>
                            <Button variant="secondary" size="icon" onClick={zoomOut} aria-label="Zoom out">
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="sm" onClick={resetZoom} aria-label={`Reset zoom to 100%, current ${percent}%`}>
                                {percent}%
                            </Button>
                            <Button variant="secondary" size="icon" onClick={zoomIn} aria-label="Zoom in">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => onOpenChange(false)} aria-label="Close">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogTitle>
                    {description ? <DialogDescription className="text-xs sm:text-sm">{description}</DialogDescription> : null}
                </DialogHeader>
                <div className="max-h-[80vh] overflow-y-auto">
                    <TransformWrapper
                        ref={apiRef}
                        initialScale={1}
                        minScale={0.25}
                        maxScale={4}
                        doubleClick={{ disabled: false }}
                        wheel={{ disabled: false }}
                        pinch={{ disabled: false }}
                        panning={{ disabled: false }}
                        // update persen saat transform berubah
                        onTransformed={(ref) => {
                            const s = Math.round(ref.state.scale * 100);
                            setPercent(s);
                        }}
                    >
                        <div className="flex w-full items-center justify-center bg-gray-50">
                            <TransformComponent
                                wrapperStyle={{ width: '100%', height: '100%' }}
                                contentStyle={{ width: 'fit-content', height: 'fit-content' }}
                            >
                                <img
                                    src={url_image}
                                    alt={title || 'preview'}
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => setHadError(true)}
                                    className="select-none"
                                    style={{
                                        maxWidth: fitMode === 'contain' ? 'min(100%, 1200px)' : undefined,
                                        maxHeight: fitMode === 'contain' ? '70vh' : undefined,
                                        objectFit: fitMode === 'contain' ? 'contain' : undefined,
                                        // TransformWrapper mengurus scale & translate
                                    }}
                                    draggable={false}
                                />
                            </TransformComponent>
                        </div>
                    </TransformWrapper>
                </div>
            </DialogContent>
        </Dialog>
    );
}
