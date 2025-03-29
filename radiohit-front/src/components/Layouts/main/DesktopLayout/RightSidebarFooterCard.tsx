import { Loader2, Music, RadioTower } from "lucide-react";
import Image from "next/image";
import radio_bg_radiohit from "../../../../../public/assets/images/radiohit_radio_bg.jpg";
import radio_bg_dushevnoe from "../../../../../public/assets/images/dushevnoe_radio_bg.jpg";
import radio_bg_superfm from "../../../../../public/assets/images/superfm_radio_bg.jpg";
import Link from "next/link";
import LikeButton from "@/components/SingleElements/LikeButton";
import * as React from "react";

const RightSidebarFooterCard = ({
  singleTrackData,
  hasAudioHydrated,
  hasHydrated,
  isRadioPlayed,
  radioStationSelected,
}) => {
  return (
    <div className="h-full mx-[1.5rem] flex flex-col mt-[1rem] max-[1450px]:mt-[0.5rem] min-[2000px]:h-[20rem]">
      {/*Show if store is hydrated*/}
      {!hasAudioHydrated && (
        <div className="relative w-full h-full flex flex-col justify-center items-center rounded-xl overflow-hidden bg-slate-100 select-none">
          <Loader2
            strokeWidth={1.5}
            size={50}
            className="h-[2rem] w-[2rem] animate-spin text-gray-500"
          />
        </div>
      )}

      {/*Show if store is empty*/}
      {hasHydrated && !singleTrackData && !isRadioPlayed && (
        <div className="relative w-full h-full flex flex-col justify-center items-center rounded-xl overflow-hidden bg-slate-100">
          <Music
            strokeWidth={2}
            size={40}
            className="text-gray-400 mb-[1rem]"
          />
          <p className="text-gray-400 font-[500] select-none">
            Ничего не воспроизводится
          </p>
        </div>
      )}

      {/*Show if store has radio or track data*/}
      {((hasAudioHydrated && singleTrackData) ||
        (hasAudioHydrated && isRadioPlayed)) && (
        <div className="relative w-full h-full flex flex-col justify-between rounded-xl overflow-hidden bg-slate-100 group">
          {/*Track Image - Background*/}
          {singleTrackData && (
            <Image
              src={singleTrackData.trackImageURL}
              alt="sidebar_song_poster"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="w-full h-full object-cover z-[1]"
            />
          )}

          {!singleTrackData && isRadioPlayed && (
            <>
              {radioStationSelected === "radiohit" && (
                <Image
                  src={radio_bg_radiohit}
                  alt="sidebar_song_poster"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full object-cover z-[1]"
                />
              )}

              {radioStationSelected === "dushevnoe" && (
                <Image
                  src={radio_bg_dushevnoe}
                  alt="sidebar_song_poster"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full object-cover z-[1]"
                />
              )}

              {radioStationSelected === "superfm" && (
                <Image
                  src={radio_bg_superfm}
                  alt="sidebar_song_poster"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full object-cover z-[1]"
                />
              )}
            </>
          )}

          {/*Background Overlay*/}
          <div className="w-full h-full absolute bg-black opacity-[0.1] z-[2] transition-opacity duration-300 group-hover:opacity-0" />

          {/*Spacer*/}
          <div className="h-full min-[1320px]:max-[1400px]:h-[50%]" />

          {/*Bottom Track Info*/}
          <div className="h-[120px] p-[0.8rem] z-[3]  min-[1320px]:max-[1400px]:h-[100px]">
            <div className="w-full h-full rounded-xl backdrop-blur-md bg-white/50 flex flex-row justify-between items-center px-[1rem]">
              {/*Left - Track info*/}
              <div className="w-full flex flex-col">
                <p className="text-[#131414] font-[500] text-[1rem] overflow-ellipsis w-max select-none min-[1320px]:max-[1400px]:text-[0.85rem]">
                  {singleTrackData && singleTrackData.trackSongName}
                  {hasHydrated &&
                    isRadioPlayed &&
                    radioStationSelected === "radiohit" &&
                    "Radiohit"}
                  {hasHydrated &&
                    isRadioPlayed &&
                    radioStationSelected === "superfm" &&
                    "Супер FM"}
                  {hasHydrated &&
                    isRadioPlayed &&
                    radioStationSelected === "dushevnoe" &&
                    "Душевное Радио"}
                </p>
                <Link
                  scroll={false}
                  href={`/artists/${
                    singleTrackData && singleTrackData.trackArtistID
                  }`}
                  className="text-[0.9rem] text-gray-600 hover:underline duration-300 transition-all hover:text-mainAccent top-[-0.2rem] relative pointer-events-none min-[1320px]:max-[1400px]:text-[0.75rem]"
                >
                  {singleTrackData && singleTrackData.trackArtistName}
                  {hasHydrated && isRadioPlayed && "Онлайн радио"}
                </Link>
              </div>

              {/*Right - Buttons*/}
              {singleTrackData && (
                <LikeButton classMame="h-[1.6rem] w-auto top-[-0.1rem] hover:scale-[1.1] min-[1320px]:max-[1400px]:h-[1.4rem]" />
              )}
              {hasHydrated && isRadioPlayed && (
                <RadioTower
                  strokeWidth={1.2}
                  className="transition-colors duration-300 hover:text-mainAccent relative top-[-2px] h-auto w-[2rem] min-[1320px]:max-[1400px]:w-[1.6rem]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebarFooterCard;
