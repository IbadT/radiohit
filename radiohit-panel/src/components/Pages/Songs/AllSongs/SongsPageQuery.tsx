'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { Loader2, Music, Plus } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { buttonVariants } from '@/components/Buttons/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/select';
import { getSongsPaginatedInfo } from '@/lib/appwrite/db_services/songs.db.service';
import SongsPaginatedCard from '@/components/Pages/Songs/AllSongs/SongsPaginatedCard';
import SongsLoadingSkeleton from '@/components/LoadingSkeletons/Songs/SongsLoadingSkeleton';
import SongsByArtistSearch from '@/components/Serach/SongsByArtistSearch/SongsByArtistSearch';

const SongsPageQuery = () => {
  const { ref, inView } = useInView();
  const [selectValue, setSelectValue] = React.useState('sortByPopularity');
  const [artistIDSearch, setArtistIDSearch] = React.useState('');

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`songs_paginated_content`],
      queryFn: async ({ pageParam }) => {
        console.log('call')
        return await getSongsPaginatedInfo(
          pageParam,
          10,
          artistIDSearch == '' ? selectValue : artistIDSearch,
        );
      },
      initialPageParam: '',
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPageDocuments) => {
        if(lastPageDocuments.documents.length < 10) {
          return null;
        }
        return lastPageDocuments.documents.at(lastPageDocuments.documents.length - 1).$id;
      },
    });


  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  React.useEffect(() => {
    if (selectValue) {
      refetch();
    }
  }, [selectValue, artistIDSearch]);

  //Handle order select
  function handleSelect(value) {
    setSelectValue(value);
    if (artistIDSearch != '') {
      setArtistIDSearch('');
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Все треки</p>
        <div className="flex flex-row items-center gap-[1.2rem]">
          {/*Search by Artist*/}
          <SongsByArtistSearch
            refetch={refetch}
            setArtistIDSearch={setArtistIDSearch}
            artistIDSearch={artistIDSearch}
          />

          {/*Order Select*/}
          <Select onValueChange={handleSelect} defaultValue={selectValue}>
            <SelectTrigger className="ring-none w-[14rem] select-none border-gray-400 bg-white text-gray-600 transition-colors duration-300 hover:border-mainAccent hover:text-fuchsia-600 focus:ring-0">
              <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="sortByPopularity"
                className="cursor-pointer select-none transition-colors duration-300 hover:!bg-fuchsia-50"
              >
                По рейтингу
              </SelectItem>
              <SelectItem
                value="sortByCreatedDateNewest"
                className="cursor-pointer select-none transition-colors duration-300 hover:!bg-fuchsia-50"
              >
                По дате создания: новые
              </SelectItem>
              <SelectItem
                value="sortByCreatedDateOldest"
                className="cursor-pointer select-none transition-colors duration-300 hover:!bg-fuchsia-50"
              >
                По дате создания: старые
              </SelectItem>
              {/*<SelectItem*/}
              {/*  value="sortByRotation"*/}
              {/*  className="select-none cursor-pointer hover:!bg-fuchsia-50 transition-colors duration-300"*/}
              {/*>*/}
              {/*  Взяты в ротацию*/}
              {/*</SelectItem>*/}
              <SelectItem
                value="sortByModeration"
                className="cursor-pointer select-none transition-colors duration-300 hover:!bg-fuchsia-50"
              >
                Ожидает модерации
              </SelectItem>
              <SelectItem
                value="sortByRejected"
                className="cursor-pointer select-none transition-colors duration-300 hover:!bg-fuchsia-50"
              >
                Отклонены
              </SelectItem>
            </SelectContent>
          </Select>

          {/*Create new Link*/}
          <Link
            href="/songs/add-new-song"
            className={cn(
              buttonVariants({ variant: 'topPageButtonAlternative' }),
              'flex flex-row items-center gap-[0.5rem]',
            )}
          >
            Добавить новый трек
            <Plus strokeWidth={1.5} size={20} />
          </Link>
        </div>
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <SongsLoadingSkeleton />}
        {data &&
          data.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={`songs_paginated_content_${pageIndex}`}>
                {page &&
                  page.documents.map((song, index) => {
                    return <SongsPaginatedCard song={song} key={`${song.$id}`} refetch={refetch} />;
                  })}
              </React.Fragment>
            );
          })}

        {/*Observer marker*/}
        <span style={{ visibility: 'hidden' }} ref={ref} />

        {/*If fetching next page*/}
        {isFetchingNextPage ? (
          <div className="mb-[3rem] flex w-full flex-row items-center justify-center">
            <Loader2 strokeWidth={2} className="!z-[2] animate-spin text-slate-500" size={30} />
          </div>
        ) : null}

        {/*If no data*/}
        {data?.pages[0].total == 0 && (
          <div className="flex h-[70vh] w-full flex-col items-center justify-center align-middle">
            <Music className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
            <p className="items-center text-[1.5rem] text-slate-400">Нет треков</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongsPageQuery;
