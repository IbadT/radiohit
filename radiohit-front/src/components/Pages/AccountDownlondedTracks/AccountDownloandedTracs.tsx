"use client";
import { useUser } from "@/lib/hooks/useUser";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import * as React from "react";
import ReactQueryWrapper from "@/components/wrappers/ReactQueryWrapper";
import { useRouter } from "next/navigation";
import NoDownloadedTracks from "@/components/Pages/AccountDownlondedTracks/NoDownloadedTracks";
import AccountDownloadedTracksInner from "@/components/Pages/AccountDownlondedTracks/AccountDownloadedTracksInner";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const AccountDownloadedTraks = () => {
  const router = useRouter();
  const { isAuthenticated, hasHydrated, userDocument, userAccount } = useUser();

  //If user account != Radio
  React.useEffect(() => {
    if (!hasHydrated) return;
    if (hasHydrated && isAuthenticated && userDocument.role != "radio") {
      router.replace("/");
    }
    return;
  }, [hasHydrated, userDocument]);

  return (
    <>
      <ScrollToTop />
      <>
        {!hasHydrated && <AccountDefaultSkeleton className={undefined} />}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.downloadTracksID.length == 0 && <NoDownloadedTracks />}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.downloadTracksID.length > 0 && (
            <AccountDownloadedTracksInner userDocument={userDocument} />
          )}
      </>
    </>
  );
};

export default AccountDownloadedTraks;
