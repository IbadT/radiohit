import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { ID, Permission, Query, Role } from "appwrite";

const { database, storage } = appwriteSDKProvider;

/*
  Get Artists Paginated Info
 */
export async function getArtistsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  let sortData = Query.orderDesc("artistRating");

  if (sortBy == "artistRating") {
    sortData = Query.orderDesc("artistRating");
  } else if (sortBy == "sortByCreatedDateNewest") {
    sortData = Query.orderDesc("$createdAt");
  } else if (sortBy == "sortByCreatedDateOldest") {
    sortData = Query.orderAsc("$createdAt");
  }

  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      [
        Query.equal("role", "artist"),
        sortData,
        Query.offset(0),
        Query.limit(queryLimit)
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
      sortData
    ]
  );
}

/*
  Create new Artist Document
 */
export async function createNewArtistDocument(
  artistName: string,
  artistEmail: string,
  artistCountry: string,
  artistRating: number,
  artistDescription: string,
  imageID,
  imageURL
) {
  return await database.createDocument(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    ID.unique(),
    {
      name: artistName,
      artistName: artistName,
      email: artistEmail,
      role: "artist",
      artistCountry: artistCountry,
      artistRating: artistRating,
      artistDescription: artistDescription,
      userImageID: imageID,
      userImageURL: imageURL
    },
    [Permission.read(Role.any())]
  );
}

/*
  Delete Artist and all Artist Songs
 */
export async function deleteArtistAndAllArtistSongs(
  artistDocID: string,
  artistImageFileID: string
) {

  try {
    //Get artist tracks from document
    return await database
      .getDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistDocID
      )
      .then(async (artistDoc) => {
        //Delete artists document
        await database.deleteDocument(
          ServerConfig.dbID,
          ServerConfig.usersCollectionID,
          artistDocID
        );
        //Delete artist image
        await storage?.deleteFile(
          ServerConfig.userImagesBucketID,
          artistImageFileID
        );

        //Delete User profile from USERS
        await fetch(`/api/deleteUserByID/${artistDocID}`, {
          method: "DELETE",
          credentials: "include"
        });

        if (artistDoc.artistUploadedTracksID.length > 0) {
        }
        //Artist songs array for delete
        const artistSongsToDelete = artistDoc.artistUploadedTracksID;

        for (let i = 0; i < artistSongsToDelete.length; i++) {
          const trackID = artistSongsToDelete[i].toString();

          //Get song document
          await database
            .getDocument(
              ServerConfig.dbID,
              ServerConfig.songsCollectionID,
              trackID
            )
            .then(async (songDoc) => {
              //Delete song document
              await database.deleteDocument(
                ServerConfig.dbID,
                ServerConfig.songsCollectionID,
                trackID
              );

              //Delete song file
              await storage?.deleteFile(
                ServerConfig.songsBucketID,
                songDoc.trackFileID
              );

              //Delete song image
              await storage?.deleteFile(
                ServerConfig.songsImagesBucketID,
                songDoc.trackImageID
              );
            });
        }
      });
  } catch (error) {
    console.log(error.message);
  }
}

/*
  Get Single Artist Document by ID
 */
export async function getSingleArtistByID(artistId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      artistId
    );
  } catch (error) {
    return undefined;
  }
}

/*
  UpdateArtist Document
 */
export async function updateArtistDocument(
  artistDocID: string,
  artistName: string,
  artistEmail: string,
  artistCountry: string,
  artistRating: number,
  artistDescription: string,
  imageID: string,
  imageURL: string
) {
  return await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.usersCollectionID,
    artistDocID,
    {
      name: artistName,
      artistName: artistName,
      email: artistEmail,
      artistCountry: artistCountry,
      artistRating: artistRating,
      artistDescription: artistDescription,
      userImageID: imageID,
      userImageURL: imageURL
    }
  );
}


/*
  Get Single Artist Tracks in Artist Edit Page by ID
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
        Query.offset(0),
        Query.orderDesc("$createdAt"),
        Query.limit(queryLimit)
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.cursorAfter(lastCursor),
      Query.equal("trackArtistID", artistID),
      Query.orderDesc("$createdAt")
    ]
  );
}
