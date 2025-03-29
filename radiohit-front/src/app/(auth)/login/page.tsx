import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import LoginForm from "@/components/Forms/AuthForms/LoginForm";
import { Shell } from "@/components/ui/Shells/shell";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Вход",
  description: "Войдите в свой аккаунт",
};

const Login = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg min-[1900px]:scale-[1.2]">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Вход</CardTitle>
            <CardDescription>Авторизируйтесь в своем аккаунте</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Данные авторизации
                </span>
              </div>
            </div>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              <span className="mr-1 hidden sm:inline-block">Нет аккаунта?</span>
              <Link
                scroll={false}
                aria-label="Регистрация"
                href="/register"
                className="text-primary hover:text-mainAccent transition-colors duration-300"
              >
                Регистрация
              </Link>
            </div>
            <Link
              scroll={false}
              aria-label="Восстановить пароль"
              href="/recover"
              className="text-sm text-primary hover:text-mainAccent transition-colors duration-300"
            >
              Восстановить пароль
            </Link>
          </CardFooter>
        </Card>
      </Shell>
    </>
  );
};

export default Login;
