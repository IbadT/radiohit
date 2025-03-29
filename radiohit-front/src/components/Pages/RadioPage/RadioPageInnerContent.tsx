"use client";

import { usePlayer } from "@/lib/hooks/usePlayer";
import * as React from "react";
import Image from "next/image";
import radio_page_bg from "../../../../public/assets/images/radio_page_bg.jpg";
import { ListMusic, Loader2, MoveRight, Pause } from "lucide-react";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import ReactQueryWrapper from "@/components/wrappers/ReactQueryWrapper";
import RadioTracksCard from "@/components/Pages/RadioPage/RadioTracksCard";
import PageHeading from "@/components/Text/PageHeading";
import Link from "next/link";

const RadioPageInnerContent = () => {
  const {
    isRadioPlayed,
    stopped,
    paused,
    playing,
    playRadioRadiohit,
    radioStationSelected,
    isAudioLoading,
  } = usePlayer();

  return (
    <>
      {/*Radio Banner*/}
      <div
        className="relative w-full rounded-2xl overflow-hidden group mb-[1rem] cursor-pointer"
        onClick={() => playRadioRadiohit()}
      >
        <div className="relative w-full h-full flex flex-row items-center justify-between py-[2rem] px-[2.5rem] z-[2] text-white text-white max-md:py-[1.5rem] max-md:px-[1.4rem]">
          <div className="flex flex-col">
            <p className="font-[600] text-[2rem] mb-[0.5rem] max-md:text-[1.3rem]">
              Слушать Radiohit
            </p>
            <p className="font-[300] max-md:text-[0.8rem]">
              Включайте радио и будьте на волне radiohit
              <br className="max-md:hidden" /> вместе с сотнями слушателей
            </p>
          </div>

          <div className="max-md:ml-[1.5rem]">
            {isRadioPlayed && radioStationSelected !== "radiohit" && (
                <PlayRadioIcon className="w-[4rem] h-[4rem] group-hover:scale-[1.08] transition-all duration-300 max-md:w-[3rem] max-md:h-[3rem]" />
            )}
            {!isRadioPlayed && radioStationSelected !== "radiohit" && (
              <PlayRadioIcon className="w-[4rem] h-[4rem] group-hover:scale-[1.08] transition-all duration-300 max-md:w-[3rem] max-md:h-[3rem]" />
            )}
            {radioStationSelected !== "radiohit" && isRadioPlayed && !playing && !paused && !isAudioLoading && (
              <PlayRadioIcon className="w-[4rem] h-[4rem] group-hover:scale-[1.08] transition-all duration-300 max-md:w-[3rem] max-md:h-[3rem]" />
            )}
            {isRadioPlayed && isAudioLoading && radioStationSelected === "radiohit" && (
              <Loader2
                strokeWidth={1.3}
                className="h-[3.5rem] w-[3.5rem] animate-spin text-white max-md:w-[3rem] max-md:h-[3rem]"
              />
            )}
            {radioStationSelected === "radiohit" && isRadioPlayed && playing && (
              <AudioAnimation
                fill={"#fff"}
                svgClassName="!h-[4rem] !w-[4rem] group-hover:scale-[1.08] transition-all duration-300 max-md:!w-[3rem] max-md:!h-[3rem]"
                className={undefined}
              />
            )}
            {isRadioPlayed && paused && radioStationSelected === "radiohit" && (
              <Pause
                strokeWidth={0}
                fill="#fff"
                className="w-[4rem] h-[4rem] group-hover:scale-[1.08] transition-all duration-300 max-md:w-[3rem] max-md:h-[3rem]"
              />
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-80 group-hover:opacity-50 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-black z-[1] w-full h-full opacity-30 group-hover:opacity-10 transition-opacity duration-300" />

        <Image
          src={radio_page_bg}
          alt="clip_slider_image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          placeholder="blur"
          className="w-full h-full bg-cover object-cover z-[0] grayscale-50 group-hover:grayscale-0 transition-all duration-300 rounded-2xl overflow-hidden pointer-events-none"
        />
      </div>

      {/*Radio Tracks Heading*/}
      <div className="w-full flex flex-row items-center justify-between bg-white rounded-2xl px-[1rem] py-[0.8rem] border-mainBorderColor border-[1px] mb-[1rem]">
        <div className="flex flex-row items center align-middle">
          <ListMusic
            strokeWidth={1.5}
            className="relative top-[3px]"
            size={22}
          />
          <PageHeading
            text="Подборка на сегодня"
            classnames="mb-0 text-[1.2rem] font-[500]"
          />
        </div>

        <div className="flex flex-row items center group max-md:hidden">
          <Link
            href="/songs"
            className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent"
          >
            Смотреть все треки
          </Link>
          <MoveRight
            strokeWidth={1}
            size={18}
            className="text-slate-400 ml-[0.5rem] transition-colors duration-300 group-hover:text-mainAccent relative top-[1px]"
          />
        </div>
      </div>
      {/*Radio Tracks Card*/}
      <div className="w-full max-md:mb-[1rem]">
          <RadioTracksCard />
      </div>
    </>
  );
};

export default RadioPageInnerContent;

const PlayRadioIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
};
