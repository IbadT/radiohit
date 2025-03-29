import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";
import { Query } from "appwrite";

//Initial Appwrite Provider
const { database } = appwriteSDKProvider;

/*
  Get next track by cursor
 */
export async function getNextTrackByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        [
          Query.limit(1),
          Query.cursorAfter(id),
          Query.orderDesc("$createdAt"),
          Query.equal("isApproved", true),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}

/*
  Get previous track by cursor
 */
export async function getPreviousTrackByCursor(id: string) {
  try {
    return (
      await database.listDocuments(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        [
          Query.limit(1),
          Query.cursorBefore(id),
          Query.orderDesc("$createdAt"),
          Query.equal("isApproved", true),
        ]
      )
    ).documents.at(0);
  } catch (error) {
    return error;
  }
}


/*
  Get all radio tracks array
 */
// export async function getAllRadioTracks() {
//   try {
//      return await database
//       .getDocument(
//         ServerConfig.dbID,
//         ServerConfig.mainSettingsCollectionID,
//         "mainRadioPlaylist"
//       )
//       .then(async (playlistDoc) => {
//           const radioTracks = playlistDoc.playlistTracksID;
//
//           if(radioTracks.length > 0) {
//               let radioTracksArray = [];
//               for (let i = 0; i < radioTracks.length; i++) {
//                   const trackID = radioTracks[i].toString();
//                   await database
//                       .getDocument(ServerConfig.dbID, ServerConfig.songsCollectionID, trackID)
//                       .then((res) => {
//                           radioTracksArray.push(res);
//                       });
//               }
//               return radioTracksArray;
//           } else {
//               return null
//           }
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }
