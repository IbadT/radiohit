'use client'

import Link from "next/link";
import { buttonVariants } from "@/components/Buttons/Button";
import { cn } from "@/lib/utils/utils";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <title>404 Страница не найдена</title>
      <meta name="description" content="404 Страница не найдена" />
      <div className="w-full h-[100vh] overflow-hidden bg-white flex flex-col items-center justify-center align-middle">
        <h2 className="font-[700] text-[4rem]">404</h2>
        <p className="text-[1.6rem] mb-[1.5rem] font-[300]">
          Страница не найдена
        </p>
        <a
          href="https://radiohit.by"
          className={cn(
            "flex flex-row gap-[10px]",
            buttonVariants({ variant: "register" })
          )}
        >
          <ArrowLeft strokeWidth={1} />
          Вернуться на главную
        </a>
      </div>
    </>
  );
}
