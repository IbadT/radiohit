import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAudioStore = create(
    persist(
        (set, get) => ({
            isActivePlayer: false,
            isRadioPlayed: false,
            isFirstAudioPlay: true,
            trackAudioData: null,
            volume: 1.0,
            _hasAudioStoreHydrated: false,
            setHasAudioStoreHydrated: (state) => {
                set({
                    _hasAudioStoreHydrated: state,
                });
            },
        }),
        {
            name: "audio-storage",
            version: 6,
            onRehydrateStorage: () => async (state) => {
              state?.setHasAudioStoreHydrated(true);
            },
        }
    )
);

export { useAudioStore };
