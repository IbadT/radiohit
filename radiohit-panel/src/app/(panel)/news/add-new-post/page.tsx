import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AddNewsPostContent from "@/components/Pages/News/AddNewsPost/AddNewsPostContent";

export const metadata: Metadata = {
  title: "Добавить новость",
};

export const revalidate = 60;

const AddNewsPost = () => {
  return (
    <>
      <ScrollToTop />
      <AddNewsPostContent />
    </>
  );
};
export default AddNewsPost;
