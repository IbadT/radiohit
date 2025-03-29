"use client";
import useStore from "@/lib/hooks/useStore";
import { useAudioStore } from "@/lib/stores/audio_store";
import { shallow } from "zustand/shallow";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import {
  getNextTrackByCursor,
  getPreviousTrackByCursor,
} from "@/lib/appwrite/db_services/audioPlayer.db.service";

export function usePlayer() {
  const {
    play,
    pause,
    stop,
    playing,
    stopped,
    paused,
    isReady,
    isLoading,
    load,
  } = useGlobalAudioPlayer();

  //Get full track data
  //@ts-ignore
  const singleTrackData: any = useStore(
    useAudioStore,
    (state: any) => state.trackAudioData,
    //@ts-ignore
    shallow
  );

  //Check if play show / hide
  //@ts-ignore
  const isPlayerActive = useStore(
    useAudioStore,
    (state: any) => state.isActivePlayer,
    //@ts-ignore
    shallow
  );

  //Get volume value
  const savedVolume = useStore(
    useAudioStore,
    (state: any) => state.volume,
    //@ts-ignore
    shallow
  );

  //Is audio store hydrated
  const hasAudioHydrated = useStore(
    useAudioStore,
    (state: any) => state._hasAudioStoreHydrated,
    //@ts-ignore
    shallow
  );

  //Check is radio played or not
  const isRadioPlayed = useStore(
    useAudioStore,
    (state: any) => state.isRadioPlayed,
    //@ts-ignore
    shallow
  );

  //What Radio Station is currently played
  const radioStationSelected = useStore(
      useAudioStore,
      (state: any) => state.currentRadioStationPlayed,
      //@ts-ignore
      shallow
  );

  //Hide or show player
  const changePlayerVisibility = async (activeState) => {
    useAudioStore.setState?.({
      isActivePlayer: activeState,
    });
  };

  //Save volume value to store
  const setVolumeValue = async (volumeValue) => {
    useAudioStore.setState?.({
      volume: volumeValue,
    });
  };

  //Set radio is played or not
  const setRadioIsPlayed = async (value: boolean) => {
    useAudioStore.setState?.({
      isRadioPlayed: value,
    });
  };


  //Change Radio Station type is currently played or selected
  const setRadioStationSelected = async (value: string) => {
    useAudioStore.setState?.({
      currentRadioStationPlayed: value,
    });
  };


  //Load Radiohit Radio Station data
  const playRadioRadiohit = async () => {
    if (!isRadioPlayed) await setRadioIsPlayed(true);
    if (singleTrackData) setSingleTrackData(null);
    await setRadioStationSelected('radiohit');
    await changePlayerVisibility(true);
    if (isRadioPlayed && playing && radioStationSelected === "radiohit") return pause();
    if (isRadioPlayed && paused && radioStationSelected === "radiohit") return play();
    stop();
    load("https://stream.radiohit.by/stream", {
      autoplay: true,
      html5: true,
      format: "mp3",
      initialVolume: savedVolume ?? 1.0,
    });
  };

  //Load SuperFM Radio Station data
  const playRadioSuperFM = async () => {
    if (!isRadioPlayed) await setRadioIsPlayed(true);
    if (singleTrackData) setSingleTrackData(null);
    await setRadioStationSelected('superfm');
    await changePlayerVisibility(true);
    if (isRadioPlayed && playing && radioStationSelected === "superfm") return pause();
    if (isRadioPlayed && paused && radioStationSelected === "superfm") return play();
    stop();
    load("https://stream2.datacenter.by/sfm", {
      autoplay: true,
      html5: true,
      format: "mp3",
      initialVolume: savedVolume ?? 1.0,
    });
  };

  //Load Dushevnoe Radio Station data
  const playRadioDushevnoe = async () => {
    if (!isRadioPlayed) await setRadioIsPlayed(true);
    if (singleTrackData) setSingleTrackData(null);
    await setRadioStationSelected('dushevnoe');
    await changePlayerVisibility(true);
    if (isRadioPlayed && playing && radioStationSelected === "dushevnoe") return pause();
    if (isRadioPlayed && paused && radioStationSelected === "dushevnoe") return play();
    stop();
    load("https://stream2.datacenter.by/dushevnoe", {
      autoplay: true,
      html5: true,
      format: "mp3",
      initialVolume: savedVolume ?? 1.0,
    });
  };


  //Save Full Track Data object to store
  const setSingleTrackData = (newTrackData) => {
    if (isRadioPlayed) setRadioIsPlayed(false);
    const isDataExists = !!(singleTrackData && newTrackData);
    changePlayerVisibility(true);

    //If is same track and paused
    if (
      isDataExists &&
      paused &&
      newTrackData.trackURL == singleTrackData.trackURL
    )
      return play();
    //If is same track and played
    if (
      isDataExists &&
      playing &&
      newTrackData.trackURL == singleTrackData.trackURL
    )
      return pause();

    //If is new track
    stop();
    useAudioStore.setState?.({
      trackAudioData: newTrackData,
    });
  };

  //Get next track
  const getNextTrack = async (songID) => {
    const nextTrackData = await getNextTrackByCursor(songID);
    if (nextTrackData != undefined) {
      useAudioStore.setState?.({
        trackAudioData: nextTrackData,
      });
      return "hasNextTrack";
    } else {
      return "noTrack";
    }
  };

  //Get Previous Track
  const getPrevTrack = async (songID) => {
    const prevTrackData = await getPreviousTrackByCursor(songID);
    if (prevTrackData != undefined) {
      useAudioStore.setState?.({
        trackAudioData: prevTrackData,
      });
      return "hasPrevTrack";
    } else {
      return "noTrack";
    }
  };

  //Stop and clear data
  const stopAndDeleteTrackData = async () => {
    stop();
    useAudioStore.setState?.({
      isActivePlayer: false,
      trackAudioData: null,
    });
  };

  const isAudioLoading = isLoading;

  return {
    playing,
    stopped,
    isReady,
    hasAudioHydrated,
    paused,
    isAudioLoading,
    isPlayerActive,
    singleTrackData,
    savedVolume,
    isRadioPlayed,
    radioStationSelected,
    playRadioRadiohit,
    playRadioSuperFM,
    playRadioDushevnoe,
    stopAndDeleteTrackData,
    setRadioIsPlayed,
    getNextTrack,
    getPrevTrack,
    setSingleTrackData,
    changePlayerVisibility,
    setVolumeValue,
  };
}
