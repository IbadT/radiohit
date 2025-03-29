import Link from "next/link";
import {cn} from "@/lib/utils/utils";
import {buttonVariants} from "@/components/Buttons/Button";
import {Music4} from "lucide-react";
import Image from "next/image";
import cover_bg from "../../../../public/assets/images/dev/dev_bg.jpg";
import * as React from "react";


const NotArtist = () => {
    return (
        <div className="w-full bg-white flex flex-col border-[1px] border-mainBorderColor rounded-2xl mt-[1rem] h-[70vh] mb-[1.5rem] overflow-hidden xl:relative ">
            <div className="flex flex-col h-full items-center justify-center align-middle overflow-hidden text-center xl:z-[1]">
                <h2 className="font-[500] text-[2.4rem] text-slate-700 mb-[0.6rem] pl-[0.5rem] max-md:text-[1.3rem]">
                    Являетесь исполнителем?
                </h2>
                <p className="text-slate-500 text-center mb-[1.3rem] max-md:text-[1rem]">
                    Заполните информацию о себе
                    <br /> чтобы загружать треки на платформу Radiohit
                </p>
                <Link
                    scroll={false}
                    href="/account/artist-create"
                    className={cn(
                        buttonVariants({ variant: "mainAccentButton" }),
                        "max-w-[20rem]"
                    )}
                >
                    <Music4 strokeWidth={1.8} size={20} className="mr-[0.5rem]" />
                    Заполнить информацию
                </Link>
            </div>
            <Image
                src={cover_bg}
                alt="bg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover h-full w-full max-xl:hidden"
            />
        </div>
    );
};

export default NotArtist
