import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/AspectRatio/AspectRatio";
import { MoveLeft } from "lucide-react";
import auth_image from "@/../public/assets/images/auth2.jpg";
import { cn } from "@/lib/utils/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-3 lg:grid-cols-2 bg-white max-md:p-[0] max-md:h-full">
      <AspectRatio
        ratio={16 / 9}
        className="overflow-hidden rounded-3xl m-[0.5rem] max-md:m-0 max-md:rounded-none max-md:overflow-y-scroll max-md:fixed "
      >
        {/*BG Image*/}
        <Image
          src={auth_image}
          placeholder="blur"
          alt="radiohit"
          quality={100}
          fill
          className="absolute inset-0 object-cover max-md:!fixed max-md:blur-md saturate-150"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/*Gradient*/}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40 max-md:fixed" />
        {/*Back to site link*/}
        <BackToSite className="max-md:hidden" />
        {/*Footer Links*/}
        <AuthFooterLinks className="max-md:hidden" />
      </AspectRatio>
      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1 max-md:p-[0]  max-md:flex-col max-md:translate-y-0 max-md:top-0 max-md:absolute max-md:top-0  max-md:min-h-[100vh] max-md:justify-center md:drop-shadow-2xl">
        <BackToSite className="md:hidden max-md:relative max-md:mb-[25px] max-md:w-[80%] " />
        {children}
        <AuthFooterLinks className="md:hidden max-md:relative max-md:mt-[25px] max-md:mb-[25px]" />
      </main>
    </main>
  );
}

const BackToSite = ({ className }) => {
  return (
    <Link
        scroll={false}
      href="/"
      className={cn(
        "absolute left-8 top-6 z-20 p-[10px] flex items-center text-[1rem] text-slate-[500] font-[300] tracking-tight bg-white rounded-full hover:opacity-75 transition-opacity duration-300 max-md:relative max-md:left-0 max-md:right-0 max-md:mx-[2rem] max-md:justify-center",
        className
      )}
    >
      <MoveLeft strokeWidth={1.5} size={20} />
      <span className="ml-[5px] font-[400] tracking-wide">
        вернуться на сайт
      </span>
    </Link>
  );
};

const AuthFooterLinks = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute bottom-6 left-8 z-1 line-clamp-1 text-base flex flex-row gap-[25px] text-slate-600 max-lg:flex-col max-lg:text-center max-lg:gap-[10px] max-lg:left-3 max-md:left-0 max-md:right-0",
        className
      )}
    >
      <Link
          scroll={false}
        href="/digital-distribution"
        className={cn("transition-colors duration-300 hover:text-mainAccent")}
      >
        Цифровая дистрибуция
      </Link>
      <Link
          scroll={false}
        href="/promotion-and-production"
        className="transition-colors duration-300 hover:text-mainAccent"
      >
        Продвижение и продюсирование
      </Link>
    </div>
  );
};
