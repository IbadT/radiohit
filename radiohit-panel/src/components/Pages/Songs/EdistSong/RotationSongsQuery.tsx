'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ArtistTracksCardLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistTracksCardLoadingSkeleton';
import { FileDown } from 'lucide-react';
import RotationSongCard from '@/components/Pages/Songs/EdistSong/RotationSongCard';
import { getUsersWhoDownloadSingleTrack } from '@/lib/appwrite/db_services/songs.db.service';

const RotationSongsQuery = ({ whoDownloadIDandDateTime, songID }) => {
  const radioIDArray = whoDownloadIDandDateTime.map((el) => {
    return el.split(' ')[0];
  });

  const downloadDateAndTimeArray = whoDownloadIDandDateTime.map((el) => {
    return el.split('-')[1];
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [`whoDownloadTrack_${songID}`],
    queryFn: async () => {
      return await getUsersWhoDownloadSingleTrack(radioIDArray);
    },
  });

  //Loading skeleton
  if (isLoading) return <ArtistTracksCardLoadingSkeleton />;

  return (
    <div className="mb-[1rem] w-full rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1.2rem]">
      <h2 className="mb-[0.6rem] text-[1.1rem] font-[600] text-[#373738]">Загрузки трека</h2>

      {!isLoading &&
        data &&
        data.map((radioDoc, index) => {
          return (
            <div key={radioDoc.$id}>
              <RotationSongCard
                radioDoc={radioDoc}
                downloadDateAndTime={downloadDateAndTimeArray[index]}
              />
            </div>
          );
        })}

      {/*If no data*/}
      {!isLoading && whoDownloadIDandDateTime.length == 0 && (
        <div className="flex h-[40vh] w-full flex-col items-center justify-center align-middle">
          <FileDown className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.2rem] text-slate-400">Нет скачиваний</p>
        </div>
      )}
    </div>
  );
};
export default RotationSongsQuery;
