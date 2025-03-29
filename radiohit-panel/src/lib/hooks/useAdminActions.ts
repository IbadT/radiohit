"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadFileToBucket } from "@/lib/appwrite/upload_services/fileUpload.service";
import { ServerConfig } from "@/lib/utils/server_config";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  getHomePosterImageURL,
  getNewsImageURL,
  getSongImageURL,
  getSongURL,
  getUserImageURL,
} from "@/lib/appwrite/common/appwrite.helper";
import {
  createNewClipPost,
  createNewEventPost,
  createNewNewsPost,
  deleteNewsPostByID,
  updateClipPostByID,
  updateEventPostByID,
  updateNewsPostByID,
} from "@/lib/appwrite/db_services/news.db.service";
import { toast } from "@/components/ui/Toaster/use-toast";
import { updateHomeBanner } from "@/lib/appwrite/db_services/banner.db.service";
import {
  addToPlaylist,
  deleteFromPlaylist,
} from "@/lib/appwrite/db_services/radio.db.service";
import {
  createNewArtistDocument,
  deleteArtistAndAllArtistSongs,
  updateArtistDocument,
} from "@/lib/appwrite/db_services/artists.db.service";
import {
  createNewSongDoc, deleteSingleSuggestedSong,
  deleteUploadedSong,
  updateSongDocument, updateSuggestedSongAndArtistDocument,
} from "@/lib/appwrite/db_services/songs.db.service";

export function useAdminActions() {
  const router = useRouter();
  const { userDocument } = useAuth();

  const [loading, setLoading] = useState(false);

  //Add new news post
  const addNewsPost = async (
    title: string,
    description: string,
    imageFile: File
  ) => {
    setLoading(true);
    try {
      //Upload image to bucket
      await uploadFileToBucket(
        ServerConfig.newsImagesBucketID,
        userDocument.$id,
        imageFile
      ).then(async (image) => {
        if (image) {
          const imageURL = getNewsImageURL(image.$id);
          await createNewNewsPost(title, description, image.$id, imageURL).then(
            () => {
              toast({
                title: `Добавлено`,
                description: `Запись успешно добавлена`,
                variant: "default",
              });

              router.push("/news");
              router.refresh();
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка`,
        description: `Ошибка добавления записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update news post
  const updateNewsPost = async (
    docID: string,
    title: string,
    description: string,
    oldImageID: string,
    oldImageURL: string,
    imageFile?: File
  ) => {
    setLoading(true);
    try {
      //If image has changed
      if (imageFile) {
        //Upload image to bucket
        await uploadFileToBucket(
          ServerConfig.newsImagesBucketID,
          userDocument.$id,
          imageFile
        ).then(async (image) => {
          if (image) {
            const imageURL = getNewsImageURL(image.$id);
            await updateNewsPostByID(
              docID,
              title,
              description,
              image.$id,
              imageURL
            ).then(() => {
              toast({
                title: `Сохранено`,
                description: `Запись успешно сохранена`,
                variant: "default",
              });

              router.push("/news");
              router.refresh();
            });
          }
        });
      } else {
        await updateNewsPostByID(
          docID,
          title,
          description,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Сохранено`,
            description: `Запись успешно сохранена`,
            variant: "default",
          });

          router.push("/news");
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Delete news, events, clip post
  const deleteNewsPost = async (docID: string, imageFileID: string) => {
    setLoading(true);
    try {
      await deleteNewsPostByID(docID, imageFileID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Add new Event post
  const addNewEvent = async (
    title: string,
    description: string,
    eventDate: string,
    eventTime: string,
    eventAddress: string,
    eventPhone1: string,
    eventPhone2: string,
    imageFile: File
  ) => {
    setLoading(true);
    try {
      //Upload image to bucket
      await uploadFileToBucket(
        ServerConfig.newsImagesBucketID,
        userDocument.$id,
        imageFile
      ).then(async (image) => {
        if (image) {
          const imageURL = getNewsImageURL(image.$id);
          await createNewEventPost(
            title,
            description,
            eventDate,
            eventTime,
            eventAddress,
            eventPhone1,
            eventPhone2,
            image.$id,
            imageURL
          ).then(() => {
            toast({
              title: `Добавлено`,
              description: `Запись успешно добавлена`,
              variant: "default",
            });

            router.push("/events");
            router.refresh();
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Update Event post
  const updateEventPost = async (
    docID: string,
    title: string,
    description: string,
    eventDate: string,
    eventTime: string,
    eventAddress: string,
    eventPhone1: string,
    eventPhone2: string,
    oldImageID: string,
    oldImageURL: string,
    imageFile?: File
  ) => {
    setLoading(true);
    try {
      //If image has changed
      if (imageFile) {
        //Upload image to bucket
        await uploadFileToBucket(
          ServerConfig.newsImagesBucketID,
          userDocument.$id,
          imageFile
        ).then(async (image) => {
          if (image) {
            const imageURL = getNewsImageURL(image.$id);
            await updateEventPostByID(
              docID,
              title,
              description,
              eventDate,
              eventTime,
              eventAddress,
              eventPhone1,
              eventPhone2,
              image.$id,
              imageURL
            ).then(() => {
              toast({
                title: `Сохранено`,
                description: `Запись успешно сохранена`,
                variant: "default",
              });

              router.push("/events");
              router.refresh();
            });
          }
        });
      } else {
        await updateEventPostByID(
          docID,
          title,
          description,
          eventDate,
          eventTime,
          eventAddress,
          eventPhone1,
          eventPhone2,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Сохранено`,
            description: `Запись успешно сохранена`,
            variant: "default",
          });

          router.push("/events");
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Add new Clip post
  const addClipPost = async (
    title: string,
    description: string,
    youTubeVideoID: string,
    imageFile: File
  ) => {
    setLoading(true);
    try {
      //Upload image to bucket
      await uploadFileToBucket(
        ServerConfig.newsImagesBucketID,
        userDocument.$id,
        imageFile
      ).then(async (image) => {
        if (image) {
          const imageURL = getNewsImageURL(image.$id);
          await createNewClipPost(
            title,
            description,
            youTubeVideoID,
            image.$id,
            imageURL
          ).then(() => {
            toast({
              title: `Добавлено`,
              description: `Запись успешно добавлена`,
              variant: "default",
            });

            router.push("/clips");
            router.refresh();
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка`,
        description: `Ошибка добавления записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update Clip Post
  const updateClipPost = async (
    docID: string,
    title: string,
    description: string,
    youTubeVideoID: string,
    oldImageID: string,
    oldImageURL: string,
    imageFile?: File
  ) => {
    setLoading(true);
    try {
      //If image has changed
      if (imageFile) {
        //Upload image to bucket
        await uploadFileToBucket(
          ServerConfig.newsImagesBucketID,
          userDocument.$id,
          imageFile
        ).then(async (image) => {
          if (image) {
            const imageURL = getNewsImageURL(image.$id);
            await updateClipPostByID(
              docID,
              title,
              description,
              youTubeVideoID,
              image.$id,
              imageURL
            ).then(() => {
              toast({
                title: `Сохранено`,
                description: `Запись успешно сохранена`,
                variant: "default",
              });

              router.push("/clips");
              router.refresh();
            });
          }
        });
      } else {
        await updateClipPostByID(
          docID,
          title,
          description,
          youTubeVideoID,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Сохранено`,
            description: `Запись успешно сохранена`,
            variant: "default",
          });

          router.push("/clips");
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update Home Banner Content
  const updateMainBannerContent = async (
    posterTitle: string,
    posterTopSubtitle: string,
    posterBottomSubtitle: string,
    titleColor: string,
    topSubtitleColor: string,
    bottomSubtitleColor: string,
    posterTargetURL: string,
    oldImageID: string,
    oldImageURL: string,
    imageFile?: File
  ) => {
    setLoading(true);
    try {
      if (imageFile) {
        await uploadFileToBucket(
          ServerConfig.sliderPostersBucketID,
          userDocument.$id,
          imageFile
        ).then(async (image) => {
          if (image) {
            const imageURL = getHomePosterImageURL(image.$id);

            await updateHomeBanner(
              posterTitle,
              posterTopSubtitle,
              posterBottomSubtitle,
              titleColor,
              topSubtitleColor,
              bottomSubtitleColor,
              posterTargetURL,
              image.$id,
              imageURL
            ).then(() => {
              toast({
                title: `Обновлено`,
                description: `Баннер успешно обновлен`,
                variant: "default",
              });
              router.refresh();
            });
          }
        });
      } else {
        await updateHomeBanner(
          posterTitle,
          posterTopSubtitle,
          posterBottomSubtitle,
          titleColor,
          topSubtitleColor,
          bottomSubtitleColor,
          posterTargetURL,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Обновлено`,
            description: `Баннер успешно обновлен`,
            variant: "default",
          });
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка обновления баннера`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Delete track from playlist
  const addTrackToRadioPlaylist = async (songID: string) => {
    setLoading(true);
    try {
      await addToPlaylist(songID).then(() => {
        router.refresh();
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Delete track from playlist
  const deleteTrackFromRadioPlaylist = async (songID: string) => {
    setLoading(true);
    try {
      await deleteFromPlaylist(songID).then(() => {
        router.refresh();
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Create new Artist
  const createNewArtist = async (
    artistName: string,
    artistEmail: string,
    artistCountry: string,
    artistRating: number,
    artistDescription: string,
    imageFile: File
  ) => {
    setLoading(true);
    try {
      await uploadFileToBucket(
        ServerConfig.userImagesBucketID,
        userDocument.$id,
        imageFile
      ).then(async (image) => {
        if (image) {
          const imageURL = getUserImageURL(image.$id);
          await createNewArtistDocument(
            artistName,
            artistEmail,
            artistCountry,
            artistRating,
            artistDescription,
            image.$id,
            imageURL
          ).then(() => {
            toast({
              title: `Добавлено`,
              description: `Исполнитель успешно добавлен`,
              variant: "default",
            });

            router.push("/artists");
            router.refresh();
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка добавления исполнителя`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Delete Artist and Artist songs from DB
  const deleteArtist = async (docID: string, imageFileID: string) => {
    setLoading(true);
    try {
      await deleteArtistAndAllArtistSongs(docID, imageFileID).then(() => {
        router.refresh();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Update Artist Document
  const updateArtist = async (
    artistDocID: string,
    artistName: string,
    artistEmail: string,
    artistCountry: string,
    artistRating: number,
    artistDescription: string,
    oldImageID: string,
    oldImageURL: string,
    imageFile?: File
  ) => {
    setLoading(true);
    try {
      if (imageFile) {
        await uploadFileToBucket(
          ServerConfig.userImagesBucketID,
          userDocument.$id,
          imageFile
        ).then(async (image) => {
          if (image) {
            const imageURL = getUserImageURL(image.$id);

            await updateArtistDocument(
              artistDocID,
              artistName,
              artistEmail,
              artistCountry,
              artistRating,
              artistDescription,
              image.$id,
              imageURL
            ).then(() => {
              toast({
                title: `Сохранено`,
                description: `Изменения успешно сохранены`,
                variant: "default",
              });

              router.push("/artists");
              router.refresh();
            });
          }
        });
      } else {
        await updateArtistDocument(
          artistDocID,
          artistName,
          artistEmail,
          artistCountry,
          artistRating,
          artistDescription,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Сохранено`,
            description: `Изменения успешно сохранены`,
            variant: "default",
          });

          router.push("/artists");
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error.message);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения записи`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Add new song
  const addNewSong = async (
    trackName: string,
    trackArtistName: string,
    trackPopularity: number,
    trackArtistID: string,
    isApproved: boolean,
    trackDuration: string,
    trackImage: File,
    trackSong: File
  ) => {
    setLoading(true);
    try {
      await uploadFileToBucket(
        ServerConfig.songsBucketID,
        userDocument.$id,
        trackSong
      ).then(async (uploadedSong) => {
        const songID = uploadedSong.$id;
        const songURL = getSongURL(songID);

        await uploadFileToBucket(
          ServerConfig.songsImagesBucketID,
          userDocument.$id,
          trackImage
        ).then(async (uploadedImage) => {
          const songImageID = uploadedImage.$id;
          const songImageURL = getSongImageURL(songImageID);

          await createNewSongDoc(
            trackName,
            trackArtistName,
            trackPopularity,
            trackArtistID,
            isApproved,
            trackDuration,
            songID,
            songURL,
            songImageID,
            songImageURL
          ).then(() => {
            toast({
              title: `Трек успешно загружен`,
              description: `Вы успешно добавили трек`,
              variant: "default",
            });
            router.push("/songs");
            router.refresh();
          });
        });
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: `Ошибка`,
        description: `Ошибка добавления трека`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //UpdateSong
  const updateSong = async (
    songDocID: string,
    trackName: string,
    trackArtistName: string,
    trackPopularity: number,
    trackArtistID: string,
    isApproved: boolean,
    trackDuration: string,
    oldImageID: string,
    oldImageURL: string,
    oldSongID: string,
    oldISongURL: string,
    trackImage?: File,
    trackSong?: File
  ) => {
    setLoading(true);
    try {
      if (trackImage) {
        await uploadFileToBucket(
          ServerConfig.songsImagesBucketID,
          userDocument.$id,
          trackImage
        ).then(async (uploadedImage) => {
          if (uploadedImage) {
            const songImageID = uploadedImage.$id;
            const songImageURL = getSongImageURL(songImageID);
            await updateSongDocument(
              songDocID,
              trackName,
              trackArtistName,
              trackPopularity,
              trackArtistID,
              isApproved,
              trackDuration,
              oldSongID,
              oldISongURL,
              songImageID,
              songImageURL
            ).then(() => {
              toast({
                title: `Изменения сохранены`,
                description: `Трек успешно изменен`,
                variant: "default",
              });
              router.push("/songs");
              router.refresh();
            });
          }
        });
      } else {
        await updateSongDocument(
          songDocID,
          trackName,
          trackArtistName,
          trackPopularity,
          trackArtistID,
          isApproved,
          trackDuration,
          oldSongID,
          oldISongURL,
          oldImageID,
          oldImageURL
        ).then(() => {
          toast({
            title: `Изменения сохранены`,
            description: `Трек успешно изменен`,
            variant: "default",
          });
          router.push("/songs");
          router.refresh();
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения трека`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Delete song from db
  const deleteSong = async (
    songID: string,
    songImageID: string,
    songFileID: string,
    artistID: string
  ) => {
    setLoading(true);
    try {
      await deleteUploadedSong(songID, songImageID, songFileID, artistID).then(
        () => {
          toast({
            title: `Удалено`,
            description: `Трек удален`,
            variant: "default",
          });
          router.refresh();
        }
      );
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка удаления`,
        description: `Ошибка удаления трека`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };


  //Delete suggested song
  const deleteSuggestedSong = async (
      songID: string,
      songFileID: string
  ) => {
    setLoading(true);
    try {
      await deleteSingleSuggestedSong(songID, songFileID).then(
          () => {
            toast({
              title: `Удалено`,
              description: `Предложенный трек удален`,
              variant: "default",
            });
            router.refresh();
          }
      );
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка удаления`,
        description: `Ошибка удаления трека`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update Suggested Song
  //UpdateSong
  const updateSuggestedSong = async (
      songDocID: string,
      trackName: string,
      trackArtistName: string,
      trackPopularity: number,
      trackArtistID: string,
      isApproved: boolean,
      trackImage?: File
  ) => {
    setLoading(true);
    try {
        await uploadFileToBucket(
            ServerConfig.songsImagesBucketID,
            userDocument.$id,
            trackImage
        ).then(async (uploadedImage) => {
          if (!uploadedImage) return;
            const songImageID = uploadedImage.$id;
            const songImageURL = getSongImageURL(songImageID);
            await updateSuggestedSongAndArtistDocument(
                songDocID,
                trackName,
                trackArtistName,
                trackPopularity,
                trackArtistID,
                isApproved,
                songImageID,
                songImageURL
            ).then(() => {
              toast({
                title: `Изменения сохранены`,
                description: `Трек успешно изменен`,
                variant: "default",
              });
              router.push("/suggested-songs");
              router.refresh();
            });

        });

    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка сохранения`,
        description: `Ошибка сохранения трека`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    addNewsPost,
    deleteNewsPost,
    updateNewsPost,
    addNewEvent,
    updateEventPost,
    addClipPost,
    updateClipPost,
    updateMainBannerContent,
    deleteTrackFromRadioPlaylist,
    addTrackToRadioPlaylist,
    createNewArtist,
    updateArtist,
    deleteArtist,
    addNewSong,
    updateSong,
    deleteSong,
    deleteSuggestedSong,
    updateSuggestedSong
  };
}
