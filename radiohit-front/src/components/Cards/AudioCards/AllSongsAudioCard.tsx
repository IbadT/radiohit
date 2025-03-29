import {usePlayer} from "@/lib/hooks/usePlayer";
import {cn} from "@/lib/utils/utils";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import {Clock4, Loader2, Pause, User2} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RateTrackButton from "@/components/SingleElements/RateTrackButton";
import SingleTrackFavouritesLikeButton from "@/components/SingleElements/SingleTrackFavouritesLikeButton";
import * as React from "react";
import DownloadTrackButton from "@/components/SingleElements/DownloadTrackButton";

const AllSongsAudioCard = ({song}) => {
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
            className={cn(
                "flex flex-row bg-white px-[1rem] py-[0.6rem] justify-between items-center transition-all duration-300 max-md:mt-0 max-md:px-[0.5rem] rounded-2xl mb-[1rem] border-[1px] border-mainBorderColor lg:hover:scale-[1.02] hover:shadow hover:border-fuchsia-300",
                singleTrackData && singleTrackData.trackURL == song.trackURL
                    ? "bg-fuchsia-50 border-fuchsia-300"
                    : ""
            )}
        >
            <div
                className="flex flex-row items-center w-[70%] min-[1200px]:max-[1400px]:w-full min-[1400px]:max-[1550px]:w-[90%] max-md:w-full cursor-pointer"
                onMouseUp={() => setSingleTrackData(song)}
            >
                <div
                    className={cn(
                        "relative h-[3rem] w-[3rem] min-w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]",
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="w-full h-full bg-cover object-cover saturate-150"
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <p className="text-[#131414] min-[1200px]:max-[1400px]:text-[0.9rem] text-ellipsis w-[90%] line-clamp-1 w-full">
                        {song.trackSongName}
                    </p>
                    <Link
                        href={`/artists/${song.trackArtistID}`}
                        className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative pointer-events-none"
                        scroll={false}
                    >
                        {song.trackArtistName}
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-2 w-full max-md:hidden">
                <div className="flex w-[100%] justify-start">
                    <Link
                        href={`/artists/${song.trackArtistID}`}
                        className="flex flex-row items-center justify-start text-gray-500 font-[300] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.8rem] pointer-events-none"
                        scroll={false}
                    >
                        <User2 strokeWidth={1.8} size={18} className="mr-[0.5rem]" />{" "}
                        <p className="min-[1200px]:max-[1500px]:text-ellipsis line-clamp-1">
                            {song.trackArtistName}
                        </p>
                    </Link>
                </div>
                <div className="flex min-[1200px]:max-[1400px]:w-[60%] justify-center align-middle min-[1600px]:justify-start min-[1900px]:align-start">
                    <p className="flex flex-row items-center justify-center min-[1600px]:justify-center  whitespace-nowrap  text-gray-500 font-[400] text-[0.9rem] transition-colors duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.8rem]">
                        <Clock4 string={2} size={15} className="mr-[0.5rem]" />{" "}
                        {song.trackDuration}
                    </p>
                </div>
            </div>

            <div className="flex flex-row items center">
                <RateTrackButton
                    songID={song.$id}
                    artistID={song.trackArtistID}
                    whoRatedIDandDateTime={song.whoRatedIDandDateTime}
                    className="mr-[1rem]"
                    type="chartTracks"
                />
                <SingleTrackFavouritesLikeButton
                    songID={song.$id}
                    artistID={song.trackArtistID}
                    className="flex flex-row items-center max-md:mr-[0.5rem]"
                    type="chartTracks"
                    refetch={undefined}
                />

                <DownloadTrackButton
                    songFileID={song.trackFileID}
                    artistID={song.trackArtistID}
                    buttonType="front"
                    songDocID={song.$id}
                    className="ml-[0.5rem]"
                    song={song}
                />
            </div>
        </div>
    );
}
export default AllSongsAudioCard
