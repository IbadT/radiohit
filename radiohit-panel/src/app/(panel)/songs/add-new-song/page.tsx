import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AddNewSongPageContent from "@/components/Pages/Songs/AddNewSong/AddNewSongPageContent";

export const metadata: Metadata = {
    title: "Добавить трек",
};

export const revalidate = 60;

const AddNewSongPage = () => {
    return (
        <>
            <ScrollToTop />
            <AddNewSongPageContent />
        </>
    );
};
export default AddNewSongPage;
