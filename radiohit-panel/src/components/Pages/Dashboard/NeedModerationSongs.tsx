import Link from "next/link";
import {AlertTriangle, Loader2, Music} from "lucide-react";
import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import * as React from "react";

const NeedModerationSongs = ({ needModerationSongs, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full p-[1.2rem] mb-[1.5rem]">
      <h2 className="text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem] pl-[0.5rem]">
        Треки на модерации
      </h2>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && needModerationSongs.documents.length == 0 && (
        <div className='flex flex-col items-center justify-center text-slate-500 gap-[0.5rem] h-[8rem]'>
          <Music strokeWidth={2} size={30}/>
            <p>Нет треков</p>
        </div>
      )}
        {!isLoading && needModerationSongs.documents.length > 0 && (
            <Link href='/moderation' scroll={false} className='flex flex-col items-center justify-center text-slate-500 gap-[0.5rem] h-[8rem] transition-opacity duration-300 hover:opacity-70'>
                <div className='flex flex-col items-center justify-center border-[1px] border-fuchsia-300 rounded-2xl w-full py-[1.2rem] bg-fuchsia-50 text-mainAccent'>
                    <AlertTriangle strokeWidth={2} size={30} className='mb-[0.5rem]'/>
                    <div className='flex flex-col items-center'>
                        <p className=''>{needModerationSongs.documents.length > 20 ? "20+" : needModerationSongs.documents.length} треков</p>
                        <p className=' text-[0.8rem]'>ожидают проверки</p>
                    </div>
                </div>
            </Link>
        )}
    </div>
  );
};
export default NeedModerationSongs;

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[8rem] rounded-2xl text-center align-middle items-center justify-center flex flex flex-col gap-[1rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        <p className="text-slate-500 text-[0.8rem]">Поиск треков...</p>
      </Skeleton>
    </>
  );
};
