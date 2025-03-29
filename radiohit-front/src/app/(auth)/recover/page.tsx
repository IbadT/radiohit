import { Metadata } from "next";
import { Shell } from "@/components/ui/Shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import Link from "next/link";
import RecoverPasswordForm from "@/components/Forms/AuthForms/RecoverPasswordForm";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Восстановление пароля",
};

const RecoverPasswordPage = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg min-[1900px]:scale-[1.2]">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
            <CardDescription>
              Введите email от вашего аккаунта
              <span className="max-md:hidden"> radiohit.by</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Сброс Пароля
                </span>
              </div>
            </div>
            <RecoverPasswordForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground flex flex-row items-center justify-center w-full">
              <span className="mr-1  sm:inline-block">Вспомнили пароль?</span>
              <Link
                scroll={false}
                aria-label="Вход"
                href="/login"
                className="text-primary hover:text-mainAccent transition-colors duration-300"
              >
                Войти в аккаунт
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Shell>
    </>
  );
};

export default RecoverPasswordPage;
