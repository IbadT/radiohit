import { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { getSingleUserByID} from "@/lib/appwrite/db_services/users.db.service";
import UserInfoPageContent from "@/components/Pages/Users/UserInfo/UserInfoPageContent";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const metadata: Metadata = {
    title: "Информация о пользователе",
};

const UserInfoPage = async (props: Props) => {
    const params = await props.params;

    const {
        id
    } = params;

    const singlePost = await getSingleUserByID(id);

    //Check if data exists
    if (!singlePost) return notFound();

    return (
        <>
            <ScrollToTop />
            <UserInfoPageContent userDoc={singlePost} />
        </>
    );
};
export default UserInfoPage;
