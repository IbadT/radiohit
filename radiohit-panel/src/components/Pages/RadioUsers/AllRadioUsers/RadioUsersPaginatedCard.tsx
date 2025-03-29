import Image from "next/image";
import {Download, MoveRight} from "lucide-react";
import Link from "next/link";

const RadioUsersPaginatedCard = ({ radio, refetch }) => {
    const createdDate = new Date(radio.$createdAt).toLocaleDateString("ru-RU");
    const updatedDate = new Date(radio.$updatedAt).toLocaleDateString("ru-RU");
    const updatedTime = new Date(radio.$updatedAt).toLocaleTimeString("ru-RU", { timeStyle: "short" });

    return (
        <div className="w-full bg-white rounded-xl border-[1px] border-mainBorderColor p-[1.1rem] mb-[1rem] flex flex-row group hover:border-fuchsia-300 transition-all duration-300">
            {/*User Image*/}
            <Link href={`/radio-users/${radio.$id}`} className="relative h-[8rem] w-[8rem] min-w-[8rem] rounded-xl overflow-hidden bg-gray-300 mr-[1.5rem]">
                <Image
                    src={radio.userImageURL}
                    alt="artist_avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
            </Link>
            <Link href={`/radio-users/${radio.$id}`} className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col min-h-full items-start justify-between py-[0.5rem]">
                    <div>
                        <h3 className="text-[1.4rem] font-[500] text-slate-700 group-hover:text-mainAccent transition-colors duration-300">
                            {radio.name}
                        </h3>
                        <p className="text-slate-400 font-[300] text-[0.9rem]">
                            {radio.email}
                        </p>
                    </div>
                    <div className="flex flex-row items-center text-slate-500">
                        <p className="mr-[0.5rem] whitespace-nowrap text-[0.9rem]">Дата регистрации: {createdDate}</p>
                    </div>
                </div>

                <div className="flex flex-row items-end gap-[1rem] justify-end pr-[3rem] min-[100px]:max-[1320px]:pr-[0] max-md:hidden">
                    <div className="flex flex-row items-center text-slate-500 gap-[0.5rem]">
                        <Download strokeWidth={2} size={16} className="relative top-[0]" />
                        <p className="font-[400] whitespace-nowrap">
                            Скачано треков: {radio.downloadTracksID.length}
                        </p>
                    </div>
                    {/*<div className="h-[1.3rem] w-[2px] bg-slate-200" />*/}
                    {/*<div className="flex flex-row items-center text-slate-500 gap-[0.5rem]">*/}
                    {/*    <Star strokeWidth={2} size={16} className="relative top-[0]" />*/}
                    {/*    <p className="font-[400] whitespace-nowrap">*/}
                    {/*        Рейтинг {radio.artistRating}*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </Link>

            {/* Card Actions*/}
            <Link href={`/radio-users/${radio.$id}`} scroll={false} className='flex flex-row items-center gap-[1rem] ml-[10rem] text-gray-500 transition-colors duration-300 hover:text-mainAccent pr-[2rem]'>
                <p className='text-[1rem]'>Подробнее</p>
                <MoveRight strokeWidth={1.2} size={20}/>
            </Link>
        </div>
    );
};
export default RadioUsersPaginatedCard;
