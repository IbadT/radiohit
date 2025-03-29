import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { CalendarClock, Clock3, Music2 } from "lucide-react";
import * as React from "react";
import Image from "next/image";

const HomeLastEventsCard =  ({lastEvents}) => {
  return (
    <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.1rem] px-[1.5rem] max-md:px-[1rem] max-md:py-[0.9rem] mb-[1.5rem] max-lg:mb-[1rem]">
      <div className="flex flex-row items-center mb-[1rem] justify-between">
        <h2 className={cn("text-[#373738] font-[600] text-[1.1rem]")}>
          Мероприятия
        </h2>
        <Link
            scroll={false}
          href="/events"
          className="text-[0.85rem] text-[#A8A8A8] transition-colors duration-300 hover:text-mainAccent"
        >
          Список мероприятий
        </Link>
      </div>
      <div className="w-full">
        {lastEvents &&
          lastEvents.documents.map((event) => {
            return (
              <Link
                  scroll={false}
                href={`/events/${event.$id}`}
                key={event.$id}
                className="flex text-slate-700 rounded-2xl p-[1rem] hover:bg-fuchsia-50 transition-colors duration-300 relative w-full h-[5rem] max-xl:h-[24rem] max-md:h-[16rem] overflow-hidden rounded-2xl mb-[0.6rem] group bg-white overflow-hidden border-[1px] border-slate-200 max-xl:h-[5rem] max-md:h-[5rem] hover:border-fuchsia-400"
              >
                <div className="grid grid-cols-3 w-full z-[2] group-hover:text-fuchsia-700  transition-all duration-300 max-md:flex max-md:flex-row ">
                  <div className="flex flex-row items-center gap-[0.5rem]">
                    <Music2 size={20} strokeWidth={2} />
                    <p className="line-clamp-1">{event.title}</p>
                  </div>
                  <div className="flex flex-row items-center gap-[0.5rem] justify-center max-md:justify-start max-md:hidden">
                    <CalendarClock size={20} strokeWidth={2} />
                    <p>{event.eventDate}</p>
                  </div>
                  <div className="flex flex-row items-center gap-[0.5rem] justify-end max-md:hidden">
                    <Clock3 size={20} strokeWidth={2} />
                    <p>{event.eventTime}</p>
                  </div>
                </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-white to-white/100 md:to-background/40 z-[1] w-full h-full group-hover:opacity-90 max-md:opacity-90 transition-opacity duration-300" />
                  <Image
                      src={event.imageURL}
                      alt="news_image"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full bg-cover object-cover z-[0] grayscale group-hover:grayscale-0 transition-all duration-300"
                  />

              </Link>
            );
          })}
        {!lastEvents && (
          <div className="flex flex-col justify-center w-full">
            <div className="w-full h-[10rem] max-md:h-[50vh] text-slate-400 flex flex-col items-center justify-center align-middle bg-white">
              <CalendarClock size={30} strokeWidth={2} />
              <p className="font-[400] text-[1rem] lg:pl-[0.5rem] mt-[0.5rem]">
                Нет мероприятий
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomeLastEventsCard;
