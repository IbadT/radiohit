"use client";
import { cn } from "@/lib/utils/utils";
import {  MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const RotationSongCard = ({ radioDoc, downloadDateAndTime }) => {
  // const createdDate = new Date(song.$createdAt).toLocaleDateString("ru-RU");

  return (
    <Link
        href={`/radio-users/${radioDoc.$id}`}
        scroll={false}
      className={cn(
        "flex flex-row bg-white pl-[0.5rem] pr-[1rem] max-md:pl-[0.3rem] max-md:pr-[0.5rem] py-[0.6rem] justify-between items-center transition-all duration-300 max-md:mt-0 max-md:px-[0.5rem] rounded-2xl mb-[0.3rem] hover:bg-fuchsia-50"
      )}
    >
      <div className="flex flex-row items-center w-[50%] min-[1200px]:max-[1400px]:w-full min-[1400px]:max-[1550px]:w-[70%] max-md:w-full cursor-pointer">
        <div
          className={cn(
            "relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]"
          )}
        >
          <Image
            src={radioDoc.userImageURL}
            alt="avatar"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="w-full h-full bg-cover object-cover"
          />
        </div>
        <Link
          scroll={false}
          href={`/radio-users/${radioDoc.$id}`}
          className="flex flex-col"
        >
          <p className="text-[#131414] min-[1200px]:max-[1400px]:text-[0.9rem]">
            {radioDoc.name}
          </p>
          <p
              className="text-[#ACACAD] text-[0.8rem] hover:underline duration-300 transition-all hover:text-mainAccent relative"
          >
              радиостанция
          </p>
        </Link>
      </div>
      <div className="flex flex-row w-full justify-around max-md:hidden w-full">
        <p className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] text-gray-500 font-[500] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.8rem]">
          {downloadDateAndTime}
        </p>
        <Link
          href={`/radio-users/${radioDoc.$id}`}
          scroll={false}
          className="flex flex-row items-center justify-start whitespace-nowrap text-[#b2b2b2] text-gray-500 font-[400] text-[0.9rem] transition-coloros duration-300 hover:text-mainAccent min-[1200px]:max-[1400px]:text-[0.9rem] gap-[0.5rem] rounded-2xl border-[1px] px-[1rem] py-[0.3rem] hover:border-mainAccent"
        >
          Подробнее
          <MoveRight strokeWidth={2} size={15} />
        </Link>
      </div>

      <div className="flex flex-row items center"></div>
    </Link>
  );
};
export default RotationSongCard;
