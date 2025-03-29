"use client";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/Avatar/avatar";
import { useAuth } from "@/lib/hooks/useAuth";
import {Loader2, LogIn, User2, UserCircle2} from "lucide-react";
import * as React from "react";
import Link from "next/link";
import MobileAccountMenu from "@/components/Layouts/main/MobileLayout/MobileAccountMenu";

const DynamicMobileButtons = () => {
  const { isAuthenticated, hasHydrated, userDocument } = useAuth();

  return (
    <>
      {!hasHydrated && (
        <Avatar className="w-[38px] h-[38px]">
          <AvatarFallback className="bg-gray-200">
            <Loader2 className=" h-5 w-5 animate-spin text-gray-400" />
          </AvatarFallback>
        </Avatar>
      )}
      {hasHydrated && !isAuthenticated && (
        <Link href="/login" scroll={false}>
          <Avatar className="w-[38px] h-[38px]">
            <AvatarFallback className='bg-white'>
              <LogIn strokeWidth={0.9} size={28} />
            </AvatarFallback>
          </Avatar>
        </Link>
      )}
      {hasHydrated && isAuthenticated && (
          <MobileAccountMenu/>
      )}
    </>
  );
};

export default DynamicMobileButtons;
