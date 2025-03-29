'use client';
import { useQuery } from '@tanstack/react-query';

const PollingRadioHitSongData = () => {
  return <GetCurrentSongData />;
};
export default PollingRadioHitSongData;

const GetCurrentSongData = () => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['radio_radiohit_current_song'],
    queryFn: async () => {
      return await fetch('https://stream.radiohit.by/current-track-info').then((res) => res.json());
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  return (
    <p>
      {!isLoading && data.trackInfo.artistName} - {!isLoading && data.trackInfo.songName}
    </p>
  );
};
