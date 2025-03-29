"use client";
import {
  DialogSearch,
  DialogSearchContent,
  DialogSearchTrigger,
} from "@/components/Search/DialogSearch";
import { SearchInputMain } from "@/components/Search/SearchInputMain";
import { Button } from "@/components/Buttons/Button";
import { useEffect, useState } from "react";
import {
  SearchArtists,
  SearchClips,
  SearchEvents,
  SearchNews,
  SearchSongs,
} from "@/lib/appwrite/db_services/search.db.service";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import * as React from "react";
import {
  CalendarClock,
  Loader2,
  Mic2,
  MoveRight,
  Music4,
  Newspaper,
  Play,
  Search,
  Video,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/select";
import { cn } from "@/lib/utils/utils";
import { usePlayer } from "@/lib/hooks/usePlayer";
import Image from "next/image";

const MainSearch = ({ buttonVariant }) => {
  //Input state
  const [searchInput, setSearchInput] = useState("");
  //All posts state
  const [foundPosts, setFoundPosts] = useState<any>([]);
  //Open / Close state
  const [open, setOpen] = useState(false);
  //Loading on search state
  const [loading, setLoading] = useState(true);
  //Select state
  const [selectValue, setSelectValue] = useState("songs");
  //Input placeholder state
  const [inputPlaceholder, setInputPlaceholder] = useState("треков");

  const { setSingleTrackData } = usePlayer();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const Deobounce = setTimeout(async () => {
      //Search songs
      if (selectValue == "songs") {
        const posts = (await SearchSongs(searchInput)).documents;
        setFoundPosts(posts);
      }

      //Search news
      if (selectValue == "news") {
        const posts = (await SearchNews(searchInput)).documents;
        setFoundPosts(posts);
      }

      //Search events
      if (selectValue == "events") {
        const posts = (await SearchEvents(searchInput)).documents;
        setFoundPosts(posts);
      }

      //Search clips
      if (selectValue == "clips") {
        const posts = (await SearchClips(searchInput)).documents;
        setFoundPosts(posts);
      }

      //Search clips
      if (selectValue == "artists") {
        const posts = (await SearchArtists(searchInput)).documents;
        setFoundPosts(posts);
      }

      setLoading(false);
    }, 100);

    return () => clearTimeout(Deobounce);
  }, [searchInput, selectValue]);

  //Search input handler
  function handleSearchValChange(e) {
    setSearchInput(e.target.value);
  }

  //Select handler
  function handleSelectChange(value) {
    setSelectValue(value);

    switch (value) {
      case "songs":
        setInputPlaceholder("треков");
        break;
      case "news":
        setInputPlaceholder("новостей");
        break;
      case "artists":
        setInputPlaceholder("исполнителей");
        break;
      case "events":
        setInputPlaceholder("мероприятий");
        break;
      case "clips":
        setInputPlaceholder("клипов");
        break;
      default:
        setInputPlaceholder("треков");
        break;
    }

    setFoundPosts([]);
  }

  //Handle open change
  function handleOpenChange() {
    //Close
    setOpen(!open);
    if (open) {
      //Clear input
      setSearchInput("");
      //Clear data array
      setFoundPosts([]);
      //Set default Select value
      setSelectValue("songs");
      //Set default placeholder
      setInputPlaceholder("треков");
    }
  }

  return (
    <DialogSearch open={open} onOpenChange={handleOpenChange}>
      <DialogSearchTrigger asChild>
        {buttonVariant == "search" ? (
          <Button
            variant={buttonVariant}
            className="flex flex-row justify-center"
          >
            <span className="mr-[10px]">
              <Search strokeWidth={1.8} size={20} />
            </span>
            Поиск треков, новостей, исполнителей...
          </Button>
        ) : (
          <Button
            variant={buttonVariant}
            className="flex flex-row justify-between"
          >
            Поиск на сайте...
            <span className="ml-[10px]">
              <Search strokeWidth={2} size={16} />
            </span>
          </Button>
        )}
      </DialogSearchTrigger>
      <DialogSearchContent className="max-md:pl-[0.5rem] max-md:pr-[0.5rem] max-md:top-[5vh]">
        <div className="flex flex-row items-center justify-between bg-white rounded-xl border-none shadow-2xl">
          {/*Search Input*/}
          <SearchInputMain
            placeholder={`Поиск ${inputPlaceholder}... `}
            className=""
            //@ts-ignore
            boxClassName="w-full"
            onChange={handleSearchValChange}
          />
          {/*Select filter*/}
          <div className="flex flex-row items-center">
            <Select
              onValueChange={handleSelectChange}
              defaultValue={selectValue}
              //@ts-ignore
              classname="border-none outline-none "
            >
              <SelectTrigger className="w-[8rem] outline-none border-none focus:outline-0 focus:border-none focus:ring-0 rounded-xl mr-[5px]">
                <SelectValue placeholder="Искать по" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/*<SelectLabel className='pl-[5px]'>Искать по:</SelectLabel>*/}
                  <SelectItem value="songs" className="cursor-pointer">
                    Треки
                  </SelectItem>
                  <SelectItem value="clips" className="cursor-pointer">
                    Клипы
                  </SelectItem>
                  <SelectItem value="news" className="cursor-pointer">
                    Новости
                  </SelectItem>
                  {/*<SelectItem value="artists" className="cursor-pointer">*/}
                  {/*  Исполнители*/}
                  {/*</SelectItem>*/}
                  {/*<SelectItem value="events" className="cursor-pointer">*/}
                  {/*  Мероприятия*/}
                  {/*</SelectItem>*/}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/*Close action*/}
            <X
              className="mr-[15px] h-4 w-4 cursor-pointer max-md:hidden"
              onClick={handleOpenChange}
            />
          </div>
        </div>

        <ScrollArea className="mt-[20px] max-h-[500px] w-full overflow-y-scroll rounded-2xl bg-white">
          {loading && searchInput != "" && (
            <div className="align-center flex w-full flex-row items-center justify-center py-[20px]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
              <p className="text-slate-600">Поиск...</p>
            </div>
          )}
          {!loading && foundPosts.length == 0 && searchInput != "" && (
            <div className="align-center flex w-full flex-col items-center justify-center py-[20px]">
              <p className="text-slate-600">Ничего не найдено...</p>
            </div>
          )}

          {/*News Search*/}
          {selectValue == "news" &&
            foundPosts &&
            foundPosts.map((post) => {
              return (
                <React.Fragment key={post.$id}>
                  <Link
                    scroll={false}
                    key={post.$id}
                    href={`/news/${post.$id}`}
                    onClick={() => {
                      handleOpenChange();
                    }}
                  >
                    <div className="m-[10px] rounded-2xl p-[15px] hover:bg-fuchsia-50 transition-colors duration-300 flex flex-row text-slate-600 justify-between max-md:py-[0.8rem] max-md:px-[0.6rem]">
                      <div className="flex flex-row gap-[1rem] items-center">
                        <Newspaper size={18} className="max-md:w-[25px]" />
                        <p className="line-clamp-1">{post.title}</p>
                      </div>
                      <MoveRight strokeWidth={1} className="max-md:hidden" />
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}

          {/*Clips Search*/}
          {selectValue == "clips" &&
            foundPosts &&
            foundPosts.map((post) => {
              return (
                <React.Fragment key={post.$id}>
                  <Link
                    scroll={false}
                    key={post.$id}
                    href={`/clips/${post.$id}`}
                    onClick={() => {
                      handleOpenChange();
                    }}
                  >
                    <div className="m-[10px] rounded-2xl p-[15px] hover:bg-fuchsia-50 transition-colors duration-300 flex flex-row text-slate-600 justify-between max-md:py-[0.8rem] max-md:px-[0.6rem]">
                      <div className="flex flex-row gap-[1rem] items-center">
                        <Video size={18} className="max-md:w-[25px]" />
                        <p className="line-clamp-1">{post.title}</p>
                      </div>
                      <MoveRight strokeWidth={1} className="max-md:hidden" />
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}

          {/*Events Search*/}
          {selectValue == "events" &&
            foundPosts &&
            foundPosts.map((post) => {
              return (
                <React.Fragment key={post.$id}>
                  <Link
                    scroll={false}
                    key={post.$id}
                    href={`/events/${post.$id}`}
                    onClick={() => {
                      handleOpenChange();
                    }}
                  >
                    <div className="m-[10px] rounded-2xl p-[15px] hover:bg-fuchsia-50 transition-colors duration-300 flex flex-row text-slate-600 justify-between max-md:py-[0.8rem] max-md:px-[0.6rem]">
                      <div className="flex flex-row gap-[1rem] items-center">
                        <CalendarClock size={18} className="max-md:w-[25px]" />
                        <p className="line-clamp-1">{post.title}</p>
                      </div>
                      <MoveRight strokeWidth={1} className="max-md:hidden" />
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}

          {/*Artists Search*/}
          {selectValue == "artists" &&
            foundPosts &&
            foundPosts.map((artist) => {
              return (
                <React.Fragment key={artist.$id}>
                  <Link
                    scroll={false}
                    href={`/artists/${artist.$id}`}
                    key={artist.$id}
                    onClick={() => {
                      handleOpenChange();
                    }}
                    className="cursor-pointer"
                  >
                    <div className="m-[10px] rounded-2xl p-[15px] hover:bg-fuchsia-50 transition-colors duration-300 flex flex-row text-slate-600 justify-between max-md:py-[0.8rem] max-md:px-[0.6rem]">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center">
                          <div
                            className={cn(
                              "relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]"
                            )}
                          >
                            <Image
                              src={artist.userImageURL}
                              alt="avatar"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              className="w-full h-full bg-cover object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="line-clamp-1 text-[#131414]">
                              {artist.name}
                            </p>
                            <p className="line-clamp-1 text-slate-400 text-[0.8rem]">
                              Исполнитель
                            </p>
                          </div>
                        </div>
                        <Mic2
                          strokeWidth={1.5}
                          size={20}
                          className="max-md:hidden text-slate-400"
                        />
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}

          {/*Songs Search*/}
          {selectValue == "songs" &&
            foundPosts &&
            foundPosts.map((song) => {
              return (
                <React.Fragment key={song.$id}>
                  <div
                    key={song.$id}
                    onClick={() => {
                      setSingleTrackData(song);
                      handleOpenChange();
                    }}
                    className="cursor-pointer"
                  >
                    <div className="m-[10px] rounded-2xl p-[15px] hover:bg-fuchsia-50 transition-colors duration-300 flex flex-row text-slate-600 justify-between max-md:py-[0.8rem] max-md:px-[0.6rem]">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center">
                          <div
                            className={cn(
                              "relative h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-gray-300 mr-[1rem]"
                            )}
                          >
                            <Image
                              src={song.trackImageURL}
                              alt="avatar"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              className="w-full h-full bg-cover object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="line-clamp-1 text-[#131414]">
                              {song.trackSongName}
                            </p>
                            <p className="line-clamp-1 text-slate-400 text-[0.8rem]">
                              {song.trackArtistName}
                            </p>
                          </div>
                        </div>
                        <Play
                          strokeWidth={1.5}
                          size={20}
                          className="max-md:hidden text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </ScrollArea>
      </DialogSearchContent>
    </DialogSearch>
  );
};

export default MainSearch;
