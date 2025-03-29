"use client";
import {
  DialogSearch,
  DialogSearchContent,
  DialogSearchTrigger,
} from "@/components/Serach/HeaderSearch/DialogSearch";
import { SearchInputMain } from "@/components/Serach/HeaderSearch/SearchInputMain";
import { useEffect, useState } from "react";
import {
  SearchArtists,
  SearchClips,
  SearchEvents,
  SearchNews,
  SearchRadioUsers,
  SearchSongs,
  SearchUsers,
} from "@/lib/appwrite/db_services/search.db.service";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import * as React from "react";
import {
  CalendarClock,
  Loader2,
  MoveRight,
  Newspaper,
  Search,
  UserSquare2,
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
import Image from "next/image";

const MainSearch = () => {
  //Input state
  const [searchInput, setSearchInput] = useState("");
  //All posts state
  const [findedPosts, setFindedPosts] = useState([]);
  //Open / Close state
  const [open, setOpen] = useState(false);
  //Loading on search state
  const [loading, setLoading] = useState(true);
  //Select state
  const [selectValue, setSelectValue] = useState("songs");
  //Input placeholder state
  const [inputPlaceholder, setInputPlaceholder] = useState("треков");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const Deobounce = setTimeout(async () => {
      //Search songs
      if (selectValue == "songs") {
        const posts = (await SearchSongs(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search news
      if (selectValue == "news") {
        const posts = (await SearchNews(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search events
      if (selectValue == "events") {
        const posts = (await SearchEvents(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search clips
      if (selectValue == "clips") {
        const posts = (await SearchClips(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search artists
      if (selectValue == "artists") {
        const posts = (await SearchArtists(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search radio users
      if (selectValue == "radioUsers") {
        const posts = (await SearchRadioUsers(searchInput)).documents;
        setFindedPosts(posts);
      }

      //Search users
      if (selectValue == "users") {
        const posts = (await SearchUsers(searchInput)).documents;
        setFindedPosts(posts);
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
      case "users":
        setInputPlaceholder("пользователей");
        break;
      case "radioUsers":
        setInputPlaceholder("радиостанций");
        break;
      default:
        setInputPlaceholder("треков");
        break;
    }

    setFindedPosts([]);
  }

  //Handle open change
  function handleOpenChange() {
    //Close
    setOpen(!open);
    if (open) {
      //Clear input
      setSearchInput("");
      //Clear data array
      setFindedPosts([]);
      //Set default Select value
      setSelectValue("songs");
      //Set default placeholder
      setInputPlaceholder("треков");
    }
  }

  return (
    <DialogSearch open={open} onOpenChange={handleOpenChange}>
      <DialogSearchTrigger asChild>
        <div className="flex flex-row items-center justify-start text-gray-400 cursor-pointer transition-colors duration-300 hover:text-mainAccent">
          <span className="mr-[10px]">
            <Search strokeWidth={1.8} size={20} />
          </span>
          Поиск треков, новостей, исполнителей...
        </div>
      </DialogSearchTrigger>
      <DialogSearchContent className="max-md:pl-[0.5rem] max-md:pr-[0.5rem] max-md:top-[5vh]">
        <div className="flex flex-row items-center justify-between bg-white rounded-xl border-none shadow-2xl">
          {/*Search Input*/}
          <SearchInputMain
            placeholder={`Поиск ${inputPlaceholder}... `}
            className=""
            boxClassName="w-full"
            onChange={handleSearchValChange}
          />
          {/*Select filter*/}
          <div className="flex flex-row items-center">
            <Select
              onValueChange={handleSelectChange}
              defaultValue={selectValue}
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
                  <SelectItem value="artists" className="cursor-pointer">
                    Исполнители
                  </SelectItem>
                  <SelectItem value="news" className="cursor-pointer">
                    Новости
                  </SelectItem>
                  <SelectItem value="clips" className="cursor-pointer">
                    Клипы
                  </SelectItem>
                  <SelectItem value="events" className="cursor-pointer">
                    Мероприятия
                  </SelectItem>
                  <SelectItem value="users" className="cursor-pointer">
                    Пользователи
                  </SelectItem>
                  <SelectItem value="radioUsers" className="cursor-pointer">
                    Радиостанции
                  </SelectItem>
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
          {!loading && findedPosts.length == 0 && searchInput != "" && (
            <div className="align-center flex w-full flex-col items-center justify-center py-[20px]">
              <p className="text-slate-600">Ничего не найдено...</p>
            </div>
          )}

          {/*News Search*/}
          {selectValue == "news" &&
            findedPosts &&
            findedPosts.map((post) => {
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
            findedPosts &&
            findedPosts.map((post) => {
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
            findedPosts &&
            findedPosts.map((post) => {
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
            findedPosts &&
            findedPosts.map((artist) => {
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
                        <MoveRight
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
            findedPosts &&
            findedPosts.map((song) => {
              return (
                <React.Fragment key={song.$id}>
                  <Link
                    href={`/songs/${song.$id}`}
                    key={song.$id}
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
                        <MoveRight
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

          {/*Radio Users Search*/}
          {selectValue == "radioUsers" &&
            findedPosts &&
            findedPosts.map((radioUser) => {
              return (
                <React.Fragment key={radioUser.$id}>
                  <Link
                    scroll={false}
                    href={`/radio-users/${radioUser.$id}`}
                    key={radioUser.$id}
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
                              src={radioUser.userImageURL}
                              alt="avatar"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              className="w-full h-full bg-cover object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="line-clamp-1 text-[#131414]">
                              {radioUser.name}
                            </p>
                            <p className="line-clamp-1 text-slate-400 text-[0.8rem]">
                              Радиостанция
                            </p>
                          </div>
                        </div>
                        <MoveRight
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

          {/*Users Search*/}
          {selectValue == "users" &&
            findedPosts &&
            findedPosts.map((user) => {
              return (
                <React.Fragment key={user.$id}>
                  <Link
                    scroll={false}
                    href={`/users/${user.$id}`}
                    key={user.$id}
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
                            {user.userImageURL != null && (
                              <Image
                                src={user.userImageURL}
                                alt="avatar"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                className="w-full h-full bg-cover object-cover"
                              />
                            )}
                            {user.userImageURL == null && (
                              <div className="flex items-center justify-center w-full h-full">
                                <UserSquare2 strokeWidth={1.5} size={25} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <p className="line-clamp-1 text-[#131414]">
                              {user.name}
                            </p>
                            <p className="line-clamp-1 text-slate-400 text-[0.8rem]">
                              Пользователь
                            </p>
                          </div>
                        </div>
                        <MoveRight
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
        </ScrollArea>
      </DialogSearchContent>
    </DialogSearch>
  );
};

export default MainSearch;
