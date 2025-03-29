import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import * as React from "react";
import {Loader2} from "lucide-react";

const ArtistsDetailsTracksLoadingSkeleton = () => {
  return <Skeleton className="h-[70vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex" >
    <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />

  </Skeleton>;
};
export default ArtistsDetailsTracksLoadingSkeleton;
