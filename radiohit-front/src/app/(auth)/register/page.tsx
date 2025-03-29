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
import RegisterForm from "@/components/Forms/AuthForms/RegisterForm";
import { Shell } from "@/components/ui/Shells/shell";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрация на платформе",
};

const Register = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg min-[1900px]:scale-[1.2]">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Регистрация</CardTitle>
            <CardDescription>Зарегистрируйтесь на платформе</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Данные регистрации
                </span>
              </div>
            </div>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground text-center flex flex-row justify-center items-center w-full">
              <span className="mr-1 sm:inline-block">Уже есть аккаунт?</span>
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

export default Register;
