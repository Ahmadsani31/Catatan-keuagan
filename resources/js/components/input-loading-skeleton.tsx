import { Skeleton } from './ui/skeleton';

export default function InputLoadingSkeleton({ loop }: { loop: number }) {
    return (
        <div className="flex flex-col space-y-3">
            {Array.from({ length: loop }).map((_, i) => (
                <div className="space-y-2" key={i}>
                    <Skeleton className="h-5 w-[125px] rounded-xl" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
            ))}
        </div>
    );
}