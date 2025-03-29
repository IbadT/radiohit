"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {Button, buttonVariants} from "@/components/Buttons/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form/form";
import { useAuth } from "@/lib/hooks/useAuth";
import PasswordInput from "@/components/ui/Inputs/PasswordInput";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils/utils";

const formSchema = z.object({
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


const ResetPasswordForm = () => {

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId') as string;
    const secret = searchParams.get('secret') as string;
    const { resetPassword, loading } = useAuth();



    // react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await resetPassword(userId, secret, values.password, values.confirmPassword);
    };

    // Recovery failed
    //
    if (!userId || !secret) {
        return (
            <div className='flex flex-col'>
                <span className="mb-4 w-ful text-center py-[2rem] text-red-500">Ошибка сброса пароля.</span>
                <Link href="/recover" className={cn(buttonVariants({variant: 'mainAccentButton'}))} scroll={false}>
                    Попробовать снова
                </Link>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-600">
                                Ведите новый пароль
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
                    className="rounded-2xl bg-mainAccent hover:bg-[#1c77fb] transition-colors duration-300 "
                >
                    Сбросить пароль
                </Button>
            </form>
        </Form>
    );


}

export default ResetPasswordForm
