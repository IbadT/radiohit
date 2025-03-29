'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { Loader2, User } from 'lucide-react';
import React from 'react';
import ArtistsLoadingSkeleton from '@/components/LoadingSkeletons/Artists/ArtistsLoadingSkeleton';
import { getAllUsersPaginatedInfo } from '@/lib/appwrite/db_services/users.db.service';
import AllUsersPaginatedCard from '@/components/Pages/Users/AllUsers/AllUsersPaginatedCard';

const AllUsersPageQuery = () => {
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`all_users_paginated_content`],
      queryFn: async ({ pageParam }) => {
        return await getAllUsersPaginatedInfo(pageParam, 10);
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
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Пользователи</p>
        {/*<div className="flex flex-row items-center gap-[1.2rem]">*/}
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
        {/*</div>*/}
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        {isLoading && <ArtistsLoadingSkeleton />}
        {data &&
          data.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={`all_users_paginated_content_${pageIndex}`}>
                {page &&
                  page.documents.map((user) => {
                    return <AllUsersPaginatedCard user={user} key={user.$id} refetch={refetch} />;
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
            <User className="mb-[1rem] text-slate-400" strokeWidth={1.5} size={40} />
            <p className="items-center text-[1.5rem] text-slate-400">Нет пользователей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPageQuery;
