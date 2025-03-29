import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ID, Permission, Query, Role } from "appwrite";
import { ServerConfig } from "@/lib/utils/server_config";
import { getCurrentUTCDate } from "@/lib/utils/utils";

const { storage, database } = appwriteSDKProvider;

/*
  Get Song File For Download
 */
export async function getSongFileUrlForDownload(songFileID: string) {
  return await storage?.getFileDownload(ServerConfig.songsBucketID, songFileID);
}

/*
  Update DB documents after radio download
 */
export async function updateDocumentsAfterDownload(
  radioUserID: string,
  songDocID: string,
  alreadyDownloadedTracks: []
) {
  //Get current date
  const currentDate = getCurrentUTCDate();
  const currentTime = new Date(Date.now()).toLocaleTimeString();

  let newAlreadyDownloadedTracksIDArray;

  //Check if track already downloaded
  if (
    alreadyDownloadedTracks.length > 0 &&
    alreadyDownloadedTracks.find((val) => val == songDocID)
  ) {
    newAlreadyDownloadedTracksIDArray = alreadyDownloadedTracks;
  } else {
    newAlreadyDownloadedTracksIDArray = [songDocID, ...alreadyDownloadedTracks];
  }

  //Update radio document
  return await database
    .updateDocument(
      ServerConfig.dbID,
      ServerConfig.usersCollectionID,
      radioUserID,
      {
        downloadTracksID: newAlreadyDownloadedTracksIDArray,
      }
    )
    .then(async () => {
      //Get who download array
      await database
        .getDocument(
          ServerConfig.dbID,
          ServerConfig.songsCollectionID,
          songDocID
        )
        .then(async (songDoc) => {
          //Get who download array
          const whoDownloadIDandDateTime = songDoc.whoDownloadIDandDateTime;

          //New who download array
          const newWhoDownloadIDDateTimeArray = [
            `${radioUserID} - ${currentDate} | ${currentTime}`,
            ...whoDownloadIDandDateTime,
          ];

          //Update song document
          await database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.songsCollectionID,
            songDocID,
            {
              whoDownloadIDandDateTime: newWhoDownloadIDDateTimeArray,
            }
          );
        });
    });
}


/*
  Get Artist info for download
 */
export async function getArtistDoc(artistID:string) {
  return await database.getDocument(ServerConfig.dbID,ServerConfig.usersCollectionID, artistID);
}
