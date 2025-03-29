"use client";

import Link from "next/link";
import Image from "next/image";
import promo_image from "@/../public/assets/images/sidebar2.png";

import {
  BarChart3,
  Disc3,
  FileAudio2,
  Headphones,
  Info,
  MonitorPlay,
  Newspaper,
  Podcast,
} from "lucide-react";
import SidebarLinkHelper from "@/components/Layouts/main/DesktopLayout/SidebarLinkHelper";
import GlobalFullLogo from "@/components/Logo/GlobalFullLogo";

const DesktopSidebarNav = () => {
  return (
    <div className="relative sidebar-nav bg-white min-h-screen border-r-[1px] border-r-mainBorderColor w-[22rem] max-w-[18rem]">
      {/*Sidebar Layout*/}
      <div className="sticky top-0 pb-[2rem] flex flex-col justify-between min-h-screen min-[1300px]:max-[1400px]:pb-[1rem] z-[6]">
        {/*Pattern BG*/}
        <div className="pattern_bg_effect_left_sidebar" />

        <div className="relative flex flex-col">
          {/*Logo*/}
          <Link
            scroll={false}
            href="/"
            className="sidebar-logo-link flex justify-center bg-white transition-opacity duration-300 hover:opacity-80 px-[2rem] pt-[1.8rem] pb-[1.5rem] border-b-[1px] border-mainBorderColor"
          >
            <GlobalFullLogo classnames={"w-[12rem] text-center relative top-[-0.2rem]"} />
          </Link>

          {/*Sidebar Menu*/}
          <div className="sidebar-menu h-full pt-[1rem] pl-[2rem] flex flex-col">
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','mainButtonClick')}
              url="/"
              title="Главная"
              icon={<Disc3 strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleNewsClick')}
              url="/news"
              title="Новости"
              icon={<Newspaper strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleChartTrecksClick')}
              url="/chart"
              title="Чарт треков"
              icon={<BarChart3 strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleClipsClick')}
              url="/clips"
              title="Клипы"
              icon={<MonitorPlay strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleOnlineRadioClick')}
              url="/radio"
              title="Онлайн радио"
              icon={<Podcast strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleTrecksClick')}
              url="/songs"
              title="Каталог треков"
              icon={<Headphones strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleRecommendTreckClick')}
              url="/suggest-song"
              title="Предложить трек"
              icon={<FileAudio2 strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              onClick={() => window.ym(100598735,'reachGoal','handleAboutProjectClick')}
              url="/about"
              title="О проекте"
              icon={<Info strokeWidth={1.8} size={20} />}
            />




            {/*<SidebarLinkHelper*/}
            {/*  url="/artists"*/}
            {/*  title="Исполнители"*/}
            {/*  icon={<Users strokeWidth={1.8} size={20} />}*/}
            {/*/>*/}
            {/*<SidebarLinkHelper*/}
            {/*  url="/events"*/}
            {/*  title="Мероприятия"*/}
            {/*  icon={<CalendarRange strokeWidth={1.8} size={20} />}*/}
            {/*/>*/}
          </div>
        </div>

        {/*Sidebar Bottom Content*/}
        <div className="px-[1.2rem] rounded-xl cursor-pointer relative">
          <Link href="/suggest-song" scroll={false} className="group">
            <div className="rounded-xl bg-[#fbe5f9] border-[1px] border-[#fbe5f9] flex flex-col p-[1rem] group-hover:scale-[0.95] group-hover:border-[#a21caf] transition-all duration-300">
              <div className="flex flex-row items-center align-middle justify-center">
                <div className="overflow-hidden rounded-xl bg-cover h-[4.8rem] w-[4rem] min-[1300px]:max-[1400px]:h-[4.5rem]">
                  <Image
                    src={promo_image}
                    alt="promo"
                    placeholder="blur"
                    priority
                    width={300}
                    height={300}
                    className="relative top-[-10%] scale-[1.2]"
                  />
                </div>
                <div className="pl-[1rem] flex flex-col flex-1">
                  <p className="text-[0.9rem] font-[500] mb-[5px]">
                    Предложить трек
                  </p>
                  <p className="text-[0.75rem] text-[#7a7a7a] leading-4">
                    Отправь свой любимый трек на радио и слушай его в эфире!
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebarNav;
