import {Metadata} from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ClipsPageContent from "@/components/Pages/Clips/AllClips/ClipsPageContent";

export const metadata: Metadata = {
    title: "Клипы",
};

export const revalidate = 60;


const ClipsPage = () => {
    return(
        <>
            <ScrollToTop/>
            <ClipsPageContent/>
        </>
    )
}
export default ClipsPage
