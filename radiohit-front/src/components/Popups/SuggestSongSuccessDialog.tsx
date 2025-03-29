import {Dialog, DialogContent} from "@/components/ui/Dialog/dialog";
import * as React from "react";
import {BadgeCheck} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils/utils";
import {buttonVariants} from "@/components/Buttons/Button";


const SuggestSongSuccessDialog = ({dialogOpen, setDialogOpen}) => {
    return(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className='!rounded-3xl overflow-hidden max-w-md'>
                <div className='w-full flex flex-col justify-center items-center overflow-hidden rounded-2xl pt-[1rem]'>
                    <BadgeCheck strokeWidth={1.2} size={70} className='text-slate-500'/>
                    <p className='font-[500] text-slate-600 text-[1.4rem] mt-[1rem]'>Благодарим за отправку песни!</p>
                    <p className='text-slate-500 text-center mt-[0.5rem] text-[0.9rem]'>Наши редакторы проверят загруженный вами трек и вскоре добавят его в ротацию</p>
                    <div className='w-full mt-[1.5rem]'>
                        <Link href='/' className={cn(buttonVariants({variant: 'mainAccentButton'}),'w-full mb-[1rem]')} scroll={false} onClick={()=>{
                            setDialogOpen(false);
                        }}>Отлично!</Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SuggestSongSuccessDialog