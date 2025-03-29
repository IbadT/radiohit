import { Query } from "appwrite";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

const { database } = appwriteSDKProvider;

/*
  Get Home Slider Poster
 */
export async function getHomeSliderPosters() {
  return await database.getDocument(
    ServerConfig.dbID,
    ServerConfig.sliderPostersCollectionID,
    "64c8471e3443a10d0c2a"
  );
}

/*
  Get Last News
 */
export async function getLastNews(queryLimit: number) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.equal("newsType", "news"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get Top Songs
 */
export async function getTopSongs(queryLimit: number) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.limit(queryLimit),
      Query.equal("isApproved", true),
      Query.orderDesc("trackPopularity"),
    ]
  );
}

/*
  Get Last Clips
 */
export async function getLastClips(queryLimit: number) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.equal("newsType", "clip"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get Last Events
 */
export async function getLastEvents(queryLimit: number) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.equal("newsType", "event"),
      Query.orderDesc("$createdAt"),
    ]
  );
}
