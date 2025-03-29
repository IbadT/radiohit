export const ServerConfig = {
    //Main config
    endpoint: process.env.SERVER_ENDPOINT ?? "",
    project: process.env.SERVER_PROJECT ?? "",
    dbID: process.env.SERVER_DATABASE_ID ?? "",
    //Collections
    usersCollectionID: process.env.SERVER_USERS_COLLECTION_ID ?? "",
    newsCollectionID: process.env.SERVER_NEWS_COLLECTION_ID ?? "",
    songsCollectionID: process.env.SERVER_SONGS_COLLECTION_ID ?? "",
    sliderPostersCollectionID: process.env.SERVER_SLIDER_POSTERS_COLLECTION_ID ?? "",
    mainSettingsCollectionID: process.env.SERVER_MAIN_SETTINGS_COLLECTION_ID ?? "",
    //Storage buckets
    userImagesBucketID: process.env.SERVER_USER_IMAGES_BUCKET_ID ?? "",
    newsImagesBucketID: process.env.SERVER_NEWS_IMAGES_BUCKET_ID,
    songsBucketID: process.env.SERVER_SONGS_BUCKET_ID,
    songsImagesBucketID: process.env.SERVER_SONGS_IMAGES_BUCKET_ID,
    sliderPostersBucketID: process.env.SERVER_SLIDER_POSTERS_BUCKET_ID,
}
