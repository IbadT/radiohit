import PageHeading from "@/components/Text/PageHeading";
import ChartInnerPageContent from "@/components/Pages/ChartPage/ChartInnerPageContent";
import * as React from "react";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

const ChartInnerPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-full h-full">
        <div className="w-full">
          <div className="w-full flex flex-row items-center justify-between max-lg:hidden lg:px-[1.5rem] lg:mt-[1.2rem] mb-[0.4rem]">
            <PageHeading text="Топ лучших треков" classnames="mb-0" />
            <p className="text-[0.9rem] text-slate-400 transition-colors duration-300 hover:text-mainAccent">
              Топ 100 чарт
            </p>
          </div>
          <div className="lg:pl-[1.5rem] lg:pt-[0.2rem] mb-[1.8rem] max-[1200px]:mx-[1rem] max-[1200px]:!pl-[0]">
              <ChartInnerPageContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartInnerPage;
