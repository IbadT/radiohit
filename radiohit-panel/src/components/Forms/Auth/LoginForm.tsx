"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { deleteWhitespacesOnSides } from "@/lib/utils/utils";

const formSchema = z.object({
  email: z.string().min(2, { message: "Введите email адрес" }).email({
    message: "Некорректный формат email",
  }),
  password: z.string().min(3, { message: "Введите пароль" }).max(50),
});

const LoginForm = () => {
  const { login, loading } = useAuth();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const email = deleteWhitespacesOnSides(values.email);
    const password = deleteWhitespacesOnSides(values.password);

    await login(email, password);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="lovemusic@mail.ru"
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
              <FormLabel className="text-slate-600">Пароль</FormLabel>
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
          className="rounded-2xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300"
        >
          Войти
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
