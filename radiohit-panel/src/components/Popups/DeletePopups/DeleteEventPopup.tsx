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
import { useRouter } from "next/navigation";

const DeleteEventPopup = ({ docID, imageFileID, refetch, type = "icon" }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { deleteNewsPost } = useAdminActions();

  const handleDeletePost = async () => {
    if (type == "icon") {
      await deleteNewsPost(docID, imageFileID).then(async () => {
        refetch();
      });
    } else {
      await deleteNewsPost(docID, imageFileID);
      router.push("/events");
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
                  size={24}
                  className="cursor-pointer transition-colors duration-300 hover:text-red-500 flex"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[0.8rem] text-red-500">Удалить</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/*Type BUTTON*/}
        {type == "button" && (
          <div
            className={cn(
              buttonVariants({ variant: "deleteOutline" }),
              "flex flex-row items-center gap-[0.5rem]"
            )}
          >
            Удалить <Trash2 strokeWidth={1.5} size={18} />
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="!text-slate-700">
            Вы уверены что хотите удалить событие?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Данное действие безвозвратно удалит мероприятие из базы данных. Вся
            текущая информация о мероприятии будет потеряна.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={() => handleDeletePost()}
          >
            Удалить мероприятие
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventPopup;
