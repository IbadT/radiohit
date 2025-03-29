import { Metadata } from "next";
import { getSingleNewsByID } from "@/lib/appwrite/db_services/news.db.service";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EditNewsPostContent from "@/components/Pages/News/EditNews/EditNewsPostContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Редактировать Новость",
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
      <EditNewsPostContent post={singlePost} />
    </>
  );
};
export default EditNewsPost;
