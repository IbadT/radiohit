import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2 } from "lucide-react";

const HomeLoadingSkeleton = () => {
  return (
    <div className="lg:pl-[1.5rem] lg:pt-[1.2rem] mb-[1.875rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0] max-lg:!mt-0">
      <Skeleton className="w-full rounded-2xl h-[17.5rem] bg-gray-100 text-center align-middle items-center justify-center flex z-[4] mb-[1.5rem] max-lg:mb-[1rem] max-md:h-[10rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
      </Skeleton>
      <Skeleton className="w-full rounded-2xl h-[4.4rem] bg-gray-100 text-center align-middle items-center justify-center flex z-[4] mb-[1.5rem] max-lg:mb-[1rem] max-md:h-[4.5rem] lg:hidden">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
      </Skeleton>
      <Skeleton className="w-full rounded-2xl h-[26.3rem] bg-gray-100 text-center align-middle items-center justify-center flex z-[4] mb-[1.5rem] max-lg:mb-[1rem] max-md:h-[26rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
      </Skeleton>
      <Skeleton className="w-full rounded-2xl h-[11.75rem] bg-gray-100 text-center align-middle items-center justify-center flex z-[4] mb-[1.5rem] max-lg:mb-[1rem] max-md:h-[26rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
      </Skeleton>
    </div>
  );
};
export default HomeLoadingSkeleton;
