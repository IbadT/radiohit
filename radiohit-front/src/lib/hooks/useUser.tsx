"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import {
  getSessionsList,
  updateName,
  updatePassword,
} from "@/lib/appwrite/auth_services/auth.service";
import {
  artistAddNewSong,
  artistDeleteSong,
  changeDescriptionInUserDocument,
  changeUsernameInUserDocument,
  newImageUploadChangeUserDocument,
  suggestSongAddNewSong,
  upgradeUserToArtist,
  userAddToFavourite,
  userAddTrackRating,
  userDeleteFromFavourite,
  userDeleteTrackRating,
} from "@/lib/appwrite/db_services/users.db.service";
import { toast } from "@/components/ui/Toaster/use-toast";
import { useRouter } from "next/navigation";
import {
  uploadFileToBucket,
  uploadFileToBucketAnonymous,
} from "@/lib/appwrite/upload_services/fileUpload.service";
import { ServerConfig } from "@/lib/utils/server_config";
import {
  getSongImageURL,
  getSongURL,
  getUserImageURL,
} from "@/lib/appwrite/common/appwrite.helper";
import {
  getArtistDoc,
  getSongFileUrlForDownload,
  updateDocumentsAfterDownload,
} from "@/lib/appwrite/db_services/download.db.service";
import { saveAs } from "file-saver";

export function useUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    updateUserDataStore,
    hideArtistPromoBanner,
    userDocument,
    hasHydrated,
    isAuthenticated,
    userAccount,
    showArtistPromo,
  } = useAuth();

  //Change user avatar on account page
  const changeUserImage = async (newUserImage: File) => {
    setLoading(true);
    try {
      //Upload new user image to bucket
      await uploadFileToBucket(
        ServerConfig.userImagesBucketID,
        userAccount.$id,
        newUserImage
      ).then(async (uploadImage: any) => {
        //@ts-ignore
        const newImageUrl = getUserImageURL(uploadImage.$id);

        //Update user document with new image info
        //@ts-ignore
        await newImageUploadChangeUserDocument(
          userAccount.$id,
          newImageUrl,
          uploadImage.$id
        ).then(() => {
          updateUserDataStore().then(() => {
            toast({
              title: `Изображение изменено`,
              description: `Изображение успешно изменено`,
              variant: "default",
            });
          });
        });
      });
    } catch (error) {
      toast({
        title: `Ошибка загрузки`,
        description: `Пожалуйста, попробуйте ещё раз`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Change username in account settings
  const changeUsername = async (newUsername: string) => {
    setLoading(true);
    try {
      //Update name in account
      await updateName(newUsername).then(async (res) => {
        //Update name in user document
        await changeUsernameInUserDocument(userDocument.$id, newUsername).then(
          async () => {
            //Update user data in store
            await updateUserDataStore();
            toast({
              title: `Изменения сохранены`,
              description: `Имя успешно изменено`,
              variant: "default",
            });
          }
        );
      });
    } catch (error) {
      toast({
        title: `Ошибка`,
        description: `Проверьте введенные данные`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update user password in account settings
  const changeUserPassword = async (
    newPassword: string,
    oldPassword: string
  ) => {
    setLoading(true);
    try {
      //Update user password
      await updatePassword(newPassword, oldPassword).then(async () => {
        //Update user data in store
        await updateUserDataStore();
        toast({
          title: `Изменения сохранены`,
          description: `Пароль успешно изменен`,
          variant: "default",
        });
      });
    } catch (error) {
      toast({
        title: `Ошибка`,
        description: `Неверный текущий пароль`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update user account to artist account
  const updateUserToArtist = async (
    artistName: string,
    artistCountry: string,
    artistDescription: string,
    fileImage: File
  ) => {
    setLoading(true);
    try {
      //Upload artist image
      await uploadFileToBucket(
        ServerConfig.userImagesBucketID,
        userAccount.$id,
        fileImage
      ).then(async (uploadImage: any) => {
        //Update UserName to artist name
        await updateName(artistName);
        const artistImageUrl = getUserImageURL(uploadImage.$id);

        //Update user document
        await upgradeUserToArtist(
          userAccount.$id,
          artistName,
          artistCountry,
          artistDescription,
          artistImageUrl,
          uploadImage.$id
        ).then(async () => {
          hideArtistPromoBanner();
          updateUserDataStore().then(() => {
            router.replace("/account");
            toast({
              title: `Изменения сохранены`,
              description: `Добро пожаловать, ${artistName}`,
              variant: "default",
            });
          });
        });
      });
    } catch (error) {
      toast({
        title: `Ошибка`,
        description: `Пожалуйста, попробуйте позже`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Change artist description in user settings
  const changeUserDescription = async (newDescription: string) => {
    setLoading(true);
    try {
      //Change artist description
      if (userDocument.role == "artist") {
        await changeDescriptionInUserDocument(
          userAccount.$id,
          newDescription,
          "artist"
        ).then(() => {
          updateUserDataStore().then(() => {
            toast({
              title: `Описание изменено`,
              description: `Описание успешно изменено`,
              variant: "default",
            });
          });
        });
      }
      //Change radio description
      else if (userDocument.role == "radio") {
        await changeDescriptionInUserDocument(
          userAccount.$id,
          newDescription,
          "radio"
        ).then(() => {
          updateUserDataStore().then(() => {
            toast({
              title: `Описание изменено`,
              description: `Описание успешно изменено`,
              variant: "default",
            });
          });
        });
      }
    } catch (error) {
      toast({
        title: `Ошибка`,
        description: `Пожалуйста, проверьте введенные данные`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Get all user Sessions List
  const getUserSessionsList = async () => {
    try {
      return (await getSessionsList()).sessions;
    } catch (error) {
      console.log(error);
    }
  };

  //Artist Upload New Track
  const artistUploadNewTrack = async (
    trackName: string,
    trackImage: File,
    trackSong: File,
    trackDuration: string
  ) => {
    setLoading(true);
    try {
      //Upload song file to bucket
      await uploadFileToBucket(
        ServerConfig.songsBucketID,
        userAccount.$id,
        trackSong
      ).then(async (uploadedSong) => {
        //@ts-ignore
        const songID = uploadedSong.$id;
        const songURL = getSongURL(songID);

        //Upload song image to bucket
        await uploadFileToBucket(
          ServerConfig.songsImagesBucketID,
          userAccount.$id,
          trackImage
        ).then(async (uploadedImage) => {
          //@ts-ignore
          const songImageID = uploadedImage.$id;
          const songImageURL = getSongImageURL(songImageID);

          //Artist uploaded tracks id array
          const artistUploadedTracksID = userDocument.artistUploadedTracksID;

          //Add document in Songs collection and update user document with new song id
          await artistAddNewSong(
            userAccount.$id,
            songID,
            songURL,
            songImageID,
            songImageURL,
            artistUploadedTracksID,
            userDocument.name,
            trackName,
            trackDuration
          ).then(async () => {
            updateUserDataStore().then(() => {
              toast({
                title: `Трек успешно загружен`,
                description: `Вы успешно добавили трек`,
                variant: "default",
              });
              router.push("/account/uploaded-tracks");
            });
          });
        });
      });
    } catch (error) {
      toast({
        title: `Ошибка загрузки трека`,
        description: `Пожалуйста, попробуйте ещё раз`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Artist Delete Track
  const artistDeleteExistingTrack = async (
    songID: string,
    songImageID: string,
    songFileID: string,
    artistID: string
  ) => {
    try {
      return await artistDeleteSong(
        songID,
        songImageID,
        songFileID,
        artistID,
        userDocument.artistUploadedTracksID
      ).then(async () => {
        updateUserDataStore().then(() => {
          toast({
            title: `Трек удален`,
            description: `Вы удалили трек`,
            variant: "default",
          });
        });
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка удаления трека`,
        description: `Пожалуйста, свяжитесь с поддержкой`,
        variant: "destructive2",
      });
    }
  };

  //User Add / Delete track in Favourites
  const userChangeFavourites = async (
    isLiked: boolean,
    songDocID: string,
    artistID: string
  ) => {
    try {
      if (isLiked) {
        return await userAddToFavourite(
          songDocID,
          userDocument.$id,
          userDocument.favouriteTracksID
        ).then(async () => {
          updateUserDataStore().then(() => {
            toast({
              title: `Трек добавлен в избранное`,
              description: `Вы добавили трек в избранное`,
              variant: "default",
            });
          });
        });
      } else {
        return await userDeleteFromFavourite(
          songDocID,
          userDocument.$id,
          userDocument.favouriteTracksID
        ).then(async () => {
          updateUserDataStore().then(() => {
            toast({
              title: `Трек удален из избранного`,
              description: `Вы удалили трек из избранного`,
              variant: "default",
            });
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //User Rate / Unrate track
  const userRateTrack = async (
    needRated: boolean,
    songDocID: string,
    whoRatedIDandDateTime: [],
    artistID: string
  ) => {
    try {
      if (needRated) {
        await userAddTrackRating(
          songDocID,
          userDocument.$id,
          userDocument.ratedTracksID,
          whoRatedIDandDateTime,
          artistID
        ).then(async () => {
          await updateUserDataStore().then(() => {
            toast({
              title: `Спасибо за вашу оценку!`,
              description: `Вы успешно проголосовали за трек`,
              variant: "default",
            });
          });
        });
      }
      if (!needRated) {
        await userDeleteTrackRating(
          songDocID,
          userDocument.$id,
          userDocument.ratedTracksID,
          whoRatedIDandDateTime,
          artistID
        ).then(async () => {
          await updateUserDataStore().then(() => {
            toast({
              title: `Оценка удалена`,
              description: `Вы удалили оценку`,
              variant: "destructive2",
            });
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Radio download track
  const radioDownloadTrack = async (songFileID: string, songDocID: string) => {
    //Check if its radio account
    if (userDocument.role != "radio") return;
    try {
      //Download song
      await getSongFileUrlForDownload(songFileID)
        .then((url) => {
          window.location.href = url;
        })
        .then(async () => {
          //Update documents after download
          await updateDocumentsAfterDownload(
            userDocument.$id,
            songDocID,
            userDocument.downloadTracksID
          ).then(() => {
            updateUserDataStore();
          });
        });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка загрузки`,
        description: `Пожалуйста, попробуйте позже`,
        variant: "destructive2",
      });
    }
  };

  //Radio get artist and song info
  const getArtistAndSongInfoForRadio = async (artistID: string, song) => {
    if (userDocument.role != "radio") return;
    try {
      await getArtistDoc(artistID).then(async (artistDoc) => {
        toast({
          title: `Подготовка файла`,
          description: `Подготовка файла к загрузке`,
          variant: "default",
        });
        await fetch("/api/pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artistName: artistDoc.name,
            artistImageURL: artistDoc.userImageURL,
            artistCountry: artistDoc.artistCountry,
            artistDescription: artistDoc.artistDescription,
            songName: song.trackSongName,
            songImageURL: song.trackImageURL,
          }),
        })
          .then((res) => res.blob())
          .then((blob) => {
            saveAs(
              blob,
              `${song.trackArtistName} - ${song.trackSongName}_RadioHit.pdf`
            );
            toast({
              title: `Файл готов`,
              description: `Идет скачивание...`,
              variant: "default",
              duration: 2000,
            });
          });
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка загрузки`,
        description: `Пожалуйста, попробуйте позже`,
        variant: "destructive2",
      });
    }
  };







  const uploadSuggestedTrack = async (
    trackName: string,
    artistName: string,
    whoSuggestedName: string,
    whoSuggestedEmail: string,
    // authors: string,
    authorsOfWords: string,
    musicAuthors: string,
    fullName: string,
    birthDate: string,
    phoneNumber: string,
    socialLinks: string[],
    trackSongFile: File,
    trackDuration: string,
    trackSongCover: File
  ) => {
    setLoading(true);
    try {
      // 1. Сначала загружаем обложку
      const uploadedCover = await uploadFileToBucketAnonymous(
        ServerConfig.songsImagesBucketID,
        trackSongCover
      );
      
      if (!uploadedCover) {
        throw new Error('Failed to upload cover image');
      }
      const coverID = uploadedCover.$id;
      const coverURL = getSongImageURL(coverID);
  
      // 2. Затем загружаем аудиофайл
      const uploadedSong = await uploadFileToBucketAnonymous(
        ServerConfig.songsBucketID,
        trackSongFile
      );
      
      if (!uploadedSong) {
        throw new Error('Failed to upload song file');
      }
      const songID = uploadedSong.$id;
      const songURL = getSongURL(songID);
  
      // 3. Создаем запись в базе данных
      await suggestSongAddNewSong(
        songID,
        songURL,
        coverID,
        coverURL,
        artistName,
        trackName,
        trackDuration,
        whoSuggestedName,
        whoSuggestedEmail,
        // authors,
        authorsOfWords,
        musicAuthors,
        fullName,
        birthDate,
        phoneNumber,
        socialLinks
      );
  
      return { success: true };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };










  // const uploadSuggestedTrack = async (
  //   trackName: string,
  //   artistName: string,
  //   whoSuggestedName: string,
  //   whoSuggestedEmail: string,
  //   authors: string,
  //   authorsOfWords: string, // Новое поле
  //   musicAuthors: string,   // Новое поле
  //   fullName: string,
  //   birthDate: string,
  //   phoneNumber: string,
  //   socialLinks: Array<string>,
  //   trackSongFile: File,
  //   trackDuration: string,
  //   trackSongCover: File
  // ) => {
  //   setLoading(true);
  //   try {
  //     // 1. Сначала загружаем аудиофайл
  //     const uploadedSong = await uploadFileToBucketAnonymous(
  //       ServerConfig.songsBucketID,
  //       trackSongFile
  //     );
      
  //     if (!uploadedSong) {
  //       throw new Error('Failed to upload song file');
  //     }
  
  //     const songID = uploadedSong.$id;
  //     const songURL = getSongURL(songID);
  
  //     // 2. Затем загружаем обложку
  //     const uploadedCover = await uploadFileToBucketAnonymous(
  //       ServerConfig.songsImagesBucketID,
  //       trackSongCover
  //     );
  
  //     if (!uploadedCover) {
  //       throw new Error('Failed to upload cover image');
  //     }
  
  //     const coverID = uploadedCover.$id;
  //     const coverURL = getSongImageURL(coverID);
  
  //     // 3. Создаем запись в базе данных со всеми данными
  //     await suggestSongAddNewSong(
  //       songID,
  //       songURL,
  //       coverID,
  //       coverURL,
  //       artistName,
  //       trackName,
  //       trackDuration,
  //       whoSuggestedName,
  //       whoSuggestedEmail,
  //       authors,
  //       authorsOfWords, // Передаём новое поле
  //       musicAuthors,   // Передаём новое поле
  //       fullName,
  //       birthDate,
  //       phoneNumber,
  //       socialLinks
  //     );
  
  //     toast({
  //       title: `Трек успешно загружен`,
  //       description: `Ваш трек отправлен на модерацию`,
  //       variant: "default",
  //     });
  
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     toast({
  //       title: `Ошибка загрузки трека`,
  //       description: error.message || `Пожалуйста, попробуйте ещё раз`,
  //       variant: "destructive2",
  //     });
  //     throw error; // Пробрасываем ошибку дальше для обработки в форме
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // //Upload suggested song (WARN!!! For all users)
  // const uploadSuggestedTrack = async (
  //   trackName: string,
  //   artistName: string,
  //   whoSuggestedName: string,
  //   whoSuggestedEmail: string,
  //   authors:string,
  //   fullName: string,
  //   birthDate:string,
  //   phoneNumber: string,
  //   socialLinks: Array<string>,
  //   trackSongFile: File,
  //   trackDuration: string,
  //   trackSongCover: File

  // ) => {
  //   setLoading(true);
  //   try {
  //     //Upload song file to bucket
  //     await uploadFileToBucketAnonymous(
  //       ServerConfig.songsBucketID,
  //       trackSongFile
  //     ).then(async (uploadedSong) => {
  //       if(uploadedSong) {
  //         const songID = uploadedSong.$id;
  //         const songURL = getSongURL(songID);

  //         //Add document in Songs collection
  //         await suggestSongAddNewSong(
  //             songID,
  //             songURL,
  //             artistName,
  //             trackName,
  //             trackDuration,
  //             whoSuggestedName,
  //             whoSuggestedEmail
  //         );
  //       } else {
  //         console.log('Failed to create document for uploaded song')
  //       }

  //     });
  //   } catch (error) {
  //     toast({
  //       title: `Ошибка загрузки трека`,
  //       description: `Пожалуйста, попробуйте ещё раз`,
  //       variant: "destructive2",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!hasHydrated) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [userDocument]);

  return {
    loading,
    userDocument,
    userAccount,
    hasHydrated,
    isAuthenticated,
    showArtistPromo,
    userChangeFavourites,
    artistDeleteExistingTrack,
    hideArtistPromoBanner,
    artistUploadNewTrack,
    updateUserToArtist,
    updateUserDataStore,
    changeUserImage,
    changeUserPassword,
    changeUsername,
    changeUserDescription,
    getUserSessionsList,
    userRateTrack,
    radioDownloadTrack,
    getArtistAndSongInfoForRadio,
    uploadSuggestedTrack,
  };
}
