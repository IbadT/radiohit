"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip/tooltip";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/Separator/separator";
import {usePlayer} from "@/lib/hooks/usePlayer";

const HeaderElements = () => {
  const { logout } = useAuth();
    const {
        stopAndDeleteTrackData
    } = usePlayer();

  const date = new Date();
  const day = date.toLocaleString("ru-RU", { day: "numeric" });
  const weekDay = date.toLocaleString("ru-RU", { weekday: "short" });

  const getMonthNameInGenitiveCase = (date) =>
    [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ][date.getMonth()];

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center gap-[0.5rem] flex-nowrap whitespace-nowrap text-gray-500 font-[400] text-[0.9rem] pointer-events-none select-none bg-[#fbfafd] py-[0.6rem] px-[1rem] rounded-xl border-[1px] border-gray-200">
        <p className="capitalize">{weekDay}</p>
        <p>{day}</p>
        <p className="capitalize">{getMonthNameInGenitiveCase(date)}</p>
      </div>

      <Separator
        orientation="vertical"
        className="mx-[1.8rem] h-10 w-[2px] bg-gray-200"
      />

      {/*Logout*/}
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <LogOut
              strokeWidth={1.8}
              size={22}
              className="text-[1rem] transition-colors duration-300 hover:text-red-500 text-slate-500"
              onClick={() => {
                  stopAndDeleteTrackData()
                  logout()
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Выход</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
export default HeaderElements;
