"use client";
import ReactQueryWrapper from "@/components/wrappers/ReactQueryWrapper";
import AlreadyUploadedTracks from "@/components/Pages/AccountUploadedTracks/AlreadyUploadedTracks";
import { useUser } from "@/lib/hooks/useUser";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import { useEffect } from "react";
import NoUploadedTracks from "@/components/Pages/AccountUploadedTracks/NoUploadedTracks";
import * as React from "react";
import { useRouter } from "next/navigation";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const AccountUploadedTracksInner = () => {
  const router = useRouter();
  const { isAuthenticated, hasHydrated, userDocument, userAccount } = useUser();

  React.useEffect(() => {
    if (!hasHydrated) return;
    if (hasHydrated && isAuthenticated && userDocument.role != "artist") {
      router.replace("/account");
    }
  }, [hasHydrated]);

  return (
    <>
      <ScrollToTop />
      <>
        {!hasHydrated && <AccountDefaultSkeleton className={undefined} />}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.artistUploadedTracksID.length == 0 && (
            <NoUploadedTracks  />
          )}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.artistUploadedTracksID.length != 0 && (
            <AlreadyUploadedTracks
              userAccount={userAccount}
            />
          )}
      </>
    </>
  );
};

export default AccountUploadedTracksInner;
