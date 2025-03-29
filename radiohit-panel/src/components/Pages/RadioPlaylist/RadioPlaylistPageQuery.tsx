'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllRadioTracks } from '@/lib/appwrite/db_services/radio.db.service';
import RadioPlaylistLoadingSkeleton from '@/components/LoadingSkeletons/RadioPlaylist/RadioPlaylistLoadingSkeleton';
import { RadioTower } from 'lucide-react';
import RadioPlaylistAudioCard from '@/components/Pages/RadioPlaylist/RadioPlaylistAudioCard';
import RadioTracksSearch from '@/components/Serach/RadioTracksSearch/RadioTracksSearch';

const RadioPlaylistPageQuery = () => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['all_radio_tracks_playlist'],
    queryFn: async () => {
      return await getAllRadioTracks();
    },
  });

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Плейлист радио</p>
        <RadioTracksSearch refetch={refetch} />
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <RadioPlaylistLoadingSkeleton />}

        {!isLoading &&
          data &&
          data.map((song) => {
            return (
              <RadioPlaylistAudioCard
                song={song}
                allowDelete={data.length > 2}
                key={song.$id}
                refetch={refetch}
              />
            );
          })}

        {!data && (
          <div className="flex h-[60vh] w-full flex-col items-center justify-center align-middle">
            <RadioTower className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={50} />
            <p className="items-center text-[1.4rem] text-slate-400">Плейлист пуст</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RadioPlaylistPageQuery;
