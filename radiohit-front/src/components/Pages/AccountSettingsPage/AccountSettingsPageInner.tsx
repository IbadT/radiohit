"use client";

import { useUser } from "@/lib/hooks/useUser";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import * as React from "react";
import ChangeUserImage from "@/components/Pages/AccountSettingsPage/AccountSettingsChangeUserImage";
import ChangeUserName from "@/components/Pages/AccountSettingsPage/AccountSettingsChangeUserName";
import ChangeUserPassword from "@/components/Pages/AccountSettingsPage/AccountSettingsChangeUserPassword";
import ChangeUserDescription from "@/components/Pages/AccountSettingsPage/AccountSettingsChangeUserDescription";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const AccountSettingsPageInner = () => {
  const {
    isAuthenticated,
    hasHydrated,
    userDocument,
    loading,
    changeUserImage,
  } = useUser();

  return (
    <>
      <ScrollToTop />
      {!hasHydrated && <AccountDefaultSkeleton />}
      {hasHydrated && isAuthenticated && (
        <>
          <ChangeUserImage
            loading={loading}
            userDocument={userDocument}
            changeUserImage={changeUserImage}
          />
          <ChangeUserName />
          {userDocument.role != "user" && <ChangeUserDescription />}
          <ChangeUserPassword />
        </>
      )}
    </>
  );
};
export default AccountSettingsPageInner;





