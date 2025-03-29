"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { Trash2 } from "lucide-react";
import * as React from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
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
import {usePlayer} from "@/lib/hooks/usePlayer";
import {useUser} from "@/lib/hooks/useUser";

const DeleteDialog = ({ trackID, songImageID, songFileID, artistID, refetch }) => {
  const [open, setOpen] = React.useState(false);
  const { playing, paused, stop } = useGlobalAudioPlayer();
  const {stopAndDeleteTrackData} = usePlayer();
  const {artistDeleteExistingTrack} = useUser()

  const handleTrackDelete = async (
    songID: string,
    songImageID:string,
    songFileID: string,
    artistID: string
  ) => {
    await stopAndDeleteTrackData().then( async ()=>{
      await artistDeleteExistingTrack(songID,songImageID,songFileID,artistID)
    }).then(()=>{
      refetch();
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="z-[1] items-center flex">
              <Trash2
                className="cursor-pointer hover:text-red-500 transition-colors duration-300 text-slate-500"
                strokeWidth={2}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Удалить трек</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="!text-slate-700">
            Вы уверены что хотите удалить трек?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Данное действие безвозвратно удалит трек из вашего аккаунта. Вся
            текущая информация о треке будет потеряна.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={() =>
              handleTrackDelete(trackID, songImageID, songFileID, artistID)
            }
          >
            Удалить трек
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteDialog;
