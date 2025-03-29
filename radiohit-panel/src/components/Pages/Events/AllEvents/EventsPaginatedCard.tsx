import Image from "next/image";
import Link from "next/link";
import {ClipboardEdit} from "lucide-react";
import {Separator} from "@/components/ui/Separator/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/tooltip";
import DeleteEventPopup from "@/components/Popups/DeletePopups/DeleteEventPopup";


const EventsPaginatedCard = ({post, index, refetch}) => {
    const createdDate = new Date(post.$createdAt).toLocaleDateString("ru-RU");

    return (
        <div className='w-full bg-white border-mainBorderColor border-[1px] rounded-2xl flex flex-row items-center justify-between mb-[1.2rem] p-[1.2rem] group hover:border-fuchsia-300 transition-colors duration-300'>

            <Link href={`/events/${post.$id}`} scroll={false} className='flex flex-row items-center gap-[1.2rem] w-full'>
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
                        <p className='text-gray-500 font-[500] text-[0.8rem]'>Начало: {post.eventTime}</p>
                        <Separator className='bg-gray-300 h-[1rem] w-[1px]' orientation='vertical'/>
                        <p className='text-gray-500 font-[500] text-[0.8rem]'>Дата мероприятия: {post.eventDate}</p>
                    </div>
                </div>
            </Link>


            {/* Card Actions*/}
            <div className='flex flex-row items-center gap-[1rem]'>
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                            <Link href={`/events/${post.$id}`} scroll={false}>
                                <ClipboardEdit strokeWidth={1.5} size={24} className='cursor-pointer transition-colors duration-300 hover:text-fuchsia-600'/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className='text-[0.8rem]'>Редактировать</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Separator className='bg-gray-300 h-[1.4rem] w-[1px]' orientation='vertical'/>
                <DeleteEventPopup docID={post.$id} imageFileID={post.imageID} refetch={refetch}/>
            </div>

        </div>
    )
}

export default EventsPaginatedCard
