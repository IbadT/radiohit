"use client";

import { cn } from "@/lib/utils/utils";
import { HelpCircle} from "lucide-react";
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
import { Badge } from "@/components/ui/Badge/badge";
import { Textarea } from "@/components/ui/Textarea/textarea";
import DeleteArtistPopup from "@/components/Popups/DeletePopups/DeleteArtistPopup";
import Image from "next/image";
import ReactQueryWrapper from "@/components/Wrappers/ReactQueryWrapper";
import ArtistTracks from "@/components/Pages/Artists/EditArtist/ArtistTracks";

//Form schema
const formSchema = z.object({
  artistName: z
    .string()
    .min(2, {
      message: "Введите имя исполнителя",
    })
    .max(64, {
      message: "Превышена максимальная длинна",
    }),
  artistEmail: z
    .string()
    .max(35, {
      message: "Превышена максимальная длинна",
    })
    .optional()
    .or(z.literal("nomail@radiohit.by")),
  artistCountry: z
    .string()
    .min(2, {
      message: "Укажите страну исполнителя",
    })
    .max(50, {
      message: "Превышена максимальная длинна описания",
    }),
  artistRating: z.coerce.number().gte(0, "Рейтинг не может быть ниже нуля"),
  artistDescription: z
    .string()
    .min(20, {
      message: "Введите описание исполнителя",
    })
    .max(5000, {
      message: "Максимальная длинна описания 5000 символов",
    }),
});

const EditArtistPageContent = ({ artist }) => {
  const { updateArtist, loading } = useAdminActions();

  //Image refs
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
      artistName: artist.artistName,
      artistEmail: artist.email,
      artistCountry: artist.artistCountry,
      artistRating: artist.artistRating,
      artistDescription: artist.artistDescription,
    },
  });

  //Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>, e) {


    //Check if image file lower than 5mb
    if (imageFile && imageFile.size > 5000000) {
      return toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
    }


    //Validate email
    let emailAddress = values.artistEmail;
    if (
      !values.artistEmail ||
      values.artistEmail?.length < 4 ||
      !values.artistEmail.includes("@")
    ) {
      emailAddress = "nomail@radiohit.by";
    }

    if (imageFile) {
      return await updateArtist(
        artist.$id,
        values.artistName,
        emailAddress as string,
        values.artistCountry,
        values.artistRating,
        values.artistDescription,
        artist.userImageID,
        artist.userImageURL,
        imageFile
      );
    } else {
      return await updateArtist(
        artist.$id,
        values.artistName,
        emailAddress as string,
        values.artistCountry,
        values.artistRating,
        values.artistDescription,
        artist.userImageID,
        artist.userImageURL
      );
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">
          Редактировать исполнителя
        </p>
        <DeleteArtistPopup
          docID={artist.$id}
          imageFileID={artist.userImageID}
          type="button"
          refetch={undefined}
        />
      </div>

      {/*Page Form*/}
      <div className="w-full mt-[1.2rem] flex flex-row gap-[1.2rem]">
        <div className="w-[30%] h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col sticky top-[1.5rem]">
          {/*Image*/}
          <div className="w-full h-[14vw] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover relative">
            {!imageFile && (
              <Image
                src={artist.userImageURL}
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
              "flex flex-row items-center gap-[0.5rem] mt-[1rem] cursor-pointer"
            )}
            onClick={handleImageUploadClick}
          >
            Изменить изображение
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

        {/*Form Content*/}
        <div className="flex flex-col w-full">
          <div
            className="w-full bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl"
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
                  <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Имя исполнителя{" "}
                          <span className="text-gray-400">(группы)</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Крутой исполнитель"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="artistEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Адрес еmail{" "}
                          <span className="text-gray-400">(необязательно)</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="iamartist@radiohit.by"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row gap-[1.5rem]">
                  <FormField
                    control={form.control}
                    name="artistCountry"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Страна исполнителя
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Беларусь"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="artistRating"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden flex flex-row items-center gap-[1rem]">
                          Рейтинг исполнителя <HelperHoverCard />
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

                <FormField
                  control={form.control}
                  name="artistDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                        Краткое описание
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Описание исполнителя"
                          className="resize-none placeholder:text-slate-400 h-[20rem] min-[1300px]:max-[1420px]:h-[16rem]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

          <div className="w-full mt-[1.5rem]">
              <ArtistTracks artistID={artist.$id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditArtistPageContent;

const HelperHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer">
        <Badge
          variant="helper"
          className="flex flex-row items-center gap-[0.4rem]"
        >
          <HelpCircle strokeWidth={2} size={10} />
          Информация
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="text-gray-500 text-[0.8rem]">
        <p>
          Рейтинг исполнителя формируется из оценок пользователей. Чем выше
          рейтинг исполнителя - тем выше его позиция на сайте
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};
