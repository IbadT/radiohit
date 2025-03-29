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
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
    email: z
        .string().trim()
        .min(2, { message: "Введите email адрес" })
        .email({
            message: "Некорректный формат email",
        })
});

const RecoverPasswordForm = () => {
    const { recoverPassword, loading } = useAuth();

    // react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await recoverPassword(values.email);
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
                            <FormLabel className="text-slate-600">Ведите ваш Email</FormLabel>
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
                <Button
                    disabled={loading}
                    isLoading={loading}
                    className="rounded-2xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 "
                >
                    Восстановить пароль
                </Button>
            </form>
        </Form>
    );
};

export default RecoverPasswordForm;
