import * as React from "react";
import { useUser } from "@/lib/hooks/useUser";
import AccountFavouriteTacksShortCardInner from "@/components/Pages/AccountPage/AccountFavouriteTacksShortCardInner";
import AccountNoFavoriteTracksShortCard from "@/components/Pages/AccountPage/AccountNoFavoriteTracksShortCard";

const AccountFavouriteTacksShortCard = () => {
  const { isAuthenticated, hasHydrated, userDocument, userAccount } = useUser();

  return (
    <>
      {hasHydrated &&
        isAuthenticated &&
        userDocument.favouriteTracksID.length != 0 && (
          <AccountFavouriteTacksShortCardInner
              //@ts-ignore
            hasHydrated={hasHydrated}
            userAccount={userAccount}
            userDocument={userDocument}
          />
        )}
      {hasHydrated && isAuthenticated && userDocument.favouriteTracksID.length == 0 && (
          <AccountNoFavoriteTracksShortCard/>
      )}
    </>
  );
};
export default AccountFavouriteTacksShortCard;
