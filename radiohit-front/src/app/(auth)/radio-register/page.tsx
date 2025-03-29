import { Metadata } from "next";
import { Shell } from "@/components/ui/Shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import RadioRegisterForm from "@/components/Forms/AuthForms/RadioRegisterForm";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Регистрация радиостанции",
  description: "Регистрация на платформе",
};

const RadioRegister = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Регистрация радиостанции</CardTitle>
            <CardDescription>
              Зарегистрируйте вашу радиостанцию на платформе
            </CardDescription>
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
            <RadioRegisterForm />
          </CardContent>
        </Card>
      </Shell>
    </>
  );
};

export default RadioRegister;
