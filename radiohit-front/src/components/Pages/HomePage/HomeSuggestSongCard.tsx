import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import suggest_home from "@/../public/assets/images/suggest_home2.jpg";
import {Music, RadioTower} from "lucide-react";

const HomeSuggestSongCard = () => {
  return (
    <Link
      href="/suggest-song"
      scroll={false}
      className="group relative overflow-hidden flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl mb-[1.5rem] max-lg:mb-[1rem] transition-all duration-300 hover:scale-[0.98]"
    >
      {/*Banner Image*/}
      <Image
        src={suggest_home}
        alt="home_banner_suggest"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="absolute w-full h-full bg-cover object-cover z-[1] scale-[1]"
      />

      {/*Banner Overlay*/}
      <div className="w-full bg-black h-full opacity-50 z-[2] bg-cover overflow-hidden absolute inset-0 bg-gradient-to-t from-background/90 to-background/90 max-md:opacity-70" />
      <div className="w-full bg-mainAccent h-full opacity-30 z-[3] bg-cover overflow-hidden absolute inset-0 bg-gradient-to-t from-background/90 to-background/90 transition-opacity duration-300 group-hover:opacity-[0.5]" />

      {/*Banner Content*/}
      <div className="relative z-[4] w-full h-full flex flex-row items-center justify-between">
        <div className="flex flex-col gap-[2rem] justify-between py-[1.5rem] px-[1.5rem]">
          <div className="flex flex-col">
            <p className="text-white font-[400] text-[0.9rem] mb-[0.5rem] min-[1900px]:mb-[1rem] min-[1200px]:max-[1500px]:text-[0.8rem] max-md:opacity-70">
              Предложить трек
            </p>
            <h2 className="text-white font-[700] text-[1.5rem] max-md:text-[1.2rem] uppercase mb-[0.5rem] min-[1900px]:mb-[1rem] min-[1200px]:max-[1500px]:text-[1.3rem]">
              Отправь песню на радио
            </h2>
            <h2 className=" text-white font-[500] text-[0.9rem] min-[1200px]:max-[1500px]:text-[0.8rem] max-md:font-[400]">
              Хочешь услышать любимый трек в эфире?
              <br />
              Отправь свою песню на радио и мы добавим её в эфир!
            </h2>
          </div>

          <div className="bg-white rounded-[10px] overflow-hidden w-max py-[0.6rem] px-[2rem] transition-opacity duration-300 hover:opacity-[0.8] flex flex-row items-center justify-center gap-[0.5rem] max-md:w-full">
            <Music strokeWidth={1.5} className="h-auto w-[1.2rem] min-[1200px]:max-[1500px]:w-[1rem]" />
            <p className="min-[1200px]:max-[1400px]:text-[0.8rem]">Отправить песню</p>
          </div>
        </div>

        <div className="flex items-center justify-center pr-[4rem] max-md:hidden">
          <RadioTower strokeWidth={0.8} className="h-auto w-[8rem] text-white transition-transform duration-300 group-hover:scale-[0.9] min-[1200px]:max-[1500px]:w-[6rem]"/>
        </div>

      </div>
    </Link>
  );
};
export default HomeSuggestSongCard;

