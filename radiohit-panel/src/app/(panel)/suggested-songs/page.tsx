import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import SuggestedSongsPageContent from "@/components/Pages/SuggestedSongs/AllSuggestedSongs/SuggestedSongsPageContent";

export const metadata: Metadata = {
    title: "Предложенные пользователями треки",
};

export const revalidate = 60;

const SuggestedSongsPage = () => {
    return (
        <>
            <ScrollToTop />
            <SuggestedSongsPageContent/>
        </>
    )
}
export default SuggestedSongsPage