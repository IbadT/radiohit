import sdk from 'node-appwrite'
import fsExtra from 'fs-extra';
import Downloader from "nodejs-file-downloader";

const client = new sdk.Client();
const databases = new sdk.Databases(client);

const appwriteEndpoint = 'https://api.radiohit.by/v1';
const projectID = '674085d8002692094a1d'
const apiKey = 'standard_c1d16ca186ca777b4f7f9f7239227e10034a3ac08f6fccf3f4ae376574bcf669f7ed02e1ce7e1535e871ed4245d54ae5ac71da198c93de3138e8c3fc9e782ad047300da75be1bba33c2f9dc379f1a7f470c7f1f995f9071a4aab852d91d3067ad81024084801ba23d51b82686959c3cf82d3e21301fcc66029aeb2a4e893c8c4'
const databaseID = '6745a44e0026f7000fd7';
const songsCollectionID = '6745dd6e0021a492aa6a';
const mainSettingsCollectionID = '6745de410006148949ab';
const documentID = 'mainRadioPlaylist';

client.setEndpoint(appwriteEndpoint)
    .setProject(projectID)
    .setKey(apiKey);

export async function downloadTracks() {
    //Delete old tracks
    await fsExtra.emptyDir('./tracks');

    let tracksInfoData = [];

    //Get tracks list
    await databases.getDocument(databaseID, mainSettingsCollectionID, documentID)
        .then(async (playlistDoc) => {
            //Get song url from song documents
            const radioTracks = playlistDoc.playlistTracksID;

            if (radioTracks.length > 0) {
                for (let i = 0; i < radioTracks.length; i++) {
                    const trackID = radioTracks[i].toString();
                    await databases
                        .getDocument(databaseID, songsCollectionID, trackID)
                        .then(async (songDocument) => {
                            tracksInfoData.push({
                                artistName: songDocument.trackArtistName,
                                songName: songDocument.trackSongName
                            });

                            const downloader = new Downloader({
                                url: `${songDocument.trackURL}`,
                                directory: "./tracks",
                            });
                            try {
                                await downloader.download();
                            } catch (error) {
                                console.log(error);
                            }
                        });
                }
            }
        });
    return tracksInfoData;
}
