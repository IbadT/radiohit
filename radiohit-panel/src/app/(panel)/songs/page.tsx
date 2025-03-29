import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import SongsPageContent from "@/components/Pages/Songs/AllSongs/SongsPageContent";

export const metadata: Metadata = {
  title: "Каталог треков",
};

export const revalidate = 60;

const SongsPage = () => {
    return (
      <>
        <ScrollToTop />
        <SongsPageContent />
      </>
    );
};
export default SongsPage;
