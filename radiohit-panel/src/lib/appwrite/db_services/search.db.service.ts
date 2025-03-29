import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { Query } from "appwrite";

const { database } = appwriteSDKProvider;

/*
  Global Search News
 */
export async function SearchNews(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "news"),
      Query.search("title", searchParams),
      Query.limit(20),
    ]
  );
}

/*
  Global Search Events
 */
export async function SearchEvents(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "event"),
      Query.search("title", searchParams),
      Query.limit(20),
    ]
  );
}

/*
  Global Search Clips
 */
export async function SearchClips(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "clip"),
      Query.search("title", searchParams),
      Query.limit(20),
    ]
  );
}

/*
  Global Search Songs
 */
export async function SearchSongs(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("isSuggested", false),
      Query.search("trackFieldForSearch", searchParams),
      Query.limit(40),
    ]
  );
}


/*
  Global Search Artists
 */
export async function SearchArtists(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("artistRating"),
      Query.search("artistName", searchParams),
      Query.equal("role", "artist"),
      Query.limit(100),
    ]
  );
}

/*
  Global Search Users
 */
export async function SearchUsers(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.offset(0),
      Query.search("name", searchParams),
      Query.equal("role", "user"),
      Query.limit(20),
    ]
  );
}

/*
  Global Search Radio Users
 */
export async function SearchRadioUsers(searchParams: string) {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    [
      Query.offset(0),
      Query.search("name", searchParams),
      Query.equal("role", "radio"),
      Query.limit(20),
    ]
  );
}
