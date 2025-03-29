"use client";
import {
  Settings,
  User,
  Music4,
  Upload,
  Download,
  LogOut,
  ListTodo,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet/sheet";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import * as React from "react";
import { defaultImageAvatar } from "@/lib/utils/utils";
import { Separator } from "@/components/ui/Separator/separator";
import Image from "next/image";

const MobileAccountMenu = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, hasHydrated, userDocument, logout } = useAuth();

  return (
    <>
      {hasHydrated && isAuthenticated && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="focus:ring-0 outline-none">
            {/*User Avatar Trigger*/}
            {userDocument.userImageURL != null && (
              <div className="w-[38px] h-[38px] bg-gray-100 items-center relative rounded-full overflow-hidden bg-cover">
                <Image
                  src={userDocument.userImageURL}
                  alt="avatar"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full bg-cover object-cover"
                />
              </div>
            )}
            {userDocument.userImageURL == null && (
              <div className="w-[38px] h-[38px] bg-gray-100 items-center relative rounded-full overflow-hidden bg-cover">
                <Image
                  src={defaultImageAvatar}
                  alt="avatar"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full bg-cover object-cover"
                />
              </div>
            )}
          </SheetTrigger>
          <SheetContent
            className="mobile-menu-sheet w-[250px] sm:w-[440px] overflow-y-scroll border-none bg-white outline-none focus:ring-0 z-[99999]"
            side="right"
          >
            {/*User Avatar*/}
            <div className="flex flex-row justify-start items-center pb-[20px] mb-[20px] border-b-[1px] focus-none">
              {userDocument.userImageURL != null && (
                <div className="w-[38px] h-[38px] bg-gray-100 items-center relative rounded-full overflow-hidden bg-cover mr-[1.2rem]">
                  <Image
                    src={userDocument.userImageURL}
                    alt="avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover"
                  />
                </div>
              )}
              {userDocument.userImageURL == null && (
                <div className="w-[38px] h-[38px] bg-gray-100 items-center relative rounded-full overflow-hidden bg-cover mr-[1.2rem]">
                  <Image
                    src={defaultImageAvatar}
                    alt="avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <p className="font-[500] text-slate-700 leading-0 group-hover:text-mainAccent transition-colors duration-300 whitespace-nowrap overflow-hidden max-w-[8.6rem] overflow-ellipsis">
                  {userDocument.name}
                </p>
                {userDocument.role === "user" && (
                  <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300">
                    Аккаунт пользователя
                  </p>
                )}
                {userDocument.role === "radio" && (
                  <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300">
                    Аккаунт радиостанции
                  </p>
                )}
                {userDocument.role === "artist" && (
                  <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300">
                    Аккаунт исполнителя
                  </p>
                )}
              </div>
            </div>
            {/*Mobile menu*/}
            <div className="mobile-menu">
              {/*Mobile Account page*/}
              <MobileAccountMenuLinkHelper
                url="/account"
                title="Мой аккаунт"
                icon={<User strokeWidth={1.8} size={20} />}
                clickAction={() => setOpen(false)}
              />

              {/*Already Uploaded tracks => for Artist*/}
              {userDocument.role == "artist" && (
                <MobileAccountMenuLinkHelper
                  url="/account/uploaded-tracks"
                  title="Мои треки"
                  icon={<ListTodo strokeWidth={1.8} size={20} />}
                  clickAction={() => setOpen(false)}
                />
              )}

              {/*Upload track => for Artist*/}
              {userDocument.role != "radio" && (
                <MobileAccountMenuLinkHelper
                  url="/account/upload-track"
                  title="Загрузить трек"
                  icon={<Upload strokeWidth={1.8} size={20} />}
                  clickAction={() => setOpen(false)}
                />
              )}

              {/*Mobile Favorite tracks*/}
              <MobileAccountMenuLinkHelper
                url="/account/favorites"
                title="Избранные треки"
                icon={<Music4 strokeWidth={1.8} size={20} />}
                clickAction={() => setOpen(false)}
              />

              {/*Download tracks => for Radio*/}
              {userDocument.role == "radio" && (
                <MobileAccountMenuLinkHelper
                  url="/account/download-tracks"
                  title="Скачанные треки"
                  icon={<Download strokeWidth={1.8} size={20} />}
                  clickAction={() => setOpen(false)}
                />
              )}

              {/*Mobile Settings*/}
              <MobileAccountMenuLinkHelper
                url="/account/settings"
                title="Настройки аккаунта"
                icon={<Settings strokeWidth={1.8} size={20} />}
                clickAction={() => setOpen(false)}
              />

              <Separator className="my-[15px]" />

              {/*Logout*/}
              <div
                className={`font-[400] flex flex-row items-center text-[1rem] px-[10px] py-[6px] my-[4px] transition-all duration-300 hover:text-mainAccent border-r-mainAccent text-red-500`}
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                <span className="pr-[0.5rem] ">
                  <LogOut className="mr-2 h-4 w-4" />
                </span>
                Выход
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default MobileAccountMenu;

const MobileAccountMenuLinkHelper = ({ url, title, icon, clickAction }) => {
  const pathname = usePathname();

  //Check if link active
  const activeLink = (url: string, pathname: string) => {
    if (url.length > 8 && pathname.includes(url))
      return "text-mainAccent bg-fuchsia-50 rounded-xl";
    if (url.length == 8 && pathname.length == 8)
      return "text-mainAccent bg-fuchsia-50 rounded-xl";
    return "hover:bg-fuchsia-50 rounded-xl text-[#575759]";
  };

  return (
    <Link
      scroll={false}
      href={`${url}`}
      className={`font-[400] flex flex-row items-center text-[1rem] px-[10px] py-[6px] my-[4px] transition-all duration-300 hover:text-mainAccent border-r-mainAccent 
      ${activeLink(url, pathname)} 
    `}
      onClick={clickAction}
    >
      <span className="pr-[0.5rem] ">{icon}</span>
      {title}
    </Link>
  );
};
