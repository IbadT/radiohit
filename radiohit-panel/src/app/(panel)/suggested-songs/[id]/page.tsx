import { Metadata } from "next";
import { getSingleSongByID } from "@/lib/appwrite/db_services/songs.db.service";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EditSuggestedSongPageContent from "@/components/Pages/SuggestedSongs/EditSuggestedSong/EditSuggestedSongPageContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Редактировать предложенный трек",
};

const EditSuggestedSongPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const singlePost = await getSingleSongByID(id);
  //Check if data exists
  if (!singlePost) return notFound();

  return (
    <>
      <ScrollToTop />
      <EditSuggestedSongPageContent song={singlePost} />
    </>
  );
};
export default EditSuggestedSongPage;
