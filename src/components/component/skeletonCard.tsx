import { Skeleton } from "./ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="w-[328px] h-[304px] rounded-xl bg-[#171719]" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-[#171719]" />
                <Skeleton className="h-4 w-[200px] bg-[#171719]" />
            </div>
        </div>
    )
}
