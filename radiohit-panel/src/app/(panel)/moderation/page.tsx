import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ModerationPageContent from "@/components/Pages/Moderation/ModerationPageContent";

export const metadata: Metadata = {
  title: "Ожидают модерации",
};

export const revalidate = 60;

const ModerationPage = () => {
    return (
      <>
        <ScrollToTop />
        <ModerationPageContent />
      </>
    );
};
export default ModerationPage;
