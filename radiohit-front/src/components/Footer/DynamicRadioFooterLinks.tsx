"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

const DynamicRadioFooterLinks = () => {
  const { hasHydrated, isAuthenticated } = useAuth();

  return (
    <Link
      href={`${
        hasHydrated && isAuthenticated ? "/account" : "/radio-register"
      }`}
      className="hover:text-mainAccent transition-colors duration-300 min-[1200px]:max-[1450px]:text-[0.9rem]"
      scroll={false}
    >
      Регистрация радиостанции
    </Link>
  );
};
export default DynamicRadioFooterLinks;
