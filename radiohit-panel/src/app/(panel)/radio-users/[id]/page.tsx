import { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { getSingleRadioUserByID } from "@/lib/appwrite/db_services/users.db.service";
import RadioUserInfoPageContent from "@/components/Pages/RadioUsers/RadioUserInfo/RadioUserInfoPageContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Информация о радиостанции",
};

const RadioUserInfoPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const singlePost = await getSingleRadioUserByID(id);

  //Check if data exists
  if (!singlePost) return notFound();

  return (
    <>
      <ScrollToTop />
      <RadioUserInfoPageContent radioDoc={singlePost} />
    </>
  );
};
export default RadioUserInfoPage;
