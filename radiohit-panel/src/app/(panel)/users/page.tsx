import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AllUsersPageContent from "@/components/Pages/Users/AllUsers/AllUsersPageContent";

export const metadata: Metadata = {
  title: "Пользователи",
};

export const revalidate = 60;

const AllUsersPage = () => {
  return (
    <>
      <ScrollToTop />
      <AllUsersPageContent />
    </>
  );
};
export default AllUsersPage;
