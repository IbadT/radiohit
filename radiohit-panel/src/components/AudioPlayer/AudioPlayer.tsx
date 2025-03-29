"use client";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { usePlayer } from "@/lib/hooks/usePlayer";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils/utils";
import { VolumeSlider } from "@/components/AudioPlayer/VolumeSlider";
import Link from "next/link";
import MainAudioProgress from "@/components/AudioPlayer/AudioProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, RadioTower } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { useSwipeable } from "react-swipeable";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import {useAuth} from "@/lib/hooks/useAuth";
import noimage from "./../../../public/assets/images/no_image.jpg";


const AudioPlayer = ({ isMobile }) => {
  //usePlayer Store Hook
  const {hasHydrated, isAuthenticated} = useAuth();

  const {
    isRadioPlayed,
    setRadioIsPlayed,
    setSingleTrackData,
    isPlayerActive,
    singleTrackData,
    savedVolume,
    changePlayerVisibility,
    setVolumeValue,
    playRadio,
  } = usePlayer();

  //Main Player
  const {
    load,
    stop,
    play,
    togglePlayPause,
    seek,
    setVolume,
    stopped,
    playing,
    isLoading,
    isReady,
    paused,
  } = useGlobalAudioPlayer();

  //Get page pathname
  const pathname = usePathname();

  const responsiveSizing =
    "min-[1200px]:pr-[24rem] min-[1200px]:pl-[18rem] min-[1320px]:pr-[24rem] min-[1320px]:pl-[19rem]  min-[1410px]:pr-[26rem] min-[1500px]:pl-[20rem] min-[1500px]:pr-[28rem]  min-[1900px]:pr-[30rem] min-[1900px]:pl-[21rem]";

  const needToBeWide =
    !isMobile && pathname.includes("/account") ? "!px-[22rem]" : "!px-[22rem]";

  const handlers = useSwipeable({
    onSwipedDown: () => {
      handleChangeVisibility(false);
    },
    onSwipedLeft: () => {
      handleChangeVisibility(false);
    },
    onSwipedRight: () => {
      handleChangeVisibility(false);
    },
  });

  //Load track
  useEffect(() => {
    if (!singleTrackData) return;
    try {
      load(singleTrackData.trackURL, {
        autoplay: false,
        html5: true,
        format: "mp3",
        initialVolume: savedVolume ?? 1.0,
        onload: () => {
          //Play loaded track
          if (!isLoading && singleTrackData && isReady) return play();
        },
        onend: () => {
          // handleNextTrackPlay(singleTrackData.$id);
          stop();
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [singleTrackData]);

  //Toggle play pause
  const handleTogglePlayPause = () => {
    if (isRadioPlayed && !playing && !paused && !stopped) {
      return playRadio();
    }
    togglePlayPause();
  };

  //Stop track
  const handleStop = () => {
    if (!stopped) stop();
  };

  //Change playback
  const handleChangePlaybackSeek = (val) => {
    seek(val);
    if (!playing) play();
  };

  //Change volume
  const handleVolumeChange = (volumeValue) => {
    //Set volume ui
    setVolume(volumeValue);
    //Save volume value to store
    setVolumeValue(volumeValue);
  };

  //Hide player
  const handleChangeVisibility = (visibility: boolean) => {
    changePlayerVisibility(visibility);
    handleStop();
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      {isPlayerActive && hasHydrated && isAuthenticated && (
        <motion.div
          key="mainAudioPlayerKey"
          initial={{
            y: 300,
          }}
          animate={{ y: 0 }}
          exit={{ y: 380 }}
          className={cn(
            "fixed w-full bottom-[20px] duration-300 pl-[20rem] pr-[28rem] max-xl:px-[1rem] max-md:px-[0.5rem] z-[5]",
            responsiveSizing,
            needToBeWide,
            isMobile && "hidden"
          )}
        >
          <div
            className="player w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-lg:shadow-xl z-[10] max-md:backdrop-blur-md max-md:bg-white/30"
            {...handlers}
          >
            <div className="flex flex-col p-[0.8rem] w-full mx-auto">
              {/*Top player elements*/}
              <div className="grid grid-cols-3 items-center content-center justify-center max-md:flex max-md:flex-row max-md:justify-between">
                {/*Song image and text*/}
                <div className="flex flex-row items-center justify-start">
                  {/*Song image*/}
                  {singleTrackData && (
                    <div
                      className={cn(
                        "relative h-[2.5rem] w-[2.5rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]",
                        singleTrackData &&
                          singleTrackData.trackURL == singleTrackData.trackURL
                          ? "bg-white"
                          : ""
                      )}
                    >
                      <Image
                        src={singleTrackData.trackImageURL !== "-" ? singleTrackData.trackImageURL : noimage}
                        alt="avatar"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="w-full h-full bg-cover object-cover"
                      />
                    </div>
                  )}

                  {/*Radio Animation*/}
                  {isRadioPlayed && (
                    <div className="relative h-[2.5rem] w-[2.5rem] bg-white mr-[1rem] flex justify-center items-center max-md:bg-transparent">
                      {isRadioPlayed && !playing && (
                        <RadioTower
                          strokeWidth={1.2}
                          className={cn(
                            "h-[2rem] w-[2rem] text-slate-600 transition-colors duration-300 text-fuchsia-700"
                          )}
                        />
                      )}
                      {isRadioPlayed && playing && (
                        <AudioAnimation
                          className={undefined}
                          fill={undefined}
                          svgClassName={undefined}
                        />
                      )}
                    </div>
                  )}

                  {/*Song name and artist link*/}
                  <div className="flex flex-col">
                    <p className="text-[#131414] relative top-[2px]">
                      {singleTrackData && singleTrackData.trackSongName}
                      {isRadioPlayed && "Волна Radiohit"}
                    </p>

                    {/*Artist link*/}
                    {singleTrackData && (
                      <Link
                        scroll={false}
                        href={`/artists/${singleTrackData.trackArtistID !== "-" ? singleTrackData.trackArtistID : ""}`}
                        className={
                        cn("text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative max-md:text-slate-600",
                            singleTrackData.trackArtistID === "-" && "pointer-events-none"
                          )}
                      >
                        {singleTrackData.trackArtistName}
                      </Link>
                    )}

                    {/*Radio link*/}
                    {isRadioPlayed && (
                      <Link
                        scroll={false}
                        href={`/radio`}
                        className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative max-md:text-slate-600"
                      >
                        Онлайн радио
                      </Link>
                    )}
                  </div>
                </div>

                {/*Main Controls */}
                <div className="flex flex-row items-center justify-center">
                  {/*Play / Pause*/}
                  <div
                    className="flex flex-row items-center cursor-pointer rounded-full bg-fuchsia-600 text-white p-[0.5rem] transition-all duration-300 mx-[1.5vw] hover:scale-[1.05]"
                    onClick={handleTogglePlayPause}
                  >
                    {!isLoading && playing && (
                      <PauseIcon className={undefined} />
                    )}
                    {!isLoading && !playing && (
                      <PlayIcon className={undefined} />
                    )}
                    {isLoading && <LoadingIcon />}
                  </div>
                </div>

                {/*Volume control slider*/}
                <div className="flex flex-row items-center justify-end max-md:hidden">
                  <VolumeLowIcon className={undefined} />
                  {savedVolume >= 0 && (
                    <VolumeSlider
                      defaultValue={[savedVolume * 100]}
                      max={100}
                      min={0}
                      className="w-[100px] mx-[10px]"
                      onValueChange={(val) => {
                        const volumeValue = val.at(0) / 100;
                        handleVolumeChange(volumeValue);
                      }}
                    />
                  )}
                  <VolumeHighIcon className={undefined} />

                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="items-center flex">
                        <CloseIcon
                          className="cursor-pointer ml-[1rem] mr-[0.5rem] transition-all duration-300 hover:opacity-70"
                          onClick={() => handleChangeVisibility(false)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Закрыть плеер</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/*Audio progress bar*/}
              <div
                className={cn(
                  "w-full mt-[0.8rem] transition-all duration-300",
                  isRadioPlayed && "mt-0"
                )}
              >
                <MainAudioProgress
                  handleChangePlaybackSeek={handleChangePlaybackSeek}
                  isRadioPlayed={isRadioPlayed}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AudioPlayer;

const LoadingIcon = () => {
  return (
    <div className="flex flex-col items-center align-middle justify-center w-full h-full mx-auto">
      <Loader2 strokeWidth={2} className="animate-spin text-white !z-[2]" />
    </div>
  );
};

const PlayIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="#fff"
        d="M17.49 9.6L5.6 16.77c-.7.42-1.6-.08-1.6-.9v-8c0-3.49 3.77-5.67 6.8-3.93l4.59 2.64 2.09 1.2c.69.41.7 1.41.01 1.82zM18.089 15.46l-4.05 2.34-4.04 2.33c-1.45.83-3.09.66-4.28-.18-.58-.4-.51-1.29.1-1.65l12.71-7.62c.6-.36 1.39-.02 1.5.67.25 1.55-.39 3.22-1.94 4.11z"
      ></path>
    </svg>
  );
};

const PauseIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
};

const NextTrackIcon = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path
        fill="#363636"
        d="M3.762 7.22v9.57c0 1.96 2.13 3.19 3.83 2.21l4.15-2.39 4.15-2.4c1.7-.98 1.7-3.43 0-4.41l-4.15-2.4-4.15-2.39c-1.7-.98-3.83.24-3.83 2.21zM20.238 18.93c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.33.75-.75.75z"
      ></path>
    </svg>
  );
};

const PrevTrackIcon = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path
        fill="#363636"
        d="M20.24 7.22v9.57c0 1.96-2.13 3.19-3.83 2.21l-4.15-2.39-4.15-2.4c-1.7-.98-1.7-3.43 0-4.41l4.15-2.4 4.15-2.39c1.7-.98 3.83.24 3.83 2.21zM3.762 18.93c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.34.75-.75.75z"
      ></path>
    </svg>
  );
};

const VolumeHighIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="#b0b0b0"
        strokeWidth="1.5"
        d="M2 10v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L7.49 6.7c-.32.19-.69.3-1.06.3H5c-2 0-3 1-3 3z"
      ></path>
      <path
        stroke="#b0b0b0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 8a6.66 6.66 0 010 8M19.83 5.5a10.83 10.83 0 010 13"
      ></path>
    </svg>
  );
};

const VolumeLowIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="#b0b0b0"
        strokeWidth="1.8"
        d="M3.33 10v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L8.82 6.7c-.32.19-.69.3-1.06.3H6.33c-2 0-3 1-3 3z"
      ></path>
      <path
        stroke="#b0b0b0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.33 8a6.66 6.66 0 010 8"
      ></path>
    </svg>
  );
};

const CloseIcon = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path
        stroke="#b0b0b0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM9.17 14.83l5.66-5.66M14.83 14.83L9.17 9.17"
      ></path>
    </svg>
  );
};
