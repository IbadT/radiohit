"use client";
import { useQuery } from '@tanstack/react-query';
import React from "react";
import ArtistTracksCardLoadingSkeleton from "@/components/LoadingSkeletons/Artists/ArtistTracksCardLoadingSkeleton";
import { Heart, MoveRight} from "lucide-react";
import { getUserFavouriteTracks} from "@/lib/appwrite/db_services/users.db.service";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import UserTrackCard from "@/components/Pages/Users/UserInfo/UserTrackCard";

const UserFavouriteTracksQuery = ({ favouriteTracksID, docID }) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [`userFavouriteTracks_${docID}`],
    queryFn: async () => {
      return await getUserFavouriteTracks(favouriteTracksID);
    },
  });

  //Loading skeleton
  if (isLoading) return <ArtistTracksCardLoadingSkeleton />;

  return (
    <div className="w-full p-[1.2rem] bg-white border-[1px] border-mainBorderColor rounded-2xl">
      <div className="w-full flex flex-row justify-between items-center mb-[0.6rem]">
        <h2 className="text-[#373738] font-[600] text-[1.1rem]">
          Избранные треки
        </h2>
        <Link
          href="/songs"
          className={cn(
            "flex flex-row items-center gap-[0.5rem] text-gray-500 text-[0.9rem] transition-colors duration-300 hover:text-fuchsia-700"
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
              <UserTrackCard song={song} />
            </div>
          );
        })}

      {/*If no data*/}
      {!isLoading && favouriteTracksID.length == 0 && (
        <div className="w-full justify-center flex flex-col h-[40vh] align-middle items-center">
          <Heart
            className="text-slate-400 mb-[1rem]"
            strokeWidth={1.5}
            size={40}
          />
          <p className="text-slate-400 text-[1.2rem] items-center">
            Нет избранных треков
          </p>
        </div>
      )}
    </div>
  );
};
export default UserFavouriteTracksQuery;
