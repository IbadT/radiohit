"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/Buttons/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/Form/form";
import { Input } from "@/components/ui/Inputs/input";
import { useUser } from "@/lib/hooks/useUser";
import { Textarea } from "@/components/ui/TextArea/textarea";
import { toast } from "@/components/ui/Toaster/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  artistName: z
    .string()
    .min(2, { message: "Введите имя исполнителя" })
    .max(60, { message: "Превышена максимально допустимая длинна" }),
  artistCountry: z
    .string()
    .min(3, { message: "Введите страну исполнителя" })
    .max(50, { message: "Превышена максимально допустимая длинна" }),
  artistDescription: z
    .string()
    .min(10, { message: "Введите описание исполнителя" })
    .max(5000, { message: "Превышена максимально допустимая длинна" }),
});

const ArtistCreateForm = () => {
  const router = useRouter();
  const [fileImage, setFileImage] = React.useState<File>();
  const {
    loading,
    userDocument,
    hasHydrated,
    isAuthenticated,
    updateUserToArtist,
  } = useUser();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      artistCountry: "",
      artistDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!fileImage) {
      toast({
        title: `Изображение исполнителя не выбрано`,
        description: `Необходимо добавить изображение исполнителя`,
        variant: "destructive2",
      });
      return;
    } else if (fileImage.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    } else {
      await updateUserToArtist(
        values.artistName,
        values.artistCountry,
        values.artistDescription,
        fileImage
      );
    }
  };

  React.useEffect(() => {
    if (hasHydrated && isAuthenticated && userDocument.role != "user") {
      router.replace("/account");
    }
  }, [hasHydrated, isAuthenticated]);

  // @ts-ignore
    return (

      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="artistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600">
                  Имя исполнителя (группы)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Клава Кока"
                    autoComplete="true"
                    className="placeholder:text-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artistCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600">
                  Страна исполнителя
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Беларусь"
                    autoComplete="true"
                    className="placeholder:text-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artistDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600">
                  Краткое описание
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Выступаю с лучшими песнями..."
                    className="resize-none placeholder:text-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            //@ts-ignore
            name="artistImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600">
                  Добавьте изображение исполнителя
                </FormLabel>
                <FormControl className="cursor-pointer">
                  <Input
                    className="block h-auto w-full text-sm text-slate-500 file:bg-mainAccent file:text-white file:p-[8px] file:mr-[1rem] file:rounded-xl hover:file:bg-fuchsia-500 transition-colors duration-300 file:transition-colors file:duration-300 file:cursor-pointer w-full file:w-[50%]"
                    type="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      setFileImage(e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-center">
                  Изображение должно быть в формате 1:1 (квадрат)
                  <br /> Например: 500x500px.Максимальный размер файла 5
                  мегабайт
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            isLoading={loading}
            className="rounded-2xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 "
          >
            Сохранить
          </Button>
        </form>
      </Form>
  );
};
export default ArtistCreateForm;
