"use client";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

const DynamicAccountFooterLinks = () => {
  const { hasHydrated, isAuthenticated } = useAuth();
  return (
    <>
      <Link
        href={`${hasHydrated && isAuthenticated ? "/account" : "/login"}`}
        className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]"
        scroll={false}
      >
          {hasHydrated && isAuthenticated ? "Мой аккаунт" : "Вход в аккаунт"}
      </Link>
      <Link
        href={`${hasHydrated && isAuthenticated ? "/account/settings" : "/register"}`}
        className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]"
        scroll={false}
      >
          {hasHydrated && isAuthenticated ? "Настройки аккаунта" : "Регистрация аккаунта"}
      </Link>
    </>
  );
};

export default DynamicAccountFooterLinks;
