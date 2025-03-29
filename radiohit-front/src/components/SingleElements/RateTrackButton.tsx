import { useUser } from "@/lib/hooks/useUser";
import * as React from "react";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import NeedAuthDialog from "@/components/Popups/NeedAuthDialog";

const RateTrackButton = ({
  songID,
  className,
  whoRatedIDandDateTime,
  artistID,
  type,
}) => {
  const {
    hasHydrated,
    isAuthenticated,
    userDocument,
    userRateTrack,
    updateUserDataStore,
  } = useUser();

  //Open auth dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);

  //Rate track
  const handleRateTrack = async () => {
    await userRateTrack(true, songID, whoRatedIDandDateTime, artistID).then(
      () => {
        updateUserDataStore();
      }
    );
  };

  //UnRate track
  const handleUnRateTrack = async () => {
    await userRateTrack(false, songID, whoRatedIDandDateTime, artistID).then(
      () => {
        updateUserDataStore();
      }
    );
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="items-center flex">
            <ThumbsUp
              className={cn(
                "relative cursor-pointer transition-opacity duration-300 hover:opacity-70 min-[1200px]:max-[1400px]:w-[16px]",
                className,
                hasHydrated &&
                  isAuthenticated &&
                  userDocument.ratedTracksID.includes(songID)
                  ? "text-[#c026d3]"
                  : "text-gray-500"
              )}
              size={20}
              onClick={() => {
                if (hasHydrated && isAuthenticated) {
                  if (userDocument.ratedTracksID.includes(songID)) {
                    handleUnRateTrack();
                  } else {
                    handleRateTrack();
                  }
                } else {
                  setDialogOpen(true);
                }
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p
              className={cn(
                hasHydrated &&
                  isAuthenticated &&
                  userDocument.ratedTracksID.includes(songID)
                  ? "text-red-500 "
                  : ""
              )}
            >
              {hasHydrated &&
              isAuthenticated &&
              userDocument.ratedTracksID.includes(songID)
                ? "Удалить оценку"
                : "Голосовать за трек"}
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

export default RateTrackButton;
