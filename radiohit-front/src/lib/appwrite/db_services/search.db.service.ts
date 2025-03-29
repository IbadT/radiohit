import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import {ServerConfig} from "@/lib/utils/server_config";
import {Query} from "appwrite";

//Initial provider
const { database } = appwriteSDKProvider;

/*
  Search News
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
  Search Events
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
  Search Clips
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
  Search Songs
 */
export async function SearchSongs(searchParams: string) {
    return await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        [
            Query.offset(0),
            Query.orderDesc("$createdAt"),
            Query.search("trackFieldForSearch", searchParams),
            Query.equal("isApproved", true),
            Query.limit(20),
        ]
    );
}


/*
  Search Artists
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
            Query.limit(20),
        ]
    );
}
