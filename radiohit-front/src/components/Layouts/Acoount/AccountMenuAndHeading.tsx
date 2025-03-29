"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Download,
  ListTodo,
  LogOut,
  Music4,
  Settings,
  Upload,
  User,
} from "lucide-react";
import * as React from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import PageHeading from "@/components/Text/PageHeading";
import AccountMenuSkeleton from "@/components/LoadingSkeletons/Account/AccountMenuSkeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";

const AccountMenuAndHeading = () => {
  const pathname = usePathname();
  const { userDocument, hasHydrated, logout, isAuthenticated } = useAuth();

  const activeLinkHeading = () => {
    if (pathname.includes("/account/settings")) {
      return "Настройки аккаунта";
    } else if (pathname.includes("/account/favorites")) {
      return "Избранные треки";
    } else if (pathname.includes("/account/upload-track")) {
      return "Загрузить трек";
    } else if (pathname.includes("/account/download-tracks")) {
      return "Скачанные треки";
    } else if (pathname.includes("/account/uploaded-tracks")) {
      return "Загруженные треки";
    } else if (pathname.includes("/account/artist-create")) {
      return "Информация о исполнителе";
    }
    return "Мой аккаунт";
  };

  return (
    <div className="flex flex-col">
      <PageHeading text={`${activeLinkHeading()}`} classnames="max-lg:hidden" />
      {!hasHydrated && <AccountMenuSkeleton />}
      {hasHydrated && isAuthenticated && (
        <div className="flex flex-row items-center max-lg:hidden w-full bg-white border-[1px] border-mainBorderColor rounded-2xl px-[1rem] py-[0.6rem] justify-between">
          <div className="flex flex-row items-center">
            {/*Account page*/}
            <AccountMenuLinkHelper
              url="/account"
              title="Мой аккаунт"
              icon={<User strokeWidth={1.8} size={20} />}
              pathname={pathname}
            />

            {/*Account Already Uploaded track => for Artist*/}
            {userDocument.role == "artist" && (
              <AccountMenuLinkHelper
                url="/account/uploaded-tracks"
                title="Мои треки"
                icon={<ListTodo strokeWidth={1.8} size={20} />}
                pathname={pathname}
              />
            )}

            {/*Account Favorite tracks*/}
            <AccountMenuLinkHelper
              url="/account/favorites"
              title="Избранные треки"
              icon={<Music4 strokeWidth={1.8} size={20} />}
              pathname={pathname}
            />

            {/*Account Upload track => for Artist*/}
            {userDocument.role != "radio" && (
              <AccountMenuLinkHelper
                url="/account/upload-track"
                title="Загрузить трек"
                icon={<Upload strokeWidth={1.8} size={20} />}
                pathname={pathname}
              />
            )}

            {/*Account Download tracks => for Radio*/}
            {userDocument.role == "radio" && (
              <AccountMenuLinkHelper
                url="/account/download-tracks"
                title="Скачанные треки"
                icon={<Download strokeWidth={1.8} size={20} />}
                pathname={pathname}
              />
            )}

            {/*Account Settings*/}
            <AccountMenuLinkHelper
              url="/account/settings"
              title="Настройки аккаунта"
              icon={<Settings strokeWidth={1.8} size={20} />}
              pathname={pathname}
            />
          </div>

          {/*Logout*/}
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <LogOut
                  strokeWidth={1.8}
                  size={20}
                  className="text-[1rem] transition-colors duration-300 hover:text-red-500"
                  onClick={logout}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Выход</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default AccountMenuAndHeading;

const AccountMenuLinkHelper = ({ url, title, icon, pathname }) => {
  //Check if link active
  const activeLink = (url: string, pathname: string) => {
    if (url.length > 8 && pathname.includes(url))
      return "text-mainAccent bg-fuchsia-50";
    if (url.length == 8 && pathname.length == 8)
      return "text-mainAccent bg-fuchsia-50";
    return "hover:bg-fuchsia-50 text-[#575759]";
  };

  return (
    <Link
      scroll={false}
      href={`${url}`}
      className={`mr-[5px] font-[400] flex flex-row items-center text-[1rem] px-[10px] py-[4px] my-[4px] transition-all duration-300 hover:text-mainAccent rounded-xl
      ${activeLink(url, pathname)} 
    `}
    >
      <span className="pr-[0.5rem] ">{icon}</span>
      {title}
    </Link>
  );
};
