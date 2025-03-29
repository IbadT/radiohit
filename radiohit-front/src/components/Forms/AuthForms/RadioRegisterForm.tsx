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
import { PasswordInput } from "@/components/ui/Inputs/PasswordInput";
import { useAuth } from "@/lib/hooks/useAuth";
import { Textarea } from "@/components/ui/TextArea/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/Toaster/use-toast";

const formSchema = z.object({
  radioAgentName: z
    .string()
    .min(3, { message: "Введите имя представителя" })
    .max(60, { message: "Превышена максимально допустимая длинна" }),
  radioName: z
    .string()
    .min(3, { message: "Введите название радиостанции" })
    .max(60, { message: "Превышена максимально допустимая длинна" }),
  radioCity: z
    .string()
    .min(3, { message: "Введите город радиостанции" })
    .max(100, { message: "Превышена максимально допустимая длинна" }),
  radioDescription: z
    .string()
    .min(3, { message: "Введите описание радиостанции" })
    .max(6000, { message: "Превышена максимально допустимая длинна" }),
  radioEmail: z
    .string()
    .trim()
    .min(2, { message: "Введите email адрес" })
    .email({
      message: "Некорректный формат email",
    }),
  radioPassword: z
    .string()
    .min(8, { message: "Минимальная длинна пароля 8 символов" })
    .max(50, { message: "Превышена максимально допустимая длинна" }),
  radioFile: z.any(),
});

const RadioRegisterForm = () => {
  const [fileImage, setFileImage] = useState<File>();

  const { radioRegister, loading } = useAuth();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radioAgentName: "", //
      radioName: "", //
      radioCity: "", //
      radioDescription: "",
      radioEmail: "", //
      radioPassword: "", //
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!fileImage) {
      toast({
        title: `Лого не выбрано`,
        description: `Необходимо добавить лого радиостанции`,
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
      await radioRegister(
        values.radioEmail,
        values.radioPassword,
        values.radioName,
        values.radioAgentName,
        values.radioCity,
        values.radioDescription,
        fileImage
      );
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="radioAgentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Имя представителя радиостанции
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Иванов Иван"
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
          name="radioName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Название радиостанции
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Лучшее радио"
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
          name="radioCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Город радиостанции
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Москва"
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
          name="radioDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Краткое описание радиостанции
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Мы лучшая радиостанция Москвы"
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
          name="radioFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Добавьте лого радиостанции
              </FormLabel>
              <FormControl className="cursor-pointer">
                <Input
                  className="block h-auto w-full text-sm text-slate-500 file:bg-mainAccent file:text-white file:p-[8px] file:mr-[1rem] file:rounded-xl hover:file:bg-fuchsia-600 transition-colors duration-300 file:transition-colors file:duration-300 file:cursor-pointer file:w-[50%]"
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    //@ts-ignore
                    setFileImage(e.target.files[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                Максимальный размер файла 5 мегабайт
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="radioEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">Email адрес</FormLabel>
              <FormControl>
                <Input
                  placeholder="radioEmail@mail.ru"
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
          name="radioPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">
                Придумайте пароль
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="**********"
                  className="placeholder:text-slate-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          isLoading={loading}
          className="rounded-2xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 "
        >
          Регистрация
        </Button>
      </form>
    </Form>
  );
};

export default RadioRegisterForm;
