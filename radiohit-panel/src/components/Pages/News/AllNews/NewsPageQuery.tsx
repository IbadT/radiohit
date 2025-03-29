'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { getNewsPaginatedInfo } from '@/lib/appwrite/db_services/news.db.service';
import { useEffect } from 'react';
import AllNewsLoadingSkeleton from '@/components/LoadingSkeletons/News/AllNewsLoadingSkeleton';
import { Loader2, Newspaper } from 'lucide-react';
import NewsPaginatedCard from '@/components/Pages/News/AllNews/NewsPaginatedCard';
import React from 'react';

const NewsPageQuery = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`allNews_paginated`],
      queryFn: async ({ pageParam }) => {
        return await getNewsPaginatedInfo(pageParam, 10, 'default');
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

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);
  

  //Loading skeleton
  if (isLoading) return <AllNewsLoadingSkeleton />;

  return (
    <>
      {data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`allNews_paginated_${pageIndex}`}>
              {page &&
                page.documents.map((post, index) => {
                  return (
                    <NewsPaginatedCard post={post} index={index} key={post.$id} refetch={refetch} />
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
          <Newspaper className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.5rem] text-slate-400">Нет новостей</p>
        </div>
      )}
    </>
  );
};

export default NewsPageQuery;
