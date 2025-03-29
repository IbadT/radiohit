'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserFavouriteTracks } from '@/lib/appwrite/db_services/songs.db.service';
import { ListMusic, Loader2 } from 'lucide-react';
import * as React from 'react';
import AccountAudioCard from '@/components/Cards/AudioCards/AccountAudioCard';

const AllFavouriteTracks = ({ userDocument }) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['userFavouriteTracks'],
    queryFn: async () => {
      return await getUserFavouriteTracks(userDocument.favouriteTracksID);
    },
  });

  return (
    <>
      <div className="mb-[1.5rem] mt-[1rem] flex flex-col rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1rem] max-lg:mt-0 max-lg:mt-[1rem] max-lg:flex-col max-md:mt-0">
        {!isLoading && !data && (
          <div className="flex h-[70vh] w-full flex-col items-center justify-center text-slate-400">
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
                  song={song}
                  refetch={refetch}
                  audioCardType={'favourite'}
                  key={song.$id}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllFavouriteTracks;
