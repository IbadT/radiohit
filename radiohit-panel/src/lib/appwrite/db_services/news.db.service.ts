import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { ID, Query } from "appwrite";
import { deleteWhitespacesOnSides } from "@/lib/utils/utils";

const { database, storage } = appwriteSDKProvider;

/*
  Get all NEWS by cursor pagination
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
  Add New News Post
 */
export async function createNewNewsPost(
  title: string,
  description: string,
  imageID: string,
  imageURL: string
) {
  const { slug } = require("cyr2lat");
  const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);
  const titleToSlug = slug(deleteWhitespacesFromTitle);

  return await database.createDocument(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    ID.unique(),
    {
      title: deleteWhitespacesFromTitle,
      description: description,
      newsType: "news",
      imageID: imageID,
      imageURL: imageURL,
      youTubeVideoID: "",
      eventTime: "",
      eventAddress: "",
      eventContactPhones: [],
      postSlug: titleToSlug,
    }
  );
}

/*
  Delete News post, Event post, Clip post
 */
export async function deleteNewsPostByID(docID: string, imageFileID: string) {
  return await database
    .deleteDocument(ServerConfig.dbID, ServerConfig.newsCollectionID, docID)
    .then(async () => {
      await storage?.deleteFile(ServerConfig.newsImagesBucketID, imageFileID);
    });
}

/*
  Update News Post
 */
export async function updateNewsPostByID(
  docID: string,
  title: string,
  description: string,
  imageID: string,
  imageURL: string
) {
  const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);

  return await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    docID,
    {
      title: deleteWhitespacesFromTitle,
      description: description,
      imageID: imageID,
      imageURL: imageURL,
    }
  );
}

/*
  Get all EVENTS by cursor pagination
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
  Add New Event Post
 */
export async function createNewEventPost(
  title: string,
  description: string,
  eventDate: string,
  eventTime: string,
  eventAddress: string,
  eventPhone1: string,
  eventPhone2: string,
  imageID: string,
  imageURL: string
) {
  const { slug } = require("cyr2lat");
  const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);
  const titleToSlug = slug(deleteWhitespacesFromTitle);

  return await database.createDocument(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    ID.unique(),
    {
      title: deleteWhitespacesFromTitle,
      description: description,
      newsType: "event",
      imageID: imageID,
      imageURL: imageURL,
      eventTime: eventTime,
      eventAddress: eventAddress,
      eventDate: eventDate,
      eventContactPhones: [eventPhone1, eventPhone2],
      postSlug: titleToSlug,
    }
  );
}

/*
  Update Event Post
 */
export async function updateEventPostByID(
  docID: string,
  title: string,
  description: string,
  eventDate: string,
  eventTime: string,
  eventAddress: string,
  eventPhone1: string,
  eventPhone2: string,
  imageID: string,
  imageURL: string
) {
  const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);

  return await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.newsCollectionID,
    docID,
    {
      title: deleteWhitespacesFromTitle,
      description: description,
      imageID: imageID,
      imageURL: imageURL,
      eventTime: eventTime,
      eventAddress: eventAddress,
      eventDate: eventDate,
      eventContactPhones: [eventPhone1, eventPhone2],
    }
  );
}


/*
  Get all CLIPS by cursor pagination
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
  Add New Clip Post
 */
export async function createNewClipPost(
    title: string,
    description: string,
    youTubeVideoID: string,
    imageID: string,
    imageURL: string
) {
    const { slug } = require("cyr2lat");
    const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);
    const titleToSlug = slug(deleteWhitespacesFromTitle);

    return await database.createDocument(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        ID.unique(),
        {
            title: deleteWhitespacesFromTitle,
            description: description,
            newsType: "clip",
            imageID: imageID,
            imageURL: imageURL,
            youTubeVideoID: youTubeVideoID,
            postSlug: titleToSlug,
        }
    );
}


/*
  Update Clip Post
 */
export async function updateClipPostByID(
    docID: string,
    title: string,
    description: string,
    youTubeVideoID,
    imageID: string,
    imageURL: string
) {
    const deleteWhitespacesFromTitle = deleteWhitespacesOnSides(title);

    return await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.newsCollectionID,
        docID,
        {
            title: deleteWhitespacesFromTitle,
            description: description,
            youTubeVideoID: youTubeVideoID,
            imageID: imageID,
            imageURL: imageURL,
        }
    );
}
