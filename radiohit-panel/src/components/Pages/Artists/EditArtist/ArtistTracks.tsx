'use client';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import ArtistTracksCardLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistTracksCardLoadingSkeleton';
import { ListMusic, Loader2 } from 'lucide-react';
import { getPaginatedArtistTracksByID } from '@/lib/appwrite/db_services/artists.db.service';
import ArtistTracksCard from '@/components/Pages/Artists/EditArtist/ArtistTracksCard';

const ArtistTracks = ({ artistID }) => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`artistEditUploadedTracks_${artistID}`],
      queryFn: async ({ pageParam }) => {
        return await getPaginatedArtistTracksByID(pageParam, 10, 'default', artistID);
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
  if (isLoading) return <ArtistTracksCardLoadingSkeleton />;

  return (
    <div className="mb-[1rem] w-full rounded-2xl border-[1px] border-mainBorderColor bg-white p-[1.2rem]">
      <h2 className="mb-[0.6rem] text-[1.1rem] font-[600] text-[#373738]">Треки исполнителя</h2>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`artistEditUploadedTracks_${pageIndex}`}>
              {page &&
                page.documents.map((song) => {
                  return (
                    <div key={song.$id}>
                      <ArtistTracksCard song={song} />
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
        <div className="flex h-[40vh] w-full flex-col items-center justify-center align-middle">
          <ListMusic className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
          <p className="items-center text-[1.2rem] text-slate-400">Нет треков</p>
        </div>
      )}
    </div>
  );
};
export default ArtistTracks;
