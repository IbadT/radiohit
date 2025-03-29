import {
  getAllArtists,
  getSingleArtistInfoByID,
} from "@/lib/appwrite/db_services/artists.db.service";
import { Metadata } from "next";
import ArtistDetailsPage from "@/components/Pages/ArtistDetailsPage/ArtistDetailsPage";
import { notFound } from "next/navigation";

export const revalidate = 200;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

//Generate static pages
export async function generateStaticParams() {
  const artists = await getAllArtists();
  return artists.documents.map((artist) => ({
    id: artist.$id,
  }));
}

//Generate Metadata
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const artist = await getSingleArtistInfoByID(params.id);

  //Check if post exists
  if (!artist) return notFound();

  const trackMeta = `${artist.name}`;

  return {
    title: trackMeta,
  };
};

const SingleArtistPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const artist = await getSingleArtistInfoByID(id);
  if (!artist) return notFound();

  return <ArtistDetailsPage artist={artist} />;
};
export default SingleArtistPage;
