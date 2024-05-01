import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingWorkoutPage = () => {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <Skeleton className="h-[40px] w-[160px]" />
                <Skeleton className="h-40px w-[100px]" />
            </div>
            <div className="mt-10 grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
                <Skeleton className="max-w-[400px] h-[400px] rounded-lg" />
            </div>
        </div>
    );
};

export default LoadingWorkoutPage;
