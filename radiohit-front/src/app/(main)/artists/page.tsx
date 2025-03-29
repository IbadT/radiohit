import {Metadata} from "next";
import ArtistsInnerPage from "@/components/Pages/ArtistsPage/ArtistsInnerPage";

export const revalidate = 200;

export const metadata: Metadata = {
  title: "Исполнители"
};

const ArtistsPage = () => {
  return <ArtistsInnerPage/>
};

export default ArtistsPage;
