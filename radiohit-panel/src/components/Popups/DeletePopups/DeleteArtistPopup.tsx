import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAdminActions} from "@/lib/hooks/useAdminActions";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/AlertDialog/alert-dialog";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/tooltip";
import {Trash2} from "lucide-react";
import {cn} from "@/lib/utils/utils";
import {buttonVariants} from "@/components/Buttons/Button";


const DeleteArtistPopup = ({ docID, imageFileID, refetch, type = "icon" }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [disableButton, setDisableButton] = useState(true);

    const { deleteArtist } = useAdminActions();

    const handleDeletePost = async () => {
        if (type == "icon") {
            await deleteArtist(docID, imageFileID).then(async () => {
                refetch();
            });
        } else {
            await deleteArtist(docID, imageFileID);
            router.push("/artists");
        }
    };

    useEffect(()=>{
        if(open) {
            const timer = setTimeout(() => {
                setDisableButton(false);
                return () => clearTimeout(timer);
            }, 4000);
        } else {
            setDisableButton(true)
        }
    },[open])

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
                                <p className="text-[0.8rem] text-red-500">Удалить исполнителя</p>
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
                        Удалить исполнителя <Trash2 strokeWidth={1.5} size={18} />
                    </div>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="!text-slate-700">
                        <span className='text-red-500'>Внимание!</span> Вы собираетесь удалить исполнителя
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Данное действие <b>безвозвратно удалит артиста и все его треки</b> из базы данных. Вся текущая
                        информация об артисте будет потеряна.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        className={cn("bg-red-500 hover:bg-red-700 transition-opacity duration-300", disableButton && 'pointer-events-none opacity-50')}
                        onClick={() => handleDeletePost()}
                    >
                        Удалить артиста
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default DeleteArtistPopup
