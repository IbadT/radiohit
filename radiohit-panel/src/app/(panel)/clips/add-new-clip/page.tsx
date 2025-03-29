import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AddNewClipPostContent from "@/components/Pages/Clips/AddNewClip/AddNewClipPostContent";

export const metadata: Metadata = {
  title: "Добавить клип",
};

export const revalidate = 60;

const AddNewsPost = () => {
  return (
    <>
      <ScrollToTop />
      <AddNewClipPostContent />
    </>
  );
};
export default AddNewsPost;
