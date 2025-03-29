import {Dialog, DialogContent} from "@/components/ui/Dialog/dialog";
import * as React from "react";
import {ScanFace} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils/utils";
import {buttonVariants} from "@/components/Buttons/Button";


const NeedAuthDialog = ({dialogOpen, setDialogOpen}) => {
    return(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className='!rounded-3xl overflow-hidden max-w-sm'>
                <div className='w-full flex flex-col justify-center items-center overflow-hidden rounded-2xl pt-[1rem]'>
                    <ScanFace strokeWidth={1.2} size={70} className='text-slate-500'/>
                    <p className='font-[500] text-slate-600 text-[1.4rem] mt-[1rem]'>Необходима авторизация</p>
                    <p className='text-slate-500 text-center mt-[0.5rem] text-[0.9rem]'>Войдите в свой аккаунт чтобы голосовать, загружать и добавлять треки в избранное</p>
                    <div className='w-full mt-[1.5rem]'>
                        <Link href='/login' className={cn(buttonVariants({variant: 'mainAccentButton'}),'w-full mb-[1rem]')} scroll={false}>Войти в аккаунт</Link>
                        <Link href='/register' className={cn(buttonVariants({variant: 'mainAccentOutlineButton'}),'w-full')} scroll={false}>Регистрация</Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NeedAuthDialog
