import Image from "next/image";
import * as React from "react";
import {MoveRight, Music4, Star} from "lucide-react";

const ArtistCard = ({ artist }) => {
  return (
    <div className="w-full bg-white rounded-xl border-[1px] border-mainBorderColor p-[1.1rem] mb-[1rem] flex flex-row group hover:border-fuchsia-300 transition-all duration-300 hover:scale-[1.02]">
      {/*Artist Image*/}
      <div className="relative h-[8rem] w-[8rem] min-w-[8rem] rounded-xl overflow-hidden bg-gray-300 mr-[1.5rem]">
        <Image
          src={artist.userImageURL}
          alt="artist_avatar"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority
          className="w-full h-full bg-cover object-cover"
        />
      </div>
        <div className='flex flex-row justify-between items-center w-full'>
            <div className="flex flex-col min-h-full items-start justify-between py-[0.5rem]">
                <div>
                    <p className="text-slate-400 font-[300] text-[0.9rem]">Исполнитель</p>
                    <h3 className="text-[1.4rem] font-[500] text-slate-700 group-hover:text-mainAccent transition-colors duration-300">
                        {artist.name}
                    </h3>
                </div>
                <div className="flex flex-row items-center text-slate-500">
                    <p className="mr-[0.5rem] whitespace-nowrap text-[0.9rem]">Смотреть профиль</p>
                    <MoveRight
                        strokeWidth={1}
                        size={20}
                        className="relative transition-all duration-300 group-hover:ml-[10px]"
                    />
                </div>
            </div>

            <div className='flex flex-row items-end gap-[1rem] justify-end pr-[3rem] min-[100px]:max-[1320px]:pr-[0] max-md:hidden'>
                <div className='flex flex-row items-center text-slate-500 gap-[0.5rem]'>
                    <Music4 strokeWidth={2} size={16} className='relative top-[0]'/>
                    <p className='font-[400] whitespace-nowrap'>{artist.artistUploadedTracksID.length} треков</p>
                </div>
                <div className='h-[1.2rem] w-[2px] bg-slate-200'/>
                <div className='flex flex-row items-center text-slate-500 gap-[0.5rem]'>
                    <Star strokeWidth={2} size={16} className='relative top-[0]'/>
                    <p className='font-[400] whitespace-nowrap'>{artist.artistRating} оценок</p>
                </div>
            </div>

        </div>
    </div>
  );
};
export default ArtistCard;
