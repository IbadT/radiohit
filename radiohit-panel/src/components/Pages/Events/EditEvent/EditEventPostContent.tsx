"use client";

import { cn } from "@/lib/utils/utils";
import { Import, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { Input } from "@/components/ui/Inputs/input";
import { Button, buttonVariants } from "@/components/Buttons/Button";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => {
    return (
      <div className="h-[500px!important] w-full rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-[1rem]">
        <Loader2
          strokeWidth={1.5}
          className="h-[3rem] w-[3rem] animate-spin text-gray-400"
        />
        <p className="text-gray-400">Загрузка редактора...</p>
      </div>
    );
  },
});
import * as commands from "@uiw/react-md-editor/commands";
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
import DeleteEventPopup from "@/components/Popups/DeletePopups/DeleteEventPopup";
import Image from "next/image";

const {} = commands;

//Form schema
const formSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Минимальная длинна заголовка 10 символов",
    })
    .max(256, {
      message: "Превышена максимальная длинна заголовка",
    }),
  description: z
    .string()
    .min(20, {
      message: "Минимальная длинна описания 20 символов",
    })
    .max(10000, {
      message: "Превышена максимальная длинна описания",
    }),
  eventTime: z
    .string()
    .min(4, {
      message: "Укажите время мероприятия",
    })
    .max(10, {
      message: "Превышена максимальная длинна",
    }),
  eventAddress: z
    .string()
    .min(4, {
      message: "Укажите адрес мероприятия",
    })
    .max(200, {
      message: "Превышена максимальная длинна",
    }),
  eventDate: z
    .string()
    .min(4, {
      message: "Укажите дату мероприятия",
    })
    .max(10, {
      message: "Превышена максимальная длинна",
    }),
  eventPhone1: z
    .string()
    .min(4, {
      message: "Укажите номер телефона",
    })
    .max(20, {
      message: "Превышена максимальная длинна",
    })
    .optional()
    .or(z.literal("")),
  eventPhone2: z
    .string()
    .min(4, {
      message: "Укажите номер телефона",
    })
    .max(20, {
      message: "Превышена максимальная длинна",
    })
    .optional()
    .or(z.literal("")),
});

const EditEventPostContent = ({ post }) => {
  const { updateEventPost, loading } = useAdminActions();

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
      title: post.title,
      description: post.description,
      eventDate: post.eventDate,
      eventTime: post.eventTime,
      eventAddress: post.eventAddress,
      eventPhone1: post.eventContactPhones[0],
      eventPhone2: post.eventContactPhones[1],
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

    if (imageFile) {
      return await updateEventPost(
        post.$id,
        values.title,
        values.description,
        values.eventDate,
        values.eventTime,
        values.eventAddress,
        values.eventPhone1 ?? "",
        values.eventPhone2 ?? "",
        post.imageID,
        post.imageURL,
        imageFile
      );
    } else {
      return await updateEventPost(
        post.$id,
        values.title,
        values.description,
        values.eventDate,
        values.eventTime,
        values.eventAddress,
        values.eventPhone1 ?? "",
        values.eventPhone2 ?? "",
        post.imageID,
        post.imageURL
      );
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">
          Редактировать мероприятие
        </p>
        <DeleteEventPopup
          docID={post.$id}
          imageFileID={post.imageID}
          type="button"
          refetch={undefined}
        />
      </div>

      {/*Page Form*/}
      <div className="w-full mt-[1.2rem] flex flex-row gap-[1.2rem]">
        <div className="w-[50%] h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col sticky top-[1.5rem]">
          {/*Image*/}
          <div className="w-full h-[14vw] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover relative">
            {!imageFile && (
              <Image
                src={post.imageURL}
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

          <p className="text-slate-400 font-[500] text-[0.8rem] text-center mt-[1rem] min-[1200px]:max-[1420px]:text-[0.7rem]">
            Рекомендуется сжать изображение перед загрузкой
            <br className="max-md:hidden" /> Максимальный размер файла 5
            мегабайт
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
        <div
          className="w-full bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl"
          data-color-mode="light"
        >
          <Form {...form}>
            <form
              className="grid gap-4 max-md:flex max-md:flex-col"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                      Заголовок мероприятия
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Текст заголовка"
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
                name="eventAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                      Адрес мероприятия
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Минск, просп. Победителей, 111"
                        className="placeholder:text-slate-400 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row gap-[1.5rem]">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                        Дата мероприятия
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="12.08.2024"
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
                  name="eventTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                        Начало
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="20:00"
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
                  name="eventPhone1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                        Контактный телефон 1
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="+375 29 123 45 67"
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
                  name="eventPhone2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                        Контактный телефон 2
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="+375 29 123 45 67"
                          className="placeholder:text-slate-400 w-full"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                      Описание мероприятия
                    </FormLabel>
                    <FormControl>
                      <MDEditor
                        className="!h-[500px] w-full rounded-2xl"
                        {...field}
                        preview="edit"
                        commands={[
                          {
                            ...commands.bold,
                            buttonProps: {
                              "aria-label": "Выделить текст",
                              title: "Выделить текст",
                            },
                          },
                          {
                            ...commands.italic,
                            buttonProps: {
                              "aria-label": "Курсив",
                              title: "Курсив",
                            },
                          },
                          {
                            ...commands.strikethrough,
                            buttonProps: {
                              "aria-label": "Зачеркнутый текст",
                              title: "Зачеркнутый текст",
                            },
                          },
                          commands.divider,
                          {
                            ...commands.link,
                            buttonProps: {
                              "aria-label": "Добавить ссылку",
                              title: "Добавить ссылку",
                            },
                            value: "[ Текст ссылки ]( URL ссылки )",
                          },
                          {
                            ...commands.quote,
                            buttonProps: {
                              "aria-label": "Добавить цитату",
                              title: "Добавить цитату",
                            },
                          },
                          {
                            ...commands.orderedListCommand,
                            buttonProps: {
                              "aria-label": "Добавить список",
                              title: "Добавить список",
                            },
                          },
                          {
                            ...commands.orderedListCommand,
                            buttonProps: {
                              "aria-label": "Добавить нумерованный список",
                              title: "Добавить нумерованный список",
                            },
                          },
                          commands.divider,
                          {
                            ...commands.image,
                            buttonProps: {
                              "aria-label": "Добавить изображение",
                              title: "Добавить изображение",
                            },
                            value: "![image]( URL изображения )",
                          },
                        ]}
                        extraCommands={[
                          {
                            ...commands.codePreview,
                            buttonProps: {
                              "aria-label": "Показать только результат",
                              title: "Показать только результат",
                            },
                          },
                          {
                            ...commands.codeLive,
                            buttonProps: {
                              "aria-label": "Разделить редактор",
                              title: "Разделить редактор",
                            },
                          },
                          {
                            ...commands.codeEdit,
                            buttonProps: {
                              "aria-label": "Показать только разметку",
                              title: "Показать только разметку",
                            },
                          },
                          {
                            ...commands.fullscreen,
                            buttonProps: {
                              "aria-label": "На весь экран",
                              title: "На весь экран",
                            },
                          },
                        ]}
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
                <Import className="" size={20} strokeWidth={1.2} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default EditEventPostContent;
