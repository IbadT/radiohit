import { useQuery } from '@tanstack/react-query';
import { getUserFavouriteTracks } from '@/lib/appwrite/db_services/songs.db.service';
import { ListMusic, Loader2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import AccountAudioCard from '@/components/Cards/AudioCards/AccountAudioCard';

const AccountFavouriteTacksShortCardInner = ({ userDocument }) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['userFavouriteTracks'],
    queryFn: async () => {
      return await getUserFavouriteTracks(userDocument.favouriteTracksID);
    },
  });

  return (
    <>
      <div className="mt-[1rem] flex flex-col rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1rem] max-lg:mt-0 max-lg:mt-[1rem] max-lg:flex-col max-md:mt-[1rem]">
        <div className="mb-[1rem] flex flex-row items-center justify-between">
          <p className="text-[1.2rem] font-[500] text-[#39383A] lg:pl-[0.5rem]">Избранные треки</p>
          <Link
            scroll={false}
            href="/account/favorites"
            className="flex items-center text-[0.9rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent max-md:hidden lg:pr-[0.5rem]"
          >
            Весь список избранного
          </Link>
        </div>

        {!isLoading && data?.length == 0 && (
          <div className="flex h-[30vh] w-full flex-col items-center justify-center text-slate-400">
            <ListMusic size={50} strokeWidth={2} />
            <p className="mt-[1rem] text-[1.2rem] font-[400] lg:pl-[0.5rem]">
              У вас нет избранных треков
            </p>
          </div>
        )}
        {isLoading && (
          <div className="h-70vh flex h-[60vh] w-full flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-slate-400" strokeWidth={1} />
            <p className="mt-[0.5rem] text-[1rem] text-slate-400">Загрузка треков...</p>
          </div>
        )}
        {!isLoading &&
          data &&
          data.map((song, index) => {
            return (
              <div key={song.$id}>
                <AccountAudioCard
                  key={song.$id}
                  song={song}
                  refetch={refetch}
                  audioCardType={'favourite'}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AccountFavouriteTacksShortCardInner;
