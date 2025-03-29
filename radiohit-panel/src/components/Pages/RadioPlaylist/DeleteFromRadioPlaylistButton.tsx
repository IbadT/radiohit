"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/Tooltip/tooltip";
import { XCircle } from "lucide-react";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import RestrictDeleteFromRadioPlaylistPopup from "@/components/Popups/DeletePopups/RestrictDeleteFromRadioPlaylistPopup";
import { useState } from "react";
import {cn} from "@/lib/utils/utils";

const DeleteFromRadioPlaylistButton = ({ songID, refetch, allowDelete }) => {
  const [openRestrictPopup, setOpenRestrictPopup] = useState(false);
  const { deleteTrackFromRadioPlaylist } = useAdminActions();

  const handleDeleteFromRadioPlaylist = async () => {
    await deleteTrackFromRadioPlaylist(songID).then(() => {
      refetch();
    });
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="z-[1] items-center flex">
            <XCircle
              className={cn("cursor-pointer hover:text-red-500 transition-colors duration-300 text-slate-500", !allowDelete && "text-gray-200")}
              strokeWidth={1.5}
              onClick={async () => {
                if (allowDelete) {
                  await handleDeleteFromRadioPlaylist();
                } else {
                  setOpenRestrictPopup(true);
                }
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Удалить из плейлиста</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <RestrictDeleteFromRadioPlaylistPopup
        open={openRestrictPopup}
        setOpen={setOpenRestrictPopup}
      />
    </>
  );
};
export default DeleteFromRadioPlaylistButton;
