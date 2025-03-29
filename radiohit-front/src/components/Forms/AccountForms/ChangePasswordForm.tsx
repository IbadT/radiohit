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
} from "@/components/ui/Form/form";
import { PasswordInput } from "@/components/ui/Inputs/PasswordInput";
import { useUser } from "@/lib/hooks/useUser";

const formSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Минимальная длинна пароля 8 символов" })
    .min(8)
    .max(50),
  newPassword: z
    .string()
    .min(8, { message: "Минимальная длинна пароля 8 символов" })
    .min(8)
    .max(50),
});

const ChangePasswordForm = () => {
  const { changeUserPassword, loading } = useUser();
  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await changeUserPassword(values.newPassword, values.oldPassword);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-[1rem]">
                Введите текущий пароль аккаунта
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
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-[1rem]">
                Введите новый пароль
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
          className="rounded-xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 w-[40%] max-lg:w-full"
        >
          Изменить пароль
        </Button>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
