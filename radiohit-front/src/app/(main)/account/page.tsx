import { Metadata } from "next";
import AccountPageInner from "@/components/Pages/AccountPage/AccountPageInner";

export const metadata: Metadata = {
  title: "Аккаунт",
};

const AccountPage = async () => {
  return <AccountPageInner />;
};
export default AccountPage;
