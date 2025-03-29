import { Metadata } from "next";
import SuggestSongPageInner from "@/components/Pages/SuggestSongPage/SuggestSongPageInner";

export const metadata: Metadata = {
  title: "Отправить песню на радио",
};

const SuggestSongPage = () => {
  return <SuggestSongPageInner />;
};
export default SuggestSongPage;
