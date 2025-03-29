"use client";

import { cn } from "@/lib/utils/utils";
import { HelpCircle, MailQuestion, Music, UserRound } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/Inputs/input";
import { Button, buttonVariants } from "@/components/Buttons/Button";

import { z } from "zod";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import { toast } from "@/components/ui/Toaster/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard/hover-card";
import { Switch } from "@/components/ui/Switch/switch";
import AddTrackArtistSearch from "@/components/Serach/AddTrackArtistSearch/AddTrackArtistSearch";
import Image from "next/image";
import DeleteTrackPopup from "@/components/Popups/DeletePopups/DeleteTrackPopup";
import ReactQueryWrapper from "@/components/Wrappers/ReactQueryWrapper";
import RotationSongsQuery from "@/components/Pages/Songs/EdistSong/RotationSongsQuery";

import noimage from "./../../../../../public/assets/images/no_image.jpg";

//Form schema
const formSchema = z.object({
  trackName: z
    .string()
    .min(2, {
      message: "Введите название трека",
    })
    .max(64, {
      message: "Превышена максимальная длинна",
    }),
  trackRating: z.coerce.number().gte(0, "Рейтинг не может быть ниже нуля"),
});

const EditSuggestedSongPageContent = ({ song }) => {
  const { updateSuggestedSong, loading } = useAdminActions();

  //TrackSongName
  const [trackName, setTrackName] = React.useState(song.trackSongName);

  //Is approved track or not
  const [isApproved, setIsApproved] = React.useState<boolean>(song.isApproved);

  //Artist doc
  const [artistDoc, setArtistDoc] = React.useState(null);

  //Artist id
  const [artistIDTrackSearch, setArtistIDTrackSearch] = React.useState("");

  //Image File
  const [imageFile, setImageFile] = React.useState<File>();
  const imageFileInput = React.useRef(null);
  const imageRef = React.useRef(null);

  //On Upload Image Click
  const handleImageUploadClick = () => {
    if (imageFileInput.current) {
      imageFileInput.current.click();
    }
  };

  //On image file selected
  const handleImageFileChange = async (e) => {
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
      setImageFile(imageFile);
      uploader(e);
    }
  };

  //Show uploaded image in UI
  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  //Get image result from uploader
  const { result, uploader } = useDisplayImage();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackName: song.trackSongName,
      trackRating: song.trackPopularity,
    },
  });

  //Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>, e) {
    //Check if image was added
    if (!imageFile) {
      toast({
        title: `Добавьте обложку трека`,
        description: `Необходимо загрузить обложку трека`,
        variant: "destructive2",
      });
      return;
    }

    //Check if image added and file lower than 5mb
    if (imageFile && imageFile.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    }

    //Check if artist Added
    if (!artistIDTrackSearch || !artistDoc) {
      return toast({
        title: `Выберите исполнителя`,
        description: `Необходимо выбрать исполнителя`,
        variant: "destructive2",
      });
    }

    if (imageFile && artistDoc) {
      return await updateSuggestedSong(
        song.$id,
        values.trackName,
        artistDoc.artistName,
        values.trackRating,
        artistIDTrackSearch as string,
        isApproved,
        imageFile
      );
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">
          Редактировать трек
        </p>
        <DeleteTrackPopup
          docID={song.$id}
          imageFileID={song.trackImageID}
          songFileID={song.trackFileID}
          artistID={song.trackArtistID}
          type="button"
          refetch={undefined}
        />
      </div>

      {/*Page Form*/}
      <div className="w-full mt-[1.2rem] flex flex-row gap-[1.2rem]">
        {/*Left Content*/}
        <div className="w-[30%] flex flex-col">
          {/*Is Approved block*/}
          <div className="w-full h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col mb-[1.2rem]">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-[500] text-[1rem] min-[1200px]:max-[1400px]:text-[0.9rem]">
                Трек одобрен?
              </p>
              <Switch
                checked={isApproved}
                className="data-[state=checked]:bg-fuchsia-600"
                onCheckedChange={(checked) => {
                  setIsApproved(checked);
                }}
              />
            </div>
          </div>

          {/*Image block*/}
          <div className="w-full h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col">
            {/*Image*/}
            <div className="w-full h-[14vw] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
              {!imageFile && (
                <Image
                  src={noimage}
                  alt="image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full bg-cover object-cover z-2"
                  onClick={handleImageUploadClick}
                />
              )}

              {imageFile && (
                <img
                  src={result}
                  alt="image"
                  ref={imageRef}
                  className="w-full h-full bg-cover object-cover z-2"
                  onClick={handleImageUploadClick}
                />
              )}
            </div>

            <div
              className={cn(
                buttonVariants({ variant: "accentInverted" }),
                "flex flex-row items-center gap-[0.5rem] mt-[1rem] cursor-pointer min-[1200px]:max-[1350px]:text-[0.8rem]"
              )}
              onClick={handleImageUploadClick}
            >
              {!imageFile ? "Добавить изображение" : "Изменить изображение"}
            </div>

            <p className="text-slate-400 font-[500] text-[0.7rem] text-center mt-[1rem] min-[1200px]:max-[1500px]:text-[0.6rem]">
              Изображение должно быть в формате 1:1 (квадрат) прим: 500x500px.
              Максимальный размер файла 5 мегабайт
            </p>

            {/*Hidden Image File Input*/}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={(e) => handleImageFileChange(e)}
              ref={imageFileInput}
            />
          </div>
        </div>

        {/*Right Content*/}
        <div className="flex flex-col w-full">
          <div className="w-full h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col mb-[1.2rem]">
            <div className="flex flex-row items-center justify-between">
              <div className="w-full flex flex-row items-center gap-[0.6rem]">
                <UserRound strokeWidth={1.6} className="h-auto w-[1.2rem]" />
                <p className="text-base font-[400] text-[1rem] min-[1200px]:max-[1400px]:text-[0.9rem] overflow-ellipsis w-max">
                  Предложил трек:{" "}
                  <span className="text-slate-500">
                    {song.whoSuggestedName !== ""
                      ? song.whoSuggestedName
                      : "Не указано"}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-row items-center gap-[0.6rem]">
                <MailQuestion strokeWidth={1.6} className="h-auto w-[1.2rem]" />
                <p className="text-base font-[400] text-[1rem] min-[1200px]:max-[1400px]:text-[0.9rem]  overflow-ellipsis w-max">
                  Email:{" "}
                  <span className="text-slate-500">
                    {song.whoSuggestedEmail !== ""
                      ? song.whoSuggestedEmail
                      : "Не указано"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl"
            data-color-mode="light"
          >
            <Form {...form}>
              <form
                className="grid gap-4 max-md:flex max-md:flex-col"
                onSubmit={(...args) =>
                  void form.handleSubmit(onSubmit)(...args)
                }
              >
                <div className="flex flex-row gap-[1.5rem]">
                  <div className="w-full">
                    {/*Track Name*/}
                    <FormField
                      control={form.control}
                      name="trackName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                            Название трека
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              placeholder="Крутой трек"
                              className="placeholder:text-slate-400 w-full"
                              {...field}
                              onChange={(event) => {
                                setTrackName(event.target.value);
                                field.onChange(event);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-row w-1/2">
                    {/*Track Rating*/}
                    <FormField
                      control={form.control}
                      name="trackRating"
                      render={({ field }) => (
                        <FormItem className="w-full mr-[1.5rem] w-full">
                          <FormLabel className="text-slate-700 text-[1rem] max-md:hidden flex flex-row items-center gap-[1rem]">
                            Рейтинг трека <HelperRatingHoverCard />
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              className="no-spin placeholder:text-slate-400 w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/*Search Artist*/}
                <AddTrackArtistSearch
                  setArtistIDTrackSearch={setArtistIDTrackSearch}
                  artistIDTrackSearch={artistIDTrackSearch}
                  artistDoc={artistDoc}
                  setArtistDoc={setArtistDoc}
                  type="editSuggestedSong"
                />

                {/*Track file*/}
                <div className="flex flex-row w-full gap-[1.5rem]">
                  <div className="w-full max-md:w-full flex flex-col pointer-events-none select-none">
                    <div className="flex flex-row items-center max-md:justify-center">
                      <div className="w-[8rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:h-[4rem] bg-cover">
                        <Music className="text-gray-400" size={30} />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="w-full h-[6rem] border-[2px] border-solid border-gray-200 items-center flex flex-row justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80  max-sm:h-[4rem] bg-cover bg-gray-50">
                          <Music className="text-gray-500 mr-[1rem]" />
                          <div className="flex flex-row items-center gap-[0.6rem]">
                            <p className="text-gray-500">
                              {!artistDoc
                                ? song.trackArtistName
                                : artistDoc.artistName}
                            </p>
                            <p className="text-gray-500">-</p>
                            <p className="text-gray-500">{trackName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-mainAccent text-white hover:bg-fuchsia-500 transition-colors duration-300 flex flex-row items-center gap-[0.5rem]"
                  isLoading={loading}
                >
                  Сохранить изменения
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditSuggestedSongPageContent;

const HelperRatingHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-gray-500 text-[0.8rem]">
        <p>
          Рейтинг трека формируется из оценок пользователей. Чем выше рейтинг
          трека - тем выше его позиция на сайте
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};
