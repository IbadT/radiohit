import {Query } from "appwrite";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

const { database } = appwriteSDKProvider;

/*
  Get Artist Already uploaded songs for Account page
 */
export async function getArtistUploadedSongs(
  artistID: string,
  queryLimit: number
) {
  try {
    return database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.equal("trackArtistID", artistID),
        Query.orderDesc("$createdAt"),
        Query.limit(queryLimit),
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

/*
  Get Top Tracks for sidebar
 */
export async function getSidebarTracks(queryLimit:number) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        [
          Query.orderDesc("trackPopularity"),
          Query.limit(queryLimit),
          Query.equal("isApproved", true),
        ]
      )
    ).documents;
  } catch (error) {
    console.log(error);
  }
}

/*
  Get User Favourite Tracks
 */
export async function getUserFavouriteTracks(favouriteTracksID, limit?) {
  try {
    let favouriteSongsArray = [];
    if (!limit) {
      for (let i = 0; i < favouriteTracksID.length; i++) {
        const trackID = favouriteTracksID[i].toString();
        await database
          .getDocument(
            ServerConfig.dbID,
            ServerConfig.songsCollectionID,
            trackID
          )
          .then((res) => {
            favouriteSongsArray.push(res);
          });
      }
      return favouriteSongsArray;
    } else {
      for (let i = 0; i < limit; i++) {
        const trackID = favouriteTracksID[i].toString();
        await database
          .getDocument(
            ServerConfig.dbID,
            ServerConfig.songsCollectionID,
            trackID
          )
          .then((res) => {
            favouriteSongsArray.push(res);
          });
      }
      return favouriteSongsArray;
    }
  } catch (error) {
    console.log(error);
  }
}

/*
  Get Radio Downloaded Tracks
 */
export async function getRadioDownloadedTracks(downloadedTracksID) {
  try {
    let downloadedTracksArray = [];
    for (let i = 0; i < downloadedTracksID.length; i++) {
      const trackID = downloadedTracksID[i].toString();
      await database
        .getDocument(ServerConfig.dbID, ServerConfig.songsCollectionID, trackID)
        .then((res) => {
          downloadedTracksArray.push(res);
        });
    }
    return downloadedTracksArray;
  } catch (error) {
    console.log(error);
  }
}

/*
  Get Chart Paginated tracks
 */
export async function getChartPaginatedTracks(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  //If last cursor not define
  if (lastCursor === "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.offset(0),
        Query.orderDesc("trackPopularity"),
        Query.equal("isApproved", true),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("isApproved", true),
      Query.orderDesc("trackPopularity"),
    ]
  );
}

/*
  Get All Catalog Paginated tracks
 */
export async function getAllCatalogPaginatedTracks(
    lastCursor: string,
    queryLimit: number,
    sortBy: string
) {
    //If last cursor not define
    if (lastCursor === "") {
        return await database.listDocuments(
            ServerConfig.dbID,
            ServerConfig.songsCollectionID,
            [
                Query.offset(0),
                Query.orderDesc("$createdAt"),
                Query.equal("isApproved", true),
                Query.limit(queryLimit),
            ]
        );
    }

    return await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        [
            Query.cursorAfter(lastCursor),
            Query.limit(queryLimit),
            Query.equal("isApproved", true),
            Query.orderDesc("$createdAt"),
        ]
    );
}


/*
  Get All Radio tracks
 */
export async function getAllRadioTracks() {
    try {
        let radioTracksArray = [];
        await database.getDocument(ServerConfig.dbID, ServerConfig.mainSettingsCollectionID, 'mainRadioPlaylist').then(async (playlist)=>{
            const radioTracksID = playlist.playlistTracksID;
            for (let i = 0; i < radioTracksID.length; i++) {
                const trackID = radioTracksID[i].toString();
                await database
                    .getDocument(ServerConfig.dbID, ServerConfig.songsCollectionID, trackID)
                    .then((res) => {
                        radioTracksArray.push(res);
                    });
            }
        })
        return radioTracksArray;
    } catch (error) {
        console.log(error);
    }
}

