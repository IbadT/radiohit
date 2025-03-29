import { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import AddEventPostContent from "@/components/Pages/Events/AddEventPost/AddEventPostContent";

export const metadata: Metadata = {
    title: "Добавить мероприятие",
};

export const revalidate = 60;

const AddNewEvent = () => {
    return (
        <>
            <ScrollToTop />
            <AddEventPostContent />
        </>
    );
};
export default AddNewEvent;
