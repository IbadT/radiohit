import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AddNewArtistPageContent from "@/components/Pages/Artists/AddNewArtist/AddNewArtistPageContent";

export const metadata: Metadata = {
    title: "Добавить исполнителя",
};

export const revalidate = 60;

const AddNewArtistPage = () => {
    return (
        <>
            <ScrollToTop />
            <AddNewArtistPageContent />
        </>
    );
};
export default AddNewArtistPage;
