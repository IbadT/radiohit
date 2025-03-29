import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { ID, Query } from "appwrite";
import { deleteWhitespacesOnSides } from "@/lib/utils/utils";

const { database, storage } = appwriteSDKProvider;

/*
  Get Songs Paginated Info with sort and search by Artist
 */
export async function getSongsPaginatedInfo(
  lastCursor: string,
  queryLimit: number,
  sortBy: string
) {
  let sortData;

  if (sortBy == "sortByPopularity") {
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.equal("isSuggested", false),
      Query.orderDesc("trackPopularity"),
    ];
  } else if (sortBy == "sortByCreatedDateNewest") {
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.equal("isSuggested", false),
      Query.orderDesc("$createdAt"),
    ];
  } else if (sortBy == "sortByCreatedDateOldest") {
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.equal("isSuggested", false),
      Query.orderAsc("$createdAt"),
    ];
  } else if (sortBy == "sortByModeration") {
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.equal("isSuggested", false),
      Query.orderAsc("alreadyModerated"),
    ];
  } else if (sortBy == "sortByRejected") {
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.orderAsc("isApproved"),
      Query.equal("isSuggested", false),
      Query.equal("alreadyModerated", true),
    ];
  } else {
    //Search by artist ID
    sortData = [
      Query.offset(0),
      Query.limit(queryLimit),
      Query.equal("isSuggested", false),
      Query.equal("trackArtistID", sortBy),
    ];
  }

  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      sortData
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [Query.cursorAfter(lastCursor), ...sortData]
  );
}

/*
  Get Single Song Document by ID
 */
export async function getSingleSongByID(songId) {
  try {
    return await database.getDocument(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      songId
    );
  } catch (error) {
    return undefined;
  }
}

/*
  Add new song
 */
export async function createNewSongDoc(
  trackName: string,
  trackArtistName: string,
  trackPopularity: number,
  trackArtistID: string,
  isApproved: boolean,
  trackDuration: string,
  songID: string,
  songURL: string,
  songImageID: string,
  songImageURL: string
) {
  const { slug } = require("cyr2lat");
  const deleteWhitespacesFromArtistName =
    deleteWhitespacesOnSides(trackArtistName);
  const deleteWhitespacesFromTrackName = deleteWhitespacesOnSides(trackName);

  const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
  const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

  //Create new song document
  return database
    .createDocument(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      ID.unique(),
      {
        trackArtistID: trackArtistID,
        trackFileID: songID,
        trackURL: songURL,
        trackImageID: songImageID,
        trackImageURL: songImageURL,
        trackDuration: trackDuration,
        trackArtistName: deleteWhitespacesFromArtistName,
        trackSongName: deleteWhitespacesFromTrackName,
        trackSlug: readyTrackSlug,
        trackFieldForSearch: readyTrackFieldForSearch,
        isApproved: isApproved,
        alreadyModerated: true,
        trackPopularity: trackPopularity,
      }
    )
    .then(async (songResponse) => {
      const songDocumentID = songResponse.$id;
      await database
        .getDocument(
          ServerConfig.dbID,
          ServerConfig.usersCollectionID,
          trackArtistID
        )
        .then(async (artistResponse) => {
          const artistUploadedTracksArray =
            artistResponse.artistUploadedTracksID;
          //Add track to artist tracks
          const newArtistUploadedTracksArray = [
            songDocumentID,
            ...artistUploadedTracksArray,
          ];

          //Update artist document
          await database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            trackArtistID,
            {
              artistUploadedTracksID: newArtistUploadedTracksArray,
            }
          );
        });
    });
}

/*
  Update song document
 */
export async function updateSongDocument(
  songDocID: string,
  trackName: string,
  trackArtistName: string,
  trackPopularity: number,
  trackArtistID: string,
  isApproved: boolean,
  trackDuration: string,
  songFileID: string,
  songFileURL: string,
  songImageID: string,
  songImageURL: string
) {
  const { slug } = require("cyr2lat");
  const deleteWhitespacesFromArtistName =
    deleteWhitespacesOnSides(trackArtistName);
  const deleteWhitespacesFromTrackName = deleteWhitespacesOnSides(trackName);

  const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
  const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

  return await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    songDocID,
    {
      trackArtistID: trackArtistID,
      trackFileID: songFileID,
      trackURL: songFileURL,
      trackImageID: songImageID,
      trackImageURL: songImageURL,
      trackDuration: trackDuration,
      trackArtistName: deleteWhitespacesFromArtistName,
      trackSongName: deleteWhitespacesFromTrackName,
      trackSlug: readyTrackSlug,
      trackFieldForSearch: readyTrackFieldForSearch,
      isApproved: isApproved,
      alreadyModerated: true,
      trackPopularity: trackPopularity,
    }
  );
}

/*
  Delete song and all song data
 */
export async function deleteUploadedSong(
  songID: string,
  songImageID: string,
  songFileID: string,
  artistID: string
) {
  //Delete song image
  await storage?.deleteFile(ServerConfig.songsBucketID, songFileID);
  //Delete song file
  await storage?.deleteFile(ServerConfig.songsImagesBucketID, songImageID);

  //Delete song document
  await database.deleteDocument(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    songID
  );

  //Update artist uploaded tracks
  return await database
    .getDocument(ServerConfig.dbID, ServerConfig.usersCollectionID, artistID)
    .then(async (artistDoc) => {
      const artistUploadedTracksArray = artistDoc.artistUploadedTracksID;

      const newUploadedTracksArray = artistUploadedTracksArray.filter(
        (val) => val != songID
      );

      await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID,
        {
          artistUploadedTracksID: newUploadedTracksArray,
        }
      );
    });
}

/*
  Get users who download track
 */
export async function getUsersWhoDownloadSingleTrack(radioIDArray) {
  try {
    let radioDocumentsArray = [];

    for (let i = 0; i < radioIDArray.length; i++) {
      const userID = radioIDArray[i].toString();
      await database
        .getDocument(ServerConfig.dbID, ServerConfig.usersCollectionID, userID)
        .then((res) => {
          radioDocumentsArray.push(res);
        });
    }

    return radioDocumentsArray;
  } catch (error) {
    console.log(error);
  }
}

/*
  Get Songs that need moderation
 */
export async function getSongsForModeration(
  lastCursor: string,
  queryLimit: number
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.offset(0),
        Query.equal("alreadyModerated", false),
        Query.equal("isSuggested", false),
        Query.limit(queryLimit),
        Query.orderDesc("$createdAt"),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.offset(0),
      Query.equal("alreadyModerated", false),
      Query.equal("isSuggested", false),
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Get All Suggested Songs
 */
export async function getAllSuggestedSongs(
  lastCursor: string,
  queryLimit: number
) {
  if (lastCursor == "") {
    return await database.listDocuments(
      ServerConfig.dbID,
      ServerConfig.songsCollectionID,
      [
        Query.offset(0),
        Query.equal("alreadyModerated", false),
        Query.equal("isSuggested", true),
        Query.limit(queryLimit),
        Query.orderDesc("$createdAt"),
      ]
    );
  }

  return await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [
      Query.offset(0),
      Query.equal("alreadyModerated", false),
      Query.equal("isSuggested", true),
      Query.limit(queryLimit),
      Query.cursorAfter(lastCursor),
      Query.orderDesc("$createdAt"),
    ]
  );
}

/*
  Delete song and all song data
 */
export async function deleteSingleSuggestedSong(
  songID: string,
  songFileID: string
) {
  //Delete song file
  await storage?.deleteFile(ServerConfig.songsBucketID, songFileID);

  //Delete song document
  return await database.deleteDocument(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    songID
  );
}

/*
  Update Suggested Song document
 */
export async function updateSuggestedSongAndArtistDocument(
  songDocID: string,
  trackName: string,
  trackArtistName: string,
  trackPopularity: number,
  trackArtistID: string,
  isApproved: boolean,
  songImageID: string,
  songImageURL: string
) {
  const { slug } = require("cyr2lat");
  const deleteWhitespacesFromArtistName =
    deleteWhitespacesOnSides(trackArtistName);
  const deleteWhitespacesFromTrackName = deleteWhitespacesOnSides(trackName);

  const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
  const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

  //Update Song document
  await database.updateDocument(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    songDocID,
    {
      trackArtistID: trackArtistID,
      trackImageID: songImageID,
      trackImageURL: songImageURL,
      trackArtistName: deleteWhitespacesFromArtistName,
      trackSongName: deleteWhitespacesFromTrackName,
      trackSlug: readyTrackSlug,
      trackFieldForSearch: readyTrackFieldForSearch,
      isApproved: isApproved,
      alreadyModerated: true,
      isSuggested: false,
      trackPopularity: trackPopularity,
    }
  );

  //Update Artist document
  return await database
    .getDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      trackArtistID
    )
    .then(async (artistResponse) => {
      const artistUploadedTracksArray = artistResponse.artistUploadedTracksID;
      //Add track to artist tracks
      const newArtistUploadedTracksArray = [
        songDocID,
        ...artistUploadedTracksArray,
      ];

      //Update artist document
      await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        trackArtistID,
        {
          artistUploadedTracksID: newArtistUploadedTracksArray,
        }
      );
    });
}
