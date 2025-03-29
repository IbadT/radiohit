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
import { Textarea } from "@/components/ui/TextArea/textarea";

const ChangeDescriptionForm = () => {
  const {
    loading,
    userDocument,
    changeUserDescription,
    hasHydrated,

  } = useUser();

  return (
    <>
      {hasHydrated && (
        <ChangeDescriptionFormComponent
          changeUserDescription={changeUserDescription}
          loading={loading}
          defaultUserDescription={ userDocument.role == 'artist' ? userDocument.artistDescription : userDocument.radioDescription ?? ''}
        />
      )}
    </>
  );
};
export default ChangeDescriptionForm;

const ChangeDescriptionFormComponent = ({
  changeUserDescription,
  loading,
  defaultUserDescription,
}) => {
  const formSchema = z.object({
    newDescription: z
      .string()
      .min(10, { message: "Минимальная длинна описания 10 символов" })
      .max(5000),
  });
  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newDescription: defaultUserDescription,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (defaultUserDescription == values.newDescription) return;
    await changeUserDescription(values.newDescription);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="newDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-[1rem]">
                Введите новое описание
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ваше описание"
                  className="resize-none placeholder:text-slate-400 h-[120px]"
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
          Изменить описание
        </Button>
      </form>
    </Form>
  );
};
