import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import RadioUsersPageContent from "@/components/Pages/RadioUsers/AllRadioUsers/RadioUsersPageContent";

export const metadata: Metadata = {
  title: "Радиостанции",
};

export const revalidate = 60;

const RadioUsersPage = () => {
  return (
    <>
      <ScrollToTop />
      <RadioUsersPageContent />
    </>
  );
};
export default RadioUsersPage;
