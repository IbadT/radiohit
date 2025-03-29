import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { Query } from "appwrite";

const { database } = appwriteSDKProvider;

/*
  Get News Paginated Info
 */
export async function getNewsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      [
        Query.equal("newsType", "news"),
        Query.offset(0),
        Query.orderDesc("$createdAt"),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("newsType", "news"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get All News Documents
 */
export async function getAllNews() {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "news"),
    ]
  );
}

/*
  Get Single News Document by ID
 */
export async function getSingleNewsByID(postId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      postId
    );
  } catch (error) {
    return undefined;
  }
}

/*
  Get Next News Document by ID
 */
export async function getNextNewsByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorAfter(id),
          Query.equal("newsType", "news"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get Previous News Document by ID
 */
export async function getPreviousNewsByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorBefore(id),
          Query.equal("newsType", "news"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get Events Paginated Info
 */
export async function getEventsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      [
        Query.equal("newsType", "event"),
        Query.offset(0),
        Query.orderDesc("$createdAt"),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("newsType", "event"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get All Events Documents
 */
export async function getAllEvents() {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "event"),
    ]
  );
}

/*
  Get Single News Document by ID
 */
export async function getSingleEventByID(postId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      postId
    );
  } catch (error) {
    return undefined;
  }
}

/*
  Get Next Event Document by ID
 */
export async function getNextEventByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorAfter(id),
          Query.equal("newsType", "event"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get Previous Event Document by ID
 */
export async function getPreviousEventByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorBefore(id),
          Query.equal("newsType", "event"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get Clips Paginated Info
 */
export async function getClipsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      [
        Query.equal("newsType", "clip"),
        Query.offset(0),
        Query.orderDesc("$createdAt"),
        Query.limit(queryLimit),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.equal("newsType", "clip"),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get All Clip Documents
 */
export async function getAllClips() {
  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    [
      Query.offset(0),
      Query.orderDesc("$createdAt"),
      Query.equal("newsType", "clip"),
    ]
  );
}

/*
  Get Single Clip Document by ID
 */
export async function getSingleClipByID(postId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.newsCollectionID,
      postId
    );
  } catch (error) {
    return undefined;
  }
}

/*
  Get Next Clip Document by ID
 */
export async function getNextClipByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorAfter(id),
          Query.equal("newsType", "clip"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get Previous Clip Document by ID
 */
export async function getPreviousClipByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        [
          Query.limit(1),
          Query.cursorBefore(id),
          Query.equal("newsType", "clip"),
          Query.orderDesc("$createdAt"),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}
