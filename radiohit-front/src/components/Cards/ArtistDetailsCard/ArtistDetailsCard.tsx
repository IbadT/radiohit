import * as React from "react";
import Image from "next/image";
import { FileText, Music4, Star } from "lucide-react";

const ArtistDetailsCard = ({ artist }) => {
  const registerDate = new Date(artist.$createdAt).toLocaleDateString("ru-RU");

  return (
    <>
      {/*Artist Card*/}
      <div className="w-full p-[1.2rem] bg-white border-[1px] border-mainBorderColor rounded-2xl">
        <div className="flex flex-row items-center w-full">
          {/*Artist Image*/}
          <div className="w-[6rem] h-[6rem] xl:min-w-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] max-sm:w-[4rem] max-sm:h-[4rem] bg-cover max-md:mr-0 max-md:min-w-[4rem]">
            <Image
              src={artist.userImageURL}
              alt="avatar"
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="w-full h-full bg-cover object-cover saturate-150"
            />
          </div>

          <div className="flex flex-row items-center w-full max-md:flex-col max-md:items-start max-md:pl-[1rem]">
            <div className="flex flex-col pb-[0.5rem] max-md:pb-0">
              {/*Artist Name*/}
              <p className="font-[500] text-slate-700 leading-0 group-hover:text-mainAccent transition-colors duration-300 text-[1.8rem] max-sm:text-[1.2rem] whitespace-nowrap overflow-hidden max-w-[26rem] max-md:max-w-[14rem] overflow-ellipsis">
                {artist.name}
              </p>
              <p className="text-slate-400 whitespace-nowrap max-md:text-[0.9rem] max-md:hidden">
                На платформе с{" "}
                <span className="text-[0.9rem]">{registerDate}</span>
              </p>
            </div>

            <div className="flex flex-row items-end gap-[1rem] justify-end pr-[3rem] min-[100px]:max-[1320px]:pr-[0] w-full max-md:gap-0 max-md:justify-start max-md:text-[0.9rem] max-md:w-auto max-md:mt-[0.3rem]">
              <div className="flex flex-row items-center text-slate-500 gap-[0.5rem] max-md:mr-[0.5rem]">
                <Music4
                  strokeWidth={2}
                  size={16}
                  className="relative top-[0]"
                />
                <p className="font-[400] whitespace-nowrap">
                  {artist.artistUploadedTracksID.length} треков
                </p>
              </div>
              <div className="h-[1.2rem] w-[2px] bg-slate-200" />
              <div className="flex flex-row items-center text-slate-500 gap-[0.5rem]">
                <Star strokeWidth={2} size={16} className="relative top-[0]" />
                <p className="font-[400] whitespace-nowrap">
                  {artist.artistRating} оценок
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Artist Description*/}
      <div className="w-full p-[1.2rem] bg-white border-[1px] border-mainBorderColor rounded-2xl mt-[1rem] mb-[1rem]">
        <div className="flex flex-col">
          <h2 className="text-[#373738] font-[600] text-[1.1rem] mb-[0.6rem]">Описание исполнителя</h2>
          {artist.artistDescription.length > 10 &&<p className='text-[0.9rem] text-slate-600'>{artist.artistDescription}</p>}
          {artist.artistDescription.length < 10 && (
            <div className="flex flex-col w-full items-center justify-center h-[12rem] text-slate-500">
              <FileText size={40} strokeWidth={1.2} />
              <p className="text-[1.2rem] mt-[1rem]">Нет описания</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistDetailsCard;
