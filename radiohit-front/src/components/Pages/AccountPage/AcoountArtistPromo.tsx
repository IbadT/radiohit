import { MoveRight, X } from "lucide-react";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import Link from "next/link";
import Image from "next/image";
import artist_promo_img from "@/../public/assets/images/artist_promo.jpg";

const ArtistPromo = ({ hideArtistPromoBanner }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between rounded-2xl p-[1rem] mt-[1rem] max-lg:mt-0 max-lg:flex-col max-lg:mt-[1rem] relative text-white bg-mainAccent overflow-hidden max-xl:hidden">
        <Link
            scroll={false}
          href="/account/artist-create"
          className="flex flex-row items-center w-full z-[1] transition-opacity duration-300 hover:opacity-80"
        >
          <p className="font-[500] text-[1.2rem] lg:pl-[0.5rem]">
            Являетесь исполнителем?
          </p>
          <p className="font-[300] text-[1.2rem] lg:pl-[0.5rem]">
            Загрузите свои треки на платформу Radiohit!
          </p>
          <MoveRight strokeWidth={1} className="ml-[0.5rem]" />
        </Link>
        {/*Hide artist promo*/}
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="z-[1]">
              <X
                className="cursor-pointer hover:opacity-70 transition-opacity duration-300"
                strokeWidth={2}
                onClick={hideArtistPromoBanner}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Скрыть</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Image
          src={artist_promo_img}
          placeholder='blur'
          alt="promo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover z-[0]"
        />
        <div className="w-full bg-black h-full opacity-50 fixed bg-cover overflow-hidden absolute inset-0 bg-gradient-to-t from-background/90 to-background/90" />
        <div className="w-full bg-mainAccent h-full opacity-30 fixed bg-cover overflow-hidden absolute inset-0 bg-gradient-to-t from-background/90 to-background/90" />
      </div>
    </>
  );
};

export default ArtistPromo;
