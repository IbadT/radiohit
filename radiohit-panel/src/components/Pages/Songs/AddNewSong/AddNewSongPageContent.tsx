"use client";

import Link from "next/link";
import { cn, getDuration } from "@/lib/utils/utils";
import { HelpCircle, ImagePlus, MoveRight, Music, Plus } from "lucide-react";
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

//Track artist - state

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

const AddNewSongPageContent = () => {
  const { addNewSong, loading } = useAdminActions();

  //Is approved track or not
  const [isApproved, setIsApproved] = React.useState<boolean>(true);

  //Artist doc
  const [artistDoc, setArtistDoc] = React.useState(null);

  //Artist id
  const [artistIDTrackSearch, setArtistIDTrackSearch] = React.useState(null);

  //Image File
  const [imageFile, setImageFile] = React.useState<File>();
  const imageFileInput = React.useRef(null);
  const imageRef = React.useRef(null);

  //Track duration
  const [trackDuration, setTrackDuration] = React.useState("");

  //Track File
  const [trackSongFile, setTrackSongFile] = React.useState<File>();
  const trackFileInput = React.useRef(null);

  //On Upload Image Click
  const handleImageUploadClick = () => {
    if (imageFileInput.current) {
      imageFileInput.current.click();
    }
  };

  //On Upload Track Song click
  const handleTrackSongUploadClick = () => {
    if (trackFileInput.current) {
      trackFileInput.current.click();
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

  //On Track file selected
  const handleTrackSongFileChange = async (e) => {
    const songFile = e.target.files[0];
    if (!songFile) return;
    if (songFile.size > 20000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 20 мегабайт`,
        variant: "destructive2",
      });
    } else {
      //Set track file
      setTrackSongFile(songFile);
      //Get audio duration from file
      await getDuration(songFile).then((res) => {
        setTrackDuration(res);
      });
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
      trackName: "",
      trackRating: 0,
    },
  });

  //Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>, e) {
    //Check is image added
    if (!imageFile) {
      toast({
        title: `Изображение не выбрано`,
        description: `Необходимо добавить изображение`,
        variant: "destructive2",
      });
      return;
    }

    //Check is file added
    if (!trackSongFile) {
      toast({
        title: `Файл трека не выбран`,
        description: `Необходимо выбрать файл трека`,
        variant: "destructive2",
      });
      return;
    }

    //Check if image file lower than 5mb
    if (imageFile.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    }

    //Check if song file lower than 20mb
    if (trackSongFile > 20000000) {
      return toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 20 мегабайт`,
        variant: "destructive2",
      });
    }

    //Check if artist Added
    if (!artistIDTrackSearch || !artistDoc) {
      return toast({
        title: `Выберите исполнителя`,
        description: `Необходимо выбрать исполнителя`,
        variant: "destructive2",
      });
    }

    await addNewSong(
      values.trackName,
      artistDoc.artistName,
      values.trackRating,
      artistIDTrackSearch,
      isApproved,
      trackDuration,
      imageFile,
      trackSongFile
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">
          Добавить новый трек
        </p>
        <Link
          href="/songs"
          className={cn(
            "flex flex-row items-center gap-[0.5rem] text-gray-500 text-[0.9rem] transition-colors duration-300 hover:text-fuchsia-700"
          )}
        >
          Все треки
          <MoveRight strokeWidth={1.5} size={18} />
        </Link>
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
            <div
              className="w-full h-[14vw] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover relative"
              onClick={() => {
                if (!imageFile) handleImageUploadClick();
              }}
            >
              {!imageFile && (
                <div className="flex flex-col items-center gap-[1rem]">
                  <ImagePlus
                    className="text-gray-400"
                    size={60}
                    strokeWidth={1.4}
                  />
                  <p className="text-gray-400 text-[1rem]">
                    Выберите изображение
                  </p>
                </div>
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

            {/*Hidden Song File Input*/}
            <input
              type="file"
              accept=".mp3"
              className="hidden"
              onChange={(e) => handleTrackSongFileChange(e)}
              ref={trackFileInput}
            />
          </div>
        </div>

        {/*Right Content*/}
        <div
          className="w-full h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl"
          data-color-mode="light"
        >
          <Form {...form}>
            <form
              className="grid gap-4 max-md:flex max-md:flex-col"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
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

              {/*Track file*/}
              <div className="flex flex-row w-full gap-[1.5rem]">
                <div className="w-full max-md:w-full flex flex-col">
                  <div className="flex flex-row items-center max-md:justify-center">
                    {trackSongFile && (
                      <div
                        className="w-[8rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:h-[4rem] bg-cover"
                        onClick={handleTrackSongUploadClick}
                      >
                        <Music className="text-gray-400" size={30} />
                      </div>
                    )}
                    <div className="flex flex-col w-full">
                      <div
                        className="w-full h-[6rem] border-[2px] border-dashed border-gray-200 items-center flex flex-row justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80  max-sm:h-[4rem] bg-cover"
                        onClick={handleTrackSongUploadClick}
                      >
                        <Music className="text-gray-400 mr-[1rem]" />
                        <p className="text-gray-400">
                          {trackSongFile
                            ? "Изменить файл"
                            : "Добавить файл трека"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {trackSongFile && (
                    <p className="text-[0.8rem] text-slate-600 py-[5px] px-[10px] text-center bg-fuchsia-50 rounded-2xl mt-[0.6rem]">
                      {trackSongFile.name}
                    </p>
                  )}
                </div>

                <div className="flex w-[50%] border-gray-200 rounded-xl border-[1px] p-[0.8rem] justify-center align-center items-center">
                  <p className="text-slate-400 font-[500] text-[0.8rem] max-lg:text-[0.6rem] max-md:hidden text-center flex justify-center align-center items-center">
                    Файл трека должен быть в формате .mp3 | Максимальный размер
                    файла 20 мегабайт
                  </p>
                </div>
              </div>

              <AddTrackArtistSearch
                setArtistIDTrackSearch={setArtistIDTrackSearch}
                artistIDTrackSearch={artistIDTrackSearch}
                artistDoc={artistDoc}
                setArtistDoc={setArtistDoc}
              />

              <Button
                type="submit"
                className="w-full bg-mainAccent text-white hover:bg-fuchsia-500 transition-colors duration-300 flex flex-row items-center gap-[0.5rem]"
                isLoading={loading}
              >
                Добавить трек
                <Plus size={20} strokeWidth={1.2} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddNewSongPageContent;

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
