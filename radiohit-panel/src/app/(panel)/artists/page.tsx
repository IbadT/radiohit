import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ArtistsPageContent from "@/components/Pages/Artists/AllArtists/ArtistsPageContent";

export const metadata: Metadata = {
  title: "Исполнители",
};

export const revalidate = 60;

const ArtistsPage = () => {
  return (
    <>
      <ScrollToTop />
      <ArtistsPageContent />
    </>
  );
};
export default ArtistsPage;
