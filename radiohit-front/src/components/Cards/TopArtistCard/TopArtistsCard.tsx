import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import * as React from "react";
import { getTopArtists } from "@/lib/appwrite/db_services/artists.db.service";
import { headers } from "next/headers";
import { Music4 } from "lucide-react";

export const revalidate = 200;

const TopArtistsCard = async () => {
  const artistsData = await getTopArtists(6);

  const headersList = await headers();
  //Get device user-agent info
  const userAgent = headersList.get("user-agent");

  //Check if its mobile device
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return (
    <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
      <h2 className={cn("text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]")}>
        Топ артистов
      </h2>
      <div className="flex flex-row items-center w-full justify-between">
        {artistsData &&
          artistsData.documents.map((artist, index) => {
            //Hide 2 artists from mobile view
            if (isMobileView) {
                if (index >= 3) {
                return <React.Fragment key={index}></React.Fragment>;
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
                    quality={100}
                    className="w-full h-full bg-cover object-cover saturate-150 backdrop-saturate-125"
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
              <Music4 size={30} strokeWidth={2} />
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

export default TopArtistsCard;
