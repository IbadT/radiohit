import RadioPageInner from "@/components/Pages/RadioPage/RadioPageInner";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Онлайн Радио",
  description: "Онлайн радио от Radiohit",
};

export const revalidate = 200;

const RadioPage = () => {
  return <RadioPageInner/>
};

export default RadioPage;
