import { ServerConfig } from "@/lib/utils/server_config";

//Get Base url helper
const getFileUrl = (bucketID: string, fileID: string) => {
    return `${ServerConfig.endpoint}/storage/buckets/${bucketID}/files/${fileID}/view?project=${ServerConfig.project}`;
};

//Get Song url for save
export const getSongURL = (songID: string) => {
    return getFileUrl(ServerConfig.songsBucketID, songID);
};

//Get Song poster image url for save
export const getSongImageURL = (songImageID: string) => {
    return getFileUrl(ServerConfig.songsImagesBucketID, songImageID);
};

//Get User image url for save
export const getUserImageURL = (userImageID: string) => {
    return getFileUrl(ServerConfig.userImagesBucketID, userImageID);
};

//Get News image url for save
export const getNewsImageURL = (newsImageID: string) => {
    return getFileUrl(ServerConfig.newsImagesBucketID, newsImageID);
}

//Get Home Banner image url for save
export const getHomePosterImageURL = (posterImageID: string) => {
    return getFileUrl(ServerConfig.sliderPostersBucketID, posterImageID)
}
