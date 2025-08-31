import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type pageProps = {
    children: React.ReactNode;
    text: string;
    side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
};

export default function AddTooltip({ children, text, side = 'top' }: pageProps) {
    return (
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent side={side}>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
}
