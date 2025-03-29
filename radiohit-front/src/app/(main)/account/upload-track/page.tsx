import { Metadata } from "next";
import AccountUploadTrackInnerPage from "@/components/Pages/AccountUploadTrackPage/AccountUploadTrackInnerPage";

export const metadata: Metadata = {
    title: "Загрузить Трек",
};

const AccountUploadTrackPage = () => {
    return <AccountUploadTrackInnerPage/>
}

export default AccountUploadTrackPage
