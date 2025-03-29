import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import * as React from "react";
import HomePopularTracksCardInner from "@/components/Pages/HomePage/HomePopularTracksCardInner";
import { Music4 } from "lucide-react";


const HomePopularTracksCard = ({popularSongs}) => {
  return (
    <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-0 max-lg:mb-[1rem]">
      <div className="flex flex-row items-center mb-[1rem] justify-between">
        <h2 className={cn("text-[#373738] font-[600] text-[1.1rem]")}>
          Популярные треки
        </h2>
        <Link
            scroll={false}
          href="/songs"
          className="text-[0.85rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent"
        >
          Все треки
        </Link>
      </div>
      <div className="w-full">
        {popularSongs &&
          popularSongs.documents.map((song, index) => {
            return (
              <HomePopularTracksCardInner
                key={song.$id}
                song={song}
                index={index}
              />
            );
          })}
        {!popularSongs && (
          <div className="flex flex-col justify-center w-full">
            <div className="w-full h-[10rem] max-md:h-[50vh] text-slate-400 flex flex-col items-center justify-center align-middle bg-white">
              <Music4 size={30} strokeWidth={2} />
              <p className="font-[400] text-[1rem] lg:pl-[0.5rem] mt-[0.5rem]">
                Нет популярных треков
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePopularTracksCard;
