import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2 } from "lucide-react";
import * as React from "react";

const AccountUserCardSkeleton = () => {
  return (
    <Skeleton className="w-full rounded-2xl h-[130px] bg-gray-100 text-center align-middle items-center justify-center flex mt-[1rem] max-lg:mt-0 max-lg:h-[188px] max-sm:h-[154px]">
      <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
    </Skeleton>
  );
};
export default AccountUserCardSkeleton;
