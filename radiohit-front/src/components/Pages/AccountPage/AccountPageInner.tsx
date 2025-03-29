"use client";

import * as React from "react";
import AccountUserCardSkeleton from "@/components/LoadingSkeletons/Account/AcoountUserCardSkeleton";
import { useUser } from "@/lib/hooks/useUser";
import AccountDefaultSkeleton from "@/components/LoadingSkeletons/Account/AccountDefaultSkeleton";
import UserCard from "@/components/Pages/AccountPage/AccountUserCard";
import UserSessions from "@/components/Pages/AccountPage/AccountUserSessionsList";
import ArtistPromo from "@/components/Pages/AccountPage/AcoountArtistPromo";
import AccountFavouriteTacksShortCard from "@/components/Pages/AccountPage/AccountFavouriteTacksShortCard";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import {useAuth} from "@/lib/hooks/useAuth";

const AccountPageInner = () => {
  const {
    userDocument,
    hasHydrated,
    isAuthenticated,
    userAccount,
    loading,
    showArtistPromo,
    changeUserImage,
    getUserSessionsList,
    hideArtistPromoBanner,
  } = useUser();

  const {getUserAccountInfo} = useAuth();

  React.useEffect(()=>{
    //Check if account exists
    if(!hasHydrated) return;
    getUserAccountInfo();
  },[hasHydrated]);

  return (
    <>
      <ScrollToTop />
      {!hasHydrated && <AccountUserCardSkeleton />}
      {!hasHydrated && <AccountDefaultSkeleton className={undefined} />}
      {hasHydrated && isAuthenticated && (
        <>
          <UserCard
            userDocument={userDocument}
            userAccount={userAccount}
            loading={loading}
            changeUserImage={changeUserImage}
          />
          {userDocument.role == "user" && showArtistPromo && (
            <ArtistPromo hideArtistPromoBanner={hideArtistPromoBanner} />
          )}
          <AccountFavouriteTacksShortCard />
          <UserSessions
            getUserSessionsList={getUserSessionsList}
            hasHydrated={hasHydrated}
            isAuthenticated={isAuthenticated}
          />
        </>
      )}
    </>
  );
};

export default AccountPageInner;


