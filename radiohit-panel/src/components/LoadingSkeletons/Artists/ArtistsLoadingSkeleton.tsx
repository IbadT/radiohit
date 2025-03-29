import {Skeleton} from "@/components/LoadingSkeletons/SkeletonPrimitive";
import * as React from "react";


const ArtistsLoadingSkeleton = () => {
    return (
        <>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
            <Skeleton className='h-[10rem] rounded-2xl mb-[1rem]'/>
        </>
    );
}
export default ArtistsLoadingSkeleton
