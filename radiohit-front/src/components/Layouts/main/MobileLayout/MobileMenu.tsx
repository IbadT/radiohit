"use client";
import {
  BarChart3,
  Disc3,
  FileAudio2,
  Headphones,
  Info,
  Menu,
  MonitorPlay,
  MoveRight,
  Newspaper,
  Podcast,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet/sheet";
import { X } from "lucide-react";
import { useState } from "react";
import GlobalFullLogo from "@/components/Logo/GlobalFullLogo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import promo_image from "../../../../../public/assets/images/sidebar2.png";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="focus:ring-0 outline-none">
        <Menu strokeWidth={1} size={28} className="outline-none focus:ring-0" />
      </SheetTrigger>
      <SheetContent
        className="mobile-menu-sheet w-[270px] sm:w-[540px] overflow-y-scroll border-none bg-white outline-none focus:ring-0 z-[99999]"
        side="left"
      >
        {/*Mobile Menu logo*/}
        <div className="flex flex-row justify-between items-center pb-[20px] mb-[20px] border-b-[1px] focus-none">
          <Link href="/" onClick={() => setOpen(false)}>
            <GlobalFullLogo classnames="w-[140px]" />
          </Link>
          <X
            strokeWidth={1}
            onClick={() => setOpen(false)}
            className="hover:opacity-80 cursor-pointer"
          />
        </div>
        {/*Mobile menu*/}
        <div className="h-[92%] flex flex-col justify-between">
          {/*Menu Top Content*/}
          <div className="mobile-menu">
            <MobileMenuLinkHelper
              url="/"
              title="Главная"
              icon={<Disc3 strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/news"
              title="Новости"
              icon={<Newspaper strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/chart"
              title="Чарт треков"
              icon={<BarChart3 strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/clips"
              title="Клипы"
              icon={<MonitorPlay strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/radio"
              title="Онлайн радио"
              icon={<Podcast strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/songs"
              title="Каталог треков"
              icon={<Headphones strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/suggest-song"
              title="Предложить трек"
              icon={<FileAudio2 strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            <MobileMenuLinkHelper
              url="/about"
              title="О проекте"
              icon={<Info strokeWidth={1.8} size={20} />}
              clickAction={() => setOpen(false)}
            />
            {/*<MobileMenuLinkHelper*/}
            {/*    url="/events"*/}
            {/*    title="Мероприятия"*/}
            {/*    icon={<CalendarRange strokeWidth={1.8} size={20} />}*/}
            {/*    clickAction={()=> setOpen(false)}*/}
            {/*/>*/}
            {/*<MobileMenuLinkHelper*/}
            {/*    url="/artists"*/}
            {/*    title="Исполнители"*/}
            {/*    icon={<Users strokeWidth={1.8} size={20} />}*/}
            {/*    clickAction={()=> setOpen(false)}*/}
            {/*/>*/}
          </div>

          {/*Menu Bottom Content*/}
          <div
            className="rounded-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Link href="/suggest-song" scroll={false} className="group">
              <div className="relative rounded-xl bg-[#fbe5f9] border-[1px] border-[#a21caf] flex flex-col group-hover:scale-[0.95] transition-all duration-300 overflow-hidden">
                {/*BG Image*/}
                <Image
                  src={promo_image}
                  alt="promo"
                  placeholder="blur"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute w-full h-auto scale-[1] z-[1] bg-cover object-cover"
                />
                {/*BG Overlay*/}
                <div className="absolute bg-[#fbe5f9] opacity-[0.85] z-[2] w-full h-full" />

                {/*Text Content*/}
                <div className="flex flex-row items-center align-middle justify-center z-[3] p-[1rem]">
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-row items-center gap-[0.5rem] mb-[5px]">
                      <p className="text-[0.9rem] font-[500] text-[#a21caf]">
                        Предложить трек
                      </p>
                      <MoveRight
                        className="text-[#a21caf] h-auto w-[1rem]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-[0.8rem] text-[#3c173f] leading-[1rem]">
                      Отправь свой любимый трек
                      <br /> на радио
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

const MobileMenuLinkHelper = ({ url, title, icon, clickAction }) => {
  const pathname = usePathname();

  //Check if link active
  const activeLink = (url: string, pathname: string) => {
    if (url.length > 2 && pathname.includes(url))
      return "text-mainAccent bg-fuchsia-50 rounded-xl";
    if (url.length == 1 && pathname.length == 1)
      return "text-mainAccent bg-fuchsia-50 rounded-xl";
    return "hover:bg-fuchsia-50 rounded-xl text-[#575759]";
  };

  return (
    <Link
      scroll={false}
      href={`${url}`}
      className={`font-[400] flex flex-row items-center text-[1rem] px-[10px] py-[8px] my-[4px] transition-all duration-300 hover:text-mainAccent border-r-mainAccent 
      ${activeLink(url, pathname)} 
    `}
      onClick={clickAction}
    >
      <span className="pr-[0.5rem] ">{icon}</span>
      {title}
    </Link>
  );
};
