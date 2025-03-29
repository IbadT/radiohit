import PageHeading from '@/components/Text/PageHeading';
import TopArtistsCard from '@/components/Cards/TopArtistCard/TopArtistsCard';
import AllArtistsContent from '@/components/Pages/ArtistsPage/AllArtistsContent';
import ScrollToTop from '@/components/ui/ScrollToTop/ScrollToTop';
import * as React from 'react';

const ArtistsInnerPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex h-full w-full flex-col">
        <div className="w-full">
          <div className="mb-[0.4rem] flex w-full flex-row items-center justify-between max-lg:hidden lg:mt-[1.2rem] lg:px-[1.5rem]">
            <PageHeading text="Исполнители" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Все исполнители
            </p>
          </div>
        </div>
        <div className="mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0] lg:pl-[1.5rem] lg:pt-[0.2rem]">
          {/*Top Artists*/}
          <TopArtistsCard />
          {/*Artists List*/}
          <AllArtistsContent />
        </div>
      </div>
    </>
  );
};

export default ArtistsInnerPage;
