'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ArtistTracksCardLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistTracksCardLoadingSkeleton';
import { Download, MoveRight } from 'lucide-react';
import RadioDownloadedTracksCard from '@/components/Pages/RadioUsers/RadioUserInfo/RadioDownloadedTracksCard';
import { getRadioDownloadedTracks } from '@/lib/appwrite/db_services/users.db.service';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';

const RadioDownloadedTracksQuery = ({ downloadTracksID, docID }) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [`radioUserDownLoadedTracks_${docID}`],
    queryFn: async () => {
      return await getRadioDownloadedTracks(downloadTracksID);
    },
  });

  //Loading skeleton
  if (isLoading) return <ArtistTracksCardLoadingSkeleton />;

  return (
    <div className="mb-[1rem] w-full rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1.2rem]">
      <div className="mb-[0.6rem] flex w-full flex-row items-center justify-between">
        <h2 className="text-[1.1rem] font-[600] text-[#373738]">Скачанные треки</h2>
        <Link
          href="/songs"
          className={cn(
            'flex flex-row items-center gap-[0.5rem] text-[0.9rem] text-gray-500 transition-colors duration-300 hover:text-fuchsia-700',
          )}
        >
          Все треки
          <MoveRight strokeWidth={1.5} size={18} />
        </Link>
      </div>

      {!isLoading &&
        data &&
        data.map((song, index) => {
          return (
            <div key={song.$id}>
              <RadioDownloadedTracksCard song={song} />
            </div>
          );
        })}

      {/*If no data*/}
      {!isLoading && downloadTracksID.length == 0 && (
        <div className="flex h-[40vh] w-full flex-col items-center justify-center align-middle">
          <Download className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.2rem] text-slate-400">Нет загрузок</p>
        </div>
      )}
    </div>
  );
};
export default RadioDownloadedTracksQuery;
