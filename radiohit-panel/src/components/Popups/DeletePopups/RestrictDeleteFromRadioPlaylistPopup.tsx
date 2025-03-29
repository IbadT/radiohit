"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/AlertDialog/alert-dialog";

const RestrictDeleteFromRadioPlaylistPopup = ({ open, setOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="!text-slate-700">
            Невозможно удалить трек
          </AlertDialogTitle>
          <AlertDialogDescription>
            Плейлист должен содержать{" "}
            <span className="font-bold">минимум 2 трека</span>.<br />{" "}
            Пожалуйста, добавьте в плейлист новые треки перед удалением старых.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full border-[1px]">Закрыть</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestrictDeleteFromRadioPlaylistPopup;
