import { Metadata } from "next";
import DashboardPageContent from "@/components/Pages/Dashboard/DashboardPageContent";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Обзор",
};

export const revalidate = 60;

const DashboardPage = () => {
  return (
      <>
        <ScrollToTop/>
        <DashboardPageContent />
      </>
  );
};
export default DashboardPage;
