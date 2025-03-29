import { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EditSongPageContent from "@/components/Pages/Songs/EdistSong/EditSongPageContent";
import {getSingleSongByID} from "@/lib/appwrite/db_services/songs.db.service";
import {getSingleArtistByID} from "@/lib/appwrite/db_services/artists.db.service";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const metadata: Metadata = {
    title: "Редактировать Трек",
};

const EditSongPage = async (props: Props) => {
    const params = await props.params;

    const {
        id
    } = params;

    const singlePost = await getSingleSongByID(id);


    //Check if data exists
    if (!singlePost) return notFound();

    const singleArtist = await getSingleArtistByID(singlePost.trackArtistID);

    //Check if artist data exists
    if (!singleArtist) return notFound();

    return (
        <>
            <ScrollToTop />
            <EditSongPageContent song={singlePost} singleArtist={singleArtist}/>
        </>
    );
};
export default EditSongPage;
