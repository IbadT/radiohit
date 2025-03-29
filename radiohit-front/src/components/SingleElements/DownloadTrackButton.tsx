"use client";
import { useUser } from "@/lib/hooks/useUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { ArrowDownToLine, FileSearch } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils/utils";

const DownloadTrackButton = ({
  className,
  songFileID,
  artistID,
  buttonType,
  songDocID,
    song
}) => {
  const {
    hasHydrated,
    isAuthenticated,
    userDocument,
    radioDownloadTrack,
    getArtistAndSongInfoForRadio,
  } = useUser();

  const handleDownloadTrack = async () => {
    return await radioDownloadTrack(songFileID, songDocID);
  };

  const handleGetArtistInfo = async () => {
    return await getArtistAndSongInfoForRadio(artistID, song);
  };

  return (
    <>
      {hasHydrated && isAuthenticated && userDocument.role == "radio" && (
        <div
          className={cn(
            "flex flex-row justify-center text-slate-500",
            buttonType == "account" && "gap-[1rem]"
          )}
        >
          {buttonType == "account" && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="items-center flex">
                  <FileSearch
                    strokeWidth={1.5}
                    size={20}
                    className={cn(
                      "cursor-pointer transition-colors duration-300 hover:text-mainAccent max-lg:hidden",
                      className
                    )}
                    onClick={() => {
                      if (hasHydrated && isAuthenticated) {
                        handleGetArtistInfo();
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Информация о треке</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger className="items-center flex">
                <ArrowDownToLine
                  strokeWidth={1.5}
                  size={20}
                  className={cn(
                    "cursor-pointer transition-colors duration-300 hover:text-mainAccent max-lg:hidden",
                    className
                  )}
                  onClick={() => {
                    if (hasHydrated && isAuthenticated) {
                      if (buttonType == "account") {
                        handleDownloadTrack();
                      } else {
                        handleDownloadTrack().then(async ()=>{
                          await handleGetArtistInfo();
                        });
                      }
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Скачать трек</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
};
export default DownloadTrackButton;
