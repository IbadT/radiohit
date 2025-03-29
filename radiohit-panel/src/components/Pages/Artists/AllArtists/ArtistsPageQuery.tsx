'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { Loader2, Mic2, Plus } from 'lucide-react';
import React from 'react';
import { getArtistsPaginatedInfo } from '@/lib/appwrite/db_services/artists.db.service';
import ArtistPaginatedCard from '@/components/Pages/Artists/AllArtists/ArtistsPaginatedCard';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { buttonVariants } from '@/components/Buttons/Button';
import ArtistsLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistsLoadingSkeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/select';

const ArtistsPageQuery = () => {
  const { ref, inView } = useInView();
  const [selectValue, setSelectValue] = React.useState('sortByPopularity');

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`artists_paginated_content`],
      queryFn: async ({ pageParam }) => {
        return await getArtistsPaginatedInfo(pageParam, 10, selectValue);
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
  }, [selectValue])

  //Handle order select
  function handleSelect(value) {
    setSelectValue(value);
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Все исполнители</p>
        <div className="flex flex-row items-center gap-[1.2rem]">
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
            </SelectContent>
          </Select>

          {/*Create new Link*/}
          <Link
            href="/artists/add-new-artist"
            className={cn(
              buttonVariants({ variant: 'topPageButtonAlternative' }),
              'flex flex-row items-center gap-[0.5rem]',
            )}
          >
            Добавить исполнителя
            <Plus strokeWidth={1.5} size={20} />
          </Link>
        </div>
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <ArtistsLoadingSkeleton />}
        {data &&
          data.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={`artists_paginated_content_${pageIndex}`}>
                {page &&
                  page.documents.map((artist) => {
                    return (
                      <ArtistPaginatedCard artist={artist} key={artist.$id} refetch={refetch} />
                    );
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
            <Mic2 className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
            <p className="items-center text-[1.5rem] text-slate-400">Нет исполнителей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsPageQuery;
