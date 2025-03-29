import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils/utils";

const AccountDefaultSkeleton = ({ className = '' }) => {
  return (
    <Skeleton
      className={cn(
        "w-full rounded-2xl h-[70vh] bg-gray-100 text-center align-middle items-center justify-center flex z-10 mt-[1rem] mb-[1.5rem] max-lg:mb-[1.5rem]",
        className
      )}
    >
      <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
    </Skeleton>
  );
};
export default AccountDefaultSkeleton;
