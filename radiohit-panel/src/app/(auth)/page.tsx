import { Shell } from "@/components/ui/Shells/shell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import { MoveRight } from "lucide-react";
import GlobalFullLogo from "@/components/Logo/GlobalFullLogo";

const AuthPage = () => {
  return (
      <div className='flex flex-col w-full'>
        <div className='flex w-full justify-center mx-auto align-center relative'>
          <GlobalFullLogo classnames='absolute w-[14rem] top-[-60px]'/>
        </div>
    <Shell className="max-w-md min-[1900px]:scale-[1.2]">
      <Card className="rounded-2xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center tracking-normal">
            Авторизация
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pb-[1rem]">
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-sm text-muted-foreground">
            <a
              aria-label="Вернуться на сайт"
              href="https://radiohit.by"
              target="_self"
              className="text-slate-500 hover:text-mainAccent transition-colors duration-300 flex flex-row items-center"
            >
              Вернуться на сайт
              <MoveRight strokeWidth={1.2} size={18} className="ml-[0.5rem]" />
            </a>
          </div>
        </CardFooter>
      </Card>
    </Shell>
      </div>
  );
};
export default AuthPage;
