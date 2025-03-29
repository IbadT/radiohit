import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { ServerConfig } from "@/lib/utils/server_config";

const { database } = appwriteSDKProvider;

/*
  Get All Radio tracks
 */
export async function getAllRadioTracks() {
  try {
    let radioTracksArray = [];
    await database
      .getDocument(
        ServerConfig.dbID,
        ServerConfig.mainSettingsCollectionID,
        "mainRadioPlaylist"
      )
      .then(async (playlist) => {
        const radioTracksID = playlist.playlistTracksID;
        for (let i = 0; i < radioTracksID.length; i++) {
          const trackID = radioTracksID[i].toString();
          await database
            .getDocument(
              ServerConfig.dbID,
              ServerConfig.songsCollectionID,
              trackID
            )
            .then((res) => {
              radioTracksArray.push(res);
            });
        }
      });
    return radioTracksArray;
  } catch (error) {
    console.log(error);
  }
}

/*
  Delete track from playlist
 */
export async function deleteFromPlaylist(songID) {
  try {
    return await database
      .getDocument(
        ServerConfig.dbID,
        ServerConfig.mainSettingsCollectionID,
        "mainRadioPlaylist"
      )
      .then(async (playlist) => {
        const radioTracksID = playlist.playlistTracksID;
        if (radioTracksID.length > 0) {
          const newRadioTracksArray = radioTracksID.filter(
            (val) => val != songID
          );

          await database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.mainSettingsCollectionID,
            "mainRadioPlaylist",
            {
              playlistTracksID: newRadioTracksArray,
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
  }
}

/*
  Add track to Radio playlist
 */
export async function addToPlaylist(songID) {
  try {
    return await database
      .getDocument(
        ServerConfig.dbID,
        ServerConfig.mainSettingsCollectionID,
        "mainRadioPlaylist"
      )
      .then(async (playlist) => {
        const radioTracksID = playlist.playlistTracksID;

        if (radioTracksID.length > 0) {
          if (radioTracksID.find((val) => val == songID)) {
            return;
          }
          const newRadioTracksArray = [songID, ...radioTracksID];

          await database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.mainSettingsCollectionID,
            "mainRadioPlaylist",
            {
              playlistTracksID: newRadioTracksArray,
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
  }
}
