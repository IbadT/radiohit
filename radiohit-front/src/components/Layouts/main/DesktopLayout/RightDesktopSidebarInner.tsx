"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePlayer } from "@/lib/hooks/usePlayer";
import Image from "next/image";
import * as React from "react";
import { ChevronRight, Loader2, Pause } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import AudioAnimation from "@/components/SingleElements/AudioAnimation";
import { useUser } from "@/lib/hooks/useUser";
import RadioHitBannerCard from "@/components/Cards/RadioBannerCards/RadioHitBannerCard";
import DushevnoeRadioBannerCard from "@/components/Cards/RadioBannerCards/DushevnoeRadioBannerCard";
import SuperFmBannerCard from "@/components/Cards/RadioBannerCards/SuperFmBannerCard";
import RightSidebarFooterCard from "@/components/Layouts/main/DesktopLayout/RightSidebarFooterCard";

const RightDesktopSidebarInner = ({ sidebarTracks }) => {
  const {
    setSingleTrackData,
    isRadioPlayed,
    singleTrackData,
    radioStationSelected,
    playing,
    stopped,
    paused,
    isAudioLoading,
    hasAudioHydrated,
  } = usePlayer();

  const { hasHydrated } = useUser();
  const pathname = usePathname();

  const needToHide = pathname.includes("/account") ? "hidden" : "";

  return (
    <>
      {!needToHide && (
        <div
          className={`relative w-[40rem] pl-[1.5rem] z-[6] max-w-[28rem] min-[1200px]:max-[1400px]:max-w-[24rem]`}
        >
          <div className="sticky top-[0]">
            {/*Pattern BG*/}
            <div className="pattern_bg_effect_right_sidebar" />
            {/*Sidebar Layout*/}
            <div className="h-[100vh] bg-white flex flex-col justify-start py-[1.5rem] border-l-mainBorderColor border-l-[1px]">
              {/*Radiohit Radio*/}
              <RadioHitBannerCard />
              {/*SuperFM Radio*/}
              <SuperFmBannerCard />
              {/*Dushevnoe Radio*/}
              <DushevnoeRadioBannerCard />

              {/*Today Top tracks*/}
              <div className="flex flex-row justify-between items-center px-[1.5rem] z-[6]">
                <p className="text-[#1f1f1f] font-[600] text-[1.2rem]">
                  Топ на сегодня
                </p>
                <Link
                  scroll={false}
                  href="/chart"
                  className="text-[0.9rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent"
                >
                  Смотреть чарт
                </Link>
              </div>

              <div className="relative h-full flex flex-col justify-between">
                <div className="flex flex-col mt-[0.6rem] px-[0.5rem] h-max">
                  {sidebarTracks &&
                    sidebarTracks.map((song, index) => {
                      return (
                        <div
                          key={song.$id}
                          className={cn(
                            "flex flex-row items-center justify-between cursor-pointer hover:bg-fuchsia-50 transition-all duration-300 border-[1px] hover:scale-[0.98] rounded-2xl border-white py-[0.5rem] px-[1rem]",
                            !isRadioPlayed &&
                              singleTrackData &&
                              singleTrackData.trackURL == song.trackURL
                              ? "border-fuchsia-300 bg-fuchsia-50"
                              : "",
                            index === sidebarTracks.length - 1 &&
                              "min-[1300px]:max-[1500px]:hidden"
                          )}
                          onMouseUp={() => setSingleTrackData(song)}
                        >
                          <div className="flex flex-row items-center">
                            <div className="relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]">
                              <Image
                                src={song.trackImageURL}
                                alt="avatar"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                className="w-full h-full bg-cover object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[#131414] min-[1200px]:max-[1400px]:text-[0.9rem]">
                                {song.trackSongName}
                              </p>
                              <Link
                                scroll={false}
                                href={`/artists/${song.trackArtistID}`}
                                className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent top-[-0.2rem] relative pointer-events-none"
                              >
                                {song.trackArtistName}
                              </Link>
                            </div>
                          </div>
                          <div>
                            {singleTrackData &&
                              singleTrackData.trackURL != song.trackURL && (
                                <ChevronRight strokeWidth={1.5} />
                              )}
                            {!isRadioPlayed &&
                              singleTrackData &&
                              singleTrackData.trackURL == song.trackURL &&
                              isAudioLoading && (
                                <Loader2
                                  strokeWidth={1}
                                  className="h-[1.5rem] w-[1.5rem] animate-spin text-mainAccent"
                                />
                              )}
                            {!isRadioPlayed &&
                              singleTrackData &&
                              singleTrackData.trackURL == song.trackURL &&
                              playing && (
                                <AudioAnimation
                                  className={undefined}
                                  fill={undefined}
                                  svgClassName={undefined}
                                />
                              )}
                            {!isRadioPlayed &&
                              singleTrackData &&
                              singleTrackData.trackURL == song.trackURL &&
                              paused &&
                              !stopped && (
                                <Pause strokeWidth={0} fill="#a21caf" />
                              )}
                            {!isRadioPlayed &&
                              singleTrackData &&
                              singleTrackData.trackURL == song.trackURL &&
                              !isAudioLoading &&
                              stopped && <ChevronRight strokeWidth={1.5} />}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/*Sidebar Footer*/}
                <RightSidebarFooterCard
                  singleTrackData={singleTrackData}
                  hasAudioHydrated={hasAudioHydrated}
                  hasHydrated={hasHydrated}
                  isRadioPlayed={isRadioPlayed}
                  radioStationSelected={radioStationSelected}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightDesktopSidebarInner;
