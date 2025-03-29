"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/utils";
import * as React from "react";
import TopArtistsCard from "@/components/Pages/Dashboard/TopArtistsCard";
import TopSongsCard from "@/components/Pages/Dashboard/TopSongsCard";
import RegistrationStatisticsCard from "@/components/Pages/Dashboard/RegistrationStatisticsCard";
import InfoStatisticsRow from "@/components/Pages/Dashboard/InfoStatisticsRow";
import MostDownloadedTracks from "@/components/Pages/Dashboard/MostDownloadedTracks";
import UsersDiagram from "@/components/Pages/Dashboard/UsersDiagram";
import NeedModerationSongs from "@/components/Pages/Dashboard/NeedModerationSongs";
import NeedModerationSuggestedSongs from "@/components/Pages/Dashboard/NeedModerationSuggestedSongs";
import needModerationSuggestedSongs from "@/components/Pages/Dashboard/NeedModerationSuggestedSongs";
import AppWriteHealthCheckCard from "@/components/Pages/Dashboard/AppWriteHealthCheckCard";

const DashboardPageContent = () => {
  //Get Home data from api
  const { data, error, isLoading } = useSWR("/api/getHomeData", fetcher);

  const topArtists = !isLoading && data.topArtists;
  const topSongs = !isLoading && data.topSongs;
  const limitDays = !isLoading && data.limitDays;
  const usersForLastMonth = !isLoading &&  data.usersForLastMonth && data.usersForLastMonth.users;
  const allUsersCollection = !isLoading && data.allUsersInUsersCollection;

  const topSongsByDownloads = !isLoading && data.topSongsByDownloads;
  const songsNeedModeration = !isLoading && data.songsNeedModeration;
  const suggestedSongsNeedModeration =
    !isLoading && data.suggestedSongsNeedModeration;

  const storageSystemStatus = !isLoading && data.storageSystemStatus;
  const databaseSystemStatus = !isLoading && data.databaseSystemStatus;
  const functionsSystemStatus = !isLoading && data.functionsSystemStatus;


  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-[1.5rem]">
          {/*Left Content*/}
          <div className="flex flex-col w-full">
            {/*Top users statistics*/}
            <div className="w-full mb-[1.5rem]">
              <InfoStatisticsRow
                allUsersCollection={allUsersCollection}
                isLoading={isLoading}
              />
            </div>

            {/*Registration Statistics*/}
            <div className="w-full mb-[1.5rem]">
              <RegistrationStatisticsCard
                isLoading={isLoading}
                usersForLastMonth={usersForLastMonth}
                limitDays={limitDays}
              />
            </div>

            {/*Registration Statistics*/}
            <div className="w-full mb-[1.5rem] grid grid-cols-2 gap-[1.5rem]">
              <MostDownloadedTracks
                isLoading={isLoading}
                topSongsByDownloads={topSongsByDownloads}
              />
              <UsersDiagram
                isLoading={isLoading}
                allUsersCollection={allUsersCollection}
              />
            </div>

            {/*Bottom Appwrite Services Health Check*/}
            <AppWriteHealthCheckCard
              isLoading={isLoading}
              storageSystemStatus={storageSystemStatus}
              databaseSystemStatus={databaseSystemStatus}
              functionsSystemStatus={functionsSystemStatus}
            />
          </div>

          {/*Right Content*/}
          <div className="flex flex-col w-[35%]">
            {/*Songs on moderation*/}
            <NeedModerationSongs
              isLoading={isLoading}
              needModerationSongs={songsNeedModeration}
            />
            {/*Suggested Songs on moderation*/}
            <NeedModerationSuggestedSongs
              isLoading={isLoading}
              needModerationSuggestedSongs={suggestedSongsNeedModeration}
            />
            {/*Top Artists Card*/}
            <TopArtistsCard artistData={topArtists} isLoading={isLoading} />
            {/*Top Songs Card*/}
            <TopSongsCard songData={topSongs} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPageContent;
