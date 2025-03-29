"use client";
import useStore from "@/lib/hooks/useStore";
import { useAudioStore } from "@/lib/stores/audio_store";
import { shallow } from "zustand/shallow";
import { useGlobalAudioPlayer } from "react-use-audio-player";

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
  const singleTrackData = useStore(
    useAudioStore,
    (state: any) => state.trackAudioData,
    shallow
  );

  //Check if play show / hide
  const isPlayerActive = useStore(
    useAudioStore,
    (state: any) => state.isActivePlayer,
    shallow
  );

  //Get volume value
  const savedVolume = useStore(
    useAudioStore,
    (state: any) => state.volume,
      shallow
  );

  //Is audio store hydrated
  const hasAudioHydrated = useStore(
    useAudioStore,
    (state: any) => state._hasAudioStoreHydrated,
    shallow
  );

  //Check is radio played or not
  const isRadioPlayed = useStore(
    useAudioStore,
    (state: any) => state.isRadioPlayed,
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

  //Load radio data
  const playRadio = async () => {
    if (!isRadioPlayed) setRadioIsPlayed(true);
    if (singleTrackData) setSingleTrackData(null);
    changePlayerVisibility(true);
    if (isRadioPlayed && playing) return pause();
    if (isRadioPlayed && paused) return play();
    stop();
    load("https://stream.radiohit.by/stream", {
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
    playRadio,
    stopAndDeleteTrackData,
    setRadioIsPlayed,
    setSingleTrackData,
    changePlayerVisibility,
    setVolumeValue,
  };
}
