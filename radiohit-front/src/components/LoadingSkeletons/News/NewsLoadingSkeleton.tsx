import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import * as React from "react";

const NewsLoadingSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[22vw] rounded-2xl mb-[1rem] bg-gray-200 max-xl:h-[24rem] max-md:h-[16rem]" />
      <Skeleton className="h-[22vw] rounded-2xl mb-[1rem] bg-gray-200 max-xl:h-[24rem] max-md:h-[16rem]" />
      <Skeleton className="h-[22vw] rounded-2xl mb-[1rem] bg-gray-200 max-xl:h-[24rem] max-md:h-[16rem]" />
      <Skeleton className="h-[22vw] rounded-2xl mb-[1rem] bg-gray-200 max-xl:h-[24rem] max-md:h-[16rem]" />
      <Skeleton className="h-[22vw] rounded-2xl mb-[1rem] bg-gray-200 max-xl:h-[24rem] max-md:h-[16rem]" />
    </>
  );
};

export default NewsLoadingSkeleton;
