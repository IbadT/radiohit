'use client';

import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import React from 'react';
import { getNewsPaginatedInfo } from '@/lib/appwrite/db_services/news.db.service';
import Link from 'next/link';
import { Loader2, Newspaper } from 'lucide-react';
import NewsCard from '@/components/Cards/News/NewsCard';
import NewsLoadingSkeleton from '@/components/LoadingSkeletons/News/NewsLoadingSkeleton';
import { useInView } from 'react-intersection-observer';

const NewsPageInnerContent = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`allNews_info`],
    initialPageParam: '',
    placeholderData: keepPreviousData,
    queryFn: async ({ pageParam }) => {
      return await getNewsPaginatedInfo(pageParam, 10, 'default');
    },
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

  //Loading skeleton
  if (isLoading) return <NewsLoadingSkeleton />;
  
  return (
    <>

      {data?.pages?.map((page, pageIndex) => (
        <React.Fragment key={`page_${pageIndex}`}>
          {page?.documents?.map((post) => (
            <Link 
              href={`/news/${post.$id}`} 
              key={post.$id}
              scroll={false}
              passHref
            >
              <NewsCard post={post} />
            </Link>
          ))}
        </React.Fragment>
      ))}

      {/* {data &&
        data.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={`allNews_info_${pageIndex}`}>
              {page &&
                page.documents.map((post, index) => {
                  return (
                    <Link href={`/news/${post.$id}`} key={post.$id} scroll={false}>
                      <NewsCard post={post} />
                    </Link>
                  );
                })}
            </React.Fragment>
          );
        })} */}

      {/*Observer marker*/}
      <div style={{ visibility: 'hidden' }} ref={ref} />

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
export default NewsPageInnerContent;
