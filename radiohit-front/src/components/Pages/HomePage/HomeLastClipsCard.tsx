"use client";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import * as React from "react";
import { Video } from "lucide-react";

const HomeLastClipsCard = ({ lastClips, isMobileView }) => {
  return (
    <>
      {lastClips && (
        <div className="w-full max-lg:mt-[1.5rem]">
          <div className="mb-[1rem] max-lg:mb-[1rem] overflow-hidden w-full relative videos_home_slider_side_gradient">
            <ScrollContainer
              className="scroll-container relative cursor-grab hide-scrollbar pb-0 mb-0"
              horizontal={true}
              vertical={false}
              hideScrollbars={false}
            >
              <div className="grid grid-cols-1">
                <div className="flex flex-nowrap space-x-4 pl-[1.7rem] max-lg:pl-[1rem]">
                  {lastClips &&
                    lastClips.documents.map((clip, index) => {
                      const createdDate = new Date(
                        clip.$createdAt
                      ).toLocaleDateString("ru-RU");
                      return (
                        <Link
                          href={`/clips/${clip.$id}`}
                          key={clip.$id}
                          className={`select-none ${
                            index == 4 ? "pr-[3rem] max-md:pr-[1rem]" : ""
                          }`}
                        >
                          <div className="relative w-[40vh] h-[25vh] bg-gray-200 rounded-2xl overflow-hidden shrink-0 group hover:scale-[0.98] transition-all duration-300">
                            <div className="relative w-full h-full flex flex-col justify-between p-[1rem] z-[2] text-white">
                              <div className="flex flex-row items-center w-full justify-between">
                                <p className="text-[0.9rem]">{createdDate}</p>
                                <Video size={20} strokeWidth={2} />
                              </div>

                              <div className="flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1}
                                  stroke="currentColor"
                                  className="w-[5rem] group-hover:scale-[1.1] transition-all duration-300"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                  />
                                </svg>
                              </div>

                              <div className="flex flex-row items-center w-full">
                                <p className="line-clamp-1 min-[1250px]:max-[1400px]:text-[0.9rem]">
                                  {clip.title}
                                </p>
                              </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-black  z-[1] w-full h-full opacity-30 group-hover:opacity-10 transition-opacity duration-300" />

                            <Image
                              src={clip.imageURL}
                              alt="clip_slider_image"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              className="w-full h-full bg-cover object-cover z-[0] grayscale-50 group-hover:grayscale-0 transition-all duration-300 rounded-2xl overflow-hidden pointer-events-none"
                            />
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </ScrollContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default HomeLastClipsCard;
