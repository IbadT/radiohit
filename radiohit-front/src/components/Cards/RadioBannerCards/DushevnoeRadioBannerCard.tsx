"use client";
import { cn } from "@/lib/utils/utils";
import { Loader2, Pause, Radio } from "lucide-react";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import Image from "next/image";
import radio_banner_dushevnoe from "../../../../public/assets/images/bg_dushev_radion.jpg";
import * as React from "react";
import { usePlayer } from "@/lib/hooks/usePlayer";

const DushevnoeRadioBannerCard = () => {
  const {
    playRadioDushevnoe,
    radioStationSelected,
    isRadioPlayed,
    playing,
    stopped,
    paused,
    isAudioLoading,
  } = usePlayer();
  return (
    <div className={cn("mb-[1rem] px-[1.2rem] max-lg:px-0")}>
      <div
        onClick={() => playRadioDushevnoe()}
        className={cn(
          "relative w-full rounded-xl overflow-hidden mr-[1rem] cursor-pointer text-white group hover:scale-[0.97] hover:opacity-90 transition-all duration-300"
        )}
      >
        <div className="relative flex flex-row w-full px-[1.5rem] py-[1rem] z-[2] h-full justify-between items-center">
          <div className="flex flex-col">
            <p className="font-[500] min-[1200px]:max-[1420px]:text-[0.9rem]">
              Душевное Радио
            </p>
            <p className="text-[0.7rem] !leading-[15px] font-[300] min-[1200px]:max-[1420px]:text-[0.6rem]">
              Незабываемые мгновения твоей жизни
            </p>
          </div>

          {!isRadioPlayed && <Radio size={35} strokeWidth={1} />}
          {radioStationSelected !== "dushevnoe" && isRadioPlayed && (
            <Radio size={35} strokeWidth={1} />
          )}

          {isRadioPlayed &&
            isAudioLoading &&
            radioStationSelected === "dushevnoe" && (
              <Loader2
                strokeWidth={1.5}
                className="h-[1.5rem] w-[1.5rem] animate-spin text-white"
              />
            )}
          {isRadioPlayed && playing && radioStationSelected === "dushevnoe" && (
            <AudioAnimation
              fill={"#fff"}
              className={undefined}
              svgClassName={undefined}
            />
          )}

          {isRadioPlayed && paused && radioStationSelected === "dushevnoe" && (
            <Pause strokeWidth={0} fill="#fff" />
          )}
          {isRadioPlayed &&
            !paused &&
            !isAudioLoading &&
            !playing &&
            radioStationSelected === "dushevnoe" && (
              <Pause strokeWidth={0} fill="#fff" />
            )}
        </div>

        {/* <div className="absolute inset-0  bg-pink-600 z-[1] w-full h-full opacity-[65%]" /> */}

        <Image
          src={radio_banner_dushevnoe}
          alt="play_radio_image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          placeholder="blur"
          className="w-full h-full bg-cover object-cover z-[0] grayscale-50"
        />
      </div>
    </div>
  );
};

export default DushevnoeRadioBannerCard;
