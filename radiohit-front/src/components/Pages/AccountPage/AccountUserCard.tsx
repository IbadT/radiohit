import * as React from "react";
import { toast } from "@/components/ui/Toaster/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { defaultImageAvatar } from "@/lib/utils/utils";

const UserCard = ({ userDocument, userAccount, loading, changeUserImage }) => {
  const fileInput = React.useRef(null);

  //Handle on avatar click
  const handleUploadImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  //Get image and upload to bucket
  const handleFileChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    if (imageFile.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    } else {
      await changeUserImage(imageFile);
    }
  };

  //User Registration Date
  const registerDate = new Date(userAccount.registration).toLocaleDateString(
    "ru-RU"
  );

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-white border-[1px] border-mainBorderColor rounded-2xl p-[1rem] mt-[1rem] max-lg:mt-0 max-lg:flex-col">
        <div className="flex flex-row items-center w-[70%] max-lg:w-full max-lg:justify-center max-sm:justify-start">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                {loading && (
                  <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle rounded-full max-sm:w-[4rem] max-sm:h-[4rem] mr-[1.5rem]">
                    <Loader2
                      className=" h-[2.6rem] w-[2.6rem] animate-spin text-gray-400"
                      strokeWidth={1}
                    />
                  </div>
                )}
                {!loading && userDocument.userImageURL == null && (
                  <div
                    className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover"
                    onClick={handleUploadImageClick}
                  >
                    <Image
                      src={defaultImageAvatar}
                      alt="avatar"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="w-full h-full bg-cover object-cover"
                    />
                  </div>
                )}
                {!loading && userDocument.userImageURL != null && (
                  <div
                    className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover"
                    onClick={handleUploadImageClick}
                  >
                    <Image
                      src={userDocument.userImageURL}
                      alt="avatar"
                      priority
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full bg-cover object-cover"
                    />
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>Изменить изображение</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex flex-col">
            <p className="font-[600] text-slate-700 leading-0 group-hover:text-mainAccent transition-colors duration-300 text-[1.8rem] max-sm:text-[1.2rem] whitespace-nowrap overflow-hidden max-w-[26rem] max-md:max-w-[14rem] overflow-ellipsis">
              {userDocument.name}
            </p>
            {userDocument.role === "user" && (
              <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300 text-[1.1rem] relative max-sm:text-[0.9rem]">
                Аккаунт пользователя
              </p>
            )}
            {userDocument.role === "radio" && (
              <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300 text-[1.1rem]">
                Аккаунт радиостанции
              </p>
            )}
            {userDocument.role === "artist" && (
              <p className="text-[0.8rem] font-[300] text-slate-500 group-hover:text-mainAccent transition-colors duration-300 text-[1.1rem]">
                Аккаунт исполнителя
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-around w-full max-lg:mt-[2rem] max-sm:mt-[1rem] max-sm:border-t-mainBorderColor max-sm:border-t-[1px]">
          {/*For Radio Uploaded Tracks Count*/}
          {userDocument.role == "radio" && (
            <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
              <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
                {userDocument.downloadTracksID.length}
              </span>
              <p className="text-slate-500">Скачано треков</p>
            </div>
          )}

          {/*For Artist Uploaded Tracks Count*/}
          {userDocument.role == "artist" && (
            <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
              <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
                {userDocument.artistUploadedTracksID.length}
              </span>
              <p className="text-slate-500">Добавлено треков</p>
            </div>
          )}

          {/*For All Favourite Tracks Count*/}
          <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
            <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
              {userDocument.favouriteTracksID.length}
            </span>
            <p className="text-slate-500"> Избранных треков</p>
          </div>

          {/*For User Liked Tracks Count*/}
          {userDocument.role == "user" && (
            <div className="flex flex-row items-center max-sm:flex-row max-sm:text-center max-sm:text-[0.8rem] max-sm:pt-[0.8rem]">
              <span className="font-[600] text-[1.1rem] mr-[0.5rem] text-slate-500">
                {userDocument.ratedTracksID.length}
              </span>
              <p className="text-slate-500">Оценок трекам</p>
            </div>
          )}

          <div className="flex flex-row items-center max-sm:flex-col max-sm:text-center max-sm:hidden">
            <p className="text-slate-500 mr-[0.5rem]">На платформе с</p>
            <span className="font-[600] text-[1rem]  text-slate-500">
              {registerDate}
            </span>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={(e) => handleFileChange(e)}
        ref={fileInput}
      />
    </>
  );
};
export default UserCard;
