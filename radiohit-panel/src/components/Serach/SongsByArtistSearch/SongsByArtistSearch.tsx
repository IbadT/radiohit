"use client";
import {
  DialogSearch,
  DialogSearchContent,
  DialogSearchTrigger,
} from "@/components/Serach/HeaderSearch/DialogSearch";
import { SearchInputMain } from "@/components/Serach/HeaderSearch/SearchInputMain";
import { useEffect, useState } from "react";
import { SearchArtists } from "@/lib/appwrite/db_services/search.db.service";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import * as React from "react";
import { Loader2, Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import { buttonVariants } from "@/components/Buttons/Button";

const SongsByArtistSearch = ({
  refetch,
  setArtistIDSearch,
  artistIDSearch,
}) => {
  //Input state
  const [searchInput, setSearchInput] = useState("");
  //All posts state
  const [findedPosts, setFindedPosts] = useState([]);
  //Open / Close state
  const [open, setOpen] = useState(false);
  //Loading on search state
  const [loading, setLoading] = useState(true);

  const [artistName, setArtistName] = useState("");

  const { addTrackToRadioPlaylist } = useAdminActions();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const Deobounce = setTimeout(async () => {
      //Search songs
      const posts = (await SearchArtists(searchInput)).documents;
      setFindedPosts(posts);

      setLoading(false);
    }, 100);

    return () => clearTimeout(Deobounce);
  }, [searchInput]);

  //Search input handler
  function handleSearchValChange(e) {
    setSearchInput(e.target.value);
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
    }
  }

  const handleClearSetArtist = () => {
    setArtistIDSearch("");
  };

  const handleSetArtist = async (artistID) => {
    setArtistIDSearch(artistID);
  };

  return (
    <>
      {artistIDSearch != "" && (
        <div
          className={cn(
            buttonVariants({ variant: "searchSongByArtist" }),
            "flex flex-row items-center gap-[0.5rem] cursor-pointer bg-white text-gray-500"
          )}
          onClick={handleClearSetArtist}
        >
          <X strokeWidth={1.5} size={18} /> Очистить поиск
        </div>
      )}
      <DialogSearch open={open} onOpenChange={handleOpenChange}>
        <DialogSearchTrigger asChild>
          {artistIDSearch == "" && (
            <div
              className={cn(
                buttonVariants({ variant: "searchSongByArtist" }),
                "flex flex-row items-center gap-[0.5rem] cursor-pointer bg-white text-gray-500"
              )}
            >
              <Search strokeWidth={1.5} size={18} /> Поиск по исполнителю
            </div>
          )}
        </DialogSearchTrigger>
        <DialogSearchContent className="max-md:pl-[0.5rem] max-md:pr-[0.5rem] max-md:top-[5vh]">
          <div className="flex flex-row items-center justify-between bg-white rounded-xl border-none shadow-2xl">
            {/*Search Input*/}
            <SearchInputMain
              placeholder="Поиск треков по исполнителю... "
              className=""
              boxClassName="w-full"
              onChange={handleSearchValChange}
            />
            {/*Select filter*/}
            <div className="flex flex-row items-center">
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

            {/*Songs Search*/}
            {findedPosts &&
              findedPosts.map((artist) => {
                return (
                  <React.Fragment key={artist.$id}>
                    <div
                      key={artist.$id}
                      onClick={() => {
                        handleOpenChange();
                        handleSetArtist(artist.$id);
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
                                {artist.artistName}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-[0.5rem]">
                            <p className="text-[0.9rem]">Выбрать исполнителя</p>
                            <Plus strokeWidth={1.5} size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </ScrollArea>
        </DialogSearchContent>
      </DialogSearch>
    </>
  );
};

export default SongsByArtistSearch;
