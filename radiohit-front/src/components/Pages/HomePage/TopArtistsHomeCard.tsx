import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import * as React from "react";
import { Mic2 } from "lucide-react";

const TopArtistsHomeCard = ({ artistsData, isMobileView }) => {
  return (
    <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
      <div className="flex flex-row items-center mb-[1rem] justify-between">
        <h2 className={cn("text-[#373738] font-[600] text-[1.1rem]")}>
          Топ исполнителей
        </h2>
        <Link
          href="/artists"
          className="text-[0.85rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent"
          scroll={false}
        >
          Все артисты
        </Link>
      </div>
      <div className="flex flex-row items-center w-full justify-between">
        {artistsData &&
          artistsData.documents.map((artist, index) => {
            //Hide 2 artists from mobile view
            if (isMobileView) {
              if (index >= 3) {
                return null
              }
            }
            return (
              <Link
                href={`/artists/${artist.$id}`}
                key={artist.$id}
                className="flex flex-col items-center justify-center group"
                scroll={false}
              >
                {/*Arist Image*/}
                <div className="relative h-[6vw] w-[6.5vw] rounded-3xl overflow-hidden bg-gray-300 transition-transform duration-300 group-hover:scale-[1.02] max-md:w-[4rem] max-md:h-[4rem] max-md:rounded-xl min-[800px]:max-[1200px]:!w-[8rem] min-[800px]:max-[1200px]:!h-[8rem]">
                  <Image
                    src={artist.userImageURL}
                    alt="arist_avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover"
                  />
                </div>
                {/*Artist Name*/}
                <p className="mt-[0.5rem] text-[0.9vw] text-slate-600 group-hover:text-mainAccent transition-colors duration-300 whitespace-nowrap max-xl:text-[1rem] max-md:text-[0.8rem]">
                  {artist.name}
                </p>
              </Link>
            );
          })}

        {/*If no Artists data*/}
        {!artistsData && (
          <div className="flex flex-col justify-center w-full">
            <div className="w-full h-[10rem] max-md:h-[50vh] text-slate-400 flex flex-col items-center justify-center align-middle bg-white">
              <Mic2 size={30} strokeWidth={2} />
              <p className="font-[400] text-[1rem] lg:pl-[0.5rem] mt-[0.5rem]">
                Нет популярных артистов
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopArtistsHomeCard;
