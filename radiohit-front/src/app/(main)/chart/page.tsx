import ChartInnerPage from "@/components/Pages/ChartPage/ChartInnerPage";
import {Metadata} from "next";

export const revalidate = 200;

export const metadata: Metadata = {
    title: "Популярные треки"
};

const ChartPage = () => {
    return <ChartInnerPage/>;
};

export default ChartPage;
