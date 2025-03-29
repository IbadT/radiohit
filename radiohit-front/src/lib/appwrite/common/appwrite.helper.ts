import { ServerConfig } from "@/lib/utils/server_config";

//Get Base url helper
const getFileUrl = (bucketID: string, fileID: string) => {
  return `${ServerConfig.endpoint}/storage/buckets/${bucketID}/files/${fileID}/view?project=${ServerConfig.project}`;
};

//Get Song url
export const getSongURL = (songID: string) => {
  return getFileUrl(ServerConfig.songsBucketID, songID);
};

//Get Song poster image url
export const getSongImageURL = (songImageID: string) => {
  return getFileUrl(ServerConfig.songsImagesBucketID, songImageID);
};

//Get User image url
export const getUserImageURL = (userImageID: string) => {
  return getFileUrl(ServerConfig.userImagesBucketID, userImageID);
};
