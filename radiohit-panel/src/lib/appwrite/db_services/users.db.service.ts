import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { Query } from "appwrite";

const { database } = appwriteSDKProvider;

/*
  Get Radio Users paginated info
 */
export async function getRadioUsersPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      [
        Query.offset(0),
        Query.limit(queryLimit),
        Query.equal("role", "radio"),
        Query.orderDesc("$createdAt"),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("role", "radio"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get Single Radio User by ID
 */
export async function getSingleRadioUserByID(radioUserId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      radioUserId
    );
  } catch (error) {
    return undefined;
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
  Get All Users paginated info
 */
export async function getAllUsersPaginatedInfo(
    lastCursor: string,
    queryLimit: number
) {
    if (lastCursor == "") {
        return await database.listDocuments(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            [
                Query.offset(0),
                Query.limit(queryLimit),
                Query.equal("role", "user"),
                Query.orderDesc("$createdAt"),
            ]
        );
    }

    return await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        [
            Query.limit(queryLimit),
            Query.cursorAfter(lastCursor),
            Query.equal("role", "user"),
            Query.orderDesc("$createdAt"),
        ]
    );
}


/*
  Get Single User by ID
 */
export async function getSingleUserByID(userId) {
    try {
        return await database.getDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            userId
        );
    } catch (error) {
        return undefined;
    }
}

/*
  Get User Favourite Tracks
 */
export async function getUserFavouriteTracks(favouriteTracksID) {
    try {
        let favouriteTracksArray = [];
        for (let i = 0; i < favouriteTracksID.length; i++) {
            const trackID = favouriteTracksID[i].toString();
            await database
                .getDocument(ServerConfig.dbID, ServerConfig.songsCollectionID, trackID)
                .then((res) => {
                    favouriteTracksArray.push(res);
                });
        }
        return favouriteTracksArray;
    } catch (error) {
        console.log(error);
    }
}


/*
  Get User Rated Tracks
 */
export async function getUserRatedTracks(ratedTracksID) {
    try {
        let ratedTracksArray = [];
        for (let i = 0; i < ratedTracksID.length; i++) {
            const trackID = ratedTracksID[i].toString();
            await database
                .getDocument(ServerConfig.dbID, ServerConfig.songsCollectionID, trackID)
                .then((res) => {
                    ratedTracksArray.push(res);
                });
        }
        return ratedTracksArray;
    } catch (error) {
        console.log(error);
    }
}
