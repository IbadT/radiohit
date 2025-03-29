"use client";
import {
  DialogSearch,
  DialogSearchContent,
} from "@/components/Serach/HeaderSearch/DialogSearch";
import { SearchInputMain } from "@/components/Serach/HeaderSearch/SearchInputMain";
import { useEffect, useState } from "react";
import {
  SearchArtists,
} from "@/lib/appwrite/db_services/search.db.service";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import * as React from "react";
import {Loader2, Mic2, Plus, UserPlus, X} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { useAdminActions } from "@/lib/hooks/useAdminActions";
import { buttonVariants } from "@/components/Buttons/Button";
import Link from "next/link";

const AddTrackArtistSearch = ({
  setArtistIDTrackSearch,
  artistIDTrackSearch,
  artistDoc,
  setArtistDoc,
    type = 'addSong'
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

  const handleSetArtist = async (artistID, artistDoc) => {
    setArtistIDTrackSearch(artistID);
    setArtistDoc(artistDoc);
  };

  return (
    <>
      {!artistIDTrackSearch && (
        <div
          className={cn(
            buttonVariants({ variant: "addTrackArtistSearch" }),
            "flex flex-row items-center gap-[0.5rem] cursor-pointer bg-white text-gray-400 h-[7rem] text-[1.2rem]",
              type == 'editSuggestedSong' && ' border-gray-300 select-none'
          )}
          onClick={() => setOpen(true)}
        >
          <Mic2 strokeWidth={1.5} size={24} /> Выбрать исполнителя
        </div>
      )}
      {artistIDTrackSearch && (
        <div
          className={cn(
            buttonVariants({ variant: "addTrackArtistSearch" }),
            "flex flex-row items-center gap-[0.5rem] cursor-pointer bg-white text-gray-500 h-[7rem] text-[1.2rem] rounded-2xl",
              type == 'editSong' && 'pointer-events-none border-solid border-[2px] border-gray-200 bg-gray-50 select-none',
              type == 'editSuggestedSong' && ' border-solid border-[2px] border-gray-200 bg-gray-50 select-none'
          )}
          onClick={() => setOpen(true)}
        >
          <div className="relative h-[4rem] w-[4rem] rounded-2xl overflow-hidden bg-gray-100 mr-[0.6rem]">
            <Image
              src={artistDoc.userImageURL}
              alt="artist_image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full bg-cover object-cover z-2"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[1.2rem]">{artistDoc.artistName}</p>
            {type == 'addSong' && <p className="text-[0.9rem] font-[400]">Изменить исполнителя</p>}
            {type == 'editSong' && <p className="text-[0.9rem] font-[400]">Исполнитель трека</p>}
            {type == 'editSuggestedSong' && <p className="text-[0.9rem] font-[400]">Изменить исполнителя</p>}
          </div>
        </div>
      )}
      <DialogSearch open={open} onOpenChange={handleOpenChange}>
        <DialogSearchContent className="max-md:pl-[0.5rem] max-md:pr-[0.5rem] max-md:top-[5vh]">
          <div className="flex flex-row items-center justify-between bg-white rounded-xl border-none shadow-2xl">
            {/*Search Input*/}
            <SearchInputMain
              placeholder="Поиск по исполнителю... "
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
                {type == 'editSuggestedSong' && (
                    <Link href="/artists/add-new-artist" className="w-full p-[1rem] flex flex-col items-center justify-center align-middle group">
                      <div className="text-gray-500 bg-gray-100 rounded-xl w-full flex flex-row items-center justify-center border-[1px] border-gray-300 transition-all duration-300 hover:border-mainAccent py-[0.5rem] gap-[0.8rem]">
                        <UserPlus strokeWidth={1.2} className="h-auto w-[1.4rem] transition-colors text-gray-500 group-hover:text-mainAccent"/>
                        <p className="transition-colors duration-300 group-hover:text-mainAccent">Добавить нового исполнителя</p>
                      </div>
                    </Link>
                )}
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
                        handleSetArtist(artist.$id, artist);
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

export default AddTrackArtistSearch;
