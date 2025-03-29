import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2 } from "lucide-react";
import * as React from "react";

const AccountMenuSkeleton = () => {
  return (
    <Skeleton className="w-full rounded-2xl max-lg:hidden h-[61px] bg-gray-100 text-center align-middle items-center justify-center flex">
      <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
    </Skeleton>
  );
};
export default AccountMenuSkeleton;
