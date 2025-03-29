"use client";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn } from "@/lib/utils/utils";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import { Loader2, MoveRight, Pause, Star, User2} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Badge } from "@/components/ui/Badge/badge";
import noimage from "../../../../public/assets/images/no_image.jpg";

const ModerationPaginatedCard = ({ song, refetch }) => {
    const {
        setSingleTrackData,
        singleTrackData,
        stopped,
        paused,
        playing,
        isAudioLoading,
    } = usePlayer();

    const createdDate = new Date(song.$createdAt).toLocaleDateString("ru-RU");


    return (
      <div
        className={cn(
          "flex flex-row bg-white px-[1rem] py-[0.6rem] justify-between items-center transition-all duration-300 max-md:mt-0 max-md:px-[0.5rem] rounded-2xl mb-[1rem] border-[1px] border-mainBorderColor hover:border-fuchsia-300",
          singleTrackData &&
            singleTrackData.trackURL == song.trackURL &&
            "bg-fuchsia-50 border-fuchsia-300"
        )}
      >
        <div
          className="flex flex-row items-center w-[40%] min-[1200px]:max-[1400px]:w-[40%] min-[1400px]:max-[1550px]:w-[40%] max-md:w-full cursor-pointer"
          onMouseUp={() => setSingleTrackData(song)}
        >
          <div
            className={cn(
              "relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]",
              singleTrackData &&
                singleTrackData.trackURL == song.trackURL &&
                "bg-white"
            )}
          >
            {singleTrackData &&
              singleTrackData.trackURL == song.trackURL &&
              playing && (
                <AudioAnimation
                  className="z-[2]"
                  fill={undefined}
                  svgClassName={undefined}
                />
              )}
            {singleTrackData &&
              singleTrackData.trackURL == song.trackURL &&
              isAudioLoading && (
                <div className="flex flex-col items-center align-middle justify-center w-full h-full mx-auto">
                  <Loader2
                    strokeWidth={1}
                    className="h-[1.5rem] w-[1.5rem] animate-spin text-mainAccent !z-[2]"
                  />
                </div>
              )}

            {singleTrackData &&
              singleTrackData.trackURL == song.trackURL &&
              stopped && (
                <Image
                  src={song.trackImageURL !== "-" ? song.trackImageURL : noimage}
                  alt="avatar"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full bg-cover object-cover"
                />
              )}
            {singleTrackData &&
              singleTrackData.trackURL == song.trackURL &&
              paused &&
              !stopped && (
                <div className="flex flex-col items-center align-middle justify-center w-full h-full mx-auto">
                  <Pause
                    strokeWidth={0}
                    fill="#a21caf"
                    className="z-[2] text-[#4B8EEF]"
                  />
                </div>
              )}
            {singleTrackData && singleTrackData.trackURL != song.trackURL && (
              <Image
                src={song.trackImageURL !== "-" ? song.trackImageURL : noimage}
                alt="avatar"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="w-full h-full bg-cover object-cover"
              />
            )}
            {!singleTrackData && (
              <Image
                src={song.trackImageURL !== "-" ? song.trackImageURL : noimage}
                alt="avatar"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="w-full h-full bg-cover object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-[#131414] min-[1200px]:max-[1400px]:text-[0.9rem] line-clamp-1">
              {song.trackSongName}
            </p>
            <div className="flex flex-row items-center gap-[0.8rem]">
              <p className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative line-clamp-1">
                {createdDate}
              </p>
              <p className="text-[#ACACAD] text-[0.8rem] duration-300 transition-all hover:text-mainAccent relative line-clamp-1 flex flex-row items-center gap-[0.4rem]">
                <Star strokeWidth={1.2} size={14} className="text-gray-500" />
                {song.trackPopularity}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full max-md:hidden">
          <div className="flex flex-row w-full justify-start gap-[1.5rem] items-center">
            <Link
              scroll={false}
              href={`/artists/${song.trackArtistID}`}
              className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] text-gray-500 font-[300] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.8rem]"
            >
              <User2 strokeWidth={1.8} size={18} className="mr-[0.5rem]" />{" "}
              {song.trackArtistName}
            </Link>
          </div>

          <div className="flex w-full justify-start">
            <div className="flex w-full justify-start">
              <div className="flex flex-row items-center">
                <div className="flex justify-start mr-[3rem] max-md:hidden w-[10rem]">
                  <Badge className="whitespace-nowrap bg-orange-100 border-orange-300 text-orange-500">
                    Необходима модерация
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/songs/${song.$id}`}
            scroll={false}
            className="flex flex-row w-full items-center gap-[1rem] justify-end text-gray-500 transition-all duration-300 hover:text-fuchsia-600"
          >
            <p className="text-[0.9rem]">Изменить трек</p>
            <MoveRight strokeWidth={1.2} size={20} />
          </Link>
        </div>
      </div>
    );
};
export default ModerationPaginatedCard;
