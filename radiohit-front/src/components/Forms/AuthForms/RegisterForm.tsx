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
import { Input } from "@/components/ui/Inputs/input";
import { PasswordInput } from "@/components/ui/Inputs/PasswordInput";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Введите ваше имя" })
    .max(60, { message: "Превышена максимально допустимая длинна" }),
  email: z.string().trim().min(2, { message: "Введите email адрес" }).email({
    message: "Некорректный формат email",
  }),
  password: z
    .string()
    .min(8, { message: "Минимальная длинна пароля 8 символов" })
    .min(8)
    .max(50),
  confirmPassword: z
    .string()
    .min(8, { message: "Минимальная длинна пароля 8 символов" })
    .min(8)
    .max(50),
}).refine(({password, confirmPassword})=> password === confirmPassword, {
    message: 'Пароли не совпадают',
    path: ["confirmPassword"]
});

const RegisterForm = () => {
  const { register, loading } = useAuth();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await register(values.email, values.password, values.name);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">Ваше имя</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">Email адрес</FormLabel>
              <FormControl>
                <Input
                  placeholder="myemail@mail.ru"
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
          name="password"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">Повторите пароль</FormLabel>
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

export default RegisterForm;
