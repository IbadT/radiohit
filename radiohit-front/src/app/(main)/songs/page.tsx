import SongsPageInner from "@/components/Pages/SongsPage/SongsPageInner";
import {Metadata} from "next";

export const revalidate = 200;

export const metadata: Metadata = {
  title: "Все треки"
};

const SongsPage = () => {
  return <SongsPageInner/>;
};

export default SongsPage;
