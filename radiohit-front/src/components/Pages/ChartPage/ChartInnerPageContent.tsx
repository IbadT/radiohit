'use client';

import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { getChartPaginatedTracks } from '@/lib/appwrite/db_services/songs.db.service';
import ChartAudioCard from '@/components/Cards/AudioCards/ChartAudioCard';
import ChartLoadingSkeleton from '@/components/LoadingSkeletons/Chart/ChartLoadingSkeleton';
import { ListMusic, Loader2 } from 'lucide-react';

const ChartInnerPageContent = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`chartTracks`],
    queryFn: async ({ pageParam }) => {
      return await getChartPaginatedTracks(pageParam, 10, 'default');
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
    if (inView && hasNextPage && data?.pages.length <= 11) fetchNextPage();
  }, [inView]);

  //Loading skeleton
  if (isLoading) return <ChartLoadingSkeleton />;

  return (
    <>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`chartTracks_${pageIndex}`}>
            {page &&
                page.documents.map((song, index) => {
                  //Get chart number
                  const returnIndex = index + 1 + ((pageIndex === 0 ? 1 : pageIndex + 1) - 1) * 10;
                  return (
                    <div key={song.$id}>
                      <ChartAudioCard song={song} index={returnIndex} />
                    </div>
                  );
                })}
            </React.Fragment>
          );
        })}

      {/*Observer marker*/}
      {hasNextPage && <span style={{ visibility: 'hidden' }} ref={ref} />}

      {/*If fetching next page*/}
      {isFetchingNextPage ? (
        <div className="mb-[3rem] flex w-full flex-row items-center justify-center">
          <Loader2 strokeWidth={2} className="!z-[2] animate-spin text-slate-500" size={30} />
        </div>
      ) : null}

      {/*If no data*/}
      {data?.pages[0].total == 0 && (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center align-middle">
          <ListMusic className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={60} />
          <p className="items-center text-[2rem] text-slate-400">Нет популярных треков</p>
        </div>
      )}
    </>
  );
};

export default ChartInnerPageContent;
