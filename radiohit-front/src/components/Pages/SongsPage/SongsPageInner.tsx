import PageHeading from '@/components/Text/PageHeading';
import * as React from 'react';
import SongsInnerPageContent from '@/components/Pages/SongsPage/SongsInnerPageContent';
import ScrollToTop from '@/components/ui/ScrollToTop/ScrollToTop';

const SongsPageInner = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex h-full w-full flex-col">
        <div className="w-full">
          <div className="mb-[0.4rem] flex w-full flex-row items-center justify-between max-lg:hidden lg:mt-[1.2rem] lg:px-[1.5rem]">
            <PageHeading text="Каталог треков" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Все треки
            </p>
          </div>
          <div className="mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0] lg:pl-[1.5rem] lg:pt-[0.2rem]">
            <SongsInnerPageContent />
          </div>
        </div>
      </div>
    </>
  );
};
export default SongsPageInner;
