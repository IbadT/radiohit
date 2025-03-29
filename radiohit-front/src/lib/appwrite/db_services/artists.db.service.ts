import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { Query } from "appwrite";

const { database } = appwriteSDKProvider;

/*
  Get Top Artists
 */
export async function getTopArtists(queryLimit: number) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.equal("role", "artist"),
      Query.orderDesc("artistRating"),
      Query.limit(queryLimit),
    ]
  );
}

/*
  Get Artists Paginated Info
 */
export async function getArtistsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      [
        Query.equal("role", "artist"),
        Query.offset(0),
        Query.orderDesc("artistRating"),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("role", "artist"),
      Query.orderDesc("artistRating"),
    ]
  );
}

/*
  Get Artists for Static Params
 */
export async function getAllArtists() {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("role", "artist"),
    ]
  );
}

/*
  Get Single Artist Info by ID
 */
export async function getSingleArtistInfoByID(artistID: string) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      artistID
    );
  } catch (error) {
    return undefined;
  }
}

/*
  Get Single Artist Tracks in Artist Details Page by ID
 */
export async function getPaginatedArtistTracksByID(
  lastCursor: string,
  queryLimit: number,
  sortBy: string,
  artistID: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
          Query.equal("trackArtistID", artistID),
          Query.equal("isApproved", true),
          Query.offset(0),
          Query.orderDesc("$createdAt"),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.cursorAfter(lastCursor),
      Query.equal("trackArtistID", artistID),
        Query.equal("isApproved", true),
        Query.orderDesc("$createdAt"),
    ]
  );
}
