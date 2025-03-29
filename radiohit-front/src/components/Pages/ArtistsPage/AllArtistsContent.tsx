'use client';

import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import { getArtistsPaginatedInfo } from '@/lib/appwrite/db_services/artists.db.service';
import { ListMusic, Loader2 } from 'lucide-react';
import ArtistCard from '@/components/Cards/ArtistCard/ArtistCard';
import Link from 'next/link';
import ArtistsLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistsLoadingSkeleton';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const AllArtistsContent = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`artists_info`],
    queryFn: async ({ pageParam }) => {
      return await getArtistsPaginatedInfo(pageParam, 10, 'default');
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
  if (isLoading) return <ArtistsLoadingSkeleton />;

  return (
    <>
      {data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`artists_info_${pageIndex}`}>
              {page &&
                page.documents.map((artist) => {
                  return (
                    <Link href={`/artists/${artist.$id}`} key={artist.$id} scroll={false}>
                      <ArtistCard artist={artist} />
                    </Link>
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
          <ListMusic className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.5rem] text-slate-400">Нет артистов</p>
        </div>
      )}
    </>
  );
};
export default AllArtistsContent;
