import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import {FileText, MoveRight} from "lucide-react";
import React from "react";
import Image from "next/image";
import RadioDownloadedTracksQuery from "@/components/Pages/RadioUsers/RadioUserInfo/RadioDownloadedTracksQuery";

const RadioUserInfoPageContent = ({ radioDoc }) => {
  //User Registration Date
  const registerDate = new Date(radioDoc.$createdAt).toLocaleDateString(
    "ru-RU"
  );

  //Updated date
  const updatedDate = new Date(radioDoc.$updatedAt).toLocaleDateString("ru-RU");

  //Updated time
  const updatedTime = new Date(radioDoc.$updatedAt).toLocaleTimeString("ru-RU", { timeStyle: "short" });

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">Информация о радиостанции</p>
        <Link
          href="/radio-users"
          className={cn(
            "flex flex-row items-center gap-[0.5rem] text-gray-500 text-[0.9rem] transition-colors duration-300 hover:text-fuchsia-700"
          )}
        >
          Все радиостанции
          <MoveRight strokeWidth={1.5} size={18} />
        </Link>
      </div>

      {/*Page Content*/}
      <div className="flex flex-row items-center justify-between bg-white border-[1px] border-mainBorderColor rounded-2xl p-[1rem] mt-[1rem] max-lg:mt-0 max-lg:flex-col">
        <div className="flex flex-row items-center w-[70%] max-lg:w-full max-lg:justify-center max-sm:justify-start">
          {radioDoc.userImageURL == null && (
            <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
              {/*<Image*/}
              {/*  src={defaultImageAvatar}*/}
              {/*  alt="avatar"*/}
              {/*  fill*/}
              {/*  priority*/}
              {/*  className="w-full h-full bg-cover object-cover"*/}
              {/*/>*/}
            </div>
          )}
          {radioDoc.userImageURL != null && (
            <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
              <Image
                src={radioDoc.userImageURL}
                alt="avatar"
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full bg-cover object-cover"
              />
            </div>
          )}

          <div className="flex flex-col">
            <p className="font-[600] text-slate-700 leading-0 group-hover:text-mainAccent transition-colors duration-300 text-[1.8rem] max-sm:text-[1.2rem] whitespace-nowrap overflow-hidden max-w-[26rem] max-md:max-w-[14rem] overflow-ellipsis">
              {radioDoc.name}
            </p>
            <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300 text-[1.1rem] relative max-sm:text-[0.9rem]">
              {radioDoc.email}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-around w-full max-lg:mt-[2rem] max-sm:mt-[1rem] max-sm:border-t-mainBorderColor max-sm:border-t-[1px]">
          {/*For Radio Uploaded Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
            <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
              {radioDoc.downloadTracksID.length}
            </span>
            <p className="text-slate-500">Скачано треков</p>
          </div>

          {/*For All Favourite Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
            <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
              {radioDoc.favouriteTracksID.length}
            </span>
            <p className="text-slate-500"> Избранных треков</p>
          </div>

          {/*For User Liked Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
            <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
              {radioDoc.likedArtistsID.length}
            </span>
            <p className="text-slate-500">Оценок трекам</p>
          </div>
        </div>
      </div>

      {/*Bottom Info*/}
      <div className="w-full mt-[1.2rem] flex flex-row gap-[1.2rem]">
        {/*Left Content*/}
        <div className="w-[50%] h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col sticky top-[1.5rem]">
          <h2 className="text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]">Информация</h2>
          <div className='flex flex-row items-center border-[1px] border-slate-300 rounded-2xl p-[0.8rem] bg-gray-50 min-[1200px]:max-[1500px]:text-[0.85rem]'>
            <p className='text-gray-600'>Представитель: <span className='font-[500]'>{radioDoc.radioAgentName}</span></p>
          </div>
          <div className='flex flex-row items-center border-[1px] border-slate-300 rounded-2xl p-[0.8rem] bg-gray-50 mt-[1rem] min-[1200px]:max-[1500px]:text-[0.85rem]'>
            <p className='text-gray-600'>Email: <span className='font-[500]'>{radioDoc.email}</span></p>
          </div>
          <div className='flex flex-row items-center border-[1px] border-slate-300 rounded-2xl p-[0.8rem] bg-gray-50 mt-[1rem] min-[1200px]:max-[1500px]:text-[0.85rem]'>
            <p className='text-gray-600'>Дата регистрации: <span className='font-[500]'>{registerDate}</span></p>
          </div>
          <div className='flex flex-row items-center border-[1px] border-slate-300 rounded-2xl p-[0.8rem] bg-gray-50 mt-[1rem] min-[1200px]:max-[1500px]:text-[0.85rem]'>
            <p className='text-gray-600'>Последняя активность: <span className='font-[500]'>{updatedDate} в {updatedTime}</span></p>
          </div>
        </div>

        {/*Right Content*/}
        <div className='w-full flex flex-col'>
          <div className="w-full bg-white h-min border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl">
            <h2 className="text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]">Описание радиостанции</h2>
            {radioDoc.radioDescription && radioDoc.radioDescription.length > 10 &&<p className='text-[0.9rem] text-slate-600'>{radioDoc.radioDescription}</p>}
            {radioDoc.radioDescription && radioDoc.radioDescription.length < 10 && (
                <div className="flex flex-col w-full items-center justify-center h-[12rem] text-slate-500">
                  <FileText size={40} strokeWidth={1.2} />
                  <p className="text-[1.2rem] mt-[1rem]">Нет описания</p>
                </div>
            )}
          </div>


          <div className="w-full mt-[1.5rem]">
              <RadioDownloadedTracksQuery
                  downloadTracksID={radioDoc.downloadTracksID}
                  docID={radioDoc.$id}
              />
          </div>


        </div>

      </div>
    </div>
  );
};

export default RadioUserInfoPageContent;
