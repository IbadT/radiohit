import {ID, Permission, Query, Role} from "appwrite";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import {ServerConfig} from "@/lib/utils/server_config";
import {deleteWhitespacesOnSides, getCurrentUTCDate} from "@/lib/utils/utils";

const {database, storage} = appwriteSDKProvider;

/*
  Create new user document after Registration
 */
export async function createNewUserDocument(
    docUserID: string,
    userEmail: string,
    userName: string
) {
    try {
        let response = await database.listDocuments(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            [Query.equal("email", userEmail)]
        );
        if (response.documents.length >= 1) return;
        return database.createDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            docUserID,
            {
                name: userName,
                email: userEmail,
                role: "user",
            },
            [
                Permission.read(Role.any()),
                Permission.read(Role.user(docUserID)),
                Permission.write(Role.user(docUserID)),
            ]
        );
    } catch (error) {
        console.log("User Document creation error", error);
    }
}

/*
  Create new Radio User document after Registration
 */
export async function createNewRadioUserDocument(
    docUserID: string,
    radioEmail: string,
    radioName: string,
    radioAgentName: string,
    radioCity: string,
    radioDescription: string,
    imageID: string,
    imageURL: string
) {
    try {
        let response = await database.listDocuments(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            [Query.equal("email", radioEmail)]
        );
        if (response.documents.length >= 1) return;
        return database.createDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            docUserID,
            {
                name: radioName,
                email: radioEmail,
                role: "radio",
                radioAgentName: radioAgentName,
                radioCity: radioCity,
                radioDescription: radioDescription,
                userImageID: imageID,
                userImageURL: imageURL,
            },
            [
                Permission.read(Role.any()),
                Permission.read(Role.user(docUserID)),
                Permission.write(Role.user(docUserID)),
            ]
        );
    } catch (error) {
        console.log("User Document creation error", error);
    }
}

/*
   Upgrade user to artist
*/
export function upgradeUserToArtist(
    userDocID: string,
    artistName: string,
    artistCountry: string,
    artistDescription: string,
    artistImageUrl: string,
    artistImageID: string
) {
    return database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            name: artistName,
            artistName: artistName,
            artistCountry: artistCountry,
            artistDescription: artistDescription,
            userImageURL: artistImageUrl,
            userImageID: artistImageID,
            role: "artist",
        }
    );
}

/*
   Change user document after image upload
*/
export function newImageUploadChangeUserDocument(
    userDocID: string,
    newImageURL,
    newImageID
) {
    return database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            userImageURL: newImageURL,
            userImageID: newImageID,
        }
    );
}

/*
   Change username in user document
*/
export function changeUsernameInUserDocument(
    userDocID: string,
    newUsername: string
) {
    return database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            name: newUsername,
        }
    );
}

/*
   Change description in user document
*/
export function changeDescriptionInUserDocument(
    userDocID,
    newDescription,
    userRole
) {
    if (userRole == "artist") {
        return database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            userDocID,
            {
                artistDescription: newDescription,
            }
        );
    } else if (userRole == "radio") {
        return database.updateDocument(
            ServerConfig.dbID,
            ServerConfig.usersCollectionID,
            userDocID,
            {
                radioDescription: newDescription,
            }
        );
    }
}

/*
   Arist add new song document and update user document with new song ID
*/
export async function artistAddNewSong(
    userDocID: string,
    songID: string,
    songURL: string,
    songImageID: string,
    songImageURL: string,
    alreadyUploadedTracks: [],
    trackArtistName: string,
    trackSongName: string,
    trackDuration: string
) {
    const {slug} = require("cyr2lat");

    const deleteWhitespacesFromArtistName =
        deleteWhitespacesOnSides(trackArtistName);
    const deleteWhitespacesFromTrackName =
        deleteWhitespacesOnSides(trackSongName);

    const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
    const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

    let docResponse = await database.createDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        ID.unique(),
        {
            trackArtistID: userDocID,
            trackFileID: songID,
            trackURL: songURL,
            trackImageID: songImageID,
            trackImageURL: songImageURL,
            trackDuration: trackDuration,
            trackArtistName: deleteWhitespacesFromArtistName,
            trackSongName: deleteWhitespacesFromTrackName,
            trackSlug: readyTrackSlug,
            trackFieldForSearch: readyTrackFieldForSearch,
        }
    );
    const songDocumentID = docResponse.$id;
    const newUploadedTracksArray = [songDocumentID, ...alreadyUploadedTracks];
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            artistUploadedTracksID: newUploadedTracksArray,
        }
    );
}

/*
   Arist deleteSelectedSong
*/
export async function artistDeleteSong(
    songDocID: string,
    songImageID: string,
    songFileID: string,
    artistID: string,
    artistUploadedTracksID: []
) {
    //Delete song document
    await database.deleteDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        songDocID
    );
    await storage?.deleteFile(ServerConfig.songsBucketID, songFileID);
    await storage?.deleteFile(ServerConfig.songsImagesBucketID, songImageID);
    const newUploadedTracksArray = artistUploadedTracksID.filter(
        (val) => val != songDocID
    );
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID,
        {
            artistUploadedTracksID: newUploadedTracksArray,
        }
    );
}

/*
   User Add track to Favourite
*/
export function userAddToFavourite(
    songDocID: string,
    userDocID: string,
    userLikedTracks: []
) {
    //@ts-ignore
    const newLikedTracksArray = [songDocID, ...userLikedTracks];
    return database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            favouriteTracksID: newLikedTracksArray,
        }
    );
}

/*
   User Delete track to Favourite
*/
export function userDeleteFromFavourite(
    songDocID: string,
    userDocID: string,
    userLikedTracks: []
) {
    //@ts-ignore
    const newLikedTracksArray = userLikedTracks.filter((val) => val != songDocID);
    return database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            favouriteTracksID: newLikedTracksArray,
        }
    );
}

/*
   User Rate track
*/
export async function userAddTrackRating(
    songDocID: string,
    userDocID: string,
    userRatedTracks: [],
    songAlreadyRatedIDAndTime: [],
    artistID: string
) {
    const newRatedTracksArray = [songDocID, ...userRatedTracks];

    //Add rated track to user document
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            ratedTracksID: newRatedTracksArray,
        }
    );
    const currentDate = getCurrentUTCDate();
    const currentTime = new Date(Date.now()).toLocaleTimeString();
    const newWhoRatedIDandTimeArray = [
        `${userDocID} - ${currentDate} | ${currentTime}`,
        ...songAlreadyRatedIDAndTime,
    ];
    let songRes = await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        songDocID,
        {
            whoRatedIDandDateTime: newWhoRatedIDandTimeArray,
        }
    );
    const newTrackPopularity = songRes.trackPopularity + 1;
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        songDocID,
        {
            trackPopularity: newTrackPopularity,
        }
    );
    let artistDoc = await database.getDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID
    );
    const newRating = artistDoc.artistRating + 1;
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID,
        {
            artistRating: newRating,
        }
    );
}

/*
   User Delete rate for track
*/
export async function userDeleteTrackRating(
    songDocID: string,
    userDocID: string,
    userRatedTracks: [],
    songAlreadyRatedIDAndTime: [],
    artistID
) {
    const newRatedTracksArray = userRatedTracks.filter((val) => val != songDocID);

    //Add rated track to user document
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        userDocID,
        {
            ratedTracksID: newRatedTracksArray,
        }
    );
    const newWhoRatedIDandTimeArray = songAlreadyRatedIDAndTime.filter((val) => {
        //@ts-ignore
        const getOnlyUserID = val.split(" ")[0];
        return getOnlyUserID != userDocID;
    });
    let songRes = await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        songDocID,
        {
            whoRatedIDandDateTime: newWhoRatedIDandTimeArray,
        }
    );
    let newTrackPopularity = 0;
    if (songRes.trackPopularity != 0) {
        newTrackPopularity = songRes.trackPopularity - 1;
    }
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.songsCollectionID,
        songDocID,
        {
            trackPopularity: newTrackPopularity,
        }
    );
    let artistDoc = await database.getDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID
    );
    let newRating = 0;
    if (artistDoc.artistRating != 0) {
        newRating = artistDoc.artistRating - 1;
    }
    await database.updateDocument(
        ServerConfig.dbID,
        ServerConfig.usersCollectionID,
        artistID,
        {
            artistRating: newRating,
        }
    );
}

/*
   User Suggest Song - add song document to songs collection
*/


export async function suggestSongAddNewSong(
    songID: string,
    songURL: string,
    coverID: string,
    coverURL: string,
    trackArtistName: string,
    trackSongName: string,
    trackDuration: string,
    whoSuggestedName: string,
    whoSuggestedEmail: string,
    // authors: string,
    authorsOfWords: string,
    musicAuthors: string,
    fullName: string,
    birthDate: string,
    phoneNumber: string,
    socialLinks: string[]
) {
    const {slug} = require("cyr2lat");

    const deleteWhitespacesFromArtistName = deleteWhitespacesOnSides(trackArtistName);
    const deleteWhitespacesFromTrackName = deleteWhitespacesOnSides(trackSongName);

    const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
    const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

    // Преобразуем массив социальных ссылок в строку для хранения
    const socialLinksString = socialLinks.filter(link => link.trim() !== '').join(', ');



    // Получаем структуру коллекции из Appwrite
  const collectionStructure = await database.listDocuments(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    [Query.limit(1)] // Получаем один документ для анализа структуры
  );

  // Извлекаем ключи из первого документа (если он существует)
  const existingFields = collectionStructure.documents.length > 0
    ? Object.keys(collectionStructure.documents[0])
    : [];




    // Объект для сохранения в базу данных
  const songData: Record<string, any> = {
    trackArtistID: "-",
    trackFileID: songID,
    trackURL: songURL,
    trackImageID: coverID,
    trackImageURL: coverURL,
    trackDuration: trackDuration,
    trackArtistName: deleteWhitespacesFromArtistName,
    trackSongName: deleteWhitespacesFromTrackName,
    trackSlug: readyTrackSlug,
    trackFieldForSearch: readyTrackFieldForSearch,
    whoSuggestedName: whoSuggestedName,
    whoSuggestedEmail: whoSuggestedEmail,
    isSuggested: true,
    alreadyModerated: false,
    isApproved: false,
  };

  // Добавляем дополнительные поля, если они существуют в коллекции
  if (existingFields.includes("authorsOfWords")) {
    songData.authorsOfWords = authorsOfWords;
  }
  if (existingFields.includes("musicAuthors")) {
    songData.musicAuthors = musicAuthors;
  }
  if (existingFields.includes("fullName")) {
    songData.fullName = fullName;
  }
  if (existingFields.includes("birthDate")) {
    songData.birthDate = birthDate;
  }
  if (existingFields.includes("phoneNumber")) {
    songData.phoneNumber = phoneNumber;
  }
  if (existingFields.includes("socialLinks")) {
    songData.socialLinks = socialLinksString;
  }

  // Создаем документ в Appwrite
  await database.createDocument(
    ServerConfig.dbID,
    ServerConfig.songsCollectionID,
    ID.unique(),
    songData
  );








    // await database.createDocument(
    //     ServerConfig.dbID,
    //     ServerConfig.songsCollectionID,
    //     ID.unique(),
    //     {
    //         trackArtistID: "-",
    //         trackFileID: songID,
    //         trackURL: songURL,
    //         trackImageID: coverID,
    //         trackImageURL: coverURL,
    //         trackDuration: trackDuration,
    //         trackArtistName: deleteWhitespacesFromArtistName,
    //         trackSongName: deleteWhitespacesFromTrackName,
    //         trackSlug: readyTrackSlug,
    //         trackFieldForSearch: readyTrackFieldForSearch,
    //         whoSuggestedName: whoSuggestedName,
    //         whoSuggestedEmail: whoSuggestedEmail,

    //         // authorsOfWords: authorsOfWords,
    //         // musicAuthors: musicAuthors,
    //         // fullName: fullName,
    //         // birthDate: birthDate ,
    //         // phoneNumber: phoneNumber,
    //         // socialLinks: socialLinksString,
    //         isSuggested: true,
    //         alreadyModerated: false,
    //         isApproved: false,
    //     }
    // );
}





// export async function suggestSongAddNewSong(
//     songID: string,
//     songURL: string,
//     trackArtistName: string,
//     trackSongName: string,
//     trackDuration: string,
//     whoSuggestedName: string,
//     whoSuggestedEmail: string
// ) {
//     const {slug} = require("cyr2lat");

//     const deleteWhitespacesFromArtistName =
//         deleteWhitespacesOnSides(trackArtistName);
//     const deleteWhitespacesFromTrackName =
//         deleteWhitespacesOnSides(trackSongName);

//     const readyTrackSlug = slug(deleteWhitespacesFromTrackName);
//     const readyTrackFieldForSearch = `${deleteWhitespacesFromArtistName} ${deleteWhitespacesFromTrackName}`;

//     await database.createDocument(
//         ServerConfig.dbID,
//         ServerConfig.songsCollectionID,
//         ID.unique(),
//         {
//             trackArtistID: "-",
//             trackFileID: songID,
//             trackURL: songURL,
//             trackImageID: "-",
//             trackImageURL: "-",
//             trackDuration: trackDuration,
//             trackArtistName: deleteWhitespacesFromArtistName,
//             trackSongName: deleteWhitespacesFromTrackName,
//             trackSlug: readyTrackSlug,
//             trackFieldForSearch: readyTrackFieldForSearch,
//             whoSuggestedName: whoSuggestedName,
//             whoSuggestedEmail: whoSuggestedEmail,
//             isSuggested: true,
//             alreadyModerated: false,
//             isApproved: false,
//         }
//     );
// }
