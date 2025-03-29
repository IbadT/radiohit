import { Metadata } from "next";
import AccountUploadedTracksInner from "@/components/Pages/AccountUploadedTracks/AccountUploadedTracksInner";

export const metadata: Metadata = {
  title: "Мои треки",
};

const AccountUploadedTracks = () => {
  return <AccountUploadedTracksInner />;
};

export default AccountUploadedTracks;
