"use client";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn } from "@/lib/utils/utils";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import { Loader2, MoveRight, Pause } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const RadioDownloadedTracksCard = ({ song }) => {
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
        "flex flex-row bg-white pl-[0.5rem] pr-[1rem] max-md:pl-[0.3rem] max-md:pr-[0.5rem] py-[0.6rem] justify-between items-center transition-all duration-300 max-md:mt-0 max-md:px-[0.5rem] rounded-2xl mb-[0.5rem] hover:bg-fuchsia-50",
        singleTrackData && singleTrackData.trackURL == song.trackURL
          ? "bg-fuchsia-50 border-fuchsia-300"
          : ""
      )}
    >
      <div
        className="flex flex-row items-center w-[50%] min-[1200px]:max-[1400px]:w-full min-[1400px]:max-[1550px]:w-[70%] max-md:w-full cursor-pointer"
        onMouseUp={() => setSingleTrackData(song)}
      >
        <div
          className={cn(
            "relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]",
            singleTrackData && singleTrackData.trackURL == song.trackURL
              ? "bg-white"
              : ""
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
                src={song.trackImageURL}
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
              src={song.trackImageURL}
              alt="avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full bg-cover object-cover"
            />
          )}
          {!singleTrackData && (
            <Image
              src={song.trackImageURL}
              alt="avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full bg-cover object-cover"
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[#131414] min-[1200px]:max-[1400px]:text-[0.9rem]">
            {song.trackSongName}
          </p>
          <Link
            scroll={false}
            href={`/artists/${song.trackArtistID}`}
            className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative"
          >
            {song.trackArtistName}
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-around max-md:hidden w-full">
        <p className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] text-gray-500 font-[300] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.8rem]">
          Рейтинг трека: {song.trackPopularity}
        </p>
        <Link
          href={`/songs/${song.$id}`}
          className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] text-gray-500 font-[400] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.9rem] gap-[0.5rem] rounded-2xl border-[1px] px-[1rem] py-[0.3rem] hover:border-mainAccent"
        >
          {/*<Clock4 string={2} size={15} className="mr-[0.5rem]" />{" "}*/}
          {/*{song.trackDuration}*/}
          Подробнее
          <MoveRight strokeWidth={2} size={15} />
        </Link>
      </div>

      <div className="flex flex-row items center"></div>
    </div>
  );
};
export default RadioDownloadedTracksCard;
