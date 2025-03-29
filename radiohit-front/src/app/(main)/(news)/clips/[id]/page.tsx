import {
  getAllClips,
  getNextClipByCursor,
  getPreviousClipByCursor,
  getSingleClipByID,
} from "@/lib/appwrite/db_services/news.db.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ClipsDetailsPage from "@/components/Pages/ClipsDetailsPage/ClipsDetailsPage";

export const revalidate = 200;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

//Generate static pages
export async function generateStaticParams() {
  const allClips = await getAllClips();
  return allClips.documents.map((post) => ({
    id: post.$id,
  }));
}

//Generate Metadata
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const singleClip = await getSingleClipByID(params.id);

  //Check if data exists
  if (!singleClip) return notFound();

  const newsMeta = `${singleClip.title}`;

  return {
    title: newsMeta,
  };
};

const SingleClipPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const singleClip = await getSingleClipByID(id);

  let nextPost = await getNextClipByCursor(id);
  let prevPost = await getPreviousClipByCursor(id);

  //Check if next post is exist
  if (!nextPost) {
    nextPost = null;
  }
  //Check if previous post is exist
  if (!prevPost) {
    prevPost = null;
  }

  //Check if data exists
  if (!singleClip) return notFound();

  return (
    <ClipsDetailsPage
      singleClip={singleClip}
      nextPost={nextPost}
      prevPost={prevPost}
    />
  );
};
export default SingleClipPage;
