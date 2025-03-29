import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2, Mic2, MoveRight, Podcast, Users } from "lucide-react";
import * as React from "react";
import Link from "next/link";

const InfoStatisticsRow = ({ allUsersCollection, isLoading }) => {

  const artistsCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "artist").length;
  const usersCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "user").length;
  const radioUsersCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "radio").length;

  return (
    <>
      {isLoading && <LoadingSkeleton/>}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-[1.5rem]">
          {/*Artists*/}
          <Link
            href="/artists"
            className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full px-[1.2rem] pt-[1.2rem] pb-[1.2rem] w-full group transition all duration-300 hover:border-fuchsia-300"
          >
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-[#373738] font-[600] text-[1rem]">
                  Исполнители
                </h2>
                <p className="text-slate-600 transition-colors duration-300 hover:text-mainAccent">
                  <MoveRight
                    size={16}
                    strokeWidth={1}
                    className="transition-colors duration-300 group-hover:text-fuchsia-600"
                  />
                </p>
              </div>
              <p className="text-gray-500 text-[0.7rem] font-[300]">
                Общее количество исполнителей
              </p>
            </div>

            <div className="flex flex-row items-center w-full justify-center gap-[1rem] border-[1px] rounded-2xl border-gray-300 bg-gray-50 mt-[0.6rem] text-slate-500 py-[0.3rem] transition-colors duration-300 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-50 group-hover:border-fuchsia-300">
              <Mic2
                strokeWidth={2}
                className="h-[1.5rem] w-[1.5rem] min:[1200px]:max-[1460px]:w-[1.3rem] min-[1200px]:max-[1460px]:h-[1.3rem]"
              />
              <p className="font-[500] text-[1.5rem] min-[1200px]:max-[1460px]:!text-[1.2rem]">
                {artistsCount}
              </p>
            </div>
          </Link>

          {/*Users*/}
          <Link
            href="/users"
            className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full px-[1.2rem] pt-[1.2rem] pb-[1rem] w-full group transition all duration-300 hover:border-fuchsia-300"
          >
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-[#373738] font-[600] text-[1rem]">
                  Пользователи
                </h2>
                <p className="text-slate-600 transition-colors duration-300 hover:text-mainAccent">
                  <MoveRight
                    size={16}
                    strokeWidth={1}
                    className="transition-colors duration-300 group-hover:text-fuchsia-600"
                  />
                </p>
              </div>
              <p className="text-gray-500 text-[0.7rem] font-[300]">
                Общее количество пользователей
              </p>
            </div>
            <div className="flex flex-row items-center w-full justify-center gap-[1rem] border-[1px] rounded-2xl border-gray-300 bg-gray-50 mt-[0.6rem] text-slate-500 py-[0.3rem] transition-colors duration-300 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-50 group-hover:border-fuchsia-300">
              <Users
                strokeWidth={2}
                className="h-[1.5rem] w-[1.5rem] min:[1200px]:max-[1460px]:w-[1.3rem] min-[1200px]:max-[1460px]:h-[1.3rem]"
              />
              <p className="font-[500] text-[1.5rem] min-[1200px]:max-[1460px]:!text-[1.2rem]">
                {usersCount}
              </p>
            </div>
          </Link>

          {/*Radio Users*/}
          <Link
            href="/radio-users"
            className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full px-[1.2rem] pt-[1.2rem] pb-[1rem] w-full group transition all duration-300 hover:border-fuchsia-300"
          >
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-[#373738] font-[600] text-[1rem]">
                  Радиостанции
                </h2>
                <p className="text-slate-600 transition-colors duration-300 hover:text-mainAccent">
                  <MoveRight
                    size={16}
                    strokeWidth={1}
                    className="transition-colors duration-300 group-hover:text-fuchsia-600"
                  />
                </p>
              </div>
              <p className="text-gray-500 text-[0.7rem] font-[300]">
                Общее количество радиостанций
              </p>
            </div>
            <div className="flex flex-row items-center w-full justify-center gap-[1rem] border-[1px] rounded-2xl border-gray-300 bg-gray-50 mt-[0.6rem] text-slate-500 py-[0.3rem] transition-colors duration-300 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-50 group-hover:border-fuchsia-300">
              <Podcast
                strokeWidth={2}
                className="h-[1.5rem] w-[1.5rem] min:[1200px]:max-[1460px]:w-[1.3rem] min-[1200px]:max-[1460px]:h-[1.3rem]"
              />
              <p className="font-[500] text-[1.5rem] min-[1200px]:max-[1460px]:!text-[1.2rem]">
                {radioUsersCount}
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
export default InfoStatisticsRow;

const LoadingSkeleton = () => {
  return (
      <div className="grid grid-cols-3 gap-[1.5rem]">
        <Skeleton className="h-[13.5vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex flex flex-col gap-[1rem]">
          <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-400" />
        </Skeleton>
        <Skeleton className="h-[13.5vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex flex flex-col gap-[1rem]">
          <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-400" />
        </Skeleton>
        <Skeleton className="h-[13.5vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex flex flex-col gap-[1rem]">
          <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-400" />
        </Skeleton>
      </div>
  );
};
