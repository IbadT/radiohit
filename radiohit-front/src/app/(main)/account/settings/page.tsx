import { Metadata } from "next";
import AccountSettingsPageInner from "@/components/Pages/AccountSettingsPage/AccountSettingsPageInner";

export const metadata: Metadata = {
  title: "Настройки Аккаунта",
};

const AccountSettingsPage = () => {
  return <AccountSettingsPageInner />;
};

export default AccountSettingsPage;
