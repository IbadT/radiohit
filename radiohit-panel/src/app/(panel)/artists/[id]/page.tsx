import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { getSingleArtistByID } from '@/lib/appwrite/db_services/artists.db.service';
import EditArtistPageContent from '@/components/Pages/Artists/EditArtist/EditArtistPageContent';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Редактировать Исполнителя',
};

const EditArtistPage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  const singlePost = await getSingleArtistByID(id);

  //Check if data exists
  if (!singlePost) return notFound();

  return (
    <>
      <ScrollToTop />
      <EditArtistPageContent artist={singlePost} />
    </>
  );
};
export default EditArtistPage;
