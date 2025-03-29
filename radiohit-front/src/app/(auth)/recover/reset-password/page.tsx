import { Metadata } from "next";
import { Shell } from "@/components/ui/Shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import ResetPasswordForm from "@/components/Forms/AuthForms/ResetPasswordForm";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Сброс пароля",
};

const ResetPasswordPage = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg min-[1900px]:scale-[1.2]">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Сброс пароля</CardTitle>
            <CardDescription>Введите новый пароль аккаунта</CardDescription>
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
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </Shell>
    </>
  );
};

export default ResetPasswordPage;
