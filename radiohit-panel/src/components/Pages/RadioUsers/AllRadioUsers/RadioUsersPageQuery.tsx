'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { Loader2, RadioTower } from 'lucide-react';
import React from 'react';
import ArtistsLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistsLoadingSkeleton';
import { getRadioUsersPaginatedInfo } from '@/lib/appwrite/db_services/users.db.service';
import RadioUsersPaginatedCard from '@/components/Pages/RadioUsers/AllRadioUsers/RadioUsersPaginatedCard';

const RadioUsersPageQuery = () => {
  const { ref, inView } = useInView();
  const [selectValue, setSelectValue] = React.useState('sortByPopularity');

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`radioUsers_paginated_content`],
      queryFn: async ({ pageParam }) => {
        return await getRadioUsersPaginatedInfo(pageParam, 10, selectValue);
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
  }, [selectValue]);


  //Handle order select
  function handleSelect(value) {
    setSelectValue(value);
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Радиостанции</p>
        <div className="flex flex-row items-center gap-[1.2rem]">
          {/*Create new Link*/}
          {/*<Link*/}
          {/*    href="/artists/add-new-artist"*/}
          {/*    className={cn(*/}
          {/*        buttonVariants({ variant: "topPageButtonAlternative" }),*/}
          {/*        "flex flex-row items-center gap-[0.5rem]"*/}
          {/*    )}*/}
          {/*>*/}
          {/*    Добавить исполнителя*/}
          {/*    <Plus strokeWidth={1.5} size={20} />*/}
          {/*</Link>*/}
        </div>
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <ArtistsLoadingSkeleton />}
        {data &&
          data.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={`radioUsers_paginated_content_${pageIndex}`}>
                {page &&
                  page.documents.map((radio) => {
                    return (
                      <RadioUsersPaginatedCard radio={radio} key={radio.$id} refetch={refetch} />
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
            <RadioTower className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
            <p className="items-center text-[1.5rem] text-slate-400">Нет радиостанций</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioUsersPageQuery;
