import Image from "next/image";
import Link from "next/link";
import {ClipboardEdit} from "lucide-react";
import {Separator} from "@/components/ui/Separator/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/tooltip";
import DeleteNewsPopup from "@/components/Popups/DeletePopups/DeleteNewsPopup";


const NewsPaginatedCard = ({post, index, refetch}) => {

    const createdDate = new Date(post.$createdAt).toLocaleDateString("ru-RU");
    const updatedDate = new Date(post.$updatedAt).toLocaleDateString("ru-RU");
    const updatedTime = new Date(post.$updatedAt).toLocaleTimeString("ru-RU", { timeStyle: "short" });

    return (
        <div className='w-full bg-white border-mainBorderColor border-[1px] rounded-2xl flex flex-row items-center justify-between mb-[1.2rem] p-[1.2rem] group hover:border-fuchsia-300 transition-colors duration-300'>

            <Link href={`/news/${post.$id}`} scroll={false} className='flex flex-row items-center gap-[1.2rem] w-full'>
                {/*Card Image*/}
                <div className='relative overflow-hidden h-[5rem] w-[7rem] rounded-lg bg-gray-300'>
                    <Image
                        src={post.imageURL}
                        alt="news_image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full bg-cover object-cover z-[0] bg-gray-300 transition-opacity duration-300 group-hover:opacity-70"
                    />
                </div>

                {/*Card Info*/}
                <div className='flex flex-col justify-around h-[5rem]'>
                    <div className='flex flex-row items center'>
                        <p className='text-gray-400 font-[500] text-[0.8rem]'>{createdDate}</p>
                    </div>
                    <h3 className='font-[500] max-w-[40rem] transition-colors duration-300 group-hover:text-mainAccent line-clamp-1 relative top-[-2px]'>{post.title}</h3>
                    <div className='flex flex-row items-center gap-[1rem]'>
                        <p className='text-gray-500 font-[500] text-[0.8rem]'>Последние обновление: {updatedDate} в {updatedTime}</p>
                    </div>
                </div>
            </Link>


            {/* Card Actions*/}
            <div className='flex flex-row items-center gap-[1rem]'>
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                            <Link href={`/news/${post.$id}`} scroll={false}>
                                <ClipboardEdit strokeWidth={1.5} size={24} className='cursor-pointer transition-colors duration-300 hover:text-fuchsia-600'/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className='text-[0.8rem]'>Редактировать</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Separator className='bg-gray-300 h-[1.4rem] w-[1px]' orientation='vertical'/>
                <DeleteNewsPopup docID={post.$id} imageFileID={post.imageID} refetch={refetch}/>
            </div>

        </div>
    )
}

export default NewsPaginatedCard
