import PageHeading from "@/components/Text/PageHeading";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import * as React from "react";
import RadioPageInnerContent from "@/components/Pages/RadioPage/RadioPageInnerContent";

const RadioPageInner = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-row w-full h-full">
        <div className="w-full">
          <div className="lg:pl-[1.5rem] min-h-[80vh] flex flex-col mt-[1.5rem] max-lg:mt-0 max-[1200px]:px-[1rem]">
            <RadioPageInnerContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioPageInner;
