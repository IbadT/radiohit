import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import RadioPlaylistPageContent from "@/components/Pages/RadioPlaylist/RadioPlaylistPageContent";

export const metadata: Metadata = {
  title: "Плейлист радио",
};

export const revalidate = 60;

const RadioPlaylistPage = () => {
  return (
    <>
      <ScrollToTop />
      <RadioPlaylistPageContent />
    </>
  );
};
export default RadioPlaylistPage;
