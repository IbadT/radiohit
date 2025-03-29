"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/AlertDialog/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import { cn } from "@/lib/utils/utils";
import { buttonVariants } from "@/components/Buttons/Button";
import { useRouter, usePathname } from "next/navigation";
import { usePlayer } from "@/lib/hooks/usePlayer";

const DeleteTrackPopup = ({
  docID,
  imageFileID,
  songFileID,
  artistID,
  refetch,
  type = "icon",
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const pathName = usePathname();

  const { stopAndDeleteTrackData } = usePlayer();

  const { deleteSong, deleteSuggestedSong } = useAdminActions();

  const handleDeleteSong = async () => {
    if (pathName.includes("suggested-songs")) {
      stopAndDeleteTrackData();
      await deleteSuggestedSong(docID, songFileID);
      router.push("/suggested-songs");
      return;
    }
    if (type == "icon") {
      stopAndDeleteTrackData();
      await deleteSong(docID, imageFileID, songFileID, artistID).then(
        async () => {
          refetch();
        }
      );
    } else {
      stopAndDeleteTrackData();
      await deleteSong(docID, imageFileID, songFileID, artistID);
      router.push("/songs");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        {/*Type ICON*/}
        {type == "icon" && (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger className="flex items-center">
                <Trash2
                  strokeWidth={1.5}
                  size={20}
                  className="cursor-pointer transition-colors duration-300 hover:text-red-500 flex"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[0.8rem] text-red-500">Удалить трек</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/*Type BUTTON*/}
        {type == "button" && (
          <div
            className={cn(
              buttonVariants({ variant: "deleteOutline" }),
              "flex flex-row items-center gap-[0.5rem]",
              pathName.includes("suggested-songs") &&
                "text-red-500 border-red-500 transition-opacity duration-300 hover:opacity-70"
            )}
          >
            Удалить трек <Trash2 strokeWidth={1.5} size={18} />
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="!text-slate-700">
            Вы уверены что хотите удалить трек?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Данное действие безвозвратно удалит трек из базы данных. Вся текущая
            информация о треке будет потеряна.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={() => handleDeleteSong()}
          >
            Удалить трек
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTrackPopup;
