"use client";

import { useUser } from "@/lib/hooks/useUser";
import * as React from "react";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import NotArtist from "@/components/Pages/AccountUploadTrackPage/AccountNotArtist";
import ArtistUploadTrack from "@/components/Pages/AccountUploadTrackPage/AccountArtistUploadTrack";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const AccountUploadTrackInnerPage = () => {
  const { isAuthenticated, hasHydrated, userDocument } = useUser();

  return (
    <>
      <ScrollToTop />
      {!hasHydrated && <AccountDefaultSkeleton className={undefined} />}
      {hasHydrated && isAuthenticated && userDocument.role == "artist" && (
        <ArtistUploadTrack />
      )}
      {hasHydrated && isAuthenticated && userDocument.role == "user" && (
        <NotArtist />
      )}
    </>
  );
};
export default AccountUploadTrackInnerPage;
