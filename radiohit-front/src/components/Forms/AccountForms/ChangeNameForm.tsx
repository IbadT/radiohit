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
import { useUser } from "@/lib/hooks/useUser";
import { Input } from "@/components/ui/Inputs/input";


const ChangeNameForm = () => {
    const { changeUsername, loading, userDocument, hasHydrated } = useUser();

    return (
      <>
        {hasHydrated && (
          <ChangeNameFormComponent
            changeUsername={changeUsername}
            loading={loading}
            defaultUsername={userDocument.name}
          />
        )}
      </>
    );
}
export default ChangeNameForm

const ChangeNameFormComponent = ({changeUsername, loading, defaultUsername}) => {

  const formSchema = z.object({
    newName: z
      .string()
      .min(3, { message: "Минимальная длинна имени 3 символа" })
      .max(50),
  });
  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // newName: "",
        newName: defaultUsername
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (defaultUsername == values.newName) return;
    await changeUsername(values.newName);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="newName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-[1rem]">
                 Введите новое имя
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Новое имя"
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
          Изменить имя
        </Button>
      </form>
    </Form>
  );
};
