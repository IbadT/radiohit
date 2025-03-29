"use client";

import * as React from "react";
import { useUser } from "@/lib/hooks/useUser";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import NeedAuthDialog from "@/components/Popups/NeedAuthDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";

const SingleTrackFavouritesLikeButton = ({
  className,
  songID,
  artistID,
  refetch,
  type,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { hasHydrated, isAuthenticated, userDocument, userChangeFavourites } =
    useUser();

  //Add to favourites
  const handleAddToFavourites = async () => {
    await userChangeFavourites(true, songID, artistID).then(() => {
      if (type == "accountTracks") {
        refetch();
      }
    });
  };

  //Delete to favourites
  const handleDeleteToFavourites = async () => {
    await userChangeFavourites(false, songID, artistID).then(() => {
      if (type == "accountTracks") {
        refetch().then(() => {
          refetch();
        });
      }
    });
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="items-center flex">
            <Heart
              className={cn(
                "relative cursor-pointer transition-opacity duration-300 hover:opacity-70 min-[1200px]:max-[1400px]:w-[16px]",
                className,
                hasHydrated &&
                  isAuthenticated &&
                  userDocument.favouriteTracksID.includes(songID)
                  ? "text-[#c026d3]"
                  : "text-gray-500"
              )}
              size={20}
              onClick={() => {
                if (hasHydrated && isAuthenticated) {
                  if (userDocument.favouriteTracksID.includes(songID)) {
                    handleDeleteToFavourites();
                  } else {
                    handleAddToFavourites();
                  }
                } else {
                  setDialogOpen(true);
                }
              }}
              fill={
                hasHydrated &&
                isAuthenticated &&
                userDocument.favouriteTracksID.includes(songID)
                  ? "#c026d3"
                  : "none"
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p
              className={cn(
                hasHydrated &&
                  isAuthenticated &&
                  userDocument.favouriteTracksID.includes(songID)
                  ? "text-red-500 "
                  : ""
              )}
            >
              {hasHydrated &&
              isAuthenticated &&
              userDocument.favouriteTracksID.includes(songID)
                ? "Удалить"
                : "Лайк"
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {hasHydrated && !isAuthenticated && (
        <NeedAuthDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      )}
    </>
  );
};
export default SingleTrackFavouritesLikeButton;
