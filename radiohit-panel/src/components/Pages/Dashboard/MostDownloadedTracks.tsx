import * as React from "react";
import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import {ChartPie, ChevronRight, Download, Loader2, Music} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";

const MostDownloadedTracks = ({ isLoading, topSongsByDownloads }) => {
  const tracksOnlyWidthData =
    !isLoading &&
    topSongsByDownloads.documents.filter(
      (el) => el.whoDownloadIDandDateTime.length != 0
    );
  const filterTracksByDownloads =
    !isLoading &&
    tracksOnlyWidthData.sort(
      (a, b) =>
        b.whoDownloadIDandDateTime.length - a.whoDownloadIDandDateTime.length
    );
  return (
    <div className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col px-[1.2rem] pt-[1.2rem] pb-[1.2rem] w-full">
      <div className="flex flex-col h-full">
        <h2 className="text-[#373738] font-[600] text-[1.1rem] pl-[0.5rem]">
          Топ треков по скачиванию
        </h2>
        <p className="text-gray-500 text-[0.9rem] font-[300] pl-[0.5rem] mb-[0.5rem]">
          Самые скачиваемые треки
        </p>

        {isLoading && <LoadingSkeleton />}
        {!isLoading &&
          topSongsByDownloads &&
          filterTracksByDownloads.map((song, index) => {
            if (index <= 4) {
              return (
                <Link
                  href={`/songs/${song.$id}`}
                  key={song.$id}
                  className={cn(
                    "w-full flex flex-row items-center justify-between group rounded-xl transition colors duration-300 hover:bg-fuchsia-50 px-[0.5rem] py-[0.5rem]",
                    index == 4 && "mb-0"
                  )}
                >
                  <div className="flex flex-row items-center gap-[0.8rem]">
                    {/*<p className='text-[0.8rem] text-gray-500'>#{index + 1}</p>*/}
                    <div className="relative w-[3rem] h-[3rem] overflow-hidden rounded-xl min-[1200px]:max-[1400px]:w-[2.5rem] min-[1200px]:max-[1400px]:h-[2.5rem]">
                      <Image
                        src={song.trackImageURL}
                        alt="avatar"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="w-full h-full bg-cover object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <p className="text-[#131414] min-[1200px]:max-[1500px]:text-[0.8rem] line-clamp-1 group-hover:text-mainAccent transition-colors duration-300">
                        {song.trackSongName}
                      </p>
                      <div className="flex flex-row items-center gap-[0.4rem]">
                        <p className="text-[#ACACAD] text-[0.8rem] duration-300 transition-all hover:text-mainAccent relative line-clamp-1 flex flex-row items-center gap-[0.4rem]">
                          {song.trackArtistName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-[2rem]">
                    <p className="text-[#ACACAD] text-[1rem] duration-300 transition-all hover:text-mainAccent relative line-clamp-1 flex flex-row items-center gap-[0.4rem]">
                      <Download
                        strokeWidth={1.2}
                        size={16}
                        className="text-gray-500"
                      />
                      {song.whoDownloadIDandDateTime.length}
                    </p>
                    <ChevronRight
                      strokeWidth={1.2}
                      className="text-gray-500 group-hover:text-mainAccent transition-colors duration-300"
                    />
                  </div>
                </Link>
              );
            }
          })}

        {!isLoading &&
        topSongsByDownloads && (
                <div className='flex flex-col items-center justify-center text-slate-500 gap-[0.5rem] h-full w-full'>
                  <ChartPie strokeWidth={2} size={30}/>
                  <p>Нет статистики</p>
                </div>
            )}
      </div>
    </div>
  );
};
export default MostDownloadedTracks;

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[32vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex mt-[0.6rem] flex flex-col gap-[1rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        <p className="text-slate-500 text-[0.8rem]">Загрузка исполнителей...</p>
      </Skeleton>
    </>
  );
};
