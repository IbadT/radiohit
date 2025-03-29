"use client";

import { useQuery } from "@tanstack/react-query";
import { RadioTower} from "lucide-react";
import RadioTracksAudioCard from "@/components/Cards/AudioCards/RadioTracksAudioCard";
import { getAllRadioTracks } from "@/lib/appwrite/db_services/songs.db.service";
import RadioTracksLoadingSkeleton from "@/components/LoadingSkeletons/Radio/RadioTracksLoadingSkeleton";

const RadioTracksCard = () => {

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["all_radio_tracks_playlist"],
    queryFn: async () => {
      return await getAllRadioTracks();
    },
  });

  //Loading skeleton
  if (isLoading) return <RadioTracksLoadingSkeleton />;

  return (
    <>
      {!isLoading &&
        data &&
        data.map((song) => {
          return (
            <div key={song.$id}>
              <RadioTracksAudioCard song={song} />
            </div>
          );
        })}

      {/*If no data*/}
      {!data && (
        <div className="w-full justify-center flex flex-col h-[60vh] align-middle items-center">
          <RadioTower
            className="text-slate-400 mb-[1rem]"
            strokeWidth={1.5}
            size={50}
          />
          <p className="text-slate-400 text-[1.4rem] items-center">
            Нет треков
          </p>
        </div>
      )}
    </>
  );
};
export default RadioTracksCard;
