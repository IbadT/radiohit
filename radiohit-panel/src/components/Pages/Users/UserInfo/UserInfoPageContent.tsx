import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { MoveRight, UserSquare2 } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import UserFavouriteTracksQuery from '@/components/Pages/Users/UserInfo/UserFavouriteTracksQuery';
import UserRatedTracksQuery from '@/components/Pages/Users/UserInfo/UserRatedTracksQuery';

const UserInfoPageContent = ({ userDoc }) => {
  //User Registration Date
  const registerDate = new Date(userDoc.$createdAt).toLocaleDateString('ru-RU');

  //Updated date
  const updatedDate = new Date(userDoc.$updatedAt).toLocaleDateString('ru-RU');

  //Updated time
  const updatedTime = new Date(userDoc.$updatedAt).toLocaleTimeString('ru-RU', {
    timeStyle: 'short',
  });

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Информация о пользователе</p>
        <Link
          href="/users"
          className={cn(
            'flex flex-row items-center gap-[0.5rem] text-[0.9rem] text-gray-500 transition-colors duration-300 hover:text-fuchsia-700',
          )}
        >
          Все пользователи
          <MoveRight strokeWidth={1.5} size={18} />
        </Link>
      </div>

      {/*Page Content*/}
      <div className="mt-[1rem] flex flex-row items-center justify-between rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1rem] max-lg:mt-0 max-lg:flex-col">
        <div className="flex w-[70%] flex-row items-center max-lg:w-full max-lg:justify-center max-sm:justify-start">
          {userDoc.userImageURL == null && (
            <div className="relative mr-[1.5rem] flex h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 bg-cover align-middle max-sm:h-[4rem] max-sm:w-[4rem]">
              <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center gap-[0.5rem] text-center text-slate-500">
                <UserSquare2 strokeWidth={1.5} size={40} />
                {/*<p className='text-[0.7rem]'>Нет изображения</p>*/}
              </div>
            </div>
          )}
          {userDoc.userImageURL != null && (
            <div className="relative mr-[1.5rem] flex h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 bg-cover align-middle max-sm:h-[4rem] max-sm:w-[4rem]">
              <Image
                src={userDoc.userImageURL}
                alt="avatar"
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full bg-cover object-cover"
              />
            </div>
          )}

          <div className="flex flex-col">
            <p className="leading-0 max-w-[26rem] overflow-hidden overflow-ellipsis whitespace-nowrap text-[1.8rem] font-[600] text-slate-700 transition-colors duration-300 group-hover:text-mainAccent max-md:max-w-[14rem] max-sm:text-[1.2rem]">
              {userDoc.name}
            </p>
            <p className="relative text-[0.8rem] text-[1.1rem] font-[300] text-slate-500 transition-colors duration-300 group-hover:text-mainAccent max-sm:text-[0.9rem]">
              {userDoc.email}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-around max-lg:mt-[2rem] max-sm:mt-[1rem] max-sm:border-t-[1px] max-sm:border-t-mainBorderColor">
          {/*For Radio Uploaded Tracks Count*/}
          {/*<div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">*/}
          {/*  <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">*/}
          {/*    {userDoc.downloadTracksID.length}*/}
          {/*  </span>*/}
          {/*  <p className="text-slate-500">Скачано треков</p>*/}
          {/*</div>*/}

          {/*For All Favourite Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:pt-[0.8rem] max-sm:text-center max-sm:text-[0.8rem]">
            <span className="mr-[0.5rem] text-[1.1rem] font-[600] text-slate-500">
              {userDoc.favouriteTracksID.length}
            </span>
            <p className="text-slate-500"> Избранных треков</p>
          </div>

          {/*For User Liked Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:pt-[0.8rem] max-sm:text-center max-sm:text-[0.8rem]">
            <span className="mr-[0.5rem] text-[1.1rem] font-[600] text-slate-500">
              {userDoc.ratedTracksID.length}
            </span>
            <p className="text-slate-500">Оценок трекам</p>
          </div>
        </div>
      </div>

      {/*Bottom Info*/}
      <div className="mt-[1.2rem] flex w-full flex-row gap-[1.2rem]">
        {/*Left Content*/}
        <div className="sticky top-[1.5rem] flex h-min w-[50%] flex-col rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1.2rem]">
          <h2 className="mb-[0.6rem] text-[1.1rem] font-[600] text-[#373738]">Информация</h2>
          <div className="flex flex-row items-center rounded-2xl border-[1px] border-slate-300 bg-gray-50 p-[0.8rem] min-[1200px]:max-[1500px]:text-[0.85rem]">
            <p className="text-gray-600">
              Email: <span className="font-[500]">{userDoc.email}</span>
            </p>
          </div>
          <div className="mt-[1rem] flex flex-row items-center rounded-2xl border-[1px] border-slate-300 bg-gray-50 p-[0.8rem] min-[1200px]:max-[1500px]:text-[0.85rem]">
            <p className="text-gray-600">
              Дата регистрации: <span className="font-[500]">{registerDate}</span>
            </p>
          </div>
          <div className="mt-[1rem] flex flex-row items-center rounded-2xl border-[1px] border-slate-300 bg-gray-50 p-[0.8rem] min-[1200px]:max-[1500px]:text-[0.85rem]">
            <p className="text-gray-600">
              Последняя активность:{' '}
              <span className="font-[500]">
                {updatedDate} в {updatedTime}
              </span>
            </p>
          </div>
        </div>

        {/*Right Content*/}
        <div className="flex w-full flex-col">
          <div className="mb-[1.5rem] w-full">
            <UserFavouriteTracksQuery
              favouriteTracksID={userDoc.favouriteTracksID}
              docID={userDoc.$id}
            />
          </div>

          <div className="mb-[1.5rem] w-full">
            <UserRatedTracksQuery ratedTracksID={userDoc.ratedTracksID} docID={userDoc.$id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPageContent;
