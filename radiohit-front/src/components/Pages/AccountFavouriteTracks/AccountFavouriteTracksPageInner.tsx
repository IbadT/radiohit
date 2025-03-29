"use client";

import { useUser } from "@/lib/hooks/useUser";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import * as React from "react";
import NoFavouriteTracks from "@/components/Pages/AccountFavouriteTracks/NoFavouriteTracks";
import AllFavouriteTracks from "@/components/Pages/AccountFavouriteTracks/AllFavouriteTracks";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const AccountFavouriteTracksPageInner = () => {
  const { isAuthenticated, hasHydrated, userDocument, userAccount } = useUser();
  return (
    <>
      <ScrollToTop />
      <>
        {!hasHydrated && <AccountDefaultSkeleton className={undefined} />}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.favouriteTracksID.length == 0 && <NoFavouriteTracks />}
        {hasHydrated &&
          isAuthenticated &&
          userDocument.favouriteTracksID.length > 0 && (
            <AllFavouriteTracks userDocument={userDocument} />
          )}
      </>
    </>
  );
};

export default AccountFavouriteTracksPageInner;
