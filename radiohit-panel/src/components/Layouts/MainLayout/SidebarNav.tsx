import Link from "next/link";

import {
  AlertTriangle,
  BarChart3,
  CalendarRange,
  MoveRight,
  Music,
  Newspaper,
  PictureInPicture2,
  Podcast,
  RadioTower,
  SquarePen,
  UserCircle,
  Users,
  Youtube,
} from "lucide-react";
import SidebarLinkHelper from "@/components/Layouts/MainLayout/SidebarLinkHelper";
import GlobalFullLogo from "@/components/Logo/GlobalFullLogo";

const DesktopSidebarNav = () => {
  return (
    <div className="sidebar-nav bg-layoutBG min-h-screen w-[19rem] max-w-[19rem]">
      <div className="sticky top-[1.5rem] pb-[1.5rem] pt-[1.8rem] flex flex-col justify-between min-h-[95vh] min-[1300px]:max-[1400px]:pb-[1rem] z-[6] bg-white mt-[1.5rem] ml-[1rem] mb-[1.5rem] rounded-2xl border-[1px] border-mainBorderColor">
        <div className="flex flex-col">
          {/*Logo*/}
          <Link
            scroll={false}
            href="/dashboard"
            className="sidebar-logo-link transition-opacity duration-300 hover:opacity-80 w-full text-center flex items-center justify-center"
          >
            <GlobalFullLogo classnames={"w-[9rem] text-center"} />
          </Link>

          {/*Sidebar Menu*/}
          <div className="sidebar-menu h-full pt-[1.8rem] pl-[1rem] flex flex-col">
            <SidebarLinkHelper
              url="/dashboard"
              title="Обзор"
              icon={<BarChart3 strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/artists"
              title="Исполнители"
              icon={<Users strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/songs"
              title="Каталог треков"
              icon={<Music strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/moderation"
              title="Модерация треков"
              icon={<AlertTriangle strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/suggested-songs"
              title="Предложенные треки"
              icon={<SquarePen strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/radio-playlist"
              title="Плейлист радио"
              icon={<Podcast strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/news"
              title="Новости"
              icon={<Newspaper strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/events"
              title="Мероприятия"
              icon={<CalendarRange strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/clips"
              title="Клипы"
              icon={<Youtube strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/radio-users"
              title="Радиостанции"
              icon={<RadioTower strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/users"
              title="Пользователи"
              icon={<UserCircle strokeWidth={1.8} size={20} />}
            />
            <SidebarLinkHelper
              url="/edit-banner"
              title="Изменить баннер"
              icon={<PictureInPicture2 strokeWidth={1.8} size={20} />}
            />
          </div>
        </div>

        {/*Sidebar Bottom Content*/}
        <div className="w-full px-[1rem]">
          <a
            href="https://radiohit.by/"
            target="_blank"
            className="w-full rounded-2xl gap-[0.5rem] text-slate-500 justify-center font-[400] flex flex-row items-center text-[1rem] pl-[15px] py-[10px] transition-all duration-300 hover:text-mainAccent border-[1px] border-white cursor-pointer bg-gray-50 hover:bg-fuchsia-50 hover:border-fuchsia-300 min-[1300px]:max-[1440px]:text-[0.8rem]"
          >
            Radiohit.by
            <MoveRight strokeWidth={1.2} className="h-auto w-[1.2rem] min-[1300px]:max-[1440px]:w-[0.8rem]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebarNav;
