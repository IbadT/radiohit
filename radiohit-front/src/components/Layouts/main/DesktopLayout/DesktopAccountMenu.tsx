"use client";

import {
  ChevronRight,
  Cloud,
  CreditCard,
  Download,
  DownloadCloud,
  Github,
  Keyboard,
  LifeBuoy,
  ListTodo,
  LogOut,
  Mail,
  MessageSquare,
  Music4,
  Plus,
  PlusCircle,
  Settings,
  Upload,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu/dropdown-menu";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import * as React from "react";

const DesktopAccountMenu = ({ userDocument }) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <ChevronRight
          strokeWidth={1.5}
          size={30}
          className={`hover:opacity-75 transition-all duration-200 cursor-pointer ${
            open ? "rotate-90" : ""
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem] mr-[1.9rem] mt-[0.8rem] text-slate-600">
        <DropdownMenuGroup>
          {/*Account page*/}
          <Link href="/account" scroll={false}>
            <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
              <User className="mr-2 h-4 w-4" />
              <span>Мой аккаунт</span>
            </DropdownMenuItem>
          </Link>

          {/*Already uploaded tracks => for Artist*/}
          {userDocument.role == "artist" && (
            <Link href="/account/uploaded-tracks" scroll={false}>
              <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
                <ListTodo className="mr-2 h-4 w-4" />
                <span>Загруженные треки</span>
              </DropdownMenuItem>
            </Link>
          )}

          {/*Favorite tracks*/}
          <Link href="/account/favorites" scroll={false}>
            <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
              <Music4 className="mr-2 h-4 w-4" />
              <span>Избранные треки</span>
            </DropdownMenuItem>
          </Link>
          {/*Upload track => for Artist*/}
          {userDocument.role != "radio" && (
            <Link href="/account/upload-track" scroll={false}>
              <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
                <Upload className="mr-2 h-4 w-4" />
                <span>Загрузить трек</span>
              </DropdownMenuItem>
            </Link>
          )}
          {/*Download tracks => for Radio*/}
          {userDocument.role == "radio" && (
            <Link href="/account/download-tracks" scroll={false}>
              <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
                <Download className="mr-2 h-4 w-4" />
                <span>Скачанные треки</span>
              </DropdownMenuItem>
            </Link>
          )}

          {/*Settings*/}
          <Link href="/account/settings" scroll={false}>
            <DropdownMenuItem className="cursor-pointer hover:!text-mainAccent transition-colors duration-300 hover:!bg-fuchsia-50">
              <Settings className="mr-2 h-4 w-4" />
              <span>Настройки аккаунта</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer hover:!text-red-500 transition-colors duration-300 hover:!bg-fuchsia-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выход</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopAccountMenu;
