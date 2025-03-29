"use client";

import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn } from "@/lib/utils/utils";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import {
  ArrowDownToLine,
  Clock4,
  FileSearch,
  Loader2,
  Pause,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RateTrackButton from "@/components/SingleElements/RateTrackButton";
import SingleTrackFavouritesLikeButton from "@/components/SingleElements/SingleTrackFavouritesLikeButton";
import * as React from "react";
import DownloadTrackButton from "@/components/SingleElements/DownloadTrackButton";

const AccountAudioCard = ({ song, refetch, audioCardType }) => {
  const {
    setSingleTrackData,
    singleTrackData,
    stopped,
    paused,
    playing,
    isAudioLoading,
  } = usePlayer();

  return (
    <div
      key={`inner_${song.id}`}
      className={cn(
        singleTrackData && singleTrackData.trackURL == song.trackURL
          ? "bg-fuchsia-50"
          : "",
        "flex flex-row w-full px-[1rem] py-[0.6rem] justify-between items-center transition-colors duration-300 hover:bg-gray-100 rounded-2xl max-md:mt-0 max-md:px-[0.5rem]"
      )}
    >
      <div
        className="flex flex-row items-center w-[50%] max-md:w-full cursor-pointer"
        onMouseUp={() => setSingleTrackData(song)}
      >
        {/*<p className="mr-[1rem] text-slate-500">#{index + 1}</p>*/}
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
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="w-full h-full bg-cover object-cover saturate-150"
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
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full bg-cover object-cover saturate-150"
            />
          )}
          {!singleTrackData && (
            <Image
              src={song.trackImageURL}
              alt="avatar"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full bg-cover object-cover saturate-150"
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[#131414]">{song.trackSongName}</p>
          <Link
            href={`/artists/${song.trackArtistID}`}
            className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative pointer-events-none"
            scroll={false}
          >
            {song.trackArtistName}
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-around max-md:hidden w-full">
        <Link
          href={`/artists/${song.trackArtistID}`}
          className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] font-[300] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent w-[10rem] pointer-events-none"
          scroll={false}
        >
          <User2 strokeWidth={1.8} size={18} className="mr-[0.5rem]" />{" "}
          {song.trackArtistName}
        </Link>
        <p className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] font-[400] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent w-[10rem]">
          <Clock4 string={2} size={15} className="mr-[0.5rem]" />{" "}
          {song.trackDuration}
        </p>
      </div>

      <div className="flex flex-row items-center">
        <div className="flex justify-start mr-[3rem] max-md:hidden w-[10rem]">
          {/*  {song.isApproved && (*/}
          {/*    <Badge*/}
          {/*      variant="green"*/}
          {/*      className="whitespace-nowrap bg-green-200  border-green-500 text-green-600"*/}
          {/*    >*/}
          {/*      Одобрен*/}
          {/*    </Badge>*/}
          {/*  )}*/}
          {/*  {!song.isApproved && (*/}
          {/*    <Badge*/}
          {/*      variant="green"*/}
          {/*      className="whitespace-nowrap bg-orange-100 border-orange-300 text-orange-500"*/}
          {/*    >*/}
          {/*      На модерации*/}
          {/*    </Badge>*/}
          {/*  )}*/}
        </div>
        {audioCardType != "radioDownload" && (
          <div className="flex flex-row items center">
            {/*audioCardType*/}
            <RateTrackButton
              songID={song.$id}
              whoRatedIDandDateTime={song.whoRatedIDandDateTime}
              className="mr-[1rem]"
              type="favoriteTracks"
              artistID={song.trackArtistID}
            />
            <SingleTrackFavouritesLikeButton
              songID={song.$id}
              artistID={song.trackArtistID}
              type="favoriteTracks"
              className="flex flex-row items-center mt-[]"
              refetch={refetch}
            />
          </div>
        )}
        {audioCardType == "radioDownload" && (
          <DownloadTrackButton
            songFileID={song.trackFileID}
            artistID={song.trackArtistID}
            buttonType="account"
            songDocID={song.$id}
            song={song}
            className={undefined}
          />
        )}
      </div>
    </div>
  );
};

export default AccountAudioCard;
