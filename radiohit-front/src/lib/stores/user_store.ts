import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user })
        }),
        {
            name: "user-storage",
            version: 1
        }
    )
);
export { useUserStore };
