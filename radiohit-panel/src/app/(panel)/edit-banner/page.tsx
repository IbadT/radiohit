import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EditBannerPageContent from "@/components/Pages/EditBanner/EditBannerPageContent";

export const metadata: Metadata = {
  title: "Изменить Баннер",
};

export const revalidate = 60;

const EditBannerPage = () => {
  return (
    <>
      <ScrollToTop />
      <EditBannerPageContent />
    </>
  );
};
export default EditBannerPage;
