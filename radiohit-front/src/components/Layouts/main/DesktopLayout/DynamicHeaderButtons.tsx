"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/Buttons/Button";
import { useAuth } from "@/lib/hooks/useAuth";
import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2, LogIn, User } from "lucide-react";
import * as React from "react";
import DesktopAccountMenu from "@/components/Layouts/main/DesktopLayout/DesktopAccountMenu";
import { defaultImageAvatar } from "@/lib/utils/utils";
import Image from "next/image";

const DynamicHeaderButtons = () => {
  const { isAuthenticated, hasHydrated, userDocument } = useAuth();

  return (
    <>
      {/*Loading indicator*/}
      {!hasHydrated && (
        <Skeleton className="h-[40px] w-[16.2rem] bg-gray-200 text-center align-middle items-center justify-center flex">
          <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        </Skeleton>
      )}
      {/*If user not logged*/}
      {hasHydrated && !isAuthenticated && (
        <div className="flex flex-row align-middle items-center gap-[1.5rem]">
          <Link
            scroll={false}
            href="/register"
            className={
              buttonVariants({ variant: "register" }) + "flex flex-row w-max px-[18px]"
            }
          >
            <User strokeWidth={1.8} size={20} className="mr-[10px]" />{" "}
            Регистрация
          </Link>
          <Link
            scroll={false}
            href="/login"
            className={
              buttonVariants({
                variant: "login",
              }) + " flex flex-row"
            }
          >
            <LogIn strokeWidth={1.8} size={20} className="mr-[10px]" /> Вход
          </Link>
        </div>
      )}
      {/*If user logged*/}
      {hasHydrated && isAuthenticated && (
        <div className="w-[16.2rem] h-[40px] flex flex-row items-center justify-around">
          <Link
            href="/account"
            className="group flex flex-row items-center"
            scroll={false}
          >
            {/*User Image*/}
            {userDocument.userImageURL == null && (
              <div className="w-[40px] h-[40px] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1rem] cursor-pointer transition-opacity group-hover:opacity-80 duration-300 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
                <Image
                  src={defaultImageAvatar}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="avatar"
                  priority
                  fill
                  className="w-full h-full bg-cover object-cover"
                />
              </div>
            )}
            {userDocument.userImageURL != null && (
              <div className="w-[40px] h-[40px] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1rem] cursor-pointer transition-opacity group-hover:opacity-80 duration-300 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
                <Image
                  src={userDocument.userImageURL}
                  alt="avatar"
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full bg-cover object-cover"
                />
              </div>
            )}

            <div className="flex flex-col">
              <p className="font-[500] text-slate-700 leading-0 group-hover:text-mainAccent transition-colors duration-300 whitespace-nowrap overflow-hidden max-w-[10.2rem] overflow-ellipsis">
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
          </Link>
          <DesktopAccountMenu userDocument={userDocument} />
        </div>
      )}
    </>
  );
};

export default DynamicHeaderButtons;
