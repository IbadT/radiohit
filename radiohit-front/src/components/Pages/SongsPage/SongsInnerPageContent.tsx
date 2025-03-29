'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';

import { getAllCatalogPaginatedTracks } from '@/lib/appwrite/db_services/songs.db.service';
import React, { useEffect } from 'react';
import SongsLoadingSkeleton from '@/components/LoadingSkeletons/Songs/SongsLoadingSkeleton';
import { ListMusic, Loader2 } from 'lucide-react';
import AllSongsAudioCard from '@/components/Cards/AudioCards/AllSongsAudioCard';

const SongsInnerPageContent = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`allSongsCatalog`],
    queryFn: async ({ pageParam }) => {
      return await getAllCatalogPaginatedTracks(pageParam, 10, 'default');
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
  if (isLoading) return <SongsLoadingSkeleton />;

  return (
    <>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`allSongsCatalog_${pageIndex}`}>
              {page &&
                page.documents.map((song) => {
                  return (
                    <div key={song.$id}>
                      <AllSongsAudioCard song={song} />
                    </div>
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
          <ListMusic className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={60} />
          <p className="items-center text-[2rem] text-slate-400">Нет популярных треков</p>
        </div>
      )}
    </>
  );
};
export default SongsInnerPageContent;
