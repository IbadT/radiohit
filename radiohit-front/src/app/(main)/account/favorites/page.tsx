import { Metadata } from "next";
import AccountFavouriteTracksPageInner from "@/components/Pages/AccountFavouriteTracks/AccountFavouriteTracksPageInner";

export const metadata: Metadata = {
    title: "Избранные треки",
};

const FavoriteTracksPage = () => {
    return <AccountFavouriteTracksPageInner/>
};

export default FavoriteTracksPage;
