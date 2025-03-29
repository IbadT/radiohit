import {create} from "zustand";
import {persist} from "zustand/middleware";

const useAccountStore = create(
    persist(
        (set, get) => ({
            account: null,
            dbAccount: null,
            _hasAccountStoreHydrated: false,
            showArtistPromo: true,
            setHasAccountStoreHydrated: (state) => {
                set({
                    _hasAccountStoreHydrated: state,
                });
            },
        }),
        {
            name: "account-storage",
            version: 3,
            onRehydrateStorage: () => (state) => {
                // @ts-ignore
                state?.setHasAccountStoreHydrated(true);
                // console.log("STORE HAS HYDRATED", state?._hasAccountStoreHydrated);
            },
        }
    )
);
export {useAccountStore};
