import {Metadata} from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import EventsPageContent from "@/components/Pages/Events/AllEvents/EventsPageContent";

export const metadata: Metadata = {
    title: "Мероприятия",
};

export const revalidate = 60;


const EventsPage = () => {
    return(
        <>
            <ScrollToTop/>
            <EventsPageContent/>
        </>
    )
}
export default EventsPage
