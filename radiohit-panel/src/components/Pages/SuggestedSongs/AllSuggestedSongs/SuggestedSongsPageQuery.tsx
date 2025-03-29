'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { HelpCircle, Loader2, MoveRight, Music } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import { getAllSuggestedSongs } from '@/lib/appwrite/db_services/songs.db.service';
import SongsLoadingSkeleton from '@/components/LoadingSkeletons/Songs/SongsLoadingSkeleton';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard/hover-card';
import SuggestedSongsPaginatedCard from '@/components/Pages/SuggestedSongs/AllSuggestedSongs/SuggestedSongsPaginatedCard';

const SuggestedSongsPageQuery = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`suggested_all_songs_content`],
      queryFn: async ({ pageParam }) => {
        return await getAllSuggestedSongs(pageParam, 10);
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

  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[1rem] pl-[0.5rem]">
          <p className="text-[1.4rem] font-[500]">Предложенные треки</p>
          <HelperSuggestedSongsHoverCard />
        </div>
        <div className="flex flex-row items-center gap-[1.2rem]">
          {/*Create new Link*/}
          <Link
            href="/songs"
            className={cn(
              'flex flex-row items-center gap-[0.5rem] text-[0.9rem] text-gray-500 transition-colors duration-300 hover:text-fuchsia-700',
            )}
          >
            Все треки
            <MoveRight strokeWidth={1.5} size={18} />
          </Link>
        </div>
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <SongsLoadingSkeleton />}
        {data?.pages[0].total > 0 &&
          data.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={`suggested_all_songs_content_${pageIndex}`}>
                {page &&
                  page.documents.map((song, index) => {
                    return <SuggestedSongsPaginatedCard song={song} key={`${song.$id}`} />;
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
            <p className="items-center text-[1.5rem] text-slate-400">Нет предложенных треков</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SuggestedSongsPageQuery;

const HelperSuggestedSongsHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer">
        <HelpCircle strokeWidth={2} size={17} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>
          На данной странице отображаются треки, загруженные с помощью формы «Отправить песню на
          радио»
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};
