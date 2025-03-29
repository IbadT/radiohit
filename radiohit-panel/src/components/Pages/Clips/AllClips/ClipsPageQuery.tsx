'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { getClipsPaginatedInfo } from '@/lib/appwrite/db_services/news.db.service';
import { useEffect } from 'react';
import AllNewsLoadingSkeleton from '@/components/LoadingSkeletons/News/AllNewsLoadingSkeleton';
import { Loader2, Video } from 'lucide-react';
import React from 'react';
import ClipsPaginatedCard from '@/components/Pages/Clips/AllClips/ClipsPaginatedCard';

const ClipsPageQuery = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`allClips_paginated_content`],
      queryFn: async ({ pageParam }) => {
        return await getClipsPaginatedInfo(pageParam, 10, 'default');
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
            <React.Fragment key={`allClips_paginated_content_${pageIndex}`}>
              {page &&
                page.documents.map((post, index) => {
                  return (
                    <ClipsPaginatedCard
                      post={post}
                      index={index}
                      key={post.$id}
                      refetch={refetch}
                    />
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
          <Video className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.5rem] text-slate-400">Нет клипов</p>
        </div>
      )}
    </>
  );
};

export default ClipsPageQuery;
