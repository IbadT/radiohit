import { Metadata } from "next";
import { getSingleNewsByID } from "@/lib/appwrite/db_services/news.db.service";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EditClipPostContent from "@/components/Pages/Clips/EditClip/EditClipPostContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Редактировать Клип",
};

const EditNewsPost = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const singlePost = await getSingleNewsByID(id);

  //Check if data exists
  if (!singlePost) return notFound();

  return (
    <>
      <ScrollToTop />
      <EditClipPostContent post={singlePost} />
    </>
  );
};
export default EditNewsPost;
