"use client";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover/popover";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/Toaster/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import { Input } from "@/components/ui/Inputs/input";
import { Brush } from "lucide-react";
import { Button } from "@/components/Buttons/Button";

//Form schema
const formSchema = z.object({
  posterTitle: z
    .string()
    .min(3, {
      message: "Минимальная длинна заголовка 3 символа",
    })
    .max(150, {
      message: "Превышена максимальная длинна заголовка",
    }),
  posterTopSubtitle: z
    .string()
    .min(1, {
      message: "Введите подзаголовок",
    })
    .max(50, {
      message: "Превышена максимальная длинна",
    }),
  posterBottomSubtitle: z
    .string()
    .min(1, {
      message: "Введите подзаголовок",
    })
    .max(100, {
      message: "Превышена максимальная длинна",
    }),
  posterTargetURL: z
    .string()
    .min(1, {
      message: "Укажите ссылку для баннера",
    })
    .max(400, {
      message: "Превышена максимальная длинна ссылки",
    }),
});

const EditBannerPageContentInner = ({ poster }) => {
  //Color picker hex color values
  const [topSubtitleColor, setTopSubtitleColor] = useState<string>(
    poster.topSubtitleColor
  );
  const [titleColor, setTitleColor] = useState<string>(poster.titleColor);
  const [bottomSubtitleColor, setBottomSubtitleColor] = useState<string>(
    poster.bottomSubtitleColor
  );

  //Image refs
  const [imageFile, setImageFile] = React.useState<File>();
  const imageFileInput = React.useRef(null);
  const imageRef = React.useRef(null);

  //Text values
  const [posterTitle, setPosterTitle] = React.useState<string>(
    poster.posterTitle
  );
  const [posterBottomSubtitle, setPosterBottomSubtitle] =
    React.useState<string>(poster.posterBottomSubtitle);
  const [posterTopSubtitle, setPosterTopSubtitle] = React.useState<string>(
    poster.posterTopSubtitle
  );

  const { updateMainBannerContent, loading } = useAdminActions();

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
      posterTitle: poster.posterTitle,
      posterBottomSubtitle: poster.posterBottomSubtitle,
      posterTopSubtitle: poster.posterTopSubtitle,
      posterTargetURL: poster.posterTargetURL,
    },
  });

  //Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>, e) {
    //Check if image file lower than 5mb
    if (imageFile && imageFile.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    }

    if (
      topSubtitleColor.length < 4 ||
      titleColor.length < 4 ||
      bottomSubtitleColor.length < 4
    ) {
      toast({
        title: `Укажите цвет`,
        description: `Необходимо указать цвет`,
        variant: "destructive2",
      });
      return;
    }

    if (imageFile) {
      return await updateMainBannerContent(
        values.posterTitle,
        values.posterTopSubtitle,
        values.posterBottomSubtitle,
        titleColor,
        topSubtitleColor,
        bottomSubtitleColor,
        values.posterTargetURL,
        poster.posterImageID,
        poster.posterImageURL,
        imageFile
      );
    } else {
      return await updateMainBannerContent(
        values.posterTitle,
        values.posterTopSubtitle,
        values.posterBottomSubtitle,
        titleColor,
        topSubtitleColor,
        bottomSubtitleColor,
        values.posterTargetURL,
        poster.posterImageID,
        poster.posterImageURL
      );
    }
  }

  const responsiveSizes =
    "min-[1200px]:h-[25vh] min-[1320px]:h-[30vh] min-[1410px]:h-[25vh] min-[1500px]:h-[30vh] min-[1900px]:h-[35vh] max-lg:h-[20rem] max-md:h-[10rem]";
  return (
    <>
      {/*Home Poster*/}
      <div className="w-full bg-[#f9faff] rounded-2xl border-[1px] border-mainBorderColor py-[1.2rem]">
        <div className="max-w-[calc(100%-25rem)] mx-auto">
          {poster && (
            <div
              className="w-full max-lg:mt-0 rounded-2xl overflow-hidden bg-[#e8e7e3] cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={handleImageUploadClick}
            >
              <div
                className={cn(
                  "w-full h-[35vh] relative rounded-2xl overflow-hidden",
                  responsiveSizes
                )}
              >
                <div className="relative flex z-[1] py-[2rem] px-[4rem] flex flex-col h-full w-full justify-around max-md:px-[1.2rem]">
                  {/*Poster Top Subtitle*/}
                  <div className="flex flex-col">
                    <p
                      className="font-[500] line-clamp-1 max-md:text-[0.8rem]"
                      style={{
                        color: `${topSubtitleColor}`,
                      }}
                    >
                      {posterTopSubtitle}
                    </p>

                    {/*Poster Title*/}
                    <p
                      className="line-clamp-3 font-[600] text-[2.5rem] mt-[0.1vw] mb-[0.5rem] max-md:text-[1.4rem] min-[1300px]:max-[1450px]:text-[2rem]"
                      style={{
                        color: `${titleColor}`,
                      }}
                    >
                      {posterTitle}
                    </p>

                    {/*Poster Bottom Subtitle*/}
                    <p
                      className="line-clamp-3 w-[50%] max-md:hidden min-[1300px]:max-[1450px]:text-[0.9rem]"
                      style={{
                        color: `${bottomSubtitleColor}`,
                      }}
                    >
                      {posterBottomSubtitle}
                    </p>
                  </div>
                </div>

                {!imageFile && (
                  <Image
                    src={poster.posterImageURL}
                    alt="poster"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="w-full h-full bg-cover object-cover z-[0] transition-all duration-300 pointer-events-none"
                  />
                )}

                {imageFile && (
                  <img
                    src={result}
                    alt="poster"
                    ref={imageRef}
                    className="w-full h-full bg-cover object-cover z-[0] transition-all duration-300 pointer-events-none absolute top-0"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/*Hidden Image File Input*/}
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={(e) => handleImageFileChange(e)}
        ref={imageFileInput}
      />

      {/*Banner Form*/}
      <div className="w-full flex flex-row mt-[1.2rem] gap-[1.2rem]">
        {/*Tips*/}
        <div className="w-[40%] bg-white rounded-2xl border-[1px] border-mainBorderColor p-[1.2rem] h-min text-[0.8rem] max-[1400px]:text-[0.7rem]">
          <div className="w-full bg-gray-50 rounded-xl border-gray-300 border-[1px]">
            <p className="px-[0.6rem] py-[0.8rem] text-gray-600">
              Используйте прямоугольное изображение
              <br /> (прим: 1000x480px), с расположением объекта по правой трети
              кадра
            </p>
          </div>
          <div className="w-full bg-gray-50 rounded-xl border-gray-300 border-[1px] mt-[1rem]">
            <p className="px-[0.6rem] py-[0.8rem] text-gray-600">
              Необходимо использовать изображение со сплошной заливкой и
              отсутствием прозрачности
            </p>
          </div>
          <div className="w-full bg-gray-50 rounded-xl border-gray-300 border-[1px] mt-[1rem]">
            <p className="px-[0.6rem] py-[0.8rem] text-gray-600">
              Для повышения скорости загрузки страницы рекомендуется сжать
              изображение
            </p>
          </div>

          <div
            onClick={handleImageUploadClick}
            className="w-full bg-mainAccent text-center  text-white hover:bg-fuchsia-500 transition-colors duration-300 flex flex-row items-center justify-center gap-[0.5rem] mt-[1rem] py-[0.7rem] rounded-xl cursor-pointer"
          >
            <p>Выбрать изображение</p>
          </div>
        </div>

        {/*Form*/}
        <div className="w-full bg-white rounded-2xl border-[1px] border-mainBorderColor p-[1.2rem]">
          <Form {...form}>
            <form
              className="grid gap-4 max-md:flex max-md:flex-col"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              {/*Poster Top Subtitle*/}
              <div className="flex flex-row  gap-[1.2rem]">
                <div className="flex w-[60%]">
                  <FormField
                    control={form.control}
                    name="posterTopSubtitle"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Подзаголовок
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Текст подзаголовка"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                            onChange={(event) => {
                              // handleImageUpload(event);
                              setPosterTopSubtitle(event.target.value);
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*Color Picker*/}
                <div className="flex flex-col  w-[50%]">
                  <p className="text-slate-700 text-[1rem] font-[500]">Цвет</p>
                  <div className="flex flex-row items-center gap-[1rem] w-full">
                    <Input
                      placeholder="#B3B3B3"
                      className="placeholder:text-slate-400 w-full mt-[8px]"
                      value={topSubtitleColor}
                      onChange={(e) => setTopSubtitleColor(e.target.value)}
                    />
                    <Popover>
                      <PopoverTrigger className="w-full hover:opacity-70 transition-opacity duration-300 flex items-center">
                        <div className="w-full flex flex-row items-center justify-center gap-[0.5rem] border-[1px] border-mainAccent bg-white text-mainAccent py-[8px] px-[12px] rounded-xl mt-[8px]">
                          <Brush strokeWidth={1.2} size={18} />
                          <p className="text-[0.8rem] max-[1340px]:text-[0.7rem]">
                            Выбрать цвет
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-min">
                        <HexColorPicker
                          color={topSubtitleColor}
                          onChange={setTopSubtitleColor}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/*Poster Title*/}
              <div className="flex flex-row  gap-[1.2rem]">
                <div className="flex w-[60%]">
                  <FormField
                    control={form.control}
                    name="posterTitle"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Заголовок
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Текст заголовка"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                            onChange={(event) => {
                              // handleImageUpload(event);
                              setPosterTitle(event.target.value);
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*Color Picker*/}
                <div className="flex flex-col  w-[50%]">
                  <p className="text-slate-700 text-[1rem] font-[500]">Цвет</p>
                  <div className="flex flex-row items-center gap-[1rem] w-full">
                    <Input
                      placeholder="#2E2E2E"
                      className="placeholder:text-slate-400 w-full mt-[8px]"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                    />
                    <Popover>
                      <PopoverTrigger className="w-full hover:opacity-70 transition-opacity duration-300 flex items-center">
                        <div className="w-full flex flex-row items-center justify-center gap-[0.5rem] border-[1px] border-mainAccent bg-white text-mainAccent py-[8px] px-[12px] rounded-xl mt-[8px]">
                          <Brush strokeWidth={1.2} size={18} />
                          <p className="text-[0.8rem] max-[1340px]:text-[0.7rem]">
                            Выбрать цвет
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-min">
                        <HexColorPicker
                          color={titleColor}
                          onChange={setTitleColor}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/*Poster Bottom Subtitle*/}
              <div className="flex flex-row  gap-[1.2rem]">
                <div className="flex w-[60%]">
                  <FormField
                    control={form.control}
                    name="posterBottomSubtitle"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Описание
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Описание"
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                            onChange={(event) => {
                              // handleImageUpload(event);
                              setPosterBottomSubtitle(event.target.value);
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*Color Picker*/}
                <div className="flex flex-col  w-[50%]">
                  <p className="text-slate-700 text-[1rem] font-[500]">Цвет</p>
                  <div className="flex flex-row items-center gap-[1rem] w-full">
                    <Input
                      placeholder="#131414"
                      className="placeholder:text-slate-400 w-full mt-[8px]"
                      value={bottomSubtitleColor}
                      onChange={(e) => setBottomSubtitleColor(e.target.value)}
                    />
                    <Popover>
                      <PopoverTrigger className="w-full hover:opacity-70 transition-opacity duration-300 flex items-center">
                        <div className="w-full flex flex-row items-center justify-center gap-[0.5rem] border-[1px] border-mainAccent bg-white text-mainAccent py-[8px] px-[12px] rounded-xl mt-[8px]">
                          <Brush strokeWidth={1.2} size={18} />
                          <p className="text-[0.8rem] max-[1340px]:text-[0.7rem]">
                            Выбрать цвет
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-min">
                        <HexColorPicker
                          color={bottomSubtitleColor}
                          onChange={setBottomSubtitleColor}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="posterTargetURL"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                      Ссылка баннера
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="/artists"
                        className="placeholder:text-slate-400 w-full"
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
                // disabled={true}
              >
                Сохранить изменения
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
export default EditBannerPageContentInner;
