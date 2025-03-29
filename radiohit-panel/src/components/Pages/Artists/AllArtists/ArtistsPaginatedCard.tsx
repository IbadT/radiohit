import Image from "next/image";
import {ClipboardEdit, Music4, Star} from "lucide-react";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/tooltip";
import {Separator} from "@/components/ui/Separator/separator";
import DeleteArtistPopup from "@/components/Popups/DeletePopups/DeleteArtistPopup";

const ArtistPaginatedCard = ({ artist, refetch }) => {
  const createdDate = new Date(artist.$createdAt).toLocaleDateString("ru-RU");
  const updatedDate = new Date(artist.$updatedAt).toLocaleDateString("ru-RU");
  const updatedTime = new Date(artist.$updatedAt).toLocaleTimeString("ru-RU", { timeStyle: "short" });

  return (
    <div className="w-full bg-white rounded-xl border-[1px] border-mainBorderColor p-[1.1rem] mb-[1rem] flex flex-row group hover:border-fuchsia-300 transition-all duration-300">
      {/*Artist Image*/}
      <Link href={`/artists/${artist.$id}`} className="relative h-[8rem] w-[8rem] min-w-[8rem] rounded-xl overflow-hidden bg-gray-300 mr-[1.5rem]">
        <Image
          src={artist.userImageURL}
          alt="artist_avatar"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="w-full h-full bg-cover object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
      </Link>
      <Link href={`/artists/${artist.$id}`} className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col min-h-full items-start justify-between py-[0.5rem]">
          <div>
            <p className="text-slate-400 font-[300] text-[0.9rem]">
              {createdDate}
            </p>
            <h3 className="text-[1.4rem] font-[500] text-slate-700 group-hover:text-mainAccent transition-colors duration-300">
              {artist.name}
            </h3>
          </div>
          <div className="flex flex-row items-center text-slate-500">
            <p className="mr-[0.5rem] whitespace-nowrap text-[0.9rem]">Обновлен: {updatedDate} в {updatedTime}</p>
          </div>
        </div>

        <div className="flex flex-row items-end gap-[1rem] justify-end pr-[3rem] min-[100px]:max-[1320px]:pr-[0] max-md:hidden">
          <div className="flex flex-row items-center text-slate-500 gap-[0.5rem]">
            <Music4 strokeWidth={2} size={16} className="relative top-[0]" />
            <p className="font-[400] whitespace-nowrap">
              {artist.artistUploadedTracksID.length} треков
            </p>
          </div>
          <div className="h-[1.2rem] w-[2px] bg-slate-200" />
          <div className="flex flex-row items-center text-slate-500 gap-[0.5rem]">
            <Star strokeWidth={2} size={16} className="relative top-[0]" />
            <p className="font-[400] whitespace-nowrap">
              Рейтинг {artist.artistRating}
            </p>
          </div>
        </div>
      </Link>

      {/* Card Actions*/}
      <div className='flex flex-row items-center gap-[1rem] ml-[10rem]'>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <Link href={`/artists/${artist.$id}`} scroll={false}>
                <ClipboardEdit strokeWidth={1.5} size={24} className='cursor-pointer transition-colors duration-300 hover:text-fuchsia-600'/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-[0.8rem]'>Редактировать</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator className='bg-gray-300 h-[1.4rem] w-[1px]' orientation='vertical'/>
        <DeleteArtistPopup
            docID={artist.$id} imageFileID={artist.userImageID} refetch={refetch}
        />
      </div>
    </div>
  );
};
export default ArtistPaginatedCard;
