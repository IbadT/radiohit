"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { ImagePlus, Loader2, MoveRight, Plus } from "lucide-react";
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
});

// const AddNewsPostContent = () => {
//   const { addNewsPost, loading } = useAdminActions();

//   //Image refs
//   const [imageFile, setImageFile] = React.useState<File>();
//   const imageFileInput = React.useRef(null);
//   const imageRef = React.useRef(null);

//   //On Upload Image Click
//   const handleImageUploadClick = () => {
//     if (imageFileInput.current) {
//       imageFileInput.current.click();
//     }
//   };

//   //On image file selected
//   const handleImageFileChange = async (e) => {
//     const imageFile = e.target.files[0];
//     if (!imageFile) return;
//     if (imageFile.size > 5000000) {
//       toast({
//         title: `Ошибка`,
//         description: `Максимальный размер файла 5 мегабайт`,
//         variant: "destructive2",
//       });
//       return;
//     } else {
//       setImageFile(imageFile);
//       uploader(e);
//     }
//   };

//   //Show uploaded image in UI
//   function useDisplayImage() {
//     const [result, setResult] = React.useState("");

//     function uploader(e) {
//       const imageFile = e.target.files[0];
//       const reader = new FileReader();
      
//       reader.addEventListener("load", (e) => {
//         // Создаем изображение для оптимизированного предпросмотра
//         const img = new Image();
//         img.src = e.target.result;
        
//         img.onload = () => {
//           // Создаем canvas для контроля качества
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
          
//           // Устанавливаем размеры (можно ограничить максимальный размер)
//           const maxWidth = 1200;
//           const scale = Math.min(maxWidth / img.width, 1);
//           canvas.width = img.width * scale;
//           canvas.height = img.height * scale;
          
//           // Рисуем изображение с сохранением качества
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
//           // Получаем данные в хорошем качестве
//           setResult(canvas.toDataURL('image/jpeg', 0.9));
//         };
//       });
      
//       reader.readAsDataURL(imageFile);
//     }
  
//     return { result, uploader };
//   }

//   //   function uploader(e) {
//   //     const imageFile = e.target.files[0];
//   //     const reader = new FileReader();
//   //     reader.addEventListener("load", (e) => {
//   //       setResult(e.target.result);
//   //     });
//   //     reader.readAsDataURL(imageFile);
//   //   }

//   //   return { result, uploader };
//   // }

//   //Get image result from uploader
//   const { result, uploader } = useDisplayImage();

//   // react-hook-form
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//     },
//   });

//   //Submit handler
//   async function onSubmit(values: z.infer<typeof formSchema>, e) {
//     //Check is image added
//     if (!imageFile) {
//       toast({
//         title: `Изображение не выбрано`,
//         description: `Необходимо добавить изображение`,
//         variant: "destructive2",
//       });
//       return;
//     }

//     //Check if image file lower than 5mb
//     if (imageFile.size > 5000000) {
//       toast({
//         title: `Ошибка`,
//         description: `Максимальный размер файла 5 мегабайт`,
//         variant: "destructive2",
//       });
//       return;
//     }

//     await addNewsPost(values.title, values.description, imageFile);
//   }














  const AddNewsPostContent = () => {
    const { addNewsPost, loading } = useAdminActions();
  
    //Image refs
    const [imageFile, setImageFile] = React.useState<File>();
    const imageFileInput = React.useRef(null);
    const imageRef = React.useRef(null);
  
    // Функция для подготовки изображения перед загрузкой
    async function prepareImageForUpload(file: File): Promise<File> {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Определяем оптимальные размеры
          const maxDimension = 2000; // Максимальная ширина/высота
          let width = img.width;
          let height = img.height;
          
          if (width > maxDimension || height > maxDimension) {
            const ratio = Math.min(maxDimension / width, maxDimension / height);
            width = width * ratio;
            height = height * ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Рисуем с высоким качеством
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Конвертируем в Blob с сохранением качества
          canvas.toBlob((blob) => {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          }, 'image/jpeg', 0.85); // 85% качество JPEG
        };
      });
    }
  
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
          // setResult(e.target.result);
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
        title: "",
        description: "",
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
  
      //Check if image file lower than 5mb
      if (imageFile.size > 5000000) {
        toast({
          title: `Ошибка`,
          description: `Максимальный размер файла 5 мегабайт`,
          variant: "destructive2",
        });
        return;
      }
  
      try {
        // Оптимизируем изображение перед загрузкой
        const optimizedImage = await prepareImageForUpload(imageFile);
        await addNewsPost(values.title, values.description, optimizedImage);
      } catch (error) {
        toast({
          title: `Ошибка обработки изображения`,
          description: `Не удалось оптимизировать изображение`,
          variant: "destructive2",
        });
      }
    }

  return (
    <div className="w-full h-full flex flex-col">
      {/*Page Header*/}
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-[500] text-[1.4rem] pl-[0.5rem]">Добавить новость</p>
        <Link
          href="/news"
          className={cn(
            "flex flex-row items-center gap-[0.5rem] text-gray-500 text-[0.9rem] transition-colors duration-300 hover:text-fuchsia-700"
          )}
        >
          Все новости
          <MoveRight strokeWidth={1.5} size={18} />
        </Link>
      </div>

      {/*Page Form*/}
      <div className="w-full mt-[1.2rem] flex flex-row gap-[1.2rem]">
        <div className="w-[50%] h-min bg-white border-[1px] border-mainBorderColor p-[1.2rem] rounded-2xl flex flex-col sticky top-[1.5rem]">
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
              "flex flex-row items-center gap-[0.5rem] mt-[1rem] cursor-pointer"
            )}
            onClick={handleImageUploadClick}
          >
            {!imageFile ? "Добавить изображение" : "Изменить изображение"}
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
                      Заголовок новости
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                      Описание новости
                    </FormLabel>
                    <FormControl>
                      <MDEditor
                        className="h-[500px!important] w-full rounded-2xl"
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
                Добавить новость +
                {/* <Plus className="" size={20} strokeWidth={1.2} /> */}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddNewsPostContent;
