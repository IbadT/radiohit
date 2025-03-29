import { Metadata } from "next";
import NewsPageContent from "@/components/Pages/News/AllNews/NewsPageContent";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Новости",
};

export const revalidate = 60;

const NewsPage = () => {
  return (
    <>
      <ScrollToTop />
      <NewsPageContent />
    </>
  );
};
export default NewsPage;
