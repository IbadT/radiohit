import {create} from "zustand";
import {persist} from "zustand/middleware";

const useAccountStore = create(
    persist(
        (set, get) => ({
            account: null,
            dbAccount: null,
            _hasAccountStoreHydrated: false,
            setHasAccountStoreHydrated: (state) => {
                set({
                    _hasAccountStoreHydrated: state,
                });
            },
        }),
        {
            name: "account-storage",
            version: 1,
            onRehydrateStorage: () => (state) => {
                state?.setHasAccountStoreHydrated(true);
            },
        }
    )
);
export {useAccountStore};
