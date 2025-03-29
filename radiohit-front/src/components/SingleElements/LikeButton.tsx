"use client";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import * as React from "react";
import { useUser } from "@/lib/hooks/useUser";
import { usePlayer } from "@/lib/hooks/usePlayer";
import NeedAuthDialog from "@/components/Popups/NeedAuthDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";

const LikeButton = ({ classMame}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const {
    hasHydrated,
    isAuthenticated,
    userDocument,
    userChangeFavourites,
  } = useUser();

  const { singleTrackData } = usePlayer();

  //Add to favourites
  const handleAddToFavourites = async () => {
    await userChangeFavourites(
      true,
      singleTrackData.$id,
      singleTrackData.trackArtistID
    );
  };

  //Delete to favourites
  const handleDeleteToFavourites = async () => {
    await userChangeFavourites(
      false,
      singleTrackData.$id,
      singleTrackData.trackArtistID
    );
  };

  return (
    <>
      {hasHydrated && !isAuthenticated && (
        <Heart
          className={cn(
            "relative top-[-0.3rem] cursor-pointer transition-all duration-300 hover:opacity-70",
            classMame
          )}
          onClick={() => {
            console.log(dialogOpen);
            setDialogOpen(true);
          }}
        />
      )}
      {hasHydrated && isAuthenticated && (
        <>
          {!userDocument.favouriteTracksID.includes(singleTrackData.$id) && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="items-center flex">
                  <Heart
                    className={cn(
                      "relative top-[-0.3rem] cursor-pointer transition-opacity duration-300 hover:opacity-70",
                      classMame
                    )}
                    onClick={() => handleAddToFavourites()}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Добавить в избранное</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {userDocument.favouriteTracksID.includes(singleTrackData.$id) && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="items-center flex">
                  <Heart
                    className={cn(
                      "relative top-[-0.3rem] text-[#c026d3] cursor-pointer transition-opacity duration-300 hover:opacity-70",
                      classMame
                    )}
                    onClick={() => handleDeleteToFavourites()}
                    fill="#c026d3"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Удалить из избранного</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      )}

      {hasHydrated && !isAuthenticated && (
        <NeedAuthDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      )}
    </>
  );
};

export default LikeButton;
