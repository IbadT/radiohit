import {Metadata} from "next";
import AccountArtistCreatePageInner from "@/components/Pages/AccountArtistCreatePage/AccountArtistCreatePageInner";

export const metadata: Metadata = {
    title: "Заполнить информацию",
};

const ArtistCreatePage = () => {
    return <AccountArtistCreatePageInner/>
}

export default ArtistCreatePage
